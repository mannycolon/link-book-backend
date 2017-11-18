/* eslint-disable no-console */
import express from 'express';
import dbConfig from './config/db';
import middlewaresConfig from './config/middlewares';
import { LinkRoutes, UserRoutes } from './modules';

const app = express();

/**
 * Database
 */
dbConfig();
/**
 * Middlewares
 */
middlewaresConfig(app);

app.use('/api', [LinkRoutes, UserRoutes]);

const PORT = process.env.port || 3000;

app.listen(PORT, err => {
  if(err) {
    console.log(err)
  } else {
    console.log(`App listening at port:${PORT}`);
  }
});
