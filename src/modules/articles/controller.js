import Article from './model';
import mongoose from 'mongoose';

export const getPublicArticles = async (req, res) => {
  const { userId } = req.params;
  try {
    let articles = await Article.find({ isPublic: true, userId: { $ne: userId } });

    articles = articles.sort((a, b) => {
      // sort by creation timestamp
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return res.status(201).json({ error: false, sucess: true, articles });
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Error retrieving all articles' });
  }
}

export const changeArticlesPrivacy = async (req, res) => {
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

    await Article.update({ userId, _id: articleId }, { $set: { isPublic } });

    return res.status(201).json({ error: false, sucess: true, message: `Your article's privacy setting was succesfully updated.`});
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Something went wrong while changing your articles privacy setting.' });
  }
}

export const deleteArticle = async (req, res) => {
  try {
    const { userId, articleId } = req.params;
    const Collection = mongoose.model('Collection');

    const foundArticle = await Article.findOne({ _id: articleId })
    // await Article.remove({ _id: articleId });
    console.log(foundArticle)
    // const articleCollectionNames = foundArticle.collectionNames;
    // articleCollectionNames.forEach(async(collectionName) => {
    //   try {
    //     await Collection.update(
    //       { name: collectionName, userId },
    //       { $pull: { articles: articleId } },
    //       { multi: true }
    //     );
    //   } catch (error) {
    //     console.error(error);
    //     return res.status(401).json({ error: true, message: `Failed to remove your article from the specified collection/s.` });
    //   }
    // });


    return res.status(201).json({ error: false, sucess: true, message: `Your article was succesfully deleted.`});
  } catch (errorType) {
    console.error(errorType)
    return res.status(401).json({ error: true, message: 'Something went wrong while deleting your article.', errorType });
  }
}
