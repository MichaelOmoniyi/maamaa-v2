<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-lg w-full text-center">
      <!-- Error Illustration -->
      <div class="mb-8">
        <div 
          class="mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-6"
          :class="getErrorIconClass()"
        >
          <component :is="getErrorIcon()" class="h-16 w-16 text-white" />
        </div>
        <h1 class="text-6xl font-bold mb-4" :class="getErrorColorClass()">
          {{ error.statusCode || 'ERROR' }}
        </h1>
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

      <!-- Helpful Links for 404 -->
      <div v-if="error.statusCode === 404" class="mt-12 pt-8 border-t border-gray-200">
        <h3 class="text-lg font-semibold text-dark-text mb-4">
          Maybe you were looking for:
        </h3>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <NuxtLink 
            to="/about"
            class="text-primary-green hover:text-dark-green font-medium"
          >
            About Us
          </NuxtLink>
          <NuxtLink 
            to="/estimator"
            class="text-primary-green hover:text-dark-green font-medium"
          >
            Get Estimate
          </NuxtLink>
          <NuxtLink 
            to="/pricing"
            class="text-primary-green hover:text-dark-green font-medium"
          >
            Pricing
          </NuxtLink>
          <NuxtLink 
            to="/usecases"
            class="text-primary-green hover:text-dark-green font-medium"
          >
            Use Cases
          </NuxtLink>
        </div>
      </div>

      <!-- Report Error for 500+ errors -->
      <div v-if="error.statusCode >= 500" class="mt-8 pt-6 border-t border-gray-200">
        <p class="text-sm text-gray-500 mb-4">
          If this problem persists, please let us know.
        </p>
        <NuxtLink 
          to="/contact"
          class="text-primary-green hover:text-dark-green font-medium text-sm"
        >
          Report this error
        </NuxtLink>
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

const getErrorIcon = () => {
  const statusCode = props.error.statusCode;
  
  if (statusCode === 404) {
    return resolveComponent('SearchIcon');
  } else if (statusCode >= 500) {
    return resolveComponent('ServerErrorIcon');
  } else if (statusCode === 401 || statusCode === 403) {
    return resolveComponent('LockIcon');
  } else {
    return resolveComponent('ExclamationIcon');
  }
};

const getErrorIconClass = () => {
  const statusCode = props.error.statusCode;
  
  if (statusCode === 404) {
    return 'bg-gradient-to-br from-primary-green to-dark-green';
  } else if (statusCode >= 500) {
    return 'bg-gradient-to-br from-red-500 to-red-600';
  } else if (statusCode === 401 || statusCode === 403) {
    return 'bg-gradient-to-br from-orange-500 to-orange-600';
  } else {
    return 'bg-gradient-to-br from-yellow-500 to-yellow-600';
  }
};

const getErrorColorClass = () => {
  const statusCode = props.error.statusCode;
  
  if (statusCode === 404) {
    return 'text-primary-green';
  } else if (statusCode >= 500) {
    return 'text-red-500';
  } else if (statusCode === 401 || statusCode === 403) {
    return 'text-orange-500';
  } else {
    return 'text-yellow-500';
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
  try {
    if (process.client) {
      await router.replace(route.fullPath);
    }
  } catch (err) {
    router.push('/');
  }
};

// Define icon components inline
const SearchIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  `
};

const ServerErrorIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  `
};

const LockIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  `
};

const ExclamationIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  `
};
</script>
