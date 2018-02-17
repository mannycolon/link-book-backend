import { Router } from 'express';
import * as collectionController from './controller';

const routes = new Router();

routes.post('/collections/:userId/delete', collectionController.deleteCollection);
routes.post('/collections/:userId/update', collectionController.updateArticleCollectionNames);
routes.post('/collections/:userId/update/name', collectionController.updateCollectionNameText);
routes.post('/collections/articles/:userId/add', collectionController.addArticlesToCollection);
routes.post('/collections/articles/:userId/remove', collectionController.removeArticlesFromCollection);

export default routes;
