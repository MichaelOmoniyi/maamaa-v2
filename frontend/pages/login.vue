<template>
  <div class="min-h-screen bg-pale-green py-12">
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
              <input
                v-model="form.password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="********"
                required
                :disabled="loading"
              />
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
                <a href="#" class="text-sm text-primary-green hover:underline">
                  Forgot Password?
                </a>
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

const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
});

const loading = ref(false);
const error = ref('');

const login = async () => {
  loading.value = true;
  error.value = '';

  try {
    const { data, error: loginError } = await authStore.login(form.email, form.password);
    
    if (loginError) {
      error.value = loginError.message || 'Failed to login. Please check your credentials.';
      return;
    }

    // Login successful, redirect to home page
    router.push('/');
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