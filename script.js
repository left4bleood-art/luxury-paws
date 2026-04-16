/* ═══════════════════════════════════════════════
   Luxury Paws — script.js
   Centralized i18n, SPA routing, cart, checkout
   ═══════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   1. INTERNATIONALIZATION (i18n)
   Single source of truth for every string.
   ───────────────────────────────────────────── */
const i18n = {
  ru: {
    brand: 'Luxury Paws',
    nav:   { home: 'Главная', shop: 'Магазин', bestSellers: 'Хиты', contact: 'Контакты' },
    hero:  {
      eyebrow: 'Премиальный бутик для собак',
      heading: 'Всё, что нужно вашей собаке для счастливой жизни',
      subtitle: 'Премиум комфорт, игрушки и аксессуары для самых любимых питомцев.',
      shopBtn: 'В магазин', bestBtn: 'Хиты продаж',
      note1: 'Тёплые материалы', note1Text: 'Отобрано для уюта и заботы.',
      note2: 'Проверенное качество', note2Text: 'Создано для долгой радости.',
    },
    shop:  { tag: 'Коллекция', heading: 'Изысканные товары для заботливых владельцев',
             desc: 'Откройте мягкие лежанки, премиальные игрушки и аксессуары с тёплым характером.',
             explore: 'Смотреть' },
    bestSellers: { tag: 'Хиты продаж', heading: 'Самые любимые товары' },
    newArrivals: { tag: 'Новинки', heading: 'Свежие поступления для стильных собак' },
    promoBanner: '🔥 Бесплатная доставка при заказе от €60 • Промокод LUXURY20 = скидка 5%',
    toast: { added: 'Добавлено в корзину ✓' },
    stock: { low: 'Осталось мало' },
    trust: {
      tag: 'Почему выбирают нас', heading: 'Бутик, которому доверяют',
      item1: 'Авторский дизайн', item1Text: 'Премиальные материалы, изысканные детали и элегантная отделка.',
      item2: 'Безопасная оплата', item2Text: 'PayPal обеспечивает надёжную защиту каждого платежа.',
      item3: 'Персональный сервис', item3Text: 'Индивидуальная поддержка и быстрые ответы на каждом этапе.',
    },
    reviews: { tag: 'Отзывы', heading: 'Нас любят владельцы питомцев' },
    ambassador: {
      tag: 'Наш амбассадор',
      heading: 'Звёздный клиент & спонсор',
      desc: 'Питомник LakshmiLove — наш главный партнёр и вдохновение. Роскошь, элегантность и безупречный стиль в каждом питомце.',
    },
    contact: {
      tag: 'Связь', heading: 'Поможем выбрать идеальный товар',
      text: 'Оставьте email для получения новостей и эксклюзивных предложений.',
      emailLabel: 'Email', emailPlaceholder: 'вы@example.com',
      button: 'Подписаться', success: 'Спасибо! Мы скоро свяжемся.',
    },
    footer: { copy: '© 2026 Luxury Paws. Все права защищены.',
              home: 'Главная', shop: 'Магазин', contact: 'Контакты' },
    categories: {
      beds:        { name: 'Лежанки', subtitle: 'Комфортные и стильные лежанки для вашего питомца', countLabel: 'видов лежанок' },
      toys:        { name: 'Игрушки', subtitle: 'Забавные и развивающие игрушки для активных собак', countLabel: 'игрушек' },
      accessories: { name: 'Аксессуары', subtitle: 'Шлейки, щётки, ошейники и другие аксессуары', countLabel: 'аксессуаров' },
    },
    filters: {
      size: 'Размер', color: 'Цвет', price: 'Цена',
      toyType: 'Тип', age: 'Возраст', accType: 'Тип',
      small: 'Маленький', medium: 'Средний', large: 'Большой',
      beige: 'Бежевый', brown: 'Коричневый', gray: 'Серый',
      blue: 'Голубой', orange: 'Оранжевый', black: 'Чёрный',
      red: 'Красный', purple: 'Фиолетовый', green: 'Зелёный',
      graphite: 'Чёрный графит', lightBeige: 'Светло-бежевый', grayBeige: 'Серо-бежевый',
      lightGray: 'Светло-серый', cream: 'Кремовый', dustyPink: 'Пудрово-розовый',
      darkGray: 'Тёмно-серый', lavenderGray: 'Лавандово-серый', lightPink: 'Светло-розовый',
      marbleGray: 'Мраморный серый', chocolate: 'Шоколадный', ivory: 'Айвори / молочный',
      hotPink: 'Ярко-розовый', darkTeal: 'Тёмно-бирюзовый', blueGray: 'Голубовато-серый',
      grayBlue: 'Серо-синий',
      chew: 'Жевательные', interactive: 'Интерактивные', plush: 'Мягкие',
      puppy: 'Щенок', adult: 'Взрослый', senior: 'Пожилой',
      collar: 'Ошейник', leash: 'Поводок', bowl: 'Миска', other: 'Другое',
      harness: 'Шлейка', brush: 'Щётка', fleaCollar: 'Арома-ошейник',
      apricot: 'Абрикосовый', pink: 'Розовый', yellow: 'Жёлтый',
      mint: 'Мятный',
      noResults: 'По выбранным фильтрам ничего не найдено.',
      clearAll: 'Сбросить',
      itemCount: 'товаров',
    },
    product: {
      addToCart: 'В корзину', back: '← Назад',
      shippingNote: 'Доставка от €4 · Бесплатно от €60', securePayment: 'Безопасная оплата', returns: 'Возврат 14 дней',
      badge: { bestseller: 'Хит', new: 'Новинка' },
    },
    cart: {
      label: 'Корзина', tag: 'Ваша корзина',
      heading: 'Оформление заказа',
      subtitle: 'Проверка и безопасная оплата.',
      empty: 'Корзина пуста.',
      remove: 'Удалить',
      subtotal: 'Подытог', shipping: 'Доставка',
      shippingFree: 'Бесплатно',
      discount: 'Скидка', total: 'Итого',
    },
    checkout: {
      contactTitle: 'Контактные данные',
      firstName: 'Имя', lastName: 'Фамилия',
      email: 'Email', phone: 'Телефон',
      country: 'Страна',
      selectCountry: 'Выберите страну',
      customCountry: 'Ваша страна',
      addressTitle: 'Адрес доставки',
      street: 'Улица', city: 'Город', state: 'Регион', zip: 'Индекс',
      apartment: 'Кв. (опц.)',
      paymentTitle: 'Способ оплаты',
      card: 'Карта', paypal: 'PayPal', applePay: 'Apple Pay', googlePay: 'Google Pay',
      cardholder: 'Владелец карты', cardNumber: 'Номер карты',
      promo: 'Промокод', promoApply: 'Применить',
      terms: 'Я соглашаюсь с условиями и политикой',
      submit: 'Оформить заказ',
      note: 'Безопасная оплата и подтверждение на email.',
      thankYou: 'Спасибо! Ваш заказ оформлен.',
      error: 'Ошибка оформления. Попробуйте позже.',
      promoOk5p: 'Скидка 5% применена!',
      promoOk5: 'Скидка €5 применена!',
      promoFail: 'Промокод не распознан.',
      promoExhausted: 'Промокод больше не действует — лимит исчерпан.',
      paypalHint: 'Завершите оплату через PayPal кнопку ниже.',
      otherHint: 'Выберите способ оплаты с помощью кнопки.',
      orPayWith: 'или оплатить картой',
    },
  },

  en: {
    brand: 'Luxury Paws',
    nav:   { home: 'Home', shop: 'Shop', bestSellers: 'Best Sellers', contact: 'Contact' },
    hero:  {
      eyebrow: 'Premium Dog Boutique',
      heading: 'Everything Your Dog Needs for a Happy Life',
      subtitle: 'Premium comfort, toys, and essentials designed for happier pets.',
      shopBtn: 'Shop Now', bestBtn: 'Best Sellers',
      note1: 'Warm Materials', note1Text: 'Curated for comfort and care.',
      note2: 'Trusted Quality', note2Text: 'Designed for lasting joy.',
    },
    shop:  { tag: 'Collection', heading: 'Elegant Essentials for Every Pet Parent',
             desc: 'Discover soft beds, premium toys and accessories crafted to feel luxurious and effortless.',
             explore: 'Explore' },
    bestSellers: { tag: 'Best Sellers', heading: 'Our Most Loved Items' },
    newArrivals: { tag: 'New Arrivals', heading: 'Fresh Pieces for Stylish Dogs' },
    promoBanner: '🔥 Free shipping on orders over €60 • Use code LUXURY20 for 5% off',
    toast: { added: 'Added to cart ✓' },
    stock: { low: 'Low stock' },
    trust: {
      tag: 'Why Choose Us', heading: 'A Boutique Experience You Can Rely On',
      item1: 'Authentic Craftsmanship', item1Text: 'Premium materials, elegant finishes and meticulous attention to detail.',
      item2: 'Secure Checkout', item2Text: 'PayPal protects every transaction with industry-leading security.',
      item3: 'White-Glove Support', item3Text: 'Personalised assistance and quick responses every step of the way.',
    },
    reviews: { tag: 'Reviews', heading: 'Loved by Pet Parents' },
    ambassador: {
      tag: 'Our Ambassador',
      heading: 'Star Client & Sponsor',
      desc: 'LakshmiLove kennel — our main partner and inspiration. Luxury, elegance and impeccable style in every pet.',
    },
    contact: {
      tag: 'Stay Connected', heading: 'Need Help Selecting the Perfect Item?',
      text: 'Leave your email to receive news and exclusive offers.',
      emailLabel: 'Email', emailPlaceholder: 'you@example.com',
      button: 'Subscribe', success: 'Thanks! We will reach out soon.',
    },
    footer: { copy: '© 2026 Luxury Paws. All rights reserved.',
              home: 'Home', shop: 'Shop', contact: 'Contact' },
    categories: {
      beds:        { name: 'Dog Beds', subtitle: 'Comfortable and stylish beds for your beloved pet', countLabel: 'bed types' },
      toys:        { name: 'Toys', subtitle: 'Fun and stimulating toys for active dogs', countLabel: 'toys' },
      accessories: { name: 'Accessories', subtitle: 'Harnesses, brushes, collars and other essentials', countLabel: 'accessories' },
    },
    filters: {
      size: 'Size', color: 'Color', price: 'Price',
      toyType: 'Type', age: 'Age', accType: 'Type',
      small: 'Small', medium: 'Medium', large: 'Large',
      beige: 'Beige', brown: 'Brown', gray: 'Gray',
      blue: 'Blue', orange: 'Orange', black: 'Black',
      red: 'Red', purple: 'Purple', green: 'Green',
      graphite: 'Graphite Black', lightBeige: 'Light Beige', grayBeige: 'Gray Beige',
      lightGray: 'Light Gray', cream: 'Cream', dustyPink: 'Dusty Pink',
      darkGray: 'Dark Gray', lavenderGray: 'Lavender Gray', lightPink: 'Light Pink',
      marbleGray: 'Marble Gray', chocolate: 'Chocolate', ivory: 'Ivory',
      hotPink: 'Hot Pink', darkTeal: 'Dark Teal', blueGray: 'Blue Gray',
      grayBlue: 'Gray Blue',
      chew: 'Chew Toys', interactive: 'Interactive', plush: 'Plush',
      puppy: 'Puppy', adult: 'Adult', senior: 'Senior',
      collar: 'Collar', leash: 'Leash', bowl: 'Bowl', other: 'Other',
      harness: 'Harness', brush: 'Brush', fleaCollar: 'Aroma Collar',
      apricot: 'Apricot', pink: 'Pink', yellow: 'Yellow',
      mint: 'Mint',
      noResults: 'No products match the selected filters.',
      clearAll: 'Clear All',
      itemCount: 'products',
    },
    product: {
      addToCart: 'Add to Cart', back: '← Back',
      shippingNote: 'Shipping from €4 · Free over €60', securePayment: 'Secure Payment', returns: '14-Day Returns',
      badge: { bestseller: 'Bestseller', new: 'New' },
    },
    cart: {
      label: 'Cart', tag: 'Your Cart',
      heading: 'Premium Checkout',
      subtitle: 'Easy order review and secure payment.',
      empty: 'Your cart is empty.',
      remove: 'Remove',
      subtotal: 'Subtotal', shipping: 'Shipping',
      shippingFree: 'Free',
      discount: 'Discount', total: 'Total',
    },
    checkout: {
      contactTitle: 'Contact Details',
      firstName: 'First Name', lastName: 'Last Name',
      email: 'Email', phone: 'Phone',
      country: 'Country',
      selectCountry: 'Select country',
      customCountry: 'Your country',
      addressTitle: 'Shipping Address',
      street: 'Street Address', city: 'City', state: 'State / Region', zip: 'ZIP Code',
      apartment: 'Apt (opt.)',
      paymentTitle: 'Payment Method',
      card: 'Card', paypal: 'PayPal', applePay: 'Apple Pay', googlePay: 'Google Pay',
      cardholder: 'Cardholder Name', cardNumber: 'Card Number',
      promo: 'Promo Code', promoApply: 'Apply',
      terms: 'I agree to terms and policy',
      submit: 'Place Order',
      note: 'Secure payment and confirmation email included.',
      thankYou: 'Thank you! Your order is confirmed.',
      error: 'Order failed. Please try again.',
      promoOk5p: '5% discount applied!',
      promoOk5: '€5 discount applied!',
      promoFail: 'Promo code not recognized.',
      promoExhausted: 'Promo code is no longer available — limit reached.',
      paypalHint: 'Complete payment using the PayPal button below.',
      otherHint: 'Select and confirm payment using the button.',
      orPayWith: 'or pay with card',
    },
  },

  sr: {
    brand: 'Luxury Paws',
    nav:   { home: 'Početna', shop: 'Prodavnica', bestSellers: 'Najprodavanije', contact: 'Kontakt' },
    hero:  {
      eyebrow: 'Premium butik za pse',
      heading: 'Sve što vašem psu treba za srećan život',
      subtitle: 'Premium udobnost, igračke i oprema za najdraže ljubimce.',
      shopBtn: 'U prodavnicu', bestBtn: 'Najprodavanije',
      note1: 'Topli materijali', note1Text: 'Odabrano za udobnost i negu.',
      note2: 'Provereni kvalitet', note2Text: 'Stvoreno za dugotrajnu radost.',
    },
    shop:  { tag: 'Kolekcija', heading: 'Elegantni proizvodi za brižne vlasnike',
             desc: 'Otkrijte meke ležaljke, premium igračke i opremu sa toplim karakterom.',
             explore: 'Pogledaj' },
    bestSellers: { tag: 'Najprodavanije', heading: 'Najomiljeniji proizvodi' },
    newArrivals: { tag: 'Noviteti', heading: 'Sveži proizvodi za stilske pse' },
    promoBanner: '🔥 Besplatna dostava za porudžbine preko €60 • Promo kod LUXURY20 = popust 5%',
    toast: { added: 'Dodato u korpu ✓' },
    stock: { low: 'Malo na stanju' },
    trust: {
      tag: 'Zašto mi', heading: 'Butik kome verujete',
      item1: 'Autentičan dizajn', item1Text: 'Premium materijali, elegantni detalji i pažljiva izrada.',
      item2: 'Bezbedno plaćanje', item2Text: 'PayPal štiti svaku transakciju.',
      item3: 'Personalni servis', item3Text: 'Individualna podrška i brzi odgovori na svakom koraku.',
    },
    reviews: { tag: 'Recenzije', heading: 'Vlasnici ljubimaca nas vole' },
    ambassador: {
      tag: 'Naš ambasador',
      heading: 'Zvezdani klijent & sponzor',
      desc: 'Odgajivačnica LakshmiLove — naš glavni partner i inspiracija. Luksuz, elegancija i besprekoran stil u svakom ljubimcu.',
    },
    contact: {
      tag: 'Kontakt', heading: 'Pomažemo vam da odaberete idealan proizvod',
      text: 'Ostavite email za novosti i ekskluzivne ponude.',
      emailLabel: 'Email', emailPlaceholder: 'vi@example.com',
      button: 'Pretplatite se', success: 'Hvala! Uskoro ćemo vas kontaktirati.',
    },
    footer: { copy: '© 2026 Luxury Paws. Sva prava zadržana.',
              home: 'Početna', shop: 'Prodavnica', contact: 'Kontakt' },
    categories: {
      beds:        { name: 'Ležaljke', subtitle: 'Udobne i stilske ležaljke za vašeg ljubimca', countLabel: 'vrsta ležaljki' },
      toys:        { name: 'Igračke', subtitle: 'Zabavne i razvojne igračke za aktivne pse', countLabel: 'igračaka' },
      accessories: { name: 'Oprema', subtitle: 'Povodci, četke, ogrlice i ostala oprema', countLabel: 'proizvoda opreme' },
    },
    filters: {
      size: 'Veličina', color: 'Boja', price: 'Cena',
      toyType: 'Tip', age: 'Uzrast', accType: 'Tip',
      small: 'Mali', medium: 'Srednji', large: 'Veliki',
      beige: 'Bež', brown: 'Braon', gray: 'Siv',
      blue: 'Plav', orange: 'Narandžast', black: 'Crn',
      red: 'Crven', purple: 'Ljubičast', green: 'Zelen',
      graphite: 'Crni grafit', lightBeige: 'Svetlo bež', grayBeige: 'Sivo bež',
      lightGray: 'Svetlo siv', cream: 'Krem', dustyPink: 'Puder roze',
      darkGray: 'Tamno siv', lavenderGray: 'Lavanda siv', lightPink: 'Svetlo roze',
      marbleGray: 'Mermerno siv', chocolate: 'Čokolada', ivory: 'Slonovača',
      hotPink: 'Jarko roze', darkTeal: 'Tamno tirkizna', blueGray: 'Plavkasto siv',
      grayBlue: 'Sivo plav',
      chew: 'Za žvakanje', interactive: 'Interaktivne', plush: 'Plišane',
      puppy: 'Štene', adult: 'Odrasli', senior: 'Stariji',
      collar: 'Ogrlica', leash: 'Povodac', bowl: 'Činija', other: 'Ostalo',
      harness: 'Povodac-prsluk', brush: 'Četka', fleaCollar: 'Aroma ogrlica',
      apricot: 'Kajsija', pink: 'Roze', yellow: 'Žut',
      mint: 'Mint',
      noResults: 'Nema proizvoda za izabrane filtere.',
      clearAll: 'Obriši',
      itemCount: 'proizvoda',
    },
    product: {
      addToCart: 'Dodaj u korpu', back: '← Nazad',
      shippingNote: 'Dostava od €4 · Besplatno od €60', securePayment: 'Bezbedno plaćanje', returns: 'Povrat 14 dana',
      badge: { bestseller: 'Hit', new: 'Novo' },
    },
    cart: {
      label: 'Korpa', tag: 'Vaša korpa',
      heading: 'Završi porudžbinu',
      subtitle: 'Provera i bezbedno plaćanje.',
      empty: 'Korpa je prazna.',
      remove: 'Ukloni',
      subtotal: 'Međuzbir', shipping: 'Dostava',
      shippingFree: 'Besplatno',
      discount: 'Popust', total: 'Ukupno',
    },
    checkout: {
      contactTitle: 'Kontakt podaci',
      firstName: 'Ime', lastName: 'Prezime',
      email: 'Email', phone: 'Telefon',
      country: 'Država',
      selectCountry: 'Izaberite državu',
      customCountry: 'Vaša država',
      addressTitle: 'Adresa za dostavu',
      street: 'Ulica', city: 'Grad', state: 'Region', zip: 'Poštanski broj',
      apartment: 'Stan (opc.)',
      paymentTitle: 'Način plaćanja',
      card: 'Kartica', paypal: 'PayPal', applePay: 'Apple Pay', googlePay: 'Google Pay',
      cardholder: 'Ime na kartici', cardNumber: 'Broj kartice',
      promo: 'Promo kod', promoApply: 'Primeni',
      terms: 'Slažem se sa uslovima i politikom',
      submit: 'Poruči',
      note: 'Bezbedno plaćanje i potvrda na email.',
      thankYou: 'Hvala! Vaša porudžbina je potvrđena.',
      error: 'Greška pri porudžbini. Pokušajte ponovo.',
      promoOk5p: 'Popust 5% primenjen!',
      promoOk5: 'Popust €5 primenjen!',
      promoFail: 'Promo kod nije prepoznat.',
      promoExhausted: 'Promo kod više ne važi — limit je dostignut.',
      paypalHint: 'Završite plaćanje putem PayPal dugmeta ispod.',
      otherHint: 'Izaberite način plaćanja pomoću dugmeta.',
      orPayWith: 'ili platite karticom',
    },
  },
};

/* ─────────────────────────────────────────────
   2. PRODUCT DATA  (ru/en for every text field)
   ───────────────────────────────────────────── */
const products = [
  // ── BEDS ──
  { id:'ortho-bed', category:'beds', section:'best-sellers',
    name:{ ru:'Ортопедическая лежанка', en:'Orthopaedic Dog Bed', sr:'Ortopedski ležaj za pse' },
    description:{ ru:'Анатомическая ортопедическая лежанка для здорового сна вашей собаки. Поддержка суставов и позвоночника.', en:'Anatomical orthopaedic bed for your dog\'s healthy sleep. Joint and spine support.', sr:'Anatomski ortopedski ležaj za zdrav san vašeg psa. Podrška zglobovima i kičmi.' },
    price:30, image:'images/1.png',
    rating:4.9, color:'blue', availableColors:['blue','orange','black'] },
  { id:'sofa-bed', category:'beds', section:'new-arrivals',
    name:{ ru:'Премиум лежанка-диван для собак', en:'Premium Sofa Bed for Dogs', sr:'Premium ležaj-sofa za pse' },
    description:{ ru:'Мягкий комфорт и поддержка для спокойного сна вашего питомца.', en:'Soft comfort and support for your pet\'s peaceful sleep.', sr:'Mekan komfor i podrška za miran san vašeg ljubimca.' },
    price:25, image:'images/2.jpg',
    rating:4.9, color:'red', availableColors:['red','purple','green'],
    dimensions:['40x30x12.5 CM','50x35x12.5 CM','65x45x14 CM','80x55x14 CM','100x65x16 CM'] },
  { id:'antistress-bed', category:'beds', section:'new-arrivals',
    name:{ ru:'Мягкая антистресс лежанка', en:'Anti-Stress Plush Bed', sr:'Antistres plišani ležaj' },
    description:{ ru:'Очень мягкий плюшевый материал, снимает стресс и успокаивает питомца. Подходит для кошек и собак. Легко стирается.', en:'Ultra-soft plush material, relieves stress and calms your pet. Suitable for cats and dogs. Machine washable.', sr:'Ultra mekan plišani materijal, smanjuje stres i smiruje ljubimca. Pogodan za mačke i pse. Može se prati u mašini.' },
    price:32, image:'images/4.png',
    rating:4.8, color:'graphite',
    availableColors:['graphite','lightBeige','grayBeige','lightGray','cream','dustyPink','darkGray','lavenderGray','lightPink','marbleGray','chocolate','ivory','hotPink','darkTeal','blueGray','grayBlue'],
    dimensions:['40 CM','50 CM','60 CM','70 CM','80 CM','90 CM'] },
  { id:'round-sofa-bed', category:'beds', section:'new-arrivals',
    name:{ ru:'Круглая плюшевая лежанка', en:'Round Plush Dog Sofa', sr:'Okrugli plišani ležaj za pse' },
    description:{ ru:'Мягкая круглая лежанка с ребристым плюшем. Подходит для собак и кошек, доступна в розовом, чёрном и коричневом цветах.', en:'Soft round ribbed plush bed for dogs and cats, available in pink, black and brown.', sr:'Meki okrugli plišani ležaj za pse i mačke, dostupan u roze, crnoj i braon boji.' },
    price:25, image:'images/25.webp', images:['images/25.webp','images/23.webp','images/24.webp'],
    rating:4.7, color:'pink', availableColors:['pink','black','brown'],
    dimensions:['50 CM','60 CM','70 CM','80 CM'] },
  // ── TOYS ──
  { id:'plush-duck', category:'toys', section:'best-sellers',
    name:{ ru:'Плюшевая уточка для собак', en:'Plush Duck Dog Toy', sr:'Plišana patka za pse' },
    description:{ ru:'Мягкая игрушка для активных игр и комфорта.', en:'Soft toy for active play and comfort.', sr:'Meka igračka za aktivnu igru i udobnost.' },
    price:20, image:'images/5.png', images:['images/5.png','images/6.png'],
    rating:4.8, toyType:'plush',
    availableSizes:['small','medium','large'] },
  { id:'bottle-toy', category:'toys', section:'new-arrivals',
    name:{ ru:'Интерактивная игрушка-бутылка', en:'Interactive Bottle Toy', sr:'Interaktivna igračka-flaša' },
    description:{ ru:'Забавная игрушка для жевания и развлечения.', en:'Fun chew and entertainment toy.', sr:'Zabavna igračka za žvakanje i zabavu.' },
    price:21, image:'images/7.png', images:['images/7.png','images/8.png'],
    rating:4.7, toyType:'interactive', color:'green',
    availableColors:['green','black','brown'] },
  { id:'rope-toy', category:'toys', section:'best-sellers',
    name:{ ru:'Канатная игрушка-антистресс', en:'Anti-Stress Rope Toy', sr:'Antistres igračka od užeta' },
    description:{ ru:'Прочная верёвка для игр, тренировки и ухода за зубами.', en:'Durable rope for play, training and dental care.', sr:'Izdražljivo uže za igru, trening i negu zuba.' },
    price:25, image:'images/10.png',
    rating:4.9, toyType:'chew' },
  // ── ACCESSORIES ──
  { id:'vest-harness', category:'accessories', section:'best-sellers',
    name:{ ru:'Мягкая жилет-шлейка с поводком', en:'Soft Vest Harness with Leash', sr:'Meki prsluk-povodac sa kašem' },
    description:{ ru:'Комфортная посадка и удобство для прогулок каждый день.', en:'Comfortable fit and convenience for everyday walks.', sr:'Udoban kroj i praktičnost za svakodnevne šetnje.' },
    price:30, image:'images/11.png', images:['images/11.png','images/12.png','images/13.png','images/14.png','images/15.png'],
    rating:4.9, accType:'harness', color:'apricot',
    availableColors:['apricot','blue','pink','yellow'],
    availableSizes:['small','medium','large'] },
  { id:'grooming-brush', category:'accessories', section:'new-arrivals',
    name:{ ru:'Премиум щётка для ухода за шерстью', en:'Premium Grooming Brush', sr:'Premium četka za negu dlake' },
    description:{ ru:'Бережно удаляет лишнюю шерсть, распутывает и делает уход комфортным. Подходит для собак и кошек всех пород.', en:'Gently removes excess fur, detangles and makes grooming comfortable. Suitable for all dog and cat breeds.', sr:'Nežno uklanja višak dlake, raspetljava i čini negu udobnom. Pogodno za sve rase pasa i mačaka.' },
    price:20, image:'images/17.png',
    rating:4.8, accType:'brush', color:'black',
    availableColors:['black','blue'] },
  { id:'aroma-collar', category:'accessories', section:'new-arrivals',
    name:{ ru:'Арома-ошейник от блох и клещей', en:'Aroma Flea & Tick Collar', sr:'Aroma ogrlica protiv buva i krpelja' },
    description:{ ru:'Натуральная защита и комфорт на каждый день. Подходит для собак и кошек, регулируемый размер.', en:'Natural protection and everyday comfort. Suitable for dogs and cats, adjustable size.', sr:'Prirodna zaštita i svakodnevna udobnost. Pogodno za pse i mačke, podesiva veličina.' },
    price:31, image:'images/18.png', images:['images/18.png','images/19.png','images/20.png'],
    rating:4.7, accType:'fleaCollar', color:'mint',
    availableColors:['mint','beige','pink'] },
];

const collections = [
  { id:'beds',
    title:{ ru:'Лежанки', en:'Dog Beds', sr:'Ležaljke' },
    description:{ ru:'Комфортные и стильные лежанки для вашего питомца.', en:'Comfortable and stylish beds for your beloved pet.', sr:'Udobne i stilske ležaljke za vašeg ljubimca.' },
    image:'images/4.png' },
  { id:'toys',
    title:{ ru:'Игрушки', en:'Toys', sr:'Igračke' },
    description:{ ru:'Забавные игрушки для активных игр и развития.', en:'Fun toys for active play and development.', sr:'Zabavne igračke za aktivnu igru i razvoj.' },
    image:'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80' },
  { id:'accessories',
    title:{ ru:'Аксессуары', en:'Accessories', sr:'Oprema' },
    description:{ ru:'Шлейки, щётки, ошейники и другие аксессуары.', en:'Harnesses, brushes, collars and other accessories.', sr:'Povodci, četke, ogrlice i ostala oprema.' },
    image:'images/11.png' },
];

const testimonials = [
  { text:{ ru:'Теперь прогулки стали особенно уютными — всё выглядит премиально и комфортно.', en:'Walks feel extra cozy now — everything looks premium and comfortable.', sr:'Šetnje su sada posebno udobne — sve izgleda premium i udobno.' },
    author:{ ru:'Ольга', en:'Olga', sr:'Olga' }, location:{ ru:'Москва', en:'Moscow', sr:'Moskva' }, rating:5 },
  { text:{ ru:'Сервис отличный, доставка быстрая, а вещи высокого уровня.', en:'Service is excellent, shipping is fast, and the products feel truly high-end.', sr:'Servis je odličan, dostava brza, a proizvodi zaista vrhunski.' },
    author:{ ru:'Иван', en:'Ivan', sr:'Ivan' }, location:{ ru:'Санкт-Петербург', en:'St. Petersburg', sr:'Sankt Peterburg' }, rating:5 },
  { text:{ ru:'Лучший подарок для нашего Макса! Качество на высшем уровне.', en:'Best gift for our Max! Quality is absolutely top-notch.', sr:'Najbolji poklon za našeg Maksa! Kvalitet je apsolutno vrhunski.' },
    author:{ ru:'Мария', en:'Maria', sr:'Marija' }, location:{ ru:'Берлин', en:'Berlin', sr:'Berlin' }, rating:5 },
];

/* ─────────────────────────────────────────────
   3. FILTER CONFIG  (drives filter rendering)
   ───────────────────────────────────────────── */
const filterConfig = {
  beds: [
    { key:'color', prop:'color', options:['blue','orange','black','red','purple','green','graphite'] },
    { key:'price', type:'price', ranges:['0-30','30-50','50-999'] },
  ],
  toys: [
    { key:'toyType', prop:'toyType', options:['chew','interactive','plush'] },
    { key:'price',   type:'price',   ranges:['0-25','25-50','50-999'] },
  ],
  accessories: [
    { key:'accType', prop:'accType', options:['harness','brush','fleaCollar'] },
    { key:'color', prop:'color', options:['apricot','blue','pink','yellow','black','mint','beige'] },
    { key:'price',   type:'price',   ranges:['0-25','25-35','35-999'] },
  ],
};

const categoryBanners = {
  beds:        'images/4.png',
  toys:        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1600&q=80',
  accessories: 'images/11.png',
};

/* ─────────────────────────────────────────────
   SHIPPING CONFIG
   Single source of truth for shipping rules.
   Easy to extend by weight, category, quantity.
   ───────────────────────────────────────────── */
const shippingConfig = {
  freeThreshold: 60,
  zones: [
    { id:'serbia', cost:4, countries:['RS'] },
    { id:'europe', cost:7, countries:[
      'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT',
      'LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','BA','ME','MK','AL','XK'
    ]},
  ],
  defaultCost: 10,
};

const shippingCountries = [
  { code:'RS', name:{ ru:'Сербия', en:'Serbia', sr:'Srbija' } },
  { code:'AT', name:{ ru:'Австрия', en:'Austria', sr:'Austrija' } },
  { code:'BE', name:{ ru:'Бельгия', en:'Belgium', sr:'Belgija' } },
  { code:'BG', name:{ ru:'Болгария', en:'Bulgaria', sr:'Bugarska' } },
  { code:'HR', name:{ ru:'Хорватия', en:'Croatia', sr:'Hrvatska' } },
  { code:'CY', name:{ ru:'Кипр', en:'Cyprus', sr:'Kipar' } },
  { code:'CZ', name:{ ru:'Чехия', en:'Czech Republic', sr:'Češka' } },
  { code:'DK', name:{ ru:'Дания', en:'Denmark', sr:'Danska' } },
  { code:'EE', name:{ ru:'Эстония', en:'Estonia', sr:'Estonija' } },
  { code:'FI', name:{ ru:'Финляндия', en:'Finland', sr:'Finska' } },
  { code:'FR', name:{ ru:'Франция', en:'France', sr:'Francuska' } },
  { code:'DE', name:{ ru:'Германия', en:'Germany', sr:'Nemačka' } },
  { code:'GR', name:{ ru:'Греция', en:'Greece', sr:'Grčka' } },
  { code:'HU', name:{ ru:'Венгрия', en:'Hungary', sr:'Mađarska' } },
  { code:'IE', name:{ ru:'Ирландия', en:'Ireland', sr:'Irska' } },
  { code:'IT', name:{ ru:'Италия', en:'Italy', sr:'Italija' } },
  { code:'LV', name:{ ru:'Латвия', en:'Latvia', sr:'Letonija' } },
  { code:'LT', name:{ ru:'Литва', en:'Lithuania', sr:'Litvanija' } },
  { code:'LU', name:{ ru:'Люксембург', en:'Luxembourg', sr:'Luksemburg' } },
  { code:'MT', name:{ ru:'Мальта', en:'Malta', sr:'Malta' } },
  { code:'NL', name:{ ru:'Нидерланды', en:'Netherlands', sr:'Holandija' } },
  { code:'PL', name:{ ru:'Польша', en:'Poland', sr:'Poljska' } },
  { code:'PT', name:{ ru:'Португалия', en:'Portugal', sr:'Portugalija' } },
  { code:'RO', name:{ ru:'Румыния', en:'Romania', sr:'Rumunija' } },
  { code:'SK', name:{ ru:'Словакия', en:'Slovakia', sr:'Slovačka' } },
  { code:'SI', name:{ ru:'Словения', en:'Slovenia', sr:'Slovenija' } },
  { code:'ES', name:{ ru:'Испания', en:'Spain', sr:'Španija' } },
  { code:'SE', name:{ ru:'Швеция', en:'Sweden', sr:'Švedska' } },
  { code:'BA', name:{ ru:'Босния и Герцеговина', en:'Bosnia and Herzegovina', sr:'Bosna i Hercegovina' } },
  { code:'ME', name:{ ru:'Черногория', en:'Montenegro', sr:'Crna Gora' } },
  { code:'MK', name:{ ru:'Северная Македония', en:'North Macedonia', sr:'Severna Makedonija' } },
  { code:'AL', name:{ ru:'Албания', en:'Albania', sr:'Albanija' } },
  { code:'XK', name:{ ru:'Косово', en:'Kosovo', sr:'Kosovo' } },
  { code:'GB', name:{ ru:'Великобритания', en:'United Kingdom', sr:'Velika Britanija' } },
  { code:'CH', name:{ ru:'Швейцария', en:'Switzerland', sr:'Švajcarska' } },
  { code:'NO', name:{ ru:'Норвегия', en:'Norway', sr:'Norveška' } },
  { code:'UA', name:{ ru:'Украина', en:'Ukraine', sr:'Ukrajina' } },
  { code:'TR', name:{ ru:'Турция', en:'Turkey', sr:'Turska' } },
  { code:'RU', name:{ ru:'Россия', en:'Russia', sr:'Rusija' } },
  { code:'US', name:{ ru:'США', en:'United States', sr:'SAD' } },
  { code:'CA', name:{ ru:'Канада', en:'Canada', sr:'Kanada' } },
  { code:'OTHER', name:{ ru:'Другая страна', en:'Other Country', sr:'Druga država' } },
];

function getShippingCost(countryCode, subtotal) {
  if (subtotal >= shippingConfig.freeThreshold) return 0;
  if (!countryCode) return shippingConfig.defaultCost;
  for (const zone of shippingConfig.zones) {
    if (zone.countries.includes(countryCode)) return zone.cost;
  }
  return shippingConfig.defaultCost;
}

let selectedCountry = '';

/* ─────────────────────────────────────────────
   4. STATE
   ───────────────────────────────────────────── */
let locale        = 'en';
let route         = 'home';
let prevCategory  = null;
const cart        = JSON.parse(localStorage.getItem('lp_cart') || '[]');
function saveCart() { localStorage.setItem('lp_cart', JSON.stringify(cart)); }
let promoDiscount = 0;
let promoType = 'fixed'; // 'fixed' or 'percent'

// Stores current filter selections per category (survives re-renders)
const filterState = { beds:{}, toys:{}, accessories:{} };

/* ─────────────────────────────────────────────
   4b. TOAST & PROMO BAR
   ───────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

function initPromoBar() {
  const bar = document.getElementById('promo-bar');
  const txt = document.getElementById('promo-bar-text');
  if (sessionStorage.getItem('promoBarClosed')) {
    bar.classList.add('hidden');
    return;
  }
  txt.textContent = t('promoBanner');
  document.getElementById('promo-bar-close').addEventListener('click', () => {
    bar.classList.add('hidden');
    sessionStorage.setItem('promoBarClosed', '1');
  });
}


/* ─────────────────────────────────────────────
   5. HELPERS
   ───────────────────────────────────────────── */
function t(path) {
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), i18n[locale]) || path;
}
function fmt(val) { return `€${val}`; }
function stars(r) { const f = Math.round(r); return '★'.repeat(f) + '☆'.repeat(5 - f); }

/* ─────────────────────────────────────────────
   6. LOADING
   ───────────────────────────────────────────── */
function showLoading() { document.getElementById('loading-overlay').classList.add('active'); }
function hideLoading()  { document.getElementById('loading-overlay').classList.remove('active'); }

/* ─────────────────────────────────────────────
   7. TRANSLATION ENGINE
   ───────────────────────────────────────────── */
function translateStatic() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t(el.dataset.i18n);
    if (v && v !== el.dataset.i18n) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const v = t(el.dataset.i18nPlaceholder);
    if (v) el.placeholder = v;
  });
  document.documentElement.lang = locale;
  const titles = { ru:'Luxury Paws — премиальные товары для собак', en:'Luxury Paws — Premium Dog Boutique', sr:'Luxury Paws — Premium butik za pse' };
  document.title = titles[locale] || titles.en;
}

function translatePage() {
  translateStatic();
  renderCollections();
  renderProductGrid('best-sellers', 'best-sellers-grid');
  renderProductGrid('new-arrivals', 'new-arrivals-grid');
  renderTestimonials();
  renderCartDrawer();
  populateCountrySelect();
  const promoText = document.getElementById('promo-bar-text');
  if (promoText) promoText.textContent = t('promoBanner');
  if (['beds','toys','accessories'].includes(route)) {
    renderFilters(route);
    renderCategoryGrid(route);
  }
  if (route.startsWith('product/')) {
    showProductDetail(route.split('/')[1]);
  }
}

/* ─────────────────────────────────────────────
   8. ROUTING
   ───────────────────────────────────────────── */
function navigateTo(r) {
  if (r === route) return;
  if (['beds','toys','accessories'].includes(route)) prevCategory = route;
  route = r;
  window.location.hash = r;
  renderRoute();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderRoute() {
  showLoading();
  const home = document.getElementById('home-sections');
  const pages = document.querySelectorAll('.page-view');
  const isHome = !['beds','toys','accessories'].includes(route) && !route.startsWith('product/');

  home.style.display = isHome ? '' : 'none';
  pages.forEach(p => p.style.display = 'none');

  if (route === 'beds' || route === 'toys' || route === 'accessories') {
    showCategoryPage(route);
  } else if (route.startsWith('product/')) {
    document.getElementById('product-page').style.display = '';
    showProductDetail(route.split('/')[1]);
  }

  if (isHome && route !== 'home') {
    setTimeout(() => {
      const el = document.getElementById(route);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  }

  updateNavHighlight();
  hideLoading();
  // Re-apply scroll reveal to new content
  setTimeout(() => { if (typeof initScrollReveal === 'function') initScrollReveal(); }, 100);
}

function updateNavHighlight() {
  document.querySelectorAll('.nav a').forEach(a => {
    a.classList.remove('active');
    const nav = a.dataset.nav;
    if (nav === route || (nav === 'home' && route === 'home')) a.classList.add('active');
  });
}

/* ─────────────────────────────────────────────
   9. CATEGORY PAGES
   ───────────────────────────────────────────── */
function showCategoryPage(cat) {
  const page = document.getElementById(`${cat}-page`);
  page.style.display = '';
  // Set banner image
  const banner = document.getElementById(`${cat}-banner`);
  banner.style.backgroundImage = `url('${categoryBanners[cat]}')`;
  renderFilters(cat);
  renderCategoryGrid(cat);
}

function renderFilters(cat) {
  const bar = document.getElementById(`${cat}-filters`);
  const conf = filterConfig[cat];
  const state = filterState[cat];

  bar.innerHTML = conf.map(f => {
    if (f.type === 'price') {
      const cur = state[f.key] || '';
      return `<select data-fkey="${f.key}">
        <option value="">${t('filters.price')}</option>
        ${f.ranges.map(r => {
          const [lo, hi] = r.split('-');
          const label = Number(hi) >= 999 ? `€${lo}+` : `€${lo} – €${hi}`;
          return `<option value="${r}" ${cur===r?'selected':''}>${label}</option>`;
        }).join('')}
      </select>`;
    }
    const cur = state[f.key] || '';
    return `<select data-fkey="${f.key}">
      <option value="">${t('filters.' + f.key)}</option>
      ${f.options.map(o =>
        `<option value="${o}" ${cur===o?'selected':''}>${t('filters.' + o)}</option>`
      ).join('')}
    </select>`;
  }).join('');

  // Result count placeholder
  bar.innerHTML += `<span class="filter-count" id="${cat}-count"></span>`;

  // Bind change events
  bar.querySelectorAll('select').forEach(sel => {
    sel.addEventListener('change', () => {
      filterState[cat][sel.dataset.fkey] = sel.value;
      renderCategoryGrid(cat);
    });
  });
}

function renderCategoryGrid(cat) {
  let filtered = products.filter(p => p.category === cat);
  const conf = filterConfig[cat];
  const state = filterState[cat];

  conf.forEach(f => {
    const val = state[f.key] || '';
    if (!val) return;
    if (f.type === 'price') {
      const [lo, hi] = val.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= lo && p.price <= hi);
    } else {
      filtered = filtered.filter(p => p[f.prop] === val);
    }
  });

  const grid = document.getElementById(`${cat}-grid`);
  const empty = document.getElementById(`${cat}-empty`);
  const counter = document.getElementById(`${cat}-count`);

  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty.style.display = '';
    if (counter) counter.textContent = '';
  } else {
    empty.style.display = 'none';
    grid.innerHTML = filtered.map(p => productCardHTML(p)).join('');
    bindCardEvents(grid);
    if (counter) counter.textContent = `${filtered.length} ${t('filters.itemCount')}`;
  }
}

function clearFilters(cat) {
  filterState[cat] = {};
  renderFilters(cat);
  renderCategoryGrid(cat);
}

/* ─────────────────────────────────────────────
   10. PRODUCT DETAIL
   ───────────────────────────────────────────── */
function showProductDetail(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const page = document.getElementById('product-page');
  page.style.display = '';

  // Image gallery / carousel
  const gallery = document.querySelector('.pd-gallery');
  if (p.images && p.images.length > 1) {
    let idx = 0;
    gallery.innerHTML = `<div class="pd-carousel">
      <button class="pd-arrow pd-prev">&#8249;</button>
      <img id="pd-img" src="${p.images[0]}" alt="${p.name[locale]}">
      <button class="pd-arrow pd-next">&#8250;</button>
      <div class="pd-dots">${p.images.map((_,i) => `<span class="pd-dot${i===0?' active':''}" data-i="${i}"></span>`).join('')}</div>
    </div>`;
    const img = gallery.querySelector('#pd-img');
    const dots = gallery.querySelectorAll('.pd-dot');
    const update = () => { img.src = p.images[idx]; dots.forEach((d,i) => d.classList.toggle('active', i===idx)); };
    gallery.querySelector('.pd-prev').onclick = () => { idx = (idx - 1 + p.images.length) % p.images.length; update(); };
    gallery.querySelector('.pd-next').onclick = () => { idx = (idx + 1) % p.images.length; update(); };
    dots.forEach(d => d.onclick = () => { idx = +d.dataset.i; update(); });
  } else {
    gallery.innerHTML = `<img id="pd-img" src="${p.image}" alt="${p.name[locale]}">`;
  }
  document.getElementById('pd-name').textContent = p.name[locale];
  document.getElementById('pd-desc').textContent = p.description[locale];
  document.getElementById('pd-rating').innerHTML =
    `<span class="stars">${stars(p.rating)}</span> <span class="num">${p.rating.toFixed(1)}</span>`;
  document.getElementById('pd-price').textContent = fmt(p.price);

  // Badges
  const badges = document.getElementById('pd-badges');
  let badgeHTML = '';
  if (p.section === 'best-sellers') badgeHTML = `<span class="badge-best">${t('product.badge.bestseller')}</span>`;
  else if (p.section === 'new-arrivals') badgeHTML = `<span class="badge-new">${t('product.badge.new')}</span>`;
  badges.innerHTML = badgeHTML;

  // Options
  const opts = document.getElementById('pd-options');
  let optHTML = '';
  if (p.size || p.availableSizes) {
    const sizes = p.availableSizes || ['small','medium','large'];
    optHTML += `<select>${sizes.map((s,i) =>
      `<option value="${s}" ${(p.size?s===p.size:i===0)?'selected':''}>${t('filters.'+s)}</option>`
    ).join('')}</select>`;
  }
  if (p.color) {
    const colors = p.availableColors || ['beige','brown','gray','blue','orange','black','red','purple','green'];
    optHTML += `<select>${colors.map(c =>
      `<option value="${c}" ${c===p.color?'selected':''}>${t('filters.'+c)}</option>`
    ).join('')}</select>`;
  }  if (p.dimensions) {
    optHTML += `<select>${p.dimensions.map((d,i) =>
      `<option value="${d}" ${i===0?'selected':''}>${d}</option>`
    ).join('')}</select>`;
  }  opts.innerHTML = optHTML;

  // Add to cart button
  const addBtn = document.getElementById('pd-add');
  addBtn.textContent = t('product.addToCart');
  addBtn.onclick = () => addToCart(p.id);

  // Stock urgency
  const viewersEl = document.getElementById('pd-viewers');
  viewersEl.innerHTML = `<span class="dot"></span> ${t('stock.low')}`;

  // Back button
  const backBtn = document.getElementById('product-back');
  backBtn.textContent = t('product.back');
  backBtn.onclick = () => navigateTo(prevCategory || 'home');
}

/* ─────────────────────────────────────────────
   11. HOME SECTION RENDERING
   ───────────────────────────────────────────── */
function productCardHTML(p) {
  let badge = '';
  if (p.section === 'best-sellers')  badge = `<span class="pcard-badge badge-best">${t('product.badge.bestseller')}</span>`;
  else if (p.section === 'new-arrivals') badge = `<span class="pcard-badge badge-new">${t('product.badge.new')}</span>`;
  return `<article class="pcard" data-id="${p.id}">
    <div class="pcard-media"><img src="${p.image}" alt="${p.name[locale]}" loading="lazy">${badge}</div>
    <div class="pcard-body">
      <div class="pcard-rating"><span class="stars">${stars(p.rating)}</span> <span class="num">${p.rating.toFixed(1)}</span></div>
      <h3>${p.name[locale]}</h3>
      <p>${p.description[locale]}</p>
    </div>
    <div class="pcard-foot">
      <span class="pcard-price">${fmt(p.price)}</span>
      <button class="pcard-btn" data-id="${p.id}">${t('product.addToCart')}</button>
    </div>
    ${p.section === 'best-sellers' ? `<div class="pcard-stock"><span class="dot"></span> ${t('stock.low')}</div>` : ''}
  </article>`;
}

function bindCardEvents(container) {
  container.querySelectorAll('.pcard').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.pcard-btn')) return;
      navigateTo('product/' + card.dataset.id);
    });
  });
  container.querySelectorAll('.pcard-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      addToCart(btn.dataset.id);
    });
  });
}

function renderCollections() {
  const grid = document.getElementById('col-grid');
  grid.innerHTML = collections.map(c => {
    const count = products.filter(p => p.category === c.id).length;
    return `<article class="col-card" data-cat="${c.id}">
      <img src="${c.image}" alt="${c.title[locale]}" loading="lazy">
      <div class="col-card-content">
        <span class="col-card-count">${count} ${t('categories.' + c.id + '.countLabel')}</span>
        <h3>${c.title[locale]}</h3>
        <p>${c.description[locale]}</p>
        <span class="col-card-cta">${t('shop.explore')} →</span>
      </div>
    </article>`;
  }).join('');
  grid.querySelectorAll('.col-card').forEach(card => {
    card.addEventListener('click', () => navigateTo(card.dataset.cat));
  });
}

function renderProductGrid(sectionKey, containerId) {
  const el = document.getElementById(containerId);
  const items = products.filter(p => p.section === sectionKey);
  el.innerHTML = items.map(p => productCardHTML(p)).join('');
  bindCardEvents(el);
}

function renderTestimonials() {
  const grid = document.getElementById('reviews-grid');
  grid.innerHTML = testimonials.map(r => `
    <article class="review-card">
      <div class="review-quote">&ldquo;</div>
      <div class="review-stars">${'★'.repeat(r.rating)}</div>
      <blockquote>${r.text[locale]}</blockquote>
      <div class="review-author">
        <strong>${r.author[locale]}</strong>
        <span>${r.location[locale]}</span>
      </div>
    </article>
  `).join('');
}

/* ─────────────────────────────────────────────
   12. CART
   ───────────────────────────────────────────── */
function updateCartCount() {
  const n = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cart-count').textContent = n;
}

function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ ...p, qty: 1 });
  saveCart();
  updateCartCount();
  renderCartDrawer();
  showToast(t('toast.added'));

  // Animate the clicked button
  const btns = document.querySelectorAll(`.pcard-btn[data-id="${id}"]`);
  btns.forEach(b => {
    b.classList.add('added');
    setTimeout(() => b.classList.remove('added'), 500);
  });
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCartDrawer();
  updateCartCount();
}

function removeItem(id) {
  const idx = cart.findIndex(i => i.id === id);
  if (idx >= 0) cart.splice(idx, 1);
  saveCart();
  renderCartDrawer();
  updateCartCount();
}

function totals() {
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const ship = sub > 0 ? getShippingCost(selectedCountry, sub) : 0;
  const disc = promoType === 'percent' ? Math.round(sub * promoDiscount / 100 * 100) / 100 : promoDiscount;
  return { sub, ship, disc, total: Math.max(0, sub + ship - disc) };
}

function renderCartDrawer() {
  const el = document.getElementById('drawer-items');
  const t_ = totals();

  if (cart.length === 0) {
    el.innerHTML = `<div class="cart-item" style="grid-template-columns:1fr"><p style="text-align:center;color:var(--text-soft)">${t('cart.empty')}</p></div>`;
  } else {
    el.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img class="cart-item-thumb" src="${item.image}" alt="${item.name[locale]}">
        <div class="cart-item-info">
          <h4>${item.name[locale]}</h4>
          <p class="cart-item-price">${fmt(item.price)} × ${item.qty}</p>
          <div class="cart-item-actions">
            <button type="button" onclick="changeQty('${item.id}',-1)">−</button>
            <span class="cart-item-qty">${item.qty}</span>
            <button type="button" onclick="changeQty('${item.id}',1)">+</button>
            <button type="button" class="cart-item-remove" onclick="removeItem('${item.id}')">${t('cart.remove')}</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('sum-sub').textContent = fmt(t_.sub);
  const shipEl = document.getElementById('sum-ship');
  shipEl.textContent = t_.ship === 0 && t_.sub >= shippingConfig.freeThreshold ? t('cart.shippingFree') : fmt(t_.ship);
  document.getElementById('sum-disc').textContent = fmt(t_.disc);
  document.getElementById('sum-total').textContent = fmt(t_.total);
  updatePaymentAmount();
}

function openDrawer() {
  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawer-overlay').classList.add('open');
  document.body.classList.add('no-scroll');
}

function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
  document.body.classList.remove('no-scroll');
}

/* ─────────────────────────────────────────────
   13. PAYMENTS (PayPal Business)
   ───────────────────────────────────────────── */

let paypalButtonsRendered = false;

async function initPayPalButtons() {
  // Wait for PayPal SDK to load (it's loaded with defer)
  if (!window.paypal) {
    let attempts = 0;
    await new Promise((resolve) => {
      const check = setInterval(() => {
        attempts++;
        if (window.paypal || attempts > 50) { clearInterval(check); resolve(); }
      }, 200);
    });
  }
  if (!window.paypal) { console.warn('PayPal SDK failed to load'); return; }
  if (paypalButtonsRendered) return;
  paypalButtonsRendered = true;
  console.log('PayPal SDK loaded, rendering buttons...');

  try {
  paypal.Buttons({
    style: {
      layout: 'vertical',
      color: 'gold',
      shape: 'rect',
      label: 'paypal',
      height: 50,
    },
    createOrder: async () => {
      // Validate form first
      const form = document.getElementById('checkout-form');
      if (!form.checkValidity()) { form.reportValidity(); throw new Error('Form invalid'); }
      if (!document.getElementById('inp-terms').checked) {
        showPaymentMessage(t('checkout.error'));
        throw new Error('Terms not accepted');
      }
      if (!cart.length) { showPaymentMessage(t('cart.empty')); throw new Error('Cart empty'); }
      const t_ = totals();
      if (t_.total <= 0) {
        showPaymentMessage(t('cart.empty'));
        throw new Error('Cart empty');
      }
      const r = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: t_.total, currency: 'EUR' }),
      });
      const data = await r.json();
      if (data.error) {
        showPaymentMessage(data.error);
        throw new Error(data.error);
      }
      return data.id;
    },
    onApprove: async (data) => {
      const r = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderID: data.orderID }),
      });
      const capture = await r.json();
      if (capture.status === 'COMPLETED') {
        await submitOrder('PayPal');
      } else {
        showPaymentMessage(t('checkout.error'));
      }
    },
    onError: (err) => {
      console.error('PayPal error:', err);
      showPaymentMessage(t('checkout.error'));
    },
  }).render('#paypal-button-container');
  } catch(e) { console.error('PayPal Buttons render failed:', e); }

  // Google Pay via PayPal (optional — only if SDK component loaded)
  try { initGooglePay(); } catch(e) { console.warn('Google Pay init skipped:', e); }
  // Apple Pay via PayPal (optional)
  try { initApplePay(); } catch(e) { console.warn('Apple Pay init skipped:', e); }
}

/* ─── Google Pay ─── */
async function initGooglePay() {
  if (!window.paypal || !paypal.Googlepay) return;
  try {
    const googlepay = paypal.Googlepay();
    const gpConfig = await googlepay.config();

    const gPayClient = new google.payments.api.PaymentsClient({
      environment: 'PRODUCTION',
    });

    const { result } = await gPayClient.isReadyToPay({
      apiVersion: 2, apiVersionMinor: 0,
      allowedPaymentMethods: gpConfig.allowedPaymentMethods,
    });
    if (!result) return;

    const btn = gPayClient.createButton({
      buttonColor: 'black',
      buttonType: 'pay',
      buttonSizeMode: 'fill',
      onClick: () => onGooglePayClick(gPayClient, googlepay, gpConfig),
    });
    document.getElementById('googlepay-container').appendChild(btn);
  } catch (e) { console.log('Google Pay not available:', e.message); }
}

async function onGooglePayClick(client, googlepay, gpConfig) {
  const form = document.getElementById('checkout-form');
  if (!form.checkValidity()) { form.reportValidity(); return; }
  if (!document.getElementById('inp-terms').checked) { showPaymentMessage(t('checkout.error')); return; }
  if (!cart.length) { showPaymentMessage(t('cart.empty')); return; }

  const t_ = totals();
  try {
    const paymentData = await client.loadPaymentData({
      apiVersion: 2, apiVersionMinor: 0,
      allowedPaymentMethods: gpConfig.allowedPaymentMethods,
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: t_.total.toFixed(2),
        currencyCode: 'EUR',
        countryCode: 'AT',
      },
      merchantInfo: gpConfig.merchantInfo,
    });

    const r = await fetch('/api/paypal/create-order', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: t_.total, currency: 'EUR' }),
    });
    const orderData = await r.json();

    const { status } = await googlepay.confirmOrder({
      orderId: orderData.id,
      paymentMethodData: paymentData.paymentMethodData,
    });

    if (status === 'APPROVED') {
      const capture = await fetch('/api/paypal/capture-order', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderID: orderData.id }),
      });
      const captureData = await capture.json();
      if (captureData.status === 'COMPLETED') {
        await submitOrder('Google Pay');
      } else { showPaymentMessage(t('checkout.error')); }
    }
  } catch (e) {
    console.error('Google Pay error:', e);
    if (e.statusCode !== 'CANCELED') showPaymentMessage(t('checkout.error'));
  }
}

/* ─── Apple Pay ─── */
async function initApplePay() {
  if (!window.paypal || !paypal.Applepay) return;
  if (!window.ApplePaySession || !ApplePaySession.canMakePayments()) return;
  try {
    const applepay = paypal.Applepay();
    const apConfig = await applepay.config();
    if (!apConfig.isEligible) return;

    const btn = document.createElement('apple-pay-button');
    btn.setAttribute('buttonstyle', 'black');
    btn.setAttribute('type', 'pay');
    btn.style.cssText = 'width:100%;height:50px;border-radius:8px;cursor:pointer;';
    btn.addEventListener('click', () => onApplePayClick(applepay, apConfig));
    document.getElementById('applepay-container').appendChild(btn);
  } catch (e) { console.log('Apple Pay not available:', e.message); }
}

async function onApplePayClick(applepay, apConfig) {
  const form = document.getElementById('checkout-form');
  if (!form.checkValidity()) { form.reportValidity(); return; }
  if (!document.getElementById('inp-terms').checked) { showPaymentMessage(t('checkout.error')); return; }
  if (!cart.length) { showPaymentMessage(t('cart.empty')); return; }

  const t_ = totals();
  try {
    const session = new ApplePaySession(4, {
      countryCode: apConfig.countryCode,
      currencyCode: 'EUR',
      merchantCapabilities: apConfig.merchantCapabilities,
      supportedNetworks: apConfig.supportedNetworks,
      requiredBillingContactFields: ['name', 'email'],
      total: { label: 'Luxury Paws', amount: t_.total.toFixed(2), type: 'final' },
    });

    session.onvalidatemerchant = (event) => {
      applepay.validateMerchant({ validationUrl: event.validationURL })
        .then(payload => session.completeMerchantValidation(payload.merchantSession))
        .catch(err => { console.error('Apple Pay merchant validation failed:', err); session.abort(); });
    };

    session.onpaymentauthorized = async (event) => {
      try {
        const r = await fetch('/api/paypal/create-order', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: t_.total, currency: 'EUR' }),
        });
        const orderData = await r.json();

        const { status } = await applepay.confirmOrder({
          orderId: orderData.id,
          token: event.payment.token,
          billingContact: event.payment.billingContact,
        });

        if (status === 'APPROVED') {
          session.completePayment(ApplePaySession.STATUS_SUCCESS);
          const capture = await fetch('/api/paypal/capture-order', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderID: orderData.id }),
          });
          const captureData = await capture.json();
          if (captureData.status === 'COMPLETED') {
            await submitOrder('Apple Pay');
          } else { showPaymentMessage(t('checkout.error')); }
        } else {
          session.completePayment(ApplePaySession.STATUS_FAILURE);
          showPaymentMessage(t('checkout.error'));
        }
      } catch (err) {
        session.completePayment(ApplePaySession.STATUS_FAILURE);
        showPaymentMessage(t('checkout.error'));
      }
    };

    session.begin();
  } catch (e) {
    console.error('Apple Pay error:', e);
    showPaymentMessage(t('checkout.error'));
  }
}

function updatePaymentAmount() {
  // PayPal amount is fetched fresh in createOrder, no update needed
}

/* ─────────────────────────────────────────────
   14. CHECKOUT
   ───────────────────────────────────────────── */
async function submitOrder(provider) {
  const order = buildOrder(provider);
  const r = await fetch('/api/send-order', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify(order),
  });
  const res = await r.json();
  if (res.success) {
    // Track promo usage on server
    if (appliedPromoCode) {
      fetch('/api/use-promo', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: appliedPromoCode }),
      }).catch(() => {});
    }
    const num = res.orderNumber || '';
    alert(`${t('checkout.thankYou')}${num ? '\nOrder #' + num : ''}`);
    cart.length = 0;
    promoDiscount = 0;
    promoType = 'fixed';
    appliedPromoCode = '';
    selectedCountry = '';
    saveCart();
    renderCartDrawer(); updateCartCount();
    document.getElementById('checkout-form').reset();
    closeDrawer();
  } else {
    alert(t('checkout.error'));
  }
}

function buildOrder(provider) {
  return {
    paymentProvider: provider,
    locale,
    totals: totals(),
    promoDiscount,
    items: cart.map(i => ({ id:i.id, name:i.name[locale], quantity:i.qty, unit_price:i.price })),
    customer: {
      firstName: document.getElementById('inp-fn').value,
      lastName:  document.getElementById('inp-ln').value,
      email:     document.getElementById('inp-em').value,
      phone:     document.getElementById('inp-ph').value,
      address: {
        country:   selectedCountry === 'OTHER'
          ? document.getElementById('inp-custom-country').value
          : selectedCountry,
        street:    document.getElementById('inp-st').value,
        city:      document.getElementById('inp-ci').value,
        state:     document.getElementById('inp-re').value,
        zip:       document.getElementById('inp-zi').value,
        apartment: document.getElementById('inp-apt').value,
      },
    },
  };
}

function populateCountrySelect() {
  const sel = document.getElementById('inp-country');
  const placeholder = sel.querySelector('option[value=""]');
  if (placeholder) placeholder.textContent = t('checkout.selectCountry');
  // Remove old options except placeholder
  while (sel.options.length > 1) sel.remove(1);
  shippingCountries.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.textContent = c.name[locale];
    if (c.code === selectedCountry) opt.selected = true;
    sel.appendChild(opt);
  });
}

async function handleCheckout(e) {
  e.preventDefault();
  if (!cart.length) { alert(t('cart.empty')); return; }
  if (!e.target.checkValidity()) { e.target.reportValidity(); return; }
  // Payment is handled by PayPal buttons — just validate the form
  showPaymentMessage(t('checkout.paypalHint'));
}

function showPaymentMessage(msg) {
  const el = document.getElementById('payment-message');
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 6000);
}

let appliedPromoCode = '';

async function applyPromo() {
  const code = document.getElementById('inp-promo').value.trim().toUpperCase();
  if (!code) return;
  try {
    const r = await fetch('/api/validate-promo', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await r.json();
    if (!data.valid) {
      promoDiscount = 0; promoType = 'fixed'; appliedPromoCode = '';
      alert(data.exhausted ? (t('checkout.promoExhausted') || 'Promo code used up!') : t('checkout.promoFail'));
    } else {
      promoDiscount = data.discount;
      promoType = data.type;
      appliedPromoCode = code;
      if (data.type === 'percent') alert(t('checkout.promoOk5p'));
      else alert(t('checkout.promoOk5'));
    }
  } catch {
    promoDiscount = 0; promoType = 'fixed'; appliedPromoCode = '';
    alert(t('checkout.promoFail'));
  }
  renderCartDrawer();
}

/* ─────────────────────────────────────────────
   15. EVENT BINDING
   ───────────────────────────────────────────── */
function bindEvents() {
  // Cart drawer
  document.getElementById('cart-toggle').addEventListener('click', openDrawer);
  document.getElementById('drawer-close').addEventListener('click', closeDrawer);
  document.getElementById('drawer-overlay').addEventListener('click', closeDrawer);
  document.getElementById('promo-btn').addEventListener('click', applyPromo);
  document.getElementById('checkout-form').addEventListener('submit', handleCheckout);

  // Country selector — recalc shipping on change
  document.getElementById('inp-country').addEventListener('change', e => {
    selectedCountry = e.target.value;
    const wrap = document.getElementById('custom-country-wrap');
    const inp = document.getElementById('inp-custom-country');
    if (selectedCountry === 'OTHER') {
      wrap.style.display = '';
      inp.required = true;
      inp.focus();
    } else {
      wrap.style.display = 'none';
      inp.required = false;
      inp.value = '';
    }
    renderCartDrawer();
  });

  // Populate country dropdown
  populateCountrySelect();

  // Contact form
  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    alert(t('contact.success'));
    e.target.reset();
  });

  // Navigation links
  document.querySelectorAll('.nav a, .hero-cta a, .footer-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(link.getAttribute('href').replace('#',''));
    });
  });

  // Logo
  document.getElementById('logo').addEventListener('click', e => {
    e.preventDefault();
    navigateTo('home');
  });

  // Category back buttons
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => navigateTo('home'));
  });

  // Clear filter buttons
  document.querySelectorAll('[data-clear]').forEach(btn => {
    btn.addEventListener('click', () => clearFilters(btn.dataset.clear));
  });

  // Language
  document.getElementById('lang-en').addEventListener('click', () => setLocale('en'));
  document.getElementById('lang-ru').addEventListener('click', () => setLocale('ru'));
  document.getElementById('lang-sr').addEventListener('click', () => setLocale('sr'));
  // Mobile language buttons
  document.getElementById('mob-lang-en').addEventListener('click', () => { setLocale('en'); document.getElementById('site-nav').classList.remove('open'); });
  document.getElementById('mob-lang-ru').addEventListener('click', () => { setLocale('ru'); document.getElementById('site-nav').classList.remove('open'); });
  document.getElementById('mob-lang-sr').addEventListener('click', () => { setLocale('sr'); document.getElementById('site-nav').classList.remove('open'); });

  // Mobile menu
  document.getElementById('burger').addEventListener('click', () => {
    document.getElementById('site-nav').classList.toggle('open');
  });
  // Close mobile menu on nav click
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('site-nav').classList.remove('open');
    });
  });

  // Hash change
  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#','') || 'home';
    if (h !== route) { route = h; renderRoute(); }
  });

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    document.getElementById('site-header').classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

function setLocale(l) {
  locale = l;
  document.getElementById('lang-en').classList.toggle('active', l === 'en');
  document.getElementById('lang-ru').classList.toggle('active', l === 'ru');
  document.getElementById('lang-sr').classList.toggle('active', l === 'sr');
  document.getElementById('mob-lang-en').classList.toggle('active', l === 'en');
  document.getElementById('mob-lang-ru').classList.toggle('active', l === 'ru');
  document.getElementById('mob-lang-sr').classList.toggle('active', l === 'sr');
  translatePage();
}

/* ─────────────────────────────────────────────
   16. INIT
   ───────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', async () => {
  route = window.location.hash.replace('#','') || 'home';
  document.getElementById('lang-en').classList.add('active');
  document.getElementById('mob-lang-en').classList.add('active');
  bindEvents();
  translatePage();
  updateCartCount();
  renderRoute();
  initPromoBar();
  await initPayPalButtons();
  initCreativeEffects();
});

/* ─────────────────────────────────────────────
   17. CREATIVE EFFECTS ENGINE
   ───────────────────────────────────────────── */
function initCreativeEffects() {
  initScrollReveal();
  initHeroParticles();
  initAmbientParticles();
  initGradientText();
  initCardTilt();
  initCursorGlow();
  initCartPulse();
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold:0.12, rootMargin:'0px 0px -40px 0px' });

  // Auto-tag sections
  document.querySelectorAll('.section-head').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
  document.querySelectorAll('.col-card').forEach((el,i) => {
    el.classList.add('reveal-scale');
    el.style.setProperty('--i', i);
    el.classList.add('stagger-children');
    observer.observe(el);
  });
  document.querySelectorAll('.trust-card').forEach((el,i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.15}s`;
    observer.observe(el);
  });
  document.querySelectorAll('.review-card').forEach((el,i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.12}s`;
    observer.observe(el);
  });
  document.querySelectorAll('.pcard').forEach((el,i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
  });
  const contactCard = document.querySelector('.contact-card');
  if (contactCard) { contactCard.classList.add('reveal-scale'); observer.observe(contactCard); }
}

// Re-observe after route changes
const origRenderRoute = typeof renderRoute === 'function' ? renderRoute : null;

/* ── Hero Gold Particles ── */
function initHeroParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  let container = hero.querySelector('.hero-particles');
  if (!container) {
    container = document.createElement('div');
    container.className = 'hero-particles';
    hero.querySelector('.hero-bg').after(container);
  }
  for (let i = 0; i < 55; i++) {
    const p = document.createElement('div');
    p.className = 'gold-particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.setProperty('--dur', `${5+Math.random()*10}s`);
    p.style.setProperty('--delay', `${Math.random()*8}s`);
    p.style.width = p.style.height = `${2+Math.random()*5}px`;
    container.appendChild(p);
  }
}

/* ── Gradient Text on Headings ── */
function initGradientText() {
  const heroH1 = document.querySelector('.hero-text h1');
  if (heroH1) heroH1.classList.add('gradient-text');
}

/* ── Ambient Particles (full page) ── */
function initAmbientParticles() {
  if (window.matchMedia('(max-width:768px)').matches) return;
  if (document.querySelector('.ambient-particles')) return;

  const container = document.createElement('div');
  container.className = 'ambient-particles';
  document.body.appendChild(container);

  const W = () => window.innerWidth;
  const H = () => window.innerHeight;
  const count = 30;
  const particles = [];

  const colors = [
    { bg: 'rgba(212,169,76,0.6)', glow: 'rgba(212,169,76,0.12)' },   // gold
    { bg: 'rgba(176,140,96,0.45)', glow: 'rgba(176,140,96,0.08)' },   // warm
    { bg: 'rgba(255,248,230,0.65)', glow: 'rgba(255,248,230,0.1)' },  // light
  ];

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'ambient-dot';
    container.appendChild(dot);

    const col = colors[i % 3];
    const size = 4 + Math.random() * 8;
    dot.style.width = dot.style.height = size + 'px';
    dot.style.background = `radial-gradient(circle, ${col.bg} 0%, ${col.glow} 60%, transparent 70%)`;

    particles.push({
      el: dot,
      x: Math.random() * W(),
      y: Math.random() * H(),
      baseVx: (Math.random() - 0.5) * 0.3,
      baseVy: -(0.15 + Math.random() * 0.35),
      phase: Math.random() * Math.PI * 2,
      waveAmp: 15 + Math.random() * 25,
      waveSpeed: 0.3 + Math.random() * 0.5,
      size,
      opacity: 0,
      fadeIn: true,
      maxOpacity: 0.4 + Math.random() * 0.3,
    });
  }

  let lastScroll = window.scrollY;
  let scrollDelta = 0;

  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    scrollDelta += (curr - lastScroll) * 0.12;
    lastScroll = curr;
  }, { passive: true });

  let running = true;
  let lastTime = performance.now();

  function tick(now) {
    if (!running) return;
    const dt = Math.min((now - lastTime) / 16.67, 3);
    lastTime = now;

    const w = W();
    const h = H();

    scrollDelta *= 0.92;

    for (const p of particles) {
      p.phase += p.waveSpeed * 0.016 * dt;

      p.x += (p.baseVx + Math.sin(p.phase) * 0.4) * dt;
      p.y += (p.baseVy - scrollDelta) * dt;

      if (p.fadeIn) {
        p.opacity = Math.min(p.opacity + 0.008 * dt, p.maxOpacity);
        if (p.opacity >= p.maxOpacity) p.fadeIn = false;
      }

      if (p.y < -30) {
        p.y = h + 20;
        p.x = Math.random() * w;
        p.opacity = 0;
        p.fadeIn = true;
      }
      if (p.y > h + 30) {
        p.y = -20;
        p.x = Math.random() * w;
        p.opacity = 0;
        p.fadeIn = true;
      }
      if (p.x < -30) p.x = w + 20;
      if (p.x > w + 30) p.x = -20;

      p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
      p.el.style.opacity = p.opacity;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
    } else {
      running = true;
      lastTime = performance.now();
      lastScroll = window.scrollY;
      scrollDelta = 0;
      requestAnimationFrame(tick);
    }
  });
}

/* ── 3D Tilt on Product Cards (disabled) ── */
function initCardTilt() {
  // Removed — caused shake effect on scroll
}

/* ── Cursor Glow ── */
function initCursorGlow() {
  if (window.matchMedia('(max-width:768px)').matches) return;
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  let mx = -500, my = -500;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    glow.style.transform = `translate(${mx - 150}px, ${my - 150}px)`;
  }, { passive:true });
}

/* ── Cart Count Pulse ── */
function initCartPulse() {
  const origAddToCart = window.addToCart || addToCart;
  const countEl = document.getElementById('cart-count');
  if (!countEl) return;
  const mo = new MutationObserver(() => {
    countEl.classList.remove('pulse');
    void countEl.offsetWidth; // trigger reflow
    countEl.classList.add('pulse');
  });
  mo.observe(countEl, { childList:true, characterData:true, subtree:true });
}
