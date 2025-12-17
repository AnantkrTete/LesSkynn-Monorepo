import os
import json
import hashlib

# Create a stable filename based on input combination
def make_key(*args) -> str:
    raw = "||".join(args)
    return hashlib.md5(raw.encode()).hexdigest()

def load_cache(path: str):
    if os.path.exists(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except:
            return None
    return None

def save_cache(path: str, data: dict):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
