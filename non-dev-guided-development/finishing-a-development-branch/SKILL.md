---
name: finishing-a-development-branch
description: Step 5 (final) of the guided development flow for non-developers. Use when the work is built, reviewed, and ready to deliver. Verifies all tests pass, then presents clear delivery options in plain language. Never finalizes (commit, push, merge) or discards work without explicit user confirmation.
allowed-tools:
  - Read
  - Bash
---

# Finishing a Development Branch — Deliver

The final step of the flow: finish the work safely. Confirm everything works, then
present clear delivery options. The user decides.

> These instructions are for you, the agent. Talk to the user in their own language.

**Announce at the start:** "I'm wrapping up: I'll check the tests and then show you
the delivery options."

## Safety rule (always)

You **never** finalize on your own. Officially saving the work (commit), sending it
(push), or merging it into the main project happens **only after the user's explicit
confirmation**. See the global rules in `../AGENTS.md`.

## Procedure

### 1. Check the tests

Before anything else, run all of the project's tests.

- **If any test fails:** show what failed and **stop here**. You cannot deliver with a
  broken test — fix it first (back to the test cycle in `test-driven-development`).
- **If everything passes:** continue to present the options.

### 2. Present the options

Offer clear options in plain language, for example:

```
Work is ready and tests pass. What would you like to do?

1. Merge into the main project
2. Push and open a Pull Request
3. Leave it as is (I'll handle it later)
4. Discard this work

Which option?
```

### 3. Carry out the choice

- Execute only the option the user picks, and confirm the result.
- For **discard** (option 4), require a typed confirmation (the user types `discard`)
  before deleting anything, because that action cannot be undone.
- For any action that saves, sends, or merges the work, confirm with the user first.

## Never

- Continue with failing tests.
- Delete work without explicit confirmation.
- Save, send, or merge the work without the user asking.

Once delivery is done, the flow is complete. For the next idea, start again from the
`brainstorming` skill.
