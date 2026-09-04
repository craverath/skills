#!/bin/bash
# Blocks catastrophic shell commands before execution.

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
PATTERNS_FILE="${COMMAND_GUARD_PATTERNS_FILE:-$HOME/.agents/hooks/dangerous-patterns.txt}"
MODE="${1:-exitcode}"

allow_command() {
  [ "$MODE" = "cursor" ] && printf '{"permission":"allow"}\n'
  exit 0
}

command -v jq >/dev/null 2>&1 || allow_command

INPUT=$(cat)
COMMAND=$(printf '%s' "$INPUT" | jq -r \
  '.tool_input.command // .toolInput.command // .command // empty' 2>/dev/null)

[ -z "$COMMAND" ] && allow_command
[ -f "$PATTERNS_FILE" ] || allow_command

while IFS= read -r pattern; do
  case "$pattern" in ''|\#*) continue ;; esac
  if printf '%s\n' "$COMMAND" | grep -qE -- "$pattern" 2>/dev/null; then
    if [ "$MODE" = "cursor" ]; then
      jq -cn --arg matched_pattern "$pattern" '{
        permission: "deny",
        user_message: "Command guard blocked a dangerous command.",
        agent_message: ("Command blocked by global guard. Matched pattern: " + $matched_pattern)
      }'
      exit 0
    fi
    printf 'Command blocked by global guard. Matched pattern: %s\n' "$pattern" >&2
    exit 2
  fi
done < "$PATTERNS_FILE"

allow_command
