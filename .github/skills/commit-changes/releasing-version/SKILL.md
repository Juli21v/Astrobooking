---
name: releasing-version
description: >
  Updates documentation, generates changelogs, and  handles versioning. To be used for automating release tasks.
---

# Releasing Version Skill

Automate the process of managing releases, including:
  - Updating documentation,
  - Generating changelogs,
  - and handling versioning.

Use terminal git commands as needed.

## Steps 1: Update documentation
- [] [AGENTS.md](/AGENTS.md) : Update to reflect changes.
   - tech stack,
   - setup/dev instructions,
   - folder structure are accurate.
- [] Other relevant project files (`package.json` ...).

## Step 2: Generate changelog
- [] Commit all pending changes grouping them by type of change.
- [] Use [Semantic Versioning (SemVer)](./sem-ver.md) principles.
- [] [CHANGELOG.md](/CHANGELOG.md) : Add entries to based on commit history.

## Step 3: Versioning
- [] If there is an issue/ticket id in the context, commit with `Close #ID`.
- [] Merge in into default branch.
- [] Generate a git tag for the new version.