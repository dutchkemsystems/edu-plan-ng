# ADR 0005: Kora Pay for Nigerian Payments Integration

- **Status**: Accepted
- **Date**: 2026-09-10
- **Deciders**: Payments & Commercial Engineering

## Context
Payment processing in Nigeria requires reliable support for local payment rails: Nigerian Debit Cards (Verve, Mastercard, Visa), Direct Bank Transfer (Titan, Providus, Wema accounts), USSD codes (*737#, *894#, *966#), and mobile wallets (OPay, PalmPay, MoMo). International payment gateways (Stripe) do not support domestic Naira clearing or local debit cards effectively.

## Decision
We standardized on **Kora Pay** as the primary payment gateway for Nigerian subscriptions.

## Consequences
- **Positive**: Direct Naira settlements, 99.4% transaction success rates for domestic Nigerian cards, instant automated webhook reconciliation, and seamless sandbox testing.
- **Negative**: Requires maintaining Kora webhook signature verification and webhook retry idempotency.
