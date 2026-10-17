# ADR 0003: SQLite Local Development / Turso LibSQL Production Split

- **Status**: Accepted
- **Date**: 2026-09-05
- **Deciders**: Infrastructure & DevOps Lead

## Context
Developers and CI environments require instant, zero-configuration local databases without launching heavy PostgreSQL containers or maintaining external cloud dependencies during offline development. However, production requires high-availability replication across Lagos and European data centers.

## Decision
We utilize the `@libsql/client` driver:
- Local development runs against a local file-backed SQLite database (`file:local.db`).
- Production connects to distributed Turso LibSQL instances via `libsql://` or HTTPS connection strings with `DATABASE_AUTH_TOKEN`.

## Consequences
- **Positive**: Single unified schema and query syntax via Drizzle across local dev and production. Zero cloud dependencies for local tests and CI.
- **Negative**: Certain complex PostgreSQL-specific extensions (e.g. pgvector) are omitted in favor of standard relational schemas.
