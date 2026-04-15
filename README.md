# Luxury Paws — Premium Dog Boutique

## Архитектура локализации

### Как устроены переводы

Все строки интерфейса хранятся в **единой структуре `i18n`** в `script.js`. Это словарь с двумя ветками: `ru` и `en`. Каждая ветка содержит вложенные объекты по разделам:

```
i18n.ru.nav.home       → "Главная"
i18n.en.nav.home       → "Home"
i18n.ru.filters.small  → "Маленький"
i18n.en.filters.small  → "Small"
```

### Как подтягиваются переводы

1. **Статический текст** — HTML-элементы с атрибутом `data-i18n="path.to.key"`. Функция `translateStatic()` обходит все такие элементы и подставляет текст из словаря.

2. **Динамический контент** — карточки товаров, коллекции, фильтры, корзина, отзывы — генерируются в JS и при каждом рендере используют `t('path.to.key')` и `product.name[locale]`.

3. **Фильтры категорий** — полностью рендерятся из JS через `renderFilters(category)`. Labels и options фильтров берутся из словаря `i18n[locale].filters.*`, поэтому при смене языка пересоздаются в правильном языке.

4. **Email-шаблоны** — сервер получает `locale` с заказом и использует `emailI18n[locale]` для формирования писем на языке пользователя.

### Что переводится при смене языка

Всё без исключений:
- Header (навигация, кнопка корзины)
- Hero section (заголовок, подзаголовок, кнопки, карточки)
- Collection cards (название, описание, CTA, счётчик)
- Product cards (название, описание, кнопка, бейдж)
- Category pages (заголовок, подзаголовок, back-кнопка)
- Фильтры (labels, values)
- Product detail (имя, описание, опции, кнопка, trust badges)
- Корзина (items, labels, summary, remove)
- Checkout (все labels, payment options, terms, submit)
- Footer (copyright, links)
- Email templates (subject, body)
- Document title и lang attribute

## Файлы

| Файл | Назначение |
|------|-----------|
| `index.html` | SPA shell с `data-i18n` атрибутами, пустые контейнеры для динамического контента |
| `styles.css` | Premium дизайн: Playfair Display + Inter, editorial collection cards, category banners |
| `script.js` | i18n словарь, products data, filter engine, SPA routing, cart, checkout |
| `server.js` | Backend API: Stripe (EUR), PayPal (EUR), bilingual email templates |

## Навигация

- `#home` — главная
- `#shop` — скролл к коллекциям
- `#best-sellers` — скролл к хитам
- `#contact` — скролл к контактам
- `#beds` / `#toys` / `#accessories` — страницы категорий
- `#product/{id}` — страница товара

## Запуск

```bash
cp .env.example .env  # заполнить ключи
npm install
npm run backend
```

## Промокоды

- `LUXURY20` — скидка €10
- `PAWLOVE` — скидка €5
