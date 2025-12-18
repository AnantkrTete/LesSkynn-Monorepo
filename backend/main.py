import os
import json
from typing import Dict, Any, List, Union
from firebase_client import db
from firebase_admin import firestore
from pydantic import BaseModel
from datetime import datetime
import uuid

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()
import google.generativeai as genai

# Local imports
from services.csv_service import match_row
from services.price_service import fetch_all_prices
from services.geminiCache_service import make_key, load_cache, save_cache
from services.mapping import map_skin_type, map_preference




# -----------------------------
# ENV + GEMINI CONFIG
# -----------------------------


GEMINI_MODEL = "gemini-2.5-flash"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("⚠️ GEMINI_API_KEY not set (will fail at runtime if endpoint is hit)")

genai.configure(api_key=GEMINI_API_KEY)

# -----------------------------
# FASTAPI
# -----------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://les-skynn.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CACHE_DIR = "/tmp/gemini_cache"
os.makedirs(CACHE_DIR, exist_ok=True)

# -----------------------------
# MODELS
# -----------------------------
class RoutineRequest(BaseModel):
    skinType: str
    concern: str
    commitment: str
    preference: Union[List[str],str]

class BookingInitRequest(BaseModel):
    influencer_id: str
    influencer_name: str
    user_name: str
    user_location: str
    payment_screenshot_url: str

# -----------------------------
# UTILS
# -----------------------------
def empty_store_result() -> Dict[str, Any]:
    return {"amazon": None, "flipkart": None, "nykaa": None}

def update_booking_status(
    booking_id: str,
    status: str,
    extra: dict | None = None
):
    ref = db.collection("bookings").document(booking_id)

    update_data = {
        "status": status,
        "updatedAt": firestore.SERVER_TIMESTAMP
    }

    if extra:
        update_data.update(extra)

    ref.update(update_data)
# -----------------------------
# ROUTES
# -----------------------------
@app.get("/ping")
def ping():
    return {"status": "ok"}


@app.get("/firebase-test")
def firebase_test():
    try:
        docs = db.collection("bookings").limit(1).get()
        return {"ok": True, "docs_found": len(docs)}
    except Exception as e:
        return {"ok": False, "error": str(e)}


@app.post("/booking/init")



def init_booking(req: BookingInitRequest):
    booking_id = str(uuid.uuid4())
    print("📥 BOOKING RECEIVED:", req.dict())


    booking_data = {
        "bookingId": booking_id,
        "influencerId": req.influencer_id,
        "influencerName": req.influencer_name,
        "userName": req.user_name,
        "userLocation": req.user_location,
        "paymentScreenshotUrl": req.payment_screenshot_url,
        "status": "pending",
        "createdAt": datetime.utcnow()
    }

    db.collection("bookings").document(booking_id).set(booking_data)

    return {
        "success": True,
        "booking_id": booking_id
    }

@app.post("/webhooks/calendly")
async def calendly_webhook(payload: dict):
    event = payload["event"]
    invitee = payload["payload"]["invitee"]
    event_data = payload["payload"]["event"]

    booking_id = None
    for qa in invitee.get("questions_and_answers", []):
        if qa["question"] == "booking_id":
            booking_id = qa["answer"]

    if not booking_id:
        return {"status": "ignored"}

    meet_link = event_data["location"]["join_url"]
    start_time = event_data["start_time"]

    db.collection("bookings").document(booking_id).update({
        "status": "scheduled",
        "meetLink": meet_link,
        "scheduledAt": start_time,
        "updatedAt": firestore.SERVER_TIMESTAMP
    })

    return {"status": "ok"}


@app.post("/routine")
def generate_routine(req: RoutineRequest):
    print("➡️ Received payload:", req.dict())
    print("🔑 SERPAPI KEY:", os.getenv("SERPAPI_API_KEY"))

    # -----------------------------------------
    # 1️⃣ MAP FRONTEND VALUES → CSV VALUES
    # -----------------------------------------
    skin = map_skin_type(req.skinType)

   # Cleanly normalize preference into a list (handles all frontend cases)
    raw_pref = req.preference

    if isinstance(raw_pref, list):
        pref_list = [p.strip() for p in raw_pref]  # multi-select, remove extra spaces
    elif isinstance(raw_pref, str):
        pref_list = [raw_pref.strip()]             # single value
    else:
        pref_list = []

    # Now map using your mapping.py
    preference = map_preference(pref_list)

    # Clean other fields
    concern = req.concern.strip()
    commitment = req.commitment.strip()

    print("➡️ After Mapping:", {
        "skin": skin,
        "concern": concern,
        "commitment": commitment,
        "preference": preference
    })

    # -----------------------------------------
    # 2️⃣ MATCH ROW IN CSV
    # -----------------------------------------
    row = match_row(skin, concern, commitment, preference)

    if not row:
        raise HTTPException(404, "No matching row found in CSV")

    # Extract needed values
    ingredients = row["Essential Ingredients to Look For"]
    
    AM_CATEGORIES = ["Facewash", "Moisturiser", "Sunscreen"]
    PM_CATEGORIES = ["Facewash", "Serum", "Moisturiser"]
    categories = ["Cleanser","Moisturiser","Serum","Sunscreen","Night Cream","Micellar Water","Face Oil", "Exfolliant", "Body Lotion"]
    weekly_instruction = row["Weekly Treatments"]
    other_rules = row["Other Suggestion"].strip()


    print("🔍 MATCHED ROW:", row)
    print("🧪 Ingredients:", row["Essential Ingredients to Look For"])
    print("📅 Weekly:", row["Weekly Treatments"])
    print("📌 Other:", row["Other Suggestion"])


    # -----------------------------------------
    # 3️⃣ GEMINI PROMPT
    # -----------------------------------------

    prompt = f"""
    You are a professional dermatologist and cosmetic chemist.
    Your job is to generate **real, available Indian skincare products** that strictly satisfy ALL of the following:

    1. MUST match these essential ingredients:
    {ingredients}

    2. MUST follow THESE EXACT AM product categories:
    {AM_CATEGORIES}

    3. MUST follow THESE EXACT PM product categories:
    {PM_CATEGORIES}

    4. Weekly treatment MUST follow this:
    "{weekly_instruction}"
    - All 3 weekly products must be from DIFFERENT brands.
    - All must follow the weekly treatment type.

    5. AND obey this rule:
    "{other_rules}"

    6. VERY IMPORTANT — when suggesting products:
    - Prefer items that have **high review counts** on Amazon India, Nykaa, and Flipkart.
    - Choose products that are **popular**, **widely available**, and **trusted**.
    - Avoid obscure brands.
    - Prefer well-rated products (4.0+).

    7. CATEGORY EXTENSIONS (Very important):
    For ALL categories in this list:
    {categories}

    - You must return **4 products per category**.
    - **CRITICAL LOGIC:**
        - Check if the category exists in the AM or PM routine (Treat "Cleanser" and "Facewash" as the EXACT SAME category).
        - **IF IT EXISTS IN ROUTINE:** You MUST apply the **essential ingredients** rule (Rule #1).
        - **IF IT DOES NOT EXIST:** Return the **highest-rated / most-reviewed popular products in India**, regardless of ingredients.

    Return STRICT JSON ONLY in this EXACT shape:

    {{
    "morning": [
        {{ "category": "", "name": "", "why": "" }},
        {{ "category": "", "name": "", "why": "" }},
        {{ "category": "", "name": "", "why": "" }}
    ],
    "night": [
        {{ "category": "", "name": "", "why": "" }},
        {{ "category": "", "name": "", "why": "" }},
        {{ "category": "", "name": "", "why": "" }}
    ],
    "weekly": [
        {{ "category": "", "name": "", "why": "" }},
        {{ "category": "", "name": "", "why": "" }},
        {{ "category": "", "name": "", "why": "" }}
    ],
    "categories": {{
        "Cleanser": [
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }}
        ],
        "Moisturiser": [
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }}
        ],
        "Serum": [
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }}
        ],
        "Sunscreen": [
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }}
        ],
        "Night Cream": [
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }}
        ],
        "Micellar Water": [
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }}
        ],
        "Face Oil": [
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }}
        ],
        "Exfolliant": [
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }}
        ],
        "Body Lotion": [
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }},
            {{ "name": "", "why": "" }}
        ]
    }}
    }}
    """

    # -----------------------------------------
    # 4️⃣ GEMINI CACHE KEY
    # -----------------------------------------
    gemini_key = make_key(skin, concern, commitment, preference)
    gemini_cache_path = f"{CACHE_DIR}/{gemini_key}.json"


    # -----------------------------------------
    # 5️⃣ LOAD CACHE
    # -----------------------------------------
    routine = load_cache(gemini_cache_path)
    gemini_resp = None


    # LOGGING ADDED HERE
    if routine:
        print(f"✨ Gemini: Cache HIT for skin profile. Loading from disk.")
    else:
        print(f"🧠 Gemini: Cache MISS. Calling Generative AI...")
        
    # -----------------------------------------
    # 6️⃣ CALL GEMINI IF CACHE MISS
    # -----------------------------------------
    if not routine:
        try:
            model = genai.GenerativeModel(GEMINI_MODEL)
            gemini_resp = model.generate_content(
                prompt,
                generation_config={"response_mime_type": "application/json"}
            )

            raw = gemini_resp.text.strip()

            # 🔥 INSERT THIS PRINT HERE! 🔥
            print("📦 RAW GEMINI RESPONSE (DEBUG):")
            print(raw)
            print("------------------------------------------------")

            if raw.startswith("```"):
                raw = raw.split("```")[1].replace("json", "").strip()

            routine = json.loads(raw)
            save_cache(gemini_cache_path, routine)

        except Exception as e:
            raise HTTPException(500, f"Gemini JSON error: {str(e)}")

    # -----------------------------------------
    # 7️⃣ PRICE ENRICHMENT (Amazon + Flipkart + Nykaa)
    # -----------------------------------------
    for section in ["morning", "night", "weekly"]:
        for item in routine.get(section, []):
            product_name = item.get("name")

            prices = fetch_all_prices(product_name)

            item["stores"] = prices  # ALWAYS overwrite


    # -----------------------------------------
    #  PRICE ENRICHMENT FOR CATEGORIES
    # -----------------------------------------
    categories = routine.get("categories", {})

    for cat_name, product_list in categories.items():
        for item in product_list:
            product_name = item.get("name")
            prices = fetch_all_prices(product_name)
            item["stores"] = prices

  

    if gemini_resp:
        print("📦 RAW GEMINI OUTPUT:\n", gemini_resp.text)

    print("🚀 FINAL RESPONSE:", json.dumps(routine, indent=2))

    return routine

