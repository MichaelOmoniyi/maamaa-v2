<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- Offline Illustration -->
      <div class="mb-8">
        <div class="mx-auto w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2v2m0 16v2m-8-10H2m20 0h-2M6.343 6.343l1.414 1.414M16.243 16.243l1.414 1.414M6.343 17.657l1.414-1.414M16.243 7.757l1.414-1.414" />
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-gray-500 mb-4">You're Offline</h1>
      </div>

      <!-- Offline Content -->
      <div class="mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-dark-text mb-4">
          No Internet Connection
        </h2>
        <p class="text-gray-600 mb-6">
          It looks like you've lost your internet connection. Please check your network and try again.
        </p>
        
        <!-- Connection status -->
        <div class="inline-flex items-center bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-6">
          <div class="flex-shrink-0">
            <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
          </div>
          <span class="text-sm text-red-800 font-medium">
            {{ isOnline ? 'Reconnecting...' : 'Offline' }}
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-4">
        <button 
          @click="checkConnection"
          :disabled="isChecking"
          class="w-full bg-primary-green hover:bg-dark-green disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center"
        >
          <svg v-if="isChecking" xmlns="http://www.w3.org/2000/svg" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isChecking ? 'Checking...' : 'Check Connection' }}
        </button>
        
        <div class="flex space-x-4">
          <button 
            @click="refreshPage"
            class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition duration-200"
          >
            Refresh Page
          </button>
          <button 
            @click="goOfflineMode"
            class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition duration-200"
          >
            Offline Mode
          </button>
        </div>
      </div>

      <!-- Offline capabilities -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <h3 class="text-lg font-semibold text-dark-text mb-4">
          What you can do offline:
        </h3>
        <ul class="text-sm text-gray-600 space-y-2 text-left max-w-sm mx-auto">
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-green mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View previously loaded content
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-green mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Draft estimates (saved locally)
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-green mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Browse cached recipes and tips
          </li>
          <li class="flex items-start opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            AI chat (requires internet)
          </li>
          <li class="flex items-start opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Sync inventory updates
          </li>
        </ul>
      </div>

      <!-- Troubleshooting tips -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <details class="text-left">
          <summary class="cursor-pointer text-primary-green hover:text-dark-green font-medium text-sm mb-4">
            Connection troubleshooting tips
          </summary>
          <ul class="text-xs text-gray-600 space-y-1 ml-4">
            <li>• Check if your Wi-Fi or mobile data is turned on</li>
            <li>• Try moving closer to your Wi-Fi router</li>
            <li>• Restart your router or modem</li>
            <li>• Check if other devices can connect to the internet</li>
            <li>• Contact your internet service provider if issues persist</li>
          </ul>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup>
// Set page meta
definePageMeta({
  layout: 'default'
});

// Set page title and description
useHead({
  title: 'Offline | MaaMaa',
  meta: [
    {
      name: 'description',
      content: 'You are currently offline. Check your internet connection to access all MaaMaa features.'
    }
  ]
});

const router = useRouter();

// Reactive data
const isChecking = ref(false);
const isOnline = ref(false);

// Check online status
const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine;
};

// Check connection manually
const checkConnection = async () => {
  isChecking.value = true;
  
  try {
    // Try to fetch a small resource to check connectivity
    const response = await fetch('/favicon.ico', {
      method: 'HEAD',
      cache: 'no-cache'
    });
    
    if (response.ok) {
      isOnline.value = true;
      // If online, redirect to home page or previous page
      router.push('/');
    }
  } catch (error) {
    isOnline.value = false;
  } finally {
    isChecking.value = false;
  }
};

// Refresh the page
const refreshPage = () => {
  window.location.reload();
};

// Go to offline mode (could show cached content)
const goOfflineMode = () => {
  // In a real app, this could switch to a special offline version
  // For now, just go to the home page
  router.push('/');
};

// Set up online/offline event listeners
onMounted(() => {
  updateOnlineStatus();
  
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // Automatically check connection every 30 seconds
  const connectionCheckInterval = setInterval(() => {
    if (!navigator.onLine) {
      checkConnection();
    }
  }, 30000);
  
  // Clean up on unmount
  onUnmounted(() => {
    window.removeEventListener('online', updateOnlineStatus);
    window.removeEventListener('offline', updateOnlineStatus);
    clearInterval(connectionCheckInterval);
  });
});

// Watch for online status changes
watch(isOnline, (newStatus) => {
  if (newStatus) {
    // When back online, show a notification and redirect
    setTimeout(() => {
      router.push('/');
    }, 1000);
  }
});
</script>
