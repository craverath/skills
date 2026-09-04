---
name: git-worktree
description: 'Use git worktrees to isolate parallel tasks without file collisions. Manual-only; invoke explicitly when the user requests "worktree", "parallel agents", or "one worktree per task". Do not activate for ordinary repository work.'
license: MIT
compatibility: Requires Git 2.31 or newer; optional host-native worktree support may replace manual setup.
disable-model-invocation: true
metadata:
  opencode/autoinvoke: "false"
  source: "https://github.com/davidondrej/skills"
  source-commit: "9dc174b058f7a21d3269584ec589b637bd53801d"
---

# Git Worktrees for Parallel Agents

## Authorization boundary

Creating a requested worktree is allowed. Never stage, commit, merge, rebase, push, tag, remove a worktree, or delete a branch unless the user explicitly requests that exact operation. Show integration commands for review instead of executing them without confirmation.

## Start here (before any task work)

Detect where you are:

```bash
[ "$(git rev-parse --path-format=absolute --git-dir)" = "$(git rev-parse --path-format=absolute --git-common-dir)" ] \
  && echo "primary checkout" || echo "worktree"
```

- **Primary checkout** → do NOT start editing here. Create a worktree named after the task, bootstrap it (see "Making the worktree complete"), `cd` into it, and do ALL task work there.
- **Worktree** (e.g. Cursor already started you in one) → proceed with the task.

## What a worktree is

One repo, multiple folders. `git worktree add` creates an extra checkout of the same repository in a separate directory, on its own branch. All worktrees share one `.git` history, but each has its own files. Two agents in two worktrees physically cannot overwrite each other's work.

## The working model

- **One task = one worktree = one agent session.** Never let two agents share a working directory.
- **The primary checkout is the integration point.** It stays on the main branch and is used only to review, merge, and push. It is not a scratchpad.
- **Nothing auto-merges.** The human reviews each worktree's diff, then merges it into main (or discards it), then deletes the worktree.
- **Worktree branches are local and short-lived.** Never push them unless the user explicitly asks. Only main gets pushed.
- Merge one worktree at a time. Rebase a stale worktree onto main before merging if main moved.

## Creating and removing

```bash
git worktree add ../myrepo-task-x          # new worktree + branch "myrepo-task-x"
git worktree add ../fix-y -b fix-y main    # explicit branch off main
git worktree list                          # see all worktrees
git worktree remove ../myrepo-task-x       # delete when merged/abandoned
git worktree prune                         # clean up stale registrations
```

Note: a branch can only be checked out in ONE worktree at a time (including main).

If the host can create isolated checkouts natively, use that feature. Otherwise use the Git commands above. Never assume a host-created checkout was merged or removed automatically.

## Making the worktree complete

A fresh worktree contains ONLY tracked files. Everything gitignored is missing. An agent dropped into a bare worktree will fail confusingly, so replicate:

1. **Env/secret files** — copy `.env`, `.env.local`, and similar from the primary checkout. Copy, never symlink (an agent editing a symlinked env file would corrupt the original).
2. **Dependencies** — run the install (`npm ci`, `pnpm install`, `uv sync`, `bundle install`). Never symlink `node_modules` from the primary checkout to save time or disk: bundlers resolve it to a path outside the worktree and refuse to build. Next.js/Turbopack dies with `FATAL: Symlink [project]/node_modules is invalid, it points out of the filesystem root`. Delete the symlink (`rm -f node_modules`, since `rm` alone refuses) and run a real install.
3. **Local databases and services** — decide per service:
   - Shared server (e.g. one Postgres container): pin the identity so worktrees don't spawn duplicates fighting over the same port. For Docker Compose, set a top-level `name:` in the compose file — otherwise the project name comes from the folder name and every worktree starts its own container on the same port.
   - Per-worktree state (e.g. SQLite files): copy or re-seed it.
4. **Ports** — dev servers, test servers, and debuggers bind fixed ports. Either run one at a time across all worktrees, or make the port configurable per worktree.
5. **Generated files and caches** — rebuild in the worktree (`npm run build`, codegen); build output is gitignored and won't be there.
6. **Git hooks** — `core.hooksPath` and `.git/config` are shared across worktrees automatically; verify hook scripts don't assume the primary checkout's path.

## Automate the setup

Codify the checklist so every worktree bootstraps itself. In Cursor, `.cursor/worktrees.json` runs on worktree creation (`$ROOT_WORKTREE_PATH` = the primary checkout):

```json
{
  "setup-worktree": [
    "npm ci",
    "cp $ROOT_WORKTREE_PATH/.env.local .env.local"
  ]
}
```

Without Cursor, keep a `scripts/setup-worktree.sh` in the repo and run it as the first command in any new worktree. Inside a worktree, the primary checkout's path is:

```bash
dirname "$(git rev-parse --path-format=absolute --git-common-dir)"
```

## Preparing integration

```bash
# Run only after explicit user confirmation:
git merge --no-ff task-branch     # or: git merge --squash task-branch
git worktree remove ../myrepo-task-x
git branch -d task-branch
```

Before proposing integration, report the branch, worktree path, diff summary, and validation results. The user decides whether to commit, merge, or discard it.

## Gotchas

- Gitignored files silently missing is the #1 failure — always bootstrap before the agent starts.
- Disk: each worktree duplicates the working files plus its own `node_modules`. Delete merged worktrees; don't hoard them.
- Long-lived worktrees drift. If a task stalls for days, propose rebasing onto the integration branch or restarting it, then wait for approval.
- Uncommitted work in a removed worktree is lost. Warn the user and inspect status before any removal.
- One shared stash list, one shared config, one shared refs namespace — worktrees isolate files, not git state.
