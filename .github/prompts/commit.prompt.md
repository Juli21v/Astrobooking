---
name: commit
description:  Commits pending changes.
agent: agent
model: Claude Haiku 4.5 (copilot)
tools: [execute, read]
---
# Commit Changes

## Role

Act as a software developer.

## Task

Commit the pending changes.
Use the terminal tool to run git commands.

## Context

Use the `committing-changes` skill as reference.

## Output Checklist:

- [ ] There are no uncommitted changes in the current branch.