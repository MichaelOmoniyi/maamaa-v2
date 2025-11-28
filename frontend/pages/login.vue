<template>
  <div class="min-h-screen bg-pale-green items-center justify-center flex py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-primary-green p-4">
          <h2 class="text-2xl font-bold text-white text-center">Log In</h2>
        </div>
        <div class="p-6">
          <form @submit.prevent="login">
            <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {{ error }}
            </div>
            
            <div class="mb-4">
              <label class="block text-dark-text text-sm font-bold mb-2" for="email">Email</label>
              <input
                v-model="form.email"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                :disabled="loading"
              />
            </div>
            <div class="mb-6">
              <label class="block text-dark-text text-sm font-bold mb-2" for="password">Password</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  class="shadow appearance-none border rounded w-full py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="********"
                  required
                  :disabled="loading"
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
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <input
                  v-model="form.rememberMe"
                  class="mr-2 leading-tight"
                  type="checkbox"
                  id="remember"
                  :disabled="loading"
                />
                <label class="text-sm text-gray-600" for="remember">
                  Remember me
                </label>
              </div>
              <div>
                <NuxtLink to="/forgot-password" class="text-sm text-primary-green hover:underline">
                  Forgot Password?
                </NuxtLink>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <button
                class="btn-primary w-full text-center flex items-center justify-center"
                type="submit"
                :disabled="loading"
              >
                <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Logging in...' : 'Log In' }}
              </button>
            </div>
          </form>
          <div class="mt-4 text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <NuxtLink to="/register" class="text-primary-green hover:underline">Register</NuxtLink>
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

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
});

const loading = ref(false);
const error = ref('');
const showPassword = ref(false);

const login = async () => {
  loading.value = true;
  error.value = '';

  try {
    const { data, error: loginError } = await authStore.login(form.email, form.password);
    
    if (loginError) {
      error.value = loginError.message || 'Failed to login. Please check your credentials.';
      return;
    }

    // Login successful, redirect to chat page
    router.push('/chat');
  } catch (e) {
    error.value = e.message || 'An error occurred during login.';
  } finally {
    loading.value = false;
  }
};

// Reset error when form changes
watch(() => [form.email, form.password], () => {
  error.value = '';
});
</script>