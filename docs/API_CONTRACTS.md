# MaaMaa application data contracts

This document describes the APIs the tracked application currently uses. It is
based on the Nuxt frontend, the initial Supabase migration, and the typed data
repositories. It does not describe planned AI behavior as an available API.

## Architecture boundary

- Nuxt pages and layouts own interaction state and user feedback.
- `frontend/services/` owns chat and inventory persistence through the Nuxt
  Supabase client.
- Supabase Auth provides account and session operations. PostgreSQL tables,
  Row Level Security, RPCs, and Storage provide the application data API.
- There is no tracked application HTTP server or `/api/chat` route.
- `ml/prompt_engineer.py` is standalone and is not called by the frontend.

## Authentication

The frontend calls Supabase Auth through `@nuxtjs/supabase`:

| Operation | Method | Input | Success behavior | Authorization |
| --- | --- | --- | --- | --- |
| Register | `auth.signUp` | Email, password, full name; callback `/confirm` | A session may be returned when confirmation is disabled; otherwise the user follows the email link | Public Auth endpoint |
| Sign in | `auth.signInWithPassword` | Email and password | Returns user and session; the UI routes to chat | Public Auth endpoint |
| Request password reset | `auth.resetPasswordForEmail` | Email; callback `/reset-password` | Sends a reset message when accepted | Public Auth endpoint |
| Update password | `auth.updateUser` | New password with an active recovery session | Supabase updates the authenticated user | Authenticated session |
| Sign out | `auth.signOut` | Current session | Clears the local Supabase session | Authenticated session |

Auth errors are returned by the Supabase client. The auth store maps common
sign-in failures to user-facing messages; registration and reset pages display
the returned error text.

## Chat data

All database calls use the signed-in Supabase client. PostgreSQL RLS scopes
records to the authenticated owner.

| Resource | Operation | Fields used | Success response | Failure/side effects |
| --- | --- | --- | --- | --- |
| `chats` | List, newest first | `id`, `user_id`, `title`, `created_at`, `updated_at` | Rows ordered by `updated_at DESC` | RLS returns only owned rows; repository throws query errors |
| `chats` | Create | `title`, `user_id` | One inserted row | A later message insert can fail, leaving an empty chat; the UI records its ID and retries the note in that chat |
| `chats` | Get by ID | `id` filter | One row | RLS makes another user's chat unavailable; query errors route back to chat list |
| `chats` | Upsert after note activity | `id`, `user_id`, `title`, `updated_at` | No representation is required | On failure, the saved note remains, and the sidebar reports that chat ordering may be stale |
| `chat_messages` | List by chat | `chat_id`, ordered by `created_at` | Rows mapped to chat message objects; non-text metadata is retained | RLS permits messages only through an owned chat |
| `chat_messages` | Insert note | `chat_id`, `role`, `content`, optional `type` and `metadata` | No representation is required | Failed insert is shown to the user; the optimistic note is removed and the input is restored |

Creating a chat and inserting its first message are two separate requests, not a
transaction. The partial-chat retry behavior is intentional until a transactional
database operation is introduced. Notes are persisted; AI responses are not
currently generated.

## Inventory data and images

| Resource | Operation | Fields used | Success response | Failure/side effects |
| --- | --- | --- | --- | --- |
| `inventory_items` | List, newest update first | All table columns | Rows plus short-lived image URLs for display | RLS returns only owned rows; a signed-URL failure leaves that image unavailable |
| `inventory_items` | Insert/update | `name`, `description`, `category`, `quantity`, `unit`, `min_quantity`, `status`, `barcode`, `image_url`, `user_id` | No representation is required; UI refreshes the list | RLS checks ownership; the UI shows a failure message and keeps the form open |
| `inventory_items` | Delete | `id` filter | Row deletion followed by image cleanup when a path exists | A failed storage cleanup is reported after the row is deleted |
| `inventory_images` | Upload | `<auth.uid()>/<uuid>.jpg`, JPEG, max 5 MiB | Private object | Object path is stored in `inventory_items.image_url`; failed row save attempts object cleanup |
| `inventory_images` | Display | Object path, signed URL lifetime 3600 seconds | Temporary URL for image rendering | Objects remain private; storage RLS requires the caller's user folder |
| `inventory_images` | Remove | Object path | Object removed | RLS limits deletion to the caller's folder |

Quantity and minimum quantity must be finite, nonnegative numbers. Blank minimum
quantity becomes zero. The database also enforces nonnegative quantities and
status values.

## Account data RPCs

| RPC | Input | Output | Authorization and effects |
| --- | --- | --- | --- |
| `export_user_data()` | No arguments | JSON object with owned chats, messages, and inventory items | Authenticated caller only; function filters every record by `auth.uid()` |
| `delete_user_data()` | No arguments | Array of caller-owned image paths | Authenticated caller only; deletes owned inventory rows and chats (messages cascade); images are then removed using Storage API |

## Error conventions and idempotency

Repository operations throw Supabase errors to their caller. Pages decide whether
to show a form error, a retry action, or a non-blocking notification. Reads and
updates are safe to retry. New chat creation and inventory insertion are not
idempotent; duplicate-submit guards exist for chat sending and inventory saves.
Image uploads use unique paths with `upsert: false` to avoid overwriting an
existing object.

## Not an active API

`supabase/functions/inventory-ai-data` is not called by the frontend. It calls
`get_anonymized_inventory_data`, which is not defined in the tracked migration,
and uses a custom `x-api-key` check. Do not deploy or connect it as-is. Any future
AI endpoint needs a separately reviewed authentication, input/output schema,
privacy, timeout, and error contract. The Python module is likewise standalone.

