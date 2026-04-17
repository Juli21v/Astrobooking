# Rocket Management API Specification

## Problem Description

### User Stories

- As a **travel agent**, I want to **retrieve a list of available rockets** so that **I can offer flight options to customers**.

- As a **system administrator**, I want to **add, update, and delete rockets** so that **the rocket inventory remains current and accurate**.

- As a **booking system**, I want to **validate rocket capacity and range for booking requests** so that **I can ensure customers are matched with appropriate spacecraft**.

## Solution Overview

The solution implements a REST API for managing rockets with the following approach:

- **Data Layer**: Store rocket information (name, range, capacity) in a persistent data store with validation
- **API Layer**: Expose CRUD endpoints for rocket management with appropriate HTTP methods
- **Validation Layer**: Enforce constraints on range values ("suborbital", "orbital", "moon", "mars") and capacity (1-10 passengers) at both API and data levels
- **Infrastructure**: Deploy as a scalable microservice with proper error handling and response formatting

## Acceptance Criteria

- [ ] **Given** a valid rocket object with name, range, and capacity (1-10), **When** a POST request is made to create a rocket, **Then** the rocket is persisted and a 201 response with the rocket ID is returned.

- [ ] **Given** a request to retrieve rockets, **When** a GET request is made to the rockets endpoint, **Then** a list of all rockets is returned with 200 status code.

- [ ] **Given** an existing rocket ID, **When** a GET request is made for that specific rocket, **Then** the rocket details are returned with 200 status code.

- [ ] **Given** a rocket ID and updated fields, **When** a PUT request is made with valid range and capacity, **Then** the rocket is updated and a 200 response is returned.

- [ ] **Given** a valid rocket ID, **When** a DELETE request is made, **Then** the rocket is removed and a 204 response is returned.

- [ ] **Given** a create/update request with capacity outside the range 1-10, **When** the request is processed, **Then** a 400 error is returned with a validation message.

- [ ] **Given** a create/update request with an invalid range value (not one of: suborbital, orbital, moon, mars), **When** the request is processed, **Then** a 400 error is returned.

- [ ] **Given** a request to retrieve a non-existent rocket ID, **When** a GET request is made, **Then** a 404 error is returned.

- [ ] **Given** the API receives duplicate rapid requests for the same operation, **When** the requests are processed, **Then** idempotent behavior ensures consistent results without data corruption.
