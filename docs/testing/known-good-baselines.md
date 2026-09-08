# Known-Good Baselines

## Purpose

Record the latest verified project state so future AI sessions can tell whether a failure is new or pre-existing.

This file is lightweight. Record only meaningful baselines, not every local command run.

## Baselines

| Date | Source | Git State | Scope | Commands Passed | Known Failures | Evidence | Notes |
| ---- | ------ | --------- | ----- | --------------- | -------------- | -------- | ---- |
| 2026-09-07 | local | `cbf6d45`, clean tree at run | full | `npm run build` (exit 0, 563 pages); `npm run test:run` (exit 0, 4/4 tests in `src/utils/config.test.ts`) | `npm run type-check` (exit 2: TS2345 at `src/components/islands/MermaidDiagram.tsx:122` — `theme: string` not assignable to `MermaidConfig` theme union); `npm run lint` (exit 1: 14 pre-existing errors in `.astro/astro/content.d.ts`, `.astro/types.d.ts`, `src/env.d.ts`, `src/components/islands/SearchIsland.tsx`, `src/pages/api/rss.xml.ts`, `src/utils/config.ts` — details in log entry) | `docs/logs/2026/09-07.md` § 2026-09-07 (WI8) | `full` = the four pass/fail commands in `docs/context/project-context.md`. Excluded: `npm run dev` / `npm run preview` (long-running interactive servers, no pass/fail semantics), `npm run format` (tree mutator, not a check), `npm install` (environment setup), e2e (`none` row). Verification ran on the clean tree at `cbf6d45`; the only post-run changes are this WI8 documentation itself: `docs/testing/known-good-baselines.md`, `docs/logs/2026/09-07.md`, plan checkbox ticks in `docs/plans/onboarding/2026-09-07-1153-2-record-known-good-baseline.md`, roadmap tick in `docs/backlog/onboarding-roadmap.md`. |
| 2026-09-09 | local | dirty tree at run (WI1 changes, files named in Notes) | full | `npm run type-check` (exit 0); `npm run lint` (exit 0, 0 errors; 1 retained non-blocking warning `react-hooks/exhaustive-deps` at `SearchIsland.tsx:257`, out of WI1 scope per plan Non-Goals); `npm run build` (exit 0, 647 pages); `npm run test:run` (exit 0, 4/4 tests in `src/utils/config.test.ts`); `npm run verify` (exit 0 on green tree; injection probe exit 1 — aggregate gate blocks) | (none — WI1 cleared the 2026-09-07 red lights: type-check TS2345 and lint 14 errors are fixed, no longer Known Failures) | `docs/logs/2026/09-09.md`; plan `docs/plans/quality-system/2026-09-09-0127-1-wi1-red-light-zero-verify-skeleton.md` § Verification | WI1 落地（五层防线 L1 归零 + verify 骨架）。Changed files at run: `src/components/islands/MermaidDiagram.tsx`（getThemeConfig 显式返回 `MermaidConfig`）、`src/components/islands/SearchIsland.tsx`（`FuseType` 改类型别名并用于 `fuseRef` 类型，移除 `any`）、`src/pages/api/rss.xml.ts`（移除未用 `context` 参数与 `APIContext` 导入）、`src/utils/config.ts`（`as any` → `as SiteConfig`）、`eslint.config.js`（ignores 增 `.astro`；`src/env.d.ts` 文件级 triple-slash-reference off）、`scripts/verify.sh`（新建）、`package.json`（`verify` script）。Post-run docs-only changes: this row, `docs/logs/2026/09-09.md`, plan checkbox ticks, `docs/backlog/quality-system-roadmap.md` WI1 tick. |

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
