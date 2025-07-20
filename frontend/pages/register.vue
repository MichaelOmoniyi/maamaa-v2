<template>
  <div class="min-h-screen bg-pale-green py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-primary-green p-4">
          <h2 class="text-2xl font-bold text-white text-center">Create an Account</h2>
        </div>
        <div class="p-6">
          <form @submit.prevent="register">
            <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {{ error }}
            </div>
            
            <div v-if="successMessage" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {{ successMessage }}
            </div>
            
            <div class="mb-4">
              <label class="block text-dark-text text-sm font-bold mb-2" for="name">Full Name</label>
              <input
                v-model="form.name"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="John Doe"
                required
                :disabled="loading"
              />
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
            <div class="mb-4">
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
            <div class="mb-6">
              <label class="block text-dark-text text-sm font-bold mb-2" for="confirmPassword">Confirm Password</label>
              <input
                v-model="form.confirmPassword"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="********"
                required
                :disabled="loading"
              />
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
                {{ loading ? 'Registering...' : 'Register' }}
              </button>
            </div>
          </form>
          <div class="mt-4 text-center">
            <p class="text-sm text-gray-600">
              Already have an account?
              <NuxtLink to="/login" class="text-primary-green hover:underline">Log In</NuxtLink>
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
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const loading = ref(false);
const error = ref('');
const successMessage = ref('');

const register = async () => {
  loading.value = true;
  error.value = '';
  successMessage.value = '';
  
  // Validate passwords match
  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match';
    loading.value = false;
    return;
  }

  try {
    const { data, error: registerError } = await authStore.register(
      form.name, 
      form.email, 
      form.password
    );
    
    if (registerError) {
      error.value = registerError.message || 'Failed to register. Please try again.';
      return;
    }

    // Registration successful
    successMessage.value = 'Registration successful! Check your email for confirmation.';
    
    // Redirect to login page after 3 seconds
    setTimeout(() => {
      router.push('/login');
    }, 3000);
    
  } catch (e) {
    error.value = e.message || 'An error occurred during registration.';
  } finally {
    loading.value = false;
  }
};

// Reset error when form changes
watch(() => [form.name, form.email, form.password, form.confirmPassword], () => {
  error.value = '';
});
</script>