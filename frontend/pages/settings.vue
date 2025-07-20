<template>
  <div class="h-full p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Settings Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p class="text-gray-600">Manage your account preferences and app settings.</p>
      </div>

      <!-- Settings Sections -->
      <div class="space-y-6">
        <!-- Account Settings -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
          
          <div class="space-y-4">
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div class="flex items-center space-x-4">
                <input 
                  type="email" 
                  v-model="userSettings.email"
                  class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
                  readonly
                />
                <span class="text-sm text-gray-500">Verified</span>
              </div>
            </div>

            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                v-model="userSettings.fullName"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
                placeholder="Enter your full name"
              />
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                v-model="userSettings.phone"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
                placeholder="+234 xxx xxx xxxx"
              />
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900">Email Notifications</h3>
                <p class="text-sm text-gray-500">Receive updates about your chats and events</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="userSettings.emailNotifications"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-green"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900">Push Notifications</h3>
                <p class="text-sm text-gray-500">Get instant notifications on your device</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="userSettings.pushNotifications"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-green"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900">Marketing Updates</h3>
                <p class="text-sm text-gray-500">Receive news about new features and tips</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="userSettings.marketingUpdates"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-green"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Chat Settings -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Chat Preferences</h2>
          
          <div class="space-y-4">
            <!-- Language Preference -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
              <select 
                v-model="userSettings.language"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                <option value="en">English</option>
                <option value="yo">Yoruba</option>
                <option value="ig">Igbo</option>
                <option value="ha">Hausa</option>
                <option value="tw">Twi</option>
                <option value="sw">Swahili</option>
              </select>
            </div>

            <!-- Regional Cuisine Preference -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Regional Cuisine Focus</label>
              <select 
                v-model="userSettings.cuisineRegion"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                <option value="all">All African Cuisines</option>
                <option value="west">West African</option>
                <option value="east">East African</option>
                <option value="north">North African</option>
                <option value="south">Southern African</option>
                <option value="central">Central African</option>
              </select>
            </div>

            <!-- Default Event Size -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Default Event Size</label>
              <select 
                v-model="userSettings.defaultEventSize"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                <option value="small">Small (1-25 guests)</option>
                <option value="medium">Medium (26-100 guests)</option>
                <option value="large">Large (101-300 guests)</option>
                <option value="xlarge">Extra Large (300+ guests)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Privacy & Security -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Privacy & Security</h2>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900">Chat History</h3>
                <p class="text-sm text-gray-500">Save your chat conversations for future reference</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="userSettings.saveChatHistory"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-green"></div>
              </label>
            </div>

            <div class="pt-4 border-t border-gray-200">
              <button 
                @click="clearChatHistory"
                class="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Clear All Chat History
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4 pt-6">
          <button 
            @click="resetSettings"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Reset to Defaults
          </button>
          <button 
            @click="saveSettings"
            class="px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-light-green transition-colors"
            :disabled="saving"
          >
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>
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
const saving = ref(false);

// User settings data
const userSettings = ref({
  email: authStore.user?.email || '',
  fullName: authStore.user?.user_metadata?.full_name || '',
  phone: '',
  emailNotifications: true,
  pushNotifications: true,
  marketingUpdates: false,
  language: 'en',
  cuisineRegion: 'all',
  defaultEventSize: 'medium',
  saveChatHistory: true
});

const saveSettings = async () => {
  saving.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would normally save to your backend
    console.log('Settings saved:', userSettings.value);
    
    // Show success message
    alert('Settings saved successfully!');
  } catch (error) {
    console.error('Failed to save settings:', error);
    alert('Failed to save settings. Please try again.');
  } finally {
    saving.value = false;
  }
};

const resetSettings = () => {
  if (confirm('Are you sure you want to reset all settings to their default values?')) {
    userSettings.value = {
      email: authStore.user?.email || '',
      fullName: authStore.user?.user_metadata?.full_name || '',
      phone: '',
      emailNotifications: true,
      pushNotifications: true,
      marketingUpdates: false,
      language: 'en',
      cuisineRegion: 'all',
      defaultEventSize: 'medium',
      saveChatHistory: true
    };
  }
};

const clearChatHistory = () => {
  if (confirm('Are you sure you want to clear all your chat history? This action cannot be undone.')) {
    // Here you would call your API to clear chat history
    console.log('Chat history cleared');
    alert('Chat history has been cleared.');
  }
};
</script>