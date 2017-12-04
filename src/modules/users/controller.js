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
    return res.status(401).json({ error: true, errorMessage: error.message });
  }
};

export const addArticle = async (req, res) => {
  const { articleUrl, isPublic, collectionName } = req.body;
  const { userId } = req.params;

  fetchURLMetadata(articleUrl, res, async ({ title, description, imageURL }) => {
    if(!userId) {
      return res.status(400).json({ error: true, message: `A user Id must be defined.` });
    }

    if(!title) {
      return res.status(400).json({ error: true, message: `A title couldn't be found for your article.` });
    }

    if(!description) {
      return res.status(400).json({ error: true, message: `A description couldn't be found for your article.` });
    }

    if(!imageURL) {
      return res.status(400).json({ error: true, message: `A valid image URL is required for your article.` });
    }

    if(!articleUrl) {
      return res.status(400).json({ error: true, message: `A valid article URL is required to perform this action.` });
    }

    if(!isPublic) {
      return res.status(400).json({ error: true, message: `It wasn't specified if this article should be private or public.` });
    }

    try {
      const { article, duplicate } = await User.addArticle(userId, { title, description, imageURL, articleUrl, isPublic, collectionName });
      if(duplicate) return res.status(400).json({ error: true, message: 'You previously added this article to your list.' });

      return res.status(201).json({ error: false, article });
    } catch(error) {
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
