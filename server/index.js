// @ts-check

import 'reflect-metadata';
import path from 'path';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import fastifyTypeORM from 'fastify-typeorm';
import fastifyErrorPage from 'fastify-error-page';
import pointOfView from 'point-of-view';
import fastifyFormbody from 'fastify-formbody';
import fastifySecureSession from 'fastify-secure-session';
import fastifyFlash from 'fastify-flash';
import fastifyReverseRoutes from 'fastify-reverse-routes';
import fastifyMethodOverride from 'fastify-method-override';
import Pug from 'pug';
import i18next from 'i18next';
import ru from './locales/ru.js';
import webpackConfig from '../webpack.config.js';

import ormconfig from '../ormconfig.js';
import addRoutes from './routes/index.js';
import getHelpers from './helpers/index.js';
import User from './entity/User.js';
import Guest from './entity/Guest.js';
// import auth from './plugins/auth';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const setUpViews = (app) => {
  const { devServer } = webpackConfig;
  const devHost = `http://${devServer.host}:${devServer.port}`;
  const domain = isDevelopment ? devHost : '';
  const helpers = getHelpers(app);
  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    defaultContext: {
      ...helpers,
      assetPath: (filename) => `${domain}/assets/${filename}`,
    },
    templates: path.join(__dirname, '..', 'server', 'views'),
  });

  app.decorateReply('render', function render(viewPath, locals) {
    this.view(viewPath, { ...locals, reply: this });
  });
};

const setUpStaticAssets = (app) => {
  const pathPublic = isDevelopment
    ? path.join(__dirname, '..', 'dist', 'public')
    : path.join(__dirname, '..', 'public');
  app.register(fastifyStatic, {
    root: pathPublic,
    prefix: '/assets/',
  });
};

const setupLocalization = () => {
  i18next
    .init({
      lng: 'ru',
      fallbackLng: 'en',
      debug: isDevelopment,
      resources: {
        ru,
      },
    });
};

const addHooks = (app) => {
  app.decorateRequest('currentUser', null);
  app.decorateRequest('signedIn', false);

  app.addHook('preHandler', async (req) => {
    const userId = req.session.get('userId');
    if (userId) {
      req.currentUser = await User.find(userId);
      req.signedIn = true;
    } else {
      req.currentUser = new Guest();
    }
  });
};

const registerPlugins = (app) => {
  app.register(fastifyErrorPage);
  app.register(fastifyReverseRoutes);
  app.register(fastifyFormbody);
  // app.register(fastifyCookie);
  app.register(fastifySecureSession, {
    // cookieName: 'sessionAuth',
    secret: 'a secret with minimum length of 32 characters',
    cookie: {
      path: '/',
    },
    // cookie: { secure: false },
    // expires: 7 * 24 * 60 * 60,
  });
  app.register(fastifyFlash);
  // app.register(auth);
  app.register(fastifyMethodOverride);
  app.register(fastifyTypeORM, ormconfig)
    .after((err) => {
      if (err) throw err;
    });
};

export default () => {
  const app = fastify({
    logger: {
      prettyPrint: isDevelopment,
      timestamp: !isDevelopment,
      base: null,
    },
  });

  registerPlugins(app);

  setupLocalization();
  setUpViews(app);
  setUpStaticAssets(app);
  addRoutes(app);
  addHooks(app);

  return app;
};
