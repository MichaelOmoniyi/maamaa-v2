import os
from dotenv import load_dotenv
import openai

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def run_prompt(prompt: str, model: str="gpt-3.5-turbo"):
    resp = openai.ChatCompletion.create(
        model=model,
        messages=[
            {"role":"system","content":"You are a helpful chef assistant."},
            {"role":"user","content":prompt}
        ],
        temperature=0.7,
    )
    return resp.choices[0].message.content

if __name__ == "__main__":
    print(run_prompt("Scale jollof rice for 150 servings."))
