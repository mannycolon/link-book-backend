import { Router } from 'express';
import * as ArticleController from './controller';
import { requireJwtAuth } from '../../utils/requireJwtAuth';

const routes = new Router();

routes.get('/articles/:userId', ArticleController.getPublicArticles);
routes.post('/articles/:userId/update/privacy', requireJwtAuth, ArticleController.changeArticlesPrivacy);
routes.delete('/articles/:userId/:articleId/delete', requireJwtAuth, ArticleController.deleteArticle);
routes.post('/articles/:userId/update/read', requireJwtAuth, ArticleController.updateArticleReadSetting);

export default routes;
