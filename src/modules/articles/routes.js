import { Router } from 'express';
import * as ArticleController from './controller';

const routes = new Router();

routes.get('/articles', ArticleController.getAllPublicArticles);
routes.get('/users/:userId/articles/:collectionName', ArticleController.getMyArticlesByCollectionName);
routes.post('/users/:userId/articles/:articleId/new/collectionname', ArticleController.addCollectionNameToArticle);
routes.post('/users/:userId/articles/:articleId/remove/collectionname', ArticleController.removeCollectionNameFromArticle);

export default routes;
