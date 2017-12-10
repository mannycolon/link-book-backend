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
  isPublic: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

export default mongoose.model('Article', ArticleSchema);
