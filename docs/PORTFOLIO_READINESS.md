# MaaMaa portfolio-readiness assessment

**Assessment date:** 2026-11-06  
**Purpose:** An evidence-based internal review of the project as it stands. This is not MLH's private selection rubric and does not predict admission.

## Rating scale

- **1:** Little working evidence; the claim is mostly an idea.
- **2:** Some implementation, but important behavior or evidence is missing.
- **3:** A useful implemented foundation with meaningful checks and material gaps.
- **4:** Strong, repeatable evidence across most relevant workflows, with bounded gaps.
- **5:** Exceptional evidence across real users, automated and operational validation, and sustained maintenance.

No dimension receives a 5 without broad, repeatable evidence. Scores describe the current repository and available project-owner reports, not the potential of planned features.

## Review dimensions

| Dimension | Rating | Evidence | Weaknesses | Highest-value next improvement |
| --- | ---: | --- | --- | --- |
| Problem definition and user value | **3/5** | The README names African event planners, caterers, home cooks, and food vendors. The app supports inventory and saved notes and collects event inputs. | There is no documented user research, usage data, or validated catering estimate. The central event-planning outcome is still incomplete. | Interview target users and validate one measurable planning workflow before adding features. |
| Technical depth | **3/5** | Nuxt/Vue, Supabase Auth, relational data, RLS, private image storage, signed URLs, export/delete RPCs, and partial-failure handling are present in the tracked implementation. | No production AI integration, pricing/quantity engine, separate application API, or live integration suite. Complexity is appropriate but currently modest. | Add one real, tested end-to-end workflow or a validated catering calculation only after its data source and rules are defined. |
| Code quality and architecture | **3/5** | Chat and inventory access is in repository modules; JSDoc checking and data contracts are documented; Nitro health routes are separate from user-data calls. | Main Vue pages still hold substantial UI logic. Typecheck does not check Vue SFC scripts. The lockfile was updated but local modules still need a clean install. | Run CI from a clean Node 22 install, then assess Vue-aware checking and split only the most costly page logic. |
| Testing and correctness | **3/5** | 20 deterministic tests pass for validation, repositories, partial failures, and readiness. Typecheck and a production build passed locally. The owner reports session, chat, image-upload, and two-account checks. | Fakes do not prove deployed RLS. No browser automation, real RLS/Storage integration test, automated image-deletion check, or successful GitHub CI run yet. | Add a disposable Supabase integration test or repeatable browser smoke test that checks two-account isolation and image deletion. |
| Security and privacy | **3/5** | Migration enables owner-scoped RLS and private Storage; frontend uses the public key; security headers and safe external share windows were added. The latest lockfile audit has 0 high and 0 critical findings. | 13 moderate and 2 low dependency findings remain, some with no fix currently available. Deployed policy configuration is not continuously verified. | Add isolated policy checks to CI and review dependency upgrade paths without forcing a major version. |
| Reliability and operational maturity | **2/5** | Separate liveness/readiness checks, request IDs, sanitized JSON API logs, failure-path tests, release notes, rollback and recovery instructions are present. | Readiness checks Auth only. First CI run, Vercel configuration, backup settings, Storage backup, alerting, and restore drill are unverified. | Confirm backup coverage for database and image objects, agree RPO/RTO, and perform a restore drill in an isolated project. |
| Documentation | **4/5** | README, data contracts, user journeys, test strategy, deployment/recovery guide, ADRs, and evidence log describe current behavior and limits. Markdown local links resolve. | First clean CI run and owner approval of proposed recovery targets are pending. Some deployment details must be confirmed in Vercel/Supabase. | Complete the first CI run and update the operational guide with observed settings and restore evidence. |
| Collaboration and feedback | **3/5** | The owner iterated on account, chat, inventory, and UI behavior in feedback cycles and reports repeating core account-isolation checks. Work was reviewed phase by phase. | There is no verified external collaborator history, pull-request review record, or published user-feedback study in the repository. | Capture a small, consented user feedback cycle and preserve genuine PR/review evidence. |
| Ability to explain engineering trade-offs | **3/5** | ADRs and narratives explain RLS vs frontend checks, fakes vs integration tests, public health probes vs elevated keys, and non-idempotent retries. | Written material cannot prove that the owner can explain it aloud. Some implementation was AI-assisted. | Rehearse the two narratives and explain the health check, an RLS policy, and the chat partial-write case from code. |
| Evidence of iteration and improvement | **3/5** | 20 tests, repeated owner-reported workflow checks, security fixes, a build, health experiments, and a measured bundle report are recorded. | Work is uncommitted; CI has not run. There is no before/after performance comparison or successful restore experiment. | After reviewing the working tree, make genuine focused commits and capture the first clean CI and recovery-drill results. |

## Readiness summary

MaaMaa is a credible early-stage engineering project with real authenticated persistence, user-scoped authorization design, and a tested data layer. Its strongest evidence is the owner-reported two-account isolation check, the tracked RLS and Storage migration, and deterministic repository tests.

The largest current gaps are operational evidence and the unfinished product outcome: CI has not run on GitHub, backups and restoration are unverified, and the estimator and AI response flows do not produce results. Do not describe the current app as a completed catering planner or as fully production-ready.

## Track-level assessment

- **Software Engineering: 3/5.** The project demonstrates a real client/data architecture, ownership rules, partial-failure handling, deterministic tests, and thoughtful limits. The core catering result is unfinished, and live RLS/browser behavior is not automated.
- **Production Engineering: 2/5.** There is a clean-install CI workflow, a successful local build, operational endpoints, request diagnostics, and a written release/recovery procedure. Hosted CI, production deployment configuration, backup coverage, and a restore drill are not verified, so the operational evidence is still early.

### Recommended order of work

1. Run the GitHub workflow from its clean Node 22 install and resolve any drift from the local environment.
2. Confirm Supabase database and Storage backup coverage, agree recovery targets, and test restoration in an isolated project.
3. Automate a small signed-in browser/RLS workflow with two test accounts.
4. Gather target-user feedback and define a validated, narrow catering calculation before connecting a model.
5. Commit reviewed changes in focused commits; do not manufacture past history.
