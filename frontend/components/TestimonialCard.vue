<template>
  <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <div class="flex items-center mb-4">
      <div class="h-12 w-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
        <img 
          v-if="avatarUrl" 
          :src="avatarUrl" 
          :alt="`${name}'s avatar`" 
          class="w-full h-full object-cover"
        />
        <div v-else class="h-full w-full flex items-center justify-center bg-primary-green text-white">
          {{ initials }}
        </div>
      </div>
      <div class="ml-4">
        <h4 class="font-semibold text-dark-text">{{ name }}</h4>
        <p class="text-sm text-gray-500">{{ role }}</p>
      </div>
      <div class="ml-auto">
        <div class="flex">
          <svg v-for="i in 5" :key="i" class="h-5 w-5" :class="i <= rating ? 'text-primary-green' : 'text-gray-300'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>
    </div>
    <p class="text-gray-600 italic">{{ content }}</p>
    <div class="mt-4 flex justify-between items-center">
      <p class="text-xs text-gray-400">{{ eventType }}</p>
      <p class="text-xs text-gray-400">{{ date }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'Customer'
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 5,
    validator: (value) => value >= 1 && value <= 5
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  eventType: {
    type: String,
    default: 'Wedding'
  },
  date: {
    type: String,
    default: 'June 2025'
  }
});

// Generate initials from name
const initials = computed(() => {
  return props.name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
});
</script> 