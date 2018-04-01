import { Router } from 'express';
import * as collectionController from './controller';
import { requireJwtAuth } from '../../utils/requireJwtAuth';

const routes = new Router();

routes.post('/collections/:userId/delete', requireJwtAuth, collectionController.deleteCollection);
routes.post('/collections/:userId/update', requireJwtAuth, collectionController.updateArticleCollectionNames);
routes.post('/collections/:userId/update/name', requireJwtAuth, collectionController.updateCollectionNameText);
routes.post('/collections/:userId/update/add', requireJwtAuth, collectionController.addArticlesToCollection);
routes.post('/collections/:userId/update/remove', requireJwtAuth, collectionController.removeArticlesFromCollection);

export default routes;
