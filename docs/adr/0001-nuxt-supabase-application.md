# ADR 0001: Retain Nuxt and Supabase for the current application

- **Status:** Accepted as the current implementation direction
- **Date recorded:** 2026-11-06

## Context

The tracked user interface is a Nuxt 3/Vue application. It uses the Supabase client for Auth, Postgres data, and private Storage. The browser talks directly to Supabase, and the database migration contains RLS policies. Nitro currently hosts small health endpoints; there is no tracked chat or inventory API server.

This record describes the current system and why it remains the scope for this release. It does not claim that a historical framework comparison took place.

## Problem

The project needs a maintainable way to deliver authenticated user-facing flows and owner-scoped persistence without duplicating the existing Supabase data layer.

## Considered alternatives

- Keep the existing Nuxt application and use Supabase's managed services.
- Add a separate application API for every data operation.
- Replace the current framework or database platform.

These are current options for comparison, not a reconstruction of the original decision process.

## Decision

Keep Nuxt, Vue, and Supabase for the current user journeys. Keep data access in the typed/checked repositories and Supabase policies. Add server routes only for operational checks that cannot safely be performed by exposing privileged database credentials to the browser.

## Reasons

- The current account, chat-note, and inventory flows already use this stack.
- RLS and Storage policies can enforce per-user ownership for direct client access.
- A separate CRUD backend would duplicate queries and authorization rules without a current product need.

## Trade-offs and consequences

- Browser operations depend on Supabase availability and the correctness of deployed RLS policies.
- There is no server-side request layer for centralized user-data API metrics.
- Future AI provider keys or privileged operations must stay server-side and require an authenticated API contract.
- Supabase platform configuration remains an operational dependency outside this repository.

## Revisit when

The app adds trusted server-side business logic, AI provider integration, billing, rate limits that must be enforced centrally, or data flows that cannot be safely represented by RLS-backed direct access.
