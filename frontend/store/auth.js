import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loading: false,
    error: null,
    user: null,
  }),

  actions: {
    async register(name, email, password) {
      this.loading = true;
      this.error = null;

      try {
        const supabase = useSupabaseClient();

        // Register the user with Supabase
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });

        if (error) throw error;

        return { data, error: null };
      } catch (error) {
        this.error = error.message;
        return { data: null, error };
      } finally {
        this.loading = false;
      }
    },

    async login(email, password) {
      this.loading = true;
      this.error = null;

      try {
        const supabase = useSupabaseClient();

        // Sign in the user with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Set the user in state
        this.user = data.user;

        return { data, error: null };
      } catch (error) {
        this.error = error.message;
        return { data: null, error };
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      this.error = null;

      try {
        const supabase = useSupabaseClient();

        // Sign out the user
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        // Clear user data
        this.user = null;

        return { error: null };
      } catch (error) {
        this.error = error.message;
        return { error };
      } finally {
        this.loading = false;
      }
    },

    async resetPassword(email) {
      this.loading = true;
      this.error = null;

      try {
        const supabase = useSupabaseClient();

        // Send password reset email
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) throw error;

        return { error: null };
      } catch (error) {
        this.error = error.message;
        return { error };
      } finally {
        this.loading = false;
      }
    },

    // Initialize the auth state - call this when app starts
    async initAuth() {
      const supabase = useSupabaseClient();

      try {
        const { data } = await supabase.auth.getSession();
        this.user = data.session?.user || null;

        // Listen for auth changes
        supabase.auth.onAuthStateChange((event, session) => {
          this.user = session?.user || null;
        });
      } catch (error) {
        console.error("Error initializing auth:", error);
      }
    },
  },

  getters: {
    isLoggedIn() {
      return !!this.user;
    },
    getLoading() {
      return this.loading;
    },
    getError() {
      return this.error;
    },
    getUser() {
      return this.user;
    },
  },
});
