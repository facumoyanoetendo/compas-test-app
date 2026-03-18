const request = require('supertest');

// Re-require app before each test so the in-memory store resets
let app;
beforeEach(() => {
  jest.resetModules();
  app = require('../../index');
});

describe('GET /api/users - pagination', () => {
  test('empty store returns data=[] with correct pagination envelope', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    });
  });

  test('no params defaults to page=1, limit=10 and returns first 10 of 25', async () => {
    for (let i = 1; i <= 25; i++) {
      await request(app)
        .post('/api/users')
        .send({ name: `User ${i}`, email: `u${i}@x.com` });
    }
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(10);
    expect(res.body.pagination).toMatchObject({
      page: 1,
      limit: 10,
      total: 25,
      totalPages: 3,
    });
  });

  test('page=1&limit=10 returns first 10 of 25, totalPages=3', async () => {
    for (let i = 1; i <= 25; i++) {
      await request(app)
        .post('/api/users')
        .send({ name: `User ${i}`, email: `u${i}@x.com` });
    }
    const res = await request(app).get('/api/users?page=1&limit=10');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(10);
    expect(res.body.data[0].name).toBe('User 1');
    expect(res.body.pagination).toMatchObject({
      page: 1,
      limit: 10,
      total: 25,
      totalPages: 3,
    });
  });

  test('page=3&limit=10 returns remaining 5 users when 25 exist', async () => {
    for (let i = 1; i <= 25; i++) {
      await request(app)
        .post('/api/users')
        .send({ name: `User ${i}`, email: `u${i}@x.com` });
    }
    const res = await request(app).get('/api/users?page=3&limit=10');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(5);
    expect(res.body.data[0].name).toBe('User 21');
    expect(res.body.pagination).toMatchObject({
      page: 3,
      limit: 10,
      total: 25,
      totalPages: 3,
    });
  });

  test('page=0 returns 400 Bad Request', async () => {
    const res = await request(app).get('/api/users?page=0&limit=10');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('page=-1 returns 400 Bad Request', async () => {
    const res = await request(app).get('/api/users?page=-1&limit=10');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('limit=0 returns 400 Bad Request', async () => {
    const res = await request(app).get('/api/users?page=1&limit=0');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('limit=101 returns 400 Bad Request (exceeds max)', async () => {
    const res = await request(app).get('/api/users?page=1&limit=101');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('non-integer page returns 400 Bad Request', async () => {
    const res = await request(app).get('/api/users?page=abc&limit=10');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('non-integer limit returns 400 Bad Request', async () => {
    const res = await request(app).get('/api/users?page=1&limit=2.5');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('page beyond last page returns 200 with empty data array', async () => {
    for (let i = 1; i <= 25; i++) {
      await request(app)
        .post('/api/users')
        .send({ name: `User ${i}`, email: `u${i}@x.com` });
    }
    const res = await request(app).get('/api/users?page=999&limit=10');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.pagination).toMatchObject({
      page: 999,
      limit: 10,
      total: 25,
      totalPages: 3,
    });
  });

  test('limit=100 (max allowed) returns 200 and accepts the boundary value', async () => {
    for (let i = 1; i <= 25; i++) {
      await request(app)
        .post('/api/users')
        .send({ name: `User ${i}`, email: `u${i}@x.com` });
    }
    const res = await request(app).get('/api/users?page=1&limit=100');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(25);
    expect(res.body.pagination).toMatchObject({
      page: 1,
      limit: 100,
      total: 25,
      totalPages: 1,
    });
  });
});
