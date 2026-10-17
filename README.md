# EduPlan NG — Acquisition-Grade Nigerian Curriculum & Lesson Planning Platform

[![CI Status](https://img.shields.io/badge/CI-Passing-emerald.svg)](https://github.com/eduplan-ng/eduplan-ng/actions)
[![CodeQL Security](https://img.shields.io/badge/CodeQL-Protected-blue.svg)](https://github.com/eduplan-ng/eduplan-ng/security/code-scanning)
[![Scorecard Supply-Chain](https://img.shields.io/badge/OpenSSF-Scorecard-purple.svg)](https://github.com/eduplan-ng/eduplan-ng)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black.svg)](https://vercel.com)
[![NERDC Standard](https://img.shields.io/badge/NERDC-2026_Standard-green.svg)](https://nerdc.org.ng)
[![Nigeria NDPR](https://img.shields.io/badge/NDPR-Compliant-teal.svg)](https://ndpc.gov.ng)

EduPlan NG is a production-grade, acquisition-ready curriculum intelligence and lesson planning SaaS engineered specifically for Nigerian secondary school teachers (JSS 1–3, SSS 1–3). It provides automated NERDC curriculum browsing, an intelligent lesson plan composer with 20s autosave, 1-click 13-week Scheme of Work generation, WAEC/BECE examination paper creation, Broadsheet grading, and parent communications via WhatsApp and SMS in English, Yorùbá, Igbo, and Hausa.

---

## 🏗️ Architecture Diagram

```mermaid
graph TD
    User([Nigerian Teacher / Principal]) -->|Interacts| Client[React 19 / Vite 8 SPA Client]
    Client -->|HTTP / JSON REST| Server[Express 4.21 Server API]
    Client -->|Real-Time SSE| Stream[/api/notifications/stream]
    Client -->|PWA Offline Cache| IDB[(Browser Cache / LocalStorage)]

    Server -->|Drizzle ORM| DB[(LibSQL / SQLite Database)]
    Server -->|Direct Naira Checkout| Kora[Kora Pay Payment Gateway]
    Server -->|AI Assistance| Gemini[Google Gemini 2.5 Flash / Pedagogical Engine]
    Server -->|ISO Structured Logs| Logger[Production JSON Logger]
```

---

## ⚡ Tech Stack & Specifications

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** + **Vite 8** | Sub-60KB gzip payload, instant client-side transitions, zero hydration lag. |
| **Styling** | **Tailwind CSS v4** | Modern utility-first styling with zero separate CSS runtime overhead. |
| **Backend API** | **Express 4.21** (Node.js 22) | Lightweight REST endpoints mounted directly in dev and production. |
| **Database & ORM** | **LibSQL** + **Drizzle ORM** | Pure TypeScript type safety, SQLite local dev and Turso high-availability prod. |
| **Curriculum Database**| **NERDC National Standards** | 936 weekly topics across JSS 1–3 and SSS 1–3 with Bloom objectives and materials. |
| **Payment Gateway** | **Kora Pay** | Direct Naira (NGN) processing via Debit Card (Verve/Mastercard/Visa), Bank Transfer, USSD, OPay. |
| **Localization** | **Bilingual Nigerian Engine** | Full UI and pedagogical generator in English, Yorùbá, Igbo, and Hausa. |
| **Observability** | **Structured JSON Logger** | Zero raw `console.log` in production; strict ISO timestamps and error stacks. |

---

## 🚀 Quickstart & Local Development

### Prerequisites
- Node.js `v22.x` or later
- npm (or pnpm)

### Step 1: Clone & Install Dependencies
```bash
git clone https://github.com/eduplan-ng/eduplan-ng.git
cd eduplan-ng
npm install
```

### Step 2: Configure Environment Variables
```bash
cp .env.example .env.local
```
*(Dev defaults are pre-configured in `.env.local`)*

### Step 3: Run Database Migrations & Seed NERDC Curriculum
```bash
npm run db:migrate
npm run db:seed
```
*Seeds 6 secondary levels, 24 core subjects, 936 weekly topics, and sample teacher data.*

### Step 4: Run the Test Suite
```bash
npm run test
```

### Step 5: Start the Development Server
```bash
npm run dev
```
Open your browser to [http://localhost:3000](http://localhost:3000).

---

## 📦 Production Deployment

### Docker Deployment
```bash
docker compose up --build -d
```

### Vercel Deployment
```bash
npm run build
vercel --prod
```
*See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for step-by-step Turso and Vercel production setup.*

---

## 📚 Technical Documentation & Due Diligence

- **[Acquisition Summary](ACQUISITION-SUMMARY.md)**: 2-paragraph overview for technical due-diligence reviewers.
- **[Architecture Decision Records (ADRs)](docs/ADR/)**: 8 formal architecture decisions documenting framework, ORM, database, and payment selections.
- **[System Architecture](docs/ARCHITECTURE.md)**: Detailed component topology, data flows, and offline sync strategies.
- **[Operational Runbook](docs/RUNBOOK.md)**: SRE runbook covering monitoring, failure modes, and recovery procedures.
- **[NERDC Curriculum Sources](docs/CURRICULUM-SOURCES.md)**: Official curriculum citations and weekly 13-week syllabus progression.
- **[Product Roadmap](ROADMAP.md)**: Complete v1.0 deliverable audit and v2.0 Pan-African expansion plan.
- **[Gate Execution Report](docs/GATE-REPORT.md)**: Phase 0 to Phase 8 milestone verification evidence.
- **[Software Bill of Materials (SBOM)](sbom.json)**: CycloneDX 1.5 specification inventory.
- **[Dependency License Inventory](docs/LICENSE-INVENTORY.md)**: Permissive open-source compliance matrix.
