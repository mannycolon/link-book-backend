import mongoose, { Schema } from 'mongoose';

const CollectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Article'
    }
  ],
});

CollectionSchema.statics.addCollectionNameToArticle = async function (collectionName, articleId) {
  const Article = mongoose.model('Article');
  try {
    return await Article.findByIdAndUpdate(articleId, { $addToSet: { collectionNames: collectionName } });
  } catch (error) {
    return error;
  }
}

CollectionSchema.statics.removeCollectionNameFromArticle = async function (collectionName, articleId) {
  const Article = mongoose.model('Article');
  try {
    return await Article.findByIdAndUpdate(articleId, { $pull: { collectionNames: collectionName } });
  } catch (error) {
    return error;
  }
}

CollectionSchema.statics.removeCollectionNameFromAllArticles = async function (collectionName, userId) {
  const Article = mongoose.model('Article');
  try {
    return await Article.update({ userId }, { $pull: { collectionNames: collectionName } }, { multi: true });
  } catch (error) {
    return error;
  }
}

export default mongoose.model('Collection', CollectionSchema);
