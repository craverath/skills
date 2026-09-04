# Agent Global Rules

## Response style

- Respond in simple, concise language.
- Lead with the outcome.
- Do not repeat the request or explain obvious steps.
- Include only information needed to understand, verify, or continue the task.
- Keep progress updates to one sentence and report only meaningful milestones.
- Add detailed explanations only when requested or needed to explain risks.

## Scope and execution

- For review, explanation, diagnosis, or planning requests, inspect and report
  without editing.
- For change, build, or fix requests, make only the requested changes and run
  proportional validation.
- Preserve unrelated user changes.
- Ask before destructive actions, external writes, purchases, or meaningful
  scope expansion.
- Never claim success without direct verification. State what was not verified.

## Git operations

**NEVER commit on your own.** 
The agent may stage files only if explicitly asked.
The agent must never run:
- git commit
- git push
- git tag
- git merge
- git rebase
without explicit user confirmation.

- Do not add attribution or disclosure that work was AI-generated unless
  explicitly requested.

## Code style

- Follow the project's existing language, framework, and architectural
  conventions.
- Prefer small, focused functions and modules without enforcing line limits.
- Use descriptive domain names and avoid vague names when a clearer name exists.
- Use explicit types at public boundaries. Avoid broad types when a precise type
  is practical.
- Remove meaningful duplication; tolerate small duplication when abstraction
  would add complexity.
- Prefer early returns when they improve clarity.
- Make exception messages actionable. Include offending values only when they
  are non-sensitive and safe to expose.

## Comments

- Preserve meaningful comments, but update or remove stale comments.
- Explain why, not what.
- Add public API docstrings when intent or contract is not obvious. Include an
  example only when it improves understanding.
- Reference issue numbers / commit SHAs when a line exists because
  of a specific bug or upstream constraint.

## Tests

- Use the project's documented test command.
- Add the minimum tests needed to protect changed behavior.
- Test observable behavior and public contracts, not individual functions or
  implementation details.
- Do not require one test per function, private helper, branch, or input
  combination.
- For new behavior, cover the main success path and only meaningful edge or
  failure cases.
- For bug fixes, add one focused regression test unless existing coverage
  already proves the fix.
- Avoid tests duplicated across unit, integration, and end-to-end layers.
- Mock only external boundaries. Reuse existing test utilities when practical.
- Do not introduce production abstractions solely to make testing easier.
- Run focused tests first. Run broader suites only when justified by the
  change's scope or risk.
- Do not pursue coverage targets unless explicitly requested. Stop when changed
  behavior and material risks are covered.
- Tests must be fast, independent, repeatable, and self-validating.

## Dependencies

- Inject or wrap dependencies when it improves isolation, replaceability, or
  testability, not automatically.

## Structure

- Prefer small focused modules over god files.
- Never expose or commit secrets.

## Formatting

- Use the formatter configured by the project. Format touched files only unless
  the project requires a full formatting pass.

## Logging

- Follow the project's logging conventions.
- Prefer structured logs for machine-consumed observability and plain text for
  user-facing CLI output.
