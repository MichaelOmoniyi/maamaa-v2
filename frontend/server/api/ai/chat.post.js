import { createUserRateLimiter, generateAiReply, validateAiChatInput } from '../../utils/ai-chat.js';

const rateLimiter = createUserRateLimiter();

function fail(statusCode, code) {
  throw createError({ statusCode, statusMessage: code, data: { code } });
}

async function readLimitedJsonBody(event) {
  const chunks = [];
  let size = 0;
  try {
    for await (const chunk of event.node.req) {
      const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += bytes.length;
      if (size > 64 * 1024) fail(413, 'REQUEST_TOO_LARGE');
      chunks.push(bytes);
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch (error) {
    if (error?.statusCode) throw error;
    fail(400, 'INVALID_REQUEST');
  }
}

export default defineEventHandler(async (event) => {
  const contentLength = Number(getHeader(event, 'content-length') || 0);
  if (contentLength > 64 * 1024) fail(413, 'REQUEST_TOO_LARGE');
  const input = validateAiChatInput(await readLimitedJsonBody(event));
  if (!input.ok) fail(400, input.code);

  const authorization = getHeader(event, 'authorization') || '';
  const token = authorization.match(/^Bearer\s+([^\s]+)$/i)?.[1];
  if (!token) fail(401, 'AUTH_REQUIRED');

  const config = useRuntimeConfig(event);
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) fail(503, 'SUPABASE_CONFIG_MISSING');

  let baseUrl;
  try {
    baseUrl = new URL(supabaseUrl);
    if (baseUrl.protocol !== 'https:' && baseUrl.hostname !== 'localhost') throw new Error('invalid protocol');
  } catch {
    fail(503, 'SUPABASE_CONFIG_INVALID');
  }

  let user;
  try {
    const authResponse = await fetch(`${baseUrl.origin}/auth/v1/user`, {
      headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(5000),
    });
    if (authResponse.status === 401 || authResponse.status === 403) fail(401, 'AUTH_REQUIRED');
    if (!authResponse.ok) fail(503, 'AUTH_UNAVAILABLE');
    user = await authResponse.json();
  } catch (error) {
    if (error?.statusCode) throw error;
    fail(503, 'AUTH_UNAVAILABLE');
  }
  if (typeof user?.id !== 'string') fail(401, 'AUTH_REQUIRED');

  // The caller's JWT makes Postgres RLS enforce ownership. Never use a service-role key here.
  let chatResponse;
  try {
    const query = new URLSearchParams({ id: `eq.${input.chatId}`, select: 'id', limit: '1' });
    chatResponse = await fetch(`${baseUrl.origin}/rest/v1/chats?${query}`, {
      headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    fail(503, 'CHAT_CHECK_UNAVAILABLE');
  }
  if (!chatResponse.ok) fail(503, 'CHAT_CHECK_UNAVAILABLE');
  const ownedChats = await chatResponse.json();
  if (!Array.isArray(ownedChats) || ownedChats.length !== 1) fail(404, 'CHAT_NOT_FOUND');

  if (!rateLimiter.allow(user.id)) fail(429, 'AI_RATE_LIMITED');

  const result = await generateAiReply({
    apiKey: config.geminiApiKey,
    model: config.geminiModel,
    messages: input.messages,
  });
  if (!result.ok) {
    const status = result.code === 'AI_NOT_CONFIGURED' ? 503 : 502;
    fail(status, result.code);
  }

  return { reply: result.content };
});
