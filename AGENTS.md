# Agents Instructions

## Product Overview
- Astrobooking is a backend API for managing rocket launch bookings.
- It provides CRUD operations for rockets with validation.
- Includes a booking system for launches with customer management and payment processing.

## Technical Implementation

### Tech Stack
- Language: **TypeScript ES2020**
- Framework: **Express 4.18.2**
- Database: **In-memory storage**
- Security: **None**
- Testing: **Playwright**
- Logging: **None**

### Development workflow
```bash
# Set up the project
npm install
# Build/Compile the project
npm run build
# Run the project
npm run dev
# Test the project
npm test
# Deploy the project
npm run start
```

### Folder structure

```text
.                       # Project root
|---- AGENTS.md         # This file with instructions for AI agents
|---- README.md         # The main human documentation file
|---- package.json      # Project dependencies and scripts
|---- tsconfig.json     # TypeScript configuration
|---- playwright.config.ts # Playwright test configuration
|---- CHANGELOG.md      # Change log
|---- LICENSE           # License file
|---- rockets.code.prompt.md # Code prompt for rockets
|---- rockets.release.prompt.md # Release prompt
|---- rockets.spec.prompt.md # Spec prompt
|---- create-agents.prompt.md # Prompt to create agents
|---- test-output.txt   # Test output
|---- test-output-2.txt # Additional test output
|---- playwright-report/ # Playwright test reports
|---- specs/            # Specifications
|---- src/              # Source code
|---- tests/            # Test files
|---- test-results/     # Test results
```

## Environment
- Code and documentation must be in English.
- Chat responses must be in the language of the user prompt.
- Sacrifice grammar for conciseness in responses.
- This is a windows environment using git bash terminal.
- My default branch is `main`.