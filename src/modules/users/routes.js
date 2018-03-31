import { Router } from 'express';
import * as UserController from './controller';
import { requireJwtAuth } from '../../utils/requireJwtAuth';

const routes = new Router();

routes.post('/users/auth0', UserController.loginWithAuth0);
routes.post('/users/:userId/articles/new', UserController.addArticle);
routes.get('/users/:userId/articles', requireJwtAuth, UserController.getMyArticles);
routes.get('/users/:userId/collections', UserController.getMyCollections);

export default routes;
