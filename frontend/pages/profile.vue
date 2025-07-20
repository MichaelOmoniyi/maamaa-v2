<template>
  <div class="h-full p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Profile Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
        <p class="text-gray-600">Manage your personal information and account settings.</p>
      </div>

      <div v-if="loading" class="flex justify-center py-8">
        <svg class="animate-spin h-8 w-8 text-primary-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      
      <div v-else-if="!authStore.user" class="text-center py-8">
        <p class="text-lg text-gray-600 mb-4">You need to be logged in to view your profile.</p>
        <NuxtLink to="/login" class="btn-primary">Log In</NuxtLink>
      </div>
      
      <div v-else class="space-y-6">
        <!-- Success/Error messages -->
        <div v-if="successMessage" class="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {{ successMessage }}
        </div>
        <div v-if="error" class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {{ error }}
        </div>

        <!-- Profile Overview -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Profile Picture -->
            <div class="md:col-span-2 flex items-center space-x-4">
              <div class="w-20 h-20 bg-primary-green rounded-full flex items-center justify-center">
                <span class="text-white text-2xl font-bold">
                  {{ getUserInitials() }}
                </span>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">
                  {{ authStore.user.user_metadata?.full_name || 'User' }}
                </h3>
                <p class="text-gray-500">{{ authStore.user.email }}</p>
                <button class="text-primary-green hover:text-light-green text-sm font-medium mt-1">
                  Change photo
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div class="text-gray-900">{{ authStore.user.email }}</div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                Verified
              </span>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
              <div class="text-gray-900">Free Plan</div>
              <NuxtLink to="/pricing" class="text-primary-green hover:text-light-green text-sm font-medium">
                Upgrade to Premium
              </NuxtLink>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
              <div class="text-gray-900">{{ formatDate(authStore.user.created_at) }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Sign In</label>
              <div class="text-gray-900">{{ formatDate(authStore.user.last_sign_in_at) }}</div>
            </div>
          </div>
        </div>
        
        <!-- Update Profile Form -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
          
          <form @submit.prevent="updateProfile" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  v-model="form.fullName"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="Enter your full name"
                  :disabled="updateLoading"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="+234 xxx xxx xxxx"
                  :disabled="updateLoading"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  v-model="form.bio"
                  rows="3"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="Tell us a bit about yourself..."
                  :disabled="updateLoading"
                ></textarea>
              </div>
            </div>
            
            <div class="flex justify-end">
              <button
                type="submit"
                class="px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-light-green transition-colors flex items-center"
                :disabled="updateLoading"
              >
                <svg v-if="updateLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ updateLoading ? 'Updating...' : 'Update Profile' }}
              </button>
            </div>
          </form>
        </div>
        
        <!-- Change Password Form -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
          
          <form @submit.prevent="changePassword" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  v-model="passwordForm.newPassword"
                  type="password"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="Enter your new password"
                  :disabled="passwordLoading"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  v-model="passwordForm.confirmNewPassword"
                  type="password"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="Confirm your new password"
                  :disabled="passwordLoading"
                />
              </div>
            </div>
            
            <div class="flex justify-end">
              <button
                type="submit"
                class="px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-light-green transition-colors flex items-center"
                :disabled="passwordLoading || !passwordForm.newPassword || !passwordForm.confirmNewPassword"
              >
                <svg v-if="passwordLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ passwordLoading ? 'Changing...' : 'Change Password' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Account Stats -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-green">12</div>
              <div class="text-sm text-gray-500">Chats Started</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-green">5</div>
              <div class="text-sm text-gray-500">Events Planned</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-green">8</div>
              <div class="text-sm text-gray-500">Estimates Generated</div>
            </div>
          </div>
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
const { $supabase } = useNuxtApp();

const loading = ref(true);
const updateLoading = ref(false);
const passwordLoading = ref(false);
const successMessage = ref('');
const error = ref('');

const form = reactive({
  fullName: '',
  phone: '',
  bio: ''
});

const passwordForm = reactive({
  newPassword: '',
  confirmNewPassword: '',
});

const getUserInitials = () => {
  if (!authStore.user) return 'U';
  const name = authStore.user.user_metadata?.full_name || authStore.user.email;
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Fetch user data on mount
onMounted(async () => {
  try {
    if (authStore.user) {
      form.fullName = authStore.user.user_metadata?.full_name || '';
      form.phone = authStore.user.user_metadata?.phone || '';
      form.bio = authStore.user.user_metadata?.bio || '';
    }
  } catch (err) {
    error.value = err.message || 'Failed to load profile data';
  } finally {
    loading.value = false;
  }
});

// Update user profile
const updateProfile = async () => {
  updateLoading.value = true;
  error.value = '';
  successMessage.value = '';
  
  try {
    const { error: updateError } = await $supabase.auth.updateUser({
      data: { 
        full_name: form.fullName,
        phone: form.phone,
        bio: form.bio
      }
    });

    if (updateError) throw updateError;
    
    successMessage.value = 'Profile updated successfully!';
  } catch (err) {
    error.value = err.message || 'Failed to update profile';
  } finally {
    updateLoading.value = false;
  }
};

// Change password
const changePassword = async () => {
  passwordLoading.value = true;
  error.value = '';
  successMessage.value = '';
  
  try {
    // Check if passwords match
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      throw new Error('Passwords do not match');
    }
    
    // Check password strength
    if (passwordForm.newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    
    // Update password
    const { error: passwordError } = await $supabase.auth.updateUser({
      password: passwordForm.newPassword
    });

    if (passwordError) throw passwordError;
    
    // Clear form
    passwordForm.newPassword = '';
    passwordForm.confirmNewPassword = '';
    
    successMessage.value = 'Password changed successfully!';
  } catch (err) {
    error.value = err.message || 'Failed to change password';
  } finally {
    passwordLoading.value = false;
  }
};

// Clear messages on form changes
watch(() => [form.fullName, form.phone, form.bio], () => {
  error.value = '';
  successMessage.value = '';
});

watch(() => [passwordForm.newPassword, passwordForm.confirmNewPassword], () => {
  error.value = '';
  successMessage.value = '';
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
