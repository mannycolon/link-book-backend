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

UserSchema.statics.findOrCreateCollection = async function (collectionNames, userId, articleId) {
  try {
    const Collection = mongoose.model('Collection');

    return collectionNames.forEach(async (collectionName) => {
      let foundCollection = await Collection.find({ name: collectionName, userId });
console.log(foundCollection)
      if (foundCollection.length === 0) {
        const collection = await new Collection({ name: collectionName, userId, articles: articleId });
        return await collection.save();
      } else {
        return await Collection.update({ name: collectionName, userId }, { $addToSet: { articles: articleId } });
      }
    });
  } catch (error) {
    console.error(error);
    return error;
  }
}

UserSchema.statics.addArticle = async function (userId, args) {
  const Article = mongoose.model('Article');
  // we add the user id to the article element
  // Finally this is the article of the user
  const article = await new Article({ ...args, userId });
  // searching for duplicate entries
  const found = await Article.find({ articleUrl: article.articleUrl, userId });
  // If collection name is defined for the article then find
  // collection schema and update it or create a new one.
  if (args.collectionNames && !args.collectionNames.includes('none')) {
    await this.findOrCreateCollection(args.collectionNames, userId, article._id);
  }

  if(found.length === 0) {
    // We found the user with the id provided in the url
    // And we push the article id in the users element
    await this.findByIdAndUpdate(userId, { $addToSet: { articles: article._id } });

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
    const articles = await Article.find({ userId });

    return articles.sort((a, b) => {
      // sort by creation timestamp
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } catch (error) {
    return error;
  }
}

UserSchema.statics.getMyCollections = async function(userId) {
  try {
    const Collection = mongoose.model('Collection');

    return Collection
      .find({ userId })
      .populate('articles') // only works if we pushed refs to person.eventsAttended
      .exec(function(err, collection) {
        if (err) return console.log(err);
        return collection;
      });
  } catch (error) {
    return error;
  }
}

export default mongoose.model('User', UserSchema);
