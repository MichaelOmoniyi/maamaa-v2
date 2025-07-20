<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-lg w-full text-center">
      <!-- Error Illustration -->
      <div class="mb-8">
        <div class="mx-auto w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 class="text-6xl font-bold text-red-500 mb-4">{{ error.statusCode || 'ERROR' }}</h1>
      </div>

      <!-- Error Content -->
      <div class="mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-dark-text mb-4">
          {{ getErrorTitle() }}
        </h2>
        <p class="text-gray-600 mb-6">
          {{ getErrorMessage() }}
        </p>
        
        <!-- Additional error details for development -->
        <div v-if="isDevelopment && error.message" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
          <h4 class="font-semibold text-red-800 mb-2">Error Details:</h4>
          <p class="text-sm text-red-700 font-mono">{{ error.message }}</p>
          <div v-if="error.stack" class="mt-2">
            <details class="text-xs">
              <summary class="cursor-pointer text-red-600 hover:text-red-800">Stack Trace</summary>
              <pre class="mt-2 text-red-600 whitespace-pre-wrap">{{ error.stack }}</pre>
            </details>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-4">
        <button 
          @click="handleClearError"
          class="w-full bg-primary-green hover:bg-dark-green text-white px-6 py-3 rounded-lg font-medium transition duration-200"
        >
          Try Again
        </button>
        
        <div class="flex space-x-4">
          <NuxtLink 
            to="/"
            class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition duration-200 inline-block text-center"
          >
            Go Home
          </NuxtLink>
          <button 
            @click="goBack"
            class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>

      <!-- Report Error -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <p class="text-sm text-gray-500 mb-4">
          If this problem persists, please let us know.
        </p>
        <button 
          @click="showReportForm = !showReportForm"
          class="text-primary-green hover:text-dark-green font-medium text-sm"
        >
          Report this error
        </button>
        
        <!-- Error Report Form -->
        <div v-if="showReportForm" class="mt-4 bg-white border border-gray-200 rounded-lg p-4 text-left">
          <form @submit.prevent="submitErrorReport" class="space-y-4">
            <div>
              <label for="userEmail" class="block text-sm font-medium text-gray-700 mb-1">
                Your Email (optional)
              </label>
              <input
                id="userEmail"
                v-model="reportForm.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-primary-green focus:border-primary-green"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label for="errorDescription" class="block text-sm font-medium text-gray-700 mb-1">
                What were you trying to do?
              </label>
              <textarea
                id="errorDescription"
                v-model="reportForm.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-primary-green focus:border-primary-green"
                placeholder="Describe what you were doing when this error occurred..."
              ></textarea>
            </div>
            
            <div class="flex space-x-3">
              <button
                type="submit"
                :disabled="isSubmittingReport"
                class="flex-1 bg-primary-green hover:bg-dark-green disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                {{ isSubmittingReport ? 'Sending...' : 'Send Report' }}
              </button>
              <button
                type="button"
                @click="showReportForm = false"
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

// Set page meta
definePageMeta({
  layout: 'default'
});

const router = useRouter();
const route = useRoute();

// Reactive data
const showReportForm = ref(false);
const isSubmittingReport = ref(false);
const reportForm = ref({
  email: '',
  description: ''
});

// Check if in development mode
const isDevelopment = process.dev;

// Set page title based on error
useHead({
  title: computed(() => `${props.error.statusCode || 'Error'} - ${getErrorTitle()} | MaaMaa`),
  meta: [
    {
      name: 'description',
      content: computed(() => getErrorMessage())
    }
  ]
});

// Helper functions
const getErrorTitle = () => {
  const statusCode = props.error.statusCode;
  
  switch (statusCode) {
    case 400:
      return 'Bad Request';
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Access Forbidden';
    case 404:
      return 'Page Not Found';
    case 408:
      return 'Request Timeout';
    case 429:
      return 'Too Many Requests';
    case 500:
      return 'Internal Server Error';
    case 502:
      return 'Bad Gateway';
    case 503:
      return 'Service Unavailable';
    case 504:
      return 'Gateway Timeout';
    default:
      return 'Something Went Wrong';
  }
};

const getErrorMessage = () => {
  const statusCode = props.error.statusCode;
  
  switch (statusCode) {
    case 400:
      return 'The request you made was invalid. Please check your input and try again.';
    case 401:
      return 'You need to sign in to access this page. Please log in and try again.';
    case 403:
      return 'You don\'t have permission to access this resource. Please contact support if you believe this is an error.';
    case 404:
      return 'The page you\'re looking for doesn\'t exist. It might have been moved, deleted, or you entered the wrong URL.';
    case 408:
      return 'The request took too long to process. Please check your internet connection and try again.';
    case 429:
      return 'You\'ve made too many requests. Please wait a moment before trying again.';
    case 500:
      return 'We\'re experiencing technical difficulties. Our team has been notified and is working on a fix.';
    case 502:
      return 'There\'s a problem with our server connection. Please try again in a few minutes.';
    case 503:
      return 'Our service is temporarily unavailable. We\'re working to restore it as quickly as possible.';
    case 504:
      return 'The server is taking too long to respond. Please try again later.';
    default:
      return props.error.message || 'An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.';
  }
};

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
};

const handleClearError = async () => {
  // Clear the error and try to reload the page or navigate to a safe route
  try {
    if (process.client) {
      // If we're on the client, try to reload the current route
      await router.replace(route.fullPath);
    }
  } catch (err) {
    // If that fails, go to home page
    router.push('/');
  }
};

const submitErrorReport = async () => {
  isSubmittingReport.value = true;
  
  try {
    // Prepare error report data
    const errorReport = {
      statusCode: props.error.statusCode,
      message: props.error.message,
      stack: props.error.stack,
      url: route.fullPath,
      userAgent: process.client ? navigator.userAgent : '',
      timestamp: new Date().toISOString(),
      userEmail: reportForm.value.email,
      userDescription: reportForm.value.description
    };
    
    // Here you would typically send this to your error reporting service
    // For now, we'll just log it and show a success message
    console.log('Error report:', errorReport);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    alert('Thank you for your report! We\'ll look into this issue.');
    
    // Reset form
    showReportForm.value = false;
    reportForm.value = { email: '', description: '' };
    
  } catch (err) {
    console.error('Failed to submit error report:', err);
    alert('Failed to submit report. Please try again later.');
  } finally {
    isSubmittingReport.value = false;
  }
};

// Log error for debugging
if (isDevelopment) {
  console.error('Error page props:', props.error);
}
</script>
