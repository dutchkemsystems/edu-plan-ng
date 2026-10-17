# ADR 0004: Better Auth & Teacher Profile Security

- **Status**: Accepted
- **Date**: 2026-09-08
- **Deciders**: Security & Backend Team

## Context
Teacher accounts need seamless authentication, school role-based authorization (Teacher vs HOD vs Principal), and password/email verification flows without external third-party vendor lock-in.

## Decision
We implemented a self-contained, standards-based authentication and teacher session architecture compatible with Better Auth specifications. Tokens are logged in development mode without exposing PII in production.

## Consequences
- **Positive**: Strict session verification, full control over user profiles and school assignments, and zero cost per active user.
- **Negative**: Requires maintaining token generation and session expiration policies in-house.
