---
status: active
mission: onboarding
work-item: M1-WI7
group: "2026-09-07-1153"
verify: [test]
---

# 2026-09-07-1153-1-fill-workflow-and-backlog-readme Review docs/process/application-development-workflow.md + fill docs/backlog/README.md

> Source: docs/backlog/onboarding-roadmap.md M1/WI7 (填 docs/process/application-development-workflow.md + docs/backlog/README.md)
> Related: 2026-09-07-1044-2-fill-project-context (WI2 prerequisite, done), 2026-09-07-1119-3-fill-architecture-docs (WI6 — its Non-Goals record the deferred backlog candidates this plan may seed)

## Current Baseline

- `docs/process/application-development-workflow.md`: the title/Purpose were project-name-replaced by install-age.sh (reads "Product Whoami", line 5); the body below is generic AGE-template prose. Live reference check at draft time (2026-09-07): every file the body cites exists on disk — Stage 0 context list 5/5 (incl. `docs/context/conventions.md`, `docs/context/source-of-truth-and-precedence.md`), Stage 5/8 audit prompts (`docs/skills/multi-dimensional-audit-prompt.md`, `docs/skills/open-ended-audit-prompt.md`), Stage 10 targets (`docs/testing/`, `docs/bugs/`, `docs/logs/` all exist), plan guide (`docs/plans/00-plan-authoring-and-execution-guide.md`).
- The only `<` token in the workflow body is line 174 `` `Skill: <name>` `` — intentional plan-format syntax, not a template placeholder. The body cites no concrete verification commands; per the roadmap, this WI's remaining job for this file is a body review for project-specific adjustments, with each outcome applied or explicitly recorded as no-adjustment-needed.
- `docs/backlog/README.md` still carries the template P0 row (line 13): `<first slice>` / `docs/requirements/<path>` / `docs/design/<path>` / `docs/plans/<path-or-none>` / `<YYYY-MM-DD>`, status `needs-requirement`, autonomy `blocked`, blocker `template placeholders not replaced`. The rest of the file (Readiness Invariants, Status Values, AI Autonomy Values, Selection Rule) is real AGE-template policy text that matches this repo's filled context docs.
- Deferred candidates that can become backlog rows exist in closed plan `2026-09-07-1119-3` (WI6 Non-Goals): fill `docs/architecture/api-response-conventions.md`, fill `docs/architecture/integration-and-transaction-patterns.md`, author `docs/architecture/mission-driver-baseline.md` (referenced-then-removed in WI6; writing it was deferred). None of the three has a requirement doc under `docs/requirements/` — that directory holds only its `README.md`, `00-requirement-synthesis-guide.md`, and three unfilled template files (`mvp.md`, `product-baseline.md`, `product-scope.md`: empty `## Fill In` sections / `<capability>`-style placeholders; verified 2026-09-07), so no implementation-ready requirement exists for any of them.
- `docs/process/README.md` exists but is not in WI7's file list.
- Depends on M1-WI2 (done). No code dependency.

## Goals

- `docs/process/application-development-workflow.md` body is reviewed stage-by-stage against this repo's reality; every adjustment the review finds necessary is applied, and every reviewed stage with no needed change has its no-adjustment-needed outcome explicitly recorded.
- `docs/backlog/README.md` contains zero template placeholder cells: the P0 `<first slice>` row is replaced per the roadmap by real work-item rows and/or the explicit `(no active work item; identify next slice from requirements or input)` line, resolved via the Decision below.
- Every path cited in both target files at close exists on disk at execution time.

## Non-Goals

- WI8 scope (`docs/testing/known-good-baselines.md`, running the verification suite, `docs/logs/{year}/` check).
- Editing `docs/process/README.md` (not in WI7's file list; untouched by this plan).
- Fixing the roadmap text (mission control file, stays as-is).
- Promoting any backlog candidate to `ready`/`in-progress` or granting `implement` autonomy (agents may not upgrade rows per the README's own rule).
- Any code change.

## Task Route

- Type: `implementation-only change` (documentation review + backlog template resolution)
- Owner Docs: `docs/process/application-development-workflow.md`, `docs/backlog/README.md` (targets); `docs/backlog/onboarding-roadmap.md` M1/WI7 (definition)
- Skill Selection Basis: no skill applies — stage-by-stage doc review against live repo evidence and template placeholder resolution, same basis as prior onboarding plans.

## Infrastructure And Config Prereqs

- No infra prereqs beyond existing baseline.

## Phase 1 — Review workflow body + resolve backlog placeholder row

Targets: `docs/process/application-development-workflow.md`, `docs/backlog/README.md`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: M1-WI2 done; M1-WI6 plan closed (its Non-Goals list is the deferred-candidate source)

- [x] Decision: choose the workflow-body adjustment set. Expected (from draft-time evidence, re-verify at execution): (a) Stage 10 "Run the real verification commands" — concretize by citing this repo's four pass/fail commands from `docs/context/project-context.md` (`npm run type-check`, `npm run build`, `npm run lint`, `npm run test:run`) and pointing to `docs/testing/known-good-baselines.md` for recorded baselines; (b) Stage 0 context list — already accurate (5/5 files exist), record no-adjustment-needed; (c) Stage 5/8 prompt references — already accurate (templates exist on disk), record no-adjustment-needed; (d) every other stage — checked against this repo, expected no-adjustment-needed. Alternatives considered: leaving the body fully generic — rejected because the roadmap WI explicitly demands a project-specific review and Stage 10 is where generic text forces every future session to re-derive the command list; rewriting the body wholesale — rejected because the reference checks show the rest already matches this repo. Residual risk: cited commands drift if `package.json` scripts change; mitigated by the staleness rules already governing `project-context.md`.
- [x] Add: apply the decided adjustments to `docs/process/application-development-workflow.md`. Record the per-stage review outcome (adjusted, or no-adjustment-needed with the check performed) in the closure note or `docs/logs/` entry for this plan.
- [x] Decision: backlog first-row treatment. Expected: BOTH — (1) write the explicit line `(no active work item; identify next slice from requirements or input)` (there is no active work item: `docs/requirements/` holds no implementation-ready requirement doc — only its README, the synthesis guide, and three unfilled template files, per Current Baseline; re-verify this directory state at execution), AND (2) add the three deferred candidates from WI6 as `idea` rows — fill `docs/architecture/api-response-conventions.md`, fill `docs/architecture/integration-and-transaction-patterns.md`, author `docs/architecture/mission-driver-baseline.md` — each row carrying the real target path, Requirement cell `none yet`, Owner Doc cell `docs/architecture/README.md` (or the file itself for the two fills), Plan cell `none`, Status `idea`, AI Autonomy `research-only`, Blocker `no requirement doc`, Last Checked = execution date. Alternatives considered: explicit line only — rejected because it discards the deferred-candidate knowledge recorded in WI6's Non-Goals and forces re-discovery; promoting a candidate to a scheduled row — rejected because none has a requirement doc or owner-doc decision yet (and the README forbids agent upgrades toward ready). Residual risk: `idea` rows go stale; mitigated by Last Checked dates and the README's own downgrade rule.
- [x] Add: apply the backlog decision — write the chosen line and/or rows into `docs/backlog/README.md`, removing the template P0 placeholder row entirely; verify the column count of every added row matches the table header.
- [x] Proof: run `grep -c "<first slice>\|<path>\|<path-or-none>\|<YYYY-MM-DD>" docs/backlog/README.md` and confirm the printed count is 0 (printed count is the criterion; grep exits 1 on zero matches); run `grep -n "<[A-Za-z]" docs/process/application-development-workflow.md | grep -v "Skill: <name>"` and confirm empty output (the `Skill: <name>` token is plan-format syntax, not a placeholder); re-verify at execution time that every path cited in both target files exists on disk.

Exit Criteria:

- [x] Workflow body review outcome recorded per stage: every stage either adjusted or explicitly recorded no-adjustment-needed; the Stage-10 command citation (or its reasoned rejection) is visible in the diff or the log entry.
- [x] `docs/backlog/README.md` contains zero template placeholder cells; the first-row Decision is applied with rationale, alternatives, and residual risk recorded.
- [x] Every path cited in both target files exists on disk at execution time.
- [x] `docs/logs/` updated with a closure entry for this plan.

## Draft Review Record

- dispatch review #review-2026-09-07-104453-mission-driver-2026-09-07-1153-1-fill-workflow-and-backlog-readme-1-f14137fa to ses_opencode_glm53
- 2026-09-07：iteration 1，共识 acceptable-after-fixes #review-2026-09-07-104453-mission-driver-2026-09-07-1153-1-fill-workflow-and-backlog-readme-1-f14137fa

## Verification

- pass test 2026-09-07-104453-mission-driver exit=0

## Closure

- dispatch audit #audit-2026-09-07-104453-mission-driver-2026-09-07-1153-1-fill-workflow-and-backlog-readme-1-8fecce61 to ses_opencode_glm53 models={exec:opencode-glm-5.3,aud:opencode-glm-5.3}
- accepted #audit-2026-09-07-104453-mission-driver-2026-09-07-1153-1-fill-workflow-and-backlog-readme-1-8fecce61：审计通过——工作已真实落地：workflow Stage 10 已具体化为本仓四条命令并指向 known-good-baselines（live 核对 docs/process/application-development-workflow.md:223-230 + package.json 四脚本均存在），backlog 模板占位行已删除且 decision 双落地（docs/backlog/README.md:11 显式无活动项行 + 13-19 三条 idea 行、列数与表头一致），Proof 复跑通过（grep -c 占位符=0；grep -n "<[A-Za-z]" 除 Skill: <name> 外为空），引用路径抽查 8/8 存在，日志闭箱记录见 docs/logs/2026/09-07.md；验证命令 `echo onboarding-ok`（missions/onboarding.json test 键）exit=0。
