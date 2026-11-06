# MaaMaa deployment and operations

This guide describes the current application, not planned services. MaaMaa is a Nuxt frontend backed by Supabase Auth, Postgres, and private Storage. The Python/OpenAI code in `ml/` is a standalone prototype; it is not connected to the app or deployed. There is no production deploy automation in this repository. The GitHub workflow runs checks only.

## Requirements and configuration

- Node.js 22 and npm.
- A Supabase project with the repository migrations applied.
- A Vercel project connected to this GitHub repository for hosted frontend deployment.

The frontend reads these variables from `frontend/.env` locally and from the deployment environment in Vercel:

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Public anon/publishable key used by the frontend |

Never put a Supabase service-role key in frontend variables. The current app does not require an OpenAI key because AI responses are not integrated.

## Local setup and quality checks

```powershell
cd frontend
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
# Set SUPABASE_URL and SUPABASE_ANON_KEY in frontend/.env
npm ci
npm run typecheck
npm test
npm run build
```

The `.env` file must remain untracked. `npm ci` installs the exact versions in `frontend/package-lock.json`. The GitHub Actions workflow runs the same checks and `npm audit --audit-level=high` on pull requests and pushes to `main`; it does not deploy.

## Database changes

Database schema and policy changes belong in `supabase/migrations/`. Review the SQL and confirm the linked project before applying any migration:

```powershell
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase migration list --linked
npx supabase db push --dry-run
```

Only after reviewing the proposed changes and confirming a current recovery point should an operator apply them with `npx supabase db push`. Never use `db reset` against a hosted project. Prefer additive, forward-fix migrations; an application rollback does not roll back a database migration.

Use a separate Supabase project for preview or destructive tests. Configure Supabase Auth's Site URL and redirect allow-list for the actual production domain and the separate preview domain as appropriate.

## Vercel release procedure

1. Connect the repository to Vercel and set the Root Directory to `frontend`.
2. Use Node.js 22. Set the install command to `npm ci` and build command to `npm run build`.
3. Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` for the intended Vercel environments. Preview deployments should use a disposable Supabase project, not production data.
4. Open a pull request and wait for the GitHub CI checks. Deploy a Preview build and verify login, email confirmation, chat persistence, inventory CRUD, image upload and deletion, and two-account data isolation.
5. Before a production release, verify the intended Supabase project and migration status. Apply a reviewed migration separately if one is required.
6. Promote/deploy to Production through Vercel only after the preview checks pass. This repository does not automatically deploy production.
7. Verify `/api/health/live` and `/api/health/ready` on the deployed domain. The readiness route checks Supabase Auth with a bounded request and returns only a status code, a stable error code, and a request ID.

## Health checks and diagnostics

- `GET /api/health/live` reports that the Nuxt process is responding. It does not depend on Supabase.
- `GET /api/health/ready` checks configuration and Supabase Auth's health endpoint using only the public API key. It returns HTTP 503 for missing configuration, invalid configuration, timeouts, or dependency errors. It never returns credentials, database error text, or response bodies. This confirms Auth API reachability; it does not prove Postgres, Storage, RLS, or a user-authorized query is healthy.
- API requests receive an `X-Request-Id` header. Server logs are JSON records containing a request ID, route group, method, status, and duration. Query strings, request bodies, headers, and dependency error text are not logged.
- Check Vercel's function logs for correlated API requests. No external error-tracking or alerting service is configured. An uptime monitor can poll the readiness URL at a modest interval; do not poll it on every page view.

Current local build baseline: the largest emitted client JavaScript chunk was 320.19 kB (107.78 kB gzip), and the Nitro server output totaled 3.57 MB (880 kB gzip). The full build succeeded outside the Windows sandbox using Node 24.21.0 and the installed Nuxt 3.17.5 dependency tree. The lockfile now resolves newer compatible dependencies, but the local `node_modules` tree was not replaced because an esbuild binary was locked; the GitHub workflow performs a clean install on Node 22, and its first run is still pending. This is a bundle-size measurement, not a before/after improvement or an end-to-end page-load measurement.

If local Node reports certificate trust failures while reaching Supabase or npm, PowerShell can opt into the system CA store for that process with `$env:NODE_USE_SYSTEM_CA='1'` before starting the relevant command. This is a local machine setting, not a production variable.

## Failure handling and recovery

| Failure | User/system behavior | Safe response |
| --- | --- | --- |
| Supabase is unavailable or slow | Readiness returns 503 after at most 2.5 seconds; data pages should show an operation failure instead of success | Check Supabase status and Vercel logs using the request ID. Retry reads or user-confirmed actions after recovery; do not blindly replay writes. |
| Session expired or invalid | Authenticated operations fail and the user must sign in again | Confirm the auth redirect configuration, then test a fresh session. Do not log tokens. |
| Inventory row deleted but image cleanup fails | The row is removed; the UI reports that its photo may remain in Storage | Review the user's private object paths and clean up only after confirming ownership. The database and Storage are separate systems. |
| Chat or message write partially fails | The UI reports the failed step and preserves a retry path where possible | Check the chat before retrying so a new chat/message is not duplicated. Repository writes do not automatically retry. |
| Deployment build or smoke check fails | Keep the current production deployment serving users | Fix the change in a new commit or use Vercel's rollback to a known-good deployment; recheck environment variables after a rollback. |
| Database migration fails | App and schema may be on different versions | Stop the release, retain logs, inspect migration history, and apply a reviewed forward fix. Do not reset or manually delete production data. |

Vercel rollback restores an application deployment, not Supabase data or database schema. Review Vercel's [rollback behavior](https://vercel.com/docs/instant-rollback) before relying on it; environment-variable changes are not rolled back with an old build.

## Backups and restore plan

Backup availability for the current Supabase plan and the existence of any off-site export have not been verified. Confirm the plan and the Backup section in the Supabase Dashboard before treating database backups as active. Supabase's [backup guide](https://supabase.com/docs/guides/platform/backups) states that daily backups are available on Pro, Team, and Enterprise plans, with plan-dependent retention; Free projects should maintain their own exports. Database backups do **not** include Storage objects.

Recommended operating procedure:

1. Confirm the plan's backup schedule/retention and assign an owner to check backup status regularly.
2. Keep a restricted, encrypted database export outside the Supabase project on a schedule that matches the agreed recovery target. Keep object/image backups separately; database metadata alone cannot restore deleted images.
3. Keep migrations in Git and preserve the release commit associated with each schema version.
4. For a restore, record the incident time and preserve available logs. Restore a database backup to a separate recovery project where feasible, apply or verify migrations, then check Auth, RLS, chat and inventory ownership, and Storage object availability.
5. Point a staging deployment at the recovery project and run the signed-in smoke checks before changing production configuration. Do not overwrite the current project until recovered data is reviewed.

Proposed starting targets for owner review—not configured service commitments—are an RPO of up to 24 hours and an RTO of one business day for this early-stage application. If that potential data loss or downtime is unacceptable, choose a tighter target and configure/price a matching backup strategy such as more frequent exports or Supabase PITR. A restore has not yet been exercised, so recovery remains unproven until a drill is completed.
