<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Navigation -->
    <header 
      :class="[
        'transition-all duration-300 ease-in-out z-50',
        route.path === '/' ? (isScrolled ? 'bg-dark-green shadow-md fixed top-0 left-0 right-0' : 'bg-transparent absolute top-0 left-0 right-0') : 'bg-dark-green shadow-md'
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
            <NuxtLink to="/pricing" class="text-white hover:text-light-green transition duration-200 font-medium">Pricing</NuxtLink>
            <!-- Authenticated User Links -->
            <template v-if="authStore.user">
              <NuxtLink to="/chat" class="text-white hover:text-light-green transition duration-200 font-medium">Chat</NuxtLink>
              <NuxtLink to="/estimator" class="text-white hover:text-light-green transition duration-200 font-medium">Estimator</NuxtLink>
              <NuxtLink to="/inventory" class="text-white hover:text-light-green transition duration-200 font-medium">Inventory</NuxtLink>
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
        route.path === '/' ? (isScrolled ? 'bg-dark-green' : 'bg-dark-green/90 backdrop-blur-sm') : 'bg-dark-green'
      ]">
        <div class="container mx-auto px-4 py-3 space-y-1">
          <NuxtLink to="/about" class="block py-2 text-white hover:text-light-green">About us</NuxtLink>
          <NuxtLink to="/usecases" class="block py-2 text-white hover:text-light-green">Use cases</NuxtLink>
          <NuxtLink to="/pricing" class="block py-2 text-white hover:text-light-green">Pricing</NuxtLink>
          <!-- Authenticated User Links -->
          <template v-if="authStore.user">
            <NuxtLink to="/chat" class="block py-2 text-white hover:text-light-green">Chat</NuxtLink>
            <NuxtLink to="/estimator" class="block py-2 text-white hover:text-light-green">Estimator</NuxtLink>
            <NuxtLink to="/inventory" class="block py-2 text-white hover:text-light-green">Inventory</NuxtLink>
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
    <footer class="bg-dark-green text-white">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Logo and Info -->
          <div class="col-span-1 md:col-span-1">
            <img src="/images/maamaa-logo.png" alt="MaaMaa Logo" class="h-10 mb-4" />
            <p class="text-sm text-gray-300 mb-4">AI-powered event catering assistant for African culinary needs</p>
          </div>
          
          <!-- Quick Links -->
          <div class="col-span-1">
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-gray-300 hover:text-light-green">Home</NuxtLink></li>
              <li><NuxtLink to="/usecases" class="text-gray-300 hover:text-light-green">Use Cases</NuxtLink></li>
              <li><NuxtLink to="/estimator" class="text-gray-300 hover:text-light-green">Get Estimate</NuxtLink></li>
              <li><NuxtLink to="/about" class="text-gray-300 hover:text-light-green">About Us</NuxtLink></li>
              <li><NuxtLink to="/contact" class="text-gray-300 hover:text-light-green">Contact</NuxtLink></li>
            </ul>
          </div>
          
          <!-- Plans -->
          <div class="col-span-1">
            <h3 class="text-lg font-semibold mb-4">Our Plans</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/pricing" class="text-gray-300 hover:text-light-green">Free Plan</NuxtLink></li>
              <li><NuxtLink to="/pricing" class="text-gray-300 hover:text-light-green">Premium Plan</NuxtLink></li>
              <li><NuxtLink to="/pricing" class="text-gray-300 hover:text-light-green">Add-ons</NuxtLink></li>
            </ul>
          </div>
          
          <!-- Contact Info -->
          <div class="col-span-1">
            <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Lagos, Nigeria</li>
              <li>info@maamaa.com</li>
              <li>+234 800 MAAMAA</li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-gray-400">&copy; 2025 MaaMaa. All rights reserved.</p>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-light-green">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-light-green">
              <span class="sr-only">Twitter</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-light-green">
              <span class="sr-only">Instagram</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
              </svg>
            </a>
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

// Handle scroll for transparent navbar on home page
const handleScroll = () => {
  if (route.path === '/') {
    isScrolled.value = window.scrollY > 50;
  }
};

// Close user menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (event) => {
    if (userMenuContainer.value && !userMenuContainer.value.contains(event.target)) {
      userMenuOpen.value = false;
    }
  });

  // Add scroll listener for home page navbar
  if (route.path === '/') {
    window.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Watch route changes to add/remove scroll listener
watch(() => route.path, (newPath) => {
  if (newPath === '/') {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check current scroll position
  } else {
    window.removeEventListener('scroll', handleScroll);
    isScrolled.value = false;
  }
});

// Close user menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (event) => {
    if (userMenuContainer.value && !userMenuContainer.value.contains(event.target)) {
      userMenuOpen.value = false;
    }
  });
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
