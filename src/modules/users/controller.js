import mongoose from 'mongoose';
import User from './model';
import { createToken } from './utils/createToken';
import { facebookAuth } from './utils/facebookAuth';
import { googleAuth } from './utils/googleAuth';
// utils
import fetchURLMetadata from '../../utils/fetchURLMetadata';

/**
 * Logs/authenticates an user with auth0 using either google or facebook
 * @param {Object} req
 * @param {Object} res
 */
export const loginWithAuth0 = async (req, res) => {
  const { provider, token } = req.body;
  let userInfo;

  try {
    if(provider === 'google') {
      userInfo = await googleAuth(token);
    } else {
      userInfo = await facebookAuth(token);
    }

    const user = await User.findOrCreate(userInfo);

    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
      },
      token: `JWT ${createToken(user)}`,
    });
  } catch (error) {
    return res.status(400).json({ error: true, errorMessage: error.message });
  }
};

export const addArticle = async (req, res) => {
  let { articleUrl, isPublic, collectionNames } = req.body;
  const { userId } = req.params;
  // converting string to boolean if typeof is string
  isPublic = typeof isPublic === 'string' ? (isPublic === 'true') : isPublic;

  fetchURLMetadata(articleUrl, res, async ({ title, description, imageURL }) => {
    if(!userId) {
      return res.status(400).json({ error: true, message: `A user Id must be defined.` });
    }

    if(!title) {
      return res.status(400).json({ error: true, message: `A title couldn't be found for your article.` });
    }

    if(!articleUrl) {
      return res.status(400).json({ error: true, message: `A valid article URL is required to perform this action.` });
    }

    if(typeof isPublic !== 'boolean') {
      return res.status(400).json({ error: true, message: `It wasn't specified if this article should be private or public.` });
    }

    try {
      collectionNames = collectionNames.filter((collectionName) => collectionName.toLowerCase() !== 'none');
      const isRead = false;
      const args = { title, description, imageURL, articleUrl, isPublic, collectionNames, isRead };
      const { article, duplicate } = await User.addArticle(userId, args);
      if (duplicate) return res.status(400).json({ error: true, message: 'You previously added this article to your list.' });

      return res.status(201).json({ error: false, article });
    } catch(error) {
      console.log(error);
      if(error.errmsg && error.errmsg.includes('duplicate key error')) {
        return res.status(error.status || 400).json({ error: true, message: 'You previously added this article to your list.' });
      } else {
        return res.status(error.status || 400).json({ error: true, message: 'Error adding new article.' });
      }
    }
  });
}

export const getMyArticles = async (req, res) => {
  const { userId } = req.params;
  const articles = await User.getMyArticles(userId);

  if(!articles) {
    return res.status(400).json({ error: true, message: `Something went wrong retrieving your articles list` });
  } else {
    return res.status(201).json({ error: false, sucess: true, articles });
  }
}

export const getMyCollections = async (req, res) => {
  const { userId } = req.params;
  const collections = await User.getMyCollections(userId);

  if(!collections) {
    return res.status(400).json({ error: true, message: `Something went wrong retrieving collections list ` });
  } else {
    return res.status(201).json({ error: false, sucess: true, collections });
  }
}

export const deleteAccount = async (req, res) => {
  try {
    const { userId } = req.body;
    const Article = mongoose.model('Article');
    const Collection = mongoose.model('Collection');

    console.log(userId)
    // Delete user from mongodb collection.
    await User.deleteOne({ _id: userId });

    // Delete articles for userId
    await Article.remove({ userId });

    // Delete collections for userId
    await Collection.remove({ userId });

    return res.status(201).json({ error: false, sucess: true, message: `You have successfully deleted your LinkBook account.`});
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: true, message: `Something went wrong deleting your LinkBook account.` });
  }
}
