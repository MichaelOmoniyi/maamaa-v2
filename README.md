# 🥘 MaaMaa – African Event Catering Planner

**MaaMaa** is a web application for African event planners, home cooks, and individuals planning event catering. Personalized menu recommendations and catering calculations are still in development.

🌍 **Live Site:** [https://maamaa.live](https://maamaa.live)  
📧 **Contact:** info@maamaa.live  

---

## 📌 Features

### **1. Catering Estimate Preview**
- Collects event details, guest count, budget, cuisine preferences, and dietary requirements.
- Personalized menu recommendations, quantities, and prices are not currently generated.

### **2. User Authentication**
- Secure **signup/login** system
- Persistent session handling

### **3. Chat Notes**
- Save notes to chat history.
- AI replies and response regeneration are not currently connected.

### **4. Informational Pages**
- Homepage
- Pricing
- FAQs
- Settings

---

## 🎨 Brand & UI

The interface reflects **MaaMaa’s Afrocentric identity**:

| Role       | Color (HEX) |
|------------|-------------|
| Primary    | `#007C2E`   |
| Secondary  | `#5DBB63`   |
| Accent     | `#003C23`   |
| Text Light | `#FFFFFF`   |
| Text Dark  | `#0D1F1C`   |

Built with **responsive design** to provide an optimal experience on both desktop and mobile devices.

---

## 🛠️ Tech Stack

### **Frontend**
- [Nuxt.js](https://nuxt.com/) – Vue.js framework for SSR and routing
- Vue 3 pages and components
- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS framework

### **Backend**
- Supabase Auth, PostgreSQL, and Storage, accessed from the Nuxt frontend
- No Express API or `/api/chat` endpoint is implemented in this repository

### **Machine Learning**
- `ml/prompt_engineer.py` is a standalone Python script and is not integrated with the Nuxt app
- The script does not provide deployed catering estimates or chat responses

### **Deployment**
- Deployment instructions are provided in `DEPLOYMENT.md`; repository code alone does not establish current production status

---

## 🏗️ Architecture

### System Overview
The tracked application code uses this architecture:

- **Frontend**: Nuxt.js 3 with Vue 3 Composition API
- **Data services**: Supabase Auth, PostgreSQL, and Storage accessed through the frontend Supabase client
- **Chat**: Notes are saved to Supabase chat history; no AI replies are generated
- **Python**: The standalone script in `ml/` is not called by the Nuxt app

### Database Schema
```sql
-- Core Tables
- users (authentication via Supabase Auth)
- chats (user conversation history)
- chat_messages (individual messages with metadata)
- inventory_items (user inventory management)
```

### Data access
- Authentication and application data are accessed through the Supabase client in the frontend.
- No Express server or `/api/chat`, `/api/inventory`, or `/api/auth` route is implemented in the tracked application code.
- The standalone Python script is not part of the chat or estimator request flow.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/maamaa-v2.git
cd maamaa-v2
```

2. **Frontend Setup**
```bash
cd frontend
npm install
```

3. **Environment Configuration**
```bash
# Create .env file in frontend directory
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Optional standalone Python script**
```bash
cd ../ml
pip install -r requirements.txt
# This script is separate from the Nuxt application.
# Configure OPENAI_API_KEY only if you choose to run it.
```

5. **Start Development Server**
```bash
cd frontend
npm run dev
```

## 🧪 Testing

No automated test scripts are configured in the frontend package or standalone Python component. The frontend build can be run with:
```bash
cd frontend
npm run build
```

## 📈 Performance Optimizations

- **Image Optimization**: Lazy loading and WebP format support
- **Database**: Application data is queried through Supabase; indexing and deployed performance are configuration-dependent.

## 🔒 Security Features

- **Authentication**: Supabase Auth with JWT tokens
- **Authorization**: Data access is subject to the Supabase project's configured authorization policies; deployed policies are not established by this repository.

## 🌍 Deployment

See `DEPLOYMENT.md` for deployment guidance. Current deployment status and production configuration are not established by the tracked application code.

## 📊 Individual Contributions

This project showcases several key technical implementations:

### Core Features Implemented
- **Chat Notes**: User notes are saved to chat history; AI replies and WebSocket chat are not implemented
- **Inventory Management**: Full CRUD operations with image upload
- **Authentication System**: Complete user auth flow with password reset
- **Responsive Design**: Mobile-first UI with Tailwind CSS

### Technical Challenges Solved
- **State Management**: Vue state is used for chat and inventory interfaces
- **File Upload**: Inventory images can be uploaded to Supabase Storage; barcode display is supported
- **Error Handling**: Chat and inventory pages display errors for failed loads and saves

### Code Quality Improvements
- **Nuxt Integration**: Vue pages and components use the Nuxt application structure
- **Component Architecture**: Reusable Vue 3 components with Composition API
- **Supabase Access**: Frontend data operations use the Supabase client
- **Database Design**: Normalized schema with efficient relationships
