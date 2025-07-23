// Import Geist font for client-side
export default defineNuxtPlugin(() => {
  // This plugin will load the Geist font from CDN
  if (process.client) {
    // Create link element for Geist font
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/geist-font@latest/geist-sans/style.css';
    
    // Append to head
    document.head.appendChild(link);
  }
});
