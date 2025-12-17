import csv
from pathlib import Path

CSV_PATH = Path("data/mapping_clean_all.csv")

# Cache CSV rows in memory
_cached_rows = None


def load_csv_rows():
    global _cached_rows
    if _cached_rows is not None:
        return _cached_rows

    rows = []
    with open(CSV_PATH, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            clean_row = {k: (v.strip() if v else "") for k, v in row.items()}
            rows.append(clean_row)

    _cached_rows = rows
    return rows


def normalize(s: str) -> str:
    return s.strip().lower()


def split_csv_preference(pref_text: str):
    """
    Converts:
    "Budget-Friendly + Natural/Organic Products"
    → ["budget-friendly", "natural/organic products"]
    """
    return [p.strip().lower() for p in pref_text.split("+")]


def match_row(skin, concern, commitment, preference):
    rows = load_csv_rows()

    skin = normalize(skin)
    concern = normalize(concern)
    commitment = normalize(commitment)
    preference = normalize(preference)

    # -----------------------------------------
    # 1️⃣ EXACT MATCH (BEST CASE)
    # -----------------------------------------
    for r in rows:
        if (
            normalize(r["Skin type"]) == skin and
            normalize(r["Concern"]) == concern and
            normalize(r["Commitment Level"]) == commitment and
            normalize(r["Preferred Skincare Ingredients/Products"]) == preference
        ):
            return r

    # -----------------------------------------
    # 2️⃣ SMART PARTIAL MATCH (SAFE)
    # -----------------------------------------
    # Example:
    # CSV: "Budget-Friendly + Natural/Organic Products"
    # User: "budget-friendly"
    # → return match.
    for r in rows:
        if (
            normalize(r["Skin type"]) == skin and
            normalize(r["Concern"]) == concern and
            normalize(r["Commitment Level"]) == commitment
        ):
            csv_pref_parts = split_csv_preference(r["Preferred Skincare Ingredients/Products"])
            if preference in csv_pref_parts:
                return r

    # -----------------------------------------
    # 3️⃣ FINAL FALLBACK — IGNORE PREFERENCE
    # -----------------------------------------
    for r in rows:
        if (
            normalize(r["Skin type"]) == skin and
            normalize(r["Concern"]) == concern and
            normalize(r["Commitment Level"]) == commitment
        ):
            return r

    return None
