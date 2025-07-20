<template>
  <div class="min-h-screen bg-pale-green py-12">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-dark-green mb-4">Simple, Transparent Pricing</h1>
        <p class="text-dark-text text-xl max-w-2xl mx-auto">
          Choose the perfect plan for your catering needs, with no hidden fees.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Basic Plan -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div class="p-6">
            <h2 class="text-xl font-bold text-dark-text mb-2">Basic</h2>
            <div class="text-primary-green text-4xl font-bold mb-4">
              $19<span class="text-lg">/person</span>
            </div>
            <p class="text-gray-600 mb-6">Perfect for small gatherings and informal events.</p>
            <ul class="mb-8 space-y-3">
              <li class="flex items-center">
                <svg class="w-5 h-5 text-primary-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Up to 20 guests</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-primary-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>3 menu options</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-primary-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Basic serving setup</span>
              </li>
              <li class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                <span>No staff included</span>
              </li>
            </ul>
            <button class="btn-secondary w-full">Get Started</button>
          </div>
        </div>

        <!-- Premium Plan (Featured) -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-primary-green transform scale-105">
          <div class="bg-primary-green py-2">
            <p class="text-white text-center font-bold text-sm">MOST POPULAR</p>
          </div>
          <div class="p-6">
            <h2 class="text-xl font-bold text-dark-text mb-2">Premium</h2>
            <div class="text-primary-green text-4xl font-bold mb-4">
              $29<span class="text-lg">/person</span>
            </div>
            <p class="text-gray-600 mb-6">Ideal for medium-sized events and celebrations.</p>
            <ul class="mb-8 space-y-3">
              <li class="flex items-center">
                <svg class="w-5 h-5 text-primary-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>21-50 guests</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-primary-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>5 menu options</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-primary-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Full serving setup</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-primary-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>2 staff members</span>
              </li>
            </ul>
            <button class="btn-primary w-full">Get Started</button>
          </div>
        </div>

        <!-- Enterprise Plan -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div class="p-6">
            <h2 class="text-xl font-bold text-dark-text mb-2">Enterprise</h2>
            <div class="text-primary-green text-4xl font-bold mb-4">
              $39<span class="text-lg">/person</span>
            </div>
            <p class="text-gray-600 mb-6">Perfect for large events and corporate functions.</p>
            <ul class="mb-8 space-y-3">
              <li class="flex items-center">
                <svg class="w-5 h-5 text-primary-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>51+ guests</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-primary-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Custom menu options</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-primary-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Premium serving setup</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-primary-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Full staff included</span>
              </li>
            </ul>
            <button class="btn-secondary w-full">Get Started</button>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <h2 class="text-2xl font-bold text-dark-green mb-4">Need a Custom Solution?</h2>
        <p class="text-gray-600 max-w-2xl mx-auto mb-8">
          For special events or unique requirements, we offer custom catering packages tailored to your specific needs.
        </p>
        <NuxtLink to="/contact" class="btn-primary inline-block">Contact Us</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Add any reactive data or methods here if needed
</script> 