/**
 * EduPlan NG - Strict Session Security & Anti-Piracy Manager (Phase 6)
 *
 * Implements:
 * 1. Single-Device Login Guard: Tracks IP, User-Agent, and Device Fingerprint per active session.
 * 2. Active Session Conflict Detection: Blocks simultaneous multi-device logins and provides "Force Logout".
 * 3. 10-Minute Inactivity Auto-Logout: Automatically destroys stale sessions when inactive for > 10 minutes.
 */

import { db } from '../db/index.ts';
import { activeSessions, auditLogs } from '../db/schema.ts';
import { eq, and, desc } from 'drizzle-orm';
import { logger } from './logger.ts';
import crypto from 'crypto';

export const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes in milliseconds

export interface ActiveSessionDetails {
  id: string;
  userId: string;
  sessionToken: string;
  ipAddress: string;
  userAgent: string;
  deviceFingerprint?: string | null;
  lastActivity: string;
  isActive: number | null;
  createdAt: string;
}

/**
 * Normalizes IP addresses for consistent matching (handles IPv4 mapped IPv6)
 */
export function normalizeIp(ip?: string | null): string {
  if (!ip) return '127.0.0.1';
  let clean = ip.trim();
  if (clean.includes(',')) {
    clean = clean.split(',')[0].trim();
  }
  if (clean.startsWith('::ffff:')) {
    clean = clean.substring(7);
  }
  if (clean === '::1') return '127.0.0.1';
  return clean;
}

/**
 * Normalizes User Agent string for device comparison
 */
export function normalizeUserAgent(ua?: string | null): string {
  if (!ua) return 'Standard Browser (Desktop/Mobile)';
  return ua.trim();
}

/**
 * Checks if an existing active session exists for a user and whether it conflicts
 * with an incoming login from a new device/IP.
 */
export async function checkDeviceConflict(
  userId: string,
  incomingIp: string,
  incomingUserAgent: string,
  incomingFingerprint?: string
): Promise<{
  hasConflict: boolean;
  activeSession?: ActiveSessionDetails | null;
  message?: string;
}> {
  try {
    const normIncomingIp = normalizeIp(incomingIp);
    const normIncomingUa = normalizeUserAgent(incomingUserAgent);

    // Query active sessions for this user
    const existingSessions = await db
      .select()
      .from(activeSessions)
      .where(and(eq(activeSessions.userId, userId), eq(activeSessions.isActive, 1)))
      .orderBy(desc(activeSessions.lastActivity));

    if (!existingSessions || existingSessions.length === 0) {
      return { hasConflict: false };
    }

    const currentSession = existingSessions[0];
    const lastActivityTime = new Date(currentSession.lastActivity).getTime();
    const now = Date.now();

    // Check if the current session has exceeded 10-minute inactivity
    if (now - lastActivityTime > INACTIVITY_TIMEOUT_MS) {
      // Session expired due to inactivity, auto-expire it
      await db
        .update(activeSessions)
        .set({ isActive: 0 })
        .where(eq(activeSessions.id, currentSession.id));

      logger.info(`[SessionSecurity] Expired inactive session ${currentSession.id} for user ${userId}`);
      return { hasConflict: false };
    }

    // Ignore synthetic server-boot demo placeholder session so first real browser login succeeds
    if (currentSession.userAgent === 'Mozilla/5.0 (EduPlan Demo Browser)') {
      return { hasConflict: false, activeSession: currentSession };
    }

    const normSessionIp = normalizeIp(currentSession.ipAddress);
    const normSessionUa = normalizeUserAgent(currentSession.userAgent);

    // If incoming fingerprint is provided and matches, consider it the same physical device
    if (
      incomingFingerprint &&
      currentSession.deviceFingerprint &&
      incomingFingerprint === currentSession.deviceFingerprint
    ) {
      return { hasConflict: false, activeSession: currentSession };
    }

    // Compare IP and User Agent
    const ipMatches = normSessionIp === normIncomingIp;
    const uaMatches = normSessionUa === normIncomingUa;

    // If both match, it's the same device and IP
    if (ipMatches && uaMatches) {
      return { hasConflict: false, activeSession: currentSession };
    }

    // Conflict detected: Another device/IP is actively logged in
    logger.warn(`[SessionSecurity] Active session conflict for user ${userId}: active on ${normSessionIp}, attempted login from ${normIncomingIp}`);

    return {
      hasConflict: true,
      activeSession: currentSession,
      message: `This account is currently active on another device (IP: ${normSessionIp}). Please log out from that device before logging in here.`,
    };
  } catch (err) {
    logger.error('[SessionSecurity] Error checking device conflict:', err);
    return { hasConflict: false };
  }
}

/**
 * Creates and records a new active session, invalidating any previous sessions
 * if forceLogout is requested or by single-device mandate.
 */
export async function recordActiveSession(params: {
  userId: string;
  sessionToken: string;
  ipAddress: string;
  userAgent: string;
  deviceFingerprint?: string;
  invalidateOthers?: boolean;
}): Promise<ActiveSessionDetails> {
  const { userId, sessionToken, ipAddress, userAgent, deviceFingerprint, invalidateOthers = true } = params;
  const now = new Date().toISOString();
  const sessionId = `sess_${crypto.randomBytes(12).toString('hex')}`;
  const cleanIp = normalizeIp(ipAddress);
  const cleanUa = normalizeUserAgent(userAgent);

  try {
    // Delete any existing session record with the same token or user to ensure strict single-session & no UNIQUE constraint error
    await db
      .delete(activeSessions)
      .where(eq(activeSessions.userId, userId));

    // Insert new active session
    await db.insert(activeSessions).values({
      id: sessionId,
      userId,
      sessionToken,
      ipAddress: cleanIp,
      userAgent: cleanUa,
      deviceFingerprint: deviceFingerprint || null,
      lastActivity: now,
      isActive: 1,
      createdAt: now,
    });

    // Record audit log for security telemetry
    try {
      await db.insert(auditLogs).values({
        id: `aud_${crypto.randomBytes(8).toString('hex')}`,
        userId,
        action: 'USER_LOGIN_SESSION_ESTABLISHED',
        resource: 'session',
        resourceId: sessionId,
        details: JSON.stringify({
          ipAddress: cleanIp,
          userAgent: cleanUa.substring(0, 150),
          deviceFingerprint,
          singleDeviceEnforced: true,
        }),
        timestamp: now,
      });
    } catch (e) {
      // audit log failure should not break session establishment
    }

    return {
      id: sessionId,
      userId,
      sessionToken,
      ipAddress: cleanIp,
      userAgent: cleanUa,
      deviceFingerprint,
      lastActivity: now,
      isActive: 1,
      createdAt: now,
    };
  } catch (err) {
    logger.error('[SessionSecurity] Failed to record active session:', err);
    throw err;
  }
}

/**
 * Force logouts all existing sessions for a given user.
 */
export async function forceLogoutUser(userId: string, requestingIp?: string): Promise<{ success: boolean; invalidatedCount: number }> {
  try {
    const existing = await db
      .select()
      .from(activeSessions)
      .where(and(eq(activeSessions.userId, userId), eq(activeSessions.isActive, 1)));

    await db
      .update(activeSessions)
      .set({ isActive: 0 })
      .where(and(eq(activeSessions.userId, userId), eq(activeSessions.isActive, 1)));

    const now = new Date().toISOString();
    try {
      await db.insert(auditLogs).values({
        id: `aud_${crypto.randomBytes(8).toString('hex')}`,
        userId,
        action: 'FORCE_LOGOUT_OTHER_DEVICE',
        resource: 'session',
        resourceId: userId,
        details: JSON.stringify({
          requestingIp: normalizeIp(requestingIp),
          invalidatedSessions: existing.map((s) => s.id),
          timestamp: now,
        }),
        timestamp: now,
      });
    } catch (e) {}

    logger.info(`[SessionSecurity] Force logged out ${existing.length} active sessions for user ${userId}`);
    return { success: true, invalidatedCount: existing.length };
  } catch (err) {
    logger.error('[SessionSecurity] Failed to force logout user:', err);
    return { success: false, invalidatedCount: 0 };
  }
}

/**
 * Touches a session on every API request.
 * Enforces the 10-minute inactivity check. If inactive for > 10 minutes, destroys session.
 */
export async function touchSessionActivity(sessionToken: string): Promise<{
  valid: boolean;
  expired: boolean;
  message?: string;
  session?: ActiveSessionDetails | null;
}> {
  try {
    if (!sessionToken) {
      return { valid: false, expired: false };
    }

    const sessions = await db
      .select()
      .from(activeSessions)
      .where(eq(activeSessions.sessionToken, sessionToken));

    if (!sessions || sessions.length === 0) {
      return { valid: false, expired: true, message: 'Session has been invalidated or terminated.' };
    }

    const session = sessions[0];
    if (session.isActive !== 1) {
      return { valid: false, expired: true, message: 'Session has been invalidated.' };
    }

    const lastActivityTime = new Date(session.lastActivity).getTime();
    const now = Date.now();

    // 10-Minute Inactivity Auto-Logout Check
    if (now - lastActivityTime > INACTIVITY_TIMEOUT_MS) {
      await db
        .update(activeSessions)
        .set({ isActive: 0 })
        .where(eq(activeSessions.id, session.id));

      logger.warn(`[SessionSecurity] Session ${session.id} destroyed due to 10 minutes of inactivity`);
      return {
        valid: false,
        expired: true,
        message: 'You have been logged out due to 10 minutes of inactivity.',
      };
    }

    // Update lastActivity to current timestamp
    const nowIso = new Date().toISOString();
    await db
      .update(activeSessions)
      .set({ lastActivity: nowIso })
      .where(eq(activeSessions.id, session.id));

    return {
      valid: true,
      expired: false,
      session: {
        ...session,
        lastActivity: nowIso,
      },
    };
  } catch (err) {
    logger.error('[SessionSecurity] Error touching session activity:', err);
    return { valid: true, expired: false };
  }
}

/**
 * Invalidates a specific session by token
 */
export async function invalidateSession(sessionToken: string): Promise<boolean> {
  try {
    await db
      .update(activeSessions)
      .set({ isActive: 0 })
      .where(eq(activeSessions.sessionToken, sessionToken));
    return true;
  } catch (err) {
    logger.error('[SessionSecurity] Error invalidating session:', err);
    return false;
  }
}
