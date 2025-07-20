<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- Error Illustration -->
      <div class="mb-8">
        <div class="mx-auto w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        <h1 class="text-6xl font-bold text-red-500 mb-4">500</h1>
      </div>

      <!-- Error Content -->
      <div class="mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-dark-text mb-4">
          Server Error
        </h2>
        <p class="text-gray-600 mb-6">
          We're experiencing technical difficulties on our end. Our team has been automatically notified and is working to resolve this issue.
        </p>
        
        <!-- Status indicator -->
        <div class="inline-flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 mb-6">
          <div class="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-800">
              <strong>Status:</strong> We're working on it
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-4">
        <button 
          @click="retryPage"
          :disabled="isRetrying"
          class="w-full bg-primary-green hover:bg-dark-green disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center"
        >
          <svg v-if="isRetrying" xmlns="http://www.w3.org/2000/svg" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isRetrying ? 'Retrying...' : 'Try Again' }}
        </button>
        
        <div class="flex space-x-4">
          <NuxtLink 
            to="/"
            class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition duration-200 inline-block text-center"
          >
            Go Home
          </NuxtLink>
          <NuxtLink 
            to="/contact"
            class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition duration-200 inline-block text-center"
          >
            Contact Support
          </NuxtLink>
        </div>
      </div>

      <!-- What you can do -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <h3 class="text-lg font-semibold text-dark-text mb-4">
          What you can do:
        </h3>
        <ul class="text-sm text-gray-600 space-y-2 text-left max-w-sm mx-auto">
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-green mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Wait a few minutes and try refreshing the page
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-green mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Check our social media for service updates
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-green mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Contact our support team if the issue persists
          </li>
        </ul>
      </div>

      <!-- Auto-retry countdown -->
      <div v-if="autoRetryCountdown > 0" class="mt-8 text-sm text-gray-500">
        <p>
          Automatically retrying in {{ autoRetryCountdown }} seconds...
        </p>
        <div class="w-full bg-gray-200 rounded-full h-1 mt-2">
          <div 
            class="bg-primary-green h-1 rounded-full transition-all duration-1000"
            :style="{ width: `${(30 - autoRetryCountdown) / 30 * 100}%` }"
          ></div>
        </div>
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
  title: '500 - Server Error | MaaMaa',
  meta: [
    {
      name: 'description',
      content: 'We are experiencing technical difficulties. Our team is working to resolve this issue.'
    }
  ]
});

const router = useRouter();
const route = useRoute();

// Reactive data
const isRetrying = ref(false);
const autoRetryCountdown = ref(30);
const retryAttempts = ref(0);
const maxRetryAttempts = 3;

// Auto-retry functionality
let retryInterval = null;

const startAutoRetry = () => {
  if (retryInterval) return;
  
  retryInterval = setInterval(() => {
    autoRetryCountdown.value--;
    
    if (autoRetryCountdown.value <= 0) {
      clearInterval(retryInterval);
      retryInterval = null;
      
      if (retryAttempts.value < maxRetryAttempts) {
        retryPage();
      } else {
        // Stop auto-retry after max attempts
        autoRetryCountdown.value = 0;
      }
    }
  }, 1000);
};

const retryPage = async () => {
  isRetrying.value = true;
  retryAttempts.value++;
  
  // Clear any existing retry interval
  if (retryInterval) {
    clearInterval(retryInterval);
    retryInterval = null;
  }
  
  try {
    // Wait a moment before retrying
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Try to reload the current page
    window.location.reload();
  } catch (error) {
    console.error('Retry failed:', error);
    
    // If retry fails and we haven't exceeded max attempts, start auto-retry again
    if (retryAttempts.value < maxRetryAttempts) {
      autoRetryCountdown.value = 30;
      startAutoRetry();
    }
  } finally {
    isRetrying.value = false;
  }
};

// Start auto-retry when component mounts
onMounted(() => {
  startAutoRetry();
});

// Clean up interval when component unmounts
onUnmounted(() => {
  if (retryInterval) {
    clearInterval(retryInterval);
    retryInterval = null;
  }
});

// Stop auto-retry if user navigates away
watch(() => route.fullPath, () => {
  if (retryInterval) {
    clearInterval(retryInterval);
    retryInterval = null;
  }
});
</script>
