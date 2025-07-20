<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-green to-dark-green flex items-center justify-center px-4">
    <div class="max-w-2xl w-full text-center text-white">
      <!-- Coming Soon Illustration -->
      <div class="mb-8">
        <div class="mx-auto w-40 h-40 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-white z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
        <div class="mb-6">
          <img src="/images/maamaa-logo.png" alt="MaaMaa Logo" class="h-12 mx-auto opacity-90" />
        </div>
      </div>

      <!-- Coming Soon Content -->
      <div class="mb-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          {{ featureName || 'Something Amazing' }}
        </h1>
        <h2 class="text-2xl md:text-3xl font-light mb-6 text-light-green">
          Coming Soon
        </h2>
        <p class="text-white/90 mb-8 text-lg max-w-lg mx-auto">
          {{ featureDescription || 'We\'re working hard to bring you an exciting new feature that will revolutionize your catering experience.' }}
        </p>
        
        <!-- Features preview -->
        <div v-if="features.length > 0" class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
          <h3 class="font-semibold mb-4 text-center">What to expect:</h3>
          <ul class="space-y-2">
            <li v-for="feature in features" :key="feature" class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-light-green mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm">{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Launch timeline -->
      <div class="mb-8">
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
          <div class="flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-light-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="font-semibold">Expected Launch</span>
          </div>
          <p class="text-2xl font-bold text-light-green">{{ expectedLaunch || 'Q2 2025' }}</p>
          <div v-if="countdown" class="mt-4">
            <div class="grid grid-cols-4 gap-4 text-center">
              <div>
                <div class="text-2xl font-bold">{{ countdown.days }}</div>
                <div class="text-xs text-white/70">Days</div>
              </div>
              <div>
                <div class="text-2xl font-bold">{{ countdown.hours }}</div>
                <div class="text-xs text-white/70">Hours</div>
              </div>
              <div>
                <div class="text-2xl font-bold">{{ countdown.minutes }}</div>
                <div class="text-xs text-white/70">Minutes</div>
              </div>
              <div>
                <div class="text-2xl font-bold">{{ countdown.seconds }}</div>
                <div class="text-xs text-white/70">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress indicator -->
      <div class="mb-8">
        <div class="flex items-center justify-between text-sm mb-2">
          <span>Development Progress</span>
          <span>{{ progress }}%</span>
        </div>
        <div class="w-full bg-white/20 rounded-full h-3">
          <div 
            class="bg-gradient-to-r from-light-green to-white h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
            :style="{ width: `${progress}%` }"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Notification signup -->
      <div class="mb-8">
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
          <h3 class="text-lg font-semibold mb-4">Be the First to Know</h3>
          <p class="text-sm text-white/90 mb-4">
            Get notified when this feature launches and be among the first to try it!
          </p>
          <div class="flex space-x-2 max-w-sm mx-auto">
            <input
              v-model="notificationEmail"
              type="email"
              placeholder="your@email.com"
              class="flex-1 px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              @click="subscribeToUpdates"
              :disabled="isSubscribing"
              class="bg-white/20 hover:bg-white/30 disabled:bg-white/10 px-4 py-2 rounded-lg font-medium transition duration-200 whitespace-nowrap"
            >
              {{ isSubscribing ? 'Subscribing...' : 'Notify Me' }}
            </button>
          </div>
          <p v-if="subscriptionMessage" class="text-sm mt-2" :class="subscriptionSuccess ? 'text-light-green' : 'text-red-300'">
            {{ subscriptionMessage }}
          </p>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="space-y-4">
        <div class="flex space-x-4 justify-center">
          <NuxtLink 
            to="/"
            class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
          >
            Back to Home
          </NuxtLink>
          <NuxtLink 
            to="/contact"
            class="bg-light-green hover:bg-white text-white hover:text-dark-green px-6 py-3 rounded-lg font-medium transition duration-200"
          >
            Contact Us
          </NuxtLink>
        </div>
      </div>

      <!-- Social proof or testimonials -->
      <div class="mt-12 pt-8 border-t border-white/20">
        <p class="text-sm text-white/70 mb-4">
          Join {{ subscriberCount.toLocaleString() }}+ users already waiting for this feature
        </p>
        <div class="flex justify-center space-x-6">
          <a href="#" class="text-white/70 hover:text-white transition duration-200" aria-label="Facebook">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="#" class="text-white/70 hover:text-white transition duration-200" aria-label="Twitter">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" class="text-white/70 hover:text-white transition duration-200" aria-label="Instagram">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props for customization
const props = defineProps({
  featureName: {
    type: String,
    default: ''
  },
  featureDescription: {
    type: String,
    default: ''
  },
  expectedLaunch: {
    type: String,
    default: ''
  },
  launchDate: {
    type: Date,
    default: null
  },
  features: {
    type: Array,
    default: () => []
  },
  progress: {
    type: Number,
    default: 65
  }
});

// Set page meta
definePageMeta({
  layout: false // Use no layout for full-screen experience
});

// Set page title and description
useHead({
  title: computed(() => `${props.featureName || 'Coming Soon'} | MaaMaa`),
  meta: [
    {
      name: 'description',
      content: computed(() => props.featureDescription || 'An exciting new feature is coming to MaaMaa. Be the first to know when it launches.')
    }
  ]
});

// Reactive data
const notificationEmail = ref('');
const isSubscribing = ref(false);
const subscriptionMessage = ref('');
const subscriptionSuccess = ref(false);
const subscriberCount = ref(1247); // This could be fetched from an API
const countdown = ref(null);

// Get feature info from route query params
const route = useRoute();
onMounted(() => {
  // You can pass feature details via query params
  if (route.query.feature) {
    // This allows dynamic coming soon pages for different features
  }
});

// Countdown timer
const updateCountdown = () => {
  if (!props.launchDate) return;
  
  const now = new Date().getTime();
  const distance = props.launchDate.getTime() - now;
  
  if (distance > 0) {
    countdown.value = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  } else {
    countdown.value = null;
  }
};

// Set up countdown timer
onMounted(() => {
  if (props.launchDate) {
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    onUnmounted(() => {
      clearInterval(countdownInterval);
    });
  }
});

// Subscribe to updates
const subscribeToUpdates = async () => {
  if (!notificationEmail.value) {
    subscriptionMessage.value = 'Please enter your email address';
    subscriptionSuccess.value = false;
    return;
  }
  
  if (!isValidEmail(notificationEmail.value)) {
    subscriptionMessage.value = 'Please enter a valid email address';
    subscriptionSuccess.value = false;
    return;
  }
  
  isSubscribing.value = true;
  subscriptionMessage.value = '';
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would typically call your backend API
    console.log('Subscribing email for feature updates:', notificationEmail.value);
    
    subscriptionMessage.value = 'Thank you! We\'ll notify you when this feature launches.';
    subscriptionSuccess.value = true;
    notificationEmail.value = '';
    
    // Increment subscriber count
    subscriberCount.value += 1;
    
  } catch (error) {
    console.error('Failed to subscribe:', error);
    subscriptionMessage.value = 'Failed to subscribe. Please try again later.';
    subscriptionSuccess.value = false;
  } finally {
    isSubscribing.value = false;
  }
};

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
</script>
