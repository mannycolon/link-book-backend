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
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article',
      }
    ],
  },
  { timestamp: true }
);

UserSchema.statics.addArticle = async function (id, args) {
  const Article = mongoose.model('Article');
  // we add the user id to the article element
  // Finally this is the article of the user
  const article = await new Article({ ...args, user: id });
  // searching for duplicate entries
  let found = await Article.find({ articleUrl: article.articleUrl, user: id });

  if(found.length === 0) {
    // We found the user with the id provided in the url
    // And we push the article id in the users element
    await this.findByIdAndUpdate(id, { $addToSet: { articles: article._id } });

    return {
      article: await article.save(),
      duplicate: false,
    };
  } else {
    return {
      duplicate: true,
    }
  }
};

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

UserSchema.statics.getMyArticles = async function(userId) {
  try {
    const Article = mongoose.model('Article');
    const articles = await Article.find({ user: userId });

    return articles;
  } catch (error) {
    return error;
  }
}

export default mongoose.model('User', UserSchema);
