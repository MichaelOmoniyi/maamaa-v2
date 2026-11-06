import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/types/database.types';

type InventoryRow = Database['public']['Tables']['inventory_items']['Row'];

export type InventoryWriteInput = {
  id?: string;
  name: string;
  description?: string;
  category: string;
  quantity: number;
  unit: string;
  minQuantity: number;
  status: InventoryRow['status'];
  barcode?: string | null;
  imagePath?: string | null;
};

export type InventoryListItem = InventoryRow & {
  imagePath: string;
  imageUrl: string;
  lastUpdated: Date;
};

const bucketName = 'inventory_images';
const signedUrlLifetimeSeconds = 60 * 60;

export function createInventoryRepository(supabase: SupabaseClient<Database>) {
  return {
    async getCurrentUserId(): Promise<string> {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (!user) throw new Error('User not authenticated');
      return user.id;
    },

    async listItems(): Promise<InventoryListItem[]> {
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

    async saveItem(item: InventoryWriteInput): Promise<void> {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('User not authenticated');

      const databaseItem: Database['public']['Tables']['inventory_items']['Insert'] = {
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

    async uploadImage(path: string, file: File): Promise<void> {
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(path, file, { contentType: 'image/jpeg', upsert: false });
      if (error) throw error;
    },

    async removeImage(path: string): Promise<void> {
      const { error } = await supabase.storage.from(bucketName).remove([path]);
      if (error) throw error;
    },

    async deleteItem(itemId: string): Promise<boolean> {
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
