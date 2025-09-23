// This script demonstrates how to create a storage bucket for inventory images
// Run this script with your Supabase service role key (not anon key)

const { createClient } = require('@supabase/supabase-js');

// Replace with your Supabase URL and SERVICE_ROLE key (not anon key)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Initialize Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupStorage() {
  try {
    // Create a new storage bucket for inventory images
    const { data, error } = await supabase
      .storage
      .createBucket('inventory_images', {
        public: false, // Set to true if you want all files to be public by default
        fileSizeLimit: 5242880, // 5MB file size limit
      });

    if (error) {
      throw error;
    }

    console.log('Storage bucket created successfully:', data);

    // Set up bucket policies to allow authenticated users to upload and read their own files
    // You can adjust these policies based on your requirements
    const { error: policyError } = await supabase
      .storage
      .from('inventory_images')
      .createPolicy('Allow authenticated uploads', {
        name: 'Allow authenticated uploads',
        definition: {
          role: 'authenticated',
          operation: 'INSERT',
          check: 'true' // Allow all authenticated users to upload
        }
      });

    if (policyError) {
      throw policyError;
    }

    console.log('Upload policy created successfully');

    // Policy to allow users to read their own files
    const { error: readPolicyError } = await supabase
      .storage
      .from('inventory_images')
      .createPolicy('Allow authenticated reads', {
        name: 'Allow authenticated reads',
        definition: {
          role: 'authenticated',
          operation: 'SELECT',
          check: 'true' // Allow all authenticated users to read
        }
      });

    if (readPolicyError) {
      throw readPolicyError;
    }

    console.log('Read policy created successfully');

    console.log('Storage setup completed successfully!');
  } catch (error) {
    console.error('Error setting up storage:', error.message);
  }
}

setupStorage();

// NOTE: In production, you would typically run this script once during your initial setup
// or use Supabase's dashboard UI to create the bucket and set policies
