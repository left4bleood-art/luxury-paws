"""
Пользовательские override-правила для карточек товара.
Позволяют явно указать цвета, фото, размеры и другие поля,
если AliExpress страница отдаёт неполные или шумные данные.
"""

import json
import re
from copy import deepcopy
from typing import Any, Dict, List, Optional


def load_override_rules(filepath: Optional[str]) -> Dict[str, Any]:
    """Загружает JSON-файл с override-правилами."""
    if not filepath:
        return {}

    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    if not isinstance(data, dict):
        raise ValueError("Override rules file must contain a JSON object.")

    return data


def get_override_for_url(rules: Dict[str, Any], source_url: str) -> Dict[str, Any]:
    """Возвращает объединённые override-правила для конкретного URL."""
    if not rules:
        return {}

    merged = {}
    default_rules = rules.get("default", {})
    if isinstance(default_rules, dict):
        merged = deepcopy(default_rules)

    products = rules.get("products", {})
    if not isinstance(products, dict):
        products = {}

    item_id = _extract_item_id(source_url)
    normalized_url = _normalize_source_url(source_url)
    candidates = [source_url, normalized_url]
    if item_id:
        candidates.extend([item_id, f"item:{item_id}"])

    seen = set()
    for key in candidates:
        if not key or key in seen:
            continue
        seen.add(key)

        rule = None
        if key in products and isinstance(products[key], dict):
            rule = products[key]
        elif key in rules and key not in ["default", "products"] and isinstance(rules[key], dict):
            rule = rules[key]

        if rule:
            merged = _deep_merge(merged, rule)

    return merged


def apply_overrides(card: dict, raw_data: dict, overrides: Optional[Dict[str, Any]]) -> dict:
    """Применяет пользовательские overrides к готовой карточке."""
    if not overrides:
        return card

    updated = deepcopy(card)

    if overrides.get("title"):
        updated["generated_title"] = str(overrides["title"]).strip()

    if overrides.get("description_short") is not None:
        updated["description_short"] = str(overrides.get("description_short") or "").strip()

    if overrides.get("material") is not None:
        updated["material"] = str(overrides.get("material") or "").strip()

    if overrides.get("colors") is not None:
        updated["colors"] = _clean_list(overrides.get("colors"))

    if overrides.get("sizes") is not None:
        updated["sizes"] = _clean_list(overrides.get("sizes"))

    if overrides.get("features") is not None:
        updated["features"] = _clean_list(overrides.get("features"))

    if overrides.get("variants") is not None and isinstance(overrides.get("variants"), list):
        updated["variants"] = overrides["variants"]

    resolved_images = _resolve_images(raw_data, overrides)
    if resolved_images is not None:
        updated["images"] = resolved_images

    if overrides.get("price_final_eur_number") is not None:
        try:
            price_eur = round(float(overrides["price_final_eur_number"]), 2)
            updated["price_final_eur_number"] = price_eur
            updated["price_final_eur"] = f"€{price_eur:.2f}"
        except (TypeError, ValueError):
            pass

    if overrides.get("price_original") is not None:
        try:
            price_original = round(float(overrides["price_original"]), 2)
            currency = updated.get("currency_original", "USD")
            updated["price_original"] = f"{price_original:.2f} {currency}"
        except (TypeError, ValueError):
            pass

    return updated


def _resolve_images(raw_data: dict, overrides: Dict[str, Any]) -> Optional[List[str]]:
    """Определяет финальный набор фото по explicit URLs или номерам."""
    explicit_images = overrides.get("images") or overrides.get("image_urls")
    if explicit_images is not None:
        return _clean_list(explicit_images)

    raw_images = raw_data.get("images", []) or []
    image_numbers = overrides.get("image_numbers") or overrides.get("image_indexes")
    drop_numbers = overrides.get("drop_image_numbers") or overrides.get("drop_image_indexes") or []
    image_limit = overrides.get("image_limit")

    if image_numbers is None and not drop_numbers and image_limit is None:
        return None

    selected = list(raw_images)

    if image_numbers is not None:
        selected = []
        for num in image_numbers:
            try:
                idx = int(num) - 1  # 1-based нумерация удобнее для человека
            except (TypeError, ValueError):
                continue
            if 0 <= idx < len(raw_images):
                selected.append(raw_images[idx])

    if drop_numbers:
        drop_indexes = set()
        for num in drop_numbers:
            try:
                drop_indexes.add(int(num) - 1)
            except (TypeError, ValueError):
                continue
        selected = [img for idx, img in enumerate(selected) if idx not in drop_indexes]

    selected = _clean_list(selected)

    if image_limit is not None:
        try:
            limit = max(0, int(image_limit))
            selected = selected[:limit]
        except (TypeError, ValueError):
            pass

    return selected


def _clean_list(values: Any) -> List[str]:
    if not isinstance(values, list):
        return []
    result = []
    seen = set()
    for value in values:
        text = str(value).strip()
        if text and text not in seen:
            seen.add(text)
            result.append(text)
    return result


def _extract_item_id(source_url: str) -> str:
    match = re.search(r'/item/(\d+)\.html', source_url or '')
    return match.group(1) if match else ''


def _normalize_source_url(source_url: str) -> str:
    match = re.search(r'(https?://\S*aliexpress\.com/item/\d+\.html)', source_url or '')
    return match.group(1) if match else source_url


def _deep_merge(base: Dict[str, Any], override: Dict[str, Any]) -> Dict[str, Any]:
    result = deepcopy(base)
    for key, value in override.items():
        if isinstance(value, dict) and isinstance(result.get(key), dict):
            result[key] = _deep_merge(result[key], value)
        else:
            result[key] = deepcopy(value)
    return result