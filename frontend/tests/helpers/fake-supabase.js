export function createSupabaseFake({
  queryResults = [],
  storageResults = [],
  userResult = { data: { user: { id: 'test-user-id' } }, error: null },
} = {}) {
  const calls = { queries: [], storage: [] };

  const supabase = {
    from(table) {
      const query = { table, steps: [] };
      calls.queries.push(query);
      const builder = {};
      for (const method of ['select', 'order', 'eq', 'insert', 'update', 'delete', 'upsert']) {
        builder[method] = (...args) => {
          query.steps.push({ method, args });
          return builder;
        };
      }
      builder.single = () => {
        query.steps.push({ method: 'single', args: [] });
        return Promise.resolve(queryResults.shift());
      };
      builder.maybeSingle = () => {
        query.steps.push({ method: 'maybeSingle', args: [] });
        return Promise.resolve(queryResults.shift());
      };
      builder.then = (resolve, reject) => Promise.resolve(queryResults.shift()).then(resolve, reject);
      return builder;
    },
    auth: {
      getUser: async () => userResult,
    },
    storage: {
      from(bucket) {
        return {
          createSignedUrl(path, expiresIn) {
            calls.storage.push({ method: 'createSignedUrl', bucket, path, expiresIn });
            return Promise.resolve(storageResults.shift());
          },
          upload(path, file, options) {
            calls.storage.push({ method: 'upload', bucket, path, file, options });
            return Promise.resolve(storageResults.shift());
          },
          remove(paths) {
            calls.storage.push({ method: 'remove', bucket, paths });
            return Promise.resolve(storageResults.shift());
          },
        };
      },
    },
  };

  return { supabase, calls };
}
