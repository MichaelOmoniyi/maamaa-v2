import test from 'node:test';
import assert from 'node:assert/strict';
import { createUserRateLimiter, generateAiReply, validateAiChatInput } from '../server/utils/ai-chat.js';

const chatId = '123e4567-e89b-12d3-a456-426614174000';

test('AI chat input accepts bounded text conversation and trims content', () => {
  assert.deepEqual(validateAiChatInput({
    chatId,
    messages: [{ role: 'user', content: '  Plan a menu  ' }],
  }), {
    ok: true,
    chatId,
    messages: [{ role: 'user', content: 'Plan a menu' }],
  });
});

test('AI chat input rejects invalid chat IDs, oversized history, and a non-user final turn', () => {
  assert.equal(validateAiChatInput({ chatId: 'bad', messages: [{ role: 'user', content: 'Hi' }] }).ok, false);
  assert.equal(validateAiChatInput({ chatId, messages: [{ role: 'user', content: 'x'.repeat(4001) }] }).ok, false);
  assert.equal(validateAiChatInput({ chatId, messages: [{ role: 'assistant', content: 'Hello' }] }).ok, false);
  assert.equal(validateAiChatInput({ chatId, messages: Array.from({ length: 13 }, () => ({ role: 'user', content: 'Hi' })) }).ok, false);
});

test('AI per-user limiter enforces the window and resets it', () => {
  let now = 1000;
  const limiter = createUserRateLimiter({ limit: 2, windowMs: 1000, now: () => now });
  assert.equal(limiter.allow('user-1'), true);
  assert.equal(limiter.allow('user-1'), true);
  assert.equal(limiter.allow('user-1'), false);
  assert.equal(limiter.allow('user-2'), true);
  now += 1000;
  assert.equal(limiter.allow('user-1'), true);
});

test('AI generation builds a Gemini request with server-only credentials and maps chat roles', async () => {
  let request;
  const result = await generateAiReply({
    apiKey: 'server-test-key',
    model: 'test-model',
    messages: [
      { role: 'user', content: 'Suggest a meal' },
      { role: 'assistant', content: 'What cuisine do you prefer?' },
      { role: 'user', content: 'Yoruba dishes' },
    ],
    fetchImpl: async (url, options) => {
      request = { url, options };
      return { ok: true, json: async () => ({
        candidates: [{ content: { parts: [{ text: 'Try jollof rice and vegetables.' }] } }],
      }) };
    },
  });
  assert.deepEqual(result, { ok: true, content: 'Try jollof rice and vegetables.' });
  assert.equal(request.url, 'https://generativelanguage.googleapis.com/v1beta/models/test-model:generateContent');
  assert.equal(request.options.headers['x-goog-api-key'], 'server-test-key');
  assert.equal('Authorization' in request.options.headers, false);
  const body = JSON.parse(request.options.body);
  assert.equal(body.systemInstruction.parts[0].text.includes('culturally respectful'), true);
  assert.deepEqual(body.contents, [
    { role: 'user', parts: [{ text: 'Suggest a meal' }] },
    { role: 'model', parts: [{ text: 'What cuisine do you prefer?' }] },
    { role: 'user', parts: [{ text: 'Yoruba dishes' }] },
  ]);
  assert.deepEqual(body.generationConfig, { maxOutputTokens: 800 });
});

test('AI generation maps missing config, provider errors, malformed output, and timeouts safely', async () => {
  assert.deepEqual(await generateAiReply({ messages: [] }), { ok: false, code: 'AI_NOT_CONFIGURED' });
  assert.deepEqual(await generateAiReply({
    apiKey: 'key', model: 'model', messages: [],
    fetchImpl: async () => ({ ok: false, status: 429 }),
  }), { ok: false, code: 'AI_PROVIDER_UNAVAILABLE' });
  assert.deepEqual(await generateAiReply({
    apiKey: 'key', model: 'model', messages: [],
    fetchImpl: async () => ({ ok: true, json: async () => ({ candidates: [] }) }),
  }), { ok: false, code: 'AI_INVALID_RESPONSE' });
  assert.deepEqual(await generateAiReply({
    apiKey: 'key', model: 'model', messages: [], timeoutMs: 1,
    fetchImpl: async (_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' })));
    }),
  }), { ok: false, code: 'AI_TIMEOUT' });
});
