# Project Vision

## Purpose

Describe the long-term product and engineering attractor for `Product Whoami`.

## Product Goal

A personal portfolio website combining blog functionality with product showcase capabilities, plus a Web3 learning column (5-phase blockchain roadmap: Bitcoin → Ethereum → DApp → DeFi → DAO). Published at https://i.zhangqingdong.cn (`package.json` `"description"` / `"homepage"`).

## Primary Users

- Site visitors — readers of blog articles, project showcase viewers, web3 learners, search users.
- The solo content author (Gerrad Zhang) — publishes content by adding MDX to the content collections and pushing; no code change required for routine publishing.

## Constraints That Must Stay True

- Fully static Astro SSG deployed on Cloudflare Pages — no backend runtime.
- Content is managed via MDX Astro Content Collections (`src/content/blog/`, `src/content/projects/`).
- Schema changes to `src/content/config.ts` are plan-first per the protected-areas table in `docs/context/ai-autonomy-policy.md`.

## Explicit Non-Goals

- No dynamic server / server-side rendering at runtime.
- No payment processing.
- No auth or user-data storage.

## Success Criteria For The First Production Milestone

- All verification commands (`npm run type-check` / `build` / `lint` / `test:run`) green on a known-good baseline, recorded in `docs/testing/known-good-baselines.md` (onboarding M1/WI8).
- New content publishable by adding MDX to a content collection and `git push` — no code change needed for routine publishing.

## Required Human Decision Points

Each is already gated by an existing policy; AI must not silently decide them:

- Deployment / Cloudflare configuration changes — plan-first protected area (`docs/context/ai-autonomy-policy.md`, setup ref `docs/cloudflare-pages-setup.md`).
- Protected-area list changes in `docs/context/ai-autonomy-policy.md` — AI may tighten, never loosen, without human confirmation.
- Documentation freshness upgrades in `docs/context/project-context.md` — AI may not mark stale docs fresh without human confirmation or human-approved owner-doc evidence.

## Decision Record (2026-09-07, M1-WI6)

- Success criteria and human decision points above were chosen from live repo evidence (verification commands in `package.json`; protected areas and freshness gating already recorded by WI3/WI2).
- Alternatives considered — richer success criteria (traffic/SEO metrics): rejected, no analytics evidence exists in the repo to define them.
- Residual risk: criteria may be tightened later when real metrics exist.

## Notes

- Keep this document stable and high level.
- Do not turn it into a backlog.
- Do not duplicate current milestone scope from `docs/requirements/product-scope.md`.
- Do not duplicate current app surfaces from `docs/design/app-overview.md`.
- Move implementation sequencing into `docs/plans/` or `docs/requirements/`.
