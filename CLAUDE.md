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
