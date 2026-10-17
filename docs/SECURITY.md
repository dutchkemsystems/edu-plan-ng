# Security Architecture & Threat Model — EduPlan NG

---

## 1. Threat Model & Asset Protection

| Asset | Threat | Mitigation |
| :--- | :--- | :--- |
| Teacher Credentials | Credential stuffing, Rainbow tables | Argon2id-derived password hashing with high work factors. |
| Student Grades | Unauthorized tampering, leaks | School-scoped tenant isolation, RBAC checks. |
| Kora Pay Webhooks | Spoofed payments | Webhook secret signature verification and transaction inquiry checks. |
| Educational PII | NDPR violation | Strict adherence to the Nigeria Data Protection Act (NDPA 2023). |

---

## 2. Secrets Management

- **Zero Secrets Policy**: No hardcoded API keys, tokens, or private secrets in source code, commit history, or documentation.
- All secrets are injected at runtime via `.env.local` (local development) and Vercel Encrypted Environment Variables (production).
