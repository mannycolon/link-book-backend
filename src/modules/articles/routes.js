import { Router } from 'express';
import * as ArticleController from './controller';

const routes = new Router();

routes.get('/articles/:userId', ArticleController.getPublicArticles);
routes.post('/articles/:userId/update/privacy', ArticleController.changeArticlesPrivacy);
routes.delete('/articles/:userId/delete', ArticleController.deleteArticle);

export default routes;
