# 🥘 MaaMaa – AI-Powered African Event Catering Assistant

**MaaMaa** is an **AI-powered web application** that helps African event planners, home cooks, and individuals plan catering for events with precision.  
It eliminates the guesswork in estimating food quantities, provides culturally-relevant dish suggestions, and optimizes catering within a given budget.

🌍 **Live Site:** [https://maamaa.live](https://maamaa.live)  
📧 **Contact:** info@maamaa.live  

---

## 📌 Features

### **1. AI-Powered Catering Planning**
- Generates **personalized dish suggestions** based on:
  - Guest count
  - Event type
  - Budget
  - Cuisine preferences
  - Regional tastes
- Calculates **accurate food quantity estimates** to reduce waste or shortage.

### **2. User Authentication**
- Secure **signup/login** system
- Persistent session handling

### **3. Chat Interface**
- Real-time interaction with MaaMaa AI assistant
- Regenerate or refine catering plans instantly

### **4. Informational Pages**
- Homepage
- Pricing
- FAQs
- Settings

### **5. Fully Deployed Production App**
- Linked to a custom domain: **maamaa.live**
- Professional email: **info@maamaa.live**

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
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS framework

### **Backend**
- Node.js + Express API
- Authentication & authorization
- Integration with **Deployed Model** for AI-driven recommendations

### **Machine Learning**
- Custom ML logic for catering quantity estimation
- Recipe/dish matching and classification based on event context
- Python-based data preprocessing and model integration with backend API

### **Deployment**
- [Vercel](https://vercel.com/) for hosting and CI/CD
- Custom domain setup
- Environment variables for API security

---

## 🏗️ Architecture

### System Overview
MaaMaa follows a modern full-stack architecture with clear separation of concerns:

- **Frontend**: Nuxt.js 3 with Vue 3 Composition API
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **ML Layer**: Python-based AI integration for catering recommendations
- **Deployment**: Vercel with custom domain

### Database Schema
```sql
-- Core Tables
- users (authentication via Supabase Auth)
- chats (user conversation history)
- chat_messages (individual messages with metadata)
- inventory_items (user inventory management)
```

### API Endpoints
- `/api/chat` - AI conversation handling
- `/api/inventory` - Inventory management
- `/api/auth` - Authentication flows
- Supabase Edge Functions for ML integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ (for ML components)
- Supabase account
- OpenAI API key

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

4. **ML Engine Setup**
```bash
cd ../ml
pip install -r requirements.txt
# Add OPENAI_API_KEY to your environment
```

5. **Database Setup**
```bash
# Run the SQL migrations in your Supabase dashboard
# See supabase/migrations/ for schema
```

6. **Start Development Server**
```bash
cd frontend
npm run dev
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm run test
```

### ML Engine Tests
```bash
cd ml
python -m pytest tests/
```

## 📈 Performance Optimizations

- **Image Optimization**: Lazy loading and WebP format support
- **Caching**: Redis-based caching for AI responses
- **Database**: Optimized queries with proper indexing
- **CDN**: Static assets served via Vercel Edge Network

## 🔒 Security Features

- **Authentication**: Supabase Auth with JWT tokens
- **Authorization**: Row-level security (RLS) policies
- **Input Validation**: Comprehensive sanitization
- **Rate Limiting**: API endpoint protection

## 🌍 Deployment

### Production Deployment
1. **Vercel Deployment**
```bash
vercel --prod
```

2. **Environment Variables**
Set production environment variables in Vercel dashboard

3. **Domain Configuration**
Configure custom domain (maamaa.live) in Vercel

## 📊 Individual Contributions

This project showcases several key technical implementations:

### Core Features Implemented
- **Real-time Chat System**: WebSocket-based chat with message persistence
- **AI Integration**: Custom OpenAI integration with context-aware responses
- **Inventory Management**: Full CRUD operations with image upload
- **Authentication System**: Complete user auth flow with password reset
- **Responsive Design**: Mobile-first UI with Tailwind CSS

### Technical Challenges Solved
- **State Management**: Complex state synchronization between chat and inventory
- **File Upload**: Secure image upload to Supabase Storage with barcode generation
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Performance**: Optimized rendering for large chat histories

### Code Quality Improvements
- **TypeScript Integration**: Type-safe development environment
- **Component Architecture**: Reusable Vue 3 components with Composition API
- **API Design**: RESTful API design with proper error responses
- **Database Design**: Normalized schema with efficient relationships
