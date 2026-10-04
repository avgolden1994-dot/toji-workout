# CLAUDE.md

Linee guida per Claude Code su questo repository (toji-workout).

## Delegation

- Never do the work yourself. Always dispatch a sub-agent.
- One sub-agent per task, plan first
- Run independent sub-agents in parallel
- Read the report, never the files

## Model routing

- Opus 5.5: architecture, hard bugs, review
- Sonnet 5.5: edits, tests, docs, refactors (also use Sonnet 5.5 for easier tasks)
- Haiku 4.5: lookups and summaries
- Pass `model` on every Agent call

## Project context & code search

- This file is the project context for toji-workout: it lives in the repo (saved locally and versioned).
- Always consult the graph report FIRST (`graphify-out/GRAPH_REPORT.md`), before re-reading any code.
- The report does not exist yet: generate it with graphify before relying on it (`graphify-out/` is gitignored, so it is local only).
- Use the graph (`graphify query` / `path` / `explain`) to search actively; read only the files/nodes actually needed. No broad reads of the code base.
- When modifying code: locate the affected nodes via the graph/report, then open only those files.
- Delegation rules above still apply: sub-agents do the work and read reports, not files.
