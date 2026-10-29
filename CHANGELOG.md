# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - Visual Aids Engine (3D/4K Realia), Cross-Phase QA Audit & Test Suite (2026-10-28)

### Added
- **3D STEM Realia Projector (`VisualAidViewer.tsx`)**: High-performance WebGL 3D model engine built on `@react-three/fiber` and `@react-three/drei` with `<OrbitControls>`, wireframe mode, auto-rotation, and full-screen classroom projector mode. Features procedural 3D models for Geometry Cube & Inscribed Octahedron, Heliocentric Solar System, 4-Chambered Pulsating Human Heart, DNA Double Helix, Atomic Orbitals, and Plant Cell.
- **4K Ultra-HD Classroom Demonstration Player (`VideoAidPlayer.tsx`)**: Ad-free HTML5 video player with speed adjustments (0.75x–1.5x), continuous chalkboard demonstration loop toggle, and statutory curriculum clip library.
- **Instructional Materials Schema (`instructionalMaterials`)**: Extended Zod validator and TypeScript interfaces with `physical`, `visual3D`, and `video4K` fields.
- **Visual Aids Tab in Composer (`LessonPlanComposer.tsx`)**: Added dedicated "Visual Aids" tab with real-time 3D realia projection, 4K video clips, and low-cost improvised physical materials manager.
- **Comprehensive Automated Test Suite (`test/payment-calculation.test.ts`, `test/playwright-teacher-flow.spec.ts`)**: Vitest unit test for ₦1,500 termly 90-day duration mappings and Playwright E2E integration test mocking teacher login, lesson plan generation, 3D viewer rendering, and WhatsApp share URL.

### Fixed
- **Database Schema Migration**: Verified and applied `remedial_task`, `standard_task`, and `advanced_task` columns to the `lesson_plans` table in `local.db`, eliminating SQL runtime query errors on dashboard and lesson plan endpoints.
- **Cross-Phase QA Remediations**: Addressed timing side-channel risks on Kora Pay webhooks, enforced webhook idempotency, neutralized adversarial prompt injections, and enforced strict RLS isolation between B2C teachers and B2B school tiers.

## [1.4.0] - Phase 10: AI Pedagogical Co-Pilot & Teacher Mastery (2026-10-27)

### Added
- **Nigerian Secondary Classroom Simulator (`/api/ai/simulate-classroom`)**: Interactive real-time pedagogical sparring partner embodying a challenging Nigerian secondary school student with the exact system prompt: *"Act as a challenging Nigerian secondary school student. The user is a teacher trying to explain a concept. Ask difficult, realistic questions. Do not accept vague answers. Challenge the teacher until their explanation is crystal clear."*
- **Feynman Bot Concept Simplifier (`/api/ai/feynman-test`)**: Socratic explanation evaluator acting as a curious 10-year-old pupil with the exact system prompt: *"Act as a curious 10-year-old student. The teacher will explain a topic to you. If you don't understand, say 'I'm confused' and ask them to simplify it. Force them to explain it without jargon."*
- **3-Tier Differentiated Tasks Schema & Generator (`/api/ai/differentiated-tasks`)**: Updated database schema (`remedialTask`, `standardTask`, `advancedTask`) in `src/db/schema.ts`, `src/types/index.ts`, and `LessonPlanComposer.tsx` for every lesson plan, ensuring inclusive learning tasks for struggling, standard, and advanced tiers.
- **Flipped Classroom 3-Minute WhatsApp Audio Script Generator (`/api/ai/flipped-classroom`)**: Generates pre-class audio voice note scripts engaging students with real-world Nigerian realia and teaser hypotheses before the morning bell.
- **Post-Class Reflection & 3-Point Pedagogical Advice (`/api/ai/reflect`)**: Analyzes teacher observations and delivers actionable 3-point pedagogical guidance for the subsequent lesson period.
- **AI Pedagogical Co-Pilot Hub (`/ai-copilot`, `AIPedagogicalCoPilotPage`)**: Interactive dedicated workspace with live chat interfaces for the Simulator and Feynman Bot, script copy/export buttons, and quick differentiated matrix generators.

## [1.3.0] - Phase 9: Low-Bandwidth Classroom Clicker, AI Voice Lesson Narrator & STEM Realia Lab (2026-10-27)

### Added
- **EduPoll Live Low-Bandwidth Classroom Clicker (`/live-poll`)**: Interactive student response system with PIN-based rooms (e.g. `KC-892`), live percentage bar charts, and unmasked WAEC/NECO Chief Examiner misconception diagnostics.
- **AI Voice Lesson Audio Narrator & Pronunciation Coach (`AudioLessonNarratorModal`)**: Text-to-speech audio recitations in Nigerian Standard English, Yorùbá, Igbo, and Hausa with tonal pronunciation guides and visual waveform playback.
- **Interactive Nigerian Realia STEM Simulation Lab (`/stem-lab`)**: 4 dynamic realia simulations: Balogun Market Commercial Profit & Break-Even, Third Mainland Bridge Structural Deflection, Garri Cassava Fermentation Titration pH, and Classroom Solar Inverter Off-Grid Sizer.

## [1.2.0] - Phase 8: West African Regional Integration & State Ministry Command Center (2026-10-27)

### Added
- **West African Regional Multi-Curriculum Engine**: Full statutory alignment for Nigeria NERDC (🇳🇬), Ghana Education Service GES (🇬🇭), and Sierra Leone MBSSE (🇸🇱) with localized currencies (₦ Naira, GH₵ Cedis, Le Leones), exam bodies (WAEC/NECO, WASSCE Ghana, WASSCE Sierra Leone), and culturally authentic realia.
- **State Ministry & Local Education Authority (LEA) Command Center (`/ministry`)**: Multi-jurisdiction inspection telemetry across 7 districts with live syllabus pacing heatmaps and automated bulk CSV ingestion of 500+ teachers with voucher generation.
- **Teacher Creator Monetization & Master Marketplace (`/marketplace`)**: Monetized teaching resource packs with 80% direct creator royalty payouts, watermarked preview inspection, and 1-click fork into personal lesson drafts.

## [1.1.0] - Phase 7: Institutional Vetting, Multimodal Script Scanner & 13-Week Portfolio (2026-10-26)

### Added
- **Multimodal AI Script Scanner & OCR Examiner**: Camera capture and handwritten script evaluation awarding M1, A1, and B1 marks against WAEC/NECO marking schemes.
- **School Principal & HOD Academic Vetting Board**: Digital endorsement seals and Lagos State OEQA Certificate of Academic Compliance modal.
- **Bulk 13-Week Term Teaching Portfolio Exporter**: Bundled inspection dossier (.html) containing 13-week schemes, notes, chalkboard layouts, and continuous assessment tests.

## [1.0.0] - 2026-10-14

### Added
- **Full NERDC Curriculum Database**: 6 secondary classes (JSS 1–3, SSS 1–3), 24 core subjects, and 936 weekly syllabus topics with Bloom's taxonomy objectives, teacher activities, student drills, teaching materials, and evaluation questions.
- **Acquisition-Grade Lesson Plan Composer**: Full form composer featuring 20-second autosave, Bloom's cognitive taxonomy tagger with low higher-order thinking warnings, and three-tier differentiated instruction matrix (Struggling, On-Level, Advanced).
- **1-Click Scheme of Work Generator**: Automatic generation of full 13-week term schemes of work for Nigerian secondary schools with export to Microsoft Word (.docx) and printable PDF.
- **WAEC / BECE Exam & Marking Scheme Generator**: Instant generation of multiple-choice and essay examination papers with official school header and confidential teacher marking rubrics.
- **Nigerian Class Broadsheet & Grade Book**: WAEC A1–F9 and JSS A–F grading with CA 1 (20%), CA 2 (20%), and Terminal Exam (60%) calculation, class average diagnostics, and printable report cards.
- **Multilingual Nigerian Localization**: Native interface translations and pedagogical generators for English, Yorùbá, Igbo, and Hausa.
- **Kora Pay Domestic Payment Gateway**: Sandbox and production integration supporting Nigerian Debit Cards, Bank Transfer, USSD, and OPay for Monthly (₦2,500), Annual (₦22,000), and School Tier (₦45,000) subscriptions.
- **One-Tap WhatsApp & SMS Sharing**: Instant sharing of lesson plans, Schemes of Work, and parent absence alerts.
- **Global Command Palette**: Instant fuzzy search across curriculum topics, lesson plans, and teaching resources accessible via `⌘K` / `Ctrl+K`.
- **Principal & HOD Academic Oversight**: School administration dashboard for syllabus compliance tracking and lesson plan vetting.
- **Production DevOps & CI/CD**: GitHub Actions workflows for CI, CD, CodeQL, Dependency Review, OpenSSF Scorecard, and automated SBOM generation.
- **Full-Stack Express + LibSQL Architecture**: Drizzle ORM schemas with zero console.log in production, structured ISO logger, and Docker multi-stage containerization.

## [0.1.0] - 2026-09-01
### Added
- Initial project scaffolding and prototype architecture.
