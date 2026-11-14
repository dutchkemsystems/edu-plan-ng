import type { Client } from '@libsql/client';

/**
 * Phase 5 Migration: State Curriculum Policy Enforcement
 *
 * Implements Lagos State Ministry Statutory Policy:
 * "If the Lagos Ministry mandates the Lagos Scheme, block NERDC selection for Lagos public schools."
 */
export async function runStatePolicyMigration(client: Client) {
  // 1. Ensure school_type column exists on schools
  try {
    await client.execute(`ALTER TABLE schools ADD COLUMN school_type TEXT DEFAULT 'public';`);
  } catch {
    // Column already exists
  }

  // 2. Create state_curriculum_policies table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS state_curriculum_policies (
      id TEXT PRIMARY KEY,
      state_id TEXT NOT NULL,
      mandated_source_id TEXT NOT NULL,
      restricted_source_ids TEXT NOT NULL,
      apply_to_school_types TEXT NOT NULL DEFAULT '["public"]',
      is_active INTEGER NOT NULL DEFAULT 1,
      statutory_directive TEXT NOT NULL,
      issuing_authority TEXT NOT NULL DEFAULT 'Lagos State Ministry of Basic & Secondary Education / LASUBEB',
      gazette_reference TEXT DEFAULT 'LASG/MOE/OEQA/CIR/2026/04',
      updated_at TEXT NOT NULL
    );
  `);

  // 3. Seed or refresh the statutory Lagos State Policy Mandate
  await client.execute({
    sql: `
      INSERT INTO state_curriculum_policies (
        id,
        state_id,
        mandated_source_id,
        restricted_source_ids,
        apply_to_school_types,
        is_active,
        statutory_directive,
        issuing_authority,
        gazette_reference,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        mandated_source_id = excluded.mandated_source_id,
        restricted_source_ids = excluded.restricted_source_ids,
        statutory_directive = excluded.statutory_directive,
        is_active = excluded.is_active,
        updated_at = excluded.updated_at
    `,
    args: [
      'policy_lagos_public_mandate',
      'lagos',
      'lagos_scheme',
      JSON.stringify(['nerdc']),
      JSON.stringify(['public']),
      1,
      'Pursuant to Lagos State Education Quality Assurance Regulations (LASG/MOE/OEQA/CIR/2026/04), all Lagos State Public Secondary and Basic Education Schools are mandated to adhere strictly to the Lagos State Unified Scheme of Work. Selection of the generic NERDC scheme is restricted for public schools in Lagos State.',
      'Lagos State Ministry of Basic & Secondary Education / LASUBEB',
      'LASG/MOE/OEQA/CIR/2026/04',
      new Date().toISOString(),
    ],
  });

  // Ensure default demo public schools have school_type = 'public'
  try {
    await client.execute(`UPDATE schools SET school_type = 'public' WHERE school_type IS NULL OR school_type = '';`);
  } catch {
    // Ignore
  }

  console.log('[DB] Phase 5 State Policy Migration executed: Lagos Unified Scheme Mandate active.');
}
