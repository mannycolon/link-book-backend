import { Router } from 'express';
import * as UserController from './controller';

const routes = new Router();

routes.post('/users/auth0', UserController.loginWithAuth0);
routes.post('/users/:userId/articles/new', UserController.addArticle);
routes.get('/users/:userId/articles', UserController.getMyArticles);

export default routes;
