<template>
  <div class="h-screen w-screen flex overflow-hidden bg-white">
    <!-- Sidebar backdrop overlay (mobile only) -->
    <div 
      v-if="!sidebarCollapsed" 
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden transition-opacity duration-300"
    ></div>
    
    <!-- Sidebar -->
    <div
      class="flex flex-col transition-all duration-300 h-full bg-[#f1f9f4] border-r border-gray-200 px-4 py-6 z-20"
      :class="{ 
        'w-16': sidebarCollapsed, 
        'w-64': !sidebarCollapsed,
        'fixed left-0 top-0 bottom-0 md:relative': !sidebarCollapsed || !isMobile,
        'shadow-xl md:shadow-none': !sidebarCollapsed
      }"
    >
      <div class="flex flex-col mb-4">
        <!-- Hamburger menu toggle -->
        <button @click="toggleSidebar" class="focus:outline-none">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <!-- New Chat Button -->
      <div class="pr-4 py-10">
        <div
          @click="startNewChat"
          class="flex items-center gap-2 cursor-pointer hover:bg-green-50 p-2 rounded-lg"
        >
          <div class="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V20M4 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p v-if="!sidebarCollapsed" class="text-sm font-medium text-gray-800">
            New Chat
          </p>
        </div>
      </div>

      <!-- Recent Chats -->
      <div class="flex-1 overflow-y-auto pr-4">
        <div v-if="!sidebarCollapsed" class="mb-2">
          <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider">Recent chats</h3>
        </div>
        <div class="space-y-1">
          <div
            v-for="(chat, index) in chatHistory"
            :key="index"
            @click="loadChat(chat)"
            :class="[
              'group rounded-lg cursor-pointer transition-colors',
              currentChatId === chat.id ? 'bg-[#D1E7DD]' : 'hover:bg-gray-100',
              sidebarCollapsed ? 'p-2' : 'p-3'
            ]"
          >
            <div class="flex items-center gap-2">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12H16M8 16H13.5M10 2H14M5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
              <div v-if="!sidebarCollapsed" class="flex-1 min-w-0">
                <p class="text-sm text-gray-800 truncate">{{ chat.title }}</p>
                <p class="text-xs text-gray-500">{{ formatDate(chat.updatedAt) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden w-full">
      <!-- Top Bar -->
      <div class="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 h-16">
        <div class="flex items-center">
          <NuxtLink to="/">
            <img src="/images/logo-green.png" alt="MaaMaa" class="h-12 w-auto" />
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Mobile sidebar toggle -->
          <button 
            @click="toggleSidebar" 
            class="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Notification Bell -->
          <button class="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <svg class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button>

          <!-- User Avatar -->
          <div class="relative user-menu">
            <button @click="toggleUserMenu" class="flex items-center focus:outline-none">
              <div v-if="userProfileImage" class="w-8 h-8 rounded-full overflow-hidden">
                <img :src="userProfileImage" alt="User" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">{{ userInitials }}</span>
              </div>
            </button>

            <!-- User Dropdown Menu -->
            <div v-show="userMenuOpen" class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-10">
              <!-- User Profile Section -->
              <div class="px-4 py-3 border-b border-gray-200">
                <div class="flex items-center">
                  <div v-if="userProfileImage" class="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img :src="userProfileImage" alt="User" class="w-full h-full object-cover" />
                  </div>
                  <div v-else class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <span class="text-white text-lg font-medium">{{ userInitials }}</span>
                  </div>
                  <div>
                    <p class="text-base font-medium text-gray-800">{{ userName }}</p>
                    <p class="text-sm text-gray-500">Free plan</p>
                  </div>
                  <div class="ml-auto">
                    <svg class="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Menu Items -->
              <div class="py-1">
                <NuxtLink to="/settings" class="flex items-center px-4 py-3 hover:bg-gray-50">
                  <span class="text-gray-800">Settings</span>
                </NuxtLink>
                
                <NuxtLink to="/help" class="flex items-center px-4 py-3 hover:bg-gray-50">
                  <span class="text-gray-800">Get help</span>
                </NuxtLink>
                
                <NuxtLink to="/upgrade" class="flex items-center px-4 py-3 hover:bg-gray-50">
                  <span class="text-gray-800">Upgrade plan</span>
                </NuxtLink>
                
                <div class="border-t border-gray-200"></div>
                
                <button @click="showLogoutConfirmation" class="w-full text-left flex items-center px-4 py-3 hover:bg-gray-50">
                  <svg class="w-5 h-5 mr-2 text-gray-600" viewBox="0 0 24 24" fill="none">
                    <path d="M17 16L21 12M21 12L17 8M21 12H9M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span class="text-gray-800">Log out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <div class="flex-1 flex flex-col bg-white overflow-y-auto">
        <slot />
      </div>
    </div>
    
    <!-- Logout Modal -->
    <LogoutModal 
      :is-open="showLogoutModal" 
      @close="showLogoutModal = false" 
      @confirm="logout" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, provide, watch } from 'vue';
import { useAuthStore } from '~/store/auth';
import LogoutModal from '~/components/LogoutModal.vue';

const authStore = useAuthStore();
const router = useRouter();

// Logout modal state
const showLogoutModal = ref(false);

// Sidebar state
const isMobile = ref(false);
const sidebarCollapsed = ref(false);
const userMenuOpen = ref(false);

// Check if the screen is mobile size
const checkMobileScreen = () => {
  isMobile.value = window.innerWidth < 768; // md breakpoint in Tailwind
  // Default to collapsed on mobile
  if (isMobile.value) {
    sidebarCollapsed.value = true;
  }
};

// Toggle sidebar
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

// Get user profile image or initials
const userProfileImage = computed(() => {
  return authStore.user?.user_metadata?.avatar_url || null;
});

const userInitials = computed(() => {
  const user = authStore.user;
  
  if (!user) return '';
  
  // Try to get initials from full name
  if (user.user_metadata?.full_name) {
    const nameParts = user.user_metadata.full_name.split(' ');
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    } else if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }
  }
  
  // If no name, use email
  if (user.email) {
    return user.email.substring(0, 2).toUpperCase();
  }
  
  // Fallback for mock data
  if (user.name) {
    const nameParts = user.name.split(' ');
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  }
  
  return 'US';
});

// Get user name
const userName = computed(() => {
  const user = authStore.user;
  
  if (!user) return 'User';
  
  if (user.user_metadata?.full_name) {
    return user.user_metadata.full_name;
  }
  
  if (user.name) {
    return user.name;
  }
  
  if (user.email) {
    return user.email.split('@')[0];
  }
  
  return 'User';
});

// Toggle user menu
const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value;
};

// Chat state management
const loadChatHistoryFromDatabase = async () => {
  try {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .order('updated_at', { ascending: false });
      
    if (error) throw error;
    
    // Transform the data to match our expected format
    return data.map(chat => ({
      id: chat.id,
      title: chat.title,
      updatedAt: new Date(chat.updated_at),
      user_id: chat.user_id
    })) || [];
  } catch (error) {
    console.error('Error loading chat history:', error);
    return [];
  }
};

const chatHistory = ref([]);
const currentChatId = ref(null);
const currentChat = ref(null);

// Load chat history when component mounts or user changes
const loadChats = async () => {
  if (authStore.isLoggedIn) {
    chatHistory.value = await loadChatHistoryFromDatabase();
  }
};

// Check for chat ID in URL on initial load
const route = useRoute();
if (route.path === '/chat' && route.query.id) {
  currentChatId.value = route.query.id;
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

// Method to start a new chat
const startNewChat = () => {
  currentChatId.value = null;
  currentChat.value = null;
  
  // Get the chat page component reference
  const chatPageRef = chatPageInstance.value;
  if (chatPageRef) {
    if (typeof chatPageRef.resetChat === 'function') {
      chatPageRef.resetChat();
    }
  }
  
  // Navigate to chat page without query parameters
  router.push('/chat');
};

// Method to load a chat when clicked in sidebar
const loadChat = (chat) => {
  currentChatId.value = chat.id;
  currentChat.value = chat;
  
  // Auto-collapse sidebar on mobile after selecting a chat
  if (isMobile.value) {
    sidebarCollapsed.value = true;
  }
  
  // Navigate to chat page if not already there
  if (router.currentRoute.value.path !== '/chat') {
    router.push({ path: '/chat', query: { id: chat.id } });
  } else if (!router.currentRoute.value.query.id || router.currentRoute.value.query.id !== chat.id) {
    // Update query parameter if on chat page but with different or no ID
    router.replace({ path: '/chat', query: { id: chat.id } });
  }
  
  // Get the chat page component reference
  const chatPageRef = chatPageInstance.value;
  if (chatPageRef && typeof chatPageRef.loadChat === 'function') {
    chatPageRef.loadChat(chat);
  }
  
  // Ensure the chat is in the history
  const existingChat = chatHistory.value.find(c => c.id === chat.id);
  if (!existingChat) {
    chatHistory.value.unshift(chat);
  }
};

// Reference to the chat page component instance
const chatPageInstance = ref(null);

// Update chat in database
const updateChatInDatabase = async (chat) => {
  try {
    const supabase = useSupabaseClient();
    const { error } = await supabase
      .from('chats')
      .upsert({
        id: chat.id,
        user_id: authStore.user.id,
        title: chat.title,
        updated_at: new Date().toISOString()
      });
      
    if (error) throw error;
  } catch (error) {
    console.error('Error updating chat:', error);
  }
};

// Provide chat data and methods to descendants
provide('chatData', {
  chatHistory,
  currentChatId,
  currentChat,
  loadChat,
  startNewChat,
  setChatPageInstance: (instance) => {
    chatPageInstance.value = instance;
  },
  updateChatHistory: async (updatedChat) => {
    // Update in database
    await updateChatInDatabase(updatedChat);
    
    // Update in local state
    const index = chatHistory.value.findIndex(c => c.id === updatedChat.id);
    if (index !== -1) {
      chatHistory.value[index] = updatedChat;
    } else {
      chatHistory.value.unshift(updatedChat);
    }
  },
  resetCurrentChat: () => {
    currentChatId.value = null;
    currentChat.value = null;
  }
});

// Handle user logout
const showLogoutConfirmation = () => {
  userMenuOpen.value = false;
  showLogoutModal.value = true;
};

const logout = async () => {
  try {
    await authStore.logout();
    showLogoutModal.value = false;
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
    showLogoutModal.value = false;
  }
};

// Close user menu when clicking outside
const handleClickOutside = (event) => {
  const userMenu = document.querySelector('.user-menu');
  if (userMenuOpen.value && userMenu && !userMenu.contains(event.target)) {
    userMenuOpen.value = false;
  }
};

// Watch for user changes and reload chat history
watch(() => authStore.user?.id, (newUserId) => {
  if (newUserId) {
    loadChats();
  } else {
    chatHistory.value = [];
  }
}, { immediate: true });

onMounted(() => {
  loadChats();
  document.addEventListener('click', handleClickOutside);
  checkMobileScreen(); // Set initial state on mount
  window.addEventListener('resize', checkMobileScreen); // Add event listener for resize
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', checkMobileScreen); // Remove event listener for resize
});

// Close menus on route change
watch(() => router.currentRoute.value.path, () => {
  userMenuOpen.value = false;
});
</script> 