<template>
  <div class="bg-gray-50 min-h-screen py-8 md:py-12">
    <div class="container mx-auto px-4">
      <div class="mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold mb-4 text-dark-text">Get Your Catering Estimate</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Fill in the details about your event and get an AI-powered estimate for your African catering needs.
        </p>
      </div>

      <div class="max-w-5xl mx-auto">
        <div v-if="!showResults" class="bg-white rounded-xl shadow-md p-6 md:p-8">
          <!-- Input Form -->
          <form @submit.prevent="generateResults" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Guest Count -->
              <div>
                <label for="guestCount" class="block mb-2 font-medium text-dark-text">
                  Number of Guests <span class="text-red-500">*</span>
                </label>
                <input
                  id="guestCount"
                  v-model="form.guestCount"
                  type="number"
                  min="1"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                  placeholder="e.g. 50"
                />
              </div>

              <!-- Event Type -->
              <div>
                <label for="eventType" class="block mb-2 font-medium text-dark-text">
                  Event Type <span class="text-red-500">*</span>
                </label>
                <select
                  id="eventType"
                  v-model="form.eventType"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                >
                  <option value="" disabled>Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="funeral">Funeral Reception</option>
                  <option value="naming">Naming Ceremony</option>
                  <option value="graduation">Graduation Party</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <!-- Budget Range -->
              <div class="col-span-1 md:col-span-2">
                <label for="budget" class="block mb-2 font-medium text-dark-text">
                  Budget Range (₦)
                </label>
                <div class="flex items-center space-x-4">
                  <span class="text-sm text-gray-500">₦{{ form.budget.toLocaleString() }}</span>
                  <input
                    id="budget"
                    v-model="form.budget"
                    type="range"
                    min="5000"
                    max="1000000"
                    step="5000"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-green"
                  />
                  <span class="text-sm text-gray-500">₦1,000,000</span>
                </div>
              </div>

              <!-- Cuisine Preferences -->
              <div class="col-span-1 md:col-span-2">
                <label class="block mb-2 font-medium text-dark-text">
                  Cuisine Preferences <span class="text-red-500">*</span>
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <div v-for="(cuisine, index) in cuisines" :key="index" class="flex items-center">
                    <input
                      :id="`cuisine-${index}`"
                      type="checkbox"
                      v-model="form.cuisinePreferences"
                      :value="cuisine.value"
                      class="w-5 h-5 text-primary-green border-gray-300 rounded focus:ring-primary-green"
                    />
                    <label :for="`cuisine-${index}`" class="ml-2 text-gray-700">{{ cuisine.label }}</label>
                  </div>
                </div>
              </div>

              <!-- Dietary Restrictions -->
              <div class="col-span-1 md:col-span-2">
                <label class="block mb-2 font-medium text-dark-text">Dietary Restrictions (optional)</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <div v-for="(restriction, index) in dietaryRestrictions" :key="index" class="flex items-center">
                    <input
                      :id="`restriction-${index}`"
                      type="checkbox"
                      v-model="form.dietaryRestrictions"
                      :value="restriction.value"
                      class="w-5 h-5 text-primary-green border-gray-300 rounded focus:ring-primary-green"
                    />
                    <label :for="`restriction-${index}`" class="ml-2 text-gray-700">{{ restriction.label }}</label>
                  </div>
                </div>
              </div>

              <!-- Region -->
              <div>
                <label for="region" class="block mb-2 font-medium text-dark-text">
                  Region <span class="text-red-500">*</span>
                </label>
                <select
                  id="region"
                  v-model="form.region"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                >
                  <option value="" disabled>Select region</option>
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                  <option value="ph">Port Harcourt</option>
                  <option value="east">Eastern Nigeria</option>
                  <option value="north">Northern Nigeria</option>
                  <option value="west">Western Nigeria</option>
                  <option value="south">Southern Nigeria</option>
                </select>
              </div>

              <!-- Additional Notes -->
              <div class="col-span-1 md:col-span-2">
                <label for="notes" class="block mb-2 font-medium text-dark-text">Additional Notes (optional)</label>
                <textarea
                  id="notes"
                  v-model="form.notes"
                  rows="3"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                  placeholder="Any specific requirements or preferences..."
                ></textarea>
              </div>
            </div>

            <div class="flex justify-center mt-8">
              <button
                type="submit"
                class="bg-primary-green hover:bg-light-green text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300"
              >
                Generate Catering Plan
              </button>
            </div>
          </form>
        </div>

        <!-- Results -->
        <div v-else class="bg-white rounded-xl shadow-md overflow-hidden">
          <!-- Header -->
          <div class="bg-dark-green py-4 px-6">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold text-white">Your AI-Generated Catering Plan</h2>
              <button @click="showResults = false" class="text-white hover:text-light-green transition">
                <span class="sr-only">Edit</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Event Details Summary -->
          <div class="p-6 bg-gray-50 border-b">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p class="text-sm text-gray-500">Event Type</p>
                <p class="font-medium">{{ eventTypeDisplay }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Guests</p>
                <p class="font-medium">{{ form.guestCount }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Region</p>
                <p class="font-medium">{{ regionDisplay }}</p>
              </div>
            </div>
          </div>

          <!-- Recommendations -->
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-4 text-dark-text">Recommended Dishes</h3>
            <div class="space-y-6">
              <div v-for="(category, index) in results.dishes" :key="`cat-${index}`" class="border-b border-gray-200 pb-5 last:border-b-0 last:pb-0">
                <h4 class="font-medium mb-3 text-primary-green">{{ category.category }}</h4>
                <div class="space-y-3">
                  <div v-for="(dish, dishIndex) in category.items" :key="`dish-${dishIndex}`" class="bg-pale-green p-4 rounded-lg">
                    <div class="flex justify-between items-start">
                      <div>
                        <h5 class="font-semibold text-dark-text">{{ dish.name }}</h5>
                        <p class="text-gray-600 text-sm mt-1">{{ dish.description }}</p>
                      </div>
                      <div class="text-right">
                        <p class="font-bold text-primary-green">{{ dish.quantity }}</p>
                        <p class="text-sm text-gray-500">₦{{ dish.cost.toLocaleString() }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Budget Summary -->
          <div class="p-6 bg-gray-50 border-t">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-dark-text">Budget Summary</h3>
              <span class="font-bold text-xl text-primary-green">₦{{ results.totalCost.toLocaleString() }}</span>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Total Food Cost</span>
                <span>₦{{ results.foodCost.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Logistics &amp; Services</span>
                <span>₦{{ results.servicesCost.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Cost Per Guest</span>
                <span>₦{{ results.costPerGuest.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="p-6 border-t flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button class="px-4 py-2 border border-primary-green text-primary-green hover:bg-pale-green rounded-lg transition">
              Download PDF
            </button>
            <button class="px-4 py-2 bg-primary-green hover:bg-light-green text-white rounded-lg transition">
              Share with Caterer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
});

const showResults = ref(false);

// Sample form data
const form = reactive({
  guestCount: null,
  eventType: '',
  budget: 100000,
  cuisinePreferences: [],
  dietaryRestrictions: [],
  region: '',
  notes: ''
});

// Options for cuisine preferences
const cuisines = [
  { value: 'jollof', label: 'Jollof Rice' },
  { value: 'pounded_yam', label: 'Pounded Yam & Egusi' },
  { value: 'fried_rice', label: 'Nigerian Fried Rice' },
  { value: 'ofada', label: 'Ofada Rice & Sauce' },
  { value: 'moi_moi', label: 'Moi Moi' },
  { value: 'asun', label: 'Asun (Spicy Goat Meat)' },
  { value: 'suya', label: 'Suya' },
  { value: 'amala', label: 'Amala & Ewedu' },
  { value: 'stew', label: 'Beef/Chicken Stew' }
];

// Options for dietary restrictions
const dietaryRestrictions = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'halal', label: 'Halal' },
  { value: 'no_beef', label: 'No Beef' },
  { value: 'no_pork', label: 'No Pork' },
  { value: 'low_spice', label: 'Low Spice' },
  { value: 'gluten_free', label: 'Gluten Free' }
];

// Computed properties for display
const eventTypeDisplay = computed(() => {
  const eventTypeMap = {
    'wedding': 'Wedding',
    'birthday': 'Birthday Party',
    'corporate': 'Corporate Event',
    'funeral': 'Funeral Reception',
    'naming': 'Naming Ceremony',
    'graduation': 'Graduation Party',
    'other': 'Other Event'
  };
  return eventTypeMap[form.eventType] || form.eventType;
});

const regionDisplay = computed(() => {
  const regionMap = {
    'lagos': 'Lagos',
    'abuja': 'Abuja',
    'ph': 'Port Harcourt',
    'east': 'Eastern Nigeria',
    'north': 'Northern Nigeria',
    'west': 'Western Nigeria',
    'south': 'Southern Nigeria'
  };
  return regionMap[form.region] || form.region;
});

// Mock results (would be replaced with actual API call to AI backend)
const results = reactive({
  dishes: [
    {
      category: 'Main Dishes',
      items: [
        {
          name: 'Jollof Rice',
          description: 'Spicy tomato rice, cooked to perfection',
          quantity: '15kg',
          cost: 75000
        },
        {
          name: 'Fried Rice',
          description: 'Colorful Nigerian-style fried rice with vegetables',
          quantity: '10kg',
          cost: 60000
        },
        {
          name: 'Pounded Yam',
          description: 'Smooth pounded yam',
          quantity: '10kg',
          cost: 40000
        }
      ]
    },
    {
      category: 'Protein',
      items: [
        {
          name: 'Assorted Beef Stew',
          description: 'Tender beef in tomato stew',
          quantity: '8kg',
          cost: 48000
        },
        {
          name: 'Grilled Chicken',
          description: 'Seasoned and grilled chicken pieces',
          quantity: '50 pieces',
          cost: 40000
        }
      ]
    },
    {
      category: 'Side Dishes',
      items: [
        {
          name: 'Moi Moi',
          description: 'Steamed bean pudding with peppers and fish',
          quantity: '80 pieces',
          cost: 30000
        },
        {
          name: 'Fried Plantain',
          description: 'Ripe plantain, fried until golden',
          quantity: '8kg',
          cost: 16000
        }
      ]
    },
    {
      category: 'Drinks',
      items: [
        {
          name: 'Soft Drinks',
          description: 'Assorted carbonated beverages',
          quantity: '100 bottles',
          cost: 35000
        },
        {
          name: 'Water',
          description: 'Bottled water',
          quantity: '50 bottles',
          cost: 10000
        }
      ]
    }
  ],
  foodCost: 354000,
  servicesCost: 70000,
  totalCost: 424000,
  costPerGuest: 4240
});

// Function to handle form submission
function generateResults() {
  // In a real app, this would send data to the server and get AI response
  // For MVP, we're just showing pre-defined mock data
  showResults.value = true;
}
</script>