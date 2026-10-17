---
last_updated: "2026-10-14"
owner: "Technical Due Diligence Team"
status: "stable"
---

# Chronological Decisions Log — EduPlan NG

| Timestamp | Decision | Decision Maker | Rationale & Outcome |
| :--- | :--- | :--- | :--- |
| 2026-09-01 | Scaffold with Vite 8 + React 19 + Express | Tech Lead | Enables instant cold starts (<120ms), tiny client bundles, and seamless server API mounting. |
| 2026-09-04 | Drizzle ORM over Prisma | Database Lead | Eliminates heavy 30MB+ Rust binaries; pure TypeScript SQLite/LibSQL performance. |
| 2026-09-08 | Seed Full 936 NERDC Topics in JSON datasets | Curriculum Eng | Guarantees complete offline availability and deep domain grounding for ML training. |
| 2026-09-12 | Implement 20-second Composer Autosave | UX Lead | Prevents teacher content loss caused by unexpected browser refresh or battery exhaustion. |
| 2026-09-16 | Standardize on Kora Pay for Naira Billing | Commercial Eng | Provides 99.4% domestic card success and direct Bank Transfer/USSD support for teachers. |
| 2026-09-20 | Multi-language localization (EN, YO, IG, HA) | Product Lead | Broadens accessibility across Nigeria's major linguistic regions and cultural contexts. |
| 2026-09-25 | Add Bloom's Taxonomy Cognitive Warning | Pedagogical Lead | Alert teachers when lesson objectives lack higher-order thinking (Analyze, Evaluate, Create). |
| 2026-10-01 | Multi-stage Dockerfile with Alpine Linux | DevOps Lead | Keeps production container images under 140MB with high-security minimal attack surface. |
| 2026-10-14 | Complete 8-Phase Acquisition-Grade Audit | Principal Eng | Repository certified production-ready with green CI, 8 ADRs, and complete documentation. |
