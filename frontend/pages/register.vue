<template>
  <div class="min-h-screen items-center justify-center flex md:px-6 md:py-2">
    <!-- Left side illustration -->
    <div class="hidden md:flex md:flex-col h-[95vh] md:w-1/2 bg-dark-green relative rounded-xl">
      <div class="relative w-full h-[60%] bg-cover bg-center rounded-t-lg" style="background-image: url('/images/hero.png'); opacity: 0.6;"></div>
      <div class="relative inset-0 w-full h-[40%] flex flex-col justify-end p-8 text-white">
        <h1 class="text-4xl font-bold mb-4">Let's plan kitchens that feed people well.</h1>
        <p class="text-lg">From portion planning to smart shopping, MaaMaa is your kitchen's thinking partner. Let's get you set up.</p>
      </div>
    </div>
    
    <!-- Right side form -->
    <div class="w-full md:w-1/2 flex flex-col h-full">
      <!-- Header with logo and sign up link -->
      <div class="flex justify-between items-center p-6 md:px-12 lg:px-16">
        <img src="/images/LOGO-111-1.png" alt="MaaMaa Logo" class="h-8 hidden md:block" />
        <div class="text-right">
          Already have an account? <NuxtLink to="/login" class="text-primary-green font-medium">Sign in</NuxtLink>
        </div>
      </div>
      
      <!-- Form container -->
      <div class="flex-grow flex flex-col justify-center px-6 md:px-12 lg:px-16">
        <div class="w-full mx-auto md:mx-0 md:w-full">
          <h2 class="text-3xl font-bold mb-2">Create an Account</h2>
          <p class="text-gray-600 mb-8">Please enter your details to create an account.</p>
          
          <form @submit.prevent="register">
            <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {{ error }}
            </div>
            
            <div v-if="successMessage" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {{ successMessage }}
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-600 text-sm mb-1" for="email">Email address</label>
              <input
                v-model="form.email"
                class="border rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-green"
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                :disabled="loading"
              />
            </div>
            
            <div class="mb-6">
              <label class="block text-gray-600 text-sm mb-1" for="password">Password</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  class="border rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-green"
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  required
                  :disabled="loading"
                />
                <button 
                  type="button" 
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  @click="showPassword = !showPassword"
                >
                  <svg v-if="showPassword" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="mb-6">
              <button
                class="bg-primary-green hover:bg-dark-green text-white font-medium py-3 px-4 rounded-md w-full transition duration-200"
                type="submit"
                :disabled="loading"
              >
                <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Creating account...' : 'Create account' }}
              </button>
            </div>
            
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            
            <div class="space-y-3">
              <button
                type="button"
                class="flex items-center justify-center w-full border border-gray-300 rounded-md py-3 px-4 text-gray-700 hover:bg-gray-50 transition duration-200"
              >
                <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              
              <button
                type="button"
                class="flex items-center justify-center w-full border border-gray-300 rounded-md py-3 px-4 text-gray-700 hover:bg-gray-50 transition duration-200"
              >
                <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.3622 1C16.4731 1 16.5841 1 16.8061 1C16.9393 2.25447 16.3178 3.01005 15.7186 3.55279C15.1416 4.09553 14.3646 4.55447 13.3661 4.44472C13.2552 3.22513 13.8767 2.47513 14.4759 1.93782C15.0307 1.42513 15.9186 1.05279 16.3622 1Z" fill="black"/>
                  <path d="M21.3488 16.8812C21.3488 16.9142 21.3488 16.9471 21.3488 16.9801C21.0601 18.1162 20.5498 19.0898 19.9062 19.9311C19.3292 20.6725 18.6188 21.6461 17.3203 21.6461C16.1881 21.6461 15.4443 21.0265 14.4013 21.0044C13.3139 20.9824 12.6479 21.5361 11.5379 21.6681C11.4269 21.6681 11.316 21.6681 11.1829 21.6461C10.1177 21.5361 9.29643 20.6064 8.71941 19.8651C7.25909 18.0044 6.09689 15.6571 6.00591 12.9581C6.00591 12.6351 6.00591 12.3122 6.00591 11.9892C6.11907 9.68515 7.45909 8.05761 9.22994 7.45908C10.1399 7.17127 11.2055 7.34996 11.9825 7.81444C12.5373 8.14566 13.1143 8.58907 13.6913 8.58907C14.2461 8.58907 14.8231 8.14566 15.4001 7.81444C16.4212 7.24098 17.5535 6.78857 18.9027 6.92269C19.4575 6.96562 20.0123 7.07367 20.5226 7.26843C22.5196 8.03608 23.8152 9.94098 23.9948 12.6351C24.0171 12.7652 24.0171 12.8953 24.0171 13.0254C23.9948 14.2944 23.5734 15.3339 23.0631 16.1973C22.6194 16.9471 22.0646 17.6215 21.3488 16.8812Z" fill="black"/>
                  <path d="M0 16.9691C0 16.8169 0.0222222 16.6647 0.0222222 16.5125C0.177778 15.5389 0.688889 14.7976 1.24444 14.1672C2.17778 13.1715 3.28889 12.5411 4.57778 12.5411C5.88889 12.5411 6.77778 13.3494 7.95556 13.3494C9.15556 13.3494 9.84444 12.5411 11.2889 12.5411C11.8667 12.5411 12.4444 12.6712 12.9333 12.9512C12.4889 13.5167 12.0889 14.1672 11.8 14.8632C11.2667 16.0863 11.1556 17.7139 11.7333 19.0691C11.0444 19.0691 10.5111 18.6257 10 18.2692C8.91111 17.5732 8.02222 16.9691 6.33333 16.9691C4.62222 16.9691 3.71111 17.5732 2.64444 18.2692C2.13333 18.6257 1.57778 19.0691 0.911111 19.0691C0.555556 18.4386 0.288889 17.7139 0 16.9691Z" fill="black"/>
                </svg>
                Continue with Apple
              </button>
            </div>
            
            <div class="my-6 text-center text-sm text-gray-600">
              <p>
                Forgot password?
                <NuxtLink to="/forgot-password" class="text-primary-green hover:underline">Reset it here</NuxtLink>
              </p>
            </div>
          </form>
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
});

const loading = ref(false);
const error = ref('');
const successMessage = ref('');
const showPassword = ref(false);

const register = async () => {
  loading.value = true;
  error.value = '';
  successMessage.value = '';

  try {
    const { data, error: registerError } = await authStore.register(
      '', // Name is no longer collected on this form 
      form.email, 
      form.password
    );
    
    if (registerError) {
      error.value = registerError.message || 'Failed to register. Please try again.';
      return;
    }

    // Registration successful
    successMessage.value = 'Registration successful! Kindly check your email for verification.';
    
    // Auto-login the user
    const { error: loginError } = await authStore.login(form.email, form.password);
    
    if (loginError) {
      // If login fails, still redirect to login page
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      return;
    }
    
    // If login successful, redirect to chat page after 2 seconds
    setTimeout(() => {
      router.push('/chat');
    }, 3000);
    
  } catch (e) {
    error.value = e.message || 'An error occurred during registration.';
  } finally {
    loading.value = false;
  }
};

// Reset error when form changes
watch(() => [form.email, form.password], () => {
  error.value = '';
});
</script>