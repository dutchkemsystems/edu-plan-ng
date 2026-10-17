# Local Development Guide — EduPlan NG
*Environment: Node.js 22+, LibSQL/SQLite, React 19, Vite 8, Express 4.21*

---

## 1. Prerequisites

- **Node.js**: `v22.x` or later
- **Package Manager**: `npm` (or `pnpm`)
- **Operating System**: Linux / macOS / WSL2

---

## 2. Environment Setup

1. Copy the example configuration:
   ```bash
   cp .env.example .env.local
   ```
2. Generate an authentication secret:
   ```bash
   openssl rand -base64 32
   ```
3. Set your generated secret in `.env.local`:
   ```env
   DATABASE_URL="file:local.db"
   BETTER_AUTH_SECRET="<YOUR_GENERATED_SECRET>"
   BETTER_AUTH_URL=http://localhost:3000
   KORA_SECRET_KEY="ks_test_sandbox_eduplan_demo"
   KORA_ENCRYPTION_KEY="ke_test_sandbox_encryption"
   KORA_WEBHOOK_SECRET="kw_test_sandbox_secret"
   RESEND_API_KEY="re_dev_mock_key"
   EMAIL_FROM="EduPlan NG <notifications@eduplan.ng>"
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

---

## 3. Database Initialization & Seeding

Run the database schema setup and seed the full NERDC curriculum (JSS 1–3, SSS 1–3, 936 weekly topics):

```bash
npm run db:migrate
npm run db:seed
```

This populates:
- 6 secondary levels (JSS 1–3, SSS 1–3)
- 24 curriculum subjects
- 936 weekly topics with objectives, activities, materials, and evaluation
- Demo teacher account: `amina.balogun@schools.ng`
- Sample published lesson plans, resources, schemes of work, and broadsheets

---

## 4. Starting the Development Server

Start the full-stack server (Express REST API + Vite frontend mounted on port 3000):

```bash
npm run dev
```

Open your browser to:
[http://localhost:3000](http://localhost:3000)

---

## 5. Running the Test Suite

Execute the automated integration tests:

```bash
npm run test
```

---

## 6. Kora Pay Sandbox Verification

- Checkout initiation: `POST /api/payment/initialize`
- Webhook simulation: `POST /api/payment/webhook` with `{ reference: "kora_..." }`
- Verification: `GET /api/payment/status/:reference`
