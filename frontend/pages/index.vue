<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-[#0D3726] rounded-b-xl !relative flex flex-col items-center hero-home min-h-[100vh]">
      <div class="container !relative flex flex-col justify-between min-h-[100vh] pt-24 md:pt-16">
        <div class="!relative w-full h-full mt-auto mb-auto text-center lg:w-1/2 lg:pr-8 mx-auto px-6 md:px-8">
          <div class="inline-flex items-center bg-white bg-opacity-100 backdrop-blur-sm rounded-full px-4 py-2 mb-6 ml-auto mr-auto">
            <svg class="w-4 h-4 text-[#184A31] mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-[#184A31] text-xs md:text-sm">Your kitchen deserves this.</span>
          </div>
            
          <h1 class="text-white text-center text-4xl md:text-6xl font-bold mb-4 md:mb-8 leading-tight">
            Cook with heart.<br/>
            Plan with precision.
          </h1>
            
          <p class="text-white text-center text-base md:text-lg opacity-80 mb-8 max-w-xl leading-relaxed">
            MaaMaa is an AI-powered kitchen companion for African chefs, caterers, and food vendors. It helps you plan your meals, scale your ingredients, manage stock, and uncover insights — so you can focus on what really matters: feeding people well.
          </p>
            
          <NuxtLink to="/register" class="inline-block bg-white text-[#0D3726] text-sm md:text-base font-medium py-2 px-6 rounded-md hover:bg-gray-100 transition-colors">
            Get early access
          </NuxtLink>
        </div>
        <div class="w-full lg:w-1/2 mt-10 lg:mt-0 mx-auto px-6 md:px-8">
          <div class="bg-white rounded-t-lg p-5 shadow-lg">
            <div class="relative rounded-md border border-gray-200 py-3">
              <input 
                type="text" 
                placeholder="What can MaaMaa help you with today?"
                class="w-full p-3 pt-0 text-sm focus:outline-none"
              />
              <div class="relative w-full flex justify-between inset-y-0 flex items-center mx-auto px-3">
                <button class="p-1">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
                <button class="bg-[#0D3726] rounded-full p-2 flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Planning Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6 md:px-8">
        <div class="text-center">
          <div class="flex items-center justify-between lg:justify-around lg:px-[13vw] lg:pr-[13.5vw] -mb-4">
            <img src="/images/noodle--chopstick-noodle-right.png" alt="MaaMaa Logo" class="h-8 mr-2 opacity-70" />
            <img src="/images/Noodle--Streamline-Sharp-left.png" alt="MaaMaa Logo" class="h-10 ml-2 opacity-70" />
          </div>
          <h2 class="text-2xl md:text-4xl font-bold text-[#0D3726] mb-8">
            What if planning became<br class="hidden md:block" />
            as intuitive as cooking?
          </h2>
        </div>
        
        <div class="mt-16">
          <div class="flex flex-col md:flex-row md:justify-between">
            <div>
              <h3 class="text-xl md:text-2xl font-bold mb-4">
                MaaMaa is more than a tool; it's your<br class="hidden md:block" />
                kitchen's thinking partner.
              </h3>
              
              <p class="text-gray-700 mb-8 max-w-2xl">
                MaaMaa helps you do more than track ingredients. It helps you run your kitchen like a pro — with the control of a head chef and the wisdom of experience. Here's what it does:
              </p>
            </div>
            <div>
              <NuxtLink to="/register" class="inline-block text-white bg-[#0D3726] text-sm md:text-base font-medium py-2 px-6 rounded-md hover:bg-[#0A2B1E] transition-colors">
                Get early access
              </NuxtLink>
            </div>
          </div>
          
          
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <!-- Feature 1 -->
            <div class="bg-transparent rounded-lg overflow-hidden shadow-lg !p-0">
              <div class="relative feature-1 h-48">
              </div>
              <div class="p-5">
                <h4 class="font-bold mb-2 text-[#262626]">Scale Recipes with Local Logic</h4>
                <p class="text-sm text-[#404040]">From "a pinch of salt" to "feeds for 200 guests," MaaMaa scales recipes so you can do... not like a calculator</p>
              </div>
            </div>
            
            <!-- Feature 2 -->
            <div class="bg-transparent rounded-lg overflow-hidden shadow-lg !p-0">
              <div class="relative feature-2 h-48">
              </div>
              <div class="p-5">
                <h4 class="font-bold mb-2 text-[#262626]">Know What to Buy, and When</h4>
                <p class="text-sm text-[#404040]">Get smart, unique breakdowns of ingredients based on your menu, optimal shopping orders, or bulk purchases</p>
              </div>
            </div>
            
            <!-- Feature 3 -->
            <div class="bg-transparent rounded-lg overflow-hidden shadow-lg !p-0">
              <div class="relative feature-3 h-48">
              </div>
              <div class="p-5">
                <h4 class="font-bold mb-2 text-[#262626]">Understand What Works <span class="text-xs text-[#737373]">(Coming Soon)</span></h4>
                <p class="text-sm text-[#404040]">MaaMaa learns from your cooking flow — showing you what works, what trends, and how your kitchen changes over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-[#F1F9F5] rounded-xl">
      <div class="container mx-auto px-6 md:px-8">
        <div class="text-center md:flex md:flex-row-reverse md:justify-between mb-10">
          <img src="/images/pasta-plate-warm.png" alt="Pasta" class="h-20 mx-auto md:mx-0 mb-6 md:mb-0" />
          <h2 class="text-2xl md:text-3xl font-bold text-[#0D3726]">
            Made for the people<br class="hidden md:block" />
            who make the meals.
          </h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <!-- Testimonial 1 -->
          <div class="bg-white p-8 rounded-lg shadow-sm">
            <img src="/images/quote.png" alt="quote" class="h-12 mb-4">
            <p class="text-gray-800 mb-8 text-lg">3 weddings every weekend. MaaMaa gives me peace of mind when planning portions."</p>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                <img src="/images/bukky.png" alt="Bukky" class="w-full h-full object-cover" />
              </div>
              <div>
                <p class="font-medium">Bukky</p>
                <p class="text-sm text-gray-500">Experienced Caterer</p>
              </div>
            </div>
          </div>
          
          <!-- Testimonial 2 -->
          <div class="bg-white p-8 rounded-lg shadow-sm">
            <img src="/images/quote.png" alt="quote" class="h-12 mb-4">
            <p class="text-gray-800 mb-8 text-lg">Now I know what to buy and how much to cook. I feel more in control."</p>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                <img src="/images/femi.png" alt="Femi" class="w-full h-full object-cover" />
              </div>
              <div>
                <p class="font-medium">Femi</p>
                <p class="text-sm text-gray-500">Instagram Chef</p>
              </div>
            </div>
          </div>
          
          <!-- Testimonial 3 -->
          <div class="bg-white p-8 rounded-lg shadow-sm">
            <img src="/images/quote.png" alt="quote" class="h-12 mb-4">
            <p class="text-gray-800 mb-8 text-lg">I don't waste stock anymore. MaaMaa reminds me when I'm running low."</p>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                <img src="/images/mama-ijeoma.png" alt="Mama Ijeoma" class="w-full h-full object-cover" />
              </div>
              <div>
                <p class="font-medium">Mama Ijeoma</p>
                <p class="text-sm text-gray-500">Food Vendor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- About Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6 md:px-8">
        <div class="inline-flex items-center bg-[#f1f9f5] bg-opacity-100 backdrop-blur-sm rounded-full px-4 py-2 mb-6 ml-auto mr-auto">
            <img src="/images/StarFour.png" alt="star" class="h-8 mr-2">
            <span class="text-[#184A31] text-xs md:text-sm">What Makes MaaMaa Different</span>
        </div>
        
        <div class="md:flex md:justify-between">
          <div>
            <h2 class="text-2xl md:text-4xl font-bold text-center md:text-left mb-8 text-[#0D3726]">
              We built MaaMaa with African hands,<br class="hidden md:block" />
              hearts, and hunger in mind.
            </h2>
            
            <p class="text-gray-700 text-center md:text-left mb-6 max-w-3xl mx-auto">
              This isn't just tech. This is intelligence born from local kitchens. From the way oil is measured in bottles, not grams. From how one seasoning cube might be enough for 3Kg of rice.
            </p>
            
            <p class="text-gray-700 text-center md:text-left mb-6 max-w-3xl mx-auto">
              We don't just understand code. We understand cooking, culture, and context.
            </p>
          </div>
          <div class="text-center">
            <NuxtLink to="/register" class="inline-block text-white bg-[#0D3726] text-sm md:text-base font-medium py-2 px-6 rounded-md hover:bg-[#0A2B1E] transition-colors mb-14">
              Get early access
            </NuxtLink>
          </div>
        </div>
        
        
        <h3 class="font-semibold text-lg text-center md:text-left mb-10">Some key highlights:</h3>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mx-auto w-full">
          <!-- Highlight 1 -->
          <div class="text-center md:text-left md:flex md:flex-col">
            <div class="h-14 w-14 bg-green-100 rounded-lg mx-auto md:mx-0 mb-4 flex items-center justify-center">
              <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p class="text-sm font-500">Supports African measurement patterns, utensils, cooked bucket</p>
          </div>
          
          <!-- Highlight 2 -->
          <div class="text-center md:text-left">
            <div class="h-14 w-14 bg-yellow-100 rounded-lg mx-auto md:mx-0 mb-4 flex items-center justify-center">
              <svg class="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <p class="text-sm font-500">Applies contextual logic: 5x peo­ple doesn't mean 5x oil</p>
          </div>
          
          <!-- Highlight 3 -->
          <div class="text-center md:text-left">
            <div class="h-14 w-14 bg-blue-100 rounded-lg mx-auto md:mx-0 mb-4 flex items-center justify-center">
              <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <p class="text-sm font-500">Trained with empathy for how African chefs work</p>
          </div>
          
          <!-- Highlight 4 -->
          <div class="text-center md:text-left">
            <div class="h-14 w-14 bg-pink-100 rounded-lg mx-auto md:mx-0 mb-4 flex items-center justify-center">
              <svg class="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </div>
            <p class="text-sm font-500">Designed to reduce waste, stress & burnout in your kitchen</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Sign Up Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 md:px-8">
        <div class="bg-[#0D3726] rounded-xl p-6 md:p-16">
          <div class="flex flex-col md:flex-row md:items-center md:space-x-10">
            <!-- Left Content -->
            <div class="w-full md:w-1/2 text-white mb-10 md:mb-0">
              <h2 class="text-2xl md:text-5xl font-bold mb-6">
                Be one of the first to<br class="hidden md:block" />
                cook with <span class="text-[#27AE60]">MaaMaa.</span>
              </h2>
              
              <p class="text-gray-300 mb-6 max-w-md leading-relaxed">
                We're opening MaaMaa to a select group of chefs, caterers, and vendors who want to cook better, plan smarter, and grow with purpose.
              </p>
            </div>
            
            <!-- Form -->
            <div class="w-full md:w-1/2">
              <div class="bg-white p-8 rounded-lg shadow">
                <h3 class="text-[#262626] text-xl mb-6 font-medium">Fill this form to get early access:</h3>
                
                <form class="space-y-5">
                  <div>
                    <label for="name">Name</label>
                    <input type="text" placeholder="Name" class="w-full p-3 mt-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#27AE60] focus:border-[#27AE60]" />
                  </div>
                  <div>
                    <label for="email">Email</label>
                    <input type="email" placeholder="Email address" class="w-full p-3 mt-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#27AE60] focus:border-[#27AE60]" />
                  </div>
                  <div>
                    <label for="what-you-do">What you do</label>
                    <input type="text" placeholder="What you do" class="w-full p-3 mt-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#27AE60] focus:border-[#27AE60]" />
                  </div>
                  <div>
                    <button type="submit" class="w-full bg-[#0D3726] text-white py-3 px-6 mt-2 rounded-md font-medium hover:bg-[#0A2B1E] transition-colors">
                      Get early access
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </div>
        </div>
        
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-home {
  padding: 0!;
  background-image: url('/images/hero.png');
}

.feature-1, .feature-2, .feature-3 {
  background-repeat: no-repeat;
  background-size: cover;
}

.feature-1 {
  background-image: url('/images/Frame-1618868724-1.png');
}

.feature-2 {
  background-image: url('/images/Frame-1618868724-2.png');
}

.feature-3 {
  background-image: url('/images/Frame-1618868724-3.png');
}

.pasta {
  background-image: url('/images/pasta-plate.png');
}

label {
  color: #737373;
}
</style>