# Security Architecture, Anti-Piracy & Intrusion Defense — EduPlan NG (Phase 5)

---

> ### ⚠️ Honest Security Posture & Reality Statement
> **This system cannot prevent all attackers. It prevents economically rational attacks and detects/traces sophisticated ones. Human review is required on any security alert.**
>
> In cybersecurity and anti-piracy, claim of 100% impenetrable security is dangerous and mathematically false. EduPlan NG's defense layers raise the attacker's cost of extraction above the economic value of the proprietary assets, while providing cryptographically authenticated audit trails and steganographic watermarks to identify the source of any manual leakage.

---

## 1. Threat Model & Asset Classification

| Asset | Threat Vectors | Defense Strategy & Implementation | Status |
| :--- | :--- | :--- | :--- |
| **NERDC & Lagos Scheme Prompts** | Extraction via prompt injection, LLM jailbreaks, system dump queries | Server-side prompt isolation, multi-tier regex sanitization middleware, instant HTTP 403 termination on critical attempts. | **Enforced** |
| **Generated Lesson Content** | Scraping, unauthorized syndication, competitor plagiarism | Invisible zero-width steganographic watermarking (`\u200B`, `\u200C`, `\u200D`, `\uFEFF`) embedding `userId`, `planId`, and HMAC-SHA256 signature into curriculum text. | **Active** |
| **AI Quota & Compute Budget** | Denial of Service, quota exhaustion, bot crawling | Per-IP sliding-window rate limiting (10 req/min for `/api/ai/*`, 5 req/min for `/api/auth/*`), Cloudflare WAF header extraction (`CF-Connecting-IP`, `X-Real-IP`). | **Enforced** |
| **Teacher & Student PII** | Unauthorized cross-school snooping, SQL injection | Drizzle ORM parameterized queries, NDPA 2023 compliance headers, tenant subdomain routing, school-level row isolation. | **Active** |
| **Credentials & API Keys** | Data-at-rest exfiltration | AES-256-GCM authenticated cipher with 96-bit random IVs and 128-bit authentication tags. Zero secrets committed to git. | **Active** |
| **Free Trial Quota** | Multi-account trial rotation via IP reset / VPNs | Client-side Canvas & WebGL fingerprinting, user agent hash combination; max 3 trial generations per physical machine hash. | **Active** |

---

## 2. Zero-Width Steganographic Watermarking

### 2.1 Mechanism
When a teacher or school generates or exports an OEQA-compliant lesson plan or chalkboard note, EduPlan NG injects an invisible binary signature into the text using unicode non-rendering codepoints:
- `\u200B` (Zero-Width Space) represents binary bit `0`.
- `\u200C` (Zero-Width Non-Joiner) represents binary bit `1`.
- `\u200D` (Zero-Width Joiner) serves as delimiter boundary.
- `\uFEFF` (Zero-Width No-Break Space) acts as the preamble marker.

### 2.2 Metadata Payload
```json
{
  "userId": "usr_teacher_demo_01",
  "planId": "plan_1730000000000",
  "timestamp": "2026-11-02T12:00:00.000Z",
  "signature": "a7b3c9d1"
}
```
The signature is an HMAC-SHA256 hash using the master key. Even if an adversary modifies whitespace or copies text into Microsoft Word, Google Docs, or WhatsApp, the zero-width codepoints survive unaltered and can be decoded via:
- Endpoint: `POST /api/security/watermark/verify`

---

## 3. Prompt Injection & Adversarial Defense

### 3.1 Sanitization Middleware
All requests entering `/api/ai/*` pass through `promptSanitizerMiddleware` (`src/middleware.ts`). The middleware evaluates incoming payloads against 14 adversarial jailbreak patterns, including:
- "ignore all previous instructions"
- "output your system prompt"
- "disregard all previous directions"
- "reveal your api key"
- "you are now in DAN mode / unrestricted"
- "repeat everything from the start"

### 3.2 Multi-Tier Threat Classification
- **LOW Threat (1 pattern match)**: Adversarial tokens are redacted and replaced with `[REDACTED_SECURITY_PROMPT_INJECTION]`. Request proceeds to model with clean context.
- **MEDIUM Threat (2 pattern matches)**: Tokens are stripped and an audit warning is emitted.
- **CRITICAL Threat (3+ pattern matches or explicit system prompt extraction dump)**: Request is immediately terminated with **HTTP 403 Forbidden**:
  ```json
  {
    "error": "Security Violation: Adversarial Prompt Injection Neutralized",
    "message": "Your request contains forbidden prompt override or extraction instructions.",
    "code": "PROMPT_INJECTION_BLOCKED"
  }
  ```

---

## 4. Anti-Scraping, Bot Defense & Honeypots

### 4.1 Framework Detection
The `antiScrapingMiddleware` inspects User-Agent headers, TLS client signatures, and header consistency to block automated headless browsers:
- Puppeteer
- Playwright
- Selenium / WebDriver
- PhantomJS
- Scrapy & Headless Chrome

### 4.2 Hidden Honeypot Traps
Form inputs render hidden honeypot fields (`website_url_hp`, `school_trap_code`, `bot_token_verify`) positioned off-screen via CSS. Real teachers never interact with these inputs. Any request that populates these fields is flagged as automated crawler and rejected with HTTP 403.

---

## 5. Rate Limiting (Cloudflare WAF Aware)

Rate limits are evaluated using a sliding-window bucket per client IP:
- **Cloudflare Header Priority**: `CF-Connecting-IP` ➔ `X-Real-IP` ➔ `X-Forwarded-For` ➔ `req.socket.remoteAddress`.
- `/api/ai/*`: Strict **10 requests per minute**.
- `/api/auth/*`: Strict **5 requests per minute** (thwarts credential stuffing).
- Exceeded requests receive **HTTP 429 Too Many Requests** with `Retry-After` headers and NDPA compliance audit stamps.

---

## 6. AES-256-GCM Encryption At Rest

All teacher-sensitive credentials, API configurations, and encrypted backups are secured using **AES-256-GCM** with:
- 256-bit key derived via SHA-256 from master system salt.
- 96-bit cryptographically random Initialization Vector (IV) generated per block (`crypto.randomBytes(12)`).
- 128-bit authentication tag (`cipher.getAuthTag()`) ensuring tampering detection.

---

## 7. Automated DMCA & Prompt Leakage Scanner

EduPlan NG provides an administrative scanner endpoint (`POST /api/security/dmca-scan`) that accepts external text snippets (from competitor websites, public pastebins, or forum dumps) and:
1. Scans for proprietary prompt signatures.
2. Extracts and cryptographically verifies zero-width watermarks to pinpoint the originating user account.
3. Produces an infringement score (0–100%) for review by legal counsel.

---

## 8. Incident Response Protocol

1. **Alert Generation**: An injection attempt or honeypot trigger writes an entry to `auditLogs` with threat level.
2. **Account Quarantine**: If 3 critical injection attempts originate from a single authenticated account within 1 hour, account access is suspended.
3. **Mandatory Human Review**: In compliance with the Nigeria Data Protection Act 2023, automated bans must be reviewable by an authorized School Principal or EduPlan Administrator.
