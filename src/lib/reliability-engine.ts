/**
 * EduPlan NG - Self-Healing, Fault Tolerance & Reliability Engineering (Phase 6)
 *
 * Core Pillars:
 * 1. Circuit Breakers: Protects external AI (Gemini), Payment (Kora Pay), and Sync services
 *    from cascading latency/downtime by fast-failing to deterministic statutory engines.
 * 2. Exponential Backoff with Jitter: Resilient retry wrapper for transient network operations.
 * 3. Self-Healing Database & Record Repairer: Scans and auto-remediates corrupted JSON,
 *    missing curriculum versions, and incomplete differentiated tasks without human intervention.
 * 4. Reliability Metrics & Health Watchdog: Live tracking of circuit states, fallback frequencies,
 *    system resources, and auto-repair histories.
 *
 * NOTE: As documented in docs/RELIABILITY.md, the self-healing engine automatically mitigates
 * transient software faults, network timeouts, and data drift. It cannot repair catastrophic physical
 * infrastructure destruction or power outages without operator escalation.
 */

import { logger } from './logger.ts';
import { db } from '../db/index.ts';
import { lessonPlans, users, auditLogs } from '../db/schema.ts';
import { eq, isNull, or, sql } from 'drizzle-orm';
import { getLatestCurriculumVersion } from './ai/curriculum-data/index.ts';

// ============================================================================
// 1. CIRCUIT BREAKER PATTERN
// ============================================================================

export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface CircuitBreakerOptions {
  name: string;
  failureThreshold?: number; // consecutive failures to trip circuit
  resetTimeoutMs?: number; // time to remain OPEN before probing in HALF_OPEN
  successThreshold?: number; // consecutive successes in HALF_OPEN to re-close
  fallbackTimeoutMs?: number; // per-call execution timeout in ms
}

export interface CircuitBreakerStats {
  name: string;
  state: CircuitState;
  failures: number;
  successes: number;
  totalCalls: number;
  totalFailures: number;
  totalFallbacks: number;
  lastFailureTime: string | null;
  lastStateChange: string;
}

export class CircuitBreaker {
  public readonly name: string;
  private state: CircuitState = 'CLOSED';
  private consecutiveFailures = 0;
  private consecutiveSuccesses = 0;
  private totalCalls = 0;
  private totalFailures = 0;
  private totalFallbacks = 0;
  private lastFailureTime: number | null = null;
  private lastStateChange: number = Date.now();

  private readonly failureThreshold: number;
  private readonly resetTimeoutMs: number;
  private readonly successThreshold: number;
  private readonly fallbackTimeoutMs: number;

  constructor(options: CircuitBreakerOptions) {
    this.name = options.name;
    this.failureThreshold = options.failureThreshold || 3;
    this.resetTimeoutMs = options.resetTimeoutMs || 30000; // 30s default
    this.successThreshold = options.successThreshold || 2;
    this.fallbackTimeoutMs = options.fallbackTimeoutMs || 8000; // 8s timeout default
  }

  public getState(): CircuitState {
    if (this.state === 'OPEN') {
      const now = Date.now();
      if (this.lastFailureTime && now - this.lastFailureTime >= this.resetTimeoutMs) {
        this.transitionTo('HALF_OPEN');
      }
    }
    return this.state;
  }

  private transitionTo(newState: CircuitState) {
    const prev = this.state;
    this.state = newState;
    this.lastStateChange = Date.now();
    logger.info(`[CircuitBreaker:${this.name}] Transitioned: ${prev} -> ${newState}`);
  }

  public async execute<T>(
    fn: () => Promise<T>,
    fallbackFn?: (err: Error) => Promise<T> | T
  ): Promise<T> {
    this.totalCalls++;
    const currentState = this.getState();

    // 1. FAST-FAIL if OPEN: immediately invoke fallback without hitting downstream
    if (currentState === 'OPEN') {
      this.totalFallbacks++;
      logger.info(`[CircuitBreaker:${this.name}] Circuit is OPEN. Fast-failing to statutory fallback.`);
      if (fallbackFn) {
        return fallbackFn(new Error(`CircuitBreaker '${this.name}' is OPEN.`));
      }
      throw new Error(`CircuitBreaker '${this.name}' is OPEN and no fallback provided.`);
    }

    // 2. Execute with timeout
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const result = await Promise.race([
        fn(),
        new Promise<never>((_, reject) => {
          timer = setTimeout(
            () => reject(new Error(`Operation timed out after ${this.fallbackTimeoutMs}ms`)),
            this.fallbackTimeoutMs
          );
        }),
      ]);

      // Success handling
      this.onSuccess();
      return result;
    } catch (err: any) {
      this.onFailure(err);
      if (fallbackFn) {
        this.totalFallbacks++;
        logger.info(`[CircuitBreaker:${this.name}] Downstream unavailable; activating statutory fallback`, {
          error: err.message,
        });
        return fallbackFn(err);
      }
      throw err;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  private onSuccess() {
    this.consecutiveFailures = 0;
    if (this.state === 'HALF_OPEN') {
      this.consecutiveSuccesses++;
      if (this.consecutiveSuccesses >= this.successThreshold) {
        this.transitionTo('CLOSED');
        this.consecutiveSuccesses = 0;
      }
    }
  }

  private onFailure(err: Error) {
    this.totalFailures++;
    this.lastFailureTime = Date.now();
    this.consecutiveFailures++;

    if (this.state === 'HALF_OPEN' || this.consecutiveFailures >= this.failureThreshold) {
      this.transitionTo('OPEN');
    }
  }

  public reset() {
    this.transitionTo('CLOSED');
    this.consecutiveFailures = 0;
    this.consecutiveSuccesses = 0;
    this.lastFailureTime = null;
  }

  public getStats(): CircuitBreakerStats {
    return {
      name: this.name,
      state: this.getState(),
      failures: this.consecutiveFailures,
      successes: this.consecutiveSuccesses,
      totalCalls: this.totalCalls,
      totalFailures: this.totalFailures,
      totalFallbacks: this.totalFallbacks,
      lastFailureTime: this.lastFailureTime ? new Date(this.lastFailureTime).toISOString() : null,
      lastStateChange: new Date(this.lastStateChange).toISOString(),
    };
  }
}

// Global Core Circuit Breakers
export const geminiCircuitBreaker = new CircuitBreaker({
  name: 'Gemini-AI-Service',
  failureThreshold: 2,
  resetTimeoutMs: 30000,
  fallbackTimeoutMs: 14000,
});

export const koraPayCircuitBreaker = new CircuitBreaker({
  name: 'KoraPay-Payment-Gateway',
  failureThreshold: 4,
  resetTimeoutMs: 30000,
  fallbackTimeoutMs: 8000,
});

export const governmentSyncCircuitBreaker = new CircuitBreaker({
  name: 'NERDC-OEQA-Government-Sync',
  failureThreshold: 3,
  resetTimeoutMs: 60000,
  fallbackTimeoutMs: 12000,
});

// ============================================================================
// 2. EXPONENTIAL BACKOFF WITH JITTER
// ============================================================================

export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffFactor?: number;
  jitter?: boolean;
  retryIf?: (err: any) => boolean;
}

/**
 * Retries an asynchronous function with exponential backoff and randomized jitter
 * to prevent the thundering herd problem during upstream recovery.
 */
export async function retryWithBackoff<T>(
  fn: (attempt: number) => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const maxRetries = options.maxRetries ?? 3;
  const initialDelayMs = options.initialDelayMs ?? 200;
  const maxDelayMs = options.maxDelayMs ?? 2000;
  const backoffFactor = options.backoffFactor ?? 2;
  const useJitter = options.jitter ?? true;

  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      return await fn(attempt);
    } catch (err: any) {
      attempt++;
      if (attempt > maxRetries || (options.retryIf && !options.retryIf(err))) {
        throw err;
      }

      let delay = Math.min(initialDelayMs * Math.pow(backoffFactor, attempt - 1), maxDelayMs);
      if (useJitter) {
        // Full jitter algorithm: random value between 0 and calculated delay
        delay = Math.floor(Math.random() * delay);
      }

      logger.warn(`[RetryWithBackoff] Operation failed (attempt ${attempt}/${maxRetries}). Retrying in ${delay}ms...`, {
        error: err.message,
      });

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error('Retry exhausted without result');
}

// ============================================================================
// 3. DATABASE SELF-HEALING & CORRUPTED RECORD REPAIR ENGINE
// ============================================================================

export interface SelfHealingRepairResult {
  plansScanned: number;
  plansRepaired: number;
  corruptedJsonRepaired: number;
  missingVersionsBackfilled: number;
  differentiatedTasksBackfilled: number;
  timestamp: string;
  durationMs: number;
  actionsTaken: string[];
}

// In-memory log of recent self-healing actions
const selfHealingActionHistory: Array<{
  timestamp: string;
  type: string;
  details: string;
  affectedCount: number;
}> = [];

/**
 * Scans the database and auto-remediates any corrupted or incomplete lesson plans,
 * backfilling statutory versions, repair-patching broken JSON arrays, and ensuring
 * OEQA differentiated task tiers are populated.
 */
export async function runSelfHealingScanAndRepair(): Promise<SelfHealingRepairResult> {
  const startTime = Date.now();
  const actionsTaken: string[] = [];
  let corruptedJsonRepaired = 0;
  let missingVersionsBackfilled = 0;
  let differentiatedTasksBackfilled = 0;

  try {
    const allPlans = await db.select().from(lessonPlans);
    let plansRepaired = 0;

    for (const plan of allPlans) {
      let needsUpdate = false;
      const updates: Record<string, any> = {};

      // 1. Repair missing curriculum version
      if (!plan.curriculumVersion) {
        const fallbackVersion = getLatestCurriculumVersion(plan.level || (plan as any).classLevel || 'jss-1', plan.subject || 'General');
        updates.curriculumVersion = fallbackVersion;
        needsUpdate = true;
        missingVersionsBackfilled++;
      }

      // 2. Repair missing differentiated tasks (NERDC 3-tier standard)
      if (!plan.remedialTask || !plan.standardTask || !plan.advancedTask) {
        updates.remedialTask =
          plan.remedialTask ||
          'Tier 1 (Remedial): Scaffolded step-by-step practice worksheet with predefined templates, visual cues, and peer buddy assistance.';
        updates.standardTask =
          plan.standardTask ||
          'Tier 2 (Standard): Independent completion of standard NERDC curriculum questions 1-5 applying concepts with practical realia.';
        updates.advancedTask =
          plan.advancedTask ||
          'Tier 3 (Advanced): Non-routine analysis problem applying principles to Nigerian commercial trade or real-world industrial systems.';
        needsUpdate = true;
        differentiatedTasksBackfilled++;
      }

      // 3. Check and heal JSON columns (bloomTags, materials, objectives)
      const jsonFields: Array<'bloomTags' | 'materials' | 'objectives'> = [
        'bloomTags',
        'materials',
        'objectives',
      ];

      for (const field of jsonFields) {
        const val = plan[field];
        if (val) {
          try {
            JSON.parse(val);
          } catch {
            // Corrupted JSON detected! Auto-heal with empty valid array
            updates[field] = JSON.stringify([]);
            needsUpdate = true;
            corruptedJsonRepaired++;
          }
        }
      }

      if (needsUpdate) {
        await db.update(lessonPlans).set(updates).where(eq(lessonPlans.id, plan.id));
        plansRepaired++;
      }
    }

    if (plansRepaired > 0) {
      const summary = `Auto-healed ${plansRepaired} lesson plans (Versions: ${missingVersionsBackfilled}, Tasks: ${differentiatedTasksBackfilled}, JSON: ${corruptedJsonRepaired})`;
      actionsTaken.push(summary);
      selfHealingActionHistory.unshift({
        timestamp: new Date().toISOString(),
        type: 'PLAN_INTEGRITY_REPAIR',
        details: summary,
        affectedCount: plansRepaired,
      });
      logger.info(`[SelfHealingEngine] ${summary}`);
    } else {
      actionsTaken.push('Integrity scan completed: all lesson plan records and JSON structures are healthy.');
    }

    // Keep history bounded
    if (selfHealingActionHistory.length > 50) {
      selfHealingActionHistory.length = 50;
    }

    const durationMs = Date.now() - startTime;
    return {
      plansScanned: allPlans.length,
      plansRepaired,
      corruptedJsonRepaired,
      missingVersionsBackfilled,
      differentiatedTasksBackfilled,
      timestamp: new Date().toISOString(),
      durationMs,
      actionsTaken,
    };
  } catch (err: any) {
    logger.error('[SelfHealingEngine] Scan and repair failed', err);
    throw err;
  }
}

// ============================================================================
// 4. RELIABILITY METRICS & TELEMETRY
// ============================================================================

export interface ReliabilityReport {
  status: 'OPTIMAL' | 'DEGRADED' | 'CRITICAL';
  uptimeSeconds: number;
  memoryUsageMb: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
  };
  circuitBreakers: CircuitBreakerStats[];
  selfHealing: {
    totalSelfHealingEvents: number;
    recentActions: Array<{
      timestamp: string;
      type: string;
      details: string;
      affectedCount: number;
    }>;
  };
  databaseHealth: {
    status: 'ONLINE' | 'DEGRADED';
    engine: 'LibSQL / SQLite';
    walEnabled: boolean;
  };
  disclaimer: string;
  timestamp: string;
}

/**
 * Compiles a comprehensive health and reliability report for the platform
 */
export async function getSystemReliabilityReport(): Promise<ReliabilityReport> {
  const mem = process.memoryUsage();
  const breakers = [geminiCircuitBreaker, koraPayCircuitBreaker, governmentSyncCircuitBreaker].map((b) =>
    b.getStats()
  );

  const hasOpenBreaker = breakers.some((b) => b.state === 'OPEN');
  const status = hasOpenBreaker ? 'DEGRADED' : 'OPTIMAL';

  // Check DB responsiveness
  let dbStatus: 'ONLINE' | 'DEGRADED' = 'ONLINE';
  try {
    await db.select({ id: users.id }).from(users).limit(1);
  } catch {
    dbStatus = 'DEGRADED';
  }

  return {
    status,
    uptimeSeconds: Math.floor(process.uptime()),
    memoryUsageMb: {
      rss: Math.round(mem.rss / 1024 / 1024),
      heapTotal: Math.round(mem.heapTotal / 1024 / 1024),
      heapUsed: Math.round(mem.heapUsed / 1024 / 1024),
    },
    circuitBreakers: breakers,
    selfHealing: {
      totalSelfHealingEvents: selfHealingActionHistory.length,
      recentActions: selfHealingActionHistory.slice(0, 5),
    },
    databaseHealth: {
      status: dbStatus,
      engine: 'LibSQL / SQLite',
      walEnabled: true,
    },
    disclaimer:
      'The self-healing engine automatically mitigates transient software faults, network timeouts, and data drift. It cannot repair catastrophic physical infrastructure destruction or unrecoverable external outages without operator escalation.',
    timestamp: new Date().toISOString(),
  };
}
