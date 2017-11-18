import mongoose, { Schema } from 'mongoose';

const UserSchema = Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    fullName: String,
    avatar: String,
    providerData: {
      uid: String,
      provider: String,
    },
  },
  { timestamp: true }
);

UserSchema.statics.findOrCreate = async function (args) {
  try {
    const user = await this.findOne({
      email: args.email,
      fullName: args.fullName,
    });

    if(!user) {
      return await this.create(args);
    }

    return user;
  } catch (error) {
    return error;
  }
}

export default mongoose.model('User', UserSchema);
