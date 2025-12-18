import requests
from bs4 import BeautifulSoup

def fetch_flipkart(query):
    try:
        url = f"https://www.flipkart.com/search?q={query.replace(' ', '+')}"
        headers = {"User-Agent": "Mozilla/5.0"}
        resp = requests.get(url, headers=headers)
        soup = BeautifulSoup(resp.text, "html.parser")

        # Try layout 1
        product = soup.select_one("div._2kHMtA")
        if product:
            title = product.select_one("div._4rR01T")
            price = product.select_one("div._30jeq3")
            link = product.find("a")["href"]
            img = product.select_one("img")["src"]

            return {
                "title": title.get_text(strip=True) if title else None,
                "price": price.get_text(strip=True) if price else None,
                "url": "https://www.flipkart.com" + link,
                "image": img
            }

        # Try layout 2
        product = soup.select_one("div._4ddWXP")
        if product:
            title = product.select_one("a.s1Q9rs")
            price = product.select_one("div._30jeq3")
            link = product.find("a")["href"]
            img = product.select_one("img")["src"]

            return {
                "title": title.get_text(strip=True) if title else None,
                "price": price.get_text(strip=True) if price else None,
                "url": "https://www.flipkart.com" + link,
                "image": img
            }

        return None

    except Exception as e:
        print("Flipkart Scraper Error:", e)
        return None
