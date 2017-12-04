'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInfo = getUserInfo;
function getUserInfo(data, provider) {
  let fullName;
  let avatar;

  if (provider === 'google') {
    fullName = `${data.given_name} ${data.family_name}`;
    avatar = data.picture;
  } else {
    // then provider === facebook
    fullName = data.name;
    avatar = data.picture.data.url;
  }

  return {
    fullName,
    avatar,
    email: data.email,
    providerData: {
      uid: data.id,
      provider
    }
  };
}