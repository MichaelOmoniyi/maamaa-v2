# ADR 0002: Enforce record ownership at the database and Storage layers

- **Status:** Accepted in the tracked schema
- **Date recorded:** 2026-11-06

## Context

Chats, messages, inventory rows, and uploaded images belong to authenticated users. The initial migration enables RLS, adds owner checks, and scopes image objects to a user-specific folder. The frontend supplies the current owner ID for writes, but client-side IDs are not trusted as the authorization control.

## Problem

A user must not read, change, or delete another user's private records or images, even if a request is modified in the browser.

## Considered alternatives

- Enforce ownership only in frontend filters.
- Add a server API that authorizes every request.
- Enforce ownership with Postgres RLS and Storage policies for the current direct-client architecture.

## Decision

Use `auth.uid()`-based RLS policies for table operations. Restrict chat-message operations through the owning chat. Store inventory photos in a private bucket and enforce the user folder in Storage policies. Keep repository owner fields as a correctness aid, not the sole access control.

## Reasons

Postgres and Storage evaluate authorization at the resource boundary, including for direct Supabase client requests. This matches the current architecture and avoids an additional proxy service.

## Trade-offs and consequences

- Policy changes need a reviewed migration and regression checks.
- Automated repository tests verify query construction but do not simulate Postgres RLS.
- The project owner reports that two-account isolation checks passed; this is user-reported manual evidence, not an automated CI test.
- Storage objects are a separate persistence system; deleting rows and deleting image objects can partially fail.

## Revisit when

The product adds shared kitchens, organizations, delegated access, or administrative roles. These require an explicit ownership model and policy tests before implementation.
