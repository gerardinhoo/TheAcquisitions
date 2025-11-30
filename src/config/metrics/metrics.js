import client from 'prom-client';

const register = new client.Registry();

// Collect default Node.js metrics (CPU, memory, event loop, GC, etc.)
client.collectDefaultMetrics({
  register,
  prefix: 'theacquisitions_',
});

// Custom counter: HTTP requests by method / route / status
export const httpRequestCounter = new client.Counter({
  name: 'theacquisitions_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

// Custom histogram: request duration
export const httpRequestDuration = new client.Histogram({
  name: 'theacquisitions_http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});

export { register };
