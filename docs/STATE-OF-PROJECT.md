# State of Project — EduPlan NG
*Last Updated: 2026-10-14*
*Audit Status: Pre-flight baseline inventory complete*

---

## 1. Initial File Tree (Clean)

```text
/
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── index.css
    └── main.tsx
```

---

## 2. Configuration & Manifests Audit

| File | Status | Notes |
| :--- | :--- | :--- |
| `package.json` | Present | Scripts: `dev`, `build`, `preview`, `clean`, `lint`. React 19, Vite 8, Express 4.21, Tailwind v4, Lucide. |
| `README.md` | Missing | To be created with badges, architecture, and guides in Phase 4/5. |
| `drizzle.config.*` | Missing | To be established in Phase 1 for curriculum and lesson plan schemas. |
| `next.config.*` | N/A (Vite/Express) | Project uses Vite 8 React SPA + Express / server API proxy architecture. |
| `docker-compose.yml` | Missing | To be added in Phase 4. |
| `Dockerfile` | Missing | To be added in Phase 4. |

---

## 3. Routes & API Endpoints Inventory

| Route | Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `/` | Page (Client) | Stubbed | `src/App.tsx` contains empty placeholder `<div></div>`. |
| `/curriculum` | Page (Client) | Missing | NERDC JSS 1–3 & SSS 1–3 hierarchy. |
| `/resources` | Page (Client) | Missing | Resource management UI. |
| `/settings/*` | Page (Client) | Missing | Profile, account, subscription, notifications. |
| `/progress` | Page (Client) | Missing | Term coverage and tracking. |
| `/calendar` | Page (Client) | Missing | Nigerian academic calendar. |
| `/api/curriculum/*` | API (Server) | Missing | Curriculum queries. |
| `/api/lesson-plans/*` | API (Server) | Missing | Lesson plan CRUD & duplication. |
| `/api/auth/*` | API (Server) | Missing | Authentication handlers. |
| `/api/payment/*` | API (Server) | Missing | Kora Pay initialization & webhooks. |
| `/api/notifications/*` | API (Server) | Missing | Real-time & polling notification feeds. |

---

## 4. Database Schema & Tables Inventory

| Table | Status | Target Phase | Description |
| :--- | :--- | :--- | :--- |
| `users` | Missing | Phase 1 | Teacher account, school, subjects, onboarding status. |
| `curriculum_levels` | Missing | Phase 1 | JSS 1–3, SSS 1–3 definitions. |
| `curriculum_subjects` | Missing | Phase 1 | Core subjects across junior & senior secondary. |
| `curriculum_topics` | Missing | Phase 1 | Weeks 1–13 termly topics, objectives, activities. |
| `lesson_plans` | Missing | Phase 2 | Full lesson plan headers and state (draft/published). |
| `lesson_plan_sections`| Missing | Phase 2 | Objectives, materials, steps, evaluation, assignments. |
| `resources` | Missing | Phase 2 | Documents, notes, files, topic tags. |
| `subscriptions` | Missing | Phase 1 | Kora Pay subscriptions, reference, plan tier, expiry. |
| `notifications` | Missing | Phase 2 | System, school, and curriculum alerts. |
| `schemes_of_work` | Missing | Phase 3 | Full-term generated schemes. |
| `assessments` | Missing | Phase 3 | CA tests, exams, marking schemes. |
| `grade_records` | Missing | Phase 3 | WAEC A1–F9 & JSS broadsheets. |

---

## 5. UI Stubs & Interactive Inventory

- **Active Buttons**: None (Initial empty state).
- **Hardcoded Statistics**: None yet.
- **Empty Pages**: `src/App.tsx` (single root placeholder).
- **Decorative Icons**: None yet.

---

## 6. Phase 0 Gate Summary

- **Status**: PASSED
- **Artifact**: `docs/STATE-OF-PROJECT.md` verified.
- **Execution Ready**: Ready to proceed to Phase 1 — Make It Runnable Locally.
