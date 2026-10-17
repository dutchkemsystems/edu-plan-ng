---
last_updated: "2026-10-14"
owner: "Lead Software Architect"
status: "stable"
---

# Codebase Tour & File Walkthrough — EduPlan NG

## Core Entry Points

- **`server.ts`**: The full-stack Express server that hosts all REST API routes (`/api/auth/*`, `/api/curriculum/*`, `/api/lesson-plans/*`, `/api/payment/*`, `/api/notifications/stream`) and mounts Vite dev middleware in development mode or serves the static `/dist` bundle in production.
- **`src/main.tsx`**: The frontend React entry point that mounts the root application onto `#root` with Tailwind v4 styling.
- **`src/App.tsx`**: The primary coordinator component that manages routing across all 14 pedagogical modules, global search palette listeners (`Cmd+K`), notification polling/SSE, and teacher onboarding.

## Persistence & Business Logic

- **`src/db/schema.ts`**: Complete Drizzle ORM schema defining relational tables for users, curriculum levels, subjects, weekly topics, lesson plans, resources, subscriptions, and grade records.
- **`src/db/index.ts`**: LibSQL database client initialization and DDL auto-migration engine.
- **`src/lib/api.ts`**: Type-safe client-side API abstraction layer communicating with all backend REST endpoints.
- **`src/lib/i18n.ts`**: Localization dictionary with comprehensive translations for English, Yorùbá, Igbo, and Hausa.
- **`src/lib/logger.ts`**: Production structured JSON logger eliminating raw `console.log` statements.

## Key Feature Modules

- **`src/pages/CurriculumBrowser.tsx`**: 5-tier NERDC curriculum browser allowing teachers to drill down from Class Level -> Subject -> Term -> Week -> Topic Detail with a direct "Create Lesson Plan" CTA.
- **`src/pages/LessonPlanComposer.tsx`**: Robust pedagogical composer with 20s autosave, Bloom's cognitive taxonomy tagger, 3-tier differentiated instruction matrix, AI assistant sidebar, and Word (.docx)/PDF/WhatsApp export.
- **`src/pages/SchemeOfWorkPage.tsx`**: 1-click generator for full 13-week Schemes of Work for Nigerian secondary schools with table editing and Word export.
- **`src/pages/AssessmentsPage.tsx`**: Continuous Assessment (CA) and Terminal Examination paper generator with official school letterhead formatting and teacher marking schemes.
- **`src/pages/GradeBookPage.tsx`**: Broadsheet computing WAEC A1–F9 / JSS A–F letter grades from continuous assessment and exam scores.
- **`src/pages/PricingPage.tsx`**: Naira-first billing page with Kora Pay checkout integration and teacher referral engine.
