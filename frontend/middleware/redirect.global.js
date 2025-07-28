import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  // Only run on client-side
  if (import.meta.client) {
    const authStore = useAuthStore();

    // Only redirect to chat page if coming from login page
    if (authStore.isLoggedIn && to.path === '/' && from.path === '/login') {
      return navigateTo('/chat');
    }
  }
}); 