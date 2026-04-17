# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-04-17

### Added
- **Rockets Management API**: Complete REST API for managing rockets
  - Create rockets (POST /rockets)
  - Retrieve all rockets (GET /rockets)
  - Retrieve specific rocket by ID (GET /rockets/:id)
  - Update rockets (PUT /rockets/:id)
  - Delete rockets (DELETE /rockets/:id)
- **Validation Layer**: Input validation for rocket management
  - Name validation (non-empty string)
  - Range validation (suborbital, orbital, moon, mars)
  - Capacity validation (1-10 passengers)
- **Comprehensive E2E Test Suite**: 13 test cases covering all acceptance criteria
  - CRUD operations
  - Validation error handling
  - 404 error handling
  - Idempotent request handling
  - Boundary condition testing
- **API Health Check Endpoint**: GET /health for monitoring

### Fixed
- PUT endpoint validation to support partial updates
- Request content-type handling for JSON payloads

### Technical Details
- Database: In-memory store for rockets
- Response codes: 201 (created), 200 (success), 204 (deleted), 400 (validation error), 404 (not found)
- All endpoints return proper error messages with field-level validation details

## [1.0.0] - 2026-01-01

### Initial Release
- Project scaffolding
- Basic TypeScript configuration
- Express server setup
