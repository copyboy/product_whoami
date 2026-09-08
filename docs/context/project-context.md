# Project Context

## Purpose

The shortest static baseline an AI agent needs before doing useful work: identity, documentation freshness, technical stack, and verification commands.

Update it in place. Do not create dated copies.

This file intentionally does **not** track "what is being worked on right now". That is found by scanning unfinished plans in `docs/plans/`. Keeping high-churn active-work state here makes the file hard to maintain and prone to staleness.

## Companion Context Files

This file is the AI entry point. The following `docs/context/` companions are read on demand — most mission-driver flow steps load this file first, then route to them:

| File | When to read |
|---|---|
| `ai-autonomy-policy.md` | Before any task that changes code, model, or product behavior — autonomy levels, Protected Areas, reviewer availability |
| `codebase-map.md` | When locating code, making cross-module changes, or entering an unfamiliar area — entry points, common change routes, fragile files |
| `source-of-truth-and-precedence.md` | When facts conflict or it is unclear which doc is authoritative |

## Project Identity

- Project name: Product Whoami (`product-whoami`, per `package.json`)
- Product type: static personal portfolio + blog website (Astro SSG)
- Primary users: site visitors / solo content author
- Documentation freshness: `partially stale` — identity, stack, and verification commands were verified live on 2026-09-07 (plan `2026-09-07-1044-2-fill-project-context.md`, fed by scan `docs/input/project-scan.md`); design/architecture/process doc layers are still templates until onboarding WI5–WI7 land. Decision rationale and alternatives: see "Documentation Freshness Decision" in `docs/input/project-scan.md`.

**Freshness gating:**

- If freshness is `stale` or `unknown`, agents may research, audit, and draft alignment docs, but must not implement product behavior until the baseline is re-established or a human confirms intended behavior.
- If freshness is `partially stale`, agents may implement only slices whose requirement, owner doc, codebase-map route, and touched code area have been verified fresh; otherwise treat the slice as `plan-first` or `research-only`.
- AI may not mark stale docs fresh without human confirmation or human-approved owner-doc evidence.

## Current Technical Baseline

- Frontend stack: Astro 4 (SSG) + React 18 islands + Tailwind CSS 3.4 + TypeScript
- Backend stack: none (fully static site; deployed to Cloudflare Pages)
- Database/model source: none — content lives in Astro Content Collections (`src/content/blog/`, `src/content/projects/`, MDX)

## Verification Commands

Replace every placeholder before implementation work starts.

| Purpose                   | Command              |
| ------------------------- | -------------------- |
| Install dependencies      | `npm install`        |
| Run app locally           | `npm run dev`        |
| Typecheck / compile check | `npm run type-check` |
| Build                     | `npm run build`      |
| Lint / static check       | `npm run lint`       |
| Unit tests                | `npm run test:run`   |
| E2E / integration tests   | `npx playwright test` |

(Commands sourced from `package.json` `"scripts"`; no pass/fail baseline is claimed here — the known-good green baseline is recorded separately in `docs/testing/known-good-baselines.md`.)

## Optional Layers Currently In Use

Mark only the optional layers this project actually maintains.

- [x] `docs/discussions/`
- [x] `docs/audits/`
- [x] `docs/testing/`
- [x] `docs/skills/`
- [x] `docs/analysis/`
- [x] `docs/retrospectives/`
- [x] `docs/lessons/`

(All seven directories verified present via `ls docs/` on 2026-09-07.)

## AI Block Conditions

AI MUST stop and wait for human input before proceeding when:

- verification commands are all placeholders and cannot be inferred from the project
- any change touches payment or data-deletion paths with no existing test coverage and no owner doc describing expected behavior
- no requirement or owner doc describes the intended behavior of the change — do not implement into a vacuum (this replaces the old "active requirement is none" gate; whether a requirement/owner doc exists is checked against `docs/requirements/` and `docs/design/`, not a field here)

These are project-specific hard stops in addition to `AGENTS.md`, `docs/context/ai-autonomy-policy.md`, source-of-truth conflict rules, and required plan/closure audit rules.

Project-specific review outcome (2026-09-07, plan `2026-09-07-1044-2-fill-project-context.md`): the template rules are kept as-is. Concretization: the payment/data-deletion stop is dormant for this project — it is a fully static site with no backend, no payment paths, and no user data storage, so that condition cannot trigger unless the site gains dynamic functionality. The placeholder-commands stop is satisfied: the Verification Commands table above contains only real commands from `package.json`.

For ambiguity that does not affect user-visible behavior, contracts, protected areas, or closure evidence, resolve by writing assumptions into the relevant doc and proceed according to the autonomy policy. Mark uncertain assumptions explicitly so humans can review later.

## Notes For AI Agents

- If this file is empty or stale, ask for or create a context update before large implementation work.
- **Current work in progress**: inspect unfinished plans in `docs/plans/`, not this file.
- AI autonomy defaults to `implement`; it is gated by freshness (above) and Protected Areas (`ai-autonomy-policy.md`). No per-slice autonomy value is maintained here — autonomy labels live on backlog/roadmap work items, not in this file.
- AI may correct factual context from live repo evidence, but must not mark stale docs fresh or downgrade protected areas without human confirmation.
- Do not report verification success while any verification command is still a placeholder rather than a real, executable command.
