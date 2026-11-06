# MaaMaa AI prototype

This directory contains a standalone Python prototype. It is not imported by
the Nuxt application, deployed as a service, or connected to Supabase Edge
Functions. The current product does not generate AI chat replies or catering
plans.

## Prototype functions

The script has functions that send recipe or event prompts to an OpenAI chat
completion model and return free-text output. It has not been evaluated for
recipe accuracy, cultural coverage, quantity correctness, or price accuracy.
Its output is a suggestion and is not authoritative catering or financial data.

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

## Integration status

There is no frontend integration or `/api/chat` endpoint in this repository.
The Supabase `inventory-ai-data` function is separate legacy code and does not
invoke this Python module. Treat both components as prototypes until an
authenticated API contract, validated input/output schema, privacy review,
timeouts, and repeatable tests are in place.

The prototype sends event and recipe input to an external model provider. Do not
send real user data through it until that data flow has been reviewed and
approved. Model output is unstructured suggestion text and must not be treated
as verified quantities or prices.

## Model Configuration

- **Primary Model**: GPT-4 for complex catering planning
- **Secondary Model**: GPT-3.5-turbo for recipe scaling and simple queries
- **Temperature**: 0.7 for creative menu suggestions, 0.3 for precise scaling

## Error handling limits

The script catches provider exceptions, logs the exception message, and returns
a generic fallback message. It does not currently implement explicit request
timeouts, retry/backoff, rate limiting, structured output validation, or a
secondary-model fallback. There is no automated test suite for this prototype.
