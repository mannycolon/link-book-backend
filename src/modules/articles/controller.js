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
