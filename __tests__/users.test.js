// @ts-check
import { createConnection } from 'typeorm';
import ormconfig from '../ormconfig.js';

import app from '../server/index.js';
import User from '../server/entity/User.js';
import encrypt from '../server/lib/secure.js';

const userParams = {
  email: 'email@email.email',
  password: 'password',
  firstName: 'firstname',
  lastName: 'lastname',
};

describe('requests', () => {
  let server;
  let user;

  beforeAll(async () => {
    // await createConnection(ormconfig);
    server = app();

    const dbuser = User.create(userParams);
    dbuser.password = userParams.password;
    dbuser.passwordDigest = encrypt(dbuser.password);
    await dbuser.save();
    user = await User.findOne(dbuser.id);
  });

  it('index', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/users',
    });
    expect(res.statusCode).toBe(200);
  });

  // it('create', async () => {
  //   const res = await server.inject({
  //     method: 'POST',
  //     url: '/users',
  //     payload: {
  //       user: {
  //         firstName: 'firstName',
  //         lastName: 'lastName',
  //         password: 'password',
  //       },
  //     },
  //   });
  //   expect(res.statusCode).toBe(200);
  // });

  // it('show', async () => {
  //   const res = await server.inject({
  //     method: 'GET',
  //     url: `/users/${user.id}`,
  //   });
  //   expect(res.statusCode).toBe(200);
  // });

  // it('patch', async () => {
  //   const res = await server.inject({
  //     method: 'POST',
  //     url: `/users/${user.id}`,
  //     query: {
  //       _method: 'patch',
  //     },
  //     payload: {
  //       user: userParams,
  //     },
  //   });
  //   expect(res.statusCode).toBe(302);
  // });

  // it('delete', async () => {
  //   const res = await server.inject({
  //     method: 'POST',
  //     url: `/users/${user.id}`,
  //     query: {
  //       _method: 'delete',
  //     },
  //   });
  //   expect(res.statusCode).toBe(302);
  // });

  afterAll(() => {
    server.close();
  });
});
