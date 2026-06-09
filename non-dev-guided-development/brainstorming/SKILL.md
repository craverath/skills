---
name: brainstorming
description: Step 1 of the guided development flow for non-developers. Use when a non-developer describes something they want to build or change and has only a rough idea. Turns that idea into a clear, written, approved design through a one-question-at-a-time conversation. No code, files, or project scaffolding are created until the user approves the design. Hand off to writing-plans afterward.
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
---

# Brainstorming — Shape the idea

Help the user (a **non-developer**) turn a loose idea into a clear design of what
will be built. Do it through conversation, in plain language.

> These instructions are for you, the agent. Talk to the user in their own language.

**Golden rule:** Do not write code, create project files, or start building anything
until you have presented a design and the user has approved it. This applies to every
project, no matter how simple it looks.

## Anti-pattern: "this is too simple to need a design"

Every project goes through this step — even a to-do list or a tiny change. "Simple"
projects are exactly where wrong assumptions cause the most rework. The design can be
short (a few sentences), but you **must** present it and get approval.

## Procedure (in order)

1. **Understand the context** — look at existing files and what the project already has.
2. **Ask questions, one at a time** — uncover the goal, the constraints, and what
   "it worked" means to the user. Surface anything **security-sensitive** here:
   logins/accounts, payments, personal data, file uploads, or external integrations.
   Flag it in the design so it gets explicit tasks later (see the Security rules in
   `../AGENTS.md`).
3. **Propose 2–3 approaches** — explain the pros and cons of each in plain language,
   and say which you recommend and why. **Language and framework are not a choice
   here:** they are fixed by project type in the global rules
   (`../AGENTS.md` → "Technology stack"). The approaches are about
   scope and design *within* that stack, not about which technology to use. State in
   one sentence which stack applies (web → Next.js + TypeScript; script/automation →
   Python; desktop → Python or Electron) and move on.
4. **Present the design** — in chunks short enough for the user to read and follow.
   After each chunk, ask whether it is correct before continuing.
5. **Save the design** to `docs/specs/YYYY-MM-DD--design.md`.
6. **Self-review the design** — reread it for vague parts, contradictions, or
   "to be defined" gaps. Fix them now.
7. **Ask for final approval** — ask the user to read the saved design and confirm.
8. **Hand off** — only then use the `writing-plans` skill.

## How to converse

- **One question per message.** Never dump several questions at once.
- **Prefer multiple choice** ("A, B, or C?") — easier to answer than open questions.
- **No jargon.** If a technical term is unavoidable, explain it in one sentence.
- Focus on understanding: what it is for, its limits, and how to tell it is good.

## How to present the design

- Show it in short sections, sized to the complexity of each part.
- Cover, in plain language: what the system does, what its parts are, how they talk
  to each other, and what happens when something goes wrong.
- Be ready to go back and adjust whenever something does not make sense to the user.

## Principles

- **YAGNI** — cut everything not needed right now. Less is more.
- **Validate in stages** — present, get approval, then advance.
- **Stay flexible** — go back and clarify whenever something does not fit.

## Next step

The only next step from here is the `writing-plans` skill. Do not start building
anything before that.
