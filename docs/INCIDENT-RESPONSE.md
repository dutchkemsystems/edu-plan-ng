# Incident Response Policy & Escalation Playbook — EduPlan NG

---

## 1. Severity Classifications

| Level | Definition | Response SLA | Examples |
| :--- | :--- | :--- | :--- |
| **SEV-1 (Critical)** | Core service down for all teachers; payment failure; data breach. | < 15 minutes | Database unresponsive; Kora Pay webhooks failing across all users. |
| **SEV-2 (High)** | Degradation of key features; export failures; localized outages. | < 1 hour | PDF export failures; SSE notification channel disconnection. |
| **SEV-3 (Medium)**| Non-critical cosmetic bug or minor UI defect with workaround. | < 24 hours | Misaligned badge on mobile viewport; translation typo. |

---

## 2. Escalation Procedure

1. **Detection**: Monitoring alert triggered via `/api/health` or Sentry exception volume.
2. **Triage**: On-call engineer logs in and verifies status in `docs/RUNBOOK.md`.
3. **Communication**: Post public update on status page:
   ```text
   [INCIDENT INVESTIGATION] We are investigating an intermittent issue affecting lesson plan autosaving. All existing plans remain safe. An update will follow in 15 minutes.
   ```
4. **Resolution & Post-Mortem**: Document root cause in `docs/DECISIONS-LOG.md` within 48 hours.
