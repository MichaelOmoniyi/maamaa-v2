/**
 * Database contract for the schema in
 * supabase/migrations/20261104000000_initial_maamaa_schema.sql.
 * Keep this aligned with later migrations; prefer regenerating with the Supabase
 * CLI when schema changes are made.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type ChatRow = {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

type ChatMessageRow = {
  id: string;
  chat_id: string;
  role: 'user' | 'assistant';
  content: string;
  type: string;
  metadata: Json | null;
  created_at: string;
};

type InventoryItemRow = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  min_quantity: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  barcode: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      chats: {
        Row: ChatRow;
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      chat_messages: {
        Row: ChatMessageRow;
        Insert: {
          id?: string;
          chat_id: string;
          role: 'user' | 'assistant';
          content: string;
          type?: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          chat_id?: string;
          role?: 'user' | 'assistant';
          content?: string;
          type?: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_messages_chat_id_fkey';
            columns: ['chat_id'];
            isOneToOne: false;
            referencedRelation: 'chats';
            referencedColumns: ['id'];
          },
        ];
      };
      inventory_items: {
        Row: InventoryItemRow;
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string;
          category: string;
          quantity: number;
          unit: string;
          min_quantity?: number;
          status: 'in-stock' | 'low-stock' | 'out-of-stock';
          barcode?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string;
          category?: string;
          quantity?: number;
          unit?: string;
          min_quantity?: number;
          status?: 'in-stock' | 'low-stock' | 'out-of-stock';
          barcode?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      export_user_data: {
        Args: Record<string, never>;
        Returns: Json;
      };
      delete_user_data: {
        Args: Record<string, never>;
        Returns: string[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

