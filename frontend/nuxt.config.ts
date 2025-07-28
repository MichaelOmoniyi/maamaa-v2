// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: {
      level: 2,
    },
    viewer: true,
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/'],
    },
    // Uncomment and update these with your Supabase credentials
    // url: process.env.SUPABASE_URL || 'https://suqrahkqnegakajgeiuw.supabase.co',
    // key: process.env.SUPABASE_KEY || 'your-anon-key',
    cookieOptions: {
      maxAge: 60 * 60 * 8, // 8 hours
      sameSite: 'lax',
      secure: true
    }
  }
})
