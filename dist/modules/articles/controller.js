'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPublicArticles = undefined;

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getPublicArticles = exports.getPublicArticles = async (req, res) => {
  const { userId } = req.params;
  try {
    let articles = await _model2.default.find({ isPublic: true, userId: { $ne: userId } });

    articles = articles.sort((a, b) => {
      // sort by creation timestamp
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return res.status(201).json({ articles });
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Error retrieving all articles' });
  }
};