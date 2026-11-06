// @ts-check

const DEFAULT_TIMEOUT_MS = 2500;

/**
 * Check the configured Supabase REST API without returning dependency details.
 * @param {{ url?: string, anonKey?: string, fetchImpl?: typeof fetch, timeoutMs?: number }} options
 * @returns {Promise<{ ok: true } | { ok: false, code: 'SUPABASE_CONFIG_MISSING' | 'SUPABASE_CONFIG_INVALID' | 'SUPABASE_TIMEOUT' | 'SUPABASE_UNAVAILABLE' }>}
 */
export async function checkSupabaseReadiness({
  url,
  anonKey,
  fetchImpl = globalThis.fetch,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}) {
  if (!url || !anonKey) return { ok: false, code: 'SUPABASE_CONFIG_MISSING' };

  let endpoint;
  try {
    endpoint = new URL('/auth/v1/health', url);
    if (!['http:', 'https:'].includes(endpoint.protocol)) {
      return { ok: false, code: 'SUPABASE_CONFIG_INVALID' };
    }
  } catch {
    return { ok: false, code: 'SUPABASE_CONFIG_INVALID' };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  timeout.unref?.();

  try {
    const response = await fetchImpl(endpoint, {
      method: 'GET',
      headers: {
        apikey: anonKey,
      },
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!response.ok) return { ok: false, code: 'SUPABASE_UNAVAILABLE' };

    try {
      await response.body?.cancel();
    } catch {
      // The readiness result depends on the HTTP status, not the schema body.
    }

    return { ok: true };
  } catch {
    return controller.signal.aborted
      ? { ok: false, code: 'SUPABASE_TIMEOUT' }
      : { ok: false, code: 'SUPABASE_UNAVAILABLE' };
  } finally {
    clearTimeout(timeout);
  }
}
