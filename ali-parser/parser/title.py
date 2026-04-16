"""
Модуль генерации красивого названия товара.
Вместо копирования длинного AliExpress-заголовка —
создаёт короткое, продающее название для магазина.
"""

import re
from typing import Optional
from config import TITLE_JUNK_WORDS


def generate_title(raw_title: str, specs: Optional[dict] = None) -> str:
    """
    Генерирует чистое продающее название:
    1. Убирает мусор (free shipping, 2024, hot sale...)
    2. Убирает дубли слов
    3. Сокращает до разумной длины
    4. Капитализирует красиво
    """
    if not raw_title:
        return "Product"

    title = raw_title.strip()

    # Убираем мусорные фразы (case-insensitive)
    for junk in TITLE_JUNK_WORDS:
        title = re.sub(re.escape(junk), '', title, flags=re.I)

    # Убираем типичный AliExpress спам
    title = re.sub(r'\b\d+\s*pcs?\b', '', title, flags=re.I)       # "1 PC"
    title = re.sub(r'\b(?:suitable for)\b', '', title, flags=re.I)   # "Suitable for"
    title = re.sub(r'\([^)]*\)', '', title)                          # (скобки)
    title = re.sub(r'\[[^\]]*\]', '', title)                         # [скобки]

    # Убираем повторяющиеся прилагательные-наполнители
    filler_words = ['comfortable', 'beautiful', 'fashion', 'cute', 'lovely',
                    'accessories', 'supplies', 'decoration', 'warm', 'winter',
                    'summer', 'spring', 'autumn', 'elastic', 'filling', 'full']
    for fw in filler_words:
        title = re.sub(r'\b' + fw + r'\b', '', title, flags=re.I)

    # Убираем множественные пробелы, запятые, тире
    title = re.sub(r'[,/|]+', ' ', title)
    title = re.sub(r'\s{2,}', ' ', title)
    title = re.sub(r'^[\s,\-–—]+|[\s,\-–—]+$', '', title)

    # Убираем дубли слов
    words = title.split()
    seen_words = set()
    deduped = []
    for w in words:
        wl = w.lower()
        if wl not in seen_words:
            seen_words.add(wl)
            deduped.append(w)
    words = deduped

    # Ограничиваем до ~6 значимых слов для коротких названий
    if len(words) > 7:
        words = words[:6]
    title = ' '.join(words)

    # Красивая капитализация (Title Case)
    title = _smart_title_case(title)

    # Убираем trailing мусор
    title = re.sub(r'[\s,\-–—]+$', '', title)

    # Добавляем контекст из спецификаций, если название слишком короткое
    if specs and len(title.split()) < 3:
        material = specs.get("Material", specs.get("material", ""))
        if material:
            title = f"{title} — {material}"

    return title if title else "Premium Product"


def _smart_title_case(text: str) -> str:
    """Title Case, но мелкие слова (for, of, the, and) остаются строчными."""
    small_words = {'for', 'of', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'by', 'a', 'an', 'with'}
    words = text.split()
    result = []
    for i, w in enumerate(words):
        if i == 0 or w.lower() not in small_words:
            result.append(w.capitalize())
        else:
            result.append(w.lower())
    return ' '.join(result)
