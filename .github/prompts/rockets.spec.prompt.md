# Spec

## Role

Act as a softare analyst.

## Task

Generate a specification to implement the functionality described below. Do not write any code or tests, just the specification.

## Context

- An API endpoint to manage rockets in the Astrobookings travel application. 
- Each rocket has:
  - name,
  - range ("suborbital", "orbital", "moon", "mars"),
  - capacity (1 to 10 passengers).
Ask for any additional context if needed.

## Specification Template

Follow this template for writing the specification file `specs\rockets.spec.md`:

````markdown
# Rocket Management API Specification
## Problem Description
- As {role}, I want to **{goal}** so that {reason}.
## Solution Overview
- {Simple approach to solve the problem, no technical details}.
## Acceptance Criteria
- [ ] EARS format
````

## Steps to follow:

1. **Define the problem**: - Clearly outline the problem with up to 3 user stories.
2. **Outline the solution**: - Simplest approach for apliccation, logic and infrastructure.
3. **Set acceptance criteria**: - Up to 9 acceptance criteria in EARS format.

## Output Checklist
- [ ]  The output should be a markdown file named `rockets.spec.md`.
- [ ]  The specification with:
   - Problem description,
   - Solution overview,
    - Acceptance criteria.