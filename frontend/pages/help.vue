<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold text-center mb-6">Frequently asked questions</h1>
    
    <p class="text-center mb-8 text-gray-700">
      Whether you're trying to plan your first event, or just understand
      how MaaMaa works, we're here for you. Check out common
      questions below, or <NuxtLink to="/chat" class="text-green-600 hover:underline">send a message</NuxtLink> directly.
    </p>

    <div class="mb-8">
      <div class="relative">
        <input 
          type="text" 
          placeholder="Search" 
          class="w-full py-3 px-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <!-- FAQ Item 1 -->
      <div class="bg-gray-100 rounded-lg p-5">
        <div @click="toggleFaq(1)" class="flex justify-between items-center cursor-pointer">
          <div class="flex items-center gap-3">
            <div class="bg-green-700 rounded-full p-1 w-8 h-8 flex items-center justify-center">
              <QuestionMarkCircleIcon class="w-5 h-5 text-white" />
            </div>
            <h3 class="font-medium text-lg">How do I plan a new event on MaaMaa?</h3>
          </div>
          <ChevronUpIcon v-if="openFaq === 1" class="w-6 h-6 text-gray-500" />
          <ChevronDownIcon v-else class="w-6 h-6 text-gray-500" />
        </div>
        <div v-if="openFaq === 1" class="mt-3 ml-11 text-gray-700">
          <p>MaaMaa makes it easy. Just enter "Plan Event" on your chatbox, enter your guest count and dishes, and we'll handle the rest — from portions to vendor suggestions.</p>
        </div>
      </div>

      <!-- FAQ Item 2 -->
      <div class="bg-gray-100 rounded-lg p-5">
        <div @click="toggleFaq(2)" class="flex justify-between items-center cursor-pointer">
          <div class="flex items-center gap-3">
            <div class="bg-green-700 rounded-full p-1 w-8 h-8 flex items-center justify-center">
              <QuestionMarkCircleIcon class="w-5 h-5 text-white" />
            </div>
            <h3 class="font-medium text-lg">Can MaaMaa help me find vendors?</h3>
          </div>
          <ChevronUpIcon v-if="openFaq === 2" class="w-6 h-6 text-gray-500" />
          <ChevronDownIcon v-else class="w-6 h-6 text-gray-500" />
        </div>
        <div v-if="openFaq === 2" class="mt-3 ml-11 text-gray-700">
          <p>Yes! We have a network of trusted vendors for various services. Tell us what you need in the chat, and we'll recommend options based on your location and requirements.</p>
        </div>
      </div>

      <!-- FAQ Item 3 -->
      <div class="bg-gray-100 rounded-lg p-5">
        <div @click="toggleFaq(3)" class="flex justify-between items-center cursor-pointer">
          <div class="flex items-center gap-3">
            <div class="bg-green-700 rounded-full p-1 w-8 h-8 flex items-center justify-center">
              <QuestionMarkCircleIcon class="w-5 h-5 text-white" />
            </div>
            <h3 class="font-medium text-lg">Does MaaMaa understand local measurements?</h3>
          </div>
          <ChevronUpIcon v-if="openFaq === 3" class="w-6 h-6 text-gray-500" />
          <ChevronDownIcon v-else class="w-6 h-6 text-gray-500" />
        </div>
        <div v-if="openFaq === 3" class="mt-3 ml-11 text-gray-700">
          <p>Absolutely! Our system is designed to understand and convert between various local measurement units, ensuring accurate portions and quantities for your region.</p>
        </div>
      </div>

      <!-- FAQ Item 4 -->
      <div class="bg-gray-100 rounded-lg p-5">
        <div @click="toggleFaq(4)" class="flex justify-between items-center cursor-pointer">
          <div class="flex items-center gap-3">
            <div class="bg-green-700 rounded-full p-1 w-8 h-8 flex items-center justify-center">
              <QuestionMarkCircleIcon class="w-5 h-5 text-white" />
            </div>
            <h3 class="font-medium text-lg">Does MaaMaa have a mobile app?</h3>
          </div>
          <ChevronUpIcon v-if="openFaq === 4" class="w-6 h-6 text-gray-500" />
          <ChevronDownIcon v-else class="w-6 h-6 text-gray-500" />
        </div>
        <div v-if="openFaq === 4" class="mt-3 ml-11 text-gray-700">
          <p>Our mobile app is coming soon! For now, our website is fully responsive and works great on mobile devices. You'll get the same great experience on any device.</p>
        </div>
      </div>

      <!-- FAQ Item 5 -->
      <div class="bg-gray-100 rounded-lg p-5">
        <div @click="toggleFaq(5)" class="flex justify-between items-center cursor-pointer">
          <div class="flex items-center gap-3">
            <div class="bg-green-700 rounded-full p-1 w-8 h-8 flex items-center justify-center">
              <QuestionMarkCircleIcon class="w-5 h-5 text-white" />
            </div>
            <h3 class="font-medium text-lg">Do I have to pay for everything?</h3>
          </div>
          <ChevronUpIcon v-if="openFaq === 5" class="w-6 h-6 text-gray-500" />
          <ChevronDownIcon v-else class="w-6 h-6 text-gray-500" />
        </div>
        <div v-if="openFaq === 5" class="mt-3 ml-11 text-gray-700">
          <p>MaaMaa offers a free tier with basic planning features. Premium features like vendor coordination and advanced analytics require a subscription. Check our pricing page for details.</p>
        </div>
      </div>
    </div>

    <div class="mt-12 text-center">
      <p class="text-lg mb-4">Still can't find what you're looking for? <NuxtLink to="/chat" class="text-green-600 hover:underline">Send us a message</NuxtLink></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChevronUpIcon from '~/components/icons/ChevronUpIcon.vue';
import ChevronDownIcon from '~/components/icons/ChevronDownIcon.vue';
import QuestionMarkCircleIcon from '~/components/icons/QuestionMarkCircleIcon.vue';

definePageMeta({
  middleware: ['auth'],
  layout: 'chat'
});

const openFaq = ref(1); // Default to first FAQ open

const toggleFaq = (id) => {
  if (openFaq.value === id) {
    openFaq.value = null; // Close if already open
  } else {
    openFaq.value = id; // Open the clicked FAQ
  }
};
</script> 