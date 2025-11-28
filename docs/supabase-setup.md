# Supabase Setup Guide

This document provides instructions for setting up the required Supabase resources for the application.

## Storage Bucket Setup

The application requires a storage bucket named `inventory_images` to store food item images. Here's how to set it up:

### Option 1: Using Supabase Dashboard (Recommended)

1. Log in to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to "Storage" in the left sidebar
4. Click "Create bucket"
5. Enter the name `inventory_images`
6. Set the bucket to "Public" if you want images to be publicly accessible, or "Private" if you want to restrict access
7. Click "Create bucket"

### Option 2: Using the Supabase CLI

If you have the Supabase CLI installed, you can create the bucket using the following command:

```bash
supabase storage create inventory_images
```

### Option 3: Using the Provided Setup Script

We've included a setup script that can create the bucket and configure permissions:

1. Make sure you have your Supabase URL and service role key (not anon key)
2. Set the following environment variables:
   ```bash
   export SUPABASE_URL=your-supabase-url
   export SUPABASE_SERVICE_KEY=your-service-role-key
   ```
3. Run the setup script:
   ```bash
   node setup-supabase-storage.js
   ```

## Storage Bucket Permissions

After creating the bucket, you need to set up permissions to allow authenticated users to upload and read images:

1. In the Supabase Dashboard, navigate to "Storage" → "Policies"
2. Select the `inventory_images` bucket
3. Click "Add policies"
4. Create the following policies:

### Upload Policy

- Policy name: "Allow authenticated uploads"
- Allowed operation: INSERT
- Policy definition: `auth.role() = 'authenticated'`

### Read Policy

- Policy name: "Allow authenticated reads"
- Allowed operation: SELECT
- Policy definition: `auth.role() = 'authenticated'`

## Database Setup

The application requires the `inventory_items` table. You can create it using the SQL provided in the project documentation.

## Troubleshooting

If you encounter a "Bucket not found" error when trying to upload images, it means the storage bucket hasn't been properly set up. Follow the instructions above to create the bucket.

Note that creating buckets requires admin privileges, which the client-side application doesn't have by default. That's why you need to create the bucket manually or using the service role key.
