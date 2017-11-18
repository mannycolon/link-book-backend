import { Router } from 'express';
import * as LinkController from './controller';

const routes = new Router();

routes.post('/links', LinkController.addLink);
routes.get('/links', LinkController.getAllLinks);

export default routes;
