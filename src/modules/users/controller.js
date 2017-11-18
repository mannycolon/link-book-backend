import User from './model';
import { createToken } from './utils/createToken';
import { facebookAuth } from './utils/facebookAuth';
import { googleAuth } from './utils/googleAuth';

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
        id: user.__id,
      },
      token: `JWT ${createToken(user)}`,
    });
  } catch (error) {
    return res.status(401).json({ error: true, errorMessage: error.message });
  }
};
