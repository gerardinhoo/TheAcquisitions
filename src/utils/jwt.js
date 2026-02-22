import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';

const JWT_SECRET = process.env.JWT_TOKEN;

if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error(
    'FATAL: JWT_TOKEN environment variable is required in production'
  );
}

if (!JWT_SECRET) {
  logger.warn(
    'JWT_TOKEN not set — using insecure default. Do NOT use in production.'
  );
}

const FALLBACK_SECRET = 'dev-only-insecure-secret';
const JWT_EXPIRES_IN = '1d';

export const jwttoken = {
  sign: payload => {
    try {
      return jwt.sign(payload, JWT_SECRET || FALLBACK_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
    } catch (error) {
      logger.error('Failed to sign token', error);
      throw new Error('Failed to authenticate token');
    }
  },
  verify: token => {
    try {
      return jwt.verify(token, JWT_SECRET || FALLBACK_SECRET);
    } catch (error) {
      logger.error('Failed to authenticate token', error);
      throw new Error('Failed to authenticate token');
    }
  },
};
