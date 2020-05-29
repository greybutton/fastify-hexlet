// @ts-check

import i18next from 'i18next';
import { validate } from 'class-validator';
import _ from 'lodash';
import encrypt from '../lib/secure.js';
import User from '../entity/User.js';
// import { buildFromObj, buildFromModel } from '../lib/formObjectBuilder';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.orm.getRepository(User).find();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, async (req, reply) => {
    //     const params = buildFromModel(User.rawAttributes);
      const user = new User();
      reply.render('users/new', { user });
      return reply;
    })
    .post('/users', async (req, reply) => {
      const user = User.create(req.body.user);
      user.password = req.body.user.password;
      user.passwordDigest = encrypt(user.password);

      const errors = await validate(user);
      if (!_.isEmpty(errors)) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors });
        return reply;
      }
      await user.save();
      req.flash('info', i18next.t('flash.users.create.success'));
      reply.redirect(app.reverse('root'));
      return reply;
    })
    .get('/users/:id', { name: 'showUser' }, async (req, reply) => {
      const { id } = req.params;
      const user = await User.findOne(id);
      reply.render('users/show', { user });
      return reply;
    })
    .get('/users/:id/edit', { name: 'editUser' }, async (req, reply) => {
      const { id } = req.params;
      const user = await User.findOne(id);
      reply.render('users/edit', { user });
      return reply;
    })
    .patch('/users/:id', { name: 'updateUser' }, async (req, reply) => {
      const { id } = req.params; // { '*': 'users/1' }
      const { user } = req.body;

      try {
        await User.update(user, id);
        req.flash('info', i18next.t('flash.users.update.success'));
        reply.redirect(app.reverse('users'));
        return reply;
      } catch (e) {
        reply.render('users/edit', { user });
        return reply;
      }
    })
    .delete('/users/:id', { name: 'deleteUser' }, async (req, reply) => {
      const { id } = req.params;
      const user = await User.findOne(id);

      try {
        await user.remove();
        req.flash('info', i18next.t('flash.users.delete.success'));
        reply.redirect(app.reverse('users'));
        return reply;
      } catch (e) {
        req.flash('error', i18next.t('flash.users.delete.success'));
        return reply;
      }
    });
};
