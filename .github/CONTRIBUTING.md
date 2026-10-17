# Contributing to EduPlan NG

Thank you for your interest in contributing to EduPlan NG — Nigeria's acquisition-grade educational platform.

## Engineering Principles

1. **Pedagogical Integrity**: All curriculum logic must strictly reflect Nigerian NERDC guidelines (JSS 1–3, SSS 1–3).
2. **TypeScript Strict**: Zero `any` types without explicit justification.
3. **Structured Logging**: No raw `console.log` in production code. Use `logger.info`, `logger.warn`, `logger.error` from `src/lib/logger.ts`.
4. **Conventional Commits**: Commit messages follow standard format: `feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`.

## Local Development Workflow

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Setup environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Initialize and seed the local database:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
4. Run tests:
   ```bash
   npm run test
   ```
5. Start the full-stack server on port 3000:
   ```bash
   npm run dev
   ```

## Pull Request Guidelines

- Ensure your branch passes `npm run lint` and `npm run test`.
- Add test coverage for new endpoints or features.
- Fill out the PR checklist in `.github/PULL_REQUEST_TEMPLATE.md`.
