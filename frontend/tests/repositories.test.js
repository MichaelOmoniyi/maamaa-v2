import test from 'node:test';
import assert from 'node:assert/strict';
import { createChatRepository } from '../services/chatRepository.js';
import { createInventoryRepository } from '../services/inventoryRepository.js';
import { createSupabaseFake } from './helpers/fake-supabase.js';

test('chat repository maps message metadata while preserving database role and content', async () => {
  const { supabase, calls } = createSupabaseFake({
    queryResults: [{
      data: [
        { role: 'user', content: 'A note', type: 'text', metadata: null },
        { role: 'assistant', content: 'Structured', type: 'menu', metadata: { dishes: ['jollof'] } },
      ],
      error: null,
    }],
  });

  const messages = await createChatRepository(supabase).listMessages('chat-1');

  assert.deepEqual(messages, [
    { role: 'user', content: 'A note', type: 'text' },
    { dishes: ['jollof'], role: 'assistant', content: 'Structured', type: 'menu' },
  ]);
  assert.deepEqual(calls.queries[0].steps.at(-1), { method: 'order', args: ['created_at'] });
});

test('chat repository lists and reads chats through the expected table filters', async () => {
  const chat = { id: 'chat-1', user_id: 'owner-1', title: 'Planning', created_at: 'now', updated_at: 'now' };
  const { supabase, calls } = createSupabaseFake({
    queryResults: [
      { data: [chat], error: null },
      { data: chat, error: null },
    ],
  });
  const repository = createChatRepository(supabase);

  assert.deepEqual(await repository.listChats(), [chat]);
  assert.deepEqual(await repository.getChat('chat-1'), chat);
  assert.deepEqual(calls.queries[0].steps.at(-1), {
    method: 'order', args: ['updated_at', { ascending: false }],
  });
  assert.deepEqual(calls.queries[1].steps.at(-2), { method: 'eq', args: ['id', 'chat-1'] });
});

test('chat repository writes a message with text defaults and propagates failures', async () => {
  const { supabase, calls } = createSupabaseFake({
    queryResults: [{ data: null, error: null }, { data: null, error: new Error('database unavailable') }],
  });
  const repository = createChatRepository(supabase);

  await repository.insertMessage('chat-1', { role: 'user', content: 'hello' });
  assert.deepEqual(calls.queries[0].steps[0], {
    method: 'insert',
    args: [{ chat_id: 'chat-1', role: 'user', content: 'hello', type: 'text', metadata: null }],
  });
  await assert.rejects(repository.insertMessage('chat-1', { role: 'user', content: 'retry' }), /database unavailable/);
});

test('chat repository upsert includes the owner and refreshed timestamp', async () => {
  const { supabase, calls } = createSupabaseFake({ queryResults: [{ data: null, error: null }] });

  await createChatRepository(supabase).upsertChat({ id: 'chat-1', title: 'Notes' }, 'owner-1');

  const upsert = calls.queries[0].steps[0];
  assert.equal(upsert.method, 'upsert');
  assert.equal(upsert.args[0].user_id, 'owner-1');
  assert.equal(upsert.args[0].title, 'Notes');
  assert.ok(Number.isFinite(Date.parse(upsert.args[0].updated_at)));
});

test('chat repository creates a chat with the authenticated owner id supplied by the caller', async () => {
  const chat = { id: 'chat-2', user_id: 'owner-1', title: 'Dinner', created_at: 'now', updated_at: 'now' };
  const { supabase, calls } = createSupabaseFake({ queryResults: [{ data: chat, error: null }] });

  assert.deepEqual(await createChatRepository(supabase).createChat('Dinner', 'owner-1'), chat);
  assert.deepEqual(calls.queries[0].steps[0], {
    method: 'insert', args: [{ title: 'Dinner', user_id: 'owner-1' }],
  });
});

test('inventory repository scopes writes to the current user and maps storage fields', async () => {
  const { supabase, calls } = createSupabaseFake({
    userResult: { data: { user: { id: 'owner-2' } }, error: null },
    queryResults: [{ data: null, error: null }],
  });

  await createInventoryRepository(supabase).saveItem({
    name: 'Rice',
    category: 'grain',
    quantity: 2.5,
    unit: 'kg',
    minQuantity: 0.5,
    status: 'in-stock',
    imagePath: 'owner-2/image.jpg',
  });

  assert.deepEqual(calls.queries[0].steps[0], {
    method: 'insert',
    args: [{
      user_id: 'owner-2',
      name: 'Rice',
      description: '',
      category: 'grain',
      quantity: 2.5,
      unit: 'kg',
      min_quantity: 0.5,
      status: 'in-stock',
      barcode: null,
      image_url: 'owner-2/image.jpg',
    }],
  });
});

test('inventory repository returns signed image URLs without changing private object paths', async () => {
  const row = {
    id: 'item-1', user_id: 'owner-1', name: 'Rice', description: '', category: 'grain',
    quantity: 2, unit: 'kg', min_quantity: 1, status: 'in-stock', barcode: null,
    image_url: 'owner-1/rice.jpg', created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-02T00:00:00Z',
  };
  const { supabase, calls } = createSupabaseFake({
    queryResults: [{ data: [row], error: null }],
    storageResults: [{ data: { signedUrl: 'https://storage.test/signed-image' }, error: null }],
  });

  const [item] = await createInventoryRepository(supabase).listItems();

  assert.equal(item.imagePath, 'owner-1/rice.jpg');
  assert.equal(item.imageUrl, 'https://storage.test/signed-image');
  assert.equal(item.lastUpdated.toISOString(), new Date(row.updated_at).toISOString());
  assert.deepEqual(calls.storage[0], {
    method: 'createSignedUrl', bucket: 'inventory_images', path: row.image_url, expiresIn: 3600,
  });
});

test('inventory repository resolves the active user and uploads private images without overwriting', async () => {
  const { supabase, calls } = createSupabaseFake({
    storageResults: [{ data: { path: 'owner-1/image.jpg' }, error: null }],
  });
  const repository = createInventoryRepository(supabase);
  const image = new Blob(['jpeg-bytes'], { type: 'image/jpeg' });

  assert.equal(await repository.getCurrentUserId(), 'test-user-id');
  await repository.uploadImage('owner-1/image.jpg', image);
  assert.equal(calls.storage[0].bucket, 'inventory_images');
  assert.equal(calls.storage[0].options.upsert, false);
  assert.equal(calls.storage[0].options.contentType, 'image/jpeg');
});

test('inventory repository removes uploaded images and propagates storage errors', async () => {
  const { supabase, calls } = createSupabaseFake({
    storageResults: [{ data: null, error: null }, { data: null, error: new Error('storage unavailable') }],
  });
  const repository = createInventoryRepository(supabase);

  await repository.removeImage('owner-1/image.jpg');
  assert.deepEqual(calls.storage[0], {
    method: 'remove', bucket: 'inventory_images', paths: ['owner-1/image.jpg'],
  });
  await assert.rejects(repository.removeImage('owner-1/image.jpg'), /storage unavailable/);
});

test('inventory repository deletes a row without calling Storage when it has no image', async () => {
  const { supabase, calls } = createSupabaseFake({
    queryResults: [
      { data: { image_url: null }, error: null },
      { data: null, error: null },
    ],
  });

  assert.equal(await createInventoryRepository(supabase).deleteItem('item-2'), false);
  assert.equal(calls.storage.length, 0);
});

test('inventory repository removes the database row then its image and reports cleanup failure', async () => {
  const { supabase, calls } = createSupabaseFake({
    queryResults: [
      { data: { image_url: 'owner-1/rice.jpg' }, error: null },
      { data: null, error: null },
    ],
    storageResults: [{ data: null, error: new Error('storage unavailable') }],
  });

  const cleanupFailed = await createInventoryRepository(supabase).deleteItem('item-1');

  assert.equal(cleanupFailed, true);
  assert.deepEqual(calls.storage[0], {
    method: 'remove', bucket: 'inventory_images', paths: ['owner-1/rice.jpg'],
  });
  assert.equal(calls.queries[0].steps.at(-1).method, 'maybeSingle');
  assert.equal(calls.queries[1].steps[0].method, 'delete');
});
