// @ts-check

/** @typedef {import('../types/database.types').Database} Database */
/** @typedef {import('../types/database.types').Json} Json */
/** @typedef {import('@supabase/supabase-js').SupabaseClient<Database>} TypedSupabaseClient */

/**
 * @typedef {object} ChatMessage
 * @property {'user' | 'assistant'} role
 * @property {string} content
 * @property {string} [type]
 * @property {unknown} [key]
 */

/**
 * @typedef {Database['public']['Tables']['chats']['Row']} ChatListItem
 */

/** @param {TypedSupabaseClient} supabase */
export function createChatRepository(supabase) {
  return {
    async listChats() {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data ?? [];
    },

    /** @param {string} chatId */
    async getChat(chatId) {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('id', chatId)
        .single();

      if (error) throw error;
      return data;
    },

    /** @param {string} chatId */
    async listMessages(chatId) {
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

    /** @param {string} chatId @param {ChatMessage} message */
    async insertMessage(chatId, message) {
      const type = message.type || 'text';
      /** @type {Json | null} */
      const metadata = type !== 'text' ? /** @type {Json} */ (/** @type {unknown} */ (message)) : null;
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          chat_id: chatId,
          role: message.role,
          content: message.content,
          type,
          metadata,
        });

      if (error) throw error;
    },

    /** @param {string} title @param {string} userId */
    async createChat(title, userId) {
      const { data, error } = await supabase
        .from('chats')
        .insert({ title, user_id: userId })
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    /** @param {Pick<ChatListItem, 'id' | 'title'>} chat @param {string} userId */
    async upsertChat(chat, userId) {
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
