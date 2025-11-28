# AI Model Integration Guide

This document outlines how to integrate an AI model with our inventory management system.

## Overview

Our inventory system now supports:
1. Capturing images of food items
2. Generating barcodes for inventory tracking
3. Storing images and item data in Supabase
4. Providing an API for AI models to access anonymized inventory data

## Database Structure

The inventory data is stored in the `inventory_items` table with the following structure:

```sql
CREATE TABLE inventory_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  min_quantity DECIMAL DEFAULT 0,
  status TEXT NOT NULL,
  barcode TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Access for AI Models

We've created a secure API endpoint that allows AI models to access anonymized inventory data for training and learning purposes.

### Endpoint

```
POST https://[YOUR_SUPABASE_PROJECT].functions.supabase.co/inventory-ai-data
```

### Authentication

The API requires an API key for authentication:

```
Headers:
x-api-key: [YOUR_AI_MODEL_API_KEY]
```

### Response Format

```json
{
  "success": true,
  "data": [
    {
      "category": "vegetables",
      "name": "Tomatoes",
      "created_at": "2025-09-19T10:30:00.000Z"
    },
    {
      "category": "proteins",
      "name": "Chicken",
      "created_at": "2025-09-18T14:45:00.000Z"
    }
  ],
  "timestamp": "2025-09-19T15:30:00.000Z"
}
```

## Setting Up the AI Model Integration

1. **Environment Variables**:
   - Set the `AI_MODEL_API_KEY` environment variable in your Supabase project

2. **Deploy the Edge Function**:
   ```bash
   supabase functions deploy inventory-ai-data
   ```

3. **Enable the Edge Function**:
   - Go to your Supabase dashboard
   - Navigate to Edge Functions
   - Enable the `inventory-ai-data` function

## AI Model Training Workflow

1. The AI model should periodically call the API endpoint to fetch the latest inventory data
2. Process and learn from the data to improve food recognition capabilities
3. Update its internal model with new food items and categories

## Security Considerations

- The API only provides anonymized data (no user information)
- Access is restricted via API key authentication
- Only necessary data fields are exposed (category, name, creation date)
- Rate limiting is recommended to prevent abuse

## Example API Usage

```python
import requests
import json

API_URL = "https://[YOUR_SUPABASE_PROJECT].functions.supabase.co/inventory-ai-data"
API_KEY = "your-api-key-here"

headers = {
    "x-api-key": API_KEY,
    "Content-Type": "application/json"
}

response = requests.post(API_URL, headers=headers)
data = response.json()

if data["success"]:
    # Process the inventory data
    inventory_items = data["data"]
    for item in inventory_items:
        print(f"Category: {item['category']}, Name: {item['name']}")
else:
    print(f"Error: {data['error']}")
```

## Future Improvements

1. Add support for more detailed food item attributes (nutritional information, expiry dates)
2. Implement bidirectional communication where the AI can suggest inventory updates
3. Create a feedback mechanism where users can correct AI predictions
4. Add support for batch processing of images for more efficient AI training
