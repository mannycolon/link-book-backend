'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controller = require('./controller');

var UserController = _interopRequireWildcard(_controller);

var _requireJwtAuth = require('../../utils/requireJwtAuth');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.post('/users/auth0', UserController.loginWithAuth0);
routes.delete('/users/:userId/delete', UserController.deleteAccount);
routes.post('/users/:userId/articles/new', _requireJwtAuth.requireJwtAuth, UserController.addArticle);
routes.get('/users/:userId/articles', _requireJwtAuth.requireJwtAuth, UserController.getMyArticles);
routes.get('/users/:userId/collections', _requireJwtAuth.requireJwtAuth, UserController.getMyCollections);

exports.default = routes;