'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCollectionNameText = exports.updateArticleCollectionNames = exports.deleteCollection = undefined;

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _model3 = require('../users/model');

var _model4 = _interopRequireDefault(_model3);

var _model5 = require('../articles/model');

var _model6 = _interopRequireDefault(_model5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteCollection = exports.deleteCollection = async (req, res) => {
  try {
    const { collectionName } = req.body;
    const { userId } = req.params;
    const foundCollection = await _model2.default.find({ userId, name: collectionName });

    if (!collectionName) {
      return res.status(401).json({ error: true, message: `You must add the collectionName you want to delete.` });
    } else if (!userId) {
      return res.status(401).json({ error: true, message: `Missing user Id param. Please provide userId` });
    } else if (foundCollection.length === 0) {
      return res.status(401).json({ error: true, message: `Failed to delete the collection name (${collectionName}) because it could'nt be found.` });
    } else {
      await _model2.default.find({ userId, name: collectionName }).remove().exec();
      await _model2.default.removeCollectionNameFromAllArticles(collectionName, userId);
      return res.status(201).json({ error: false, sucess: true, message: `Collection name ${collectionName} was successfully deleted.` });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: true, message: 'Failed to delete your article collection name.' });
  }
};

const updateArticleCollectionNames = exports.updateArticleCollectionNames = async (req, res) => {
  try {
    const { articleId, collectionNames } = req.body;
    const { userId } = req.params;

    if (!Array.isArray(collectionNames)) {
      return res.status(401).json({ error: true, message: `The value collectionNames must be an array of strings.` });
    } else if (!collectionNames) {
      return res.status(401).json({ error: true, message: `You must specify at least one collection name.` });
    } else if (collectionNames.includes('none')) {
      return res.status(401).json({ error: true, message: `None is not a valid collection name.` });
    } else if (!userId) {
      return res.status(401).json({ error: true, message: `Missing user Id param. Please provide userId` });
    } else if (!articleId) {
      return res.status(401).json({ error: true, message: `Please provide the articleId that you want to add to the articles collection.` });
    }

    collectionNames.forEach(async collectionName => {
      try {
        await _model2.default.update({ userId, articles: articleId }, { $pull: { articles: articleId } }, { multi: true });
        await _model4.default.findOrCreateCollection(collectionName, userId, articleId);
      } catch (error) {
        return res.status(401).json({ error: true, message: `Failed to add your article to the specified collection/s.` });
      }
    });

    await _model2.default.updateArticleCollectionNames(collectionNames, articleId);

    return res.status(201).json({ error: false, sucess: true, message: `Your article's collection was successfully updated.` });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: true, message: `Failed to add your article to the specified collection/s.` });
  }
};

const updateCollectionNameText = exports.updateCollectionNameText = async (req, res) => {
  try {
    const { oldCollectionName, newCollectionName } = req.body;
    const { userId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: true, message: 'userId must be specified' });
    } else if (!oldCollectionName && typeof oldCollectionName === 'string') {
      return res.status(401).json({ error: true, message: 'oldCollectionName must be specified and it must be a string variable type.' });
    } else if (!newCollectionName && typeof newCollectionName === 'string') {
      return res.status(401).json({ error: true, message: 'newCollectionName must be specified and it must be a string variable type.' });
    }

    await _model2.default.update({ userId, name: oldCollectionName }, { $set: { name: newCollectionName } });
    await _model6.default.update({ userId, collectionNames: oldCollectionName }, { $addToSet: { collectionNames: newCollectionName } }, { multi: true });
    await _model2.default.removeCollectionNameFromAllArticles(oldCollectionName, userId);

    return res.status(201).json({ error: false, sucess: true, message: `Your collection name's was succesfully updated.` });
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Something when wrong while updating the name of your collection.', error });
  }
};