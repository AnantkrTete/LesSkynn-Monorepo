import csv
from pathlib import Path

# 👇 Add all CSVs you want to clean & merge
INPUT_FILES = [
    Path("data/mapping1.csv"),
    Path("data/mapping2.csv"),
    Path("data/mapping3.csv"),
    Path("data/mapping4.csv"),
    Path("data/mapping5.csv"),
]

OUTPUT_PATH = Path("data/mapping_clean_all.csv")


def fix_encoding(text):
    if text is None:
        return ""
    replacements = {
        "â€¢": "•",
        "â€“": "–",
        "â€™": "’",
        "â€˜": "‘",
        "â€œ": "“",
        "â€": "”",
        "Ã©": "é",
        "Ã": "à",
        "â€": "\"",
    }
    for bad, good in replacements.items():
        text = text.replace(bad, good)

    text = text.encode("utf-8", "ignore").decode("utf-8")
    text = text.replace("\n", " ").replace("\r", " ")
    while "  " in text:
        text = text.replace("  ", " ")

    return text.strip()


def clean_multiple_csvs():
    all_rows = []
    header = None

    for file in INPUT_FILES:
        print(f"📂 Cleaning: {file}")

        with open(file, encoding="utf-8") as f:
            reader = csv.DictReader(f)

            # Capture header from the first file
            if header is None:
                header = reader.fieldnames
            else:
                # Validate column structure
                if reader.fieldnames != header:
                    raise ValueError(
                        f"❌ Column mismatch in {file}. "
                        f"Expected {header}, got {reader.fieldnames}"
                    )

            for row in reader:
                clean_row = {k: fix_encoding(v) for k, v in row.items()}
                all_rows.append(clean_row)

    # Write merged clean file
    with open(OUTPUT_PATH, "w", encoding="utf-8", newline="") as out:
        writer = csv.DictWriter(out, fieldnames=header)
        writer.writeheader()
        writer.writerows(all_rows)

    print("✅ Combined Clean CSV saved as:", OUTPUT_PATH)


if __name__ == "__main__":
    clean_multiple_csvs()
