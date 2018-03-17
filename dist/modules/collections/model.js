'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CollectionSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  articles: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }]
});

CollectionSchema.statics.updateArticleCollectionNames = async function (collectionNames, articleId) {
  const Article = _mongoose2.default.model('Article');
  try {
    return await Article.findByIdAndUpdate(articleId, { $set: { collectionNames } });
  } catch (error) {
    return error;
  }
};

CollectionSchema.statics.removeCollectionNameFromAllArticles = async function (collectionName, userId) {
  const Article = _mongoose2.default.model('Article');
  try {
    return await Article.update({ userId, collectionNames: collectionName }, { $pull: { collectionNames: collectionName } }, { multi: true });
  } catch (error) {
    return error;
  }
};

exports.default = _mongoose2.default.model('Collection', CollectionSchema);