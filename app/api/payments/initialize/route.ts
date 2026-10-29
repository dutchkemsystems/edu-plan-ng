import { type NextRequest, NextResponse } from '@/src/lib/next-shim.ts';
import crypto from 'crypto';
import { db } from '@/src/db/index.ts';
import { subscriptions, users } from '@/src/db/schema.ts';
import { eq } from 'drizzle-orm';
import { PLAN_PRICES, PLAN_DURATIONS_DAYS, getPlanById } from '@/src/data/subscriptionPlans.ts';

/**
 * KORA PAY PAYMENT INITIALIZATION API ROUTE
 * 
 * Required Environment Variables:
 * - KORA_SECRET_KEY: Your Kora Pay Merchant Secret Key (e.g., sk_live_... or sk_test_...)
 * - NEXT_PUBLIC_APP_URL: Base URL of your app for redirection (e.g., https://eduplan.ng or http://localhost:3000)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId, userId, email, name, redirectUrl } = body;

    if (!planId) {
      return NextResponse.json(
        { error: 'planId is required (e.g. 5_day_pass, 1_month_pass, first_term, second_term, third_term, full_session)' },
        { status: 400 }
      );
    }

    // Exact Pricing mapping as required:
    // 5-Day Trial Pass: ₦500
    // 1-Month Pass: ₦1,500
    // First Term: ₦2,000
    // Second Term: ₦3,000
    // Third Term: ₦4,000
    // Full Session (1 Year): ₦8,000 (Best Value)
    const amount = PLAN_PRICES[planId];
    if (!amount) {
      return NextResponse.json(
        { error: `Invalid planId: ${planId}. Must be one of: ${Object.keys(PLAN_PRICES).join(', ')}` },
        { status: 400 }
      );
    }

    const durationDays = PLAN_DURATIONS_DAYS[planId] || 30;
    const planDetails = getPlanById(planId);
    const reference = `kora_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const payerEmail = email || 'teacher@eduplan.ng';
    const payerName = name || 'Educator';
    const effectiveUserId = userId || 'usr_teacher_demo_01';

    const koraSecretKey = process.env.KORA_SECRET_KEY || '';
    const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const callbackUrl = redirectUrl || `${appBaseUrl}/api/payments/verify?reference=${reference}`;

    // 1. Record pending subscription in database
    const subId = `sub_${Date.now()}`;
    const startDate = new Date().toISOString();
    const expiryDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();

    await db.insert(subscriptions).values({
      id: subId,
      userId: effectiveUserId,
      plan: planId,
      status: 'pending',
      koraReference: reference,
      amount,
      currency: 'NGN',
      startDate,
      expiryDate,
      autoRenew: 1,
      receiptUrl: `https://pay.korapay.com/receipt/${reference}`,
    });

    // 2. Call Kora Pay live charge initialization endpoint
    // Endpoint: POST https://api.korapay.com/merchant/api/v1/charges/initialize
    let isLiveCheckout = false;
    let liveCheckoutUrl: string | null = null;
    let gatewayMessage: string | null = null;

    if (koraSecretKey && !koraSecretKey.includes('test_sandbox')) {
      try {
        const koraResponse = await fetch('https://api.korapay.com/merchant/api/v1/charges/initialize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${koraSecretKey}`,
          },
          body: JSON.stringify({
            reference,
            amount,
            currency: 'NGN',
            customer: {
              name: payerName,
              email: payerEmail,
            },
            notification_url: `${appBaseUrl}/api/payments/webhook`,
            redirect_url: callbackUrl,
            merchant_bears_cost: false,
            metadata: {
              planId,
              userId: effectiveUserId,
              planName: planDetails.name,
              durationDays,
            },
          }),
        });

        const koraData = await koraResponse.json();
        if (koraData.status && koraData.data?.checkout_url) {
          isLiveCheckout = true;
          liveCheckoutUrl = koraData.data.checkout_url;
        } else {
          gatewayMessage = koraData.message || koraData.error || 'Live gateway authorization key invalid or pending activation';
        }
      } catch (err: any) {
        gatewayMessage = 'Network error reaching Kora Pay API';
      }
    }

    return NextResponse.json({
      success: true,
      reference,
      checkoutUrl: liveCheckoutUrl,
      isLiveCheckout,
      gatewayMessage: gatewayMessage || (isLiveCheckout ? undefined : 'Sandbox simulated gateway active'),
      amount,
      currency: 'NGN',
      planId,
      planName: planDetails.name,
      mode: isLiveCheckout ? 'production' : 'sandbox',
      publicKey: process.env.NEXT_PUBLIC_KORA_PUBLIC_KEY || process.env.VITE_KORA_PUBLIC_KEY || '',
    });
  } catch (err: any) {
    console.error('Kora Pay initialize route error:', err);
    return NextResponse.json(
      { error: err?.message || 'Internal payment initialization failure' },
      { status: 500 }
    );
  }
}
