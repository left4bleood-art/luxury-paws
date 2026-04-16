#!/usr/bin/env python3
"""
AliExpress → Product Card Parser
Главный скрипт: CLI для парсинга товаров.

Использование:
    python main.py <url>
    python main.py <url1> <url2> <url3>
    python main.py --file urls.txt
    python main.py --interactive
"""

import asyncio
import json
import sys
import os

# Добавляем корень проекта в path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from parser.scraper import fetch_product_page
from parser.builder import build_product_card
from parser.downloader import download_product_images
from parser.overrides import load_override_rules, get_override_for_url


async def process_url(
    url: str,
    download_images: bool = False,
    product_index: int = 1,
    override_rules: dict = None,
) -> dict:
    """Полный пайплайн: URL → карточка товара."""
    print(f"\n{'='*60}")
    print(f"  Парсинг: {url}")
    print(f"{'='*60}")

    print("  ⏳ Открываю страницу через Playwright...")
    raw_data = await fetch_product_page(url)

    print(f"  ✓ Заголовок: {raw_data.get('title', '—')[:80]}")
    print(f"  ✓ Цена: {raw_data.get('price_text', '—')}")
    print(f"  ✓ Фото найдено: {len(raw_data.get('images', []))}")
    print(f"  ✓ Спецификации: {len(raw_data.get('specs', {}))}")

    product_overrides = get_override_for_url(override_rules or {}, url)
    if product_overrides:
        print(f"  🛠️  Override-правила: {', '.join(sorted(product_overrides.keys()))}")

    print("  ⚙️  Собираю карточку товара...")
    card = build_product_card(raw_data, url, overrides=product_overrides)

    print(f"  ✅ Готово! Название: {card['generated_title']}")
    print(f"  💰 Цена: {card['price_original']} → {card['price_final_eur']}")
    print(f"  🎨 Цвета: {len(card['colors'])} | 📐 Размеры: {len(card['sizes'])}")
    print(f"  📷 Фото: {len(card['images'])}")

    for warning in card.get("validation_warnings", []):
        print(f"  ⚠️  {warning}")

    if download_images and card.get("images"):
        remote_images = [img for img in card["images"] if str(img).startswith("http")]
        if remote_images:
            folder = os.path.join("downloaded_images", f"product-{product_index}")
            saved = download_product_images(remote_images, folder, prefix="image")
            card["downloaded_images"] = saved
            print(f"  💾 Скачано локально: {len(saved)}")

    return card


def _get_option_value(flag: str) -> str:
    if flag not in sys.argv:
        return ""
    idx = sys.argv.index(flag)
    if idx + 1 < len(sys.argv):
        return sys.argv[idx + 1]
    return ""


async def main():
    urls = []
    download_images = "--download-images" in sys.argv
    rules_file = _get_option_value("--rules")
    override_rules = load_override_rules(rules_file)

    if len(sys.argv) < 2 or "--interactive" in sys.argv:
        # Интерактивный режим
        print("\n🐾 AliExpress → Product Card Parser")
        print("━" * 40)
        print("Вставьте ссылки на товары (по одной на строку).")
        print("Пустая строка — начать парсинг.\n")
        while True:
            try:
                line = input("  URL: ").strip()
            except (EOFError, KeyboardInterrupt):
                break
            if not line:
                break
            if line.startswith("http"):
                urls.append(line)

    elif "--file" in sys.argv:
        # Из файла
        idx = sys.argv.index("--file")
        if idx + 1 < len(sys.argv):
            filepath = sys.argv[idx + 1]
            with open(filepath, "r") as f:
                for line in f:
                    line = line.strip()
                    if line and line.startswith("http"):
                        urls.append(line)

    else:
        # Из аргументов
        for arg in sys.argv[1:]:
            if arg.startswith("http"):
                urls.append(arg)

    if not urls:
        print("❌ Не указаны ссылки. Использование:")
        print("   python main.py <url>")
        print("   python main.py --file urls.txt")
        print("   python main.py --interactive")
        print("   python main.py --download-images <url>")
        print("   python main.py --rules product-rules.json <url>")
        sys.exit(1)

    print(f"\n📦 Обработка {len(urls)} товар(ов)...\n")

    results = []
    for index, url in enumerate(urls, start=1):
        try:
            card = await process_url(
                url,
                download_images=download_images,
                product_index=index,
                override_rules=override_rules,
            )
            results.append(card)
        except Exception as e:
            print(f"\n  ❌ Ошибка при парсинге {url}: {e}")
            results.append({"source_url": url, "error": str(e)})

    # Сохраняем результат
    output_file = "products_output.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(results if len(results) > 1 else results[0], f, ensure_ascii=False, indent=2)

    print(f"\n{'='*60}")
    print(f"  📄 Результат сохранён: {output_file}")
    print(f"{'='*60}\n")

    # Выводим JSON в консоль
    print(json.dumps(results if len(results) > 1 else results[0], ensure_ascii=False, indent=2))

    return results


if __name__ == "__main__":
    asyncio.run(main())
