import os
import json
import logging
from typing import Dict, List, Optional
from dotenv import load_dotenv
from openai import OpenAI

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

class MaaMaaAI:
    """AI-powered catering assistant for African cuisine planning."""
    
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.system_prompt = """You are MaaMaa, an expert AI assistant specializing in African cuisine and event catering. 
        You help users plan authentic African meals for events, calculate quantities, estimate costs, and provide culturally-relevant suggestions.
        
        Key capabilities:
        - Scale recipes for different guest counts
        - Suggest authentic African dishes for various events
        - Calculate ingredient quantities and costs
        - Provide cooking instructions and preparation timelines
        - Recommend vendors and suppliers
        
        Always respond in a helpful, culturally-aware manner with practical, actionable advice."""
    
    def generate_catering_plan(self, 
                             guest_count: int, 
                             event_type: str, 
                             budget: Optional[float] = None,
                             cuisine_preferences: List[str] = None,
                             dietary_restrictions: List[str] = None) -> Dict:
        """Generate a comprehensive catering plan."""
        
        try:
            prompt = self._build_catering_prompt(
                guest_count, event_type, budget, 
                cuisine_preferences, dietary_restrictions
            )
            
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            return {
                "success": True,
                "content": response.choices[0].message.content,
                "usage": response.usage.dict() if response.usage else None
            }
            
        except Exception as e:
            logger.error(f"Error generating catering plan: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "content": "I apologize, but I'm having trouble generating your catering plan right now. Please try again later."
            }
    
    def scale_recipe(self, recipe: str, original_servings: int, target_servings: int) -> Dict:
        """Scale a recipe for different serving sizes."""
        
        try:
            prompt = f"""Scale this African recipe from {original_servings} servings to {target_servings} servings:

{recipe}

Provide:
1. Scaled ingredient quantities
2. Adjusted cooking times if necessary
3. Any special considerations for larger quantities
4. Equipment recommendations for the new scale"""

            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,  # Lower temperature for more consistent scaling
                max_tokens=1500
            )
            
            return {
                "success": True,
                "content": response.choices[0].message.content
            }
            
        except Exception as e:
            logger.error(f"Error scaling recipe: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "content": "I'm having trouble scaling this recipe right now. Please try again later."
            }
    
    def _build_catering_prompt(self, guest_count, event_type, budget, 
                              cuisine_preferences, dietary_restrictions):
        """Build a comprehensive prompt for catering planning."""
        
        prompt = f"""Plan a catering menu for an African {event_type} with {guest_count} guests.

Requirements:
- Guest count: {guest_count}
- Event type: {event_type}"""
        
        if budget:
            prompt += f"\n- Budget: ${budget}"
        
        if cuisine_preferences:
            prompt += f"\n- Cuisine preferences: {', '.join(cuisine_preferences)}"
        
        if dietary_restrictions:
            prompt += f"\n- Dietary restrictions: {', '.join(dietary_restrictions)}"
        
        prompt += """

Please provide:
1. Suggested menu with 3-5 main dishes
2. Ingredient quantities needed
3. Estimated total cost and cost per person
4. Preparation timeline
5. Serving suggestions
6. Any cultural considerations or traditions

Format your response in a clear, organized manner."""
        
        return prompt

# Convenience function for backward compatibility
def run_prompt(prompt: str, model: str = "gpt-3.5-turbo") -> str:
    """Simple prompt execution for basic use cases."""
    ai = MaaMaaAI()
    
    try:
        response = ai.client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": ai.system_prompt},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"Error in run_prompt: {str(e)}")
        return f"Error: {str(e)}"

if __name__ == "__main__":
    # Example usage demonstrating the MaaMaaAI capabilities
    ai = MaaMaaAI()
    
    # Test catering plan generation
    plan = ai.generate_catering_plan(
        guest_count=150,
        event_type="wedding",
        budget=5000,
        cuisine_preferences=["Nigerian", "Ghanaian"],
        dietary_restrictions=["vegetarian options"]
    )
    
    logger.info("Catering Plan Generated:")
    logger.info(plan["content"])
    
    # Test recipe scaling
    jollof_recipe = """
    Jollof Rice (serves 10):
    - 4 cups rice
    - 2 cups chicken stock
    - 1 cup tomato paste
    - 2 onions
    - 3 cloves garlic
    - 2 tsp curry powder
    - Salt and pepper to taste
    """
    
    scaled = ai.scale_recipe(jollof_recipe, 10, 150)
    logger.info("Scaled Recipe:")
    logger.info(scaled["content"])
