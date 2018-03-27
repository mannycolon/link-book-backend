import mongoose, { Schema } from 'mongoose';

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  articleUrl: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  isRead: {
    type: Boolean,
  },
  isPublic: {
    type: Boolean,
    required: true,
  },
  collectionNames: [{
    type: String
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

export default mongoose.model('Article', ArticleSchema);
