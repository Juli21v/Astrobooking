import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  const BASE_URL = 'http://localhost:3000';

  test('should return health status', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/health`);
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'ok');
    expect(body).toHaveProperty('timestamp');
  });

  test('should return valid ISO timestamp', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/health`);
    const body = await response.json();
    
    const timestamp = new Date(body.timestamp);
    expect(timestamp).toBeInstanceOf(Date);
    expect(timestamp.getTime()).toBeGreaterThan(0);
  });
});
