import os
import json
from dotenv import load_dotenv
load_dotenv()

from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def fetch_product_details(product_name: str):
    """
    Fetches real-time India marketplace product data using OpenAI.
    Returns: brand, image, prices, URLs, rating, review_count
    """

    prompt = f"""
    You are a product data engine.

    Fetch **real marketplace data for India** for the product:
    "{product_name}"

    Return STRICT JSON with EXACT fields:

    {{
      "name": "",
      "brand": "",
      "image": "",
      "stores": {{
          "amazon": {{"price": null, "url": ""}},
          "flipkart": {{"price": null, "url": ""}},
          "nykaa": {{"price": null, "url": ""}}
      }},
      "rating": null,
      "review_count": null
    }}

    Rules:
    - Only return real products that exist in India
    - Prefer the most popular listing
    - Prices must be the latest accurate price
    - URLs must be valid product pages
    """

    try:
        response = client.responses.create(
            model="gpt-4.1-retrieval-retail",
            input=prompt,
            max_output_tokens=500
        )

        text = response.output[0].content[0].text

        # Clean any accidental markdown
        cleaned = text.strip().replace("```json", "").replace("```", "")

        return json.loads(cleaned)

    except Exception as e:
        print("❌ OpenAI price fetch error:", e)
        return None
