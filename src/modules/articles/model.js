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
  collectionNames: [{
    type: String
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

ArticleSchema.pre('remove', function(next) {
  // Remove all the assignment docs that reference the removed person.
  this.model('Collections').remove({ Article: this._id }, next);
});

export default mongoose.model('Article', ArticleSchema);
