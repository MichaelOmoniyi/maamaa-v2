# Phase 1 core user journeys

These workflows reflect the current product behavior. Catering estimates remain unavailable and are not described as a working journey.

## Account registration and sign-in

1. A visitor submits a valid email and password.
2. Supabase creates the account. If email confirmation is enabled, the user remains on the page and is told to follow the email link. The link returns to `/confirm`, which verifies the token and opens chat. If Supabase returns an active session, the app opens chat directly.
3. A confirmed user signs in and reaches chat. Invalid credentials or service failures are shown accessibly, without claiming success.

**Failure cases:** invalid form fields, duplicate/unconfirmed account, network or Supabase errors, expired session.

## Chat notes

1. An authenticated user opens a chat or starts a new one with a non-empty note.
2. The chat and note are persisted to `chats` and `chat_messages`; the UI shows the new item only after successful persistence, or clearly identifies a partially created chat and offers a safe retry.
3. The user can reload a chat and see its saved notes. AI generation is not part of this workflow.

**Failure cases:** whitespace-only note, duplicate submit, chat creation failure, note insert failure after chat creation, load/network failure, unauthorized chat ID.

## Inventory

1. An authenticated user loads their own items, or sees an explicit empty state.
2. The user creates or edits an item with a name, category, unit, finite nonnegative quantity, and optional finite nonnegative alert threshold.
3. Supabase RLS limits reads and writes to that user. An item is shown as saved only after the database operation succeeds.
4. Scanned photos are stored in the caller's private Storage folder and displayed with a short-lived signed URL.
5. The user confirms before deleting an item; failures remain visible and the list can be retried.

**Failure cases:** invalid numbers, repeat submission, failed upload, failed save, missing/expired image URL, load/delete/network failure.

## Verification scope

Pure quantity validation, repository contracts, and readiness error cases have
local regression tests. The owner reports manually verifying account sessions,
chat persistence, inventory image upload, and isolation between two accounts.
Those checks are user-reported evidence, not browser automation or CI coverage.
Image deletion and a full restore of persisted data have not been verified
against the live project.
