"""
Модуль расчёта цен:
- парсинг цены с AliExpress (из текста)
- наценка +50%
- конвертация USD → EUR
- красивое округление
"""

import re
import time
from typing import Tuple, Optional, Dict
import httpx
from config import MARKUP_PERCENT, FALLBACK_USD_TO_EUR, round_price_pretty


_RATE_CACHE = {
    "value": 0.0,
    "expires_at": 0.0,
}


def parse_price(price_text: str) -> Tuple[float, str]:
    """
    Извлекает числовое значение цены и валюту из текста.
    Возвращает (price, currency).
    Поддерживает: "US $12.34", "€15,00", "$12.34 - $20.00", "RSD3,940.33" и т.п.
    """
    if not price_text:
        return 0.0, "USD"

    text = price_text.strip()

    # Определяем валюту
    currency = "USD"
    if "€" in text or "EUR" in text.upper():
        currency = "EUR"
    elif "£" in text or "GBP" in text.upper():
        currency = "GBP"
    elif "₽" in text or "RUB" in text.upper():
        currency = "RUB"
    elif "RSD" in text.upper():
        currency = "RSD"

    # Ищем числа с учётом разделителя тысяч (1,234.56 или 1.234,56)
    # Паттерн: число с возможными разделителями тысяч
    numbers = re.findall(r'[\d]{1,3}(?:[,.]\d{3})*(?:[,.]\d{1,2})?|\d+\.\d+|\d+', text)
    if not numbers:
        return 0.0, currency

    prices = []
    for n in numbers:
        prices.append(_parse_number(n))

    prices = [p for p in prices if p > 0]
    if not prices:
        return 0.0, currency

    # Если диапазон — берём минимальную
    return min(prices), currency


def _parse_number(s: str) -> float:
    """Парсит число с учётом разных форматов: 3,940.33 / 3.940,33 / 3940.33"""
    s = s.strip()
    if not s:
        return 0.0

    # Определяем формат по последнему разделителю
    last_comma = s.rfind(',')
    last_dot = s.rfind('.')

    if last_comma > last_dot:
        # Формат: 3.940,33 — запятая = десятичный, точка = тысячи
        s = s.replace('.', '').replace(',', '.')
    elif last_dot > last_comma:
        # Формат: 3,940.33 — точка = десятичный, запятая = тысячи
        s = s.replace(',', '')
    else:
        # Только один тип разделителя или нет
        if ',' in s:
            # Может быть 3,94 (десятичный) или 3,940 (тысячи)
            parts = s.split(',')
            if len(parts) == 2 and len(parts[1]) == 3:
                s = s.replace(',', '')  # тысячи
            else:
                s = s.replace(',', '.')  # десятичный

    try:
        return float(s)
    except ValueError:
        return 0.0


def get_price_range(price_text: str) -> Optional[str]:
    """Если в тексте диапазон цен, возвращаем его."""
    numbers = re.findall(r'[\d]{1,3}(?:[,.]\d{3})*(?:[,.]\d{1,2})?|\d+\.\d+|\d+', price_text or '')
    prices = []
    for n in numbers:
        p = _parse_number(n)
        if p > 0:
            prices.append(p)
    if len(prices) >= 2 and prices[0] != prices[-1]:
        return f"${min(prices):.2f} - ${max(prices):.2f}"
    return None


def get_usd_to_eur_rate() -> float:
    """Получаем актуальный курс USD → EUR. Фолбек если API недоступно."""
    now = time.time()
    if _RATE_CACHE["value"] > 0 and now < _RATE_CACHE["expires_at"]:
        return _RATE_CACHE["value"]

    for endpoint in [
        "https://api.exchangerate-api.com/v4/latest/USD",
        "https://open.er-api.com/v6/latest/USD",
    ]:
        try:
            r = httpx.get(endpoint, timeout=5)
            data = r.json()
            rate = float(data["rates"]["EUR"])
            if rate > 0:
                _RATE_CACHE["value"] = rate
                _RATE_CACHE["expires_at"] = now + 3600
                return rate
        except Exception:
            continue

    return FALLBACK_USD_TO_EUR


def calculate_final_price(
    price_original: float,
    currency_original: str = "USD",
    markup_pct: int = MARKUP_PERCENT,
) -> dict:
    """
    Полный расчёт:
    1. Наценка +50%
    2. Конвертация в EUR
    3. Красивое округление
    """
    if price_original <= 0:
        return {
            "price_original": 0,
            "currency_original": currency_original,
            "price_after_markup": 0,
            "usd_to_eur_rate": 0,
            "price_eur_raw": 0,
            "price_final_eur": 0,
        }

    # Наценка
    price_markup = price_original * (1 + markup_pct / 100)

    # Конвертация
    rate = get_usd_to_eur_rate()
    if currency_original == "EUR":
        price_eur = price_markup
    elif currency_original == "USD":
        price_eur = price_markup * rate
    elif currency_original == "GBP":
        # GBP → EUR приблизительно
        price_eur = price_markup * 1.16
    elif currency_original == "RUB":
        price_eur = price_markup * 0.010
    elif currency_original == "RSD":
        # RSD → EUR (примерно 117 RSD = 1 EUR)
        price_eur = price_markup / 117.0
    else:
        price_eur = price_markup * rate

    final = round_price_pretty(price_eur)

    return {
        "price_original": round(price_original, 2),
        "currency_original": currency_original,
        "price_after_markup": round(price_markup, 2),
        "usd_to_eur_rate": round(rate, 4),
        "price_eur_raw": round(price_eur, 2),
        "price_final_eur": final,
    }
