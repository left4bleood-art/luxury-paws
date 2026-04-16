"""
Конфигурация парсера AliExpress → Product Card
"""

# ─── Наценка ───
MARKUP_PERCENT = 50  # +50% к цене AliExpress

# ─── Курс USD → EUR (фолбек, если API недоступен) ───
FALLBACK_USD_TO_EUR = 0.92

# ─── Сколько фото максимум брать ───
MAX_IMAGES = 3

# ─── Playwright ───
BROWSER_HEADLESS = True
PAGE_TIMEOUT_MS = 30_000
WAIT_AFTER_LOAD_MS = 4000  # ждём рендер SPA

# ─── Паттерны для фильтрации «мусорных» фото ───
IMAGE_BLACKLIST_KEYWORDS = [
    'banner', 'poster', 'description', 'detail',
    'store', 'shop', 'logo', 'icon', 'coupon',
    'size-chart', 'sizechart',
]
IMAGE_MIN_WIDTH = 300  # px — минимальный размер фото

# ─── Слова-мусор в заголовках AliExpress, которые убираем ───
TITLE_JUNK_WORDS = [
    'free shipping', 'hot sale', 'new arrival', 'best quality',
    'high quality', 'top quality', 'wholesale', 'dropshipping',
    'aliexpress', 'on sale', 'fast delivery', 'cheap',
    'in stock', 'big sale', 'clearance', '2024', '2025', '2026',
]

# ─── Красивое округление цен ───
def round_price_pretty(price: float) -> float:
    """Округляет цену красиво для магазина: .99 или целое число."""
    if price < 5:
        return round(price, 2)
    if price < 20:
        return float(int(price)) + 0.99 if price % 1 > 0.3 else float(round(price))
    if price < 100:
        base = int(price)
        return float(base) + 0.99 if (price - base) > 0.4 else float(round(price))
    # > 100 — округляем до целого
    return float(round(price))
