/**
 * EduPlan NG - Security, Anti-Piracy, Steganographic Watermarking & Intrusion Defense (Phase 5)
 *
 * Core Pillars:
 * 1. Zero-Width Steganographic Watermarking: Embeds user ID & timestamp invisibly in generated plans.
 * 2. AES-256-GCM Encryption At Rest: Encrypts sensitive prompts, credentials, and user data.
 * 3. Prompt Injection Neutralization: Detects and strips adversarial jailbreaks and system prompt extraction.
 * 4. Anti-Scraping & Bot Detection: Detects headless browsers (Puppeteer, Playwright, Selenium) & honeypots.
 * 5. Device & Browser Fingerprinting: Enforces trial allowances per physical machine/canvas hash.
 * 6. Automated DMCA & Prompt Leakage Scanner: Scans text for leaked prompt signatures and watermark origins.
 *
 * NOTE: As documented in docs/SECURITY.md, this system prevents economically rational attacks
 * and provides cryptographic tracing for leaks. Human review is required for any security alert.
 */

import crypto from 'node:crypto';
import { logger } from './logger.ts';

// Master Encryption Key (32 bytes for AES-256-GCM)
const MASTER_ENCRYPTION_KEY = process.env.ENCRYPTION_MASTER_KEY
  ? crypto.createHash('sha256').update(process.env.ENCRYPTION_MASTER_KEY).digest()
  : crypto.createHash('sha256').update('eduplan-ng-statutory-master-aes-256-salt-2026').digest();

// ============================================================================
// 1. ZERO-WIDTH STEGANOGRAPHIC WATERMARKING
// ============================================================================
// Zero-width characters used for binary encoding:
// \u200B = Zero-Width Space (bit 0)
// \u200C = Zero-Width Non-Joiner (bit 1)
// \u200D = Zero-Width Joiner (delimiter / boundary marker)
// \uFEFF = Zero-Width No-Break Space (watermark preamble indicator)
const ZW_ZERO = '\u200B';
const ZW_ONE = '\u200C';
const ZW_DELIM = '\u200D';
const ZW_START = '\uFEFF';

export interface WatermarkPayload {
  userId: string;
  timestamp: string;
  planId?: string;
  signature?: string;
}

/**
 * Encodes a text payload into an invisible zero-width unicode character sequence
 */
export function encodeZeroWidth(text: string): string {
  const binary = Buffer.from(text, 'utf-8')
    .toString('binary')
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');

  return (
    ZW_START +
    binary
      .split('')
      .map((bit) => (bit === '0' ? ZW_ZERO : ZW_ONE))
      .join('') +
    ZW_DELIM
  );
}

/**
 * Decodes an invisible zero-width unicode sequence back to cleartext
 */
export function decodeZeroWidth(text: string): string | null {
  const startIndex = text.indexOf(ZW_START);
  if (startIndex === -1) return null;

  const endIndex = text.indexOf(ZW_DELIM, startIndex);
  if (endIndex === -1) return null;

  const zwSequence = text.substring(startIndex + ZW_START.length, endIndex);
  let binary = '';

  for (const char of zwSequence) {
    if (char === ZW_ZERO) binary += '0';
    else if (char === ZW_ONE) binary += '1';
  }

  if (binary.length === 0 || binary.length % 8 !== 0) return null;

  const bytes: number[] = [];
  for (let i = 0; i < binary.length; i += 8) {
    bytes.push(parseInt(binary.substring(i, i + 8), 2));
  }

  return Buffer.from(bytes).toString('utf-8');
}

/**
 * Embeds an invisible cryptographic watermark into generated lesson plans.
 * If leaked publicly, EduPlan NG can immediately identify the user who generated it.
 */
export function embedWatermark(
  content: string,
  metadata: { userId: string; planId?: string; timestamp?: string }
): string {
  const ts = metadata.timestamp || new Date().toISOString();
  const rawPayload: WatermarkPayload = {
    userId: metadata.userId,
    timestamp: ts,
    planId: metadata.planId,
    signature: crypto
      .createHmac('sha256', MASTER_ENCRYPTION_KEY)
      .update(`${metadata.userId}:${ts}:${metadata.planId || ''}`)
      .digest('hex')
      .slice(0, 8),
  };

  const encoded = encodeZeroWidth(JSON.stringify(rawPayload));

  // Natural steganography: inject zero-width marker after the first paragraph or period
  const splitIdx = content.indexOf('. ');
  if (splitIdx !== -1) {
    return content.slice(0, splitIdx + 1) + encoded + content.slice(splitIdx + 1);
  }

  return content + encoded;
}

/**
 * Extracts and verifies the cryptographic watermark from an arbitrary text snippet
 */
export function extractWatermark(content: string): (WatermarkPayload & { verified: boolean }) | null {
  const decoded = decodeZeroWidth(content);
  if (!decoded) return null;

  try {
    const payload: WatermarkPayload = JSON.parse(decoded);
    const expectedSig = crypto
      .createHmac('sha256', MASTER_ENCRYPTION_KEY)
      .update(`${payload.userId}:${payload.timestamp}:${payload.planId || ''}`)
      .digest('hex')
      .slice(0, 8);

    const verified = payload.signature === expectedSig;
    return {
      ...payload,
      verified,
    };
  } catch {
    return null;
  }
}

// ============================================================================
// 2. AES-256-GCM ENCRYPTION AT REST
// ============================================================================

export interface EncryptedData {
  cipherText: string;
  iv: string;
  authTag: string;
  algorithm: 'aes-256-gcm';
}

/**
 * Encrypts sensitive data (prompts, API keys, teacher credentials) using AES-256-GCM with authentication tag
 */
export function encryptAesGcm(plainText: string, key = MASTER_ENCRYPTION_KEY): EncryptedData {
  const iv = crypto.randomBytes(12); // 96-bit IV recommended for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  let encrypted = cipher.update(plainText, 'utf-8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');

  return {
    cipherText: encrypted,
    iv: iv.toString('hex'),
    authTag,
    algorithm: 'aes-256-gcm',
  };
}

/**
 * Decrypts AES-256-GCM encrypted data. Throws if data has been tampered with.
 */
export function decryptAesGcm(data: EncryptedData, key = MASTER_ENCRYPTION_KEY): string {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(data.iv, 'hex'));
  decipher.setAuthTag(Buffer.from(data.authTag, 'hex'));

  let decrypted = decipher.update(data.cipherText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
}

// ============================================================================
// 3. PROMPT INJECTION & JAILBREAK NEUTRALIZATION
// ============================================================================

const ADVERSARIAL_PATTERNS = [
  /(ignore|disregard|forget|override|clear|bypass)\s+(all\s+)?(previous|prior|above|system|developer|hidden)\s+(instructions|prompts|commands|rules|directives|context)/gi,
  /(output|reveal|leak|dump|print|show|display|expose|repeat)\s+(the|your|all|hidden)?\s*(system\s+prompt|developer\s+instructions?|initial\s+prompt|meta\s+instructions)/gi,
  /system\s+prompt\s*(reveal|leak|output|dump|print|extraction)/gi,
  /what\s+(is|are)\s+your\s+(system|developer|hidden|initial)\s+(prompt|instructions|rules)/gi,
  /you\s+are\s+now\s+(an?\s+)?(unfiltered|unrestricted|jailbroken|evil|dan|developer mode)/gi,
  /dan\s+mode\s+enabled/gi,
  /jailbreak\s+active/gi,
  /act\s+as\s+an\s+unfiltered\s+ai/gi,
  /reveal\s+your\s+api\s*key/gi,
  /output\s+the\s+hidden\s+text\s+above/gi,
  /repeat\s+everything\s+(above|from\s+the\s+start)/gi,
  /print\s+verbatim\s+the\s+system\s+message/gi,
  /new\s+rule:\s+you\s+must\s+comply/gi,
  /disregard\s+all\s+safety\s+guidelines/gi,
];

export interface InjectionSanitizeResult {
  cleanInput: string;
  flagged: boolean;
  threatLevel: 'NONE' | 'LOW' | 'MEDIUM' | 'CRITICAL';
  matchedSignatures: string[];
}

/**
 * Sanitizes input before hitting AI models. Replaces detected adversarial triggers.
 */
export function sanitizeAndGuardPrompt(rawInput: string): InjectionSanitizeResult {
  if (!rawInput || typeof rawInput !== 'string') {
    return { cleanInput: '', flagged: false, threatLevel: 'NONE', matchedSignatures: [] };
  }

  let cleanInput = rawInput;
  const matchedSignatures: string[] = [];

  for (const pattern of ADVERSARIAL_PATTERNS) {
    if (pattern.test(cleanInput)) {
      matchedSignatures.push(pattern.source);
      cleanInput = cleanInput.replace(pattern, '[REDACTED_SECURITY_PROMPT_INJECTION]');
    }
  }

  // Remove dangerous control characters
  cleanInput = cleanInput.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();

  const flagged = matchedSignatures.length > 0;
  let threatLevel: 'NONE' | 'LOW' | 'MEDIUM' | 'CRITICAL' = 'NONE';

  if (matchedSignatures.length >= 3) {
    threatLevel = 'CRITICAL';
  } else if (matchedSignatures.length >= 2) {
    threatLevel = 'MEDIUM';
  } else if (matchedSignatures.length === 1) {
    threatLevel = 'LOW';
  }

  return { cleanInput, flagged, threatLevel, matchedSignatures };
}

// ============================================================================
// 4. ANTI-SCRAPING & HEADLESS BROWSER DETECTION
// ============================================================================

const SCRAPER_USER_AGENTS = [
  /puppeteer/i,
  /playwright/i,
  /headlesschrome/i,
  /phantomjs/i,
  /selenium/i,
  /webdriver/i,
  /scrapy/i,
  /python-requests/i,
  /aiohttp/i,
  /node-fetch/i,
  /postmanruntime/i,
  /insomnia/i,
];

export interface BotDetectionResult {
  isSuspicious: boolean;
  botType?: string;
  honeypotTriggered: boolean;
  action: 'ALLOW' | 'CHALLENGE_CAPTCHA' | 'BLOCK_403';
}

/**
 * Detects headless browser bots, scrapers, and honeypot traps
 */
export function detectBotOrScraper(
  userAgent: string = '',
  headers: Record<string, any> = {},
  body: Record<string, any> = {}
): BotDetectionResult {
  // 1. Check honeypot fields in form body
  // Legitimate users will leave these empty because they are hidden via CSS
  const honeypotFields = ['website_url_hp', 'school_trap_code', 'bot_token_verify'];
  for (const field of honeypotFields) {
    if (body && body[field] && String(body[field]).trim().length > 0) {
      logger.warn(`[AntiScraping] Honeypot triggered by field "${field}"`);
      return {
        isSuspicious: true,
        botType: `Honeypot Trap (${field})`,
        honeypotTriggered: true,
        action: 'BLOCK_403',
      };
    }
  }

  // 2. Check User-Agent signatures
  for (const pattern of SCRAPER_USER_AGENTS) {
    if (pattern.test(userAgent)) {
      return {
        isSuspicious: true,
        botType: `Automated Tool (${pattern.source})`,
        honeypotTriggered: false,
        action: 'BLOCK_403',
      };
    }
  }

  // 3. Headless Chrome detection via headers (Missing Accept-Language or missing Sec-Fetch)
  if (userAgent.includes('Chrome') && !headers['accept-language']) {
    return {
      isSuspicious: true,
      botType: 'Headless Browser Signature (Missing Accept-Language)',
      honeypotTriggered: false,
      action: 'CHALLENGE_CAPTCHA',
    };
  }

  return { isSuspicious: false, honeypotTriggered: false, action: 'ALLOW' };
}

// ============================================================================
// 5. DEVICE & BROWSER FINGERPRINTING FOR TRIAL ABUSE DEFENSE
// ============================================================================

// In-memory fingerprint usage store (max 3 free preview generations per device)
const deviceFingerprintStore = new Map<string, { count: number; firstSeen: string; lastSeen: string }>();

/**
 * Calculates a deterministic device fingerprint based on userAgent, language, IP, and client canvas hash
 */
export function generateDeviceFingerprint(params: {
  userAgent: string;
  ip: string;
  acceptLanguage?: string;
  canvasHash?: string;
}): string {
  const raw = `${params.userAgent}|${params.ip.split('.').slice(0, 3).join('.')}|${params.acceptLanguage || ''}|${params.canvasHash || ''}`;
  return crypto.createHash('sha256').update(raw).digest('hex').slice(0, 16);
}

/**
 * Enforces trial allowances per unique browser/device fingerprint (preventing IP rotation abuse)
 */
export function checkFingerprintTrialAllowance(
  fingerprint: string,
  maxTrials = 3
): { allowed: boolean; remaining: number; totalUsed: number } {
  const now = new Date().toISOString();
  const entry = deviceFingerprintStore.get(fingerprint);

  if (!entry) {
    deviceFingerprintStore.set(fingerprint, { count: 1, firstSeen: now, lastSeen: now });
    return { allowed: true, remaining: maxTrials - 1, totalUsed: 1 };
  }

  if (entry.count >= maxTrials) {
    entry.lastSeen = now;
    return { allowed: false, remaining: 0, totalUsed: entry.count };
  }

  entry.count += 1;
  entry.lastSeen = now;
  return { allowed: true, remaining: maxTrials - entry.count, totalUsed: entry.count };
}

// ============================================================================
// 6. PROMPT LEAKAGE & DMCA SCANNER
// ============================================================================

const PROPRIETARY_PROMPT_SIGNATURES = [
  'Nigerian Cultural Context Standard (NERDC & Lagos OEQA)',
  'WAEC/NECO 10-Year Exam Prediction Algorithm',
  'Chief Examiner Common Pitfalls & Scoring Marks Distribution',
  'Differentiated Instruction Matrix: Struggling, On-Level, Advanced (Gifted)',
  'Curriculum-isolated lesson plan engine for Nigerian Basic Education',
];

export interface DmcaScanResult {
  scanTarget: string;
  leaksFound: boolean;
  detectedSignatures: string[];
  extractedWatermark: WatermarkPayload | null;
  infringementScorePct: number;
}

/**
 * Scans public or external text snippets (e.g. from GitHub, pastebins, competitors)
 * to detect stolen prompts or leaked lesson plans stamped with EduPlan NG watermarks.
 */
export function runDmcaScan(externalContent: string, scanTarget = 'External Submission'): DmcaScanResult {
  const detectedSignatures: string[] = [];

  for (const sig of PROPRIETARY_PROMPT_SIGNATURES) {
    if (externalContent.includes(sig)) {
      detectedSignatures.push(sig);
    }
  }

  const extracted = extractWatermark(externalContent);
  const infringementScorePct = Math.min(
    100,
    detectedSignatures.length * 25 + (extracted ? 50 : 0)
  );

  return {
    scanTarget,
    leaksFound: detectedSignatures.length > 0 || extracted !== null,
    detectedSignatures,
    extractedWatermark: extracted,
    infringementScorePct,
  };
}
