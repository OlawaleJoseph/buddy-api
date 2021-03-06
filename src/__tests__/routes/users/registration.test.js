import request from 'supertest';
import path from 'path';
import server from '../../../index';
import { sequelize } from '../../../db/models';
import { regBody } from '../../../__mock__/user';

let app;

describe('User Registration', () => {
  let body;
  const url = '/api/v1/auth/register';
  beforeAll(async (done) => {
    app = await request(server);
    await sequelize.sync({ force: true });
    done();
  });

  beforeEach(() => {
    body = { ...regBody };
  });

  afterAll(async (done) => {
    await sequelize.close();
    done();
  });

  it('should return 422 if no email is not given', async () => {
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

  it('should return 422 if no username is not given', async () => {
    body.username = undefined;
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
    body.password = undefined;
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(422);
    expect(res.status).not.toEqual(404);
    expect(res.body.error).toContain('Password is required');
  });

  it('should return 422 if password is invalid', async () => {
    body.password = 'password';
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(422);
    expect(res.status).not.toEqual(404);
    expect(res.body.error).toContain('Password should have at least an uppercase and a digit');
  });

  it('should return 422 if image is invalid', async () => {
    body.avatar = 7890745;
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(422);
    expect(res.status).not.toEqual(404);
    expect(res.body.error).toContain("Invalid image format");
  });

  it('should return 201 for valid input', async () => {
    const { username, password, email } = body;
    const res = await app.post(url)
      .field('username', username)
      .field('email', email)
      .field('password', password)
      .attach('avatar', path.join(path.dirname(__filename), '../../../assets/lady.jpg'));

    console.log(res.body)
    expect(res.status).toEqual(201);
    expect(res.status).not.toEqual(422);
    expect(res.body.error).toBeFalsy();
    expect(res.body.success).toBeTruthy();
    expect(res.headers.authorization).toBeTruthy();
    expect(res.headers.authorization.split(' ')[0]).toEqual('Bearer');
  });

  it('should return 409 if email already exist', async () => {
    const res = await app.post(url).send(body);

    expect(res.status).toEqual(409);
    expect(res.status).not.toEqual(422);
    expect(res.body.error).toContain('User already exist');
    expect(res.body.success).toBeFalsy();
    expect(res.headers.Authorization).toBeUndefined();
  });
});
