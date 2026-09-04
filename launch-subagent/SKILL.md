---
name: launch-subagent
description: 'Read this BEFORE launching any subagent (Task tool, background agents, parallel agents, best-of-N, delegating work to another agent). Consensus principles for using subagents well. Triggers: launch a subagent, spawn agents, run agents in parallel, delegate to a subagent.'
license: MIT
compatibility: Requires a host with native subagent or delegated-task support.
metadata:
  source: "https://github.com/davidondrej/skills"
  source-commit: "9dc174b058f7a21d3269584ec589b637bd53801d"
---

# General Subagent Principles

Consensus of Boris Cherny, Matt Pocock, Pietro Schirano, and Peter Steinberger:

- Respect the user's request and the host's delegation policy. Do not launch a subagent when delegation is unavailable or not authorized.
- Delegate only self-contained tasks. Split work so subtasks have no unresolved dependencies on each other; parallelize only independent work.
- Parallel subagents must never touch the same files — that is a recipe for conflicts. Partition the work or keep it in one agent.
- Context inheritance varies by host. Assume the subagent may miss prior context. Include the scope, relevant paths, constraints, required skills, and exact output in its brief.
- Scope narrowly and concretely: "explore how payments work" beats "explore everything". One bounded task per subagent, small blast radius.
- The main agent stays the orchestrator. It plans the split, integrates results, and reviews/verifies every subagent output before trusting it.
- Keep critical implementation, tightly-coupled edits, and quick fixes in the main loop — delegation overhead is only worth it for independent, research-heavy, or review work.
- Have subagents return short summaries or concrete results, never raw transcripts or file dumps. That keeps the main context clean.

Use the host's native delegation capability. Tool names differ across Claude Code, Codex, Kiro CLI, and OpenCode; if the host has no native capability, complete the work in the main session.

Before finishing, verify that every delegated result was received, reviewed, and integrated without overlapping edits.
