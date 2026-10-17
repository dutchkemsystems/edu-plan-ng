# On-Call Runbook & Operational Playbook — EduPlan NG

---

## 1. Primary Health Monitoring

- **Endpoint**: `GET /api/health`
- **Expected Response**: HTTP 200 OK
  ```json
  {
    "status": "healthy",
    "product": "EduPlan NG",
    "version": "1.0.0",
    "curriculum": "NERDC JSS 1-3 & SSS 1-3 Standard"
  }
  ```

---

## 2. Common Incidents & Remediation Procedures

### Incident A: Kora Pay Webhook Delivery Timeout
- **Symptoms**: Teacher completes card/transfer checkout but account remains in `pending` status.
- **Root Cause**: Transient network latency between Kora webhook dispatchers and production edge.
- **Remediation**:
  1. Inspect logs for `[KORA WEBHOOK] Received event payload`.
  2. Query database for pending reference:
     ```sql
     SELECT * FROM subscriptions WHERE kora_reference = 'kora_...';
     ```
  3. Replay webhook manually via curl or execute status check:
     ```bash
     curl -X GET https://api.eduplan.ng/api/payment/status/<REFERENCE>
     ```

### Incident B: Local Database File Lock
- **Symptoms**: `SQLITE_BUSY` error during concurrent writes.
- **Remediation**:
  1. Verify LibSQL WAL (Write-Ahead Logging) is enabled:
     ```sql
     PRAGMA journal_mode=WAL;
     ```
  2. In production, ensure connection is routed to Turso managed cloud instances.

### Incident C: High Memory / Process Crash
- **Symptoms**: Process restart loop reported by Docker healthcheck.
- **Remediation**:
  1. Inspect container logs:
     ```bash
     docker logs eduplan_ng_app --tail 100
     ```
  2. Check memory consumption: `docker stats eduplan_ng_app`.
  3. Restart container: `docker restart eduplan_ng_app`.
