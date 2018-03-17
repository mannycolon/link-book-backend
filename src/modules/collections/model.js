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

CollectionSchema.statics.updateArticleCollectionNames = async function (collectionNames, articleId) {
  const Article = mongoose.model('Article');
  try {
    return await Article.findByIdAndUpdate(articleId, { $set: { collectionNames } });
  } catch (error) {
    return error;
  }
}

CollectionSchema.statics.removeCollectionNameFromAllArticles = async function (collectionName, userId) {
  const Article = mongoose.model('Article');
  try {
    return await Article.update({ userId, collectionNames: collectionName }, { $pull: { collectionNames: collectionName } }, { multi: true });
  } catch (error) {
    return error;
  }
}

export default mongoose.model('Collection', CollectionSchema);
