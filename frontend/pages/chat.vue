<template>
  <div class="w-full h-full flex flex-col">
    <!-- Welcome screen (shown when no chat is active) -->
    <div v-if="!currentChat" class="flex-1 flex flex-col items-center justify-center px-4">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">Welcome, {{ userName }}</h1>
      
      <div class="w-full max-w-2xl mt-8">
        <div class="relative">
          <input 
            v-model="newChatMessage" 
            type="text" 
            placeholder="What can I help you with today?" 
            class="w-full px-4 py-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            @keyup.enter="sendNewMessage"
          />
          <button 
            @click="sendNewMessage" 
            class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Quick suggestion buttons -->
      <div class="flex flex-wrap justify-center gap-4 mt-6">
        <button 
          v-for="(suggestion, index) in suggestions" 
          :key="index"
          @click="startChatWithSuggestion(suggestion)"
          class="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-medium transition-colors"
        >
          {{ suggestion }}
        </button>
      </div>

      <!-- Free plan info -->
      <div class="mt-6 bg-gray-50 rounded-lg px-4 py-2 flex items-center gap-2">
        <span class="text-sm text-gray-600">Free plan</span>
        <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
        <a href="#" class="text-sm font-medium text-green-700">Upgrade</a>
      </div>
    </div>
    
    <!-- Chat conversation (shown when a chat is active) -->
    <div v-else class="flex flex-col h-full">
      <!-- Chat header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">{{ currentChat.title }}</h2>
      </div>
      
      <!-- Chat messages - Flex grow to take available space -->
      <div class="flex-1 overflow-y-auto p-6" ref="messagesContainer" style="height: calc(100vh - 180px);">
        <div v-if="loading" class="flex justify-center py-4">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
        </div>
        
        <div v-for="(message, index) in currentChat.messages" :key="index" class="mb-6">
          <!-- User message -->
          <div v-if="message.role === 'user'" class="flex justify-end">
            <div class="bg-green-100 rounded-lg px-4 py-3 max-w-[75%]">
              <p class="text-gray-800">{{ message.content }}</p>
            </div>
          </div>
          
          <!-- Assistant message -->
          <div v-else class="flex justify-start">
            <div class="bg-gray-100 rounded-lg px-4 py-3 max-w-[75%]">
              <div v-if="message.type === 'ingredients'" class="space-y-2">
                <h3 class="font-medium text-gray-800">{{ message.title }}</h3>
                <p class="text-gray-600 text-sm">{{ message.subtitle }}</p>
                
                <div class="mt-4">
                  <div v-for="(item, idx) in message.items" :key="idx" class="flex justify-between py-2 border-b border-gray-200 last:border-0">
                    <span>{{ item.name }}</span>
                    <span class="font-medium">{{ item.quantity }}</span>
                  </div>
                </div>
                
                <div class="mt-4">
                  <h4 class="font-medium">Estimated cost:</h4>
                  <div class="mt-2 space-y-1">
                    <div class="flex items-center">
                      <div class="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span>Total: {{ message.cost.total }}</span>
                    </div>
                    <div class="flex items-center">
                      <div class="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span>Per Guest: {{ message.cost.perGuest }}</span>
                    </div>
                  </div>
                  <p class="text-gray-500 text-xs mt-2">{{ message.cost.note }}</p>
                </div>
                
                <!-- Message Actions -->
                <MessageActions 
                  :message="message" 
                  :show-retry="false"
                  @copy="handleCopyMessage"
                  @share="handleShareMessage"
                />
              </div>
              
              <div v-else-if="message.type === 'steps'" class="space-y-4">
                <h3 class="font-medium text-gray-800">{{ message.title }}</h3>
                
                <ol class="list-decimal pl-5 space-y-2">
                  <li v-for="(step, stepIdx) in message.steps" :key="stepIdx" class="text-gray-700">
                    {{ step }}
                  </li>
                </ol>
                
                <!-- Message Actions -->
                <MessageActions 
                  :message="message" 
                  :show-retry="false"
                  @copy="handleCopyMessage"
                  @share="handleShareMessage"
                />
              </div>
              
              <div v-else-if="message.type === 'vendor_offer'" class="space-y-2">
                <div class="flex items-center gap-2">
                  <span class="p-1 bg-green-100 rounded">🛒</span>
                  <h3 class="font-medium">{{ message.title }}</h3>
                </div>
                
                <ul class="mt-2 space-y-1">
                  <li v-for="(point, pointIdx) in message.points" :key="pointIdx" class="flex items-center">
                    <div class="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>{{ point }}</span>
                  </li>
                </ul>
                
                <div class="mt-2">
                  <span class="text-sm text-gray-600">Type: </span>
                  <span class="text-sm font-medium">{{ message.actionType }}</span>
                </div>
                
                <!-- Message Actions -->
                <MessageActions 
                  :message="message" 
                  :show-retry="true"
                  @copy="handleCopyMessage"
                  @share="handleShareMessage"
                  @retry="handleRetryMessage"
                />
              </div>
              
              <div v-else>
                <p class="text-gray-800">{{ message.content }}</p>
                
                <!-- Message Actions -->
                <MessageActions 
                  :message="message" 
                  :show-retry="true"
                  @copy="handleCopyMessage"
                  @share="handleShareMessage"
                  @retry="handleRetryMessage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Message input - Fixed at bottom -->
      <div class="border-t border-gray-200 px-4 py-3 bg-white sticky bottom-0 w-full">
        <div class="relative">
          <input 
            v-model="newMessage" 
            type="text" 
            placeholder="Type a message..." 
            class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            @keyup.enter="sendMessage"
          />
          <button 
            @click="sendMessage" 
            class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div class="flex justify-start mt-2">
          <button class="p-2 text-gray-500 hover:text-gray-700">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Share Modal -->
    <ShareOptions
      :is-open="shareModalOpen"
      :title="currentChat?.title || ''"
      :content="messageToShare"
      @close="shareModalOpen = false"
      @copy-link="handleCopyLink"
      @share-x="handleShareToX"
      @share-linkedin="handleShareToLinkedIn"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, inject } from 'vue';
import { useAuthStore } from '~/store/auth';
import MessageActions from '~/components/MessageActions.vue';
import ShareOptions from '~/components/ShareOptions.vue';

definePageMeta({
  middleware: ['auth'],
  layout: 'chat'
});

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// Get chat data from layout
const chatData = inject('chatData');

// User data
const userName = computed(() => {
  if (authStore.user?.user_metadata?.full_name) {
    return authStore.user.user_metadata.full_name.split(' ')[0];
  }
  return authStore.user?.name?.split(' ')[0] || 'Snow';
});

// Chat state
const loading = ref(false);
const newChatMessage = ref('');
const newMessage = ref('');
const messagesContainer = ref(null);

// Share modal state
const shareModalOpen = ref(false);
const messageToShare = ref(null);

// Use the currentChat from the parent layout if available
const currentChat = ref(null);

// Sample chat data with detailed messages
const loadDetailedChatData = () => {
  if (process.client) {
    try {
      const savedData = localStorage.getItem('maamaa_detailed_chats');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Error loading detailed chat data from localStorage:', error);
    }
  }
  
  // Default detailed chat data
  return {
    '1': {
      id: '1',
      title: 'Jollof Event for 150 Guests',
      updatedAt: new Date(),
      messages: [
        {
          role: 'user',
          content: 'I want to make jollof rice for 150 guests'
        },
        {
          role: 'assistant',
          content: 'Got it! Planning a feast for 150 guests with Jollof Rice.',
          type: 'text'
        },
        {
          role: 'assistant',
          type: 'ingredients',
          title: 'Here\'s what I recommend based on typical servings:',
          items: [
            { name: 'Rice', quantity: '15 kg' },
            { name: 'Tomatoes', quantity: '8 kg' },
            { name: 'Red peppers', quantity: '5 kg' },
            { name: 'Onions', quantity: '4 kg' },
            { name: 'Vegetable oil', quantity: '3 L' },
            { name: 'Seasoning & spices', quantity: '1.5 kg' },
            { name: 'Stock (broth)', quantity: '5 L' },
          ],
          cost: {
            total: 'N92,000',
            perGuest: 'N613',
            note: '(Based on current Lagos market prices)'
          }
        },
        {
          role: 'assistant',
          type: 'steps',
          title: 'Cooking steps scaled for 150 people:',
          steps: [
            'Parboil 15 kg of rice for 10 min, rinse & set aside.',
            'Blend tomatoes, peppers & onions into smooth paste.',
            'Heat 3L oil, fry blend for 20 min with spices.',
            'Add 5L stock, season well.',
            'Stir in rice, cover & steam till done (30-40 min).',
            'Keep fluffing so it stays vibrant & not soggy.'
          ]
        }
      ]
    },
    '2': {
      id: '2',
      title: 'Coconut Rice High Class Event',
      updatedAt: new Date(Date.now() - 86400000),
      messages: [
        {
          role: 'user',
          content: 'I need to prepare coconut rice for a high class event'
        },
        {
          role: 'assistant',
          content: 'I\'ll help you prepare an elegant coconut rice dish for your high-class event.',
          type: 'text'
        },
        {
          role: 'assistant',
          type: 'vendor_offer',
          title: 'Want me to find vendors for you?',
          points: [
            'I can pull live quotes from 5 suppliers in your area.',
            'Or help compare prices if you have a preferred market.'
          ],
          actionType: 'Find vendors for me'
        }
      ]
    }
  };
};

const detailedChatData = ref(loadDetailedChatData());

// Save detailed chat data when it changes
watch(detailedChatData, (newData) => {
  if (process.client) {
    try {
      localStorage.setItem('maamaa_detailed_chats', JSON.stringify(newData.value));
    } catch (error) {
      console.error('Error saving detailed chat data to localStorage:', error);
    }
  }
}, { deep: true });

// Quick suggestions
const suggestions = [
  'Plan an event for me',
  'Help me with my sales breakdown',
  'I need vendors around me'
];

// Methods
const scrollToBottom = () => {
  if (messagesContainer.value) {
    setTimeout(() => {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }, 100);
  }
};

// Handle message actions
const handleCopyMessage = (message) => {
  navigator.clipboard.writeText(message.content)
    .then(() => {
      // Could show a toast notification here
      console.log('Message copied to clipboard');
    })
    .catch(err => {
      console.error('Failed to copy message:', err);
    });
};

const handleShareMessage = (message) => {
  messageToShare.value = message;
  shareModalOpen.value = true;
};

const handleRetryMessage = (message) => {
  // Find the index of the message to retry
  const index = currentChat.value.messages.findIndex(m => m === message);
  if (index !== -1) {
    // Remove all messages after this one
    currentChat.value.messages = currentChat.value.messages.slice(0, index);
    // Simulate generating a new response
    loading.value = true;
    setTimeout(() => {
      currentChat.value.messages.push({
        role: 'assistant',
        content: `Here's a regenerated response to replace the previous one.`
      });
      loading.value = false;
      scrollToBottom();
      
      // Save to detailed chat data
      if (detailedChatData.value) {
        detailedChatData.value[currentChat.value.id] = currentChat.value;
      }
      
      // Update chat history in parent layout
      if (chatData) {
        chatData.updateChatHistory(currentChat.value);
      }
    }, 1000);
  }
};

// Share modal actions
const handleCopyLink = () => {
  const chatId = currentChat.value.id;
  const url = `${window.location.origin}/chat?id=${chatId}`;
  navigator.clipboard.writeText(url)
    .then(() => {
      shareModalOpen.value = false;
      // Could show a toast notification here
      console.log('Link copied to clipboard');
    })
    .catch(err => {
      console.error('Failed to copy link:', err);
    });
};

const handleShareToX = () => {
  const chatId = currentChat.value.id;
  const url = `${window.location.origin}/chat?id=${chatId}`;
  const text = `Check out this conversation about ${currentChat.value.title} on MaaMaa!`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank');
  shareModalOpen.value = false;
};

const handleShareToLinkedIn = () => {
  const chatId = currentChat.value.id;
  const url = `${window.location.origin}/chat?id=${chatId}`;
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank');
  shareModalOpen.value = false;
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  
  if (currentChat.value) {
    currentChat.value.messages.push({
      role: 'user',
      content: newMessage.value
    });
    
    // Update the chat's timestamp
    currentChat.value.updatedAt = new Date();
    
    // Save to detailed chat data
    if (detailedChatData.value) {
      detailedChatData.value[currentChat.value.id] = currentChat.value;
    }
    
    // Update chat history in parent layout
    if (chatData) {
      chatData.updateChatHistory(currentChat.value);
    }
    
    // Simulate response
    loading.value = true;
    setTimeout(() => {
      currentChat.value.messages.push({
        role: 'assistant',
        content: `I've received your message: "${newMessage.value}". How can I assist you further?`
      });
      loading.value = false;
      scrollToBottom();
      
      // Save to detailed chat data again
      if (detailedChatData.value) {
        detailedChatData.value[currentChat.value.id] = currentChat.value;
      }
      
      // Update chat history in parent layout again
      if (chatData) {
        chatData.updateChatHistory(currentChat.value);
      }
    }, 1000);
    
    newMessage.value = '';
    scrollToBottom();
  }
};

const sendNewMessage = () => {
  if (!newChatMessage.value.trim()) return;
  
  // Create a new chat
  const newChat = {
    id: Date.now().toString(),
    title: newChatMessage.value,
    updatedAt: new Date(),
    messages: [
      {
        role: 'user',
        content: newChatMessage.value
      }
    ]
  };
  
  // Set as current chat
  currentChat.value = newChat;
  
  // Save to detailed chat data
  if (detailedChatData.value) {
    detailedChatData.value[newChat.id] = newChat;
  }
  
  // Update chat history in parent layout
  if (chatData) {
    chatData.updateChatHistory(newChat);
    chatData.currentChatId = newChat.id;
  }
  
  // Update URL without reloading the page
  router.replace({ path: '/chat', query: { id: newChat.id } });
  
  // Simulate response
  loading.value = true;
  setTimeout(() => {
    currentChat.value.messages.push({
      role: 'assistant',
      content: `I'll help you with "${newChatMessage.value}". What specific details would you like to know?`
    });
    loading.value = false;
    scrollToBottom();
    
          // Save to detailed chat data again
      if (detailedChatData.value) {
        detailedChatData.value[newChat.id] = currentChat.value;
      }
    
    // Update chat history in parent layout again
    if (chatData) {
      chatData.updateChatHistory(currentChat.value);
    }
  }, 1000);
  
  newChatMessage.value = '';
};

const startChatWithSuggestion = (suggestion) => {
  newChatMessage.value = suggestion;
  sendNewMessage();
};

const loadChat = (chat) => {
  // If we have detailed data for this chat, use it
  if (detailedChatData.value && detailedChatData.value[chat.id]) {
    currentChat.value = detailedChatData.value[chat.id];
  } else {
    // Otherwise use the chat as is
    currentChat.value = chat;
    
    // Initialize messages array if it doesn't exist
    if (!currentChat.value.messages) {
      currentChat.value.messages = [];
    }
    
    // Save this chat to detailed data for future use
    if (detailedChatData.value) {
      detailedChatData.value[chat.id] = currentChat.value;
    }
  }
  
  scrollToBottom();
};

// Function to load chat from URL query parameters
const loadChatFromUrlParams = () => {
  const chatId = route.query.id;
  
  if (!chatId) {
    // No chat ID in URL, show welcome screen
    currentChat.value = null;
    return;
  }
  
  // First check if we have detailed data for this chat
  if (detailedChatData.value && detailedChatData.value[chatId]) {
    currentChat.value = detailedChatData.value[chatId];
    
    // Also update the chat history in the layout
    if (chatData) {
      chatData.currentChatId = chatId;
      chatData.updateChatHistory(currentChat.value);
    }
    return;
  }
  
  // Next check if the chat is in the history
  if (chatData) {
    const chat = chatData.chatHistory.find(c => c.id === chatId);
    if (chat) {
      loadChat(chat);
      return;
    }
  }
  
  // If we get here, we have a chat ID but no data for it
  // Let's create a placeholder chat with the ID
  console.log('Creating placeholder chat for ID:', chatId);
  const placeholderChat = {
    id: chatId,
    title: `Chat ${chatId}`,
    updatedAt: new Date(),
    messages: []
  };
  
  currentChat.value = placeholderChat;
  
  // Update chat history in parent layout
  if (chatData) {
    chatData.currentChatId = chatId;
    chatData.updateChatHistory(placeholderChat);
  }
};

// Watch for changes in route query parameters
watch(() => route.query.id, (newChatId, oldChatId) => {
  // Only reload if the ID actually changed
  if (newChatId !== oldChatId) {
    loadChatFromUrlParams();
  }
}, { immediate: true });

// Register this component with the layout
onMounted(() => {
  if (chatData) {
    // Register this component with the layout
    chatData.setChatPageInstance({
      loadChat,
      currentChat,
      resetChat: () => {
        currentChat.value = null;
      }
    });
    
    // Load chat based on URL parameters
    loadChatFromUrlParams();
  }
  
  // Scroll to bottom of messages if any
  scrollToBottom();
});

// Watch for changes to current chat to scroll to bottom
watch(() => currentChat.value?.messages?.length, () => {
  scrollToBottom();
});
</script>