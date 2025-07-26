<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Navigation -->
    <header 
      :class="[
        'transition-all duration-300 ease-in-out z-50',
        isScrolled ? 'bg-dark-green shadow-md fixed top-0 left-0 right-0' : 'bg-transparent absolute top-0 left-0 right-0'
      ]"
    >
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <img src="/images/maamaa-logo.png" alt="MaaMaa Logo" class="h-10" />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="flex space-x-8 items-center justify-end">
          <div class="hidden md:flex items-center justify-end space-x-8">
            <NuxtLink to="/about" class="text-white hover:text-light-green transition duration-200 font-medium">About us</NuxtLink>
            <NuxtLink to="/usecases" class="text-white hover:text-light-green transition duration-200 font-medium">Use cases</NuxtLink>
            <NuxtLink to="/get-help" class="text-white hover:text-light-green transition duration-200 font-medium">Help</NuxtLink>
            <!-- <NuxtLink to="/pricing" class="text-white hover:text-light-green transition duration-200 font-medium">Pricing</NuxtLink> -->
            <!-- Authenticated User Links -->
            <template v-if="authStore.user">
              <NuxtLink to="/chat" class="text-white hover:text-light-green transition duration-200 font-medium">Chat</NuxtLink>
              <!-- <NuxtLink to="/estimator" class="text-white hover:text-light-green transition duration-200 font-medium">Estimator</NuxtLink>
              <NuxtLink to="/inventory" class="text-white hover:text-light-green transition duration-200 font-medium">Inventory</NuxtLink> -->
            </template>
          </div>

          <!-- Sign In / Register Buttons or User Dropdown -->
          <div class="hidden md:flex items-center space-x-3">
            <template v-if="authStore.user">
              <div class="relative" ref="userMenuContainer">
                <button 
                  class="flex items-center text-white hover:text-light-green transition duration-200"
                  @click="userMenuOpen = !userMenuOpen"
                >
                  <span class="mr-1">{{ authStore.user.user_metadata?.full_name || authStore.user.email }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <!-- User Dropdown Menu -->
                <div 
                  v-if="userMenuOpen" 
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  @click.stop
                >
                  <NuxtLink 
                    to="/profile" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="userMenuOpen = false"
                  >
                    Profile
                  </NuxtLink>
                  <button 
                    class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="logout"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <NuxtLink to="/login" class="bg-white text-dark-green hover:bg-gray-100 px-6 py-2 rounded-lg transition duration-200 font-medium">
                Sign In
              </NuxtLink>
            </template>
          </div>
        </div>

        <!-- Mobile menu button -->
        <button class="md:hidden text-white focus:outline-none" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      <!-- Mobile Navigation Menu -->
      <div v-if="mobileMenuOpen" :class="[
        'md:hidden border-t border-light-green/10',
        isScrolled ? 'bg-dark-green' : 'bg-dark-green/90 backdrop-blur-sm'
      ]">
        <div class="container mx-auto px-4 py-3 space-y-1">
          <NuxtLink to="/about" class="block py-2 text-white hover:text-light-green">About us</NuxtLink>
          <NuxtLink to="/usecases" class="block py-2 text-white hover:text-light-green">Use cases</NuxtLink>
          <NuxtLink to="/get-help" class="block py-2 text-white hover:text-light-green">Help</NuxtLink>
          <!-- <NuxtLink to="/pricing" class="block py-2 text-white hover:text-light-green">Pricing</NuxtLink> -->
          <!-- Authenticated User Links -->
          <template v-if="authStore.user">
            <NuxtLink to="/chat" class="block py-2 text-white hover:text-light-green">Chat</NuxtLink>
            <!-- <NuxtLink to="/estimator" class="block py-2 text-white hover:text-light-green">Estimator</NuxtLink>
            <NuxtLink to="/inventory" class="block py-2 text-white hover:text-light-green">Inventory</NuxtLink> -->
          </template>
          <div class="pt-2">
            <template v-if="authStore.user">
              <div class="border-t border-gray-700 pt-2">
                <NuxtLink to="/profile" class="block px-4 py-2 text-white hover:text-light-green">Profile</NuxtLink>
                <button 
                  class="w-full text-left px-4 py-2 text-white hover:text-light-green"
                  @click="logout"
                >
                  Sign Out
                </button>
              </div>
            </template>
            <template v-else>
              <div class="pt-2">
                <NuxtLink to="/login" class="block w-full bg-white text-dark-green hover:bg-gray-100 px-4 py-2 rounded-lg transition duration-200 font-medium text-center">
                  Sign In
                </NuxtLink>
              </div>
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main :class="route.path === '/' ? '' : 'flex-grow'">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white py-8 border-t">
      <div class="container mx-auto px-6 md:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <p class="text-sm text-[#262626]">© MaaMaa 2025. Built with ❤️ in Nigeria.</p>
          </div>
          <div class="text-center md:text-right">
            <div class="flex justify-center md:justify-end space-x-6 mt-3">
              <a href="#" class="text-[#262626] font-500 hover:text-gray-700 text-sm">Terms</a>
              <a href="#" class="text-[#262626] font-500 hover:text-gray-700 text-sm">Privacy</a>
              <a href="#" class="text-[#262626] hover:text-gray-700 text-sm">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="text-[#262626] hover:text-gray-700 text-sm">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                </svg>
              </a>
              <a href="#" class="text-[#262626] hover:text-gray-700 text-sm">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';

const mobileMenuOpen = ref(false);
const userMenuOpen = ref(false);
const userMenuContainer = ref(null);
const isScrolled = ref(false);

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// Handle scroll for navbar on all pages
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Close user menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (event) => {
    if (userMenuContainer.value && !userMenuContainer.value.contains(event.target)) {
      userMenuOpen.value = false;
    }
  });

  // Add scroll listener for all pages
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check current scroll position on mount
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Watch route changes to reset scroll state
watch(() => route.path, () => {
  handleScroll(); // Check current scroll position on route change
});

// Handle user logout
const logout = async () => {
  try {
    await authStore.logout();
    userMenuOpen.value = false;
    mobileMenuOpen.value = false;
    router.push('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// Close menus on route change
watch(() => router.currentRoute.value.path, () => {
  userMenuOpen.value = false;
  mobileMenuOpen.value = false;
});
</script>
