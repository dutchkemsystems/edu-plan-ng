# Product Roadmap — EduPlan NG
*Target: From Acquisition-Grade v1.0 to West African Expansion v2.0*

---

## 1. Release v1.0 (Current Production Release) — COMPLETED ✅

- [x] Full NERDC Curriculum for JSS 1–3 and SSS 1–3 (936 weekly topics).
- [x] Acquisition-grade Lesson Plan Composer with 20s autosave and duplicate functionality.
- [x] 1-Click Scheme of Work Generator (13 weeks) with Word (.docx) & PDF export.
- [x] Exam & Marking Scheme Generator with official school header.
- [x] Broadsheet Grade Book with WAEC A1–F9 and JSS A–F calculations.
- [x] Differentiated Instruction matrix (Tier 1 Struggling, Tier 2 On-Level, Tier 3 Advanced).
- [x] Bloom's Taxonomy cognitive tagging with higher-order thinking warnings.
- [x] Native Nigerian Language localization (English, Yorùbá, Igbo, Hausa).
- [x] Kora Pay payment gateway (Card, Bank Transfer, USSD, OPay).
- [x] One-tap WhatsApp & SMS parent communications.
- [x] Community Lesson Plan Library with 1-click "Fork to my drafts".
- [x] 8-period Timetable Generator with clash detection.
- [x] Daily Student Attendance Tracker and roll call.
- [x] Principal & HOD school syllabus compliance portal.
- [x] Daily streak counter and bronze/silver/gold gamification badges.
- [x] Teacher referral program (Give 1 month, get 1 month).
- [x] NDPR-compliant Privacy Policy, Terms of Service, and Refund Policy.
- [x] Docker multi-stage build and Vercel CD pipelines.

---

## 2. Release v1.1 — School Tier & Analytics Polish (Q4 2026)

- [ ] **Direct Vercel Blob / Cloudflare R2 binary bucket integration**: Currently simulated with local object storage; live enterprise S3 credentials required in production.
- [ ] **Bulk Term Plan ZIP export**: Export all 13 weekly plans in one zip archive.
- [ ] **State Ministry of Education bulk district onboarding**: Automated CSV ingestion for 500+ teachers per local education authority.

---

## 3. Release v2.0 — West African Regional Scale (2027)

- [ ] **Regional Curriculum Integration**: Expand beyond Nigeria NERDC to Ghana GES (West African Senior School Certificate Examination syllabus) and Sierra Leone basic education.
- [ ] **Native Mobile iOS/Android Apps**: React Native / Expo wrapper over existing offline SQLite engine.
- [ ] **AI Optical Script Scoring (OCR)**: Grade student handwritten theory scripts using Gemini multimodal vision.
- [ ] **Teacher Marketplace**: Monetized lesson plan and instructional resource marketplace with direct Naira revenue split.

---

## 4. Deferred Items Log

| Feature | Status | Reason |
| :--- | :--- | :--- |
| Cloudflare R2 / Vercel Blob live bucket | DEFERRED | Requires live production AWS/Cloudflare API credentials; simulated with resilient file storage. |
| SMS Gateway (Termii / Africa's Talking) | DEFERRED | Requires live Nigerian DND-whitelisted SMS sender ID approval; WhatsApp direct API used as standard. |
