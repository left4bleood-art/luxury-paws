"""
Модуль сборки финального JSON результата.
"""

from parser.images import select_best_images
from parser.overrides import apply_overrides
from parser.title import generate_title
from parser.price import parse_price, get_price_range, calculate_final_price
from parser.specs import extract_specs
from parser.validator import validate_product_card


def build_product_card(raw_data: dict, source_url: str, overrides: dict = None) -> dict:
    """
    Собирает из сырых данных скрапера готовую карточку товара.
    """
    # 1. Фотографии
    images = select_best_images(raw_data.get("images", []))

    # 2. Спецификации
    specs_data = extract_specs(
        raw_specs=raw_data.get("specs", {}),
        sku_data=raw_data.get("sku_data", {}),
        description=raw_data.get("description", ""),
        json_ld=raw_data.get("json_ld", {}),
    )

    # 3. Заголовок
    original_title = raw_data.get("title", "")
    generated_title = generate_title(original_title, raw_data.get("specs", {}))

    # 4. Цена
    price_text = raw_data.get("price_text", "")
    price_val, currency = parse_price(price_text)

    # Попробуем из JSON-LD если парсинг со страницы не дал результат
    if price_val == 0 and raw_data.get("json_ld"):
        ld = raw_data["json_ld"]
        offers = ld.get("offers", {})
        if isinstance(offers, dict):
            try:
                price_val = float(offers.get("price", 0))
                currency = offers.get("priceCurrency", "USD")
            except (ValueError, TypeError):
                pass

    price_range = get_price_range(price_text)
    pricing = calculate_final_price(price_val, currency)

    # 5. Дедупликация: если colors и sizes одинаковые, оставить только sizes
    colors = specs_data["colors"]
    sizes = specs_data["sizes"]
    if colors and sizes and set(colors) == set(sizes):
        colors = []
    # Убираем из colors значения, которые похожи на размеры
    if colors:
        size_keywords = ['cm', 'mm', 'inch', 'diameter', 'xl', 'xxl', 'xxxl']
        real_colors = [c for c in colors if not any(sk in c.lower() for sk in size_keywords)]
        if real_colors:
            colors = real_colors
        else:
            # Все "цвета" оказались размерами
            if not sizes:
                sizes = colors
            colors = []

    # Дедупликация variants
    seen_variant_opts = set()
    clean_variants = []
    for v in specs_data["variants"]:
        opts_key = tuple(sorted(v.get("options", [])))
        if opts_key not in seen_variant_opts:
            seen_variant_opts.add(opts_key)
            clean_variants.append(v)

    # Убираем описание-заглушку AliExpress
    desc = specs_data["description_short"]
    if desc and ("Buy " in desc[:10] and "Aliexpress" in desc):
        desc = ""

    # 6. Сборка JSON
    card = {
        "source_url": source_url,
        "product_title": original_title,
        "generated_title": generated_title,
        "price_original": f"{pricing['price_original']:.2f} {pricing['currency_original']}",
        "currency_original": pricing["currency_original"],
        "price_range": price_range,
        "price_markup_50_percent": f"{pricing['price_after_markup']:.2f} {pricing['currency_original']}",
        "price_final_eur": f"€{pricing['price_final_eur']:.2f}",
        "price_final_eur_number": pricing["price_final_eur"],
        "usd_to_eur_rate": pricing["usd_to_eur_rate"],
        "images": images,
        "colors": colors,
        "sizes": sizes,
        "material": specs_data["material"],
        "description_short": desc,
        "features": specs_data["features"],
        "variants": clean_variants,
    }

    card = apply_overrides(card, raw_data, overrides or {})
    card, warnings = validate_product_card(card)
    if warnings:
        card["validation_warnings"] = warnings

    return card
