---
name: creating-gh-issues
description: >
  Creates a Github issue based on the provided specification or context. 
  To be used to create issues for features, bug corrections, or enhancements.
---

# Creating Github Issues Skill

When asked for creating a Github issue, follow these steps:

1. **Capture inputs**: 
    - Draft the issue title from the specification or context; if unclear, ask.
    - Identify the repo remote URL from context or [AGENTS.md](AGENTS.md).
    - If not, identify it by using local git commands to get the remote URL.
      - Save the remote URL at [AGENTS.md](AGENTS.md) for later use.
2. **Create the Github issue**: 
    - Use the Github MCP tool to create the issue in the current repository.
    - Set the issue title and body based on the provided specification or context.
    - Add a label `bug` or `enchancement` based on the content.
    - Save the created issue URL for reference and the ID for tracking.
3. **Double-link to the specification (if applicable)**: 
    - If the issue is created based on a specification file:
      - Add the created issue URL back to the file for traceability.
      - Add the github spec file url to the created issue body for context.