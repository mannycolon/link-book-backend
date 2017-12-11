/* eslint-disable no-console */
import express from 'express';
import dbConfig from './config/db';
import middlewaresConfig from './config/middlewares';
import { ArticleRoutes, UserRoutes, CollectionRoutes } from './modules';

const app = express();

/**
 * Database
 */
dbConfig();
/**
 * Middlewares
 */
middlewaresConfig(app);

app.use('/api', [ArticleRoutes, UserRoutes, CollectionRoutes]);
app.get('/favicon.ico', function(req, res) {
  res.status(204);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if(err) {
    console.log(err)
  } else {
    console.log(`App listening at port:${PORT}`);
  }
});
