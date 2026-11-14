# Self-Healing Architecture & Reliability Engineering — EduPlan NG (Phase 6)

---

> ### ⚠️ Honest Engineering & Reality Statement
> **The self-healing engine automatically mitigates transient software faults, network timeouts, circuit overloads, and schema data drift. It cannot repair catastrophic physical infrastructure destruction, power grid blackouts, or unrecoverable external provider outages without operator escalation.**
>
> In production distributed systems, resilience is not about claiming complete invincibility; it is about graceful degradation, fast-failing before timeouts cascade, deterministic statutory fallbacks, and autonomous data repair when anomalies are detected.

---

## 1. Reliability Architecture Overview

EduPlan NG incorporates a multi-tier resilience and fault-tolerant architecture designed to maintain 99.9% uptime for Nigerian schools, even under volatile mobile connectivity and upstream API fluctuations:

```
                    ┌──────────────────────────────────────────────┐
                    │               Incoming Request               │
                    └──────────────────────┬───────────────────────┘
                                           │
                                           ▼
                     ┌───────────────────────────────────────────┐
                     │          Circuit Breaker Layer            │
                     │  (Gemini AI, Kora Pay, Gov Sync Workers)  │
                     └─────────────────────┬─────────────────────┘
                                           │
                    ┌──────────────────────┴──────────────────────┐
            [State: CLOSED]                                [State: OPEN]
                    │                                             │
                    ▼                                             ▼
       ┌─────────────────────────┐                   ┌─────────────────────────┐
       │   Upstream API Call     │                   │  Immediate Fast-Fail to │
       │ (w/ Jittered Backoff)   │                   │   Deterministic NERDC   │
       └────────────┬────────────┘                   │    Statutory Engine     │
                    │                                └─────────────────────────┘
            [Fails >= 3 times]
                    │
                    ▼
         [Trips Circuit to OPEN]
```

---

## 2. Core Pillars

### 2.1 Circuit Breakers (`src/lib/reliability-engine.ts`)
Three dedicated state-machine circuit breakers guard critical external dependencies:
1. **`Gemini-AI-Service`**:
   - Failure Threshold: 3 consecutive failures.
   - Reset Timeout: 20 seconds.
   - Fallback Timeout: 10,000 ms.
   - Behavior when OPEN: Instantly short-circuits to the deterministic NERDC/OEQA statutory engine without making external calls, guaranteeing zero 500 errors to Nigerian teachers during Google Cloud / Gemini API service degradations.
2. **`KoraPay-Payment-Gateway`**:
   - Failure Threshold: 4 consecutive failures.
   - Reset Timeout: 30 seconds.
   - Fallback Timeout: 8,000 ms.
3. **`NERDC-OEQA-Government-Sync`**:
   - Failure Threshold: 3 consecutive failures.
   - Reset Timeout: 60 seconds.

### 2.2 Exponential Backoff with Jitter
Network retries apply randomized full jitter:
$$\text{Delay} = \text{random}(0, \min(\text{initialDelay} \times \text{factor}^{\text{attempt}}, \text{maxDelay}))$$
This distributes client re-connections across a random distribution curve, completely avoiding the **Thundering Herd Problem** when a restored cellular tower or upstream API recovers.

### 2.3 Database Health & Autonomous Record Repair
A background and on-demand self-healing watchdog periodically inspects the database:
- **Missing Curriculum Versions**: Automatically stamped with the latest NERDC gazette version (`v1.4`+).
- **Corrupted JSON Columns**: Malformed JSON strings in `bloomTags`, `subjectSkillsMapping`, or `visualAids` are safely sanitized into valid arrays.
- **Incomplete Differentiated Instruction**: Missing `remedialTask`, `standardTask`, or `advancedTask` columns are automatically backfilled with accredited 3-tier instructional scaffolding.
- **SQLite WAL Mode**: Ensures Write-Ahead Logging is maintained to prevent database file contention.

---

## 3. Reliability & Self-Healing API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/system/reliability-report` | Live status, memory stats, circuit breaker states, and recent repair logs. |
| `POST` | `/api/system/self-heal` | Manually triggers database integrity scan and autonomous record repair. |
| `POST` | `/api/system/circuit-breaker/reset` | Operator endpoint to reset a tripped breaker (e.g. `{"name": "Gemini-AI-Service"}`). |

---

## 4. Runbook: Incident Scenarios

### Scenario A: Gemini Upstream Downtime
- **Detection**: `Gemini-AI-Service` transitions from `CLOSED` to `OPEN`.
- **System Action**: Calls to `/api/ai/lesson-plan` immediately fall back to the built-in statutory engine. Response headers indicate `provider: "nerdc-oeqa-statutory-engine"`.
- **Operator Action**: None required. After 20 seconds, the breaker enters `HALF_OPEN` and tests recovery automatically.

### Scenario B: Database Inconsistency Detected
- **Detection**: Admin notices old lesson plans without curriculum versions.
- **System Action**: Trigger `POST /api/system/self-heal`. Engine scans and backfills missing version strings, returning a summary of modified rows.
