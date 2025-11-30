import {
  httpRequestCounter,
  httpRequestDuration,
} from '#config/metrics/metrics.js';

export function metricsMiddleware(req, res, next) {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const diffNs = Number(end - start);
    const durationSeconds = diffNs / 1e9;

    const route = req.route?.path || req.path || 'unknown';

    const labels = {
      method: req.method,
      route,
      status: res.statusCode,
    };

    httpRequestCounter.inc(labels);
    httpRequestDuration.observe(labels, durationSeconds);
  });

  next();
}
