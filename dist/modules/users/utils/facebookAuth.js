'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.facebookAuth = facebookAuth;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _getUserInfo = require('./getUserInfo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function facebookAuth(token) {
  try {
    const { data } = await _axios2.default.get(`https://graph.facebook.com/me?fields=email,name,picture&access_token=${token}`);
    return (0, _getUserInfo.getUserInfo)(data, 'facebook');
  } catch (error) {
    return error;
  }
}