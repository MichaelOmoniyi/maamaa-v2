<template>
  <div class="bg-gray-50 min-h-screen py-8 md:py-12">
    <div class="container mx-auto px-4">
      <div class="mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold mb-4 text-dark-text">Catering Estimate Preview</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Enter your event details to preview the catering estimator. Personalized menus and cost calculations are not available yet.
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
                  Cuisine Preferences (optional)
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
                Continue
              </button>
            </div>
          </form>
        </div>

        <!-- Availability notice -->
        <div v-else class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="bg-dark-green py-4 px-6">
            <div class="flex justify-between items-center gap-4">
              <h2 class="text-xl font-semibold text-white">Catering estimate unavailable</h2>
              <button @click="showResults = false" class="text-white hover:text-light-green transition">
                Edit event details
              </button>
            </div>
          </div>
          <div class="p-6" role="status">
            <p class="font-medium text-dark-text">This feature is still in development.</p>
            <p class="mt-2 text-gray-600">
              The current app does not calculate personalized quantities or prices. We have not connected the menu recommendation service or verified local food prices, so no estimate is shown.
            </p>
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

// Function to handle form submission
function generateResults() {
  // Native required-field validation runs before the form submit handler.
  showResults.value = true;
}
</script>
