import os
import json
import time
import hashlib


# 7 days expiry in seconds
SERPAPI_TTL = 7 * 24 * 60 * 60  


def make_serp_key(product_name: str) -> str:
    """
    Hash the product name to create a stable filename.
    """
    hashed = hashlib.md5(product_name.lower().encode()).hexdigest()
    return hashed


def get_serp_cache_path(product_name: str) -> str:
    """
    Returns the path where cache file should be stored.
    """
    filename = make_serp_key(product_name) + ".json"
    return os.path.join("cache", "serpapi", filename)


def get_cached_result(product_name: str):
    """
    Loads cache if exists AND not expired.
    Otherwise returns None.
    """
    path = get_serp_cache_path(product_name)

    if not os.path.exists(path):
        return None  # no cache

    try:
        with open(path, "r", encoding="utf-8") as f:
            cached = json.load(f)
    except:
        return None

    timestamp = cached.get("_timestamp")
    if not timestamp:
        return None

    # check expiry
    if time.time() - timestamp > SERPAPI_TTL:
        return None  # expired

    # return only stored "data"
    return cached.get("data")


def save_cached_result(product_name: str, data: dict):
    """
    Saves data to cache with timestamp.
    """
    path = get_serp_cache_path(product_name)
    os.makedirs(os.path.dirname(path), exist_ok=True)

    wrapped = {
        "_timestamp": time.time(),
        "data": data
    }

    with open(path, "w", encoding="utf-8") as f:
        json.dump(wrapped, f, indent=2, ensure_ascii=False)
