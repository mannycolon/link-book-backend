import collection from './model';
import User from '../users/model';

export const deleteCollection = async (req, res) => {
  try {
    const { collectionName } = req.body;
    const { userId } = req.params;
    const foundCollection = await collection.find({ userId, name: collectionName });

    if (!collectionName) {
      return res.status(401).json({ error: true, message: `You must add the collectionName you want to delete.` });
    } else if (!userId) {
      return res.status(401).json({ error: true, message: `Missing user Id param. Please provide userId` });
    } else if (foundCollection.length === 0) {
      return res.status(401).json({ error: true, message: `Failed to delete the collection name (${collectionName}) because it could'nt be found.` });
    } else {
      await collection.find({ userId, name: collectionName }).remove().exec();
      await collection.removeCollectionNameFromAllArticles(collectionName, userId);
      return res.status(201).json({ error: false, sucess: true, message: `Collection name ${collectionName} was successfully deleted.` });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: true, message: 'Failed to delete your article collection name.' });
  }
}

export const updateArticleCollectionNames = async (req, res) => {
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
        await collection.update(
          { userId, articles: articleId },
          { $pull: { articles: articleId } },
          { multi: true }
        );
        await User.findOrCreateCollection(collectionName, userId, articleId);
      } catch (error) {
        return res.status(401).json({ error: true, message: `Failed to add your article to the specified collection/s.` });
      }
    });

    await collection.updateArticleCollectionNames(collectionNames, articleId);

    return res.status(201).json({ error: false, sucess: true, message: `Your article's collection was successfully updated.` });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: true, message: `Failed to add your article to the specified collection/s.` });
  }
}
