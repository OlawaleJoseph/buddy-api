import request from 'supertest';
import server from '../../../index';
import { User } from '../../../db/models';
import { regBody } from '../../../__mock__/user';

const app = request(server.listen(5000));

describe('User Registration', () => {
  let body;
  const url = '/api/v1/auth/register';
  beforeEach(() => {
    body = { ...regBody };
  });

  beforeAll(async () => {
    await User.sync({ force: true });
  });

  it('should return 422 if no email is not given', async () => {
    body.email = null;
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(422);
    expect(res.status).not.toEqual(404);
    expect(res.body.error).toContain('Email is required');
  });

  it('should return 422 if email is invalid', async () => {
    body.email = 'email';
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(422);
    expect(res.status).not.toEqual(404);
    expect(res.body.error).toContain('Email is invalid');
  });

  it('should return 422 if no username is not given', async () => {
    body.username = null;
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(422);
    expect(res.status).not.toEqual(404);
    expect(res.body.error).toContain('Username is required');
  });

  it('should return 422 if username is invalid', async () => {
    body.username = 'l';
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(422);
    expect(res.status).not.toEqual(404);
    expect(res.body.error).toContain('Username should have at least three(3) characters');
  });

  it('should return 422 if no password is not given', async () => {
    body.password = null;
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(422);
    expect(res.status).not.toEqual(404);
    expect(res.body.error).toContain('Password is required');
  });

  it('should return 422 if password is invalid', async () => {
    body.username = 'password';
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(422);
    expect(res.status).not.toEqual(404);
    expect(res.body.error).toContain('Password should be at least 8 characters with one uppercase and one number');
  });

  it('should return 422 if image is invalid', async () => {
    body.image = 'invalid image';
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(422);
    expect(res.status).not.toEqual(404);
    expect(res.body.error).toContain('Invalid image format');
  });

  it('should return 201 for valid input', async () => {
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(201);
    expect(res.status).not.toEqual(422);
    expect(res.body.error).toBeFalsy();
    expect(res.body.success).toBeTruthy();
    expect(res.headers.Authorization).toBeTruthy();
    expect(res.headers.Authorization.split(' ')[0]).toEqual('Bearer');
  });
});
