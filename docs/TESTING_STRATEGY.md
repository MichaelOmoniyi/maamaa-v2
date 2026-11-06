# MaaMaa testing strategy

## Test layers

| Layer | How to run | What it covers | What it does not prove |
| --- | --- | --- | --- |
| Unit and repository contract tests | `cd frontend` then `npm test` | Inventory quantity validation, chat row/message mapping, Supabase query payloads, ownership fields, signed image URL mapping, repository error behavior, and readiness checks for missing configuration, HTTP failures, and timeouts | Real network behavior, deployed Postgres/RLS/Storage health, bucket policies, or browser rendering |
| Type checking | `cd frontend` then `npm run typecheck` | Generated Nuxt types, tracked database contract, and `// @ts-check` JavaScript services | Type checking Vue single-file component scripts; `vue-tsc` is not configured |
| Production build | `cd frontend` then `npm run build` | Nuxt client/server compilation and Nitro packaging | Remote Supabase availability or account-specific redirects |
| Signed-in workflow check | Use a separate test project/account and follow the manual checklist below | Confirmation/login, saved chat history, inventory image flow, and cross-account isolation | Automated CI regression coverage |

Tests use Node's built-in test runner and no extra testing dependencies. The fake
Supabase client captures query inputs and returns controlled responses; it does
not connect to the network or the MaaMaa project.

The latest Node coverage report for modules loaded by the current tests was
98.96% of lines, 67.03% of branches, and 100% of functions. It includes the
readiness helper, repository modules, quantity validator, and fake client. It
does not cover Vue pages, Nitro route handlers/middleware, or the whole
application, and it is not a quality target. The uncovered readiness branches
include uncommon URL and transport/body-cancellation cases.

## Manual signed-in regression checklist

Run only against a disposable Supabase test project with test accounts and
non-sensitive records. Do not point destructive or automated test cases at the
production database.

1. Create and confirm an account, sign out, sign in, and verify the protected
   chat route returns to the sign-in page when signed out.
2. Create a chat note, reload, open it from history, and verify its content.
3. Add and edit an inventory item, reload, and verify its values.
4. Upload an inventory image, verify it displays, delete the item, and verify
   the image is removed from the private bucket.
5. With two accounts, verify each account sees only its own chats and inventory.
6. Verify an unavailable network or failed operation is reported without a
   false success message.

The project owner has manually verified authenticated sessions, chat
persistence, inventory image upload, and isolation between two test accounts.
Item-image deletion and automated network-failure behavior still need direct
verification against a disposable Supabase project.

## AI evaluation status

The frontend has no AI response integration, so AI output tests are not
applicable to the current product behavior. If an AI endpoint is added, keep
ordinary tests deterministic with mocked provider responses. Test valid output,
malformed or missing fields, refusals, timeouts, and provider errors. Evaluate
software behavior, schema validity, domain correctness, and subjective
usefulness separately. Do not treat generated quantities or prices as verified
business data.

## Known verification limits

- The current automated tests do not emulate a browser or perform a live
  authentication/RLS workflow.
- Readiness unit tests use mocked HTTP responses. The local health endpoint
  smoke check verified Supabase Auth reachability, not database queries or
  Storage availability; anonymous table access is intentionally revoked.
- `npx tsc` checks the database types and typed data services, but not Vue SFC
  script blocks. A Vue-aware type checker can be assessed separately without
  adding it as an unreviewed dependency.
- The full production build completed outside the Windows sandbox. The local
  installed dependency tree differed from the updated lockfile, so the new
  GitHub Actions job must complete once to validate the clean locked install
  and production build on Node 22.

