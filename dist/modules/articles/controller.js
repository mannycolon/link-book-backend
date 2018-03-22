'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteArticle = exports.changeArticlesPrivacy = exports.getPublicArticles = undefined;

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getPublicArticles = exports.getPublicArticles = async (req, res) => {
  const { userId } = req.params;
  try {
    let articles = await _model2.default.find({ isPublic: true, userId: { $ne: userId } });

    articles = articles.sort((a, b) => {
      // sort by creation timestamp
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return res.status(201).json({ error: false, sucess: true, articles });
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Error retrieving all articles' });
  }
};

const changeArticlesPrivacy = exports.changeArticlesPrivacy = async (req, res) => {
  try {
    const { userId } = req.params;
    const { articleId, isPublic } = req.body;

    if (!userId) {
      return res.status(401).json({ error: true, message: 'userId must be specified' });
    } else if (!articleId) {
      return res.status(401).json({ error: true, message: 'articleId must be specified' });
    } else if (!articleId) {
      return res.status(401).json({ error: true, message: 'articleId must be specified' });
    }

    await _model2.default.update({ userId, _id: articleId }, { $set: { isPublic } });

    return res.status(201).json({ error: false, sucess: true, message: `Your article's privacy setting was succesfully updated.` });
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Something went wrong while changing your articles privacy setting.' });
  }
};

const deleteArticle = exports.deleteArticle = async (req, res) => {
  try {
    const { userId, articleId } = req.params;
    const Collection = _mongoose2.default.model('Collection');

    await _model2.default.remove({ _id: articleId });
    await Collection.update({ userId }, { $pull: { articles: articleId } });

    return res.status(201).json({ error: false, sucess: true, message: `Your article was succesfully deleted.` });
  } catch (errorType) {
    console.error(errorType);
    return res.status(401).json({ error: true, message: 'Something went wrong while deleting your article.', errorType });
  }
};