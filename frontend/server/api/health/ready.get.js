import { checkSupabaseReadiness } from '../../utils/supabase-readiness.js';

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'no-store');

  const result = await checkSupabaseReadiness({
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
  });

  if (!result.ok) {
    setResponseStatus(event, 503);
    return {
      status: 'not_ready',
      code: result.code,
      requestId: event.context.requestId ?? null,
    };
  }

  return {
    status: 'ready',
    dependencies: { supabase: 'ok' },
    requestId: event.context.requestId ?? null,
  };
});
