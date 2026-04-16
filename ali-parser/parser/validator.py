"""
Валидация и санитайзинг финальной карточки товара.
"""

import re
from copy import deepcopy
from typing import List, Tuple


SIZE_HINT_RE = re.compile(
    r'(?:\b\d+(?:[.,]\d+)?\s*(?:cm|mm|kg|inch|in)\b|\b(?:diameter|xl|xxl|xxxl|small|medium|large)\b)',
    re.I,
)


def validate_product_card(card: dict) -> Tuple[dict, List[str]]:
    """Возвращает очищенную карточку и список предупреждений."""
    cleaned = deepcopy(card)
    warnings = []

    title = _normalize_text(cleaned.get("generated_title", ""))
    if not title:
        title = "Premium Product"
        warnings.append("Generated title was empty and was replaced with a fallback.")
    cleaned["generated_title"] = title

    product_title = _normalize_text(cleaned.get("product_title", ""))
    cleaned["product_title"] = product_title

    images = _unique_list(cleaned.get("images", []))
    images = [img for img in images if _looks_like_image_ref(img)]
    if not images:
        warnings.append("No valid product images remained after validation.")
    cleaned["images"] = images

    colors = _unique_list(cleaned.get("colors", []))
    sizes = _unique_list(cleaned.get("sizes", []))

    moved_to_sizes = [color for color in colors if _looks_like_size(color)]
    if moved_to_sizes:
        warnings.append("Some color values looked like sizes and were moved to sizes.")
        colors = [color for color in colors if not _looks_like_size(color)]
        sizes = _unique_list(sizes + moved_to_sizes)

    cleaned["colors"] = colors
    cleaned["sizes"] = sizes
    cleaned["features"] = _trim_list(cleaned.get("features", []), max_items=8, max_length=120)
    cleaned["description_short"] = _truncate(_normalize_text(cleaned.get("description_short", "")), 250)
    cleaned["material"] = _normalize_text(cleaned.get("material", ""))

    try:
        price_eur = round(float(cleaned.get("price_final_eur_number", 0) or 0), 2)
    except (TypeError, ValueError):
        price_eur = 0.0
        warnings.append("Final EUR price could not be parsed and was reset to 0.")

    if price_eur < 0:
        price_eur = 0.0
        warnings.append("Final EUR price was negative and was clamped to 0.")

    cleaned["price_final_eur_number"] = price_eur
    cleaned["price_final_eur"] = f"€{price_eur:.2f}"
    cleaned["variants"] = _clean_variants(cleaned.get("variants", []))

    return cleaned, warnings


def _clean_variants(variants: list) -> list:
    result = []
    seen = set()
    for variant in variants or []:
        if not isinstance(variant, dict):
            continue
        label = _normalize_text(variant.get("label", "variant")) or "variant"
        options = _unique_list(variant.get("options", []))
        if not options:
            continue
        key = (label.lower(), tuple(sorted(opt.lower() for opt in options)))
        if key in seen:
            continue
        seen.add(key)
        result.append({"label": label, "options": options})
    return result


def _unique_list(values: list) -> list:
    result = []
    seen = set()
    for value in values or []:
        text = _normalize_text(value)
        if text and text.lower() not in seen:
            seen.add(text.lower())
            result.append(text)
    return result


def _trim_list(values: list, max_items: int, max_length: int) -> list:
    items = []
    for value in values or []:
        text = _normalize_text(value)
        if text:
            items.append(text[:max_length])
    return _unique_list(items)[:max_items]


def _truncate(text: str, max_length: int) -> str:
    if len(text) <= max_length:
        return text
    shortened = text[:max_length]
    last_space = shortened.rfind(' ')
    if last_space > max_length * 0.6:
        shortened = shortened[:last_space]
    return shortened.rstrip('.,;:- ') + '…'


def _normalize_text(value) -> str:
    text = str(value or '')
    return re.sub(r'\s+', ' ', text).strip()


def _looks_like_image_ref(value: str) -> bool:
    lower = str(value or '').strip().lower()
    if not lower:
        return False
    if lower.startswith(('http://', 'https://', 'images/', './', '../', '/')):
        return any(lower.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.avif'])
    return False


def _looks_like_size(value: str) -> bool:
    return bool(SIZE_HINT_RE.search(str(value or '')))