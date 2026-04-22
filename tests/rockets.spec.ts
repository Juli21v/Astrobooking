import { test, expect } from '@playwright/test';

test.describe('Rockets API E2E Tests', () => {
  const BASE_URL = 'http://localhost:3000';
  const VALID_RANGES = ['suborbital', 'orbital', 'moon', 'mars'];
  const VALID_CAPACITIES = [1, 10];

  // Helper function to create a rocket and return the created rocket data
  async function createRocket(request: any, rocketData: { name: string; range: string; capacity: number }) {
    const response = await request.post(`${BASE_URL}/rockets`, {
      data: rocketData,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBe(201);
    return await response.json();
  }

  // Test 1: Create a valid rocket (201 response)
  test('should create a new rocket with valid data and return 201', async ({ request }) => {
    const newRocket = {
      name: 'Starship',
      range: 'mars',
      capacity: 5,
    };

    const response = await request.post(`${BASE_URL}/rockets`, {
      data: newRocket,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name', newRocket.name);
    expect(body).toHaveProperty('range', newRocket.range);
    expect(body).toHaveProperty('capacity', newRocket.capacity);
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
  });

  // Test 2: Retrieve all rockets (200 response)
  test('should retrieve all rockets and return 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/rockets`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  // Test 3: Retrieve a specific rocket by ID (200 response)
  test('should retrieve a specific rocket by ID and return 200', async ({ request }) => {
    const newRocket = {
      name: 'Falcon 9',
      range: 'orbital',
      capacity: 9,
    };

    const createdRocket = await createRocket(request, newRocket);
    const rocketId = createdRocket.id;

    // Then retrieve it
    const response = await request.get(`${BASE_URL}/rockets/${rocketId}`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(rocketId);
    expect(body.name).toBe(newRocket.name);
    expect(body.range).toBe(newRocket.range);
    expect(body.capacity).toBe(newRocket.capacity);
  });

  // Test 4: Update a rocket with valid data (200 response)
  test('should update a rocket with valid data and return 200', async ({ request }) => {
    const newRocket = {
      name: 'Dragon',
      range: 'orbital',
      capacity: 7,
    };

    const createdRocket = await createRocket(request, newRocket);
    const rocketId = createdRocket.id;

    // Update it
    const updateData = {
      name: 'Dragon Updated',
      capacity: 8,
    };

    const response = await request.put(`${BASE_URL}/rockets/${rocketId}`, {
      data: updateData,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(rocketId);
    expect(body.name).toBe(updateData.name);
    expect(body.capacity).toBe(updateData.capacity);
  });

  // Test 5: Delete a rocket (204 response)
  test('should delete a rocket and return 204', async ({ request }) => {
    const newRocket = {
      name: 'Rocket to Delete',
      range: 'suborbital',
      capacity: 5,
    };

    const createdRocket = await createRocket(request, newRocket);
    const rocketId = createdRocket.id;

    // Delete it
    const response = await request.delete(`${BASE_URL}/rockets/${rocketId}`);

    expect(response.status()).toBe(204);

    // Verify it's deleted by attempting to retrieve it
    const getResponse = await request.get(`${BASE_URL}/rockets/${rocketId}`);
    expect(getResponse.status()).toBe(404);
  });

  // Test 6: Return 400 for invalid capacity (outside 1-10 range)
  test('should return 400 for capacity outside 1-10 range', async ({ request }) => {
    const invalidRocket = {
      name: 'Invalid Capacity Rocket',
      range: 'orbital',
      capacity: 11, // Invalid: exceeds max
    };

    const response = await request.post(`${BASE_URL}/rockets`, {
      data: invalidRocket,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty('errors');
    expect(Array.isArray(body.errors)).toBe(true);
    expect(body.errors.some((err: any) => err.field === 'capacity')).toBe(true);
  });

  // Test 7: Return 400 for invalid range value
  test('should return 400 for invalid range value', async ({ request }) => {
    const invalidRocket = {
      name: 'Invalid Range Rocket',
      range: 'neptune', // Invalid: not in allowed values
      capacity: 5,
    };

    const response = await request.post(`${BASE_URL}/rockets`, {
      data: invalidRocket,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty('errors');
    expect(Array.isArray(body.errors)).toBe(true);
    expect(body.errors.some((err: any) => err.field === 'range')).toBe(true);
  });

  // Test 8: Return 404 for non-existent rocket ID
  test('should return 404 for non-existent rocket ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/rockets/non-existent-id-12345`);

    expect(response.status()).toBe(404);
  });

  // Test 9: Ensure idempotent behavior for duplicate rapid requests
  test('should handle duplicate rapid requests idempotently', async ({ request }) => {
    const newRocket = {
      name: 'Idempotent Test Rocket',
      range: 'moon',
      capacity: 6,
    };

    // Make two rapid identical requests
    const response1 = await request.post(`${BASE_URL}/rockets`, {
      data: newRocket,
      headers: { 'Content-Type': 'application/json' },
    });

    const response2 = await request.post(`${BASE_URL}/rockets`, {
      data: newRocket,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response1.status()).toBe(201);
    expect(response2.status()).toBe(201);

    const rocket1 = await response1.json();
    const rocket2 = await response2.json();

    // They should create different rockets (different IDs)
    expect(rocket1.id).not.toBe(rocket2.id);

    // But both should have the same data
    expect(rocket1.name).toBe(rocket2.name);
    expect(rocket1.range).toBe(rocket2.range);
    expect(rocket1.capacity).toBe(rocket2.capacity);
  });

  // Test 10: Verify all rocket range values are accepted
  test('should accept all valid range values', async ({ request }) => {
    for (const range of VALID_RANGES) {
      const newRocket = {
        name: `Rocket ${range}`,
        range: range as any,
        capacity: 5,
      };

      const response = await request.post(`${BASE_URL}/rockets`, {
        data: newRocket,
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status()).toBe(201);
      const body = await response.json();
      expect(body.range).toBe(range);
    }
  });

  // Test 11: Verify capacity boundaries (1 and 10 are valid)
  test('should accept valid capacity boundaries (1 and 10)', async ({ request }) => {
    for (const capacity of VALID_CAPACITIES) {
      const newRocket = {
        name: `Rocket capacity ${capacity}`,
        range: 'orbital',
        capacity: capacity,
      };

      const response = await request.post(`${BASE_URL}/rockets`, {
        data: newRocket,
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status()).toBe(201);
      const body = await response.json();
      expect(body.capacity).toBe(capacity);
    }
  });
});
