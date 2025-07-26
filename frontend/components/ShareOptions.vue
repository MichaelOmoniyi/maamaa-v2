<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="close"></div>
    
    <!-- Modal content -->
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-10">
      <div class="flex flex-col p-6">
        <!-- Title -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold">{{ title }}</h2>
          <button @click="close" class="p-1">
            <svg class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Preview of the content being shared -->
        <div class="mb-6 p-4 bg-gray-50 rounded-lg">
          <div class="flex items-center mb-2">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
              <svg class="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none">
                <path d="M8 12H16M8 16H13.5M10 2H14M5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22Z" 
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="text-sm font-medium">{{ title }}</p>
          </div>
          <div class="text-sm text-gray-600">
            {{ previewContent }}
          </div>
        </div>
        
        <!-- Share options -->
        <div class="grid grid-cols-3 gap-4">
          <button @click="copyLink" class="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <svg class="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none">
                <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V18M8 5C8 6.10457 8.89543 7 10 7H12C13.1046 7 14 6.10457 14 5M8 5C8 3.89543 8.89543 3 10 3H12C13.1046 3 14 3.89543 14 5M14 5H16C17.1046 5 18 5.89543 18 7V10M20 14H10M10 14L13 11M10 14L13 17" 
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="text-sm">Copy link</span>
          </button>
          
          <button @click="shareToX" class="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <svg class="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
            <span class="text-sm">Share to X</span>
          </button>
          
          <button @click="shareToLinkedIn" class="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <svg class="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <span class="text-sm">Share to Lin.</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Jollof Event For 150 Guests'
  },
  content: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close', 'copy-link', 'share-x', 'share-linkedin']);

const previewContent = computed(() => {
  // Truncate content for preview
  const content = props.content?.content || 'I want to make jollof rice for 150 guests';
  return content.length > 100 ? content.substring(0, 100) + '...' : content;
});

const close = () => {
  emit('close');
};

const copyLink = () => {
  emit('copy-link');
};

const shareToX = () => {
  emit('share-x');
};

const shareToLinkedIn = () => {
  emit('share-linkedin');
};
</script> 