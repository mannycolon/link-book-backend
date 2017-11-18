import mongoose, { Schema } from 'mongoose';

const LinkSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  imageURL: {
    type: String,
    required: true
  },
  link: {
    type: Schema.Types.ObjectId,
    ref: 'Link',
  }
}, { timestamps: true });

export default mongoose.model('Link', LinkSchema);
