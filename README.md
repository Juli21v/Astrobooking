# Astrobooking-Demo
A backend API for offering bookings for rocket launches.

## Features

### Rockets Management
- **CRUD Operations**: Create, retrieve, update, and delete rocket records
- **Validation**: Comprehensive input validation for rocket properties
  - Name: Non-empty string
  - Range: One of `suborbital`, `orbital`, `moon`, or `mars`
  - Capacity: Integer between 1-10 passengers
- **RESTful Endpoints**:
  - `POST /rockets` - Create a new rocket (returns 201)
  - `GET /rockets` - Retrieve all rockets (returns 200)
  - `GET /rockets/:id` - Retrieve a specific rocket (returns 200 or 404)
  - `PUT /rockets/:id` - Update a rocket (returns 200 or 404)
  - `DELETE /rockets/:id` - Delete a rocket (returns 204 or 404)
- **Health Check**: `GET /health` - API status endpoint

### Booking System
* Launches are scheduled for specific rockets, with pricing and minimum passenger thresholds.
* Rockets have limited seats; launch requests are validated against rocket capacity.
* Launch status lifecycle: scheduled -> confirmed -> successful, or cancellation/suspension paths.
* A customer is identified by their email address and has a name and phone number.
* One customer can book multiple seats on a launch but cannot exceed the available seats.
* Customers are billed upon booking, and payments are processed through a mock gateway.

## Testing

Run the E2E test suite with:
```bash
npm test
```

This executes 13 comprehensive test cases covering:
- All acceptance criteria for the Rockets API
- Validation error handling
- 404 error responses for non-existent resources
- Idempotent behavior
- Boundary condition validation

### Health Status
```bash
curl http://localhost:3000/health
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The server will listen on `http://localhost:3000`

## Build

```bash
npm run build
```

## Notes

> [!WARNING]
> AstroBooking is a fictional space travel company.
> The system is designed for demonstration and training purposes.
> Not for production use; no security or database is required at the initial stage.

