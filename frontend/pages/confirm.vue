<template>
  <main class="min-h-screen bg-pale-green flex items-center justify-center px-4 py-12">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-primary-green p-4">
          <h2 class="text-2xl font-bold text-white text-center">Email Confirmation</h2>
        </div>
        <div class="p-6">
          <div v-if="loading" class="text-center py-8" role="status" aria-live="polite">
            <svg class="animate-spin h-10 w-10 mx-auto text-primary-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="mt-4 text-gray-600">Verifying your email...</p>
          </div>
          
          <div v-else-if="error" class="text-center py-8" role="alert" aria-live="assertive">
            <div class="mb-4 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Verification Failed</h3>
            <p class="text-gray-600 mb-4">{{ error }}</p>
            <p class="text-sm text-gray-500 mb-4">If you already confirmed this address, you can try signing in.</p>
            <NuxtLink to="/login" class="btn-primary">Go to Login</NuxtLink>
          </div>
          
          <div v-else class="text-center py-8" role="status" aria-live="polite">
            <div class="mb-4 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Email Verified!</h3>
            <p class="text-gray-600 mb-4">Your email has been verified. Taking you to MaaMaa…</p>
            <NuxtLink to="/chat" class="btn-primary">Continue to MaaMaa</NuxtLink>
          </div>
        </div>
      </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: false
});

const loading = ref(true);
const error = ref('');
const success = ref(false);

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();

const markVerified = () => {
  success.value = true;
  setTimeout(() => router.replace('/chat'), 2000);
};

onMounted(async () => {
  try {
    const callbackError = route.query.error_description || route.query.error;
    if (callbackError) {
      throw new Error(String(callbackError));
    }

    const code = typeof route.query.code === 'string' ? route.query.code : '';
    const tokenHash = typeof route.query.token_hash === 'string' ? route.query.token_hash : '';
    const tokenType = typeof route.query.type === 'string' ? route.query.type : '';

    if (code) {
      // The Nuxt Supabase client uses PKCE. Its pre-plugin may already have
      // exchanged the callback code, so check the session before exchanging.
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user?.email_confirmed_at) {
        markVerified();
        return;
      }

      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) throw exchangeError;
      if (!data.session?.user?.email_confirmed_at) {
        throw new Error('The confirmation link did not create a verified session. Request a new link and try again.');
      }
      markVerified();
      return;
    }

    if (tokenHash && tokenType) {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: tokenType,
      });
      if (verifyError) throw verifyError;
      if (!data.user?.email_confirmed_at) {
        throw new Error('The confirmation link did not verify this email address. Request a new link and try again.');
      }
      markVerified();
      return;
    }

    if (route.hash) {
      const hashParams = new URLSearchParams(route.hash.slice(1));
      const hashError = hashParams.get('error_description') || hashParams.get('error');
      if (hashError) throw new Error(hashError);

      // The browser client normally adopts implicit-flow tokens automatically.
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user?.email_confirmed_at) {
        markVerified();
        return;
      }

      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      if (accessToken && refreshToken) {
        const { data, error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (sessionError) throw sessionError;
        if (data.user?.email_confirmed_at) {
          markVerified();
          return;
        }
      }
    }

    error.value = 'This page did not receive a valid confirmation link. Open the newest confirmation email, or sign in if you have already confirmed your address.';
  } catch (e) {
    error.value = e.message || 'We could not verify this email link. Request a new link and try again.';
  } finally {
    loading.value = false;
  }
});
</script>
