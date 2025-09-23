// supabase/functions/inventory-ai-data/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get API key from request headers for authentication
    const apiKey = req.headers.get('x-api-key')
    if (!apiKey) {
      throw new Error('API key is required')
    }

    // In a production environment, you would validate the API key against a stored value
    // For this example, we'll use a simple check
    const validApiKey = Deno.env.get('AI_MODEL_API_KEY')
    if (apiKey !== validApiKey) {
      throw new Error('Invalid API key')
    }

    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Get anonymized inventory data for AI training using the RPC function
    const { data, error } = await supabase.rpc('get_anonymized_inventory_data')
    
    if (error) throw error

    // Return the data
    return new Response(
      JSON.stringify({ 
        success: true,
        data,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      { 
        status: 400, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      },
    )
  }
})
