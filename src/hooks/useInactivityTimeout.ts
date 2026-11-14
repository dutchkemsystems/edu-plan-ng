import { useEffect, useRef } from 'react';
import { sendAuthHeartbeat, signOutUser } from '../lib/api.ts';

const INACTIVITY_LIMIT_MS = 10 * 60 * 1000; // 10 minutes
const HEARTBEAT_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes

interface UseInactivityTimeoutOptions {
  isAuthenticated: boolean;
  onTimeout: (message: string) => void;
}

export function useInactivityTimeout({ isAuthenticated, onTimeout }: UseInactivityTimeoutOptions) {
  const lastActivityRef = useRef<number>(Date.now());
  const heartbeatTimerRef = useRef<any>(null);
  const checkTimerRef = useRef<any>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
      if (checkTimerRef.current) clearInterval(checkTimerRef.current);
      return;
    }

    lastActivityRef.current = Date.now();

    const recordUserActivity = () => {
      lastActivityRef.current = Date.now();
    };

    // User interaction events that reset the inactivity timer
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    activityEvents.forEach((evt) => {
      window.addEventListener(evt, recordUserActivity, { passive: true });
    });

    // Check inactivity every 15 seconds
    checkTimerRef.current = setInterval(async () => {
      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed >= INACTIVITY_LIMIT_MS) {
        if (checkTimerRef.current) clearInterval(checkTimerRef.current);
        if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
        await signOutUser(false);
        onTimeout('You have been logged out due to 10 minutes of inactivity.');
      }
    }, 15000);

    // Send periodic heartbeat to keep backend session updated while active
    heartbeatTimerRef.current = setInterval(async () => {
      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed < INACTIVITY_LIMIT_MS) {
        try {
          const res = await sendAuthHeartbeat();
          if (res.expired) {
            if (checkTimerRef.current) clearInterval(checkTimerRef.current);
            if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
            await signOutUser(false);
            onTimeout(res.message || 'You have been logged out due to 10 minutes of inactivity.');
          }
        } catch (e) {}
      }
    }, HEARTBEAT_INTERVAL_MS);

    return () => {
      activityEvents.forEach((evt) => {
        window.removeEventListener(evt, recordUserActivity);
      });
      if (checkTimerRef.current) clearInterval(checkTimerRef.current);
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
    };
  }, [isAuthenticated, onTimeout]);
}
