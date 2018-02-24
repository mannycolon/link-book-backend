'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controller = require('./controller');

var collectionController = _interopRequireWildcard(_controller);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.post('/collections/:userId/delete', collectionController.deleteCollection);
routes.post('/collections/:userId/update', collectionController.updateArticleCollectionNames);
routes.post('/collections/:userId/update/name', collectionController.updateCollectionNameText);
routes.post('/collections/:userId/update/add', collectionController.addArticlesToCollection);
routes.post('/collections/:userId/update/remove', collectionController.removeArticlesFromCollection);

exports.default = routes;