"""
Модуль скрапинга: открывает страницу AliExpress через Playwright,
ждёт рендер, извлекает сырые данные со страницы.
"""

import json
import re
from typing import List, Dict
from playwright.async_api import async_playwright, Page
from config import BROWSER_HEADLESS, PAGE_TIMEOUT_MS, WAIT_AFTER_LOAD_MS


async def fetch_product_page(url: str) -> dict:
    """
    Открывает страницу товара AliExpress и возвращает сырой словарь:
    {
      "title", "price_text", "images", "sku_data",
      "description", "specs", "page_html"
    }
    """
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=BROWSER_HEADLESS)
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            locale="en-US",
            user_agent=(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/125.0.0.0 Safari/537.36"
            ),
        )

        # Принудительно ставим cookie для USD и english
        await context.add_cookies([
            {"name": "aep_usuc_f", "value": "site=glo&c_tp=USD&region=US&b_locale=en_US", "domain": ".aliexpress.com", "path": "/"},
            {"name": "intl_locale", "value": "en_US", "domain": ".aliexpress.com", "path": "/"},
        ])

        page = await context.new_page()
        page.set_default_timeout(PAGE_TIMEOUT_MS)

        # Убираем параметры трекинга — оставляем только itemId
        clean_url = _clean_ali_url(url)
        await page.goto(clean_url, wait_until="domcontentloaded")
        await page.wait_for_timeout(WAIT_AFTER_LOAD_MS)

        # Закрываем попапы если есть
        await _dismiss_popups(page)
        await page.wait_for_timeout(1000)

        raw = {}
        raw["title"] = await _extract_title(page)
        raw["price_text"] = await _extract_price(page)
        raw["images"] = await _extract_images(page)
        raw["sku_data"] = await _extract_sku(page)
        raw["specs"] = await _extract_specs(page)
        raw["description"] = await _extract_description(page)

        # Попытка достать JSON-LD данные (структурированные)
        raw["json_ld"] = await _extract_json_ld(page)

        # Попытка достать window.__INIT_DATA__ — AliExpress часто хранит данные там
        raw["init_data"] = await _extract_init_data(page)

        await browser.close()
    return raw


async def _dismiss_popups(page: Page):
    """Закрываем надоедливые попапы / куки-баннеры."""
    selectors = [
        'div[class*="pop"] button[class*="close"]',
        'div[class*="modal"] button[class*="close"]',
        'a[class*="close"]',
        'button:has-text("OK")',
        'button:has-text("Accept")',
        '.comet-modal-close',
    ]
    for sel in selectors:
        try:
            el = page.locator(sel).first
            if await el.is_visible(timeout=500):
                await el.click()
                await page.wait_for_timeout(300)
        except Exception:
            pass


async def _extract_title(page: Page) -> str:
    selectors = [
        'h1[data-pl="product-title"]',
        'h1.product-title-text',
        'h1[class*="title"]',
        '.product-title h1',
        'h1',
    ]
    for sel in selectors:
        try:
            el = page.locator(sel).first
            if await el.is_visible(timeout=800):
                return (await el.inner_text()).strip()
        except Exception:
            pass
    return ""


async def _extract_price(page: Page) -> str:
    selectors = [
        '[class*="product-price-current"] span',
        '[class*="uniform-banner-box-price"]',
        '[class*="price--current"]',
        '.product-price-value',
        'span[class*="price"]',
    ]
    for sel in selectors:
        try:
            el = page.locator(sel).first
            if await el.is_visible(timeout=800):
                txt = (await el.inner_text()).strip()
                if txt and any(c.isdigit() for c in txt):
                    return txt
        except Exception:
            pass
    # Фолбек — ищем на всей странице
    try:
        content = await page.content()
        m = re.search(r'(?:US\s*\$|USD)\s*([\d,.]+)', content)
        if m:
            return f"US ${m.group(1)}"
    except Exception:
        pass
    return ""


async def _extract_images(page: Page) -> List[str]:
    """Собираем все URL фото товара. Возвращаем в порядке галереи."""
    gallery_ordered = []  # в порядке галереи (приоритет)
    extra = set()

    # 1) Миниатюры в слайдере — ГЛАВНЫЙ источник, сохраняем порядок
    thumb_selectors = [
        'div[class*="slider--item"] img',
        'div[class*="thumbnail"] img',
        'ul[class*="images"] img',
        'div[class*="image-nav"] img',
    ]
    for sel in thumb_selectors:
        try:
            imgs = page.locator(sel)
            count = await imgs.count()
            for i in range(count):
                src = await imgs.nth(i).get_attribute("src")
                if src:
                    clean = _clean_image_url(src)
                    if clean and clean not in gallery_ordered:
                        gallery_ordered.append(clean)
        except Exception:
            pass

    # 2) Основное большое фото
    img_selectors = [
        'img[class*="magnifier--image"]',
        'img[class*="slider--img"]',
        'div[class*="image-view"] img',
        '.images-view-item img',
        'img[class*="product-img"]',
    ]
    for sel in img_selectors:
        try:
            imgs = page.locator(sel)
            count = await imgs.count()
            for i in range(count):
                src = await imgs.nth(i).get_attribute("src")
                if src:
                    clean = _clean_image_url(src)
                    if clean:
                        extra.add(clean)
        except Exception:
            pass

    # 3) Из HTML — CDN ссылки (фолбек)
    try:
        html = await page.content()
        cdn_pattern = r'(https?://[a-z0-9-]+\.alicdn\.com/kf/[^\s"\'<>]+\.(?:jpg|jpeg|png|webp))'
        for m in re.finditer(cdn_pattern, html, re.I):
            url = _clean_image_url(m.group(1))
            if url:
                extra.add(url)
    except Exception:
        pass

    # Объединяем: сначала gallery (в порядке), потом extra
    result = list(gallery_ordered)
    for u in extra:
        if u not in result:
            result.append(u)

    return result


async def _extract_sku(page: Page) -> dict:
    """Извлекаем варианты товара (цвета, размеры и прочие SKU)."""
    result = {"colors": [], "sizes": [], "variants": []}

    # Метод 1: DOM-селекторы для SKU-блоков
    sku_selectors = [
        '[class*="sku-item"]',
        '[class*="sku-property"]',
        '[class*="product-sku"]',
        '[class*="sku--property"]',
        '[class*="skuItem"]',
    ]
    for sel_block in sku_selectors:
        try:
            sku_blocks = page.locator(sel_block)
            count = await sku_blocks.count()
            for i in range(count):
                block = sku_blocks.nth(i)
                # Ищем лейбл
                label = ""
                for lsel in ['[class*="title"]', '[class*="name"]', '[class*="label"]', 'span:first-child']:
                    try:
                        el = block.locator(lsel).first
                        label = (await el.inner_text(timeout=500)).strip().lower()
                        if label:
                            break
                    except Exception:
                        pass

                # Ищем значения
                values = []
                for vsel in ['span[class*="text"]', 'img[title]', 'a[title]', 'span[title]', 'button[title]', 'div[title]', 'li', 'button span']:
                    try:
                        items = block.locator(vsel)
                        cnt = await items.count()
                        for j in range(cnt):
                            item = items.nth(j)
                            val = None
                            try:
                                val = await item.get_attribute("title", timeout=200)
                            except Exception:
                                pass
                            if not val:
                                try:
                                    val = (await item.inner_text(timeout=200)).strip()
                                except Exception:
                                    pass
                            if val and len(val) < 80 and val not in values:
                                values.append(val)
                    except Exception:
                        pass

                if not values:
                    continue

                if any(k in label for k in ["color", "colour", "цвет", "boja"]):
                    result["colors"] = values
                elif any(k in label for k in ["size", "размер", "veličina"]):
                    result["sizes"] = values
                else:
                    result["variants"].append({"label": label or "variant", "options": values})
        except Exception:
            pass

    # Метод 2: парсим HTML на JSON с SKU данными
    if not result["colors"] and not result["sizes"]:
        try:
            html = await page.content()
            # AliExpress хранит skuModule в JSON
            sku_json_match = re.search(r'"skuModule"\s*:\s*(\{.+?\})\s*,\s*"(?:store|recommend|desc)', html, re.S)
            if sku_json_match:
                try:
                    sku_data = json.loads(sku_json_match.group(1))
                    props = sku_data.get("productSKUPropertyList", [])
                    for prop in props:
                        name = prop.get("skuPropertyName", "").lower()
                        vals = [v.get("propertyValueDisplayName", "") for v in prop.get("skuPropertyValues", []) if v.get("propertyValueDisplayName")]
                        if any(k in name for k in ["color", "colour"]):
                            result["colors"] = vals
                        elif any(k in name for k in ["size", "dimension"]):
                            result["sizes"] = vals
                        elif vals:
                            result["variants"].append({"label": name, "options": vals})
                except json.JSONDecodeError:
                    pass
        except Exception:
            pass

    return result


async def _extract_specs(page: Page) -> dict:
    """Извлекаем характеристики товара из таблицы спецификаций."""
    specs = {}
    selectors = [
        '[class*="specification"] li',
        '[class*="product-props"] li',
        'div[class*="detail-attrs"] li',
        'ul[class*="property-list"] li',
    ]
    for sel in selectors:
        try:
            items = page.locator(sel)
            count = await items.count()
            for i in range(count):
                txt = (await items.nth(i).inner_text(timeout=500)).strip()
                if ":" in txt:
                    key, val = txt.split(":", 1)
                    specs[key.strip()] = val.strip()
        except Exception:
            pass

    # Ищем в key-value парах
    kv_selectors = [
        '[class*="spec"] [class*="key"]',
        '[class*="product-property"] [class*="name"]',
    ]
    for sel in kv_selectors:
        try:
            keys = page.locator(sel)
            vals = page.locator(sel.replace("key", "val").replace("name", "value"))
            count = await keys.count()
            for i in range(count):
                k = (await keys.nth(i).inner_text(timeout=300)).strip()
                try:
                    v = (await vals.nth(i).inner_text(timeout=300)).strip()
                except Exception:
                    v = ""
                if k:
                    specs[k] = v
        except Exception:
            pass

    return specs


async def _extract_description(page: Page) -> str:
    selectors = [
        '[class*="product-description"]',
        '[class*="detail-desc"]',
        '#product-description',
        '.description-content',
    ]
    for sel in selectors:
        try:
            el = page.locator(sel).first
            if await el.is_visible(timeout=800):
                return (await el.inner_text()).strip()[:1500]
        except Exception:
            pass
    return ""


async def _extract_json_ld(page: Page) -> dict:
    """Извлекаем JSON-LD (schema.org Product) если есть."""
    try:
        scripts = page.locator('script[type="application/ld+json"]')
        count = await scripts.count()
        for i in range(count):
            content = await scripts.nth(i).inner_text()
            try:
                data = json.loads(content)
                if isinstance(data, dict) and data.get("@type") == "Product":
                    return data
                if isinstance(data, list):
                    for item in data:
                        if isinstance(item, dict) and item.get("@type") == "Product":
                            return item
            except json.JSONDecodeError:
                pass
    except Exception:
        pass
    return {}


async def _extract_init_data(page: Page) -> dict:
    """AliExpress часто хранит данные в window.runParams или __INIT_DATA__."""
    patterns = [
        r'window\.runParams\s*=\s*(\{.+?\});',
        r'"priceModule"\s*:\s*(\{.+?\})\s*[,}]',
    ]
    try:
        html = await page.content()
        for pat in patterns:
            m = re.search(pat, html, re.S)
            if m:
                try:
                    return json.loads(m.group(1))
                except json.JSONDecodeError:
                    pass
    except Exception:
        pass
    return {}


def _clean_image_url(url: str) -> str:
    """Убираем мелкие ресайзы, берём большую версию."""
    if not url or not url.startswith("http"):
        return ""

    url = url.strip()
    url = re.sub(r'\?.*$', '', url)

    media_match = re.match(
        r'https?://[^/]*aliexpress-media\.com/kf/([^\s"\'<>]+)',
        url,
        re.I,
    )
    if media_match:
        asset_path = media_match.group(1)
        asset_path = re.sub(r'_(?:\d+x\d+(?:q\d+)?)\.(?:jpg|jpeg|png|webp|avif)_\.avif$', '', asset_path, flags=re.I)
        asset_path = re.sub(r'_(?:\d+x\d+(?:q\d+)?)\.(?:jpg|jpeg|png|webp)$', '', asset_path, flags=re.I)
        url = f'https://ae01.alicdn.com/kf/{asset_path}'

    # Убираем служебные суффиксы ресайза у AliExpress CDN, но не подменяем формат файла.
    url = re.sub(r'_(?:\d+x\d+(?:q\d+)?)\.(?:jpg|jpeg|png|webp|avif)_\.avif$', '', url, flags=re.I)
    url = re.sub(r'_(?:\d+x\d+(?:q\d+)?)\.(?:jpg|jpeg|png|webp)$', '', url, flags=re.I)
    url = re.sub(r'_\.avif$', '', url, flags=re.I)
    url = re.sub(r'_\.webp$', '', url, flags=re.I)

    return url


def _clean_ali_url(url: str) -> str:
    """Убираем трекинговые параметры из URL AliExpress, оставляем чистый."""
    m = re.search(r'(https?://\S*aliexpress\.com/item/\d+\.html)', url)
    if m:
        return m.group(1)
    return url
