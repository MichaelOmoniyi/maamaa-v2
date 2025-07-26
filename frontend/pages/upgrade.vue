<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <!-- Back Button -->
    <NuxtLink to="/settings" class="inline-flex items-center mb-8 text-gray-600 hover:text-gray-900">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
    </NuxtLink>

    <div v-if="!showPaymentForm">
      <!-- Pricing Plans Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center px-4 py-2 bg-gray-50 rounded-full mb-4">
          <svg class="w-5 h-5 mr-2 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          <span class="text-green-800">Our pricing plans</span>
        </div>
        <h1 class="text-4xl font-bold mb-4">Upgrade your plan</h1>
        <p class="text-gray-600 text-lg">Select from the list of available plans.</p>
      </div>

      <!-- Pricing Plans -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <!-- Free Plan -->
        <div class="border border-gray-200 rounded-2xl p-8 bg-white">
          <h2 class="text-2xl font-bold mb-4">Free</h2>
          <p class="text-gray-600 mb-6">Use Maamaa to get as much recipes as you need, without having to stress.</p>
          
          <div class="mb-8">
            <span class="text-5xl font-bold">N0</span>
            <span class="text-gray-500 ml-2">NGN/month</span>
          </div>
          
          <button @click="stayOnFreePlan" class="w-full py-3 px-4 border border-gray-300 rounded-lg text-center mb-8 hover:bg-gray-50 transition-colors">
            Stay on the free plan
          </button>
          
          <ul class="space-y-4">
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Plan up to 3 events per month</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Get scaled recipes & ingredient quantities</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Basic cost estimates</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Access to standard inventory tracker</span>
            </li>
          </ul>
        </div>
        
        <!-- Premium Plan -->
        <div class="border border-gray-200 rounded-2xl p-8 bg-green-900 text-white">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-bold">Premium</h2>
            <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Recommended</span>
          </div>
          <p class="text-gray-200 mb-6">Built for growing caterers & event pros who want to scale smart.</p>
          
          <div class="mb-8">
            <span class="text-5xl font-bold">N15,000</span>
            <span class="text-gray-300 ml-2">NGN/month</span>
          </div>
          
          <button @click="showPaymentForm = true" class="w-full py-3 px-4 bg-white text-green-900 rounded-lg text-center mb-8 hover:bg-gray-100 transition-colors">
            Get premium plan
          </button>
          
          <p class="text-gray-300 mb-4">Everything on the free plan, plus:</p>
          
          <ul class="space-y-4">
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Live quotes from trusted suppliers</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Alerts, auto-deductions after events, low stock notices</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Professional inventory tracker</span>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Contact Us Link -->
      <div class="text-center mt-12">
        <p class="text-gray-700">Can't find what suits you or your business?</p>
        <NuxtLink to="/contact" class="text-green-800 hover:underline">Send a message to us.</NuxtLink>
      </div>
    </div>

    <!-- Payment Form -->
    <div v-else class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Enter your information to upgrade your plan.</h1>
        <p class="text-gray-600">You're subscribing to MaaMaa's premium plan.</p>
        
        <div class="mt-4">
          <span class="text-5xl font-bold">N15,000</span>
          <span class="text-gray-500 ml-2">NGN/month</span>
        </div>
      </div>
      
      <!-- Order Summary -->
      <div class="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 class="text-lg font-medium mb-4">Order details</h2>
        
        <div class="flex justify-between py-2 border-b border-gray-200">
          <span>MaaMaa Premium Subscription</span>
          <span>N15,000</span>
        </div>
        
        <div class="flex justify-between py-2 border-b border-gray-200">
          <span>Subtotal</span>
          <span>N15,000</span>
        </div>
        
        <div class="flex justify-between py-2 mt-2">
          <span class="font-medium">Total due today</span>
          <span class="font-medium">N15,000</span>
        </div>
        
        <!-- Auto-renewal notice -->
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 flex items-start">
          <svg class="w-6 h-6 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <p class="text-sm text-yellow-700">
            Your subscription will auto renew on 8/11/2025. You will be charged N15,000 (plus applicable taxes).
          </p>
        </div>
      </div>
      
      <!-- Payment Form -->
      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <h2 class="text-xl font-medium mb-6">Payment method</h2>
        
        <form @submit.prevent="processPayment">
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">Full name (Name on card)</label>
            <input 
              type="text" 
              v-model="paymentInfo.fullName"
              placeholder="Enter your full name" 
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
            />
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">Country</label>
            <select 
              v-model="paymentInfo.country"
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
            >
              <option value="" disabled>Select country</option>
              <option value="NG">Nigeria</option>
              <option value="GH">Ghana</option>
              <option value="KE">Kenya</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">Email address</label>
            <input 
              type="email" 
              v-model="paymentInfo.email"
              placeholder="Enter email address" 
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
            />
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">Card number</label>
            <div class="relative">
              <input 
                type="text" 
                v-model="paymentInfo.cardNumber"
                placeholder="0000 0000 0000 0000" 
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
              />
              <div class="absolute right-3 top-3 flex items-center space-x-1">
                <div class="h-6 w-10 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
                <div class="h-6 w-10 bg-red-600 rounded text-white text-xs flex items-center justify-center">MC</div>
                <div class="h-6 w-10 bg-green-600 rounded text-white text-xs flex items-center justify-center">VERVE</div>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-gray-600 mb-2">Expiry date (MM/YY)</label>
              <div class="relative">
                <input 
                  type="text" 
                  v-model="paymentInfo.expiryDate"
                  placeholder="MM/YY" 
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-gray-600 mb-2">CVC</label>
              <input 
                type="text" 
                v-model="paymentInfo.cvc"
                placeholder="342" 
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
              />
            </div>
          </div>
          
          <div class="mb-6">
            <label class="flex items-start">
              <input 
                type="checkbox" 
                v-model="paymentInfo.termsAccepted"
                class="mt-1 mr-2" 
              />
              <span class="text-sm text-gray-600">
                By providing your payment information, you allow MaaMaa to charge your card in the amount above now and monthly until you cancel in accordance with our terms.
              </span>
            </label>
          </div>
          
          <button 
            type="submit" 
            class="w-full py-3 px-4 bg-gray-200 text-gray-800 rounded-lg text-center hover:bg-gray-300 transition-colors"
            :class="{ 'bg-green-600 hover:bg-green-700 text-white': isFormValid }"
            :disabled="!isFormValid"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

definePageMeta({
  middleware: ['auth'],
  layout: false
});

// State for showing payment form
const showPaymentForm = ref(false);

// Payment form data
const paymentInfo = ref({
  fullName: '',
  country: '',
  email: '',
  cardNumber: '',
  expiryDate: '',
  cvc: '',
  termsAccepted: false
});

// Check if form is valid
const isFormValid = computed(() => {
  return (
    paymentInfo.value.fullName && 
    paymentInfo.value.country && 
    paymentInfo.value.email && 
    paymentInfo.value.cardNumber && 
    paymentInfo.value.expiryDate && 
    paymentInfo.value.cvc && 
    paymentInfo.value.termsAccepted
  );
});

// Methods
const stayOnFreePlan = () => {
  // Handle staying on free plan
  navigateTo('/settings');
};

const processPayment = () => {
  // Process payment logic would go here
  // For now, just navigate back to settings
  navigateTo('/settings');
};
</script> 