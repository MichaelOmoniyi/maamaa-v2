# ADR 0005: Keep AI and catering estimates disconnected until they can be validated

- **Status:** Superseded for chat by the authenticated server endpoint; estimator remains disconnected
- **Date recorded:** 2026-11-06

## Context

The estimator page collects event details and does not calculate menus, quantities, or prices. Chat notes persist. The initial state had no AI replies. `ml/prompt_engineer.py` remains a separate prototype that calls an external model and returns free text. The legacy uncalled Supabase function was removed because it referenced an absent RPC.

## Problem

The interface and documentation must not present an unintegrated model prototype as a working product feature or imply its quantities and prices are verified.

## Considered alternatives

- Connect the existing Python prototype directly to the browser.
- Deploy the legacy function as-is.
- Keep both outside the production request path until an authenticated contract and validation strategy exist.

## Decision

For chat only, use the authenticated Nuxt server endpoint, validate bounded text input, verify chat ownership under the caller's Supabase JWT, keep provider credentials server-side, set a request timeout, and persist replies through the user's RLS-scoped client. Keep catering calculations disconnected until quantity, pricing, and domain validation rules have been reviewed. Do not deploy the legacy function as-is.

## Reasons

- Generated chat text can be wrong and has no domain correctness guarantee. Unit tests cover request handling with fake provider responses, not answer quality.
- The estimator has no verified food-price source or implemented calculation formula.
- Connecting a model would introduce user-data and provider-secret flows that need a separate security and product review.

## Trade-offs and consequences

- Users can receive generated chat replies when private server settings are configured. Chat text is sent to the configured provider; users should not send sensitive information.
- Users still do not receive calculated catering totals or verified quantities.
- The standalone prototype may send prompts to an external provider and should not receive private user data.
- Future estimates must be schema-validated and evaluated for quantity, price, and domain correctness before they are represented as estimates.

## Revisit when

The chat endpoint is implemented with a bounded request, ownership check, privacy notice, timeout, per-process rate limit, stable errors, and fake-provider tests. Revisit before broad rollout to add shared rate limiting, monitor spend, assess moderation and privacy retention, and evaluate answer quality. Estimator work still needs a verified calculation contract.
