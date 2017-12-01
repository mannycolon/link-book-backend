import Article from './model';

export const getAllPublicArticles = async (req, res) => {
  try {
    return res.status(201).json({ articles: await Article.find({ isPublic: true }) });
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Error retrieving all articles' });
  }
}

export const getMyArticlesByCollectionName = async (req, res) => {
  const { userId, collectionName } = req.params;
  try {
    return res.status(201).json({ articles: await Article.find({ user: userId, collectionName }) });
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: true, message: 'Error retrieving your articles by collection name.' });
  }
}

export const addCollectionNameToArticle = async (req, res) => {
  const { collectionName } = req.body;
  const { userId, articleId } = req.params;

  try {
    const articles = await Article.findByIdAndUpdate({ user: userId, _id: articleId }, { $addToSet: { collectionName: collectionName } });
    return res.status(201).json({ articles });
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: true, message: `Error adding ${collectionName} as a collection name for your article.` });
  }
}

export const removeCollectionNameFromArticle = async (req, res) => {
  const { collectionName } = req.body;
  const { userId, articleId } = req.params;

  try {
    const articles = await Article.findByIdAndUpdate({ user: userId, _id: articleId }, { $pull: { collectionName: collectionName } });
    return res.status(201).json({ articles });
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: true, message: `Error adding ${collectionName} as a collection name for your article.` });
  }
}
