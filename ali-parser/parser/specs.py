"""
Модуль извлечения характеристик товара:
материал, размеры, цвета, описание, особенности.
"""

import re
from typing import List, Dict, Optional


def extract_specs(raw_specs: dict, sku_data: dict, description: str, json_ld: dict) -> dict:
    """
    Собирает все характеристики в единую структуру:
    - material
    - colors
    - sizes
    - description_short
    - features
    - variants
    """
    result = {
        "material": "",
        "colors": [],
        "sizes": [],
        "description_short": "",
        "features": [],
        "variants": [],
    }

    # ─── Материал ───
    result["material"] = _find_material(raw_specs, json_ld)

    # ─── Цвета и размеры из SKU ───
    if sku_data:
        result["colors"] = sku_data.get("colors", [])
        result["sizes"] = sku_data.get("sizes", [])
        result["variants"] = sku_data.get("variants", [])

    # ─── Дополнительно из спецификаций ───
    if not result["colors"]:
        result["colors"] = _extract_from_specs(raw_specs, ["color", "colour", "цвет"])
    if not result["sizes"]:
        result["sizes"] = _extract_from_specs(raw_specs, ["size", "размер"])

    # ─── Описание ───
    result["description_short"] = _build_short_description(description, raw_specs, json_ld)

    # ─── Особенности (features) ───
    result["features"] = _extract_features(raw_specs, description)

    return result


def _find_material(specs: dict, json_ld: dict) -> str:
    """Находим материал из спецификаций или JSON-LD."""
    material_keys = ["material", "fabric", "материал", "ткань", "Main Material"]
    for key, val in specs.items():
        if any(mk.lower() in key.lower() for mk in material_keys):
            return val

    # Из JSON-LD
    if json_ld:
        mat = json_ld.get("material", "")
        if mat:
            return mat
        # В additionalProperty
        for prop in json_ld.get("additionalProperty", []):
            if isinstance(prop, dict) and "material" in prop.get("name", "").lower():
                return prop.get("value", "")

    return ""


def _extract_from_specs(specs: dict, keywords: List[str]) -> List[str]:
    """Извлекаем значения из спецификаций по ключевым словам."""
    for key, val in specs.items():
        if any(kw.lower() in key.lower() for kw in keywords):
            # Может быть через запятую или /
            parts = re.split(r'[,/;|]', val)
            return [p.strip() for p in parts if p.strip()]
    return []


def _build_short_description(description: str, specs: dict, json_ld: dict) -> str:
    """Формируем короткое описание."""
    # Из JSON-LD
    if json_ld and json_ld.get("description"):
        desc = json_ld["description"].strip()
        if len(desc) > 20:
            return _truncate(desc, 250)

    # Из описания страницы
    if description:
        # Берём первый абзац/предложение(я)
        lines = [l.strip() for l in description.split('\n') if l.strip()]
        text = ' '.join(lines[:3])
        return _truncate(text, 250)

    # Собираем из спецификаций
    parts = []
    for key, val in list(specs.items())[:5]:
        parts.append(f"{key}: {val}")
    return '; '.join(parts)[:250] if parts else ""


def _extract_features(specs: dict, description: str) -> list[str]:
    """Извлекаем ключевые особенности."""
    features = []

    # Из спецификаций — топ-5 самых полезных
    priority_keys = [
        "material", "fabric", "weight", "dimension", "size",
        "type", "style", "season", "gender", "occasion",
        "pattern", "brand", "origin", "функция",
    ]
    for key, val in specs.items():
        if any(pk.lower() in key.lower() for pk in priority_keys):
            features.append(f"{key}: {val}")
        if len(features) >= 5:
            break

    # Из описания — ищем буллет-поинты
    if description:
        bullets = re.findall(r'[•●★✓✔►▸]\s*(.+)', description)
        for b in bullets[:3]:
            b = b.strip()
            if b and len(b) < 120:
                features.append(b)

    return features[:8]


def _truncate(text: str, max_len: int) -> str:
    """Обрезаем текст до max_len, не ломая слова."""
    if len(text) <= max_len:
        return text
    truncated = text[:max_len]
    last_space = truncated.rfind(' ')
    if last_space > max_len * 0.6:
        truncated = truncated[:last_space]
    return truncated.rstrip('.,;:- ') + '…'
