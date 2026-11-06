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

Run the following commands from this directory:

1. Install dependencies:
```bash
python -m venv .venv
# Activate .venv using your operating system's command.
pip install -r requirements.txt
```

2. Create an ignored `ml/.env` file with the key for this standalone experiment:
```dotenv
OPENAI_API_KEY=<your-key>
```

Keep the real key local and do not commit or paste it into the frontend. The
root `.gitignore` ignores `.env` files.

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
An earlier uncalled Supabase function that referenced an undefined RPC was
removed during final cleanup. No Supabase Edge Functions were deployed at the
last read-only project inventory. Treat this script as a prototype until an
authenticated API contract, validated input/output schema, privacy review,
timeouts, and repeatable tests are in place.

The prototype sends event and recipe input to an external model provider. Do not
send real user data through it until that data flow has been reviewed and
approved. Model output is unstructured suggestion text and must not be treated
as verified quantities or prices.

## Current model identifiers

The script hardcodes `gpt-4` for catering plans and `gpt-3.5-turbo` for recipe
scaling and the convenience function. They are not configurable settings and
there is no automatic fallback. The catering prompt also labels the supplied
budget with a dollar sign, so its output is not a localized Nigerian price
estimate.

## Error handling limits

The script catches provider exceptions, logs the exception message, and returns
a generic fallback message. It does not currently implement explicit request
timeouts, retry/backoff, rate limiting, structured output validation, or a
secondary-model fallback. There is no automated test suite for this prototype.
