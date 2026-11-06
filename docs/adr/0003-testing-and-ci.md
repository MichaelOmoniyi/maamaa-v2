# ADR 0003: Use deterministic repository tests and CI checks

- **Status:** Accepted for the current test suite
- **Date recorded:** 2026-11-06

## Context

The application has a small frontend data layer, pure inventory validation, health-check logic, and no existing browser-test or integration-test framework. Tests use Node's built-in runner and a fake Supabase client. A GitHub Actions workflow is configured to run install, audit, typecheck, unit/repository tests, and a production build without deploying; its first hosted run is pending.

## Problem

Changes to data mapping, ownership fields, partial failures, and health behavior need repeatable checks without writing to a real user database.

## Considered alternatives

- Keep only manual testing.
- Add a third-party test framework immediately.
- Use the built-in Node runner for deterministic module tests and retain manual checks for browser and real Supabase behavior.

## Decision

Use Node's built-in `node:test` for unit and repository contract checks. Test data queries with deterministic fakes. Use GitHub Actions for a clean dependency install, `npm audit --audit-level=high`, `npm run typecheck`, `npm test`, and `npm run build`.

## Reasons

- The current tests require no additional test framework dependency.
- Fakes allow repeatable checks for database and Storage errors without destructive test data.
- CI gives pull requests a reproducible Linux build path and does not require production credentials.

## Trade-offs and consequences

- Fakes cannot prove deployed RLS, Auth redirects, signed URLs, or browser rendering.
- CI uses placeholder Supabase configuration and never deploys.
- The workflow has not yet had its first GitHub run; the clean lockfile install remains to be observed there.

## Revisit when

The project adds more interactive flows, recurring browser regressions, or a disposable Supabase test environment. Add browser or integration tests only with an isolated project and clear cleanup rules.
