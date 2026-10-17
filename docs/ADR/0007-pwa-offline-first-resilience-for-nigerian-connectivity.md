# ADR 0007: PWA & Offline-First Resilience for Nigerian Connectivity

- **Status**: Accepted
- **Date**: 2026-09-15
- **Deciders**: Frontend & Mobile UX Team

## Context
Nigerian teachers frequently teach in suburban or rural schools where telecommunications networks experience periodic downtime or power cuts. Teachers cannot be locked out of lesson plans or curriculum syllabi during classroom instruction due to network failures.

## Decision
We implemented a Progressive Web App (PWA) strategy with Service Worker caching of the NERDC curriculum database, lesson plan drafts, and resources. Edits autosave every 20 seconds to local storage and IndexedDB with automatic background synchronization upon reconnection.

## Consequences
- **Positive**: App loads instantly even when completely offline. Teachers can compose and review lesson plans without active internet access.
- **Negative**: Requires handling optimistic sync conflicts when reconnecting across multiple devices.
