import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
  // Only run on client-side
  if (import.meta.client) {
    const authStore = useAuthStore();

    // If user is not logged in, redirect to login page
    if (!authStore.isLoggedIn) {
      return navigateTo({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  }
});
