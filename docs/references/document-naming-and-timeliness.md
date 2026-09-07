# Document Naming And Timeliness

## Purpose

This guide distinguishes stable owner docs from time-sensitive process records.

For small and medium projects, this keeps the repo easy to navigate without forcing every file into the same naming style.

## Two Categories

### 1. Stable Owner Docs

These describe the current supported baseline and should usually keep stable names without dates.

Use stable names for:

- `docs/process/`
- `docs/architecture/`
- `docs/design/`
- `docs/references/`
- `docs/skills/`
- long-lived requirement baseline files such as `docs/requirements/product-scope.md` and `docs/requirements/mvp.md`

Examples:

- `docs/design/app-overview.md`
- `docs/architecture/system-baseline.md`
- `docs/process/application-development-workflow.md`

Rule:

- these files should be updated in place
- do not create a new dated version just because the content changed

### 2. Time-Sensitive Records

These capture execution history, investigation context, or dated decisions.

These files should usually include a date in the path or filename.

Use dated naming for:

- `docs/logs/`
- `docs/testing/`
- `docs/discussions/`
- `docs/analysis/`
- `docs/audits/`
- `docs/retrospectives/`
- most one-off requirement synthesis files and implementation plans

## Recommended Path Conventions

### Logs

- `docs/logs/YYYY/MM-DD.md`

### Testing Notes

- `docs/testing/YYYY/MM-DD.md`

### Discussions

- `docs/discussions/YYYY-MM-DD-HHmm-topic.md`

Examples:

- `docs/discussions/2026-05-21-0000-user-management-scope.md`
- `docs/discussions/2026-05-21-0000-order-status-rules.md`
- `docs/discussions/2026-05-21-0000-prototype-gap-checkout-flow.md`

### Analysis

- `docs/analysis/YYYY-MM-DD-HHmm-topic.md`

Examples:

- `docs/analysis/2026-05-21-0000-menu-structure-options.md`
- `docs/analysis/2026-05-21-0000-prototype-feasibility-review.md`
- `docs/analysis/2026-05-21-0000-auth-strategy-comparison.md`

### Audits

- `docs/audits/YYYY-MM-DD-HHmm-<kind>-<topic>.md`

Examples:

- `docs/audits/2026-05-21-0000-document-audit-user-management.md`
- `docs/audits/2026-05-21-0000-closure-audit-order-list.md`

Use `docs/audits/` only when the stored audit record is non-trivial, disputed, reusable, or likely to matter later. Created-plan draft review normally stays in the plan body, and closure evidence normally stays in the plan `## Closure` section.

### Retrospectives

- `docs/retrospectives/YYYY-MM-DD-HHmm-topic.md`

Examples:

- `docs/retrospectives/2026-05-21-0000-checkout-prototype-gap.md`
- `docs/retrospectives/2026-05-21-0000-pm-handoff-missing-analysis.md`

### Plans

For small and medium projects, prefer a simple dated plan name:

- `docs/plans/YYYY-MM-DD-HHmm-topic-plan.md`

Examples:

- `docs/plans/2026-05-21-0000-user-list-plan.md`
- `docs/plans/2026-05-21-0000-role-permission-alignment-plan.md`

If the project later accumulates many plans and needs stronger indexing, you may add a numeric prefix:

- `docs/plans/NNN-YYYY-MM-DD-HHmm-topic-plan.md`

Examples:

- `docs/plans/012-2026-05-21-0000-user-list-plan.md`
- `docs/plans/013-2026-05-21-0000-checkout-validation-plan.md`

### One-Off Requirement Synthesis Files

If the file is a one-off slice rather than a stable baseline file, prefer a dated name:

- `docs/requirements/YYYY-MM-DD-HHmm-feature-name.md`

Examples:

- `docs/requirements/2026-05-21-0000-user-management.md`
- `docs/requirements/2026-05-21-0000-order-refund-flow.md`
- `docs/requirements/2026-05-21-0000-dashboard-homepage.md`

## Bug Notes

Bug notes are historical, but they are usually referenced by issue identity rather than by date.

For small and medium projects, either of these is acceptable:

- `docs/bugs/01-short-bug-name.md`
- `docs/bugs/YYYY-MM-DD-HHmm-short-bug-name.md`

Examples:

- `docs/bugs/01-order-status-double-submit.md`
- `docs/bugs/2026-05-21-0000-login-token-refresh-loop.md`

Recommendation:

- if bug notes will become a long-lived library, prefer numbered filenames
- if bug notes will stay few and mainly serve local team memory, date-based filenames are acceptable

## Simple Rule Of Thumb

- if the file answers "what is the current supported baseline?" -> stable name
- if the file answers "what happened in this round / this day / this investigation?" -> dated name

## Archive Organization

When files are archived by human decision, keep a predictable sub-structure so historical material stays recoverable:

- design and architecture docs: archive under `docs/archive/design/` and `docs/archive/architecture/`, organized by original module or topic name
- dated plans: archive under `docs/archive/plans/YYYY-MM/`, grouped by the year and month of closure
- other dated records (logs, bugs, audits, testing, analysis, retrospectives): keep their original relative path under `docs/archive/`

Archived files keep their original relative name. Do not move files into or out of `docs/archive/` without human approval.

## Quick Copy Set

Use these as ready-made patterns:

```text
docs/logs/2026/05-21.md
docs/testing/2026/05-21.md
docs/discussions/2026-05-21-0900-user-management-scope.md
docs/analysis/2026-05-21-1030-auth-strategy-comparison.md
docs/audits/2026-05-21-1410-document-audit-user-management.md
docs/plans/2026-05-21-1530-user-list-plan.md
docs/requirements/2026-05-21-1100-order-refund-flow.md
docs/retrospectives/2026-05-21-1630-checkout-prototype-gap.md
docs/bugs/01-order-status-double-submit.md
```
