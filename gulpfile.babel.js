import gulp from 'gulp';
import repl from 'repl';
import { createConnection } from 'typeorm';
import entities from './server/entity/index.js';
import getApp from './server/index.js';
import ormconfig from './ormconfig.js';

gulp.task('console', async () => {
  await createConnection(ormconfig);

  const replServer = repl.start({
    prompt: 'Application console > ',
  });

  Object.keys(entities).forEach((key) => {
    replServer.context[key] = entities[key];
  });
});

gulp.task('server', (cb) => {
  getApp().listen(process.env.PORT || 4000, cb);
});
