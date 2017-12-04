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

export default mongoose.model('Collection', CollectionSchema);
