const request = require('supertest');
const express = require('express');

// Dummy app for testing
const app = express();
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Success' });
});

describe('Backend Sample Tests', () => {
  it('should pass a basic truth test', () => {
    expect(true).toBe(true);
  });

  it('should return 200 on /api/test', async () => {
    const response = await request(app).get('/api/test');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Success');
  });
});
