# Known-Good Baselines

## Purpose

Record the latest verified project state so future AI sessions can tell whether a failure is new or pre-existing.

This file is lightweight. Record only meaningful baselines, not every local command run.

## Baselines

| Date | Source | Git State | Scope | Commands Passed | Known Failures | Evidence | Notes |
| ---- | ------ | --------- | ----- | --------------- | -------------- | -------- | ---- |
| 2026-09-07 | local | `cbf6d45`, clean tree at run | full | `npm run build` (exit 0, 563 pages); `npm run test:run` (exit 0, 4/4 tests in `src/utils/config.test.ts`) | `npm run type-check` (exit 2: TS2345 at `src/components/islands/MermaidDiagram.tsx:122` — `theme: string` not assignable to `MermaidConfig` theme union); `npm run lint` (exit 1: 14 pre-existing errors in `.astro/astro/content.d.ts`, `.astro/types.d.ts`, `src/env.d.ts`, `src/components/islands/SearchIsland.tsx`, `src/pages/api/rss.xml.ts`, `src/utils/config.ts` — details in log entry) | `docs/logs/2026/09-07.md` § 2026-09-07 (WI8) | `full` = the four pass/fail commands in `docs/context/project-context.md`. Excluded: `npm run dev` / `npm run preview` (long-running interactive servers, no pass/fail semantics), `npm run format` (tree mutator, not a check), `npm install` (environment setup), e2e (`none` row). Verification ran on the clean tree at `cbf6d45`; the only post-run changes are this WI8 documentation itself: `docs/testing/known-good-baselines.md`, `docs/logs/2026/09-07.md`, plan checkbox ticks in `docs/plans/onboarding/2026-09-07-1153-2-record-known-good-baseline.md`, roadmap tick in `docs/backlog/onboarding-roadmap.md`. |

## When To Update

Update this file when:

- full typecheck/build/lint/test verification passes after a meaningful change
- a previously failing command becomes green and should be remembered
- a team intentionally accepts a known failing command and records it as a known failure, not as a passed command

## Rule

Do not mark a command as passed unless it actually ran in the current repository state.

`Commands Passed` must contain only passing commands. Put accepted failures in `Known Failures` with the reason and evidence.

A dirty working-tree baseline must name the changed files in `Notes` or link to a dated log/testing note that does.

`full` means all real verification commands configured in `docs/context/project-context.md`. Commands explicitly marked `none` are excluded and should be noted.
