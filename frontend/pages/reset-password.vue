<template>
  <div class="min-h-screen bg-pale-green items-center justify-center flex py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-primary-green p-4">
          <h2 class="text-2xl font-bold text-white text-center">Set New Password</h2>
        </div>
        <div class="p-6">
          <div v-if="!passwordReset">
            <p class="text-gray-600 mb-6 text-center">
              Enter your new password below.
            </p>
            
            <form @submit.prevent="updatePassword">
              <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {{ error }}
              </div>
              
              <div class="mb-4">
                <label class="block text-dark-text text-sm font-bold mb-2" for="password">New Password</label>
                <div class="relative">
                  <input
                    v-model="form.password"
                    class="shadow appearance-none border rounded w-full py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Enter new password"
                    required
                    :disabled="loading"
                    minlength="6"
                  />
                  <button 
                    type="button" 
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 z-10"
                    @click="showPassword = !showPassword"
                  >
                    <svg v-if="showPassword" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    <svg v-else class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="mb-6">
                <label class="block text-dark-text text-sm font-bold mb-2" for="confirmPassword">Confirm New Password</label>
                <div class="relative">
                  <input
                    v-model="form.confirmPassword"
                    class="shadow appearance-none border rounded w-full py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="Confirm new password"
                    required
                    :disabled="loading"
                    minlength="6"
                  />
                  <button 
                    type="button" 
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 z-10"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <svg v-if="showConfirmPassword" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    <svg v-else class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div v-if="passwordMismatch" class="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                Passwords do not match.
              </div>
              
              <div class="flex items-center justify-center">
                <button
                  class="btn-primary w-full text-center flex items-center justify-center"
                  type="submit"
                  :disabled="loading || passwordMismatch || !form.password || !form.confirmPassword"
                >
                  <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ loading ? 'Updating Password...' : 'Update Password' }}
                </button>
              </div>
            </form>
          </div>
          
          <!-- Success message -->
          <div v-else class="text-center">
            <div class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              <div class="flex items-center justify-center mb-2">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p class="font-medium">Password updated successfully!</p>
              <p class="text-sm mt-1">
                Your password has been updated. You can now log in with your new password.
              </p>
            </div>
            
            <NuxtLink 
              to="/login" 
              class="btn-primary inline-block text-center"
            >
              Go to Login
            </NuxtLink>
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
const router = useRouter();
const route = useRoute();

const form = reactive({
  password: '',
  confirmPassword: ''
});

const loading = ref(false);
const error = ref('');
const passwordReset = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Check if passwords match
const passwordMismatch = computed(() => {
  return form.password && form.confirmPassword && form.password !== form.confirmPassword;
});

const updatePassword = async () => {
  if (passwordMismatch.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  if (form.password.length < 6) {
    error.value = 'Password must be at least 6 characters long.';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const { error: updateError } = await authStore.updatePassword(form.password);
    
    if (updateError) {
      if (updateError.message.includes('Auth session missing')) {
        error.value = 'Your reset link has expired. Please request a new password reset.';
      } else {
        error.value = updateError.message || 'Failed to update password. Please try again.';
      }
      return;
    }

    passwordReset.value = true;
  } catch (e) {
    error.value = e.message || 'Failed to update password. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Reset error when form changes
watch(() => [form.password, form.confirmPassword], () => {
  error.value = '';
});

// Check if we have a valid session on mount
onMounted(async () => {
  const supabase = useSupabaseClient();
  
  // Check for auth code in URL parameters (from email link)
  const code = route.query.code;
  
  if (code) {
    try {
      // Exchange the code for a session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        error.value = 'Invalid or expired reset link. Please request a new password reset.';
        return;
      }
      
      // Remove the code from URL for cleaner experience
      await router.replace({ query: {} });
      
    } catch (e) {
      error.value = 'Error processing reset link. Please try again.';
    }
  }
  
  // Check if we have a valid session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    error.value = 'Your reset link has expired or is invalid. Please request a new password reset.';
  }
});
</script>
