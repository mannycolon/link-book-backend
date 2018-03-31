import passport from 'passport';
import { Strategy as JWTStragety, ExtractJwt } from 'passport-jwt';

import user from '../model';
import config from '../../../config/config';

/**
 * JWT STRAGETY
 */

 const jwtOpts = {
  // Tell passport to take the jwt token from the authorization headers
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: config.JWT_SECRET,
};

const jwtStragety = new JWTStragety(jwtOpts, async (payload, done) => {
  try {
    const user = await user.findById(payload.id);
    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    return done(err, false);
  }
});

passport.use(jwtStragety);
