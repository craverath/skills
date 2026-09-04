---
name: global-agent-guardrails
description: Maintain a shared denylist that blocks catastrophic shell commands before execution in Claude Code, Codex, Kiro CLI, and OpenCode. Use when installing command guardrails, changing blocked-command patterns, wiring hooks, or diagnosing why a command was allowed or denied.
---

# Global Agent Guardrails

Block catastrophic shell commands before they run. Treat this guard as protection against accidents, not as a sandbox: regex matching cannot stop every obfuscated or indirect command.

## Bundled files

```text
hooks/dangerous-patterns.txt       Shared POSIX ERE denylist
hooks/deny-dangerous.sh            Claude Code, Codex, and Kiro hook
hooks/test-guard.sh                Regression tests
adapters/command-guard.ts          OpenCode adapter
adapters/kiro-command-guard.json   Kiro CLI hook template
```

Install the three files from `hooks/` into `~/.agents/hooks/`. Install the platform adapters described below. Use absolute paths in hook configuration.

## Validate installation

```bash
ls ~/.agents/hooks/deny-dangerous.sh ~/.agents/hooks/dangerous-patterns.txt
~/.agents/hooks/test-guard.sh
```

The test must finish with `failed: 0`.

## Change a pattern

1. Edit `~/.agents/hooks/dangerous-patterns.txt` using one POSIX ERE per line.
2. Use `[[:space:]]`, not `\s`; JavaScript adapters convert it automatically.
3. Add blocked and allowed regression cases to `test-guard.sh`.
4. Run the full test suite before finishing.

Block only irreversible or catastrophic operations. Keep recoverable local operations allowed unless the user explicitly requests stricter behavior.

## Platform wiring

### Claude Code

Merge this entry into `~/.claude/settings.json` without replacing existing hooks:

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "/ABSOLUTE/HOME/.agents/hooks/deny-dangerous.sh"
      }]
    }]
  }
}
```

### Codex

Merge the same hook shape into `~/.codex/hooks.json`. Review and trust the exact hook definition with `/hooks`; changing that definition invalidates its trust hash. Editing only the shared patterns file does not change the hook definition.

### Kiro CLI

Copy `adapters/kiro-command-guard.json` to `<project>/.kiro/hooks/global-agent-guardrails.json`, replace `/ABSOLUTE/HOME`, and restart the session. Kiro CLI 3.x discovers hooks per project and uses `shell` as the shell-tool matcher.

### OpenCode

Copy `adapters/command-guard.ts` to `~/.config/opencode/plugins/command-guard.ts`. OpenCode loads it globally and invokes `tool.execute.before` for shell commands.

## Blocking contract

The shared script reads hook JSON from standard input. It accepts commands at `.tool_input.command`, `.toolInput.command`, or `.command`. A matching pattern produces a reason on standard error and exit code `2`; no match exits `0` silently.

The OpenCode adapter reads the same patterns file and throws an error on a match.

## Safety behavior

- Fail open when the patterns file or `jq` is unavailable so a broken installation does not disable every shell command.
- Re-read patterns for every command so denylist changes apply immediately.
- Never retry or disguise a command that the guard blocks.
- Expect false positives when harmless arguments contain dangerous-looking command text.
- Test from a non-repository temporary directory when probing remote Git blocks.

Direct safe probe:

```bash
echo '{"tool_input":{"command":"rm -rf /"}}' \
  | ~/.agents/hooks/deny-dangerous.sh
echo "exit=$?"
```

Expected exit code: `2`.
