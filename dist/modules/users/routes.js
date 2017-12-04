'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controller = require('./controller');

var UserController = _interopRequireWildcard(_controller);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.post('/users/auth0', UserController.loginWithAuth0);
routes.post('/users/:userId/articles/new', UserController.addArticle);
routes.get('/users/:userId/articles', UserController.getMyArticles);
routes.get('/users/:userId/collections', UserController.getMyCollections);

exports.default = routes;