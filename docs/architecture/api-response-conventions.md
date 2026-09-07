# API Response Conventions

> Optional starter skeleton. Use when the project exposes HTTP/REST or RPC APIs and needs a shared response convention. Delete this file if it does not apply.

## Principle

- Prefer the project's standard response envelope; do not invent a new ad-hoc map protocol for each endpoint.
- Use typed response/DTO shapes instead of untyped maps for both parameters and return values.

## Status Code Discipline

- Business-expected failures (validation, state-not-allowed, no-result, external business rejection, user-facing prompts) MUST NOT surface as HTTP 500. Return HTTP 200 with a business failure status code and message in the body.
- HTTP 500 is reserved for genuinely unexpected system errors (program defects, null pointers, infrastructure failure, unknown runtime errors). A normal business branch is never a 500.

## Success Responses

- Success responses default to the success status and `data` only.
- Do not attach `msg`/`message`/`description` fields to success responses unless the requirement explicitly requires a success toast. This prevents frontends from auto-popping unintended notifications.
- "No data found" and similar states belong in business fields inside `data`, rendered by the page, not in a success message field.

## Rule

When changing or adding an endpoint, check what the frontend consumes. If the frontend calls the API directly (form/service/ajax), keep the response shape the frontend expects and avoid success-scenario notification fields.
