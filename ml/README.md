# MaaMaa AI Engine

This directory contains the machine learning and AI components for the MaaMaa catering assistant.

## Features

- **Catering Plan Generation**: AI-powered menu planning for African events
- **Recipe Scaling**: Intelligent scaling of traditional recipes for different guest counts
- **Cost Estimation**: Budget-aware menu suggestions with cost breakdowns
- **Cultural Awareness**: Culturally-relevant dish suggestions and preparation methods

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
cp .env.example .env
# Add your OpenAI API key to .env
```

3. Run the example:
```bash
python prompt_engineer.py
```

## Usage

### Basic Recipe Scaling
```python
from prompt_engineer import MaaMaaAI

ai = MaaMaaAI()
scaled_recipe = ai.scale_recipe(recipe_text, original_servings=10, target_servings=150)
print(scaled_recipe["content"])
```

### Catering Plan Generation
```python
plan = ai.generate_catering_plan(
    guest_count=150,
    event_type="wedding",
    budget=5000,
    cuisine_preferences=["Nigerian", "Ghanaian"],
    dietary_restrictions=["vegetarian options"]
)
print(plan["content"])
```

## Integration with Frontend

The AI engine integrates with the Nuxt.js frontend through Supabase Edge Functions:

1. Frontend sends requests to `/api/chat`
2. Edge function calls the Python AI engine
3. Structured responses are returned to the chat interface

## Model Configuration

- **Primary Model**: GPT-4 for complex catering planning
- **Secondary Model**: GPT-3.5-turbo for recipe scaling and simple queries
- **Temperature**: 0.7 for creative menu suggestions, 0.3 for precise scaling

## Error Handling

The AI engine includes comprehensive error handling:
- API rate limiting
- Fallback responses
- Logging for debugging
- Graceful degradation when AI services are unavailable
