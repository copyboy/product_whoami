---
status: active
mission: onboarding
work-item: M1-WI8
group: "2026-09-07-1153"
verify: [test]
---

# 2026-09-07-1153-2-record-known-good-baseline Record known-good baseline in docs/testing/known-good-baselines.md + verify docs/logs/{year}/

> Source: docs/backlog/onboarding-roadmap.md M1/WI8 (填 docs/testing/known-good-baselines.md + 校验 docs/logs/{year}/ 存在)
> Related: 2026-09-07-1044-2-fill-project-context (WI2 recorded the real commands but explicitly deferred running them to WI8), 2026-09-07-1153-1-fill-workflow-and-backlog-readme (WI7 lands first — execution order 1 → 2)

## Current Baseline

- `docs/testing/known-good-baselines.md` is in template state: the Baselines table carries one full placeholder row (line 13) — `<YYYY-MM-DD>` / `<local | CI>` / `<commit | dirty working tree>` / `<full / package / feature>` / `<commands>` / `<none | failing commands>` / `<log/test link>` / `<notes>` — and no real baseline row exists anywhere in the file. No other `<` token exists in the file.
- Real verification commands are already recorded in `docs/context/project-context.md` (sourced from `package.json` scripts): `npm run type-check`, `npm run build`, `npm run lint`, `npm run test:run`; long-running/interactive commands `npm run dev` / `npm run preview`; mutator `npm run format`; e2e `none`. WI2 explicitly deferred running them to this WI — no green baseline has been formally recorded yet.
- `docs/logs/2026/` exists (verified at draft time 2026-09-07; contains `09-07.md`); per the roadmap, install-age.sh created it and this WI only re-verifies existence at execution.
- The file's own rules constrain the row: commands may be marked passed only if actually run in the current repository state; accepted failures go to Known Failures; a dirty working-tree baseline must name the changed files in Notes or link a dated log note; `full` means all real verification commands configured in `project-context.md`, with `none` rows excluded.
- Expected execution context: WI7 lands first (execution order 1 → 2), so the tree at WI8 execution contains this plan's own doc edits — the Git State cell and Notes must record that honestly (dirty with named files, or the plan's edits committed per repo commit conventions at execution time).
- Depends on M1-WI2 (done); soft-ordered after WI7 so the recorded baseline reflects the post-onboarding docs state.

## Goals

- The placeholder row is replaced by exactly one real baseline row: Date = execution date, Source `local`, Git State = actual commit + clean/dirty (dirty files named per the file's rule), Scope `full`, Commands Passed = only commands that actually exited 0, Known Failures = `none` or the real failing commands with reasons, Evidence = link to the `docs/logs/2026/` closure entry, Notes = scope exclusions + dirty-tree file list or clean confirmation.
- `docs/logs/2026/` existence is re-verified at execution and the result recorded.
- No command is marked passed that did not run and exit 0 in the recorded repo state.

## Non-Goals

- WI7 scope (`docs/process/application-development-workflow.md`, `docs/backlog/README.md`).
- Fixing any product-code or config failure the verification run uncovers — if a command fails, the honest record goes into Known Failures with reason and evidence, and a successor work item is surfaced in the log entry with the trigger "first work item of the next mission after onboarding" (a fix is a new slice with its own plan, not part of this plan's result surface).
- Updating the Documentation freshness field in `docs/context/project-context.md` (revisited when onboarding M1 completes, not per-WI, per the WI2 freshness decision).
- Any code change.

## Task Route

- Type: `verification or audit work` (run the real verification suite and record the green baseline)
- Owner Docs: `docs/testing/known-good-baselines.md` (target), `docs/context/project-context.md` (command authority)
- Skill Selection Basis: no skill applies — running npm scripts and recording results; the `testing` skill's method adds nothing over the file's own recording rules already cited in this plan.

## Infrastructure And Config Prereqs

- Node environment with dependencies installed (`node_modules/` present; run `npm install` first only if missing).
- No other infra prereqs beyond existing baseline.

## Phase 1 — Run verification suite and record the baseline

Targets: `docs/testing/known-good-baselines.md`, `docs/logs/2026/`
Skill: none

- Item Types: `Decision | Add | Proof`
- Prereqs: M1-WI2 done; WI7 plan (execution order 1) landed or explicitly recorded as concurrent

- [ ] Decision: define the baseline command scope — `full` = the four pass/fail commands (`npm run type-check`, `npm run build`, `npm run lint`, `npm run test:run`); exclusions with reasons: `npm run dev` / `npm run preview` (long-running interactive servers, no pass/fail exit semantics), `npm run format` (tree mutator, not a check), `npm install` (environment setup, not verification), e2e row `none` (excluded per the file's own full-scope rule). Alternatives considered: running every script including `format` — rejected because mutating commands have no pass criterion and would dirty the very tree the baseline records. Residual risk: none — exclusion reasons are recorded in the row's Notes.
- [ ] Add: run the four commands in the listed order at execution time, capturing each exit code from a single consistent repository state.
- [ ] Add: write exactly one real baseline row into the Baselines table, replacing the placeholder row — Date = execution date; Source `local`; Git State = current commit SHA + clean/dirty (if dirty, name the changed files in Notes per the dirty-tree rule — expected dirty with this plan's doc edits unless committed at execution); Scope `full`; Commands Passed = only the commands that exited 0; Known Failures = `none`, or each real failure with command + reason + evidence (never marked passed); Evidence = the closure entry for this plan in the execution-date log file `docs/logs/2026/{month}-{day}.md` per the one-file-per-day convention in `docs/logs/00-log-writing-guide.md` (`09-07.md` if executed on 2026-09-07); Notes = the scope exclusions from the Decision + the dirty-tree file list or clean confirmation.
- [ ] Add: re-verify `docs/logs/2026/` exists at execution (`test -d docs/logs/2026` → exit 0) and record the result in the log entry.
- [ ] Proof: run `grep -c "<" docs/testing/known-good-baselines.md` and confirm the printed count is 0 (verified at draft time that line 13 is the file's only `<` bearer; printed count is the criterion — grep exits 1 on zero matches), and confirm the Baselines table contains exactly the real row with every cell filled.

Exit Criteria:

- [ ] Placeholder row gone — `grep -c "<" docs/testing/known-good-baselines.md` prints 0 — and the table carries the real baseline row with all eight cells filled.
- [ ] Every command listed in Commands Passed exited 0 in the recorded repository state; any real failure sits in Known Failures with reason and evidence.
- [ ] Git State cell matches the actual tree at recording time; dirty changed files named in Notes per the file's rule.
- [ ] `docs/logs/2026/` existence verified at execution and recorded.
- [ ] The scope Decision is recorded with exclusions, alternatives, and residual risk.
- [ ] `docs/logs/` updated with a closure entry for this plan.

## Draft Review Record

- dispatch review #review-2026-09-07-104453-mission-driver-2026-09-07-1153-2-record-known-good-baseline-1-1124544d to ses_opencode_glm_reviewer
- 2026-09-07：iteration 1，共识 acceptable-after-fixes #review-2026-09-07-104453-mission-driver-2026-09-07-1153-2-record-known-good-baseline-1-1124544d

## Verification

## Closure
