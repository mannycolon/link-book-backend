import mongoose, { Schema } from 'mongoose';

const CollectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
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

