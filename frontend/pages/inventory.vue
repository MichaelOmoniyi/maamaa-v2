<template>
  <div class="bg-gray-50 min-h-screen py-8 md:py-12 pt-24 md:pt-24">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold mb-2 text-dark-text">Inventory Management</h1>
            <p class="text-gray-600">
              Manage your ingredients, supplies, and catering inventory efficiently.
            </p>
          </div>
          <div class="mt-4 md:mt-0 flex space-x-3">
            <button 
              @click="showCameraModal = true"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Scan Item
            </button>
            <button 
              @click="showAddModal = true"
              class="bg-primary-green hover:bg-dark-green text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Item
            </button>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label for="search" class="block text-sm font-medium text-gray-700 mb-2">Search Items</label>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search by name..."
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green"
            />
          </div>
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              id="category"
              v-model="selectedCategory"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green"
            >
              <option value="">All Categories</option>
              <option value="spices">Spices & Seasonings</option>
              <option value="proteins">Proteins</option>
              <option value="vegetables">Vegetables</option>
              <option value="grains">Grains & Starches</option>
              <option value="supplies">Supplies & Equipment</option>
            </select>
          </div>
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
            <select
              id="status"
              v-model="selectedStatus"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green"
            >
              <option value="">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          <div class="flex items-end">
            <button 
              @click="clearFilters"
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Inventory Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Items</p>
              <p class="text-2xl font-bold text-dark-text">{{ totalItems }}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">In Stock</p>
              <p class="text-2xl font-bold text-green-600">{{ inStockItems }}</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Low Stock</p>
              <p class="text-2xl font-bold text-yellow-600">{{ lowStockItems }}</p>
            </div>
            <div class="p-3 bg-yellow-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Out of Stock</p>
              <p class="text-2xl font-bold text-red-600">{{ outOfStockItems }}</p>
            </div>
            <div class="p-3 bg-red-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Inventory Table -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in filteredItems" :key="item.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <div v-if="item.imageUrl" class="h-10 w-10 rounded-full overflow-hidden">
                        <img :src="item.imageUrl" class="h-full w-full object-cover" :alt="item.name" />
                      </div>
                      <div v-else class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span class="text-sm font-medium text-gray-600">{{ item.name.charAt(0).toUpperCase() }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                      <div class="text-sm text-gray-500">{{ item.description }}</div>
                      <div v-if="item.barcode" class="text-xs text-blue-500 mt-1">Barcode: {{ item.barcode }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize" 
                        :class="getCategoryClass(item.category)">
                    {{ item.category }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.quantity }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.unit }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="getStatusClass(item.status)">
                    {{ item.status.replace('-', ' ') }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(item.lastUpdated) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button 
                      @click="editItem(item)"
                      class="text-primary-green hover:text-dark-green"
                    >
                      Edit
                    </button>
                    <button 
                      @click="deleteItem(item.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredItems.length === 0" class="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No items found</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by adding your first inventory item.</p>
          <div class="mt-6">
            <button 
              @click="showAddModal = true"
              class="bg-primary-green hover:bg-dark-green text-white px-4 py-2 rounded-lg font-medium transition duration-200"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>

      <!-- Camera Modal -->
      <div v-if="showCameraModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[85vh] overflow-hidden flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-dark-text">
              {{ capturedImage ? 'Name Your Item' : 'Scan Food Item' }}
            </h3>
            <button @click="closeCameraModal" class="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div v-if="!capturedImage" class="space-y-4 overflow-y-auto flex-1">
            <div class="relative bg-black rounded-lg overflow-hidden aspect-square">
              <video ref="videoElement" autoplay playsinline class="absolute inset-0 w-full h-full object-cover"></video>
            </div>
            
            <div class="flex justify-center">
              <button 
                @click="captureImage"
                class="bg-primary-green hover:bg-dark-green text-white px-6 py-3 rounded-lg font-medium transition duration-200"
              >
                Take Photo
              </button>
            </div>
          </div>
          
          <div v-else class="space-y-4 overflow-y-auto flex-1">
            <div class="relative bg-black rounded-lg overflow-hidden aspect-square">
              <img :src="capturedImage" class="absolute inset-0 w-full h-full object-cover" alt="Captured food item" />
            </div>
            
            <div>
              <label for="itemName" class="block text-sm font-medium text-gray-700 mb-2">Name Your Item *</label>
              <input
                id="itemName"
                v-model="scannedItemName"
                type="text"
                required
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                placeholder="e.g., Fresh Tomatoes"
              />
            </div>
            
            <div v-if="generatedBarcode" class="flex flex-col items-center space-y-2">
              <p class="text-sm font-medium text-gray-700">Generated Barcode:</p>
              <img :src="generatedBarcode" class="h-24 object-contain" alt="Generated barcode" />
              <p class="text-xs text-gray-500">{{ barcodeValue }}</p>
            </div>
            
            <div class="flex space-x-3 pt-4">
              <button
                @click="retakePhoto"
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition duration-200"
              >
                Retake
              </button>
              <button
                @click="saveScannedItem"
                :disabled="!scannedItemName"
                :class="[
                  'flex-1 py-2 rounded-lg font-medium transition duration-200',
                  scannedItemName 
                    ? 'bg-primary-green hover:bg-dark-green text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                ]"
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <div v-if="showAddModal || editingItem" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-hidden flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-dark-text">
              {{ editingItem ? 'Edit Item' : 'Add New Item' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="saveItem" class="space-y-4 overflow-y-auto flex-1">
            <div>
              <label for="itemName" class="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                id="itemName"
                v-model="itemForm.name"
                type="text"
                required
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                placeholder="e.g., Scotch Bonnet Peppers"
              />
            </div>
            
            <div>
              <label for="itemDescription" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                id="itemDescription"
                v-model="itemForm.description"
                rows="2"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                placeholder="Brief description of the item"
              ></textarea>
            </div>
            
            <div>
              <label for="itemCategory" class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                id="itemCategory"
                v-model="itemForm.category"
                required
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green"
              >
                <option value="" disabled>Select category</option>
                <option value="spices">Spices & Seasonings</option>
                <option value="proteins">Proteins</option>
                <option value="vegetables">Vegetables</option>
                <option value="grains">Grains & Starches</option>
                <option value="supplies">Supplies & Equipment</option>
              </select>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="itemQuantity" class="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                <input
                  id="itemQuantity"
                  v-model="itemForm.quantity"
                  type="number"
                  min="0"
                  step="0.1"
                  required
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                />
              </div>
              
              <div>
                <label for="itemUnit" class="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
                <select
                  id="itemUnit"
                  v-model="itemForm.unit"
                  required
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                >
                  <option value="" disabled>Select unit</option>
                  <option value="kg">Kilograms</option>
                  <option value="g">Grams</option>
                  <option value="lbs">Pounds</option>
                  <option value="oz">Ounces</option>
                  <option value="pieces">Pieces</option>
                  <option value="bottles">Bottles</option>
                  <option value="packets">Packets</option>
                  <option value="bags">Bags</option>
                </select>
              </div>
            </div>
            
            <div>
              <label for="minQuantity" class="block text-sm font-medium text-gray-700 mb-2">Minimum Quantity Alert</label>
              <input
                id="minQuantity"
                v-model="itemForm.minQuantity"
                type="number"
                min="0"
                step="0.1"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                placeholder="Alert when quantity goes below this"
              />
            </div>
            
            <div class="flex space-x-3 pt-4">
              <button
                type="submit"
                class="flex-1 bg-primary-green hover:bg-dark-green text-white py-2 rounded-lg font-medium transition duration-200"
              >
                {{ editingItem ? 'Update Item' : 'Add Item' }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Notification Modal -->
      <div v-if="showNotificationModal" 
           class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4"
           @click.self="closeNotification">
        <div class="bg-white rounded-xl p-4 w-full max-w-sm mx-4 shadow-lg transform transition-all" 
             :class="{
               'border-l-4 border-green-500': notificationType === 'success',
               'border-l-4 border-red-500': notificationType === 'error',
               'border-l-4 border-blue-500': notificationType === 'info'
             }">
          <div class="flex items-center">
            <!-- Success Icon -->
            <div v-if="notificationType === 'success'" class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <!-- Error Icon -->
            <div v-if="notificationType === 'error'" class="flex-shrink-0">
              <svg class="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <!-- Info Icon -->
            <div v-if="notificationType === 'info'" class="flex-shrink-0">
              <svg class="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div class="ml-3 w-0 flex-1">
              <p class="text-sm leading-5 font-medium" 
                 :class="{
                   'text-green-800': notificationType === 'success',
                   'text-red-800': notificationType === 'error',
                   'text-blue-800': notificationType === 'info'
                 }">
                {{ notificationMessage }}
              </p>
            </div>
            
            <div class="ml-4 flex-shrink-0 flex">
              <button @click="closeNotification" class="inline-flex text-gray-400 hover:text-gray-500">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'default'
});

// Reactive data
const showAddModal = ref(false);
const editingItem = ref(null);
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedStatus = ref('');

// Notification modal
const showNotificationModal = ref(false);
const notificationMessage = ref('');
const notificationType = ref('success'); // 'success', 'error', 'info'

// Camera functionality
const showCameraModal = ref(false);
const videoElement = ref(null);
const capturedImage = ref(null);
const scannedItemName = ref('');
const generatedBarcode = ref(null);
const barcodeValue = ref('');
let mediaStream = null;

// Form data
const itemForm = ref({
  name: '',
  description: '',
  category: '',
  quantity: '',
  unit: '',
  minQuantity: '',
  barcode: '',
  imageUrl: ''
});

// Sample inventory data - replace with actual API calls
const inventoryItems = ref([
  {
    id: 1,
    name: 'Scotch Bonnet Peppers',
    description: 'Hot peppers for spicing dishes',
    category: 'spices',
    quantity: 2.5,
    unit: 'kg',
    minQuantity: 1,
    status: 'in-stock',
    lastUpdated: new Date('2025-01-15')
  },
  {
    id: 2,
    name: 'Palm Oil',
    description: 'Red palm oil for cooking',
    category: 'spices',
    quantity: 0.5,
    unit: 'bottles',
    minQuantity: 2,
    status: 'low-stock',
    lastUpdated: new Date('2025-01-14')
  },
  {
    id: 3,
    name: 'Rice (Jollof)',
    description: 'Long grain rice for jollof',
    category: 'grains',
    quantity: 0,
    unit: 'bags',
    minQuantity: 2,
    status: 'out-of-stock',
    lastUpdated: new Date('2025-01-13')
  },
  {
    id: 4,
    name: 'Chicken',
    description: 'Fresh whole chicken',
    category: 'proteins',
    quantity: 15,
    unit: 'pieces',
    minQuantity: 5,
    status: 'in-stock',
    lastUpdated: new Date('2025-01-16')
  },
  {
    id: 5,
    name: 'Tomatoes',
    description: 'Fresh tomatoes for stew',
    category: 'vegetables',
    quantity: 3,
    unit: 'kg',
    minQuantity: 2,
    status: 'in-stock',
    lastUpdated: new Date('2025-01-15')
  }
]);

// Computed properties
const filteredItems = computed(() => {
  let items = inventoryItems.value;
  
  if (searchQuery.value) {
    items = items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  if (selectedCategory.value) {
    items = items.filter(item => item.category === selectedCategory.value);
  }
  
  if (selectedStatus.value) {
    items = items.filter(item => item.status === selectedStatus.value);
  }
  
  return items;
});

const totalItems = computed(() => inventoryItems.value.length);
const inStockItems = computed(() => inventoryItems.value.filter(item => item.status === 'in-stock').length);
const lowStockItems = computed(() => inventoryItems.value.filter(item => item.status === 'low-stock').length);
const outOfStockItems = computed(() => inventoryItems.value.filter(item => item.status === 'out-of-stock').length);

// Methods
const getCategoryClass = (category) => {
  const classes = {
    spices: 'bg-red-100 text-red-800',
    proteins: 'bg-blue-100 text-blue-800',
    vegetables: 'bg-green-100 text-green-800',
    grains: 'bg-yellow-100 text-yellow-800',
    supplies: 'bg-purple-100 text-purple-800'
  };
  return classes[category] || 'bg-gray-100 text-gray-800';
};

const getStatusClass = (status) => {
  const classes = {
    'in-stock': 'bg-green-100 text-green-800',
    'low-stock': 'bg-yellow-100 text-yellow-800',
    'out-of-stock': 'bg-red-100 text-red-800'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const clearFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
  selectedStatus.value = '';
};

const editItem = (item) => {
  editingItem.value = item;
  itemForm.value = { ...item };
  showAddModal.value = false;
};

const closeModal = () => {
  showAddModal.value = false;
  editingItem.value = null;
  itemForm.value = {
    name: '',
    description: '',
    category: '',
    quantity: '',
    unit: '',
    minQuantity: ''
  };
};

const saveItem = async () => {
  const newItem = {
    ...itemForm.value,
    quantity: parseFloat(itemForm.value.quantity),
    minQuantity: parseFloat(itemForm.value.minQuantity) || 0,
    lastUpdated: new Date()
  };
  
  // Determine status based on quantity
  if (newItem.quantity === 0) {
    newItem.status = 'out-of-stock';
  } else if (newItem.quantity <= newItem.minQuantity) {
    newItem.status = 'low-stock';
  } else {
    newItem.status = 'in-stock';
  }
  
  try {
  if (editingItem.value) {
    // Update existing item
      await saveItemToSupabase({ ...newItem, id: editingItem.value.id });
  } else {
    // Add new item
      await saveItemToSupabase(newItem);
  }
  
  closeModal();
  } catch (error) {
    console.error('Error saving item:', error);
    showNotification(`Failed to save item: ${error.message || 'Unknown error'}. Please try again.`, 'error');
  }
};

const deleteItem = async (itemId) => {
  if (window.confirm('Are you sure you want to delete this item?')) {
    try {
      await deleteItemFromSupabase(itemId);
    } catch (error) {
      console.error('Error deleting item:', error);
      showNotification('Failed to delete item. Please try again.', 'error');
    }
  }
};

// Update item status based on quantity changes
watch(inventoryItems, (newItems) => {
  newItems.forEach(item => {
    if (item.quantity === 0) {
      item.status = 'out-of-stock';
    } else if (item.quantity <= item.minQuantity) {
      item.status = 'low-stock';
    } else {
      item.status = 'in-stock';
    }
  });
}, { deep: true });

// Camera functionality methods
const openCamera = async () => {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'environment' } 
    });
    
    if (videoElement.value) {
      videoElement.value.srcObject = mediaStream;
    }
  } catch (error) {
    console.error('Error accessing camera:', error);
    alert('Unable to access your camera. Please check permissions.');
  }
};

const captureImage = () => {
  const canvas = document.createElement('canvas');
  const video = videoElement.value;
  
  if (video) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    capturedImage.value = canvas.toDataURL('image/jpeg');
    stopCamera();
    generateBarcode();
  }
};

const stopCamera = () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
};

const retakePhoto = () => {
  capturedImage.value = null;
  scannedItemName.value = '';
  generatedBarcode.value = null;
  barcodeValue.value = '';
  openCamera();
};

const generateBarcode = () => {
  // Generate a unique barcode value
  barcodeValue.value = 'ITEM' + Date.now().toString();
  
  // Generate barcode image
  generateBarcodeImage(barcodeValue.value);
};

const generateBarcodeImage = async (value) => {
  // Using bwipjs API to generate barcode
  generatedBarcode.value = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${value}&scale=3&includetext=true`;
};

const saveScannedItem = async () => {
  if (!scannedItemName.value) return;
  
  try {
    const supabase = useSupabaseClient();
    
    // Convert base64 image to file
    const imageFile = await base64ToFile(capturedImage.value, `${barcodeValue.value}.jpg`);
    
    // Upload to Supabase storage
    const { data: imageData, error: imageError } = await supabase
      .storage
      .from('inventory_images')
      .upload(`${barcodeValue.value}.jpg`, imageFile, {
        contentType: 'image/jpeg',
        upsert: true
      });
    
    if (imageError) throw imageError;
    
    // Get public URL for the uploaded image
    const { data: { publicUrl } } = supabase
      .storage
      .from('inventory_images')
      .getPublicUrl(`${barcodeValue.value}.jpg`);
    
    // Create inventory item with barcode and image URL
    const newItem = {
      name: scannedItemName.value,
      description: `Scanned item: ${scannedItemName.value}`,
      category: 'scanned', // Default category, can be changed later
      quantity: 1,
      unit: 'pieces',
      minQuantity: 0,
      status: 'in-stock',
      barcode: barcodeValue.value,
      imageUrl: publicUrl
    };
    
    // Save to Supabase database
    await saveItemToSupabase(newItem);
    
    // Close modal and reset
    closeCameraModal();
    
    // Show success notification
    showNotification(`${newItem.name} has been added to your inventory!`, 'success');
    
  } catch (error) {
    console.error('Error saving scanned item:', error);
    showNotification(`Failed to save item: ${error.message || 'Unknown error'}. Please try again.`, 'error');
  }
};

const base64ToFile = async (base64String, filename) => {
  const res = await fetch(base64String);
  const blob = await res.blob();
  return new File([blob], filename, { type: 'image/jpeg' });
};

const closeCameraModal = () => {
  stopCamera();
  showCameraModal.value = false;
  capturedImage.value = null;
  scannedItemName.value = '';
  generatedBarcode.value = null;
  barcodeValue.value = '';
};

// Watch for camera modal opening to initialize camera
watch(showCameraModal, (isOpen) => {
  if (isOpen) {
    openCamera();
  } else {
    stopCamera();
  }
});

// Supabase integration functions
const fetchInventoryItems = async () => {
  try {
    const supabase = useSupabaseClient();
    
    const { data, error } = await supabase
      .from('inventory_items')
      .select('*')
      .order('updated_at', { ascending: false });
      
    if (error) throw error;
    
    // Update local state
    inventoryItems.value = data.map(item => ({
      ...item,
      lastUpdated: new Date(item.updated_at),
      quantity: parseFloat(item.quantity),
      minQuantity: parseFloat(item.min_quantity || 0)
    }));
    
  } catch (error) {
    console.error('Error fetching inventory items:', error);
  }
};

const saveItemToSupabase = async (item) => {
  try {
    const supabase = useSupabaseClient();
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    // Convert to database format
    const dbItem = {
      user_id: user.id, // Add user_id field
      name: item.name,
      description: item.description || '',
      category: item.category,
      quantity: parseFloat(item.quantity),
      unit: item.unit,
      min_quantity: parseFloat(item.minQuantity) || 0,
      status: item.status,
      barcode: item.barcode || null,
      image_url: item.imageUrl || null
    };
    
    if (item.id && typeof item.id === 'string') {
      // Update existing item
      const { error } = await supabase
        .from('inventory_items')
        .update(dbItem)
        .eq('id', item.id);
        
      if (error) throw error;
    } else {
      // Insert new item
      const { error } = await supabase
        .from('inventory_items')
        .insert(dbItem);
        
      if (error) throw error;
    }
    
    // Refresh inventory items
    await fetchInventoryItems();
    
  } catch (error) {
    console.error('Error saving inventory item:', error);
    throw error;
  }
};

const deleteItemFromSupabase = async (itemId) => {
  try {
    const supabase = useSupabaseClient();
    
    const { error } = await supabase
      .from('inventory_items')
      .delete()
      .eq('id', itemId);
      
    if (error) throw error;
    
    // Refresh inventory items
    await fetchInventoryItems();
    
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    throw error;
  }
};

// Fetch items when component mounts
onMounted(() => {
  fetchInventoryItems();
});
// Notification modal functions
const showNotification = (message, type = 'success') => {
  notificationMessage.value = message;
  notificationType.value = type;
  showNotificationModal.value = true;
  
  // Auto-hide notification after 3 seconds for success messages
  if (type === 'success') {
    setTimeout(() => {
      showNotificationModal.value = false;
    }, 3000);
  }
};

const closeNotification = () => {
  showNotificationModal.value = false;
};
</script>