import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const temporaryDirectory = mkdtempSync(join(tmpdir(), "command-guard-"))
const patternsFile = join(temporaryDirectory, "patterns.txt")
writeFileSync(patternsFile, "(^|[[:space:]])rm[[:space:]]+-rf[[:space:]]+/($|[[:space:]])\n")
process.env.COMMAND_GUARD_PATTERNS_FILE = patternsFile

const { CommandGuard } = await import("../adapters/command-guard")
const hooks = await CommandGuard()
const inspectCommand = hooks["tool.execute.before"]

afterAll((): void => {
  rmSync(temporaryDirectory, { recursive: true })
})

test("blocks a matching Bash command", async (): Promise<void> => {
  const invocation = inspectCommand(
    { tool: "bash" },
    { args: { command: "rm -rf /" } },
  )
  await expect(invocation).rejects.toThrow("Matched pattern")
})

test("allows a non-matching Bash command", async (): Promise<void> => {
  const invocation = inspectCommand(
    { tool: "bash" },
    { args: { command: "git status" } },
  )
  await expect(invocation).resolves.toBeUndefined()
})

test("ignores non-Bash tools", async (): Promise<void> => {
  const invocation = inspectCommand(
    { tool: "read" },
    { args: { command: "rm -rf /" } },
  )
  await expect(invocation).resolves.toBeUndefined()
})
