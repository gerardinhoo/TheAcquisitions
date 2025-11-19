import aj from '#config/arcjet.js';
import logger from '#config/logger.js';
import { slidingWindow } from '@arcjet/node';

const securityMiddleware = async (req, res, next) => {
  try {
    const role = req.user?.role || 'guest';

    // In non-production environments, if we don't have an IP, skip Arcjet to avoid noisy errors
    if (process.env.NODE_ENV !== 'production' && !req.ip) {
      logger.warn(
        'Skipping Arcjet protection because req.ip is missing (non-production).',
        {
          env: process.env.NODE_ENV,
        }
      );
      return next();
    }

    let limit;
    let message;

    switch (role) {
      case 'admin':
        limit = 20;
        message = 'Admin request excedeed (20 per minute). Slow Down.';
        break;
      case 'user':
        limit = 10;
        message = 'User request excedeed (10 per minute). Slow Down.';
        break;
      case 'guest':
        limit = 5;
        message = 'User request excedeed (5 per minute). Slow Down.';
        break;
      default:
        message = 'User request exceeded. Slow down.';
        break;
    }

    const client = aj.withRule(
      slidingWindow({
        mode: 'LIVE',
        interval: '1m',
        max: limit,
        name: `${role}-rate-limit`,
      })
    );

    const decision = await client.protect(req);

    if (decision.isDenied() && decision.reason.isBot()) {
      logger.warn('Bot request blocked', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
      });

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Automated requests are not allowed',
      });
    }

    if (decision.isDenied() && decision.reason.isShield()) {
      logger.warn('Shield Blocked request', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
        method: req.method,
      });

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Request blocked by security policy',
      });
    }

    if (decision.isDenied() && decision.reason.isRateLimit()) {
      logger.warn('Rate Limit excedeed', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
      });

      return res
        .status(403)
        .json({ error: 'Forbidden', message: 'Too many requests' });
    }

    if (decision.isDenied() && decision.reason.isRateLimit()) {
      logger.warn('Rate limit exceeded', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
        role,
      });

      return res.status(429).json({
        error: 'Too Many Requests',
        message,
      });
    }

    next();
  } catch (error) {
    console.error('Arcjet middleware error', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong with the security middleware',
    });
  }
};

export default securityMiddleware;
