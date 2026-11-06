# Supabase setup for MaaMaa

This is a **reconstructed fresh-project baseline**. The former Supabase project and its data are unavailable, and there are no backups. The migration is based on the current frontend's actual table/RPC calls and the earlier schema SQL in `DEPLOYMENT.md` and `CONTRIBUTIONS.md`; it is not a recovery of the deleted database.

## What the application uses

- **Auth:** Supabase email/password signup, login, confirmation, and password reset.
- **Postgres:** `chats`, `chat_messages`, and `inventory_items`, all accessed from the authenticated Nuxt client.
- **RLS:** every table is restricted to the owning user; messages are owned through their parent chat.
- **Storage:** private `inventory_images` bucket for JPEGs, with paths under `<user-id>/<uuid>.jpg`. The app stores the object path in `inventory_items.image_url` and requests one-hour signed URLs for display.
- **RPC:** `export_user_data()` returns the caller's chats, messages, and inventory as JSON. `delete_user_data()` deletes those database rows and returns that caller's valid image paths; the browser removes those objects through the Storage API.
- **Not part of this baseline:** `get_anonymized_inventory_data()` and the `inventory-ai-data` Edge Function. No frontend call uses them, and there is no verified definition or safe access contract for a cross-user inventory data feed. Do not deploy that function until it has been redesigned and reviewed.
- **Not used:** the app does not currently call Supabase Realtime, database webhooks, or ML through Supabase.

## Files in this baseline

- `supabase/config.toml` identifies the local Supabase project.
- `supabase/migrations/20261104000000_initial_maamaa_schema.sql` creates the tables, constraints, indexes, timestamp triggers, RLS/grants, private bucket, storage policies, and the two account-data RPCs.
- `frontend/.env.example` contains safe placeholders. Keep the existing ignored `frontend/.env` private.

The migration deliberately uses a per-user barcode uniqueness constraint instead of the old sample's global unique constraint. It also constrains quantities to nonnegative values, makes ownership references non-null, and uses a private image bucket. These are explicit fresh-schema decisions, not claims about the deleted deployment.

## Fresh project configuration

1. Create a project in the Supabase Dashboard yourself. Choose a region close to the people who will use MaaMaa, a strong unique database password, and a project name such as `maamaa-production`. Keep the database password in a password manager; it is not the frontend key.
2. For a preview or early development project, the Free plan can be used if its limits are acceptable. Supabase currently lists $0 with 500 MB database, 1 GB file storage, and automatic pausing after a week of inactivity. It does not include automatic backups. Pro currently starts at $25/month and includes daily backups retained for 7 days; review the current pricing and terms before choosing a production plan. [Supabase pricing](https://supabase.com/pricing)
3. In **Authentication → URL Configuration**, set the Site URL to the real production origin. Add exact local and production redirect patterns needed by confirmation and password reset, for example `http://localhost:3000/**` and `https://maamaa.live/**` if that remains the intended domain. Add preview-host patterns only if you use them. [Supabase redirect URL configuration](https://supabase.com/docs/guides/auth/redirect-urls)
4. Start with email/password authentication. The frontend has confirmation and reset routes. Configure the allowed redirect URLs and email templates to point to those existing routes; verify confirmation and reset flows after the project is connected.
5. Put the project URL and publishable/anon key in local `frontend/.env` and in the frontend deployment provider's environment settings. Use `SUPABASE_URL` and `SUPABASE_ANON_KEY`, matching `frontend/nuxt.config.ts`. Never expose a database password or `service_role` key in Nuxt, `.env.example`, or browser code. No `service_role` key is needed for the current frontend schema.

## Migration review and deployment

The initial migration creates new tables, functions, policies, and a bucket. It contains no `DROP`, `TRUNCATE`, or data overwrite operations. It assumes a fresh Supabase project with the managed `auth` and `storage` schemas present. The data-deletion RPC removes application rows; the frontend then removes returned images through the Storage API. A Storage API failure can leave some image objects behind, and the UI reports that partial result.

Before any remote application:

1. Install the Supabase CLI and Docker if not already available.
2. Run `supabase start`, then `supabase db reset` **only against the local Supabase development stack** to apply the migration and inspect the result. This local reset is destructive to local Supabase data.
3. Exercise local signup, chat create/load, inventory CRUD, private image upload/display, export, and deletion with two separate test users to check isolation.
4. Once the dashboard project exists, configure credentials locally with `supabase login`, link with `supabase link --project-ref <project-ref>`, and inspect `supabase db push --dry-run` output.
5. Review the target project and exact SQL before running `supabase db push`. Do not run `db reset` against the remote project.

The dashboard project has **not** been created and no migration has been applied remotely. The repository does not contain a Supabase CLI or Docker result, so local migration execution remains unverified.

## Reconstructed frontend data contract

| Object | Frontend operations | Access boundary |
|---|---|---|
| `chats` | select/order, insert, upsert | `user_id = auth.uid()` |
| `chat_messages` | select by `chat_id`, insert | parent chat must belong to `auth.uid()` |
| `inventory_items` | select/order, insert, update, delete | `user_id = auth.uid()` |
| `inventory_images` | upload, signed read, delete during account-data removal | first path component must equal `auth.uid()` |
| `export_user_data()` | RPC from Settings | requires authenticated caller; returns only caller rows |
| `delete_user_data()` | RPC from Settings | requires authenticated caller; deletes only caller rows |

RLS enforcement is in Postgres and Storage; frontend route guards are not treated as authorization. Private buckets require Storage policies and signed URLs for browser display. [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control) [Private buckets and signed URLs](https://supabase.com/docs/guides/storage/buckets/fundamentals)

## Remaining review items

- The prior project is confirmed by the owner as deleted without backup; this cannot be independently verified through repository files.
- The old database's exact types and behavior are unrecoverable. This baseline chooses UUID IDs, timestamps, nonnegative numeric quantities, per-user unique barcodes, and the documented status/role checks.
- The data export includes application tables, not Auth credentials or user profile metadata.
- `inventory-ai-data` currently accepts a custom API key, allows wildcard CORS, and requests an undocumented RPC. Do not deploy it. Its intended data, caller, and anonymization requirements need a separate decision.
- Production operation, email delivery limits, custom SMTP, backups, and domain configuration must be checked in the new project; the repo cannot verify them.
