# Production Deployment Guide — EduPlan NG

---

## 1. Vercel Deployment

1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Link the repository:
   ```bash
   vercel link
   ```
3. Configure environment variables in Vercel Dashboard:
   - `DATABASE_URL`: Your distributed Turso database URL (`libsql://...`)
   - `DATABASE_AUTH_TOKEN`: Turso client auth token
   - `KORA_SECRET_KEY`: Production Kora Pay live secret key (`ks_live_...`)
   - `KORA_ENCRYPTION_KEY`: Production encryption key
   - `KORA_WEBHOOK_SECRET`: Webhook verification secret
   - `BETTER_AUTH_SECRET`: 32-byte base64 secret (`openssl rand -base64 32`)
   - `GEMINI_API_KEY`: Google AI Studio Gemini API key
4. Deploy:
   ```bash
   vercel --prod
   ```

---

## 2. Turso Database Provisioning

1. Install Turso CLI:
   ```bash
   curl -sSfL https://get.tur.so/install.sh | bash
   ```
2. Authenticate and create production database:
   ```bash
   turso auth login
   turso db create eduplan-prod --location lhr
   ```
3. Retrieve database URL and authentication token:
   ```bash
   turso db show eduplan-prod --url
   turso db tokens create eduplan-prod
   ```
4. Run schema migration and seed:
   ```bash
   DATABASE_URL="libsql://eduplan-prod-org.turso.io" DATABASE_AUTH_TOKEN="ey..." npm run db:migrate
   DATABASE_URL="libsql://eduplan-prod-org.turso.io" DATABASE_AUTH_TOKEN="ey..." npm run db:seed
   ```

---

## 3. Docker Container Deployment

1. Build container:
   ```bash
   docker compose build
   ```
2. Run in detached mode:
   ```bash
   docker compose up -d
   ```
3. Verify health:
   ```bash
   curl http://localhost:3000/api/health
   ```
