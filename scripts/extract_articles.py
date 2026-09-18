"""
Freedom Train 著者ページ (https://freedomtrain.jp/author/mamouna_owo/) から
最新の記事一覧とサムネイル画像を取得し、js/articles.js を自動更新するスクリプト
"""

import urllib.request
import re
import json

URL = "https://freedomtrain.jp/author/mamouna_owo/"

def main():
    req = urllib.request.Request(URL, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    })

    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print("Failed to fetch live URL, checking existing file...", e)
        return

    cards = re.findall(r'<a[^>]+class="[^"]*entry-card-wrap[^"]*"[^>]*>.*?</a>', html, re.DOTALL)
    results = []

    for c in cards:
        href_m = re.search(r'href="([^"]+)"', c)
        title_m = re.search(r'<h2[^>]*class="[^"]*entry-card-title[^"]*"[^>]*>(.*?)</h2>', c, re.DOTALL)
        img_m = re.search(r'<img[^>]+(?:data-)?src="([^"]+)"', c)
        date_m = re.search(r'<span[^>]*class="entry-date"[^>]*>(.*?)</span>', c, re.DOTALL)
        cat_m = re.search(r'<span[^>]*class="[^"]*cat-label[^"]*"[^>]*>(.*?)</span>', c, re.DOTALL)
        snip_m = re.search(r'<div[^>]*class="[^"]*entry-card-snippet[^"]*"[^>]*>(.*?)</div>', c, re.DOTALL)

        url = href_m.group(1) if href_m else ""
        title = re.sub(r'<[^>]+>', '', title_m.group(1)).strip() if title_m else ""
        img = img_m.group(1) if img_m else ""
        date = re.sub(r'<[^>]+>', '', date_m.group(1)).strip() if date_m else ""
        category = re.sub(r'<[^>]+>', '', cat_m.group(1)).strip() if cat_m else ""
        snip = re.sub(r'<[^>]+>', '', snip_m.group(1)).strip() if snip_m else ""

        if url and title:
            results.append({
                "title": title,
                "url": url,
                "thumbnail": img,
                "date": date,
                "category": category,
                "snippet": snip
            })

    if results:
        js_content = f"""/**
 * Freedom Train 執筆記事データ
 * 出典: https://freedomtrain.jp/author/mamouna_owo/
 */

export const AUTHOR_URL = "{URL}";

export const articles = {json.dumps(results, ensure_ascii=False, indent=2)};
"""
        with open("js/articles.js", "w", encoding="utf-8") as f:
            f.write(js_content)
        print(f"Updated js/articles.js successfully with {len(results)} articles.")

if __name__ == "__main__":
    main()
