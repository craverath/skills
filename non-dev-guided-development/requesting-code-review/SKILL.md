---
name: requesting-code-review
description: Step 4 of the guided development flow for non-developers. Use after building a feature and before finishing it. Runs an independent review of the work against the plan, reports problems classified by severity in plain language, and decides what must be fixed before delivery. Hand off to finishing-a-development-branch afterward.
allowed-tools:
  - Read
  - Bash
---

# Requesting Code Review — Review the work

Before calling the work done, run an **independent review**. The point is a second
look — focused only on what was built — to catch problems before they grow. The user
does not need to understand the code; you review it and report the result in plain
language.

> These instructions are for you, the agent. Talk to the user in their own language.

**Core principle:** Review early, review often.

## When to review

**Always:**
- after finishing a meaningful feature;
- before delivering / finishing the work.

**Also helpful:**
- when you got stuck (a fresh look helps);
- after fixing a tricky problem.

## How it works

1. Compare what was built against what the plan asked for.
2. A reviewer (independent of the original work) looks for problems and classifies them:
   - **Critical** — must be fixed now; blocks progress.
   - **Important** — fix before delivering.
   - **Minor** — note for later; does not block.
3. Present a summary to the user: what is good, plus the list of problems by severity,
   in plain language.

## Security pass (always)

Always review against the Security rules in `../AGENTS.md`. At minimum:

- No secrets in code, logs, or the repo; `.env` is git-ignored.
- All external input is validated; DB access is parameterized (no injection).
- Authorization is enforced server-side; auth uses a vetted library.
- Dependencies audited (`pnpm audit` / `pip-audit`); Electron has
  `contextIsolation`/`sandbox` on.

Treat any security finding as **Critical** or **Important** — never Minor.

## What to do with the result

This skill only **reviews** — it does not change the code. Route every fix back
through the build step so each one is done test-first:

- **Critical** and **Important** problems → go back to the `test-driven-development`
  skill and fix each one test-first (a failing test first, then the fix). Then run
  this review again on the result.
- **Minor** problems → note them for later; they do not block delivery.
- If the reviewer is wrong on a point, explain why (backed by the tests that prove it
  works) instead of changing things blindly.

## Never

- Skip the review because "it's simple."
- Ignore a critical problem.
- Fix code from inside this skill — send it back to `test-driven-development`.
- Move on to delivery with critical or important problems still open.

## Next step

Once the critical and important problems have been fixed back in
`test-driven-development` and the review comes back clean, go to the
`finishing-a-development-branch` skill to deliver.
