---
name: writing-plans
description: Step 2 of the guided development flow for non-developers. Use after a design is approved in brainstorming and before any code is written. Turns the approved design into a written plan of small, independently verifiable steps so the user knows exactly what will be built and in what order. Hand off to test-driven-development afterward.
allowed-tools:
  - Read
  - Write
  - Edit
---

# Writing Plans — Build the plan

After the design is approved in the `brainstorming` skill, turn it into a **plan of
small, clear steps**. The goal: the user (a non-developer) can read the plan and
understand exactly what will be done, in order.

> These instructions are for you, the agent. Talk to the user in their own language.

**Announce at the start:** "I'm building the construction plan from the design you
approved."

**Save the plan to:** `docs/plans/YYYY-MM-DD--plan.md`

## How to split the work

Break everything into **small tasks**, each with a result you can verify. Think in
steps of a few minutes, such as:

- write a test that proves what the part should do;
- run the test and watch it fail (because the part does not exist yet);
- build the minimum to make the test pass;
- run it again and watch it pass;
- save the progress.

Each task must leave the project a bit more complete and working on its own — never
"half of a thing."

## What every task must include

- **What will be done**, in one plain sentence.
- **How to know it worked** — what to check at the end (what appears on screen,
  what the test confirms).
- Its order relative to the other tasks.

You may include technical details (files, code), but always with a short note on the
"why," so the user grasps the point of each step.

## No gaps in the plan

Do not write vague steps like "do the rest later," "handle the errors," or "add
tests" without saying concretely what. If a step needs detail, put the detail in. A
plan with gaps turns into rework.

## Security is part of the plan

If the design flagged anything security-sensitive (logins, payments, personal data,
file uploads, external integrations), add **explicit tasks** for it — input
validation, authorization checks, secret handling, dependency audit — each with its
own test. Do not fold security into a vague "make it safe" step. See the Security
rules in `../AGENTS.md`.

## Self-review the plan

Reread the design and check the plan against it:

1. **Coverage** — does every thing the design asked for have a task that delivers it?
   List anything missing and add it.
2. **Gaps** — any vague or "to be defined" step? Fix it now.
3. **Coherence** — do the steps make sense together and in the right order?

## Present and continue

Show the plan to the user and explain it in plain language. Ask whether they approve
or want to adjust anything. Only after approval, go to the `test-driven-development`
skill to start building.
