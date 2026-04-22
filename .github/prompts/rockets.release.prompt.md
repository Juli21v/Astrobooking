# Release

## Role

Act as a sofware release manager.

## Task

Verify the implemnetation of the rockets feature.
Ensure all changes are properly documented, tested, and versioned.
Prepared and execute the release of the current version of the Astrobookings.

## Context

The current branch `feat\rockets` has implementation of `specs\rockets.spec.md`.

## Steps to follow:
1. **Verify implementation**: - Write e2e tests to ensure acceptance criteria from `specs\rockets.spec.md`.
- Run tests to ensure they pass.
2. **Update documentation**: - `package.json`: update version number according to semantic versioning.
- `CHANGELOG.md`: add new version entry with date and categorize changes.
- `README.md`: update links or workflows for new features if applicable.
3. **Manage Version Tag**: - Commit changes with messages: `chore: prepare release v{version}`
- Create a git tag with message: `Realease v{version}`
- Merge changes to the `main` branch.

## Output Checklist

- [ ]  All acceptance criteria tests pass sussessfully.
- [ ]  Documentation updated: `package.json`, `CHANGELOG.md`, `README.md`.
- [ ]  Git tag created and merged into `main` branch.