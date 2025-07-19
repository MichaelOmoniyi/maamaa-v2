// plugins/z-auth.client.js
import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
  // Make sure this plugin runs after Pinia and Supabase are initialized
  try {
    const authStore = useAuthStore();
    await authStore.initAuth();
  } catch (error) {
    console.error("Failed to initialize auth:", error);
  }
});
