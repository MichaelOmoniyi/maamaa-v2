# ADR 0004: Use bounded health checks and sanitized API logs

- **Status:** Accepted for the current Nuxt API surface
- **Date recorded:** 2026-11-06

## Context

The app is primarily a browser client that calls Supabase directly. Nitro has only a small API surface for health checks. The frontend's public Supabase key has no table privileges under the migration, and no service-role key is configured for a backend health query.

## Problem

Operators need to distinguish a live Nuxt process from a Supabase Auth connectivity problem and correlate API responses with logs without exposing user content or secrets.

## Considered alternatives

- Return one health status that always depends on external services.
- Query private user tables using a privileged server key.
- Separate liveness from a bounded Auth health request using only the public API key, and log sanitized API metadata with a request ID.
- Add a hosted error/metrics platform immediately.

## Decision

Expose `/api/health/live` independently of Supabase and `/api/health/ready` with a bounded request to Supabase Auth. Generate an `X-Request-Id` for API calls and log route group, method, status, duration, and request ID as JSON. Do not log request bodies, query strings, tokens, or upstream error text.

## Reasons

- A failing Auth service should make readiness fail without making process liveness fail.
- The public key is sufficient for the Auth health endpoint; no elevated secret is needed.
- The current API surface is small, so structured platform logs are a proportionate first step.

## Trade-offs and consequences

- Readiness confirms Auth API reachability only. It does not prove Postgres, Storage, RLS, or a signed-in query is working.
- Vercel logs provide request diagnostics, but no external alerting or metrics service is configured.
- A local production-preview check passed with the system CA option enabled; production hosting still needs its own smoke check.

## Revisit when

The app adds server-side database access, needs an authenticated synthetic transaction, or requires alerting and service-level metrics. Any database health check must avoid exposing a service-role key or user rows.
