# ADR 0002: Drizzle ORM over Prisma

- **Status**: Accepted
- **Date**: 2026-09-03
- **Deciders**: Database & Backend Team

## Context
Prisma generates heavy binary query engines (Rust binaries) that significantly increase Docker container image sizes, memory footprint in serverless/edge environments, and introduce cold start latencies.

## Decision
We adopted **Drizzle ORM** with TypeScript-native SQL schema definitions (`sqliteTable`).

## Consequences
- **Positive**: Zero binary runtime overhead, pure TypeScript type safety, direct SQL transparency, effortless LibSQL/SQLite dialect support, and minimal memory overhead (<15MB footprint).
- **Negative**: Requires writing migration scripts explicitly via `drizzle-kit` or database initialization logic.
