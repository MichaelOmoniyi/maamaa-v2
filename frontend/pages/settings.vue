<template>
  <div class="container mx-auto px-6 py-8 max-w-6xl">
    <h1 class="text-3xl font-semibold mb-2">Settings</h1>
    <p class="text-gray-600 mb-8">Optimize your account here.</p>

    <!-- Settings Navigation -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="md:col-span-1">
        <div class="space-y-1">
          <div 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'p-4 rounded-lg cursor-pointer transition-colors',
              activeTab === tab.id ? 'bg-[#f1f9f4]' : 'hover:bg-gray-100'
            ]"
          >
            <span class="text-gray-800">{{ tab.name }}</span>
          </div>
        </div>
      </div>

      <!-- Settings Content -->
      <div class="md:col-span-3">
        <!-- Profile Information -->
        <div v-if="activeTab === 'profile'" class="bg-white rounded-lg">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-xl font-semibold">Profile Information</h2>
              <p class="text-gray-600">Manage your account information and password.</p>
            </div>
            <button 
              @click="editProfile" 
              class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
            >
              Edit details
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-gray-600 mb-2">Full Name</label>
              <input 
                type="text" 
                class="w-full border border-gray-300 rounded-lg p-3" 
                :readonly="!isEditingProfile"
                v-model="editableUserData.fullName"
              />
            </div>
            <div>
              <label class="block text-gray-600 mb-2">Email Address</label>
              <input 
                type="email" 
                class="w-full border border-gray-300 rounded-lg p-3" 
                :value="userData.email"
                readonly
              />
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-gray-600 mb-2">Phone Number</label>
            <input 
              type="tel" 
              class="w-full border border-gray-300 rounded-lg p-3" 
              :readonly="!isEditingProfile"
              v-model="editableUserData.phone"
            />
          </div>

          <div class="flex gap-3">
            <button 
              @click="changePassword" 
              class="bg-[#f1f9f4] hover:bg-[#e1f0e8] text-green-800 px-4 py-2 rounded-lg"
            >
              Change password
            </button>
            
            <button 
              v-if="isEditingProfile"
              @click="saveProfile" 
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Save changes
            </button>
            
            <button 
              v-if="isEditingProfile"
              @click="cancelEdit" 
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>

        <!-- Subscription Plan -->
        <div v-if="activeTab === 'subscription'" class="bg-white rounded-lg">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-xl font-semibold">Subscription Plan</h2>
              <p class="text-gray-600">Choose the plan that works best for your needs.</p>
            </div>
            <NuxtLink to="/upgrade" class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg inline-block">
              Upgrade plan
            </NuxtLink>
          </div>

          <div class="border border-gray-200 rounded-lg bg-[#FAFAFA] p-6 mb-6">
            <div class="flex items-center gap-2 mb-4">
              <h3 class="text-xl font-semibold">Free</h3>
              <span class="bg-[#f1f9f4] text-green-800 text-xs px-3 py-1 rounded-full">Current plan</span>
            </div>

            <ul class="space-y-4">
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Plan up to 3 events per month</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Get scaled recipes & ingredient quantities</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Basic cost estimates</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Access to standard inventory tracker</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Inventory -->
        <div v-if="activeTab === 'inventory'" class="bg-white rounded-lg">
          <div class="mb-6">
            <h2 class="text-xl font-semibold">Inventory</h2>
            <p class="text-gray-600">Quick overview of your business metrics.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-[#CFE9DA] p-4 rounded-lg">
              <div class="flex items-center gap-2 mb-6">
                <div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span class="text-sm text-gray-600">Total Sales</span>
              </div>
              <div class="text-2xl font-bold">₦7,500,341</div>
            </div>

            <div class="bg-[#CFE9DA] p-4 rounded-lg">
              <div class="flex items-center justify-between gap-2 mb-6">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-600">Total Profits</span>
                </div>
                <img src="/images/TrendUp.png" class="h-8 w-auto">
              </div>
              <div class="text-2xl font-bold">₦5,567,800</div>
            </div>

            <div class="bg-[#CFE9DA] p-4 rounded-lg">
              <div class="flex items-center justify-between gap-2 mb-6">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-600">Total Loss</span>
                </div>
                <img src="/images/TrendDown.png" class="h-8 w-auto">
              </div>
              <div class="text-2xl font-bold">₦112,000</div>
            </div>
          </div>
        </div>

        <!-- Kitchen Profile -->
        <div v-if="activeTab === 'kitchen'" class="bg-white rounded-lg">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-xl font-semibold">Kitchen Profile</h2>
              <p class="text-gray-600">Configure your default kitchen settings.</p>
            </div>
            <button 
              @click="editKitchenProfile" 
              class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
            >
              Edit details
            </button>
          </div>

          <div class="mb-6">
            <label class="block text-gray-600 mb-2">Base Servings</label>
            <input 
              type="number" 
              class="w-full border border-gray-300 rounded-lg p-3" 
              :value="kitchenData.baseServings"
              readonly
            />
            <p class="text-gray-600 text-sm mt-2">Your go-to default for quick taps ({{ kitchenData.baseServings }} guests).</p>
          </div>
        </div>

        <!-- Integrations -->
        <div v-if="activeTab === 'integrations'" class="bg-white rounded-lg">
          <div class="mb-6">
            <h2 class="text-xl font-semibold">Integrations</h2>
            <p class="text-gray-600">Connect with your favorite tools and services.</p>
          </div>

          <div class="border border-gray-200 bg-[#F5F5F5] rounded-lg p-6 mb-4">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <img src="/images/logos_whatsapp-icon.png" class="w-full h-full">
              </div>
              <h3 class="text-lg font-medium">WhatsApp Business</h3>
            </div>
            <div class="flex justify-between items-center mb-4">
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-600">Status:</span>
                <span class="bg-[#CFE9DA] text-[#0F3120] text-xs px-3 py-2 rounded-full">Connected</span>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
            <p class="text-sm text-gray-600">Business API integration for customer communication.</p>
          </div>

          <div class="border border-gray-200 bg-[#F5F5F5] rounded-lg p-6">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <img src="/images/simple-icons_googlesheets.png" class="w-full h-full">
              </div>
              <h3 class="text-lg font-medium">Google Sheets/Excel</h3>
            </div>
            <div class="flex justify-between items-center mb-4">
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-600">Status:</span>
                <span class="bg-[#F8D7DA] text-red-800 text-xs px-3 py-2 rounded-full">Disconnected</span>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
            <p class="text-sm text-gray-600">Export events to spreadsheet automatically</p>
          </div>
        </div>

        <!-- Data & Privacy -->
        <div v-if="activeTab === 'data'" class="bg-white rounded-lg">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-xl font-semibold">Data & Privacy</h2>
              <p class="text-gray-600">Manage your data and privacy settings.</p>
            </div>
            <button 
              @click="confirmDeleteData"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete all data
            </button>
          </div>

          <div class="border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-medium mb-2">Export my data</h3>
            <p class="text-gray-600 mb-4">Download a copy of your events and logs.</p>
            <button 
              @click="downloadUserData"
              class="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              <span>Download my data (PDF/CSV)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useAuthStore } from '~/store/auth';

definePageMeta({
  middleware: ['auth'],
  layout: 'chat'
});

const authStore = useAuthStore();

const tabs = [
  { id: 'profile', name: 'Profile' },
  { id: 'subscription', name: 'Subscription Plan' },
  { id: 'inventory', name: 'Inventory' },
  { id: 'kitchen', name: 'Kitchen Profile' },
  { id: 'integrations', name: 'Integrations' },
  { id: 'data', name: 'Data & Privacy' },
];

const activeTab = ref('profile');
const isEditingProfile = ref(false);

// Get user data from auth store
const userData = computed(() => {
  const user = authStore.user || {};
  
  return {
    fullName: user.user_metadata?.full_name || user.name || 'Snow Olohijere',
    email: user.email || 'snow@gmail.com',
    phone: user.user_metadata?.phone || '+234 801 383 7482'
  };
});

// Editable user data
const editableUserData = reactive({
  fullName: '',
  phone: ''
});

// Initialize editable data with user data
onMounted(() => {
  editableUserData.fullName = userData.value.fullName;
  editableUserData.phone = userData.value.phone;
});

// Profile editing methods
const editProfile = () => {
  // Copy current values to editable form
  editableUserData.fullName = userData.value.fullName;
  editableUserData.phone = userData.value.phone;
  isEditingProfile.value = true;
};

const saveProfile = async () => {
  try {
    // In a real app, this would call an API to update the user profile
    // await authStore.updateProfile({
    //   full_name: editableUserData.fullName,
    //   phone: editableUserData.phone
    // });
    
    alert('Profile updated successfully!');
    isEditingProfile.value = false;
  } catch (error) {
    console.error('Failed to update profile:', error);
    alert('Failed to update profile. Please try again.');
  }
};

const cancelEdit = () => {
  isEditingProfile.value = false;
};

const changePassword = () => {
  // This would typically navigate to a password change page or open a modal
  alert('Password change functionality is not yet implemented.');
};

// Kitchen Profile data
const kitchenData = computed(() => {
  return {
    baseServings: authStore.user?.user_metadata?.base_servings || 50
  };
});

// Edit Kitchen Profile
const editKitchenProfile = () => {
  // This would typically open a modal or navigate to an edit page
  alert('Kitchen Profile editing is not yet implemented.');
};

// Data & Privacy methods
const confirmDeleteData = () => {
  if (confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
    // Call API to delete user data
    alert('Your data has been scheduled for deletion.');
  }
};

const downloadUserData = () => {
  // In a real app, this would trigger an API call to generate and download the data
  alert('Your data export has been initiated. You will receive an email with the download link shortly.');
};
</script>