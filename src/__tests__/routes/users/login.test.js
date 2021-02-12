import request from 'supertest';
import server from '../../../index';
import { User, sequelize } from '../../../db/models';
import { loginBody, regBody } from '../../../__mock__/user';
import UserService from '../../../utils/userService';

let app;

describe('User Login', () => {
  let body;
  const url = '/api/v1/auth/login';
  beforeAll(async () => {
    app = request(server);
    await User.destroy({ truncate: true });
    regBody.password = UserService.hashPassword(regBody.password);
    await User.create(regBody);
  });

  beforeEach(() => {
    body = { ...loginBody };
  });

  afterAll(async () => {
    await User.destroy({ truncate: true });
    await sequelize.close();
  });

  it('should return 422 if no email is given', async () => {
    body.email = undefined;
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

  it('should return 401 if email is not registered', async () => {
    body.email = 'unregistered@mail.com';
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(401);
    expect(res.status).not.toEqual(422);
    expect(res.body.error).toContain('Incorrect username or password.');
  });

  it('should return 422 if no password is not given', async () => {
    body.password = undefined;
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(422);
    expect(res.status).not.toEqual(404);
    expect(res.body.error).toContain('Password is required');
  });

  it('should return 422 if password is incorrect', async () => {
    body.password = 'password';
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(401);
    expect(res.status).not.toEqual(404);
    expect(res.body.error).toContain('Incorrect username or password.');
  });

  it('should return 200 for successful login', async () => {
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(200);
    expect(res.status).not.toEqual(422);
    expect(res.body.error).toBeFalsy();
    expect(res.body.success).toBeTruthy();
    expect(res.headers.authorization).toBeTruthy();
    expect(res.headers.authorization.split(' ')[0]).toEqual('Bearer');
  });
});
