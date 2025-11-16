import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';

const JWT_SECRET =
  process.env.JWT_TOKEN || 'token-secret-key-to-be-changed-in-prod';

const JWT_EXPIRES_IN = '5d';

export const jwttoken = {
  sign: payload => {
    try {
    } catch (error) {
      logger.error('Failed to authenticate', error);
      throw new Error('Failed to authenticate token');
    }
  },
  verify: token => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      logger.error('Failed to authenticate token', e);
      throw new Error('Failed to authenticate token');
    }
  },
};
