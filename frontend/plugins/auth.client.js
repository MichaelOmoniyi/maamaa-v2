// plugins/auth.client.js
import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
  // Initialize auth store when the app loads
  const authStore = useAuthStore();
  const router = useRouter();

  // Initialize auth
  await authStore.initAuth();

  // Set up auth state change listener with Supabase directly
  const supabase = useSupabaseClient();
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

  // Also listen for store changes for other state updates
  authStore.$subscribe((mutation, state) => {
    // If user just logged in, redirect to chat page
    if (state.user && router.currentRoute.value.path === '/login') {
      router.push('/chat');
    }
  });
});
