import { randomUUID } from 'node:crypto';

export default defineEventHandler((event) => {
  if (!event.path?.startsWith('/api/')) return;

  const requestId = randomUUID();
  const startedAt = process.hrtime.bigint();
  event.context.requestId = requestId;
  event.node.res.setHeader('X-Request-Id', requestId);

  event.node.res.once('finish', () => {
    const statusCode = event.node.res.statusCode;
    const record = {
      timestamp: new Date().toISOString(),
      severity: statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info',
      event: 'api_request',
      request_id: requestId,
      route_group: event.path.startsWith('/api/health/') ? '/api/health/*' : '/api/*',
      method: event.method,
      status_code: statusCode,
      duration_ms: Number(process.hrtime.bigint() - startedAt) / 1_000_000,
    };

    const logger = statusCode >= 500 ? console.error : statusCode >= 400 ? console.warn : console.info;
    logger(JSON.stringify(record));
  });
});
