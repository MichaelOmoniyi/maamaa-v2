import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database, Json } from '~/types/database.types';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  type?: string;
  [key: string]: unknown;
};

export type ChatListItem = Database['public']['Tables']['chats']['Row'];

export function createChatRepository(supabase: SupabaseClient<Database>) {
  return {
    async listChats(): Promise<ChatListItem[]> {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data ?? [];
    },

    async getChat(chatId: string): Promise<ChatListItem> {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('id', chatId)
        .single();

      if (error) throw error;
      return data;
    },

    async listMessages(chatId: string): Promise<ChatMessage[]> {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at');

      if (error) throw error;

      return (data ?? []).map((message) => {
        const metadata = message.metadata;
        if (
          message.type !== 'text'
          && metadata !== null
          && typeof metadata === 'object'
          && !Array.isArray(metadata)
        ) {
          return {
            ...metadata,
            role: message.role,
            content: message.content,
            type: message.type,
          };
        }

        return {
          role: message.role,
          content: message.content,
          type: message.type || 'text',
        };
      });
    },

    async insertMessage(chatId: string, message: ChatMessage): Promise<void> {
      const type = message.type || 'text';
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          chat_id: chatId,
          role: message.role,
          content: message.content,
          type,
          metadata: type !== 'text' ? message as unknown as Json : null,
        });

      if (error) throw error;
    },

    async createChat(title: string, userId: string): Promise<ChatListItem> {
      const { data, error } = await supabase
        .from('chats')
        .insert({ title, user_id: userId })
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async upsertChat(chat: Pick<ChatListItem, 'id' | 'title'>, userId: string): Promise<void> {
      const { error } = await supabase
        .from('chats')
        .upsert({
          id: chat.id,
          user_id: userId,
          title: chat.title,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
    },
  };
}
