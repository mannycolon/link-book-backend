'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controller = require('./controller');

var ArticleController = _interopRequireWildcard(_controller);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.get('/articles/:userId', ArticleController.getPublicArticles);
routes.post('/articles/:userId/update/privacy', ArticleController.changeArticlesPrivacy);
routes.delete('/articles/:userId/delete', ArticleController.deleteArticle);

exports.default = routes;