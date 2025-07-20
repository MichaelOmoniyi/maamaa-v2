<template>
  <div class="h-full flex flex-col">
    <!-- Chat messages area -->
    <div 
      class="flex-1 p-6 overflow-y-auto"
      ref="chatContainer"
    >
      <div v-if="!authStore.user" class="flex justify-center items-center h-full">
        <div class="text-center">
          <p class="text-lg text-gray-600 mb-4">You need to be logged in to chat with MaaMaa.</p>
          <NuxtLink to="/login" class="btn-primary">Log In</NuxtLink>
        </div>
      </div>

      <div v-else>
        <!-- Welcome message -->
        <div v-if="messages.length === 0" class="text-center py-8">
          <img src="/images/maamaa-logo.png" alt="MaaMaa Logo" class="h-16 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Welcome to MaaMaa Chat!</h3>
          <p class="text-gray-600 mb-4">Ask me anything about catering for your African event!</p>
          <div class="flex flex-col items-center space-y-2">
            <button 
              v-for="(suggestion, index) in suggestions" 
              :key="index"
              class="bg-pale-green px-4 py-2 rounded-full text-sm text-dark-green hover:bg-light-green transition-colors"
              @click="sendMessage(suggestion)"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>

        <!-- Chat messages -->
        <div v-for="(message, index) in messages" :key="index" class="mb-4">
          <!-- User message -->
          <div v-if="message.role === 'user'" class="flex justify-end">
            <div class="bg-light-green text-dark-green rounded-lg py-3 px-4 max-w-[75%]">
              <p class="whitespace-pre-wrap">{{ message.content }}</p>
            </div>
          </div>
          
          <!-- Assistant message -->
          <div v-else class="flex">
            <div class="bg-gray-100 text-dark-text rounded-lg py-3 px-4 max-w-[75%]">
              <p class="whitespace-pre-wrap">{{ message.content }}</p>
            </div>
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="loading" class="flex mt-2">
          <div class="bg-gray-100 text-dark-text rounded-lg py-3 px-4">
            <div class="flex items-center">
              <span class="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
              <span class="h-2 w-2 bg-gray-500 rounded-full animate-bounce mx-1" style="animation-delay: 0.2s"></span>
              <span class="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Chat input -->
    <div class="border-t border-gray-200 p-4 bg-white">
      <form @submit.prevent="sendMessage" v-if="authStore.user">
        <div class="flex">
          <input
            v-model="userInput"
            type="text"
            class="flex-grow border rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-green"
            placeholder="Type a message..."
            :disabled="loading"
            @keydown.enter="sendMessage"
          />
          <button
            type="submit"
            class="bg-primary-green hover:bg-light-green text-white px-6 rounded-r-lg transition duration-200 flex items-center justify-center"
            :disabled="loading || !userInput.trim()"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-else>Send</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'chat'
});

import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore();
const userInput = ref('');
const messages = ref([]);
const loading = ref(false);
const chatContainer = ref(null);

// Suggested questions for users
const suggestions = [
  "How much food should I prepare for 50 guests?",
  "What are some popular Nigerian dishes for events?",
  "Can you suggest a menu for a Ghanaian wedding?",
  "How do I calculate drinks for a party?",
];

// Dummy responses for the AI assistant
const dummyResponses = {
  "How much food should I prepare for 50 guests?": 
    "For 50 guests, I recommend planning for:\n\n- Main dishes: 25-30 pounds (or approximately 12-15 kg)\n- Side dishes: 12-15 pounds (or about 6-7.5 kg)\n- Rice or other starches: 10-12 pounds (or about 5-6 kg)\n\nIn Nigerian catering specifically, a good rule of thumb is to plan for about 0.5-0.75 pound of main dish protein per person, slightly more if you're serving bone-in meat. Remember that it's always better to have a bit extra than to run out!",
  
  "What are some popular Nigerian dishes for events?": 
    "Popular Nigerian dishes for events include:\n\n1. Jollof Rice - Essential for any Nigerian celebration\n2. Pounded Yam with Egusi Soup - A traditional favorite\n3. Moin Moin - Steamed bean pudding\n4. Suya - Spiced skewered meat\n5. Asaro (Yam Porridge) - Hearty and filling\n6. Chin Chin - Sweet fried pastry snacks\n7. Small Chops - Assortment of appetizers like puff puff, samosas, etc.\n8. Pepper Soup - Spicy meat or fish soup\n9. Plantain (fried or grilled) - Popular side dish\n\nThe most successful events typically feature Jollof Rice, a protein option (often chicken, beef, or fish), and at least 2-3 sides.",
  
  "Can you suggest a menu for a Ghanaian wedding?": 
    "For a Ghanaian wedding, here's a traditional menu suggestion:\n\n**Main Dishes:**\n- Waakye (rice and beans)\n- Jollof Rice\n- Banku with Okra Stew\n- Fufu with Light Soup or Groundnut Soup\n\n**Proteins:**\n- Grilled Tilapia\n- Chicken Stew\n- Kelewele (spiced fried plantains)\n- Beef Kebabs\n\n**Sides:**\n- Gari Foto\n- Kontomire Stew (cocoyam leaves)\n- Shito (hot pepper sauce)\n- Plantains (various preparations)\n\n**Desserts:**\n- Cake (often multi-tiered)\n- Traditional sweet treats like Bofrot (puff puff)\n\nThis menu offers a good balance of traditional Ghanaian dishes that work well for large celebrations.",
  
  "How do I calculate drinks for a party?": 
    "For calculating drinks at an African event:\n\n**General Guidelines:**\n- Plan for 1-2 drinks per person per hour\n- For a 4-hour event with 50 guests: 200-400 total drinks\n\n**Popular Drink Distribution:**\n- Water: 30% (always have plenty)\n- Soft drinks (Coca-Cola, Fanta, etc.): 25%\n- Beer: 20%\n- Wine: 15%\n- Spirits: 10%\n\n**Don't forget traditional drinks like:**\n- Zobo (Hibiscus drink)\n- Chapman\n- Palm Wine (for traditional events)\n- Sobolo\n\nConsider having more non-alcoholic options if your event includes many children or non-drinkers.",
};

// Generic responses for other queries
const genericResponses = [
  "That's a great question about African catering! Based on my knowledge, I'd suggest looking into traditional recipes that incorporate local spices and ingredients. Would you like me to suggest some specific dishes?",
  
  "When planning African cuisine for events, it's important to consider regional variations. West African food differs from East African cuisine in terms of spices and preparation methods. What specific region are you interested in?",
  
  "For your event, I recommend incorporating a mix of traditional dishes and fusion options to cater to different tastes. This approach has been very successful for many events I've helped plan.",
  
  "Portion sizes for African events tend to be generous. I typically recommend planning for about 1.5 times the usual portion size per person, especially for staple foods like rice and fufu.",
  
  "Based on my experience with similar events, I would suggest focusing on a few signature dishes done extremely well rather than many mediocre options. Quality over quantity always makes for a more memorable event.",
];

// Function to send message
const sendMessage = async (text = null) => {
  // Don't send empty messages
  const messageContent = text || userInput.value.trim();
  if (!messageContent || loading.value) return;
  
  // Add user message
  messages.value.push({
    role: 'user',
    content: messageContent,
  });
  
  // Clear input if it's from the text input (not a suggestion)
  if (!text) userInput.value = '';
  
  // Set loading state
  loading.value = true;
  
  // Simulate AI response delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate AI response
  let aiResponse;
  
  // Check for predefined responses first
  if (dummyResponses[messageContent]) {
    aiResponse = dummyResponses[messageContent];
  } else {
    // Use a random generic response
    const randomIndex = Math.floor(Math.random() * genericResponses.length);
    aiResponse = genericResponses[randomIndex];
  }
  
  // Add AI response
  messages.value.push({
    role: 'assistant',
    content: aiResponse,
  });
  
  // Clear loading state
  loading.value = false;
  
  // Scroll to bottom after rendering
  nextTick(() => {
    scrollToBottom();
  });
};

// Scroll chat to bottom
const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

// Scroll to bottom when messages change
watch(messages, () => {
  nextTick(() => {
    scrollToBottom();
  });
});
</script>

<style scoped>
.btn-primary {
  background-color: #007C2E;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #5DBB63;
}
</style>
