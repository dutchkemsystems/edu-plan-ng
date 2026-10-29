/**
 * EDUPLAN NG - 24-HOUR TRIAL & SUBSCRIPTION ACCESS CONTROL
 * 
 * Logic:
 * 1. Upon registration, user receives a 24-Hour Free Trial pass (`trialEndsAt` timestamp).
 * 2. If `Date.now() < trialEndsAt`, access is granted with all pedagogical features unlocked.
 * 3. After 24 hours, if user has no active paid subscription (`subscriptionExpiresAt`),
 *    access to restricted pedagogical routes is gated, prompting the user to select
 *    one of the 6 subscription tiers (5-Day, 1-Month, First Term, Second Term, Third Term, Full Session).
 */

export interface TrialState {
  isTrialActive: boolean;
  isTrialExpired: boolean;
  hasActiveSubscription: boolean;
  canAccess: boolean;
  hoursRemaining: number;
}

/**
 * Evaluates whether an educator account has access to pedagogical features.
 */
export function checkUserAccess(user: {
  trialEndsAt?: string | null;
  subscriptionExpiresAt?: string | null;
  subscriptionPlan?: string | null;
} | null): TrialState {
  if (!user) {
    return {
      isTrialActive: true,
      isTrialExpired: false,
      hasActiveSubscription: false,
      canAccess: true,
      hoursRemaining: 24,
    };
  }

  const now = Date.now();

  // 1. Check active paid subscription
  if (user.subscriptionExpiresAt) {
    const subExpiresTime = new Date(user.subscriptionExpiresAt).getTime();
    if (!isNaN(subExpiresTime) && subExpiresTime > now) {
      return {
        isTrialActive: false,
        isTrialExpired: false,
        hasActiveSubscription: true,
        canAccess: true,
        hoursRemaining: Math.round((subExpiresTime - now) / (1000 * 60 * 60)),
      };
    }
  }

  // 2. Check 24-hour trial status
  if (user.trialEndsAt) {
    const trialEndTime = new Date(user.trialEndsAt).getTime();
    if (!isNaN(trialEndTime) && trialEndTime > now) {
      const msLeft = trialEndTime - now;
      const hoursRemaining = Math.max(1, Math.round(msLeft / (1000 * 60 * 60)));
      return {
        isTrialActive: true,
        isTrialExpired: false,
        hasActiveSubscription: false,
        canAccess: true,
        hoursRemaining,
      };
    }
  }

  // 3. Fallback: if newly created or trial date not set, default to active trial (24h)
  if (!user.trialEndsAt && !user.subscriptionExpiresAt) {
    return {
      isTrialActive: true,
      isTrialExpired: false,
      hasActiveSubscription: false,
      canAccess: true,
      hoursRemaining: 24,
    };
  }

  // 4. Trial has explicitly expired and no paid subscription
  return {
    isTrialActive: false,
    isTrialExpired: true,
    hasActiveSubscription: false,
    canAccess: true, // Allow browsing pages freely; only block gated exports/actions
    hoursRemaining: 0,
  };
}
