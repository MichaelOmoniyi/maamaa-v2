<template>
  <div class="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div class="h-48 bg-gray-200">
      <img 
        v-if="imageUrl" 
        :src="imageUrl" 
        :alt="name" 
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-pale-green">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6.355 1.6a9 9 0 11-12.71 0M12 15v2m-6.355-1.6a9 9 0 0112.71 0" />
        </svg>
      </div>
    </div>

    <div class="absolute top-0 right-0 bg-dark-green text-white py-1 px-3 text-sm font-medium">
      {{ category }}
    </div>

    <div class="p-5">
      <h3 class="text-xl font-semibold mb-2 text-dark-text">{{ name }}</h3>
      <p class="text-gray-600 text-sm mb-4">{{ description }}</p>
      
      <div class="flex justify-between items-center">
        <div>
          <p class="text-sm text-gray-500">Serves</p>
          <p class="font-bold text-primary-green">{{ serves }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Prep time</p>
          <p class="font-medium">{{ prepTime }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'Featured'
  },
  serves: {
    type: String,
    default: '1-2'
  },
  prepTime: {
    type: String,
    default: '30 min'
  }
});
</script> 