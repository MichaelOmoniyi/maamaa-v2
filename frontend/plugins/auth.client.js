// plugins/auth.client.js
import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin((nuxtApp) => {
  // We need to wait for the app to be mounted before accessing Supabase
  nuxtApp.hook('app:mounted', async () => {
    const authStore = useAuthStore();
    const router = nuxtApp.$router;
    
    // Get Supabase client - useSupabaseClient is available after app is mounted
    const supabase = useSupabaseClient();
    
    if (!supabase) {
      return;
    }

    // Initialize auth - get current session
    try {
      const { data } = await supabase.auth.getSession();
      authStore.user = data.session?.user || null;
    } catch (error) {
      // Silently handle initialization errors
    }

    // Set up auth state change listener with Supabase directly
    supabase.auth.onAuthStateChange((event, session) => {
      // Update auth store user
      authStore.user = session?.user || null;
      
      // Handle different auth events
      if (event === 'SIGNED_IN') {
        // If on login page, redirect to chat
        if (router.currentRoute.value.path === '/login') {
          router.push('/chat');
        }
      } else if (event === 'SIGNED_OUT') {
        // Clear any cached data and redirect to login
        if (process.client) {
          router.push('/login');
        }
      }
    });
  });
});
