# ------------------------------
# Normalization Helper
# ------------------------------
def normalize(val: str) -> str:
    return val.strip().lower()


# ------------------------------
# Q1: Skin Type Mapping
# ------------------------------
def map_skin_type(value: str) -> str:
    v = normalize(value)

    mapping = {
        "normal skin": "Normal",
        "oily skin": "Oily",
        "dry skin": "Dry",
        "combination skin": "Combination",
        "sensitive skin": "Sensitive",
    }

    return mapping.get(v, value)


# ------------------------------
# Q3: Preference Mapping (Multi-select)
# ------------------------------
def map_preference(values: list[str]) -> str:
    # Normalize the incoming values
    v = {normalize(x) for x in values}

    organic = "organic" in v
    budget = "budget friendly" in v

    # Return CSV-ready values
    if organic and budget:
        return "Budget-Friendly + Natural/Organic Products"

    if organic:
        return "Natural/Organic Products"

    if budget:
        return "Budget-Friendly"

    return ""
