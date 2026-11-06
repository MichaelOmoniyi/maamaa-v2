# Contribution guide

This guide is for contributors working on the current MaaMaa implementation. It does not assign authorship to past changes; see `docs/ENGINEERING_EVIDENCE.md` for dated verification notes and reported project-owner checks.

## Before changing code

1. Read the relevant user journey in `docs/CORE_USER_JOURNEYS.md` and data contract in `docs/API_CONTRACTS.md`.
2. Check the applicable decision records in `docs/adr/`.
3. Keep the boundary between implemented functionality and planned work clear. In particular, the estimator and AI reply generation are not implemented in the app.

## Making a change

- Keep database schema changes in reviewed, forward-only Supabase migrations.
- Enforce user ownership in RLS and Storage policies, not only in frontend filters.
- Never add service-role or secret API keys to frontend configuration, tests, fixtures, screenshots, or logs.
- Preserve useful failure messages without returning provider internals or user data.
- Add or update deterministic tests for validation, repository behavior, and failure cases.
- Avoid adding dependencies when Node's built-in test runner or existing libraries are enough.
- Do not add automatic production deployment or apply remote migrations as part of a routine code change.

## Local checks

From `frontend/`, run:

```powershell
npm ci
npm audit --audit-level=high
npm run typecheck
npm test
npm run build
```

The GitHub Actions workflow runs these checks on pull requests and pushes to `main`. It does not deploy the application. For database work, use a disposable Supabase project for tests and review `DEPLOYMENT.md` before applying a migration.

## Reviewing a pull request

- Check that changes match the documented behavior and do not present planned features as available.
- Review any changes to RLS, Storage, authentication, environment variables, and migrations separately.
- Confirm that tests cover the important success and failure paths.
- Review dependency and lockfile changes, especially major upgrades.
- Report what was run and what remains unverified. Do not invent performance results, CI results, or deployment status.
