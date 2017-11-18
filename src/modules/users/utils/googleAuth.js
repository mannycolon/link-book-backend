import axios from 'axios';
import { getUserInfo } from './getUserInfo';

export async function googleAuth(token) {
  try {
    const { data } = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`);
    return getUserInfo(data, 'google');
  } catch (error) {
    return error;
  }
}
