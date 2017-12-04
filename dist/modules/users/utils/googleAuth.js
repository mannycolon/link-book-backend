'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googleAuth = googleAuth;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _getUserInfo = require('./getUserInfo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function googleAuth(token) {
  try {
    const { data } = await _axios2.default.get(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`);
    return (0, _getUserInfo.getUserInfo)(data, 'google');
  } catch (error) {
    return error;
  }
}