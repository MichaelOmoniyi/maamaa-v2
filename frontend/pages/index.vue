<template>
  <div>
    <!-- Hero Section -->
    <section class="relative hero-section min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style="background-image: url('/images/hero.png');">
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0 bg-black bg-opacity-40"></div>

      <div class="container mx-auto px-4 py-24 relative z-10">
        <div class="flex flex-col items-center text-center">
          <!-- Main heading with badge -->
          <div class="mb-8">
            <div class="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
              <svg class="w-5 h-5 text-yellow-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="text-white text-sm font-medium">Your kitchen deserves this.</span>
            </div>
            
            <h1 class="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              Cook with heart.<br/>
              <span class="text-light-green">Plan with precision.</span>
            </h1>
          </div>
          
          <p class="text-gray-200 text-lg md:text-xl mb-10 max-w-3xl leading-relaxed">
            MaaMaa is an AI-powered kitchen companion for African chefs, caterers, and food vendors. It helps you plan your meals, scale your ingredients, manage stock, and uncover insights — so you can focus on what really matters: feeding people well.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <NuxtLink to="/register" class="bg-white text-dark-green text-lg font-semibold py-4 px-10 rounded-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 min-w-[220px] text-center">
              Join Early Access
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white" id="features">
      <div class="container mx-auto px-4 pt-16">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-dark-text">Our Solution: MaaMaa in Action</h2>
          <p class="text-gray-600 max-w-xl mx-auto">
            Our AI-powered platform takes the guesswork out of event catering, giving you precise measurements and recommendations.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <!-- Feature 1 -->
          <div class="bg-pale-green rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
            <div class="bg-primary-green rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-dark-text">Precise Ingredient Lists</h3>
            <p class="text-gray-600">
              Get exact quantities needed for your event size, eliminating waste and ensuring you have everything you need.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-pale-green rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
            <div class="bg-primary-green rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-dark-text">Cost Estimates</h3>
            <p class="text-gray-600">
              Know your budget in advance with accurate cost breakdowns per dish and per guest.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-pale-green rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
            <div class="bg-primary-green rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-dark-text">Scaled Recipes</h3>
            <p class="text-gray-600">
              Automatically scale traditional African recipes to match your guest count, maintaining authentic taste.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-pale-green rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
            <div class="bg-primary-green rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-dark-text">Vendor Sourcing</h3>
            <p class="text-gray-600">
              Connect with trusted local vendors for ingredients and supplies at competitive prices.
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="bg-pale-green rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
            <div class="bg-primary-green rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-dark-text">Inventory Tracker</h3>
            <p class="text-gray-600">
              Keep track of what you have and what you need with our smart inventory management system.
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="bg-pale-green rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
            <div class="bg-primary-green rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-dark-text">Data Analysis</h3>
            <p class="text-gray-600">
              Gain insights from past events to improve future catering plans and reduce costs.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-dark-text">How MaaMaa Works</h2>
          <p class="text-gray-600 max-w-xl mx-auto">
            Simple steps to perfectly plan your next African event catering
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="text-center">
            <div class="bg-primary-green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-white">1</span>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-dark-text">Enter Event Details</h3>
            <p class="text-gray-600">
              Provide your guest count, cuisine preferences, and event type.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="text-center">
            <div class="bg-primary-green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-white">2</span>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-dark-text">Get AI Recommendations</h3>
            <p class="text-gray-600">
              Our AI generates precise ingredient lists, quantities, and cost estimates.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div class="bg-primary-green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-white">3</span>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-dark-text">Execute With Confidence</h3>
            <p class="text-gray-600">
              Follow the detailed plans or share them with your caterer for perfect execution.
            </p>
          </div>
        </div>

        <div class="mt-12 text-center">
          <NuxtLink to="/estimator" class="bg-primary-green hover:bg-light-green text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300">
            Try It Now
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-dark-text">Simple, Transparent Pricing</h2>
          <p class="text-gray-600 max-w-xl mx-auto">
            Choose the plan that works best for your catering needs
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- Free Plan -->
          <div class="border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-lg transition duration-300">
            <h3 class="text-2xl font-bold mb-4 text-dark-text">Free Plan</h3>
            <p class="text-gray-600 mb-6">Perfect for occasional event planning</p>
            <div class="text-4xl font-bold mb-6 text-primary-green">Free</div>
            <ul class="mb-8 space-y-3">
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                3 events per month
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Basic recipe scaling
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Cost estimates
              </li>
              <li class="flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Vendor sourcing
              </li>
              <li class="flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Kitchen insights
              </li>
            </ul>
            <NuxtLink to="/register" class="block w-full bg-primary-green hover:bg-light-green text-white text-center py-3 rounded-lg font-semibold transition duration-300">
              Get Started
            </NuxtLink>
          </div>

          <!-- Premium Plan -->
          <div class="border-2 border-primary-green rounded-xl p-8 shadow-lg relative">
            <div class="absolute top-0 right-0 bg-primary-green text-white py-1 px-4 rounded-bl-lg rounded-tr-lg font-semibold">
              Popular
            </div>
            <h3 class="text-2xl font-bold mb-4 text-dark-text">Premium Plan</h3>
            <p class="text-gray-600 mb-6">For professional caterers and event planners</p>
            <div class="text-4xl font-bold mb-6 text-primary-green">₦10k-₦20k<span class="text-lg text-gray-500 font-normal">/month</span></div>
            <ul class="mb-8 space-y-3">
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Unlimited events
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Advanced recipe scaling
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Detailed cost breakdowns
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Vendor network access
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Advanced analytics
              </li>
            </ul>
            <NuxtLink to="/register" class="block w-full bg-primary-green hover:bg-light-green text-white text-center py-3 rounded-lg font-semibold transition duration-300">
              Choose Premium
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-dark-green">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your Catering Experience?</h2>
        <p class="text-gray-200 mb-8 max-w-2xl mx-auto text-lg">
          Join thousands of caterers and event planners who are already using MaaMaa to perfectly plan their African events.
        </p>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <NuxtLink to="/estimator" class="bg-primary-green hover:bg-light-green text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300">
            Get Started Now
          </NuxtLink>
          <NuxtLink to="/contact" class="bg-transparent border-2 border-white hover:border-light-green text-white hover:text-light-green text-lg font-semibold py-3 px-8 rounded-lg transition duration-300">
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>


