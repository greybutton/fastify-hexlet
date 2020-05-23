const dev = {
  name: 'default',
  type: 'sqlite',
  database: `${__dirname}/database.sqlite`,
  synchronize: false,
  logger: 'debug',
  logging: true,
  entities: [
    `${__dirname}/server/entity/**/*.js`,
  ],
  migrations: [
    'dist/server/migration/*.js',
  ],
  subscribers: [
    'server/subscriber/*.js',
  ],
  cli: {
    entitiesDir: 'server/entity',
    migrationsDir: 'server/migration',
    subscribersDir: 'server/subscriber',
  },
};

const production = {
  name: 'production',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  logger: 'debug',
  logging: true,
  entities: [
    `${__dirname}/dist/server/entity/**/*.js`,
  ],
  migrations: [
    `${__dirname}/dist/server/migration/*.js`,
  ],
  subscribers: [
    `${__dirname}/dist/server/subscriber/*.js`,
  ],
};

const configs = {
  default: dev,
  test: dev,
  production,
};

const config = configs[process.env.NODE_ENV || 'default'];

module.exports = config;
