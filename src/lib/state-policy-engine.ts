/**
 * EduPlan NG - State Policy Enforcement Engine (Phase 5)
 *
 * Implements Statutory State Ministry Directives:
 * "If the Lagos Ministry mandates the Lagos Scheme, block NERDC selection for Lagos public schools."
 */

import { db } from '../db/index.ts';
import { stateCurriculumPolicies, schools, users } from '../db/schema.ts';
import { eq, and } from 'drizzle-orm';
import { logger } from './logger.ts';

export interface StatePolicyValidationResult {
  allowed: boolean;
  statusCode?: number;
  code?: 'STATE_POLICY_MANDATE_BLOCKED';
  error?: string;
  mandatedSource?: string;
  policyDetails?: {
    issuingAuthority: string;
    gazetteReference: string;
    directive: string;
  };
}

/**
 * Validates whether a requested curriculum source is permitted under statutory state mandates.
 */
export async function validateStateCurriculumPolicy(params: {
  requestedSourceId: string;
  schoolId?: string;
  stateId?: string;
  userId?: string;
}): Promise<StatePolicyValidationResult> {
  const { requestedSourceId, schoolId, userId } = params;

  // 1. Resolve effective state and school type
  let effectiveStateId = params.stateId || 'lagos';
  let isPublicSchool = true; // Default assumption in state context unless verified private

  try {
    if (schoolId) {
      const schoolRows = await db
        .select()
        .from(schools)
        .where(eq(schools.id, schoolId))
        .limit(1);

      if (schoolRows.length > 0) {
        const sch = schoolRows[0];
        effectiveStateId = sch.stateId || (sch.state ? sch.state.toLowerCase() : 'lagos');
        const sType = sch.schoolType ? sch.schoolType.toLowerCase().trim() : 'public';
        isPublicSchool = sType === 'public';
      }
    } else if (userId) {
      const userRows = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (userRows.length > 0) {
        const u = userRows[0];
        effectiveStateId = u.ministryStateId || (u.state ? u.state.toLowerCase() : 'lagos');
        if (u.schoolId) {
          const sRows = await db
            .select()
            .from(schools)
            .where(eq(schools.id, u.schoolId))
            .limit(1);
          if (sRows.length > 0) {
            const sch = sRows[0];
            effectiveStateId = sch.stateId || effectiveStateId;
            const sType = sch.schoolType ? sch.schoolType.toLowerCase().trim() : 'public';
            isPublicSchool = sType === 'public';
          }
        }
      }
    }
  } catch (err) {
    logger.warn('[StatePolicyEngine] Error resolving school context', { error: String(err) });
  }

  // 2. Query active statutory policies for this state
  try {
    const policies = await db
      .select()
      .from(stateCurriculumPolicies)
      .where(
        and(
          eq(stateCurriculumPolicies.stateId, effectiveStateId.toLowerCase()),
          eq(stateCurriculumPolicies.isActive, 1)
        )
      );

    for (const policy of policies) {
      let restrictedSources: string[] = [];
      try {
        restrictedSources = JSON.parse(policy.restrictedSourceIds);
      } catch {
        restrictedSources = [policy.restrictedSourceIds];
      }

      let targetSchoolTypes: string[] = ['public'];
      try {
        targetSchoolTypes = JSON.parse(policy.applyToSchoolTypes);
      } catch {
        targetSchoolTypes = ['public'];
      }

      const schoolTypeMatches = isPublicSchool
        ? targetSchoolTypes.includes('public')
        : targetSchoolTypes.includes('private');

      if (schoolTypeMatches && restrictedSources.includes(requestedSourceId.toLowerCase())) {
        logger.warn('[StatePolicyEngine] Blocked restricted curriculum source under state mandate', {
          requestedSourceId,
          stateId: effectiveStateId,
          schoolId,
          mandatedSourceId: policy.mandatedSourceId,
        });

        return {
          allowed: false,
          statusCode: 403,
          code: 'STATE_POLICY_MANDATE_BLOCKED',
          error: `Statutory Mandate: The ${policy.issuingAuthority} mandates the ${
            policy.mandatedSourceId === 'lagos_scheme'
              ? 'Lagos State Unified Scheme of Work'
              : policy.mandatedSourceId.toUpperCase()
          } for all ${effectiveStateId.toUpperCase()} public schools. Selection of ${requestedSourceId.toUpperCase()} is restricted pursuant to Gazette ${
            policy.gazetteReference || 'LASG/MOE/OEQA/CIR/2026/04'
          }.`,
          mandatedSource: policy.mandatedSourceId,
          policyDetails: {
            issuingAuthority: policy.issuingAuthority,
            gazetteReference: policy.gazetteReference || 'LASG/MOE/OEQA/CIR/2026/04',
            directive: policy.statutoryDirective,
          },
        };
      }
    }
  } catch (err) {
    logger.error('[StatePolicyEngine] Error querying state curriculum policies', err);
  }

  return { allowed: true };
}

/**
 * Retrieves the state's active curriculum policies
 */
export async function getStateCurriculumPolicies(stateId: string = 'lagos') {
  try {
    return await db
      .select()
      .from(stateCurriculumPolicies)
      .where(eq(stateCurriculumPolicies.stateId, stateId.toLowerCase()));
  } catch (err) {
    logger.error('[StatePolicyEngine] Error fetching policies', err);
    return [];
  }
}

/**
 * Toggles a state curriculum policy
 */
export async function toggleStateCurriculumPolicy(policyId: string, isActive: boolean) {
  return await db
    .update(stateCurriculumPolicies)
    .set({
      isActive: isActive ? 1 : 0,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(stateCurriculumPolicies.id, policyId));
}
