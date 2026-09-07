---
status: active
mission: onboarding
work-item: M1-WI3
group: "2026-09-07-1044"
verify: [test]
---

# 2026-09-07-1044-3-fill-ai-autonomy-policy Fill docs/context/ai-autonomy-policy.md

> Source: docs/backlog/onboarding-roadmap.md M1/WI3 (填 docs/context/ai-autonomy-policy.md)
> Related: 2026-09-07-1044-1-project-scan-and-engine-smoke (scan input)

## Current Baseline

- `docs/context/ai-autonomy-policy.md` exists with two placeholder surfaces:
  - Reviewer availability is the unfilled placeholder `<human | subagent | none>`. Per the file's own rule, while the placeholder remains, reviewer availability is treated as `none` and protected-area/high-risk plans stay blocked.
  - The Protected Areas table contains template rows `<payment>` (ask first), `<data deletion>` (ask first), `<auth/permissions>` (plan-first). While placeholders remain, those areas default to ask-first/blocked.
- The mission-driver engine with independent subagent reviewer sessions is available in this workspace (it is dispatching this mission), so `subagent` is evidence-backed.
- Live-repo facts relevant to Protected Areas: this is a fully static Astro site — no payment, no data deletion, no auth/permissions in product code; content schema lives in `src/content/config.ts`; deployment is Cloudflare Pages (config/repos to be confirmed from the WI1 scan at execution time).
- Depends on M1-WI1 scan output for the protected-area enumeration.

## Goals

- Reviewer availability is set to `subagent` with recorded evidence (mission-driver engine dispatches independent reviewer agents).
- The Protected Areas table is replaced with real entries or explicit `none` per area, each with a concrete rule and required-evidence cell — no `<...>` placeholder rows remain.
- The fill strictly tightens/realizes the template defaults; no rule is loosened (per the file's own constraint, loosening requires human confirmation).

## Non-Goals

- Filling `docs/context/codebase-map.md` (WI4) or any other template doc.
- Changing autonomy labels on roadmap/backlog work items.
- Any code change.

## Task Route

- Type: `implementation-only change` (policy template filling)
- Owner Docs: `docs/context/ai-autonomy-policy.md` (target), `docs/input/project-scan.md` (input)
- Skill Selection Basis: no skill applies — placeholder resolution from live evidence.

## Infrastructure And Config Prereqs

- No infra prereqs beyond existing baseline.

## Phase 1 — Resolve reviewer availability and Protected Areas placeholders

Targets: `docs/context/ai-autonomy-policy.md`
Skill: none

- Item Types: `Add | Decision | Proof`
- Prereqs: M1-WI1 (`docs/input/project-scan.md` exists)

- [ ] Add: set Reviewer availability to `subagent`, citing the mission-driver engine's independent reviewer dispatch as evidence.
- [ ] Decision: enumerate the real protected areas for a static content site from the scan and live repo — expected candidates: payment `none`, data deletion `none`, auth/permissions `none`, content-collections schema (`src/content/config.ts`) as the data/model shape area, deployment config (Cloudflare Pages) as the deployment area. For each row choose rule (`ask first` / `plan-first` / `research-only` / `blocked` / explicit `none`) and required evidence; record alternatives and residual risk in the plan or a referenced note.
- [ ] Add: write the filled Protected Areas table, replacing all three `<...>` template rows with the decided real entries.
- [ ] Proof: run `grep -cE "<(payment|data deletion|auth/permissions|human \| subagent \| none)>" docs/context/ai-autonomy-policy.md` and confirm it prints `0` (the printed count is the criterion; grep exits 1 on zero matches).

Exit Criteria:

- [ ] Reviewer availability reads `subagent` (no placeholder) with evidence recorded.
- [ ] Protected Areas table contains only real entries or explicit `none`; each row carries rule + required evidence.
- [ ] No template placeholder row remains in the file.
- [ ] The Protected Areas Decision is recorded with rationale and alternatives; no rule was loosened relative to the template defaults.
- [ ] `docs/logs/` updated with a closure entry for this plan.

## Draft Review Record

- dispatch review #review-2026-09-07-104453-mission-driver-2026-09-07-1044-3-fill-ai-autonomy-policy-1-a3f86d21 to ses_opencode_glm53
- 2026-09-07：iteration 1，共识 acceptable-after-fixes #review-2026-09-07-104453-mission-driver-2026-09-07-1044-3-fill-ai-autonomy-policy-1-a3f86d21

## Verification

## Closure
