import request from 'supertest';
import server from '../../index';

let app;

describe('Not Found', () => {
  const url = '/api/v1/notfound';
  beforeAll(async () => {
    app = await request(server);
  });

  afterAll(async () => {
    await server?.close();
  });

  it('should return 404 for unknown routes', async () => {
    const res = await app.get(url);

    expect(res.status).toEqual(404);
    expect(res.status).not.toEqual(200);
    expect(res.body.error).toEqual('Route not found');
  });
});
