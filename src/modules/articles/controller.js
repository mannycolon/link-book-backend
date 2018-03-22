import Article from './model';

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
    // TODO: implement article deletion
    console.log(userId, articleId)
    await Article.deleteOne( { _id: ObjectId(articleId) } );

    return res.status(201).json({ error: false, sucess: true, message: `Your article was succesfully deleted.`});
  } catch (errorType) {
    console.error(errorType)
    return res.status(401).json({ error: true, message: 'Something went wrong while deleting your article.', errorType });
  }
}
