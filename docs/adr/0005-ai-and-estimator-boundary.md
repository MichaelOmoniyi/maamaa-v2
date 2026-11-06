# ADR 0005: Keep AI and catering estimates disconnected until they can be validated

- **Status:** Current state documented; future integration proposal is not approved
- **Date recorded:** 2026-11-06

## Context

The estimator page collects event details and then says that it does not calculate menus, quantities, or prices. Chat notes persist, but AI answers are not generated. `ml/prompt_engineer.py` is a separate prototype that calls an external model and returns free text. A legacy, uncalled Supabase function was removed during final cleanup after confirming it was not deployed and referenced a database RPC absent from the tracked migration.

## Problem

The interface and documentation must not present an unintegrated model prototype as a working product feature or imply its quantities and prices are verified.

## Considered alternatives

- Connect the existing Python prototype directly to the browser.
- Deploy the legacy function as-is.
- Keep both outside the production request path until an authenticated contract and validation strategy exist.

## Decision

Keep AI and catering calculations disconnected from the current app. Do not deploy the legacy function as-is. Document that there is currently no AI output validation or provider-failure handling in the application, because no application AI call exists to validate or monitor.

## Reasons

- The prototype returns unstructured text and has no automated tests or explicit timeout/rate limit contract.
- The estimator has no verified food-price source or implemented calculation formula.
- Connecting a model would introduce user-data and provider-secret flows that need a separate security and product review.

## Trade-offs and consequences

- Users can save notes and enter event preferences but do not receive generated replies or catering totals.
- The standalone prototype may send prompts to an external provider and should not receive private user data.
- Future output must be schema-validated and evaluated for quantity, price, and domain correctness before it is represented as an estimate.

## Revisit when

The product defines a backend API, authenticated request policy, data-sharing notice, bounded provider timeout, rate limit, schema and domain validation, failure behavior, and a test/evaluation plan.
