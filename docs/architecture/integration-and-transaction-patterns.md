# Integration and Transaction Patterns

> Optional starter skeleton. Use when the project integrates with external systems or runs background/polling work. Delete this file if it does not apply.

## Local-First Rule

1. Operations that affect local state, tasks, and logs MUST pass local validation and persist before any external write.
2. An external write that depends on a successful local transaction should run in a post-commit hook (for example `runAfterCommit`). Do not abuse this mechanism for queries, polling, load-data, or document-download actions.
3. If an external action must return an ID before local persistence, the failure/rollback strategy MUST be explicit in the same business method. Never advance the flow first and backfill the ID later.

## Idempotency

- Polling and download actions MUST be idempotent. Repeated execution must not create duplicate tasks, close cases twice, or attach duplicates.
- Repeated triggers (polling restart, duplicate callback) must be safe to retry.

## External-Result Ownership

- When a result originates from an external system response or an external decision, the local system is responsible for initiating, querying, downloading, supplementing documents, and making the local follow-up decision only after the external result is clear. The local page does not fabricate the external behavior.
- Prefer the external system's native semantics for upgrades/escalations when they exist (for example, reuse the same external case id across an escalation).
