<template>
  <div class="h-screen w-screen flex overflow-hidden bg-gray-50">
    <!-- Sidebar -->
    <div 
      :class="[
        'bg-dark-green text-white transition-all duration-300 ease-in-out flex flex-col',
        sidebarCollapsed ? 'w-16' : 'w-64'
      ]"
    >
      <!-- Sidebar Header -->
      <div class="p-4 border-b border-light-green/20">
        <div class="flex items-center justify-between">
          <div v-if="!sidebarCollapsed" class="flex items-center space-x-2">
            <img src="/images/maamaa-logo.png" alt="MaaMaa Logo" class="h-8" />
          </div>
          <button 
            @click="toggleSidebar"
            class="p-2 hover:bg-light-green/20 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Sidebar Content -->
      <div class="flex-1 overflow-y-auto">
        <!-- New Chat Button -->
        <div class="p-3">
          <button 
            @click="createNewChat"
            :class="[
              'w-full flex items-center space-x-3 p-3 bg-light-green hover:bg-light-green/80 rounded-lg transition-colors',
              sidebarCollapsed ? 'justify-center' : ''
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span v-if="!sidebarCollapsed" class="text-white font-medium">New Chat</span>
          </button>
        </div>

        <!-- Chat History -->
        <div v-if="authStore.user" class="px-3">
          <div v-if="!sidebarCollapsed" class="text-sm text-gray-300 font-medium mb-2 px-3">Recent Chats</div>
          <div class="space-y-1">
            <div 
              v-for="chat in chatHistory" 
              :key="chat.id"
              :class="[
                'flex items-center p-3 hover:bg-light-green/20 rounded-lg cursor-pointer transition-colors',
                sidebarCollapsed ? 'justify-center' : 'space-x-3'
              ]"
              @click="openChat(chat.id)"
            >
              <ChatIcon class="h-4 w-4 flex-shrink-0" />
              <div v-if="!sidebarCollapsed" class="flex-1 min-w-0">
                <div class="text-sm text-white truncate">{{ chat.title }}</div>
                <div class="text-xs text-gray-300">{{ formatDate(chat.createdAt) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Bar -->
      <header class="bg-white border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Left side - Logo (when sidebar is collapsed) -->
          <div class="flex items-center space-x-4">
            <img 
              v-if="sidebarCollapsed" 
              src="/images/maamaa-logo.png" 
              alt="MaaMaa Logo" 
              class="h-8" 
            />
            <div class="text-xl font-semibold text-gray-800">
              {{ currentPageTitle }}
            </div>
          </div>

          <!-- Right side - Notifications and Profile -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <!-- Notification badge -->
              <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>

            <!-- Profile Dropdown -->
            <div class="relative" ref="profileMenuContainer">
              <button 
                @click="profileMenuOpen = !profileMenuOpen"
                class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div class="w-8 h-8 bg-dark-green rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-medium">
                    {{ getUserInitials() }}
                  </span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>

              <!-- Profile Dropdown Menu -->
              <div 
                v-if="profileMenuOpen" 
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                @click.stop
              >
                <NuxtLink 
                  to="/profile" 
                  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="profileMenuOpen = false"
                >
                  <UserIcon class="h-4 w-4 mr-3" />
                  Profile
                </NuxtLink>
                <NuxtLink 
                  to="/settings" 
                  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="profileMenuOpen = false"
                >
                  <CogIcon class="h-4 w-4 mr-3" />
                  Settings
                </NuxtLink>
                <div class="border-t border-gray-100 my-1"></div>
                <button 
                  @click="logout"
                  class="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 2v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto bg-white">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
import ChatIcon from '~/components/icons/ChatIcon.vue';
import UserIcon from '~/components/icons/UserIcon.vue';
import CogIcon from '~/components/icons/CogIcon.vue';

const sidebarCollapsed = ref(false);
const profileMenuOpen = ref(false);
const profileMenuContainer = ref(null);

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// Mock chat history data - replace with actual data from your store/API
const chatHistory = ref([
  { id: 1, title: 'Wedding Planning Help', createdAt: new Date('2025-01-15') },
  { id: 2, title: 'Birthday Party Menu', createdAt: new Date('2025-01-14') },
  { id: 3, title: 'Corporate Event Catering', createdAt: new Date('2025-01-13') },
]);

const currentPageTitle = computed(() => {
  const titles = {
    '/chat': 'Chat',
    '/settings': 'Settings',
    '/profile': 'Profile'
  };
  return titles[route.path] || 'Chat';
});

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const createNewChat = () => {
  // Navigate to chat page or create new chat logic
  router.push('/chat');
};

const openChat = (chatId) => {
  // Navigate to specific chat
  router.push(`/chat?id=${chatId}`);
};

const getUserInitials = () => {
  if (!authStore.user) return 'U';
  const name = authStore.user.user_metadata?.full_name || authStore.user.email;
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const formatDate = (date) => {
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString();
};

const logout = async () => {
  try {
    await authStore.logout();
    profileMenuOpen.value = false;
    router.push('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// Close profile menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (event) => {
    if (profileMenuContainer.value && !profileMenuContainer.value.contains(event.target)) {
      profileMenuOpen.value = false;
    }
  });
});

// Close menus on route change
watch(() => route.path, () => {
  profileMenuOpen.value = false;
});
</script>

<style scoped>
/* Custom scrollbar for sidebar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>