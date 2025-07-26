// plugins/auth.client.js
import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
  // Initialize auth store when the app loads
  const authStore = useAuthStore();
  const router = useRouter();

  // Initialize auth
  await authStore.initAuth();

  // Listen for auth state changes
  authStore.$subscribe((mutation, state) => {
    // If user just logged in, redirect to chat page
    if (state.user && router.currentRoute.value.path === '/login') {
      router.push('/chat');
    }
  });
});
