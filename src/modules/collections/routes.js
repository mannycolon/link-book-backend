import { Router } from 'express';
import * as collectionController from './controller';

const routes = new Router();

routes.post('/collections/:userId/delete', collectionController.deleteCollection);
routes.post('/collections/:userId/update', collectionController.updateArticleCollectionNames);
routes.post('/collections/:userId/update/name', collectionController.updateCollectionNameText);
routes.post('/collections/update/add/:userId', collectionController.addArticlesToCollection);
routes.post('/collections/update/remove/:userId', collectionController.removeArticlesFromCollection);

export default routes;
