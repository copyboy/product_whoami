---
status: active
mission: onboarding
work-item: M1-WI5
group: "2026-09-07-1119"
verify: [test]
---

# 2026-09-07-1119-2-fill-index-and-verify-placeholders Fill docs/index.md + verify project-name placeholder replacement

> Source: docs/backlog/onboarding-roadmap.md M1/WI5 (填 docs/index.md + 校验项目名占位符全替换)
> Related: 2026-09-07-1044-2-fill-project-context (WI2 prerequisite, done)

## Current Baseline

- `docs/index.md` is mostly real already: the title was project-name-replaced by install-age.sh (`# Product Whoami Docs Index`), and the Read-This-First / Skill-Routing / Directory-Roles tables reference real files. The remaining placeholder surface is the `Domain Quick-Reference (Optional)` section: its table row `<area>` / `docs/<path>` / `<skill-name | none>` (1 line, verified via grep 2026-09-07).
- Project-name placeholder sweep (re-run live at draft review, 2026-09-07): `grep -rn -F "<project" docs/ --include="*.md"` returns 4 hits in exactly 2 files — `docs/backlog/onboarding-roadmap.md` (the WI5 check command quoted inside the roadmap text) and this plan file itself (its baseline/items quote the commands). Both are self-referential prose, not actual placeholders; excluding both files yields zero output (verified at review). Any working sweep must therefore exclude both self-referential files, not just the roadmap.
- The roadmap's literal check command `grep -c -F "<project" "-name>" docs/` is malformed grep (the `-name>` token parses as options and errors); a working equivalent check is required instead.
- This project is single-domain: one static site product surface (blog / projects / web3 column are content areas of the same site), with no separate per-domain owner docs under `docs/design/`.
- Depends on M1-WI2 (done). No code dependency.

## Goals

- `docs/index.md` contains zero `<...>` template placeholders after the Domain Quick-Reference section is resolved (filled or removed per Decision).
- A working equivalent of the project-name placeholder check is executed across `docs/` and its zero-result (excluding the self-referential command text in the roadmap and in this plan) is recorded in the plan or log.
- The known malformed-command caveat of the roadmap's literal check is recorded so future verifiers use the equivalent, not the broken literal.

## Non-Goals

- Filling `docs/context/codebase-map.md` (WI4) or `docs/architecture/*` (WI6), or any WI7/WI8 scope.
- Rewriting routing-table rows in `docs/index.md` that already reference real files (only placeholder removal and the Domain Quick-Reference decision are in scope).
- Fixing the roadmap text itself (the roadmap is the mission's control file; its self-referential command string stays as-is and is documented instead).
- Any code change.

## Task Route

- Type: `implementation-only change` (documentation template resolution + verification sweep)
- Owner Docs: `docs/index.md` (target), `docs/backlog/onboarding-roadmap.md` (WI5 definition)
- Skill Selection Basis: no skill applies — placeholder resolution and a mechanical grep sweep.

## Infrastructure And Config Prereqs

- No infra prereqs beyond existing baseline.

## Phase 1 — Resolve Domain Quick-Reference + project-name placeholder sweep

Targets: `docs/index.md`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: M1-WI2 done

- [ ] Decision: single-domain vs multi-domain treatment of the `Domain Quick-Reference (Optional)` section. Expected: single-domain — remove the section per the roadmap's own instruction (`若项目单域,移除`), because blog/projects/web3 are content areas of one static site with no separately-owned domain docs, and a filled table would only duplicate the Read-This-First routing. Alternative considered — filling a 3-row table (blog / projects / web3) — rejected as duplication without distinct owner docs; residual risk: if the site later gains separately-owned domains, re-add the section (Update trigger: a new domain gets its own owner doc under `docs/design/`).
- [ ] Add: apply the decision — remove the Domain Quick-Reference section (heading + intro line + placeholder table) or replace it with real rows if the decision lands multi-domain.
- [ ] Add: run the working project-name placeholder sweep — `grep -rn -F "<project" docs/ --include="*.md" | grep -v -e "docs/backlog/onboarding-roadmap.md" -e "docs/plans/onboarding/2026-09-07-1119-2-fill-index-and-verify-placeholders.md"` — and confirm zero output (both excluded files quote the token as self-referential prose; verified to return zero at draft review). Record the result plus the malformed-literal-command caveat in the plan closure note or `docs/logs/` entry.
- [ ] Proof: run `grep -c "<area>\|<skill-name\|docs/<path>" docs/index.md` and confirm the printed count is 0 (printed count is the criterion; grep exits 1 on zero matches), then run the broad totality check `grep -nE "<[a-z][a-z-]*>" docs/index.md` and confirm empty output — together they cover the three known placeholder tokens plus any other angle-bracket placeholder token.

Exit Criteria:

- [ ] No `<...>` template placeholder remains in `docs/index.md`.
- [ ] Project-name placeholder sweep result (zero, excluding the self-referential command text in the roadmap and in this plan) is recorded.
- [ ] The Domain Quick-Reference Decision is recorded with rationale, alternatives, and residual risk.
- [ ] `docs/logs/` updated with a closure entry for this plan.

## Draft Review Record

- dispatch review #review-2026-09-07-104453-mission-driver-2026-09-07-1119-2-fill-index-and-verify-placeholders-1-2a949ce5 to ses_opencode_glm53
- 2026-09-07：iteration 1，共识 acceptable-after-fix #review-2026-09-07-104453-mission-driver-2026-09-07-1119-2-fill-index-and-verify-placeholders-1-2a949ce5

## Verification

## Closure
