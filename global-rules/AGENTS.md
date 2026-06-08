# Agent Global Rules

## Technology stack (mandatory)

Only two languages are allowed: **TypeScript** or **Python**. Nothing else.
In every case, **always typed** and **always tested** — not optional.

Pick the stack by *what is being built*, not by preference:

- **Website or app that opens in a browser** (pages, dashboards, login areas,
  stores) → **Next.js + TypeScript**.
- **Script, automation, or command-line tool** (process files/data, integrate
  services, scheduled jobs) → **Python**.
- **Desktop app with a window/GUI** → **Python or Electron** (see tie-breaker).

If an idea spans more than one type, split it and apply the rule per part
(e.g. a website *and* an import script → Next.js for the site, Python for the script).

Fixed tools per stack (no per-project bikeshedding):

- **Web (Next.js + TS):** strict TypeScript (no `any`), Next.js App Router, pnpm,
  Vitest + Playwright, ESLint + Prettier.
- **Python:** full type hints, uv, pyright (strict), pytest, ruff (lint + format).
- **Electron:** strict TypeScript, pnpm, React renderer, Vitest + Playwright,
  ESLint + Prettier.
- **Python desktop GUI:** Python tools above + PySide6.

Desktop tie-breaker (Python vs Electron) — recommend one and explain why:

- Prefer **Electron** for rich/web-like UIs, when the web (Next.js) skills or code
  are reused, or when a polished cross-platform installer matters.
- Prefer **Python** when the program is mostly data/file processing, integrates
  heavily with the OS/hardware/local tools, or the UI is simple and a light
  footprint matters.

## Git Commits - No AI / Agent References

**NEVER commit on your own.** 
The agent may stage files only if explicitly asked.
The agent must never run:
- git commit
- git push
- git tag
- git merge
- git rebase
without explicit user confirmation.

Do not mention AI, LLMs, Claude, ChatGPT, Codex, agents, or automated generation in:
- commit messages
- code comments
- pull request descriptions
- changelogs
- documentation
- generated files

## Code style

- Functions: 4-20 lines. Split if longer.
- Files: under 500 lines. Split by responsibility.
- One thing per function, one responsibility per module (SRP).
- Names: specific and unique. Avoid `data`, `handler`, `Manager`.
  Prefer names that return <5 grep hits in the codebase.
- Types: explicit. No `any`, no `Dict`, no untyped functions.
- No code duplication. Extract shared logic into a function/module.
- Early returns over nested ifs. Max 2 levels of indentation.
- Exception messages must include the offending value and expected shape.

## Comments

- Keep your own comments. Don't strip them on refactor — they carry
  intent and provenance.
- Write WHY, not WHAT. Skip `// increment counter` above `i++`.
- Docstrings on public functions: intent + one usage example.
- Reference issue numbers / commit SHAs when a line exists because
  of a specific bug or upstream constraint.

## Tests

- Tests run with a single command: `<project-specific>`.
- Every new function gets a test. Bug fixes get a regression test.
- Mock external I/O (API, DB, filesystem) with named fake classes,
  not inline stubs.
- Tests must be F.I.R.S.T: fast, independent, repeatable,
  self-validating, timely.

## Dependencies

- Inject dependencies through constructor/parameter, not global/import.
- Wrap third-party libs behind a thin interface owned by this project.

## Structure

- Follow the framework's convention (Rails, Django, Next.js, etc.).
- Prefer small focused modules over god files.
- Predictable paths: controller/model/view, src/lib/test, etc.
- Never print, log, expose, or commit secrets.

## Formatting

- Use the language default formatter (`cargo fmt`, `gofmt`, `prettier`,
  `black`, `rubocop -A`). Don't discuss style beyond that.

## Logging

- Structured JSON when logging for debugging / observability.
- Plain text only for user-facing CLI output.
