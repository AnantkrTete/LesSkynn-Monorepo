import requests
from bs4 import BeautifulSoup

def fetch_nykaa(query):
    try:
        url = f"https://www.nykaa.com/search/result/?q={query.replace(' ', '%20')}"
        headers = {"User-Agent": "Mozilla/5.0"}
        resp = requests.get(url, headers=headers)
        soup = BeautifulSoup(resp.text, "html.parser")

        card = soup.select_one("div.css-43m2vm")   # new product card structure
        if not card:
            return None

        title_el = card.select_one("div.css-1rd7vky")
        price_el = card.select_one("div.css-xrzmfa")
        img_el = card.select_one("img")

        link_el = card.find("a", href=True)

        return {
            "title": title_el.get_text(strip=True) if title_el else None,
            "price": price_el.get_text(strip=True) if price_el else None,
            "url": "https://www.nykaa.com" + link_el["href"] if link_el else None,
            "image": img_el["src"] if img_el else None
        }

    except Exception as e:
        print("Nykaa Scraper Error:", e)
        return None
