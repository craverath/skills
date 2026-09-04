import { readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"

interface ToolExecutionInput {
  tool: string
}

interface ToolExecutionOutput {
  args: Record<string, unknown>
}

const patternsPath = process.env.COMMAND_GUARD_PATTERNS_FILE
  ?? join(homedir(), ".agents", "hooks", "dangerous-patterns.txt")

function loadDangerousPatterns(): Array<{ source: string; regex: RegExp }> {
  let contents = ""
  try {
    contents = readFileSync(patternsPath, "utf8")
  } catch {
    return []
  }

  return contents
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"))
    .map((source) => ({
      source,
      regex: new RegExp(source.replaceAll("[:space:]", "\\s"), "m"),
    }))
}

function findBlockedPattern(command: string): string | undefined {
  return loadDangerousPatterns().find(({ regex }) => regex.test(command))?.source
}

export const CommandGuard = async () => ({
  "tool.execute.before": async (
    input: ToolExecutionInput,
    output: ToolExecutionOutput,
  ): Promise<void> => {
    if (input.tool !== "bash") return

    const command = output.args.command
    if (typeof command !== "string") return

    const blockedPattern = findBlockedPattern(command)
    if (!blockedPattern) return

    throw new Error(
      `Command blocked by global guard. Matched pattern: ${blockedPattern}`,
    )
  },
})
