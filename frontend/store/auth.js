import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loading: false,
    error: null,
    user: null, // Remove mock user
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
        console.log("Attempting to login with Supabase...");

        // Sign in the user with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Supabase login error:", error);
          throw error;
        }

        console.log("Login successful:", data);
        // Set the user in state
        this.user = data.user;

        return { data, error: null };
      } catch (error) {
        console.error("Login error details:", error);
        // Provide more specific error messages
        if (error.message.includes("Invalid login credentials")) {
          this.error = "Invalid email or password. Please check your credentials.";
        } else if (error.message.includes("Email not confirmed")) {
          this.error = "Please confirm your email address before logging in.";
        } else {
          this.error = error.message || "Failed to login. Please try again later.";
        }
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
