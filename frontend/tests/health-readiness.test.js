import test from 'node:test';
import assert from 'node:assert/strict';
import { checkSupabaseReadiness } from '../server/utils/supabase-readiness.js';

const baseOptions = {
  url: 'https://example.supabase.co',
  anonKey: 'test-anon-key',
};

test('readiness reports missing configuration without making a request', async () => {
  let calls = 0;
  const result = await checkSupabaseReadiness({
    ...baseOptions,
    anonKey: '',
    fetchImpl: async () => { calls += 1; return { ok: true }; },
  });

  assert.deepEqual(result, { ok: false, code: 'SUPABASE_CONFIG_MISSING' });
  assert.equal(calls, 0);
});

test('readiness makes a minimal authenticated schema probe', async () => {
  let request;
  const result = await checkSupabaseReadiness({
    ...baseOptions,
    fetchImpl: async (url, options) => {
      request = { url: String(url), options };
      return { ok: true };
    },
  });

  assert.deepEqual(result, { ok: true });
  assert.equal(request.url, 'https://example.supabase.co/auth/v1/health');
  assert.equal(request.options.headers.apikey, baseOptions.anonKey);
  assert.equal('Authorization' in request.options.headers, false);
  assert.equal(request.options.method, 'GET');
});

test('readiness maps dependency errors to a stable code without exposing response text', async () => {
  const result = await checkSupabaseReadiness({
    ...baseOptions,
    fetchImpl: async () => ({ ok: false, status: 500, text: async () => 'private database detail' }),
  });

  assert.deepEqual(result, { ok: false, code: 'SUPABASE_UNAVAILABLE' });
});

test('readiness bounds dependency latency and reports timeout safely', async () => {
  const result = await checkSupabaseReadiness({
    ...baseOptions,
    timeoutMs: 5,
    fetchImpl: (_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(new Error('request aborted')));
    }),
  });

  assert.deepEqual(result, { ok: false, code: 'SUPABASE_TIMEOUT' });
});

test('readiness rejects malformed endpoint configuration without making a request', async () => {
  let calls = 0;
  const result = await checkSupabaseReadiness({
    ...baseOptions,
    url: 'not a valid url',
    fetchImpl: async () => { calls += 1; return { ok: true }; },
  });

  assert.deepEqual(result, { ok: false, code: 'SUPABASE_CONFIG_INVALID' });
  assert.equal(calls, 0);
});
