import os
import re
import requests
from dotenv import load_dotenv
from difflib import SequenceMatcher


load_dotenv()

from services.serpapiCache_service import get_cached_result, save_cached_result

API_KEY = os.getenv("SERPAPI_API_KEY")




# ==========================================================
#  1. SMART VALIDATION LOGIC (Brand + Category Only)
# ==========================================================

def validate_amazon_result(searched_term: str, result_title: str) -> bool:
    """
    Returns True if the result matches Brand and Category.
    IGNORES Ingredients to prevent failures on missing keywords.
    """
    search_lower = searched_term.lower()
    title_lower = result_title.lower()

    # --- A. BRAND CHECK ---
    # We assume the first word is the brand (e.g. "Mamaearth", "Khadi")
    parts = search_lower.split()
    brand = parts[0]
    
    # Handle multi-word brands like "The Moms Co"
    if brand in ["the", "a"] and len(parts) > 1:
        brand = parts[1]

    if brand not in title_lower:
        # Fail if brand is completely missing
        return False

    # --- B. CATEGORY CHECK ---
    # specific keywords must match to avoid mixing Face Wash with Cream
    categories = {
        "face wash": ["face wash", "facewash", "cleanser", "foam"],
        "cleanser": ["face wash", "facewash", "cleanser", "foam"],
        "moisturizer": ["moisturizer", "moisturiser", "cream", "lotion", "gel"],
        "sunscreen": ["sunscreen", "sun block", "spf"],
        "serum": ["serum", "concentrate", "oil"],
        "toner": ["toner", "mist", "water"],
        "mask": ["mask", "pack", "clay"]
    }

    for cat_key, valid_keywords in categories.items():
        if cat_key in search_lower:
            # If search contains "face wash", result MUST have one of ["face wash", "cleanser", ...]
            if not any(k in title_lower for k in valid_keywords):
                return False

    return True

def title_similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()


# ==========================================================
#  2. AMAZON FETCHER
# ==========================================================

def fetch_amazon(product_name: str):
    print(f"🔍 Amazon: Searching for '{product_name}'...")

    cache_key = f"amazon_{product_name}"
    cached = get_cached_result(cache_key)
    if cached:
        print(f"   ↳ ✅ Cache HIT")
        return cached

    url = "https://serpapi.com/search"
    params = {
        "engine": "amazon",
        "api_key": API_KEY,
        "amazon_domain": "amazon.in",
        "k": product_name, 
    }

    try:
        res = requests.get(url, params=params).json()

        if "error" in res:
            print(f"SerpAPI Error: {res['error']}")
            return None

        organic = res.get("organic_results", []) or []
        if not organic:
            print(f"❌ Amazon: No organic results.")
            return None

        # Filter candidates based on Brand + Category
        valid_candidates = []
        for p in organic[:5]:  # Check top 5
            if validate_amazon_result(product_name, p.get("title", "")):
                valid_candidates.append(p)
        
        if not valid_candidates:
            print(f"❌ Amazon: Products found, but failed Brand/Category check.")
            return None

        # Pick the best title match among valid ones
        best_match = max(valid_candidates, key=lambda p: title_similarity(product_name, p.get("title", "")))

        result = {
            "title": best_match.get("title"),
            "price": best_match.get("price"),
            "url": best_match.get("link"),
            "image": best_match.get("thumbnail") or best_match.get("image"),
        }
        save_cached_result(cache_key, result)
        return result

    except Exception as e:
        print("Amazon Error:", e)
        return None
# ==========================================================
# GOOGLE SEARCH — URL + IMAGE FOR FLIPKART & NYKAA
# ==========================================================

# ==========================================================
# GOOGLE SHOPPING → PERFECT PRODUCT IDENTITY
# ==========================================================

def shopping_lookup(product_name: str):
    """Gets product-corrected title + image from Google Shopping."""
    try:
        params = {
            "engine": "google_shopping",
            "api_key": API_KEY,
            "q": product_name,
            "gl": "in",
            "hl": "en"
        }

        res = requests.get("https://serpapi.com/search", params=params).json()
        items = res.get("shopping_results", [])

        if not items:
            print("❌ No shopping results")
            return None

        top = items[0]  # best match
        return {
            "corrected_title": top.get("title"),
            "image": top.get("thumbnail"),
            "price": top.get("price")
        }

    except Exception as e:
        print("Shopping lookup error:", e)
        return None


# ==========================================================
# GOOGLE SEARCH → FIND REAL PRODUCT PAGE URL
# ==========================================================

def fetch_store_product(corrected_title: str, store: str):
    """Use corrected Shopping title to fetch REAL Flipkart/Nykaa URL."""
    query = f"\"{corrected_title}\" site:{store}.com"
    print(f"🌐 Finding exact {store} URL for: {corrected_title}")

    params = {
        "engine": "google",
        "api_key": API_KEY,
        "q": query,
        "num": 10,
        "google_domain": "google.co.in",
        "gl": "in",
        "hl": "en"
    }

    try:
        res = requests.get("https://serpapi.com/search", params=params).json()
        organic = res.get("organic_results", []) or []

        for item in organic:
            link = item.get("link", "")
            if store in link:
                print(f"✅ REAL product URL found ({store}): {link}")
                return link

        print(f"❌ No perfect product URL found for {store}")
        return None

    except Exception as e:
        print(f"URL fetch error for {store}:", e)
        return None


def extract_price_from_snippet(snippet: str):
    """
    Temporary placeholder — you will use paid APIs for accurate pricing later.
    """
    if not snippet:
        return None
    match = re.search(r"₹[\d,]+", snippet)
    return match.group(0) if match else None




# ==========================================================
# PUBLIC WRAPPERS
# ==========================================================
# ==========================================================
# FINAL HYBRID FETCHERS (SHOPPING + WEB SEARCH)
# ==========================================================

def fetch_flipkart(product_name: str):
    shopping = shopping_lookup(product_name)
    if not shopping:
        return None
    
    corrected = shopping["corrected_title"]
    image = shopping["image"]
    price = shopping["price"]

    url = fetch_store_product(corrected, "flipkart")
    if not url:
        return None

    return {
        "title": corrected,
        "price": price,
        "url": url,
        "image": image
    }


def fetch_nykaa(product_name: str):
    shopping = shopping_lookup(product_name)
    if not shopping:
        return None
    
    corrected = shopping["corrected_title"]
    image = shopping["image"]
    price = shopping["price"]

    url = fetch_store_product(corrected, "nykaa")
    if not url:
        return None

    return {
        "title": corrected,
        "price": price,
        "url": url,
        "image": image
    }
