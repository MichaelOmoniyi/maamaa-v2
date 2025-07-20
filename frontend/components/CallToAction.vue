<template>
  <section class="py-12 md:py-16 bg-dark-green">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-2xl md:text-3xl font-bold mb-4 text-white">{{ title }}</h2>
      <p v-if="description" class="text-gray-200 mb-8 max-w-2xl mx-auto text-lg">
        {{ description }}
      </p>
      <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <NuxtLink 
          :to="primaryButtonLink" 
          class="bg-primary-green hover:bg-light-green text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300"
        >
          {{ primaryButtonText }}
        </NuxtLink>
        <NuxtLink 
          v-if="secondaryButtonText" 
          :to="secondaryButtonLink" 
          class="bg-transparent border-2 border-white hover:border-light-green text-white hover:text-light-green text-lg font-semibold py-3 px-8 rounded-lg transition duration-300"
        >
          {{ secondaryButtonText }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  primaryButtonText: {
    type: String,
    default: 'Get Started'
  },
  primaryButtonLink: {
    type: String,
    default: '/estimator'
  },
  secondaryButtonText: {
    type: String,
    default: ''
  },
  secondaryButtonLink: {
    type: String,
    default: '/contact'
  }
});
</script> 