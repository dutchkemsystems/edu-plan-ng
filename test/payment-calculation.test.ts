/**
 * Vitest / Unit Test: Payment & Subscription Duration Mapping
 * 
 * Verifies that:
 * 1. ₦1,500 termly plans (First Term, Second Term, Third Term, termly) map strictly to 90 days (1 academic term).
 * 2. 5-day trial maps to 5 days (₦500).
 * 3. 1-month pass maps to 30 days (₦1,000).
 * 4. Full academic session maps to 365 days (₦3,000).
 * 5. B2B institutional school tiers (Bronze, Silver, Gold) map to 105 days per term.
 */

import { PLAN_DURATIONS_DAYS, PLAN_PRICES, ALL_SUBSCRIPTION_PLANS } from '../src/data/subscriptionPlans.ts';

export function testPaymentCalculations() {
  console.log('🧪 Running Payment Duration & Tier Calculation Unit Tests...\n');

  let passed = 0;
  let failed = 0;

  function assertEqual(actual: any, expected: any, desc: string) {
    if (actual === expected) {
      console.log(`  ✅ PASS: ${desc}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${desc} -> Expected "${expected}", got "${actual}"`);
      failed++;
    }
  }

  // 1. Termly Plan Duration
  assertEqual(PLAN_DURATIONS_DAYS['first_term'], 90, 'first_term duration is 90 days');
  assertEqual(PLAN_DURATIONS_DAYS['second_term'], 90, 'second_term duration is 90 days');
  assertEqual(PLAN_DURATIONS_DAYS['third_term'], 90, 'third_term duration is 90 days');
  assertEqual(PLAN_DURATIONS_DAYS['termly'], 90, 'termly duration is 90 days');

  // 2. Termly Plan Price
  assertEqual(PLAN_PRICES['first_term'], 1500, 'first_term price is ₦1,500');
  assertEqual(PLAN_PRICES['second_term'], 1500, 'second_term price is ₦1,500');
  assertEqual(PLAN_PRICES['third_term'], 1500, 'third_term price is ₦1,500');
  assertEqual(PLAN_PRICES['termly'], 1500, 'termly price is ₦1,500');

  // 3. 5-Day Sprint Pass
  assertEqual(PLAN_DURATIONS_DAYS['5_day_pass'], 5, '5_day_pass duration is 5 days');
  assertEqual(PLAN_PRICES['5_day_pass'], 500, '5_day_pass price is ₦500');

  // 4. 1-Month Pass
  assertEqual(PLAN_DURATIONS_DAYS['1_month_pass'], 30, '1_month_pass duration is 30 days');
  assertEqual(PLAN_PRICES['1_month_pass'], 1000, '1_month_pass price is ₦1,000');

  // 5. Full Academic Session
  assertEqual(PLAN_DURATIONS_DAYS['full_session'], 365, 'full_session duration is 365 days');
  assertEqual(PLAN_PRICES['full_session'], 3000, 'full_session price is ₦3,000');

  // 6. B2B Institutional Tiers (Bronze, Silver, Gold: 105 days per term)
  assertEqual(PLAN_DURATIONS_DAYS['b2b_bronze'], 105, 'b2b_bronze duration is 105 days');
  assertEqual(PLAN_PRICES['b2b_bronze'], 45000, 'b2b_bronze price is ₦45,000');
  assertEqual(PLAN_DURATIONS_DAYS['b2b_gold'], 105, 'b2b_gold duration is 105 days');
  assertEqual(PLAN_PRICES['b2b_gold'], 250000, 'b2b_gold price is ₦250,000');

  // 7. Verify Date Calculation Helper
  const now = Date.now();
  const termlyDays = PLAN_DURATIONS_DAYS['termly'];
  const termlyExpiry = new Date(now + termlyDays * 24 * 60 * 60 * 1000);
  const diffDays = Math.round((termlyExpiry.getTime() - now) / (1000 * 60 * 60 * 24));
  assertEqual(diffDays, 90, 'Date delta arithmetic correctly maps termly to exactly 90 calendar days');

  console.log(`\n========================================`);
  console.log(`Unit Test Results: ${passed} passed, ${failed} failed.`);
  console.log(`========================================\n`);

  if (failed > 0) process.exit(1);
}

// Execute if run directly via tsx
testPaymentCalculations();
