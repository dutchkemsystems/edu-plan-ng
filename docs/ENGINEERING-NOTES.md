---
last_updated: "2026-10-14"
owner: "Staff Principal Engineer"
status: "stable"
---

# Engineering Notes & Trade-Off Analysis — EduPlan NG

## Architecture Decisions & Rationale

### 1. Rejection of Heavy Full-Stack Frameworks
- **Rejected**: Next.js App Router server actions and nested layouts.
- **Why**: High bundle bloat, unpredictable Node runtime requirements, and hydration lag on budget Android smartphones common among Nigerian teachers.
- **Adopted**: React 19 SPA with Vite 8 + Express 4.21 API proxy.
- **Result**: Instantaneous navigation, deterministic client-side offline caching, and sub-100ms API response latency.

### 2. Drizzle ORM over Prisma
- **Rejected**: Prisma ORM.
- **Why**: Heavy Rust engine binaries (30MB+ per container), slow cold starts on micro-instances, and lack of direct SQL visibility.
- **Adopted**: Drizzle ORM with LibSQL/SQLite.
- **Result**: Pure TypeScript schemas, zero binary overhead, and seamless migration from local `file:local.db` to distributed Turso in production.

### 3. Structured Logging Standard
- **Rejected**: Raw `console.log` in application code.
- **Why**: Inability to ingest into log aggregators (Elasticsearch / CloudWatch), risk of PII leakage, and messy test outputs.
- **Adopted**: Centralized `StructuredLogger` outputting JSON with ISO timestamps and log levels.
