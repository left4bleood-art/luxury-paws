"""
Модуль фильтрации и выбора лучших фотографий товара.
"""

import re
from typing import List
from config import IMAGE_BLACKLIST_KEYWORDS, MAX_IMAGES


def select_best_images(raw_urls: List[str], max_count: int = MAX_IMAGES) -> List[str]:
    """
    Из списка сырых URL выбираем лучшие фото:
    - убираем дубли
    - убираем мусорные (водяные знаки, баннеры, size-chart)
    - пропускаем первый элемент галереи (часто видео)
    - сохраняем порядок галереи (= приоритет)
    """
    if not raw_urls:
        return []

    # Дедупликация: по базовому URL (без параметров)
    seen = set()
    unique = []
    for url in raw_urls:
        base = _normalize_url(url)
        if base not in seen:
            seen.add(base)
            unique.append(url)

    # Фильтрация — убираем мусор
    clean = [u for u in unique if _is_good_image(u)]

    # Исключаем webp и avif
    clean = [u for u in clean if not (u.lower().endswith('.webp') or u.lower().endswith('.avif'))]

    # Выбираем фото по индексам 3,4,7,8,9 (индексация с 1 для пользователя, с 0 для Python)
    wanted_indices = [2, 3, 6, 7, 8]  # 3,4,7,8,9
    result = []
    for idx in wanted_indices:
        if idx < len(clean):
            result.append(clean[idx])
    return result


def _normalize_url(url: str) -> str:
    """Нормализуем URL для дедупликации."""
    url = re.sub(r'\?.*$', '', url)
    url = re.sub(r'_(?:\d+x\d+(?:q\d+)?)\.(?:jpg|jpeg|png|webp|avif)_\.avif$', '', url, flags=re.I)
    url = re.sub(r'_(?:\d+x\d+(?:q\d+)?)\.(?:jpg|jpeg|png|webp)$', '', url, flags=re.I)
    url = re.sub(r'_\.avif$', '', url, flags=re.I)
    url = re.sub(r'_\.webp$', '', url, flags=re.I)
    return url.lower()


def _is_good_image(url: str) -> bool:
    """Проверяем, что фото не мусор."""
    lower = url.lower()

    # Чёрный список
    for kw in IMAGE_BLACKLIST_KEYWORDS:
        if kw in lower:
            return False

    # Видео-превью / gif / mp4 — пропускаем
    if any(ext in lower for ext in ['.mp4', '.gif', '.svg', 'video']):
        return False

    if '.avif' in lower and '_.avif' in lower:
        return False

    # Слишком маленькие иконки
    if re.search(r'_(\d+)x(\d+)', lower):
        m = re.search(r'_(\d+)x(\d+)', lower)
        w, h = int(m.group(1)), int(m.group(2))
        if w < 200 or h < 200:
            return False

    # Должен быть CDN AliExpress
    if 'alicdn.com' not in lower and 'ae01.alicdn' not in lower:
        # Не alicdn — допускаем, но с меньшим приоритетом
        pass

    return True


def _score_image(url: str) -> int:
    """Оценка фото — чем выше, тем лучше."""
    score = 0
    lower = url.lower()

    # Основной CDN AliExpress — хороший знак
    if 'ae01.alicdn.com' in lower or 'cbu01.alicdn.com' in lower:
        score += 10

    if 'aliexpress-media.com' in lower:
        score -= 4

    # Фото товара (не описание)
    if '/kf/' in lower or '/item/' in lower:
        score += 5

    # Большое фото — jpg/png лучше webp мелочи
    if lower.endswith('.jpg') or lower.endswith('.png') or lower.endswith('.webp'):
        score += 3
    if lower.endswith('.jpeg'):
        score += 3

    if re.search(r'/(?:24|32|48|60|64|96|116|154|208)x(?:24|32|48|60|64|96|116|154|208)\.', lower):
        score -= 12

    # Описательные фото (detail/description) менее приоритетны
    if 'desc' in lower or 'detail' in lower:
        score -= 5

    # Если есть "main" или "product" в URL — хорошо
    if 'main' in lower or 'product' in lower:
        score += 4

    return score
