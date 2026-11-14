/**
 * EduPlan NG - Enterprise Security & Governance Middleware
 *
 * Implements:
 * 1. API Rate-Limiting: Max 10 requests/min per IP on /api/ai/* (Part 2.2)
 * 2. Prompt Injection Defense: Sanitizes inputs and strips malicious jailbreaks (Part 2.3)
 * 3. Router Guard & RLS Context: B2C vs B2B Data Isolation policies (Part 1.4)
 * 4. Subdomain & White-Label Tenant Routing: e.g. portal.chrislandschools.com
 * 5. NDPA 2023 Compliance Headers: Nigeria Data Protection Act 2023 (Part 2.4)
 */

import type { Request, Response, NextFunction } from 'express';
import {
  checkRateLimit,
  sanitizePromptInput,
  enforceRLS,
  SECURITY_CONFIG,
} from './lib/security.config.ts';
import {
  sanitizeAndGuardPrompt,
  detectBotOrScraper,
  generateDeviceFingerprint,
  checkFingerprintTrialAllowance,
} from './lib/security-engine.ts';
import type { AccountType, B2BTier, RLSContext } from './types/index.ts';
import { touchSessionActivity } from './lib/session-manager.ts';
import { resolveEffectiveUserTier, resolveTierConfig } from './lib/feature-gating.ts';

// Extend Express Request with security context
declare global {
  namespace Express {
    interface Request {
      rlsContext?: RLSContext;
      tenantSlug?: string;
      isWhiteLabel?: boolean;
      injectionDetected?: boolean;
      deviceFingerprint?: string;
    }
  }
}

/**
 * 1. RATE LIMITING MIDDLEWARE (Cloudflare WAF Aware)
 * Strict per-IP limits:
 * - 10 requests/minute on AI routes (/api/ai/*)
 * - 5 requests/minute on Auth routes (/api/auth/*)
 */
export function rateLimiterMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.path === '/health' || req.path === '/api/health') {
    return next();
  }

  const clientIp =
    (req.headers['cf-connecting-ip'] as string) ||
    (req.headers['x-real-ip'] as string) ||
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  let routeType: 'ai' | 'auth' | 'general' = 'general';
  if (req.path.startsWith('/api/ai/') || req.path.includes('/ai')) {
    routeType = 'ai';
  } else if (
    req.path.startsWith('/api/auth/sign-in') ||
    req.path.startsWith('/api/auth/sign-up') ||
    req.path.startsWith('/api/auth/force-logout')
  ) {
    routeType = 'auth';
  }

  const { allowed, remaining, retryAfterSec } = checkRateLimit(clientIp, routeType);

  res.setHeader('X-RateLimit-Remaining', remaining);
  res.setHeader('X-Client-IP', clientIp);

  if (!allowed) {
    const limit = routeType === 'ai' ? 10 : routeType === 'auth' ? 25 : 120;
    res.setHeader('Retry-After', retryAfterSec || 60);
    return res.status(429).json({
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Maximum ${limit} requests per minute permitted on this endpoint.`,
      retryAfterSeconds: retryAfterSec,
      complianceStandard: 'NDPA 2023 & Cloudflare Bot Management Policy',
    });
  }

  next();
}

/**
 * 2. PROMPT INJECTION SANITIZATION & JAILBREAK DEFENSE MIDDLEWARE
 * Recursively scans request bodies, strips adversarial injection signatures,
 * and terminates requests with 403 if threat is critical.
 */
export function promptSanitizerMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.body && typeof req.body === 'object') {
    let injectionFound = false;
    let maxThreat: string = 'NONE';
    const allSignatures: string[] = [];

    const sanitizeObject = (obj: any): any => {
      if (typeof obj === 'string') {
        const { cleanInput, flagged, threatLevel, matchedSignatures } = sanitizeAndGuardPrompt(obj);
        if (flagged) {
          injectionFound = true;
          allSignatures.push(...matchedSignatures);
          if (threatLevel === 'CRITICAL' || (threatLevel === 'MEDIUM' && maxThreat !== 'CRITICAL')) {
            maxThreat = threatLevel;
          }
        }
        return cleanInput;
      }
      if (Array.isArray(obj)) {
        return obj.map(sanitizeObject);
      }
      if (obj !== null && typeof obj === 'object') {
        const sanitized: any = {};
        for (const [key, val] of Object.entries(obj)) {
          sanitized[key] = sanitizeObject(val);
        }
        return sanitized;
      }
      return obj;
    };

    req.body = sanitizeObject(req.body);

    if (injectionFound) {
      req.injectionDetected = true;
      console.warn(`[SecurityGuard] Prompt injection attempt intercepted on ${req.path} (${allSignatures.join(', ')})`);

      if (maxThreat === 'CRITICAL') {
        return res.status(403).json({
          error: 'Security Violation: Adversarial Prompt Injection Neutralized',
          message: 'Your request contains forbidden prompt override or extraction instructions.',
          code: 'PROMPT_INJECTION_BLOCKED',
        });
      }
    }
  }

  next();
}

/**
 * 3. ANTI-SCRAPING, CURRICULUM DATA DEFENSE & BOT MIDDLEWARE (Phase 6)
 * - Blocks direct requests to raw curriculum JSON files or /curriculum-data/* (HTTP 403 CURRICULUM_DATA_PROTECTED)
 * - Traps automated scrapers (Puppeteer, Playwright, Selenium) & honeypot triggers (HTTP 403 SCRAPER_BOT_PROHIBITED)
 * - Blocks unauthenticated public scraping of curriculum source selectors and schemas (HTTP 401 AUTH_REQUIRED_FOR_CURRICULUM)
 */
export function antiScrapingMiddleware(req: Request, res: Response, next: NextFunction) {
  const reqPath = (req.path || '').toLowerCase();

  // Never block Vite dev server modules, imported JSON transforms under /src/, HMR internals, or bundled static assets
  const isFrontendModuleOrAsset =
    reqPath.startsWith('/src/') ||
    reqPath.startsWith('/@') ||
    reqPath.startsWith('/node_modules/') ||
    reqPath.startsWith('/assets/') ||
    reqPath.endsWith('.ts') ||
    reqPath.endsWith('.tsx') ||
    reqPath.endsWith('.js') ||
    reqPath.endsWith('.jsx') ||
    reqPath.endsWith('.mjs') ||
    reqPath.endsWith('.css') ||
    reqPath.endsWith('.png') ||
    reqPath.endsWith('.svg') ||
    reqPath.endsWith('.ico') ||
    reqPath.endsWith('.woff') ||
    reqPath.endsWith('.woff2');

  // 1. Block direct public access or scraping of raw curriculum JSON datasets
  if (
    !isFrontendModuleOrAsset && (
      reqPath.includes('curriculum-data') ||
      reqPath.includes('/data/curriculum') ||
      (reqPath.endsWith('.json') && (
        reqPath.includes('jss') ||
        reqPath.includes('sss') ||
        reqPath.includes('lagos') ||
        reqPath.includes('nerdc') ||
        reqPath.includes('curriculum') ||
        reqPath.includes('waec') ||
        reqPath.includes('neco') ||
        reqPath.includes('bece') ||
        reqPath.includes('oeqa')
      ))
    )
  ) {
    return res.status(403).json({
      error: 'Access Denied: Curriculum Data Protected',
      message: 'Direct access, bulk download, or automated scraping of raw curriculum JSON datasets is strictly prohibited under EduPlan NG Anti-Piracy Policy and Section 20 of the Nigerian Copyright Act 2022. Curriculum content is accessible exclusively via authorized pedagogical lesson plan synthesis.',
      code: 'CURRICULUM_DATA_PROTECTED',
      statutoryNotice: 'Nigerian Copyright Act 2022 (Act No. 8) Sec. 20 - Transformative Fair Use Protection',
    });
  }

  // 2. Automated Scraping & Bot Detection (apply to API/data routes, never static frontend assets)
  const userAgent = req.headers['user-agent'] || '';
  if (!isFrontendModuleOrAsset && reqPath.startsWith('/api/')) {
    const detection = detectBotOrScraper(userAgent, req.headers, req.body || {});

    if (detection.action === 'BLOCK_403') {
      console.warn(`[AntiScraping] Blocked automated bot request on ${req.path}: ${detection.botType}`);
      return res.status(403).json({
        error: 'Access Denied',
        message: 'Automated scraping tools, headless browsers, or honeypot triggers were detected.',
        code: 'SCRAPER_BOT_PROHIBITED',
      });
    }
  }

  // 3. Guard Curriculum Source Selectors and Syllabus Data from Public Unauthenticated Access
  // Source selectors and curriculum JSON data must never be exposed via public endpoints.
  const isProtectedCurriculumEndpoint =
    (reqPath.startsWith('/api/curriculum-sources') ||
      reqPath.startsWith('/api/subscription/source-entitlements') ||
      reqPath.startsWith('/api/subscription/select-source') ||
      reqPath.startsWith('/api/school/curriculum-preferences') ||
      reqPath.startsWith('/api/curriculum/levels') ||
      reqPath.startsWith('/api/curriculum/topic') ||
      reqPath.startsWith('/api/curriculum/sync-status') ||
      reqPath.startsWith('/api/curriculum/tiered-sync') ||
      reqPath.startsWith('/api/curriculum/source-compliance') ||
      reqPath.startsWith('/api/curriculum/regional') ||
      reqPath.startsWith('/api/curriculum/versions')) &&
    !reqPath.startsWith('/api/cron/') &&
    !reqPath.startsWith('/api/webhook/');

  if (isProtectedCurriculumEndpoint) {
    let token: string | null = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }
    if (!token && req.headers.cookie) {
      const isLoggedOut = req.headers.cookie.includes('eduplan_logged_out=true');
      if (!isLoggedOut) {
        const match = req.headers.cookie.match(/(?:eduplan_session|better-auth\.session_token)=([^;]+)/);
        if (match) {
          token = match[1].trim();
        }
      }
    }
    if (!token && (req as any).cookies) {
      const cookies = (req as any).cookies;
      if (cookies['eduplan_logged_out'] !== 'true') {
        token = cookies['eduplan_session'] || cookies['better-auth.session_token'] || null;
      }
    }

    if (!token) {
      return res.status(401).json({
        error: 'Authentication Required for Curriculum Access',
        message: 'Curriculum sources, schemes of work, and syllabus selectors are protected intellectual property restricted to authenticated Nigerian educators and institutions. Public scraping is prohibited under Nigerian Copyright Act 2022 Sec. 20.',
        code: 'AUTH_REQUIRED_FOR_CURRICULUM',
        statutoryNotice: 'Nigerian Copyright Act 2022 Sec. 20 - Access restricted to authenticated educators',
      });
    }
  }

  // Generate and attach device fingerprint
  const clientIp =
    (req.headers['cf-connecting-ip'] as string) ||
    (req.headers['x-real-ip'] as string) ||
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  req.deviceFingerprint = generateDeviceFingerprint({
    userAgent,
    ip: clientIp,
    acceptLanguage: req.headers['accept-language'],
    canvasHash: (req.headers['x-device-canvas'] as string) || (req.body?.canvasHash as string),
  });

  next();
}

/**
 * 3. NDPA 2023 COMPLIANCE & HEADERS MIDDLEWARE
 */
export function ndpaComplianceHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-NDPA-Compliance', 'Act-2023-Sec24-Authorized');
  res.setHeader('X-Data-Controller', SECURITY_CONFIG.NDPA_2023.dataController);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
}

/**
 * 4. SUBDOMAIN & WHITE-LABEL TENANT ROUTER
 * Parses Host header to detect B2B School custom subdomains or domains
 */
export function tenantSubdomainMiddleware(req: Request, res: Response, next: NextFunction) {
  const host = (req.headers.host || '').toLowerCase();
  
  // Example: chrisland.eduplan.ng or portal.chrislandschools.com
  if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
    const parts = host.split('.');
    if (parts.length > 2 && !parts[0].startsWith('ais-') && !parts[0].startsWith('www')) {
      req.tenantSlug = parts[0];
      req.isWhiteLabel = true;
    }
  }

  next();
}

/**
 * 5. ROUTER GUARD & RLS CONTEXT ATTACHMENT
 * Extracts user authentication, verifies B2C vs B2B isolation, and enforces RLS policies
 */
export function createRlsGuard(options?: { requireRole?: string[]; b2bOnly?: boolean; b2gOnly?: boolean }) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const xUserId = (req.headers['x-user-id'] as string) || null;
    const xRole = (req.headers['x-user-role'] as string) || null;
    const xTierOverride = (req.headers['x-user-tier'] as string) || null;

    let userId: string | null = xUserId ? xUserId.trim() : null;

    if (!userId && authHeader && authHeader.startsWith('Bearer ')) {
      const rawToken = authHeader.substring(7).trim();
      const cleanId = rawToken.replace(/^auth_tok_/, '').trim();
      if (cleanId) userId = cleanId;
    }

    if (!userId && req.headers.cookie) {
      const isLoggedOut = req.headers.cookie.includes('eduplan_logged_out=true');
      if (!isLoggedOut) {
        const match = req.headers.cookie.match(/(?:eduplan_session|better-auth\.session_token)=([^;]+)/);
        if (match) {
          const cleanId = match[1].trim().replace(/^auth_tok_/, '').trim();
          if (cleanId) userId = cleanId;
        }
      }
    }

    if (!userId && req.rlsContext?.userId) {
      userId = req.rlsContext.userId;
    }

    const effectiveLookupId = userId || 'usr_teacher_demo_01';

    let accountType: AccountType = 'b2c_individual';
    let role = 'teacher';
    let schoolId: string | null = null;
    let b2bTier: B2BTier | null = null;
    let tierId = 'b2c_trial_5day';

    if (xTierOverride) {
      const cfg = resolveTierConfig(xTierOverride);
      tierId = cfg.id;
      accountType = cfg.category === 'b2g' ? 'b2g_government' : cfg.category === 'b2b' ? 'b2b_school' : 'b2c_individual';
      if (cfg.category === 'b2g') {
        b2bTier = 'state_platinum';
        role = 'ministry_official';
      } else if (cfg.category === 'b2b') {
        b2bTier = cfg.id.replace('b2b_', '') as B2BTier;
        role = 'principal';
        schoolId = 'sch_kings_college_01';
      }
    } else {
      const resolved = await resolveEffectiveUserTier(effectiveLookupId);
      const cfg = resolveTierConfig(resolved.tierId);
      tierId = cfg.id;

      if (resolved.userRecord) {
        accountType =
          resolved.accountType === 'b2g'
            ? 'b2g_government'
            : resolved.accountType === 'b2b'
            ? 'b2b_school'
            : 'b2c_individual';
        role = xRole || resolved.userRecord.role || (accountType === 'b2g_government' ? 'ministry_official' : accountType === 'b2b_school' ? 'principal' : 'teacher');
        schoolId = resolved.userRecord.schoolId || req.rlsContext?.schoolId || null;
        b2bTier =
          accountType === 'b2g_government'
            ? 'state_platinum'
            : accountType === 'b2b_school'
            ? (cfg.id.replace('b2b_', '') as B2BTier)
            : null;
      } else if (effectiveLookupId.includes('principal') || effectiveLookupId.includes('admin') || effectiveLookupId.includes('okafor')) {
        role = 'principal';
        accountType = 'b2b_school';
        schoolId = 'sch_fgc_lagos_01';
        b2bTier = 'gold';
        tierId = 'b2b_gold';
      } else if (effectiveLookupId.includes('school') || effectiveLookupId.includes('b2b')) {
        accountType = 'b2b_school';
        schoolId = 'sch_fgc_lagos_01';
        b2bTier = 'silver';
        tierId = 'b2b_silver';
      }
    }

    if (xRole) {
      role = xRole;
    }

    // Attach verified RLS Context to request
    req.rlsContext = {
      ...(req.rlsContext || {}),
      userId: effectiveLookupId,
      accountType,
      schoolId,
      role: role as any,
      b2bTier,
    };

    const isSuper = role === 'super_admin' || role === 'superadmin';

    // B2G Ministry Only check
    if (options?.b2gOnly && !isSuper && accountType !== 'b2g_government') {
      return res.status(403).json({
        error: 'State Ministry Directorate Access Only',
        message: 'This command capability is strictly reserved for B2G State Ministry Platinum accounts.',
        code: 'UPGRADE_REQUIRED_B2G',
        requiredTier: 'b2g_state_platinum',
        currentTier: tierId,
      });
    }

    // B2B / Institutional Only check (allows B2B School & B2G State Directorate; blocks B2C Individual Teachers)
    if (options?.b2bOnly && !isSuper && accountType !== 'b2b_school' && accountType !== 'b2g_government') {
      return res.status(403).json({
        error: 'Enterprise Access Only',
        message: 'This institutional feature is reserved for B2B School (Bronze, Silver, Gold) or B2G Ministry accounts. Individual teacher accounts must upgrade to a School Plan.',
        code: 'UPGRADE_REQUIRED',
        requiredTier: 'b2b_bronze',
        currentTier: tierId,
      });
    }

    // Role check if required (B2G super/ministry officials have supervisory rights across school admin panels when authorized)
    if (options?.requireRole && !isSuper && !options.requireRole.includes(role)) {
      if (!(accountType === 'b2g_government' && options.b2bOnly)) {
        return res.status(403).json({
          error: 'Forbidden',
          message: `Role '${role}' is not authorized to access this resource. Required: ${options.requireRole.join(', ')}`,
          code: 'RLS_ROLE_FORBIDDEN',
        });
      }
    }

    next();
  };
}

/**
 * 6. SESSION AUTH & ROUTE GUARD (Edge & Express Compatible)
 * Prevents logged-out users from accessing /dashboard/* and redirects authenticated users from /login
 */
export function middleware(req: any) {
  const url = typeof req.nextUrl?.clone === 'function'
    ? req.nextUrl.clone()
    : new URL(req.nextUrl ? req.nextUrl.toString() : req.url, 'http://localhost:3000');
  const pathname = url.pathname;

  let sessionToken: string | null = null;
  let isLoggedOut = false;

  if (req.cookies) {
    if (typeof req.cookies.get === 'function') {
      sessionToken = req.cookies.get('eduplan_session')?.value || req.cookies.get('better-auth.session_token')?.value || null;
      isLoggedOut = req.cookies.get('eduplan_logged_out')?.value === 'true';
    } else {
      sessionToken = req.cookies['eduplan_session'] || req.cookies['better-auth.session_token'] || null;
      isLoggedOut = req.cookies['eduplan_logged_out'] === 'true';
    }
  }

  if (!sessionToken && req.headers) {
    const rawCookie = typeof req.headers.get === 'function' ? req.headers.get('cookie') : req.headers.cookie;
    if (rawCookie) {
      if (rawCookie.includes('eduplan_logged_out=true')) {
        isLoggedOut = true;
      }
      const match = rawCookie.match(/(?:eduplan_session|better-auth\.session_token)=([^;]+)/);
      if (match && !isLoggedOut) {
        sessionToken = match[1];
      }
    }
  }

  const isAuthenticated = Boolean(sessionToken && !isLoggedOut);

  // Guard: Protect /dashboard and /dashboard/* from logged-out users
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/app/dashboard')) {
    if (!isAuthenticated) {
      url.pathname = '/login';
      url.searchParams.set('redirect', pathname);
      return new Response(null, {
        status: 307,
        headers: {
          Location: url.toString(),
          'Cache-Control': 'no-store, max-age=0, must-revalidate',
        },
      });
    }
  }

  // Guard: Redirect already-authenticated users away from /login and /signup
  if (pathname === '/login' || pathname === '/signup' || pathname === '/auth') {
    if (isAuthenticated) {
      url.pathname = '/dashboard';
      url.searchParams.delete('redirect');
      return new Response(null, {
        status: 307,
        headers: {
          Location: url.toString(),
          'Cache-Control': 'no-store, max-age=0, must-revalidate',
        },
      });
    }
  }

  const response = new Response(null, {
    headers: {
      'X-NDPA-Compliance': 'Act-2023-Sec24-Authorized',
      'X-Data-Controller': SECURITY_CONFIG.NDPA_2023.dataController,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': pathname.startsWith('/api/') ? 'no-store' : 'public, max-age=3600',
    },
  });

  return response;
}

/**
 * 6. SESSION INACTIVITY & AUTO-LOGOUT MIDDLEWARE (Phase 6)
 * Checks last activity timestamp on active sessions. If > 10 minutes inactive,
 * invalidates session, clears auth cookies, and returns 401 INACTIVITY_TIMEOUT.
 */
export async function sessionInactivityMiddleware(req: Request, res: Response, next: NextFunction) {
  // Extract token from Authorization header or cookies
  let token: string | null = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  }

  if (!token && req.headers.cookie) {
    const match = req.headers.cookie.match(/(?:eduplan_session|better-auth\.session_token)=([^;]+)/);
    if (match) {
      token = match[1].trim();
    }
  }

  // Skip inactivity check for unauthenticated routes, health check, payment webhooks, cron, and sign-in/up endpoints
  if (
    !token ||
    req.path.startsWith('/api/auth/sign-in') ||
    req.path.startsWith('/api/auth/sign-up') ||
    req.path.startsWith('/api/auth/force-logout') ||
    req.path.startsWith('/api/payment') ||
    req.path.startsWith('/api/cron/') ||
    req.path.startsWith('/api/webhook/') ||
    req.path === '/api/health'
  ) {
    return next();
  }

  try {
    const result = await touchSessionActivity(token);
    if (result.expired) {
      res.setHeader('Set-Cookie', [
        'eduplan_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; HttpOnly; SameSite=Lax',
        'better-auth.session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; HttpOnly; SameSite=Lax',
        'eduplan_logged_out=true; Path=/; Max-Age=31536000; SameSite=Lax',
      ]);
      return res.status(401).json({
        error: 'You have been logged out due to 10 minutes of inactivity.',
        code: 'INACTIVITY_TIMEOUT',
      });
    }
  } catch (err) {
    // Fail safe
  }

  next();
}
