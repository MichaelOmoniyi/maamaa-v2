import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
  // Only run on client-side
  if (import.meta.client) {
    const authStore = useAuthStore();

    // If user is logged in and trying to access the root path, redirect to chat page
    if (authStore.isLoggedIn && to.path === '/') {
      return navigateTo('/chat');
    }
  }
}); 