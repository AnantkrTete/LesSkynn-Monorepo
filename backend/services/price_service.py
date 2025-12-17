from services.serpapi_service import fetch_amazon, fetch_flipkart, fetch_nykaa

def fetch_all_prices(product_name: str):
    print("🟦 Starting price aggregation for:", product_name)

    amazon = fetch_amazon(product_name)
    flipkart = fetch_flipkart(product_name)
    nykaa = fetch_nykaa(product_name)

    # IMAGE PRIORITY: nykaa → amazon → flipkart
    final_image = (
        (nykaa and nykaa.get("image")) or
        (amazon and amazon.get("image")) or
        (flipkart and flipkart.get("image")) or
        None
    )

    return {
        "amazon": amazon,
        "flipkart": flipkart,
        "nykaa": nykaa,
        "image": final_image
    }
