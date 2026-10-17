# ADR 0006: Sentry & Structured JSON Observability

- **Status**: Accepted
- **Date**: 2026-09-12
- **Deciders**: DevOps & Reliability Engineering

## Context
Raw `console.log` statements pollute production stdout, lack stack traces, prevent automated log parsing in Datadog/CloudWatch, and can accidentally leak PII or tokens.

## Decision
We established:
1. Strict prohibition of raw `console.log` in production code.
2. A centralized `StructuredLogger` in `src/lib/logger.ts` emitting ISO-timestamped JSON payloads with log levels (`info`, `warn`, `error`, `debug`).
3. Sentry integration for real-time frontend and backend error telemetry.

## Consequences
- **Positive**: Clean log aggregation, zero accidental token leakage, actionable stack traces, and automatic Sentry issue deduplication.
- **Negative**: Developers must import the logger instead of using standard console methods.
