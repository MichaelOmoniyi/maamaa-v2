# Deployment Guide - MaaMaa v2

> **Supabase setup note:** The Supabase SQL and Storage setup examples in this older guide are superseded by [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md) and `supabase/migrations/`. Use the migration as the schema source of truth for a fresh project. No remote project is linked or migrated yet.

This guide covers deploying the MaaMaa application to production.

## 🚀 Quick Deploy

### Prerequisites
- Vercel account
- Supabase account
- OpenAI API key
- Custom domain (optional)

### 1. Supabase Setup

1. Create a new Supabase project
2. Run the database migrations:
```sql
-- Create chats table
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create chat_messages table
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES chats(id),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  type TEXT DEFAULT 'text',
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create inventory_items table
CREATE TABLE inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  min_quantity DECIMAL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('in-stock', 'low-stock', 'out-of-stock')),
  barcode TEXT UNIQUE,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own chats" ON chats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own chats" ON chats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own chats" ON chats FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own messages" ON chat_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM chats WHERE chats.id = chat_messages.chat_id AND chats.user_id = auth.uid())
);
CREATE POLICY "Users can insert own messages" ON chat_messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM chats WHERE chats.id = chat_messages.chat_id AND chats.user_id = auth.uid())
);

CREATE POLICY "Users can view own inventory" ON inventory_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own inventory" ON inventory_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own inventory" ON inventory_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own inventory" ON inventory_items FOR DELETE USING (auth.uid() = user_id);
```

3. Create storage bucket for inventory images:

### Option A: Using Supabase Dashboard (Recommended)

1. Log in to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to "Storage" in the left sidebar
4. Click "Create bucket"
5. Enter the name `inventory_images`
6. Set the bucket to private (recommended for security)
7. Click "Create bucket"

After creating the bucket, set up permissions:
1. Navigate to "Storage" → "Policies"
2. Select the `inventory_images` bucket
3. Click "Add policies"
4. Create the following policies:

**Upload Policy:**
- Policy name: "Users can upload own images"
- Allowed operation: INSERT
- Policy definition: `auth.uid()::text = (storage.foldername(name))[1]`

**Read Policy:**
- Policy name: "Users can view own images"
- Allowed operation: SELECT
- Policy definition: `auth.uid()::text = (storage.foldername(name))[1]`

### Option B: Using SQL Commands

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('inventory_images', 'inventory_images', false);

-- Create storage policies
CREATE POLICY "Users can upload own images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'inventory_images' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view own images" ON storage.objects FOR SELECT USING (
  bucket_id = 'inventory_images' AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### 2. Vercel Deployment

1. Fork/clone the repository
2. Connect to Vercel
3. Set environment variables:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

4. Deploy:
```bash
vercel --prod
```

### 3. Custom Domain Setup

1. Add domain in Vercel dashboard
2. Configure DNS records:
```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔧 Environment Configuration

### Required Environment Variables

#### Frontend (.env)
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

#### ML Engine (.env)
```bash
OPENAI_API_KEY=sk-your_openai_key_here
OPENAI_MODEL=gpt-4
OPENAI_FALLBACK_MODEL=gpt-3.5-turbo
```

## 📊 Production Checklist

### Security
- [ ] Enable RLS on all tables
- [ ] Configure proper CORS settings
- [ ] Set up rate limiting
- [ ] Enable SSL/HTTPS
- [ ] Configure security headers

### Performance
- [ ] Enable Vercel Edge caching
- [ ] Optimize images and assets
- [ ] Configure CDN for static files
- [ ] Set up database connection pooling
- [ ] Enable gzip compression

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure performance monitoring
- [ ] Set up uptime monitoring
- [ ] Enable logging and analytics
- [ ] Configure backup strategies

### Testing
- [ ] Run production build locally
- [ ] Test all authentication flows
- [ ] Verify AI integration works
- [ ] Test file upload functionality
- [ ] Validate mobile responsiveness

## 🚨 Troubleshooting

### Common Issues

#### Supabase Connection Issues
```bash
# Check environment variables
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY

# Test connection
curl -H "apikey: $SUPABASE_ANON_KEY" $SUPABASE_URL/rest/v1/
```

#### OpenAI API Issues
```bash
# Test API key
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models
```

#### Build Failures
```bash
# Clear cache and rebuild
rm -rf .nuxt node_modules
npm install
npm run build
```

## 📈 Scaling Considerations

### Database Optimization
- Add indexes for frequently queried columns
- Implement connection pooling
- Consider read replicas for high traffic

### Caching Strategy
- Implement Redis for session storage
- Cache AI responses for common queries
- Use CDN for static assets

### Load Balancing
- Configure Vercel Edge Functions
- Implement API rate limiting
- Set up monitoring and alerting

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

This deployment guide ensures a smooth production deployment with proper security, performance, and monitoring configurations.
