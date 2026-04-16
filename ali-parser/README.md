# AliExpress → Product Card Parser 🐾

Парсер товаров с AliExpress для автоматического создания карточек товаров.

## Что делает

- Открывает страницу товара AliExpress через Playwright (headless Chrome)
- Извлекает фото, цены, характеристики, варианты
- Генерирует красивое продающее название
- Считает цену: оригинал → +50% наценка → конвертация в EUR
- Выдаёт готовый JSON для карточки товара

## Структура проекта

```
ali-parser/
├── main.py              # CLI — точка входа
├── config.py            # Настройки (наценка, курс, фильтры)
├── requirements.txt
├── parser/
│   ├── scraper.py       # Playwright — парсинг страницы
│   ├── images.py        # Фильтрация и выбор фото
│   ├── title.py         # Генерация названия
│   ├── price.py         # Расчёт цен + конвертация
│   ├── specs.py         # Извлечение характеристик
│   └── builder.py       # Сборка финального JSON
```

## Установка

```bash
cd ali-parser

# Создаём виртуальное окружение
python3 -m venv venv
source venv/bin/activate

# Устанавливаем зависимости
pip install -r requirements.txt

# Устанавливаем браузер Chromium для Playwright
playwright install chromium
```

## Использование

### Одна ссылка
```bash
python main.py "https://www.aliexpress.com/item/XXXXXX.html"
```

### Несколько ссылок
```bash
python main.py "https://..." "https://..." "https://..."
```

### Из файла (по одной ссылке на строку)
```bash
python main.py --file urls.txt
```

### Интерактивный режим
```bash
python main.py --interactive
```

## Результат

Сохраняется в `products_output.json`:

```json
{
  "source_url": "https://aliexpress.com/item/...",
  "product_title": "Оригинальное название с AliExpress",
  "generated_title": "Чистое Продающее Название",
  "price_original": "12.50 USD",
  "currency_original": "USD",
  "price_range": "$12.50 - $18.00",
  "price_markup_50_percent": "18.75 USD",
  "price_final_eur": "€17.99",
  "price_final_eur_number": 17.99,
  "usd_to_eur_rate": 0.92,
  "images": [
    "https://ae01.alicdn.com/kf/...",
    "https://ae01.alicdn.com/kf/..."
  ],
  "colors": ["Black", "White", "Brown"],
  "sizes": ["S", "M", "L", "XL"],
  "material": "Cotton",
  "description_short": "Краткое описание товара...",
  "features": ["Material: Cotton", "Style: Casual"],
  "variants": []
}
```

## Настройка

В `config.py`:
- `MARKUP_PERCENT` — наценка (по умолчанию 50%)
- `FALLBACK_USD_TO_EUR` — курс если API недоступен (0.92)
- `MAX_IMAGES` — максимум фото (2)
- `BROWSER_HEADLESS` — режим браузера (True)

## Расширение

- Для выгрузки на сайт — добавьте модуль в `parser/export.py`
- Для Telegram-бота — оберните `process_url()` в хендлер
- Для API — оберните в FastAPI/Flask роут
