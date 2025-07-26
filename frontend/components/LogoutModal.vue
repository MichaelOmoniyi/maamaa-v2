<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="closeModal"></div>
    
    <!-- Modal content -->
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-10">
      <div class="flex flex-col items-center p-6">
        <!-- Warning icon -->
        <div class="w-16 h-16 rounded-full flex items-center justify-center border-2 border-red-500 mb-4">
          <svg class="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        
        <!-- Title -->
        <h2 class="text-2xl font-bold mb-2">Log Out</h2>
        
        <!-- Message -->
        <p class="text-center text-gray-600 mb-6">
          Are you sure you want to log out of your account?<br>
          You can always log back in at any time.
        </p>
        
        <!-- Action buttons -->
        <div class="flex w-full gap-4">
          <button 
            @click="closeModal" 
            class="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="confirmLogout" 
            class="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'confirm']);

const closeModal = () => {
  emit('close');
};

const confirmLogout = () => {
  emit('confirm');
};
</script> 