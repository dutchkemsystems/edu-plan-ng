# Production Launch Checklist — EduPlan NG
*Target: Acquisition-Grade v1.0 Production Launch*

---

## Pre-Launch Verification

- [x] Full NERDC Curriculum database seeded (936 weekly topics across JSS 1–3 and SSS 1–3).
- [x] Express REST backend mounting Vite SPA on port 3000.
- [x] Local SQLite and production Turso LibSQL database migration tested.
- [x] Automated test suite passing with 0 failures (`npm run test`).
- [x] TypeScript build compiling with 0 errors (`npm run build`).
- [x] Zero raw `console.log` statements in production codebase (structured JSON logger verified).
- [x] Zero hardcoded secrets, API keys, or tokens in git history.
- [x] Kora Pay payment gateway integration verified in sandbox mode.
- [x] Multi-language localization verified in English, Yorùbá, Igbo, and Hausa.
- [x] Bloom's taxonomy validator alerting on low higher-order thinking objectives.
- [x] Three-tier differentiated instruction matrix active in composer.
- [x] Word (.docx) and PDF export formatting verified.
- [x] One-tap WhatsApp parent sharing verified.
- [x] GitHub CI, CD, CodeQL, Dependency Review, and OpenSSF Scorecard workflows configured.
- [x] CycloneDX SBOM generated (`sbom.json`).
- [x] NDPR-compliant Privacy Policy, Terms of Service, and Refund Policy live.
- [x] 8 Architecture Decision Records committed (`docs/ADR/`).
- [x] Dockerfile multi-stage container build and `docker-compose.yml` verified.
- [x] ACQUISITION-SUMMARY.md completed for due-diligence review.
