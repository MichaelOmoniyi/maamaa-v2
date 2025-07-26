<template>
  <div class="flex gap-2 mt-2">
    <!-- Copy button -->
    <button 
      @click="copyMessage" 
      class="p-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
      title="Copy message"
    >
      <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </button>
    
    <!-- Share button -->
    <button 
      @click="shareMessage" 
      class="p-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
      title="Share message"
    >
      <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    </button>
    
    <!-- Retry button -->
    <button 
      v-if="showRetry" 
      @click="retryMessage" 
      class="p-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
      title="Regenerate response"
    >
      <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  showRetry: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['copy', 'share', 'retry']);

const copyMessage = () => {
  emit('copy', props.message);
};

const shareMessage = () => {
  emit('share', props.message);
};

const retryMessage = () => {
  emit('retry', props.message);
};
</script> 