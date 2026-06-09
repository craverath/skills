---
name: test-driven-development
description: Step 3 of the guided development flow for non-developers. Use while building each part of an approved plan. Enforces test-first construction (write a test, watch it fail, build the minimum to pass, then clean up) and explains each part to the user in plain language. Also covers fixing bugs test-first. Hand off to requesting-code-review afterward.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
---

# Test-Driven Development — Build with tests

Build each part of the plan **test-first**. A test is an automatic check that
confirms something works as it should. Writing the test first guarantees you are
building the right thing — and that it keeps working later.

> These instructions are for you, the agent. Talk to the user in their own language.
> The user does not write tests — you do. But explain the cycle, because it is what
> gives them confidence the work is correct.

## The core rule

> No part is built without a test that **fails first**.

If you write the code before the test, delete it and restart from the test. Watching
the test fail first is what proves the test actually checks something.

## The cycle (red → green → clean)

1. **RED — write the test first.** Write a check for what the part should do.
2. **Watch it fail.** Mandatory. Run the test and confirm it fails for the right
   reason (the feature does not exist yet) — not because of a typo.
3. **GREEN — build the minimum.** Write only enough to make the test pass. Do not add
   extras nobody asked for.
4. **Watch it pass.** Mandatory. Run again and confirm it passes with no errors or
   warnings, and that the other tests still pass.
5. **CLEAN.** With everything green, tidy the code (without changing behavior) and
   keep the tests green.

Then repeat the cycle for the next part.

## Why test first

- A test written **after** the code almost always passes immediately — which proves
  nothing, because you never saw it catch a failure.
- A test written **before** forces you to define what is correct, and you watch it go
  from failing to passing — proof that it works.
- "I tried it by hand and it worked" is not enough: it is not recorded and cannot be
  repeated every time something changes.

## Always typed, always tested

Every part is built in the project's mandated stack (TypeScript or Python — see
`../AGENTS.md`), fully typed, with no untyped code (`any` in TS, an
untyped function in Python). Tests are not optional.

## What to show the user

For each part built, explain in plain language:

- what this part does;
- which check (test) proves it works;
- that all tests are passing.

## Fixing a bug

Before fixing, write a test that reproduces the bug (it must fail), then fix until the
test passes. This records the bug so it can never silently come back.

## Next step

When the plan's parts are built and tests pass, go to the `requesting-code-review`
skill for a review before calling it done.
