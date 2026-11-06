# MaaMaa engineering evidence log

**Last updated:** 2026-11-06  
**Purpose:** Preserve evidence for engineering review and interviews. This log separates automated checks, tool observations, and project-owner reports. It does not assign authorship or invent a commit history.

## Scope and starting state

- The original Supabase project was reportedly deleted without a backup. The current tracked migration is a reconstructed schema baseline; it is not a copy of the deleted database or its data.
- A new Supabase project was created and the project owner reports applying the migration and testing the app with real accounts.
- The current app is Nuxt/Vue plus Supabase Auth, Postgres, and Storage. The Python/OpenAI prototype is separate and is not used by the application.
- Work in this repository is still uncommitted. Phase 3 through Phase 8 files are present together in the working tree. The project owner reports applying the initial schema earlier; no production deployment or remote migration was performed during Phases 3 through 8.

## Changes recorded

| Area | Change | Evidence/limit |
| --- | --- | --- |
| Data access | Chat and inventory persistence were moved into checked repository modules; deterministic fake-Supabase contract tests were added. | Tests verify expected filters, ownership payloads, mapping, and selected failure/partial-failure behavior. They do not execute deployed RLS. |
| Security | Production response headers and safer external share windows were added. The dependency lockfile was updated using non-force semver-compatible fixes. | The latest Phase 8 `npm audit --audit-level=high` check exited 0. Its report showed 0 high, 0 critical, 13 moderate, and 2 low advisories; some remaining findings were marked no fix available. |
| Reliability | Added separate liveness/readiness routes and API request IDs with JSON status/duration logs. | Readiness checks Supabase Auth only. It intentionally does not use a service-role key or query private tables; it does not prove Postgres, Storage, or RLS health. |
| Delivery | Added GitHub Actions checks for clean install, high-severity audit, typecheck, tests, and production build. Updated the deployment and recovery guide. | The workflow syntax was parsed locally. Its first GitHub run and any production deploy remain pending. CI does not deploy. |
| Documentation | Replaced unsupported feature and contribution claims with current behavior, architecture, ADRs, and this evidence log. | Documentation is based on tracked code and the available conversation record, not access to the deleted project. |

## Verification results

### Automated checks

- `cd frontend && npm test`: **20 tests passed** on 2026-11-06. Coverage includes quantity validation, chat/inventory repository contracts, and readiness configuration/HTTP-error/timeout handling. It uses fakes for Supabase requests.
- `cd frontend && npm run typecheck`: **passed** on 2026-11-06 using the locally installed dependency tree.
- `git diff --check`: **passed**, apart from a Git line-ending conversion notice for `DEPLOYMENT.md`.
- `npm run build`: **passed** outside the Windows sandbox on 2026-11-06. The local installed tree was Nuxt 3.17.5 on Node 24.21.0. The lockfile now resolves newer compatible packages; local `node_modules` was not synchronized because an esbuild binary was locked. The clean Node 22 build in GitHub Actions has not run yet.
- CI YAML syntax: parsed locally and the expected `quality` job was present. This is not a GitHub Actions run.

### Runtime smoke check

The local production preview was started with the existing local Supabase environment and system CA support. `GET /api/health/live` returned HTTP 200; `GET /api/health/ready` returned HTTP 200 after reaching Supabase Auth. The response and log included matching request IDs. The readiness result confirms Auth API reachability only; it does not query database records or test Storage.

### User-reported checks

The project owner reports that real account sessions, chat persistence, inventory photo upload, and two-account isolation were manually verified. Those are useful manual checks, but the repository does not yet automate them. Live image deletion and a restore drill have not been verified.

## Performance measurement

One local production build emitted a largest client JavaScript chunk of **320.19 kB** (**107.78 kB gzip**) and Nitro server output totaling **3.57 MB** (**880 kB gzip**). These figures came from the build tool's emitted-size report on the locally installed Nuxt 3.17.5 tree. They are a single-build size measurement, not a before/after comparison, browser page-load result, or performance improvement claim. No end-to-end latency or load benchmark has been run.

## Decisions and trade-offs

- RLS and Storage ownership checks are the authorization boundary for direct browser-to-Supabase data calls. Repository owner IDs are not a substitute for database policy.
- Node's built-in test runner and fakes avoid a new test dependency and keep tests deterministic, at the cost of not proving browser behavior or deployed RLS.
- Health readiness checks Auth with a public key and bounded timeout. This avoids exposing a privileged key, at the cost of not directly measuring database or Storage health.
- No automatic write retry is used for non-idempotent inserts. Chat creation and its first message are separate operations, so partial chat creation is possible and has a tested/manual recovery path.
- AI and catering estimate outputs remain disconnected because no production model contract, quantity/price validation, or provider-failure strategy is implemented.

## Remaining limitations and follow-up evidence

- First GitHub Actions run against a clean install is pending.
- The Vercel project's actual environment, deployment, rollback, and domain settings have not been verified here.
- Supabase plan, active backup schedule, off-site Storage-object backup, retention, and a successful restore are unverified. The RPO/RTO values in `DEPLOYMENT.md` are proposed starting targets, not approved commitments.
- Auth health does not confirm Postgres, Storage, RLS, or user-level data access.
- The npm audit still reports 13 moderate and 2 low advisories; some currently have no fix available in the dependency tree. Do not use a forced major upgrade without a separate compatibility review.
- There is no browser automation, live RLS integration test, AI integration/evaluation, or end-to-end performance benchmark.

## Project-owner understanding

Before presenting the project, the owner should be able to explain the request flow in `README.md`, the ownership policies in `supabase/migrations/`, the repository tests, and the differences among liveness, readiness, and a true database/RLS check. This evidence log does not claim that any person authored code unless Git history demonstrates it.

## Phase 7 portfolio review

- Added a ten-dimension internal readiness assessment with ratings, evidence, gaps, and a next improvement for each dimension in `docs/PORTFOLIO_READINESS.md`.
- Added Software Engineering and Production Engineering narrative drafts. They explicitly disclose AI-assisted implementation, distinguish user-reported checks from automated evidence, and avoid claiming a verified production deployment or restore drill.
- These drafts need the owner's review for personal role, learning, and spoken explanation. They are not an MLH acceptance prediction and do not claim access to a private rubric.

## Phase 8 final verification and cleanup

- Removed the uncalled `supabase/functions/inventory-ai-data/index.ts` because it referenced an RPC absent from the migration and the read-only project inventory found no deployed Edge Functions.
- Reviewed the tracked frontend tests: quantity validation, repository contracts, fake Supabase helper, and health readiness tests are all exercised by `npm test`; no obsolete test file was found.
- Retained Nuxt-discovered pages, components, the standalone ML notebook, and public assets because the framework/runtime may discover them or their future use cannot be ruled out safely from static text searches alone.
- Final `npm test`, `npm run typecheck`, `npm audit --audit-level=high`, repository link checks, and `git diff --check` were run after cleanup. The production build result is the successful Phase 5 build from the same Nuxt source; the only application-source cleanup was deletion of the uncalled legacy Edge Function.
- No test file was removed; each is exercised by `npm test`. The cleanup audit found no generated files in the working tree.
- Phase 8 is locally complete with external verification limits recorded below; no production deployment, hosted CI run, or restore drill was performed.
- Re-ran Phase 8 checks on 2026-11-06; results and limitations are summarized in the final report. The first remote CI run, production deployment, and a real backup restore remain unverified.
