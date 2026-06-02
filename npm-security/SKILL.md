---
name: npm-security
description: Run npm security audit and harden .npmrc configuration. Use when the user asks to audit npm dependencies, run npm audit, harden npm settings, secure npm config, or set up .npmrc security policies.
user-invocable: true
allowed-tools:
  - Bash(npm audit *)
  - Read
  - Edit
  - Write
---

# npm-security — Audit and Harden npm Configuration

Run `npm audit` at high severity and enforce safe `.npmrc` defaults in the current project.

Arguments passed: `$ARGUMENTS`

---

## Steps

### 1. Harden `.npmrc`

Required entries:

```
ignore-scripts=true
save-exact=true
min-release-age=7
allow-git=none
allow-remote=none
```

**Logic:**

1. Check if `.npmrc` exists in the current working directory.
2. If it does not exist, create it with all five lines above.
3. If it exists, read it and add only the lines that are not already present (exact key match, e.g. a line starting with `ignore-scripts=` means that key is already set — do not duplicate it).
4. Append missing lines at the end of the file. Do not modify existing entries.
5. Report which lines were added and which were already present.

### 2. Run audit

```bash
npm audit --audit-level=high
```

Run this command and show the full output to the user.

- If the exit code is 0, report that no high or critical vulnerabilities were found.
- If vulnerabilities are found, summarize:
  - Total count by severity (critical, high).
  - Which packages are affected.
  - Whether `npm audit fix` can resolve them automatically (check the output for "run `npm audit fix`").
  - Recommend next steps without running `npm audit fix` automatically — ask the user first.

---

## Notes

- Always run Step 1 before Step 2 so `ignore-scripts=true` is in place before any npm command executes.
- Do not run `npm install`, `npm audit fix`, or any other npm command beyond `npm audit --audit-level=high` without explicit user confirmation.
- If `package.json` is not found in the current directory, warn the user that this does not appear to be an npm project and stop.
