<template>
  <div class="min-h-screen bg-pale-green items-center justify-center flex py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-primary-green p-4">
          <h2 class="text-2xl font-bold text-white text-center">Reset Password</h2>
        </div>
        <div class="p-6">
          <div v-if="!emailSent">
            <p class="text-gray-600 mb-6 text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form @submit.prevent="sendResetEmail">
              <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {{ error }}
              </div>
              
              <div class="mb-6">
                <label class="block text-dark-text text-sm font-bold mb-2" for="email">Email Address</label>
                <input
                  v-model="email"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  :disabled="loading"
                />
              </div>
              
              <div class="flex items-center justify-center mb-4">
                <button
                  class="btn-primary w-full text-center flex items-center justify-center"
                  type="submit"
                  :disabled="loading"
                >
                  <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ loading ? 'Sending...' : 'Send Reset Link' }}
                </button>
              </div>
            </form>
          </div>
          
          <!-- Success message -->
          <div v-else class="text-center">
            <div class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              <div class="flex items-center justify-center mb-2">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p class="font-medium">Reset link sent!</p>
              <p class="text-sm mt-1">
                We've sent a password reset link to <strong>{{ email }}</strong>. 
                Please check your email and follow the instructions to reset your password.
              </p>
            </div>
            
            <p class="text-sm text-gray-600 mb-4">
              Didn't receive the email? Check your spam folder or try again with a different email address.
            </p>
            
            <button 
              @click="resetForm"
              class="text-primary-green hover:underline text-sm font-medium"
            >
              Try again with different email
            </button>
          </div>
          
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Remember your password?
              <NuxtLink to="/login" class="text-primary-green hover:underline">Back to Login</NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';

definePageMeta({
  layout: false
});

const authStore = useAuthStore();

const email = ref('');
const loading = ref(false);
const error = ref('');
const emailSent = ref(false);

const sendResetEmail = async () => {
  loading.value = true;
  error.value = '';

  try {
    console.log("Sending password reset email to:", email.value);
    
    const { error: resetError } = await authStore.resetPassword(email.value);
    
    if (resetError) {
      error.value = resetError.message || 'Failed to send reset email. Please try again.';
      return;
    }

    console.log("Password reset email sent successfully");
    emailSent.value = true;
  } catch (e) {
    console.error("Reset password error:", e);
    error.value = e.message || 'An error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  emailSent.value = false;
  email.value = '';
  error.value = '';
};

// Reset error when email changes
watch(() => email.value, () => {
  error.value = '';
});
</script>
