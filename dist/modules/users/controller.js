'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMyCollections = exports.getMyArticles = exports.addArticle = exports.loginWithAuth0 = undefined;

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _createToken = require('./utils/createToken');

var _facebookAuth = require('./utils/facebookAuth');

var _googleAuth = require('./utils/googleAuth');

var _fetchURLMetadata = require('../../utils/fetchURLMetadata');

var _fetchURLMetadata2 = _interopRequireDefault(_fetchURLMetadata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Logs/authenticates an user with auth0 using either google or facebook
 * @param {Object} req
 * @param {Object} res
 */
const loginWithAuth0 = exports.loginWithAuth0 = async (req, res) => {
  const { provider, token } = req.body;
  let userInfo;

  try {
    if (provider === 'google') {
      userInfo = await (0, _googleAuth.googleAuth)(token);
    } else {
      userInfo = await (0, _facebookAuth.facebookAuth)(token);
    }

    const user = await _model2.default.findOrCreate(userInfo);

    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar
      },
      token: `JWT ${(0, _createToken.createToken)(user)}`
    });
  } catch (error) {
    return res.status(400).json({ error: true, errorMessage: error.message });
  }
};
// utils
const addArticle = exports.addArticle = async (req, res) => {
  let { articleUrl, isPublic, collectionNames } = req.body;
  const { userId } = req.params;
  // converting string to boolean if typeof is string
  isPublic = typeof isPublic === 'string' ? isPublic === 'true' : isPublic;

  (0, _fetchURLMetadata2.default)(articleUrl, res, async ({ title, description, imageURL }) => {
    if (!userId) {
      return res.status(400).json({ error: true, message: `A user Id must be defined.` });
    }

    if (!title) {
      return res.status(400).json({ error: true, message: `A title couldn't be found for your article.` });
    }

    if (!articleUrl) {
      return res.status(400).json({ error: true, message: `A valid article URL is required to perform this action.` });
    }

    if (typeof isPublic !== 'boolean') {
      return res.status(400).json({ error: true, message: `It wasn't specified if this article should be private or public.` });
    }

    try {
      collectionNames = collectionNames.filter(collectionName => collectionName.toLowerCase() !== 'none');
      const args = { title, description, imageURL, articleUrl, isPublic, collectionNames };
      const { article, duplicate } = await _model2.default.addArticle(userId, args);
      if (duplicate) return res.status(400).json({ error: true, message: 'You previously added this article to your list.' });

      return res.status(201).json({ error: false, article });
    } catch (error) {
      console.log(error);
      if (error.errmsg && error.errmsg.includes('duplicate key error')) {
        return res.status(error.status || 400).json({ error: true, message: 'You previously added this article to your list.' });
      } else {
        return res.status(error.status || 400).json({ error: true, message: 'Error adding new article.' });
      }
    }
  });
};

const getMyArticles = exports.getMyArticles = async (req, res) => {
  const { userId } = req.params;
  const articles = await _model2.default.getMyArticles(userId);

  if (!articles) {
    return res.status(400).json({ error: true, message: `Something went wrong retrieving your articles list` });
  } else {
    return res.status(201).json({ error: false, sucess: true, articles });
  }
};

const getMyCollections = exports.getMyCollections = async (req, res) => {
  const { userId } = req.params;
  const collections = await _model2.default.getMyCollections(userId);

  if (!collections) {
    return res.status(400).json({ error: true, message: `Something went wrong retrieving collections list ` });
  } else {
    return res.status(201).json({ error: false, sucess: true, collections });
  }
};