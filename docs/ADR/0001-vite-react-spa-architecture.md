# ADR 0001: Vite React SPA Architecture with Express Full-Stack Middleware

- **Status**: Accepted
- **Date**: 2026-09-01
- **Deciders**: Full-Stack Architecture Team

## Context
Nigerian secondary school teachers frequently operate on mobile devices, low-cost laptops, and constrained bandwidth connections. The platform requires instantaneous sub-second client-side responsiveness, rich offline caching for lesson editing during power or network outages, and a lightweight Node/Express server runtime for REST APIs.

## Decision
We chose a Vite 8 React 19 Single Page Application (SPA) architecture combined with an Express backend mounted via Vite's `server.middlewares` during development and static distribution in production.

## Consequences
- **Positive**: Blazing fast compilation (<50ms HMR equivalent), sub-50KB initial gzip payload, deterministic client-side routing, and zero overhead hydration delays.
- **Negative**: Requires client-side SEO optimization and metadata management.
