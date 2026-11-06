export default defineEventHandler((event) => {
  setResponseHeader(event, 'Cache-Control', 'no-store');

  return {
    status: 'live',
    requestId: event.context.requestId ?? null,
  };
});
