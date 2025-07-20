<template>
  <div class="bg-gray-50 min-h-screen py-8 md:py-12">
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
          <div class="mt-4 md:mt-0">
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
                      <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span class="text-sm font-medium text-gray-600">{{ item.name.charAt(0).toUpperCase() }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                      <div class="text-sm text-gray-500">{{ item.description }}</div>
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

      <!-- Add/Edit Modal -->
      <div v-if="showAddModal || editingItem" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
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
          
          <form @submit.prevent="saveItem" class="space-y-4">
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

// Form data
const itemForm = ref({
  name: '',
  description: '',
  category: '',
  quantity: '',
  unit: '',
  minQuantity: ''
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

const saveItem = () => {
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
  
  if (editingItem.value) {
    // Update existing item
    const index = inventoryItems.value.findIndex(item => item.id === editingItem.value.id);
    if (index !== -1) {
      inventoryItems.value[index] = { ...newItem, id: editingItem.value.id };
    }
  } else {
    // Add new item
    newItem.id = Date.now(); // Simple ID generation
    inventoryItems.value.push(newItem);
  }
  
  closeModal();
};

const deleteItem = (itemId) => {
  if (confirm('Are you sure you want to delete this item?')) {
    inventoryItems.value = inventoryItems.value.filter(item => item.id !== itemId);
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
</script>
