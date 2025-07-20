<template>
  <div class="min-h-screen bg-pale-green py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-primary-green p-4">
          <h2 class="text-2xl font-bold text-white text-center">Email Confirmation</h2>
        </div>
        <div class="p-6">
          <div v-if="loading" class="text-center py-8">
            <svg class="animate-spin h-10 w-10 mx-auto text-primary-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="mt-4 text-gray-600">Verifying your email...</p>
          </div>
          
          <div v-else-if="error" class="text-center py-8">
            <div class="mb-4 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Verification Failed</h3>
            <p class="text-gray-600 mb-4">{{ error }}</p>
            <NuxtLink to="/login" class="btn-primary">Go to Login</NuxtLink>
          </div>
          
          <div v-else class="text-center py-8">
            <div class="mb-4 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Email Verified!</h3>
            <p class="text-gray-600 mb-4">Your email has been successfully verified. You can now log in to your account.</p>
            <NuxtLink to="/login" class="btn-primary">Log In</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true);
const error = ref('');
const success = ref(false);

const route = useRoute();
const { $supabase } = useNuxtApp();

onMounted(async () => {
  try {
    // Check if there's a hash in the URL (this happens when redirected after email confirmation)
    const hash = route.hash;
    
    if (hash) {
      const { error: confirmError } = await $supabase.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN') {
          success.value = true;
        }
      });
      
      if (confirmError) {
        error.value = confirmError.message || 'Failed to verify your email.';
      }
    } else {
      // If there's no hash, likely this is after registration but before confirmation
      error.value = 'Please check your email for a confirmation link.';
    }
  } catch (e) {
    error.value = e.message || 'An error occurred during verification.';
  } finally {
    loading.value = false;
  }
});
</script>
