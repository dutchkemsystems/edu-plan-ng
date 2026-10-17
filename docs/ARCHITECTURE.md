# Architecture & System Design — EduPlan NG
*Target Audience: Acquirers, Technical Due Diligence, Senior Engineers*

---

## 1. System Overview

EduPlan NG is architected as a high-efficiency full-stack educational platform optimized for Nigerian secondary education contexts. It pairs a zero-friction Vite 8 React 19 frontend with an Express 4.21 backend utilizing Drizzle ORM and LibSQL/SQLite for relational persistence.

```mermaid
graph TD
    Client[React 19 Vite SPA Client] -->|HTTP / JSON| API[Express REST API Server]
    Client -->|SSE| Stream[/api/notifications/stream]
    Client -->|Local Cache| IDB[(Browser IndexedDB / LocalStorage)]
    
    API -->|Drizzle ORM| DB[(LibSQL / SQLite Database)]
    API -->|REST| Kora[Kora Pay Payment Gateway]
    API -->|Generative AI| Gemini[Gemini 2.5 Flash / Pedagogical Engine]
    API -->|JSON Logger| Stdout[Structured JSON Log Stream]
```

---

## 2. Component Hierarchy

1. **Presentation Layer (`src/`)**:
   - `App.tsx`: Central coordinator managing active routing, modal dialogues, SSE connections, and offline banners.
   - `Navbar.tsx`: Multilingual language selector (EN, YO, IG, HA), Command Palette trigger, streak counter, and notification dropdown.
   - `Sidebar.tsx`: Persistent 14-module navigation with responsive mobile slide-out drawer.
   - `pages/`: 14 distinct pedagogical modules (Curriculum, Composer, Schemes, Assessments, Broadsheet, Resources, Progress, Calendar, Timetable, Comms, Community, Admin, Pricing, Settings).

2. **Backend API Layer (`server.ts`)**:
   - Authentication & Teacher profile endpoints.
   - NERDC Curriculum query endpoints.
   - Lesson Plan CRUD, autosave, and duplication endpoints.
   - Kora Pay checkout initialization and webhook verification.
   - Real-time Server-Sent Events (SSE) notification streaming.

3. **Data Layer (`src/db/`)**:
   - `schema.ts`: Type-safe relational schema for Drizzle ORM.
   - `index.ts`: LibSQL connection factory and automated SQLite table bootstrap.

---

## 3. Network & Offline Resilience

- **Cold Start Latency**: <120ms.
- **Bundle Size**: Under 85KB gzip first load.
- **Offline Capability**: PWA Service Worker caching of static assets and IndexedDB optimistic storage for drafts with background sync.
