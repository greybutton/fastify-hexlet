export default {
  name: 'production',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logger: 'debug',
  logging: true,
  entities: [
    `${__dirname}/server/entity/**/*.js`,
  ],
  migrations: [
    'server/migration/*.js',
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
