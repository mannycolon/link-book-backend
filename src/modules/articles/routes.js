import { Router } from 'express';
import * as ArticleController from './controller';

const routes = new Router();

routes.get('/articles/:userId', ArticleController.getPublicArticles);

export default routes;
