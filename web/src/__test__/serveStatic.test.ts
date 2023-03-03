import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { app } from '../server';

// FIXME: Chưa biết cách test luồng auth
describe('Test serve static', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/?shop=lemanhtuong.myshopify.com');
    expect(response.statusCode !== 404).toBe(true);
  });
});
