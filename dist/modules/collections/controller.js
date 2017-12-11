'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addArticleToCollection = exports.removeArticleFromCollection = exports.deleteCollection = undefined;

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

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
      return res.status(201).json({ error: false, sucess: true, message: `Collection name ${collectionName} was successfully deleted.` });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: true, message: 'Failed to delete your article collection name.' });
  }
};

const removeArticleFromCollection = exports.removeArticleFromCollection = async (req, res) => {
  try {
    const { collectionName, articleId } = req.body;
    const { userId } = req.params;

    if (!collectionName) {
      return res.status(401).json({ error: true, message: `You must add the collectionName you want to remove the article from.` });
    } else if (!userId) {
      return res.status(401).json({ error: true, message: `Missing user Id param. Please provide userId` });
    } else if (!articleId) {
      return res.status(401).json({ error: true, message: `Please provide the articleId that you want to remove from the articles collection.` });
    }

    const foundCollection = await _model2.default.find({ userId, name: collectionName, articles: articleId });

    if (foundCollection.length === 0) {
      return res.status(401).json({ error: true, message: `Your article couldn't be removed from ${collectionName} collection name because it could'nt be found.` });
    } else {
      await _model2.default.update({ userId, name: collectionName }, { $pull: { articles: articleId } });
      return res.status(201).json({ error: false, sucess: true, message: `Your article was successfully removed from ${collectionName} collection name.` });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: true, message: `Failed to remove your article from ${collectionName} collection name.` });
  }
};

const addArticleToCollection = exports.addArticleToCollection = async (req, res) => {
  try {
    const { collectionName, articleId } = req.body;
    const { userId } = req.params;

    if (!collectionName) {
      return res.status(401).json({ error: true, message: `You must add the collectionName you want to add to the ${collectionName} collection.` });
    } else if (!userId) {
      return res.status(401).json({ error: true, message: `Missing user Id param. Please provide userId` });
    } else if (!articleId) {
      return res.status(401).json({ error: true, message: `Please provide the articleId that you want to add to the articles collection.` });
    }

    const foundCollection = await _model2.default.find({ userId, name: collectionName, articles: articleId });

    if (foundCollection.length === 0) {
      await _model2.default.update({ name: collectionName, userId }, { $addToSet: { articles: articleId } });
      return res.status(201).json({ error: false, sucess: true, message: `Your article was successfully added to ${collectionName} collection name.` });
    } else {
      return res.status(401).json({ error: true, message: `Your article couldn't be added to ${collectionName} collection name because it was previously added.` });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: true, message: `Failed to add your article to ${collectionName} collection name.` });
  }
};