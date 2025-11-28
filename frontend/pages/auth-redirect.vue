<template>
  <div class="min-h-screen bg-pale-green items-center justify-center flex py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-primary-green p-4">
          <h2 class="text-2xl font-bold text-white text-center">Redirecting...</h2>
        </div>
        <div class="p-6 text-center">
          <div v-if="loading" class="mb-4">
            <svg class="animate-spin mx-auto h-8 w-8 text-primary-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="mt-4 text-gray-600">Processing your password reset link...</p>
          </div>

          <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {{ error }}
          </div>

          <div v-if="!loading && !error" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            <p class="font-medium">Success!</p>
            <p class="text-sm mt-1">You will be redirected to reset your password in a moment.</p>
          </div>

          <div class="mt-6">
            <p class="text-sm text-gray-600 mb-4">
              If you're not redirected automatically, click below:
            </p>
            <NuxtLink 
              to="/reset-password" 
              class="btn-primary inline-block text-center"
            >
              Reset Password
            </NuxtLink>
          </div>

          <div class="mt-6">
            <p class="text-sm text-gray-600">
              Having trouble?
              <NuxtLink to="/forgot-password" class="text-primary-green hover:underline">Request new reset link</NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
});

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const supabase = useSupabaseClient();
    
    // Get the auth code/token from URL parameters
    const code = route.query.code;
    
    if (code) {
      console.log('Processing auth code:', code);
      
      // Exchange the code for a session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('Error exchanging code:', exchangeError);
        error.value = 'Invalid or expired reset link. Please request a new password reset.';
        loading.value = false;
        return;
      }

      console.log('Successfully exchanged code for session');
      
      // Wait a moment then redirect to reset password page
      setTimeout(() => {
        router.push('/reset-password');
      }, 2000);
      
    } else {
      error.value = 'No reset code found in the URL. Please use the link from your email.';
      loading.value = false;
    }
    
  } catch (e) {
    console.error('Auth redirect error:', e);
    error.value = 'An error occurred processing your reset link. Please try again.';
    loading.value = false;
  }
});
</script>


