// plugins/auth.client.js
import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
  // Initialize auth store when the app loads
  const authStore = useAuthStore();

  // Initialize auth
  await authStore.initAuth();
});
