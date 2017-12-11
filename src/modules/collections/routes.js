import { Router } from 'express';
import * as collectionController from './controller';

const routes = new Router();

routes.post('/collections/:userId/delete', collectionController.deleteCollection);
routes.post('/collections/:userId/update/remove', collectionController.removeArticleFromCollection);
routes.post('/collections/:userId/update/add', collectionController.addArticleToCollection);

export default routes;
