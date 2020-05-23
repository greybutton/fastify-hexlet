export default {
  name: 'production',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logger: 'debug',
  logging: true,
  entities: [
    `${__dirname}/dist/server/entity/**/*.js`,
  ],
  migrations: [
    'dist/server/migration/*.js',
  ],
  subscribers: [
    'dist/server/subscriber/*.js',
  ],
};
