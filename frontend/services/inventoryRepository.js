// @ts-check

/** @typedef {import('../types/database.types').Database} Database */
/** @typedef {import('@supabase/supabase-js').SupabaseClient<Database>} TypedSupabaseClient */
/** @typedef {Database['public']['Tables']['inventory_items']['Row']} InventoryRow */

/**
 * @typedef {object} InventoryWriteInput
 * @property {string} [id]
 * @property {string} name
 * @property {string} [description]
 * @property {string} category
 * @property {number} quantity
 * @property {string} unit
 * @property {number} minQuantity
 * @property {InventoryRow['status']} status
 * @property {string | null} [barcode]
 * @property {string | null} [imagePath]
 */

/**
 * @typedef {InventoryRow & {
 *   imagePath: string;
 *   imageUrl: string;
 *   lastUpdated: Date;
 * }} InventoryListItem
 */

const bucketName = 'inventory_images';
const signedUrlLifetimeSeconds = 60 * 60;

/** @param {TypedSupabaseClient} supabase */
export function createInventoryRepository(supabase) {
  return {
    async getCurrentUserId() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (!user) throw new Error('User not authenticated');
      return user.id;
    },

    async listItems() {
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      return Promise.all((data ?? []).map(async (item) => {
        let imageUrl = '';
        if (item.image_url) {
          const { data: signedImage } = await supabase.storage
            .from(bucketName)
            .createSignedUrl(item.image_url, signedUrlLifetimeSeconds);
          imageUrl = signedImage?.signedUrl ?? '';
        }

        return {
          ...item,
          imagePath: item.image_url ?? '',
          imageUrl,
          lastUpdated: new Date(item.updated_at),
        };
      }));
    },

    /** @param {InventoryWriteInput} item */
    async saveItem(item) {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('User not authenticated');

      /** @type {Database['public']['Tables']['inventory_items']['Insert']} */
      const databaseItem = {
        user_id: user.id,
        name: item.name,
        description: item.description ?? '',
        category: item.category,
        quantity: item.quantity,
        unit: item.unit,
        min_quantity: item.minQuantity,
        status: item.status,
        barcode: item.barcode ?? null,
        image_url: item.imagePath ?? null,
      };

      const query = item.id
        ? supabase.from('inventory_items').update(databaseItem).eq('id', item.id)
        : supabase.from('inventory_items').insert(databaseItem);
      const { error } = await query;
      if (error) throw error;
    },

    /** @param {string} path @param {File} file */
    async uploadImage(path, file) {
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(path, file, { contentType: 'image/jpeg', upsert: false });
      if (error) throw error;
    },

    /** @param {string} path */
    async removeImage(path) {
      const { error } = await supabase.storage.from(bucketName).remove([path]);
      if (error) throw error;
    },

    /** @param {string} itemId */
    async deleteItem(itemId) {
      const { data: item, error: lookupError } = await supabase
        .from('inventory_items')
        .select('image_url')
        .eq('id', itemId)
        .maybeSingle();
      if (lookupError) throw lookupError;

      const { error: deleteError } = await supabase
        .from('inventory_items')
        .delete()
        .eq('id', itemId);
      if (deleteError) throw deleteError;

      if (!item?.image_url) return false;

      const { error: storageError } = await supabase.storage
        .from(bucketName)
        .remove([item.image_url]);
      return Boolean(storageError);
    },
  };
}
