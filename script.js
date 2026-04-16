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
              home: 'Главная', shop: 'Магазин', contact: 'Контакты', terms: 'Условия', privacy: 'Конфиденциальность' },
    categories: {
      beds:        { name: 'Лежанки', subtitle: 'Комфортные и стильные лежанки для вашего питомца', countLabel: 'видов лежанок' },
      toys:        { name: 'Игрушки', subtitle: 'Забавные и развивающие игрушки для активных собак', countLabel: 'игрушек' },
      accessories: { name: 'Аксессуары', subtitle: 'Шлейки, щётки, ошейники и другие аксессуары', countLabel: 'аксессуаров' },
      cosmetics:   { name: 'Косметика', subtitle: 'Профессиональная косметика Special One для ухода за шерстью', countLabel: 'средств' },
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
      mint: 'Мятный', roseRed: 'Розово-красный', white: 'Белый',
      cosType: 'Тип', shampoo: 'Шампунь', mask: 'Маска', conditioner: 'Кондиционер', oil: 'Масло', integrator: 'Интегратор',
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
      terms: 'Я соглашаюсь с <a href="/terms.html" target="_blank">условиями</a> и <a href="/privacy.html" target="_blank">политикой конфиденциальности</a>',
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
              home: 'Home', shop: 'Shop', contact: 'Contact', terms: 'Terms', privacy: 'Privacy' },
    categories: {
      beds:        { name: 'Dog Beds', subtitle: 'Comfortable and stylish beds for your beloved pet', countLabel: 'bed types' },
      toys:        { name: 'Toys', subtitle: 'Fun and stimulating toys for active dogs', countLabel: 'toys' },
      accessories: { name: 'Accessories', subtitle: 'Harnesses, brushes, collars and other essentials', countLabel: 'accessories' },
      cosmetics:   { name: 'Cosmetics', subtitle: 'Professional Special One grooming cosmetics for dogs', countLabel: 'products' },
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
      mint: 'Mint', roseRed: 'Rose Red', white: 'White',
      cosType: 'Type', shampoo: 'Shampoo', mask: 'Mask', conditioner: 'Conditioner', oil: 'Oil', integrator: 'Integrator',
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
      terms: 'I agree to the <a href="/terms.html" target="_blank">Terms of Service</a> and <a href="/privacy.html" target="_blank">Privacy Policy</a>',
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
              home: 'Početna', shop: 'Prodavnica', contact: 'Kontakt', terms: 'Uslovi', privacy: 'Privatnost' },
    categories: {
      beds:        { name: 'Ležaljke', subtitle: 'Udobne i stilske ležaljke za vašeg ljubimca', countLabel: 'vrsta ležaljki' },
      toys:        { name: 'Igračke', subtitle: 'Zabavne i razvojne igračke za aktivne pse', countLabel: 'igračaka' },
      accessories: { name: 'Oprema', subtitle: 'Povodci, četke, ogrlice i ostala oprema', countLabel: 'proizvoda opreme' },
      cosmetics:   { name: 'Kozmetika', subtitle: 'Profesionalna Special One kozmetika za negu dlake', countLabel: 'proizvoda' },
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
      mint: 'Mente', roseRed: 'Roze crvena', white: 'Bela',
      cosType: 'Tip', shampoo: 'Šampon', mask: 'Maska', conditioner: 'Kondicioner', oil: 'Ulje', integrator: 'Integrator',
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
      terms: 'Slažem se sa <a href="/terms.html" target="_blank">uslovima korišćenja</a> i <a href="/privacy.html" target="_blank">politikom privatnosti</a>',
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
  { id:'antistress-bed', category:'beds', section:'',
    name:{ ru:'Мягкая антистресс лежанка', en:'Anti-Stress Plush Bed', sr:'Antistres plišani ležaj' },
    description:{ ru:'Очень мягкий плюшевый материал, снимает стресс и успокаивает питомца. Подходит для кошек и собак. Легко стирается.', en:'Ultra-soft plush material, relieves stress and calms your pet. Suitable for cats and dogs. Machine washable.', sr:'Ultra mekan plišani materijal, smanjuje stres i smiruje ljubimca. Pogodan za mačke i pse. Može se prati u mašini.' },
    price:32, image:'images/4.png',
    rating:4.8, color:'graphite',
    availableColors:['graphite','lightBeige','grayBeige','lightGray','cream','dustyPink','darkGray','lavenderGray','lightPink','marbleGray','chocolate','ivory','hotPink','darkTeal','blueGray','grayBlue'],
    dimensions:['40 CM','50 CM','60 CM','70 CM','80 CM','90 CM'] },
  { id:'round-sofa-bed', category:'beds', section:'',
    name:{ ru:'Круглая плюшевая лежанка', en:'Round Plush Dog Sofa', sr:'Okrugli plišani ležaj za pse' },
    description:{ ru:'Мягкая круглая лежанка с ребристым плюшем. Подходит для собак и кошек, доступна в розовом, чёрном и коричневом цветах.', en:'Soft round ribbed plush bed for dogs and cats, available in pink, black and brown.', sr:'Meki okrugli plišani ležaj za pse i mačke, dostupan u roze, crnoj i braon boji.' },
    price:25, image:'images/25.webp', images:['images/25.webp','images/23.webp','images/24.webp'],
    rating:4.7, color:'pink', availableColors:['pink','black','brown'],
    dimensions:['50 CM','60 CM','70 CM','80 CM'] },
  // ── TOYS ──
  { id:'plush-duck', category:'toys', section:'',
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
  { id:'squeaker-joint-toy', category:'toys', section:'',
    name:{ ru:'Плюшевая пищалка-косточка', en:'Plush Squeaker Joint Toy', sr:'Plišana pištaljka-kost za pse' },
    description:{ ru:'Мягкая плюшевая игрушка для жевания с пищалкой. Устойчива к укусам, подходит для щенков и взрослых собак.', en:'Soft plush chew toy with squeaker. Bite-resistant, suitable for puppies and adult dogs.', sr:'Meka plišana igračka za žvakanje sa pištaljkom. Otporna na ugrize, pogodna za štence i odrasle pse.' },
    price:11, image:'images/31.webp', images:['images/31.webp','images/32.webp','images/33.webp','images/34.webp'],
    rating:4.8, toyType:'interactive', color:'green',
    availableColors:['green','red','yellow'] },
  { id:'octopus-rope-toy', category:'toys', section:'',
    name:{ ru:'Канатный осьминог-пищалка', en:'Rope Octopus Squeaky Toy', sr:'Pištaljka hobotnica od užeta' },
    description:{ ru:'Прочная игрушка-осьминог из каната с пищалкой. Чистит зубы, развивает активность. Для собак и кошек.', en:'Durable rope octopus toy with squeaker. Cleans teeth, promotes activity. For dogs and cats.', sr:'Izdržljiva igračka hobotnica od užeta sa pištaljkom. Čisti zube, podstiče aktivnost. Za pse i mačke.' },
    price:10, image:'images/35.webp', images:['images/35.webp','images/36.webp','images/37.webp','images/38.webp'],
    rating:4.9, toyType:'chew', color:'pink' },
  // ── ACCESSORIES ──
  { id:'vest-harness', category:'accessories', section:'',
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
  { id:'aroma-collar', category:'accessories', section:'',
    name:{ ru:'Арома-ошейник от блох и клещей', en:'Aroma Flea & Tick Collar', sr:'Aroma ogrlica protiv buva i krpelja' },
    description:{ ru:'Натуральная защита и комфорт на каждый день. Подходит для собак и кошек, регулируемый размер.', en:'Natural protection and everyday comfort. Suitable for dogs and cats, adjustable size.', sr:'Prirodna zaštita i svakodnevna udobnost. Pogodno za pse i mačke, podesiva veličina.' },
    price:31, image:'images/18.png', images:['images/18.png','images/19.png','images/20.png'],
    rating:4.7, accType:'fleaCollar', color:'mint',
    availableColors:['mint','beige','pink'] },
  { id:'retractable-leash', category:'accessories', section:'',
    name:{ ru:'Автоматический поводок-рулетка', en:'Retractable Dog Leash', sr:'Automatski povodac-ruleta za pse' },
    description:{ ru:'Прочный автоматический поводок-рулетка 5M/8M для собак до 50 кг. Подходит для крупных и мелких пород. Удобная кнопка фиксации.', en:'Strong automatic retractable leash 5M/8M for dogs up to 50kg. Suitable for large and small breeds. Convenient lock button.', sr:'Jak automatski povodac-ruleta 5M/8M za pse do 50kg. Pogodan za velike i male rase. Praktično dugme za zaključavanje.' },
    price:15, image:'images/26.webp', images:['images/26.webp','images/29.webp','images/30.webp'],
    rating:4.7, accType:'leash', color:'roseRed',
    availableColors:['roseRed','blue','gray'],
    availableSizes:['5M-50kg','8M-50kg'] },
  { id:'elevated-feeder', category:'accessories', section:'best-sellers',
    name:{ ru:'Подставка с двойной миской', en:'Elevated Dual Bowl Feeder', sr:'Postolje sa duplom činijom' },
    description:{ ru:'Яркая подставка с двумя мисками из нержавеющей стали. Поддержка шеи, легко моется. Для собак и кошек.', en:'Colorful elevated stand with dual stainless steel bowls. Neck support, easy to clean. For dogs and cats.', sr:'Jarko postolje sa duplim činijama od nerđajućeg čelika. Podrška za vrat, lako se čisti. Za pse i mačke.' },
    price:30, image:'images/40.webp', images:['images/40.webp','images/41.webp','images/42.webp','images/43.webp','images/44.webp'],
    rating:4.9, accType:'bowl', color:'white',
    availableColors:['white','pink','green','yellow'] },
  // ── COSMETICS (Special One) ──
  { id:'aquarosa-pro', category:'cosmetics', section:'',
    name:{ ru:'Aquarosa Pro — шампунь для обезвоженной шерсти', en:'Aquarosa Pro — Shampoo for Dehydrated Coats', sr:'Aquarosa Pro — šampon za dehidriranu dlaku' },
    description:{ ru:'Профессиональный ультра-концентрированный шампунь с витаминами. Восстанавливает увлажнение и блеск шерсти.', en:'Professional ultra-concentrated shampoo with vitamins. Restores hydration and coat brilliance.', sr:'Profesionalni ultra-koncentrovani šampon sa vitaminima. Vraća hidrataciju i sjaj dlake.' },
    price:30, image:'images/45.png', images:['images/45.png','images/46.png','images/47.jpg'],
    rating:4.9, cosType:'shampoo', variants:[{name:'250 mL',price:30},{name:'5 Litres',price:191},{name:'10 Litres',price:328}] },
  { id:'hydrating-cream', category:'cosmetics', section:'best-sellers',
    name:{ ru:'Hydrating Cream — увлажняющая маска', en:'Hydrating Cream — Hydrating Mask', sr:'Hydrating Cream — hidratantna maska' },
    description:{ ru:'Бестселлер Special One. Финальная маска для глубокого увлажнения, блеска и гладкости шерсти.', en:'Special One bestseller. Final mask for deep hydration, shine and coat smoothness.', sr:'Special One bestseler. Završna maska za duboku hidrataciju, sjaj i glatkoću dlake.' },
    price:70, image:'images/48.png', images:['images/48.png','images/49.png','images/50.jpg'],
    rating:4.9, cosType:'mask', variants:[{name:'500 mL',price:70},{name:'1 Litre',price:109},{name:'3 Litres',price:273}] },
  { id:'mix-pink', category:'cosmetics', section:'new-arrivals',
    name:{ ru:'Mix Pink — двухфазный кондиционер-спрей', en:'Mix Pink — Bi-Phase Conditioner Spray', sr:'Mix Pink — dvofazni kondicionersprej' },
    description:{ ru:'Антистатический двухфазный кондиционер. Мгновенно распутывает, придаёт блеск и защищает шерсть.', en:'Anti-static bi-phase conditioner. Instantly detangles, adds shine and protects the coat.', sr:'Antistatički dvofazni kondicioner. Trenutno raspetljava, dodaje sjaj i štiti dlaku.' },
    price:61, image:'images/51.png', images:['images/51.png','images/52.jpg'],
    rating:4.8, cosType:'conditioner', variants:[{name:'200 mL',price:61},{name:'1 Litre',price:148},{name:'3 Litres',price:416}] },
  { id:'bio-energy-plus', category:'cosmetics', section:'',
    name:{ ru:'Bio Energy Plus — маска пре-бат с зелёной икрой', en:'Bio Energy Plus — Pre-Bath Mask with Green Caviar', sr:'Bio Energy Plus — maska pre kupanja sa zelenim kavijarom' },
    description:{ ru:'Маска для подготовки шерсти перед купанием. Зелёная икра питает и восстанавливает повреждённую шерсть.', en:'Pre-bath preparation mask. Green caviar nourishes and repairs damaged coats.', sr:'Maska za pripremu dlake pre kupanja. Zeleni kavijar hrani i obnavlja oštećenu dlaku.' },
    price:36, image:'images/53.png', images:['images/53.png','images/54.png','images/55.jpg'],
    rating:4.8, cosType:'mask', variants:[{name:'250 mL',price:36},{name:'1 Litre',price:69},{name:'5 Litres',price:214},{name:'10 Litres',price:375}] },
  { id:'bain-pro', category:'cosmetics', section:'',
    name:{ ru:'Bain Pro — мягкий шампунь для всех типов шерсти', en:'Bain Pro — Gentle Shampoo for All Coat Types', sr:'Bain Pro — nežni šampon za sve tipove dlake' },
    description:{ ru:'Нежнейший профессиональный шампунь. Подходит для всех пород, возрастов и типов шерсти. Натуральная антипаразитарная защита.', en:'The gentlest professional shampoo. Suitable for all breeds, ages and coat types. Natural anti-parasitic protection.', sr:'Najnežniji profesionalni šampon. Pogodan za sve rase, uzraste i tipove dlake. Prirodna antiparazitska zaštita.' },
    price:33, image:'images/56.png', images:['images/56.png','images/57.png','images/58.jpg'],
    rating:4.9, cosType:'shampoo', variants:[{name:'250 mL',price:33},{name:'1 L',price:63},{name:'5 Litres',price:163}] },
  { id:'aqua-dolce', category:'cosmetics', section:'',
    name:{ ru:'Aqua Dolce — восстанавливающая маска после шампуня', en:'Aqua Dolce — Revitalizing After-Shampoo Mask', sr:'Aqua Dolce — revitalizujuća maska posle šampona' },
    description:{ ru:'Маска-кондиционер для восстановления и смягчения шерсти. Убирает пушистость, лечит секущиеся кончики.', en:'Revitalizing conditioner mask for softening and restoring coats. Eliminates frizz, treats split ends.', sr:'Revitalizujuća maska-kondicioner za omekšavanje i obnovu dlake. Uklanja frizziness, tretira rascepljene vrhove.' },
    price:49, image:'images/59.png', images:['images/59.png','images/60.png','images/61.jpg'],
    rating:4.8, cosType:'mask', variants:[{name:'150 mL',price:49},{name:'500 mL',price:93},{name:'3 Litres',price:355}] },
  { id:'huiles-4-elements', category:'cosmetics', section:'best-sellers',
    name:{ ru:'Huiles 4 Éléments — масло для шерсти', en:'Huiles 4 Éléments — Coat Oil Blend', sr:'Huiles 4 Éléments — uljana mešavina za dlaku' },
    description:{ ru:'Смесь четырёх драгоценных растительных масел. Восстанавливает, распутывает и придаёт шелковистый блеск.', en:'Blend of four precious plant oils. Repairs, detangles and adds a silky shine.', sr:'Mešavina četiri dragocena biljna ulja. Obnavlja, raspetljava i dodaje svilenkast sjaj.' },
    price:108, image:'images/62.png', images:['images/62.png','images/63.jpg'],
    rating:4.9, cosType:'oil', variants:[{name:'200 mL',price:108},{name:'50 mL',price:57}] },
  { id:'hygro-fluid', category:'cosmetics', section:'',
    name:{ ru:'Hygro Fluid — питательный интегратор', en:'Hygro Fluid — Nourishing Integrator', sr:'Hygro Fluid — hranjivi integrator' },
    description:{ ru:'Интегратор на основе масел для восстановления шерсти. Усиливает действие всех последующих средств ухода.', en:'Oil-based integrator for coat restoration. Amplifies the effect of all subsequent care products.', sr:'Integrator na bazi ulja za obnovu dlake. Pojačava dejstvo svih narednih proizvoda za negu.' },
    price:116, image:'images/64.png', images:['images/64.png','images/65.png','images/66.jpg'],
    rating:4.8, cosType:'integrator', variants:[{name:'1 Litre',price:116},{name:'250 mL',price:54}] },

// ═══ IMPORTED PRODUCTS FROM PETDESIGN (50% markup) ═══

  // ── TOYS (PetDesign) ──
  { id:'crazy-frog-trembling-frog-plus', category:'toys', section:'',
    name:{ ru:'Crazy Frog: Trembling Frog Plush Toy Dog', en:'Crazy Frog: Trembling Frog Plush Toy Dog', sr:'Crazy Frog: Trembling Frog Plush Toy Dog' },
    description:{ ru:'A Very Surprising Unusual Game For Your Dog By stretching the ring, the frog shakes, which drives them mad.', en:'A Very Surprising Unusual Game For Your Dog By stretching the ring, the frog shakes, which drives them mad.', sr:'A Very Surprising Unusual Game For Your Dog By stretching the ring, the frog shakes, which drives them mad.' },
    price:5, image:'images/67.jpg', images:['images/67.jpg','images/68.jpg','images/69.jpg','images/70.jpg','images/71.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'interactive-ball-with-treat-to', category:'toys', section:'new-arrivals',
    name:{ ru:'Interactive Ball with Treat & Tooth Cleaner', en:'Interactive Ball with Treat & Tooth Cleaner', sr:'Interactive Ball with Treat & Tooth Cleaner' },
    description:{ ru:'This tooth cleaning ball is a fun toy for your dog. Made of non-toxic rubber, it is perfect for playtime to keep your dog mentally and physically...', en:'This tooth cleaning ball is a fun toy for your dog. Made of non-toxic rubber, it is perfect for playtime to keep your dog mentally and physically...', sr:'This tooth cleaning ball is a fun toy for your dog. Made of non-toxic rubber, it is perfect for playtime to keep your dog mentally and physically...' },
    price:7, image:'images/74.jpg', images:['images/74.jpg','images/75.jpg'],
    rating:4.8, toyType:'chew', dimensions:['S','M','L'] },
  { id:'elephant-plush', category:'toys', section:'',
    name:{ ru:'Elephant plush', en:'Elephant plush', sr:'Elephant plush' },
    description:{ ru:'Plush toy for dogs in the shape of an elephant. This corduroy elephant will be your dog\'s inseparable toy. He will have fun and challenging playing...', en:'Plush toy for dogs in the shape of an elephant. This corduroy elephant will be your dog\'s inseparable toy. He will have fun and challenging playing...', sr:'Plush toy for dogs in the shape of an elephant. This corduroy elephant will be your dog\'s inseparable toy. He will have fun and challenging playing...' },
    price:11, image:'images/76.jpg', images:['images/76.jpg','images/77.jpg','images/78.jpg'],
    rating:4.8, toyType:'chew', dimensions:['Rose'] },
  { id:'plush-savannah-animals', category:'toys', section:'',
    name:{ ru:'Plush Savannah Animals', en:'Plush Savannah Animals', sr:'Plush Savannah Animals' },
    description:{ ru:'Plush animals inspired by wild animals of nature, to unleash the beast within! An attractive trio of toy dogs. Soft plush toys and rope for dogs....', en:'Plush animals inspired by wild animals of nature, to unleash the beast within! An attractive trio of toy dogs. Soft plush toys and rope for dogs....', sr:'Plush animals inspired by wild animals of nature, to unleash the beast within! An attractive trio of toy dogs. Soft plush toys and rope for dogs....' },
    price:11, image:'images/79.jpg',
    rating:4.8, toyType:'chew', dimensions:['Pink','Blue'] },
  { id:'dog-game-crazy-eggs-6cm', category:'toys', section:'',
    name:{ ru:'Dog Game - Crazy Eggs 6cm', en:'Dog Game - Crazy Eggs 6cm', sr:'Dog Game - Crazy Eggs 6cm' },
    description:{ ru:'A Very Surprising And Stimulating Game! A fun toy for cats and dogs in the shape of an egg. This toy perfectly imitates a real egg. It seduces your...', en:'A Very Surprising And Stimulating Game! A fun toy for cats and dogs in the shape of an egg. This toy perfectly imitates a real egg. It seduces your...', sr:'A Very Surprising And Stimulating Game! A fun toy for cats and dogs in the shape of an egg. This toy perfectly imitates a real egg. It seduces your...' },
    price:3, image:'images/88.jpg', images:['images/88.jpg','images/89.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'very-solid-booster-pudding', category:'toys', section:'new-arrivals',
    name:{ ru:'Very solid booster pudding', en:'Very solid booster pudding', sr:'Very solid booster pudding' },
    description:{ ru:'Throwing Game, Use This Booster As Well For Education, Training, As The Play Properly Said: elongated toy for dogs in very resistant fabric. This toy...', en:'Throwing Game, Use This Booster As Well For Education, Training, As The Play Properly Said: elongated toy for dogs in very resistant fabric. This toy...', sr:'Throwing Game, Use This Booster As Well For Education, Training, As The Play Properly Said: elongated toy for dogs in very resistant fabric. This toy...' },
    price:10, image:'images/95.jpg', images:['images/95.jpg','images/96.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'stuffed-animals-toys-made-from', category:'toys', section:'',
    name:{ ru:'Stuffed Animals / Toys made from Braided Ropes', en:'Stuffed Animals / Toys made from Braided Ropes', sr:'Stuffed Animals / Toys made from Braided Ropes' },
    description:{ ru:'Dog toys made from tightly woven cotton rope. Dogs are very playful and love to snack. Play helps them get rid of their anxiety and get the daily...', en:'Dog toys made from tightly woven cotton rope. Dogs are very playful and love to snack. Play helps them get rid of their anxiety and get the daily...', sr:'Dog toys made from tightly woven cotton rope. Dogs are very playful and love to snack. Play helps them get rid of their anxiety and get the daily...' },
    price:10, image:'images/98.jpg', images:['images/98.jpg','images/99.jpg','images/100.jpg'],
    rating:4.8, toyType:'chew', dimensions:['Ours'] },
  { id:'floating-toy-with-rope', category:'toys', section:'',
    name:{ ru:'Floating toy with rope', en:'Floating toy with rope', sr:'Floating toy with rope' },
    description:{ ru:'Recovery Float Toy with Rope The toy of recovery for Dog of Ibiza, made with a lightweight floating fabric. Water loving dogs will pass to fetch with...', en:'Recovery Float Toy with Rope The toy of recovery for Dog of Ibiza, made with a lightweight floating fabric. Water loving dogs will pass to fetch with...', sr:'Recovery Float Toy with Rope The toy of recovery for Dog of Ibiza, made with a lightweight floating fabric. Water loving dogs will pass to fetch with...' },
    price:11, image:'images/104.jpg', images:['images/104.jpg','images/105.jpg','images/106.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'neon-green-ball', category:'toys', section:'',
    name:{ ru:'Neon Green Ball', en:'Neon Green Ball', sr:'Neon Green Ball' },
    description:{ ru:'Play Even In The Dark With This Neon Ball Fluorescent Green Dog Ball Game. This single ball is perfect for one of dog\'s favorite games, tossing and...', en:'Play Even In The Dark With This Neon Ball Fluorescent Green Dog Ball Game. This single ball is perfect for one of dog\'s favorite games, tossing and...', sr:'Play Even In The Dark With This Neon Ball Fluorescent Green Dog Ball Game. This single ball is perfect for one of dog\'s favorite games, tossing and...' },
    price:6, image:'images/118.jpg', images:['images/118.jpg','images/119.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'spear-collect-ball-for-dog-gam', category:'toys', section:'new-arrivals',
    name:{ ru:'Spear & Collect Ball for dog game', en:'Spear & Collect Ball for dog game', sr:'Spear & Collect Ball for dog game' },
    description:{ ru:'Best Seller: The Lance Picks Ball Picking up the ball on the ground, without having to bend and throw it, without any effort. The most played game in...', en:'Best Seller: The Lance Picks Ball Picking up the ball on the ground, without having to bend and throw it, without any effort. The most played game in...', sr:'Best Seller: The Lance Picks Ball Picking up the ball on the ground, without having to bend and throw it, without any effort. The most played game in...' },
    price:7, image:'images/120.jpg', images:['images/120.jpg','images/121.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'ball-with-rope-for-dog', category:'toys', section:'',
    name:{ ru:'Ball with Rope for dog', en:'Ball with Rope for dog', sr:'Ball with Rope for dog' },
    description:{ ru:'A Great Classic Of Toys For Dogs Thermoplastic rubber dog ball with rope and rag knot. It is made of TPR and prepared to support your pet\'s jaws....', en:'A Great Classic Of Toys For Dogs Thermoplastic rubber dog ball with rope and rag knot. It is made of TPR and prepared to support your pet\'s jaws....', sr:'A Great Classic Of Toys For Dogs Thermoplastic rubber dog ball with rope and rag knot. It is made of TPR and prepared to support your pet\'s jaws....' },
    price:13, image:'images/125.jpg', images:['images/125.jpg','images/126.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'rigid-game-ball', category:'toys', section:'',
    name:{ ru:'Rigid Game Ball', en:'Rigid Game Ball', sr:'Rigid Game Ball' },
    description:{ ru:'The Reference Toy: Bouncing Ball Withstands Success, Timeless Success A classic in the world of dog toys. This rubber ball is solid, compact and...', en:'The Reference Toy: Bouncing Ball Withstands Success, Timeless Success A classic in the world of dog toys. This rubber ball is solid, compact and...', sr:'The Reference Toy: Bouncing Ball Withstands Success, Timeless Success A classic in the world of dog toys. This rubber ball is solid, compact and...' },
    price:6, image:'images/133.jpg',
    rating:4.8, toyType:'chew', dimensions:['Petite','Grande'] },
  { id:'steering-wheel-natural-fun-nat', category:'toys', section:'',
    name:{ ru:'Steering wheel "NATURAL Fun" - Natural Materials', en:'Steering wheel "NATURAL Fun" - Natural Materials', sr:'Steering wheel "NATURAL Fun" - Natural Materials' },
    description:{ ru:'A Very Effective And Natural Gripping Toy dog toy from the Natural Fun dog line. The toys in the "Natural Fun" range are free from chemicals or...', en:'A Very Effective And Natural Gripping Toy dog toy from the Natural Fun dog line. The toys in the "Natural Fun" range are free from chemicals or...', sr:'A Very Effective And Natural Gripping Toy dog toy from the Natural Fun dog line. The toys in the "Natural Fun" range are free from chemicals or...' },
    price:12, image:'images/136.jpg',
    rating:4.8, toyType:'chew' },
  { id:'bringable-dummy-bag-with-strap', category:'toys', section:'new-arrivals',
    name:{ ru:'Bringable Dummy Bag With Strap for dog', en:'Bringable Dummy Bag With Strap for dog', sr:'Bringable Dummy Bag With Strap for dog' },
    description:{ ru:'Stimulate Your Dog With This Dog Dummy Leure Shaped As A Play Bag Bringable dog dummy perfect for training and playing. This Amigo-Life dummy is a...', en:'Stimulate Your Dog With This Dog Dummy Leure Shaped As A Play Bag Bringable dog dummy perfect for training and playing. This Amigo-Life dummy is a...', sr:'Stimulate Your Dog With This Dog Dummy Leure Shaped As A Play Bag Bringable dog dummy perfect for training and playing. This Amigo-Life dummy is a...' },
    price:12, image:'images/139.jpg', images:['images/139.jpg','images/140.jpg','images/141.jpg','images/142.jpg','images/143.jpg'],
    rating:4.8, toyType:'chew' },

  // ── BEDS (PetDesign) ──
  { id:'vetbed-absorbent-mat-choice-of', category:'beds', section:'',
    name:{ ru:'VETBED absorbent mat - Choice of two sizes - thickness 2000 gr / m', en:'VETBED absorbent mat - Choice of two sizes - thickness 2000 gr / m', sr:'VETBED absorbent mat - Choice of two sizes - thickness 2000 gr / m' },
    description:{ ru:'Absorbent mat 2.000 gr / m The best quality absorbent mats for dogs in Europe. Made in England. Fabric made in double layer with a thickness of 2000...', en:'Absorbent mat 2.000 gr / m The best quality absorbent mats for dogs in Europe. Made in England. Fabric made in double layer with a thickness of 2000...', sr:'Absorbent mat 2.000 gr / m The best quality absorbent mats for dogs in Europe. Made in England. Fabric made in double layer with a thickness of 2000...' },
    price:38, image:'images/144.jpg', images:['images/144.jpg','images/145.jpg','images/146.jpg','images/147.jpg','images/148.jpg'],
    rating:4.8, dimensions:['Gris 1m. x 1,50m','Gris 1m. x 75cm','BLEU 1m. x 75cm','LILA 1m. x 1,50M','LILA 1m. x 75cm','CELESTE 1m. x 1,50m','CELESTE 1m. x 75cm','CARREAUX 1m. x 1,50m','Base Antidérapante - Gris 1m x 0.75m','Base Antidérapante - Gris 1m x 1.5m'] },
  { id:'plastic-dog-basket', category:'beds', section:'',
    name:{ ru:'Plastic dog basket', en:'Plastic dog basket', sr:'Plastic dog basket' },
    description:{ ru:'Plastic bed. Bin made of durable plastic or whelping for dogs. Ideal for dogs that tend to bite and break soft beds. Farrow that facilitates that the...', en:'Plastic bed. Bin made of durable plastic or whelping for dogs. Ideal for dogs that tend to bite and break soft beds. Farrow that facilitates that the...', sr:'Plastic bed. Bin made of durable plastic or whelping for dogs. Ideal for dogs that tend to bite and break soft beds. Farrow that facilitates that the...' },
    price:21, image:'images/149.jpg', images:['images/149.jpg','images/150.jpg','images/151.jpg'],
    rating:4.8, dimensions:['MINI / Noir','MINI / Violet','MINI / Gris/beige','PETIT / Noir','PETIT / Violet','PETIT / Gris/beige','MOYEN / Noir','MOYEN / Violet','MOYEN / Gris/beige','GRAND / Noir','GRAND / Violet','GRAND / Gris/beige'] },
  { id:'microfiber-mat', category:'beds', section:'',
    name:{ ru:'Microfiber mat', en:'Microfiber mat', sr:'Microfiber mat' },
    description:{ ru:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', en:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', sr:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...' },
    price:40, image:'images/152.jpg', images:['images/152.jpg','images/153.jpg','images/154.jpg','images/155.jpg'],
    rating:4.8, dimensions:['PETIT','MOYEN','GRAND'] },
  { id:'winter-trees-bed', category:'beds', section:'new-arrivals',
    name:{ ru:'"WINTER Trees" Bed', en:'"WINTER Trees" Bed', sr:'"WINTER Trees" Bed' },
    description:{ ru:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...', en:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...', sr:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...' },
    price:49, image:'images/156.jpg', images:['images/156.jpg','images/157.jpg','images/158.jpg','images/159.jpg','images/160.jpg'],
    rating:4.8, dimensions:['PETIT','GRAND'] },
  { id:'winter-trees-bed-3', category:'beds', section:'',
    name:{ ru:'"WINTER Trees" Bed', en:'"WINTER Trees" Bed', sr:'"WINTER Trees" Bed' },
    description:{ ru:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...', en:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...', sr:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...' },
    price:44, image:'images/164.jpg', images:['images/164.jpg','images/165.jpg','images/166.jpg','images/167.jpg','images/168.jpg'],
    rating:4.8, dimensions:['MOYEN','PETIT','GRAND'] },
  { id:'raised-dog-bed-on-top-great-co', category:'beds', section:'',
    name:{ ru:'Raised Dog Bed "ON Top" Great Comfort Black', en:'Raised Dog Bed "ON Top" Great Comfort Black', sr:'Raised Dog Bed "ON Top" Great Comfort Black' },
    description:{ ru:'The "On Top" Elevated Dog Bed is perfect for indoors and outdoors. Here are some of the benefits of these beds: - Raised surface provides great...', en:'The "On Top" Elevated Dog Bed is perfect for indoors and outdoors. Here are some of the benefits of these beds: - Raised surface provides great...', sr:'The "On Top" Elevated Dog Bed is perfect for indoors and outdoors. Here are some of the benefits of these beds: - Raised surface provides great...' },
    price:53, image:'images/169.jpg', images:['images/169.jpg','images/170.jpg','images/171.jpg','images/172.jpg','images/173.jpg'],
    rating:4.8, dimensions:['GRAND','MOYEN','Petite','Très Grand'] },
  { id:'microfiber-mat-3', category:'beds', section:'',
    name:{ ru:'Microfiber mat', en:'Microfiber mat', sr:'Microfiber mat' },
    description:{ ru:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', en:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', sr:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...' },
    price:104, image:'images/182.jpg', images:['images/182.jpg','images/183.jpg','images/184.jpg'],
    rating:4.8, dimensions:['PETIT','GRAND','MOYEN'] },
  { id:'turquoise-bed', category:'beds', section:'new-arrivals',
    name:{ ru:'\'Turquoise\' bed', en:'\'Turquoise\' bed', sr:'\'Turquoise\' bed' },
    description:{ ru:'A cozy bed for small dogs and cats. This bed is a great option for small dogs, puppies and cats who love to cuddle. It is extremely fluffy and soft,...', en:'A cozy bed for small dogs and cats. This bed is a great option for small dogs, puppies and cats who love to cuddle. It is extremely fluffy and soft,...', sr:'A cozy bed for small dogs and cats. This bed is a great option for small dogs, puppies and cats who love to cuddle. It is extremely fluffy and soft,...' },
    price:57, image:'images/188.jpg', images:['images/188.jpg','images/189.jpg','images/190.jpg'],
    rating:4.8 },
  { id:'lit-leaf-pour-chien-et-chat', category:'beds', section:'',
    name:{ ru:'Lit "Leaf" pour chien et chat', en:'Lit "Leaf" pour chien et chat', sr:'Lit "Leaf" pour chien et chat' },
    description:{ ru:'Corbeille Leaf : Le cocon de douceur au design automnal Offrez à votre compagnon à quatre pattes un véritable havre de paix avec la corbeille Leaf ....', en:'Corbeille Leaf : Le cocon de douceur au design automnal Offrez à votre compagnon à quatre pattes un véritable havre de paix avec la corbeille Leaf ....', sr:'Corbeille Leaf : Le cocon de douceur au design automnal Offrez à votre compagnon à quatre pattes un véritable havre de paix avec la corbeille Leaf ....' },
    price:30, image:'images/191.jpg', images:['images/191.jpg','images/192.jpg','images/193.jpg','images/194.jpg'],
    rating:4.8, dimensions:['PETIT','MOYEN','GRAND'] },
  { id:'high-comfort-on-top-dog-bed', category:'beds', section:'',
    name:{ ru:'High Comfort "ON Top" Dog Bed', en:'High Comfort "ON Top" Dog Bed', sr:'High Comfort "ON Top" Dog Bed' },
    description:{ ru:'"On Top" Raised Bed The "On Top" Raised Dog Bed is perfect for indoor and outdoor use. Here are some of the advantages of these beds: · The raised...', en:'"On Top" Raised Bed The "On Top" Raised Dog Bed is perfect for indoor and outdoor use. Here are some of the advantages of these beds: · The raised...', sr:'"On Top" Raised Bed The "On Top" Raised Dog Bed is perfect for indoor and outdoor use. Here are some of the advantages of these beds: · The raised...' },
    price:50, image:'images/210.jpg', images:['images/210.jpg','images/211.jpg','images/212.jpg','images/213.jpg'],
    rating:4.8, dimensions:['GRAND','MOYEN','Petite','Très Grand'] },
  { id:'lit-aura-pour-chien-et-chat', category:'beds', section:'',
    name:{ ru:'Lit "Aura" pour chien et chat', en:'Lit "Aura" pour chien et chat', sr:'Lit "Aura" pour chien et chat' },
    description:{ ru:'Corbeille Aura : Le luxe du velours et un confort sur-mesure Offrez à votre compagnon une expérience de repos haut de gamme avec la corbeille Aura ....', en:'Corbeille Aura : Le luxe du velours et un confort sur-mesure Offrez à votre compagnon une expérience de repos haut de gamme avec la corbeille Aura ....', sr:'Corbeille Aura : Le luxe du velours et un confort sur-mesure Offrez à votre compagnon une expérience de repos haut de gamme avec la corbeille Aura ....' },
    price:45, image:'images/214.jpg', images:['images/214.jpg','images/215.jpg','images/216.jpg','images/217.jpg','images/218.jpg'],
    rating:4.8, dimensions:['GRIS BLEU - PETIT','GRIS BLEU - MOYEN','GRIS BLEU - GRAND','BEIGE - PETIT','BEIGE - MOYEN','BEIGE - GRAND'] },
  { id:'lit-haven-pour-chien-et-chat', category:'beds', section:'new-arrivals',
    name:{ ru:'Lit "Haven" pour chien et chat', en:'Lit "Haven" pour chien et chat', sr:'Lit "Haven" pour chien et chat' },
    description:{ ru:'Corbeille Haven : Le charme du tartan et un confort sur-mesure Le panier Haven est l\'alliance parfaite de l\'élégance classique et du bien-être...', en:'Corbeille Haven : Le charme du tartan et un confort sur-mesure Le panier Haven est l\'alliance parfaite de l\'élégance classique et du bien-être...', sr:'Corbeille Haven : Le charme du tartan et un confort sur-mesure Le panier Haven est l\'alliance parfaite de l\'élégance classique et du bien-être...' },
    price:36, image:'images/219.jpg', images:['images/219.jpg','images/220.jpg','images/221.jpg','images/222.jpg'],
    rating:4.8, dimensions:['PETIT','MOYEN','GRAND'] },
  { id:'lit-odette-pour-chien-et-chat', category:'beds', section:'',
    name:{ ru:'Lit "Odette" pour chien et chat', en:'Lit "Odette" pour chien et chat', sr:'Lit "Odette" pour chien et chat' },
    description:{ ru:'Corbeille Odette : Élégance champêtre et confort absolu Découvrez le mariage parfait entre style et bien-être avec le panier Odette . Son design...', en:'Corbeille Odette : Élégance champêtre et confort absolu Découvrez le mariage parfait entre style et bien-être avec le panier Odette . Son design...', sr:'Corbeille Odette : Élégance champêtre et confort absolu Découvrez le mariage parfait entre style et bien-être avec le panier Odette . Son design...' },
    price:44, image:'images/223.jpg', images:['images/223.jpg','images/224.jpg','images/225.jpg','images/226.jpg','images/227.jpg'],
    rating:4.8, dimensions:['PETIT','GRAND'] },
  { id:'lit-dreamzz-pour-chien-et-chat', category:'beds', section:'',
    name:{ ru:'Lit "Dreamzz" pour chien et chat', en:'Lit "Dreamzz" pour chien et chat', sr:'Lit "Dreamzz" pour chien et chat' },
    description:{ ru:'Corbeille Dreamzz : Douces nuits et design enchanté Le panier Dreamzz est spécialement conçu pour offrir à votre chien un repos profond et...', en:'Corbeille Dreamzz : Douces nuits et design enchanté Le panier Dreamzz est spécialement conçu pour offrir à votre chien un repos profond et...', sr:'Corbeille Dreamzz : Douces nuits et design enchanté Le panier Dreamzz est spécialement conçu pour offrir à votre chien un repos profond et...' },
    price:44, image:'images/228.jpg', images:['images/228.jpg','images/229.jpg','images/230.jpg','images/231.jpg'],
    rating:4.8, dimensions:['PETIT','MOYEN','GRAND'] },
  { id:'lit-polar-pour-chien-et-chat', category:'beds', section:'',
    name:{ ru:'Lit "Polar" pour chien et chat', en:'Lit "Polar" pour chien et chat', sr:'Lit "Polar" pour chien et chat' },
    description:{ ru:'Corbeille Polar : Élégance pure et douceur exceptionnelle Le panier Polar pour chien combine un design sophistiqué et un confort hors pair pour...', en:'Corbeille Polar : Élégance pure et douceur exceptionnelle Le panier Polar pour chien combine un design sophistiqué et un confort hors pair pour...', sr:'Corbeille Polar : Élégance pure et douceur exceptionnelle Le panier Polar pour chien combine un design sophistiqué et un confort hors pair pour...' },
    price:42, image:'images/232.jpg', images:['images/232.jpg','images/233.jpg','images/234.jpg','images/235.jpg'],
    rating:4.8, dimensions:['PETIT','GRAND'] },
  { id:'waterproof-oxford-mat-for-dogs', category:'beds', section:'new-arrivals',
    name:{ ru:'Waterproof "Oxford" mat for dogs', en:'Waterproof "Oxford" mat for dogs', sr:'Waterproof "Oxford" mat for dogs' },
    description:{ ru:'Waterproof dog bed with a fun zigzag pattern. Most notable about this bed is the fabric it is made of. This is a 100% polyester waterproof fabric,...', en:'Waterproof dog bed with a fun zigzag pattern. Most notable about this bed is the fabric it is made of. This is a 100% polyester waterproof fabric,...', sr:'Waterproof dog bed with a fun zigzag pattern. Most notable about this bed is the fabric it is made of. This is a 100% polyester waterproof fabric,...' },
    price:28, image:'images/267.jpg', images:['images/267.jpg','images/268.jpg','images/269.jpg','images/270.jpg','images/271.jpg'],
    rating:4.8, dimensions:['Bleu','Gris','Bleu Petit'] },
  { id:'spotty-bed-spotty', category:'beds', section:'',
    name:{ ru:'Spotty bed \'spotty\'', en:'Spotty bed \'spotty\'', sr:'Spotty bed \'spotty\'' },
    description:{ ru:'Speckled "Speckled" Bed Beautiful cave-shaped bed for dogs and cats. Especially recommended for cats and small dogs who like to sleep. Whether it...', en:'Speckled "Speckled" Bed Beautiful cave-shaped bed for dogs and cats. Especially recommended for cats and small dogs who like to sleep. Whether it...', sr:'Speckled "Speckled" Bed Beautiful cave-shaped bed for dogs and cats. Especially recommended for cats and small dogs who like to sleep. Whether it...' },
    price:61, image:'images/272.jpg', images:['images/272.jpg','images/273.jpg','images/274.jpg','images/275.jpg','images/276.jpg'],
    rating:4.8, dimensions:['Rose','Gris'] },

  // ── ACCESSORIES (PetDesign) ──
  { id:'easy-walk-muzzle', category:'accessories', section:'',
    name:{ ru:'Easy Walk Muzzle', en:'Easy Walk Muzzle', sr:'Easy Walk Muzzle' },
    description:{ ru:'Easy walk The Ibáñez Easy Walk Guide muzzle is a soft and flexible mesh muzzle that adjusts individually to each dog thanks to a wide and durable...', en:'Easy walk The Ibáñez Easy Walk Guide muzzle is a soft and flexible mesh muzzle that adjusts individually to each dog thanks to a wide and durable...', sr:'Easy walk The Ibáñez Easy Walk Guide muzzle is a soft and flexible mesh muzzle that adjusts individually to each dog thanks to a wide and durable...' },
    price:14, image:'images/277.png', images:['images/277.png','images/278.png','images/279.jpg','images/280.jpg','images/281.jpg'],
    rating:4.8, accType:'other', dimensions:['Size XS','Size S','Size M','Size L','Size XL','Size XXL','Special Size'] },
  { id:'cat-muzzle-premium-catalog-fro', category:'accessories', section:'',
    name:{ ru:'▷ Cat Muzzle ▷ Premium Catalog | from €5.80', en:'▷ Cat Muzzle ▷ Premium Catalog | from €5.80', sr:'▷ Cat Muzzle ▷ Premium Catalog | from €5.80' },
    description:{ ru:'nylon muzzles special for cats: This cat muzzle is essential in cat grooming salons, as well as for veterinarians and cat breeders. The behavior of...', en:'nylon muzzles special for cats: This cat muzzle is essential in cat grooming salons, as well as for veterinarians and cat breeders. The behavior of...', sr:'nylon muzzles special for cats: This cat muzzle is essential in cat grooming salons, as well as for veterinarians and cat breeders. The behavior of...' },
    price:9, image:'images/282.jpg', images:['images/282.jpg','images/283.jpg','images/284.jpg'],
    rating:4.8, accType:'other', dimensions:['Size S','Size M','Size L'] },
  { id:'waterproof-coat-with-fur-prote', category:'accessories', section:'',
    name:{ ru:'Waterproof coat with fur protection', en:'Waterproof coat with fur protection', sr:'Waterproof coat with fur protection' },
    description:{ ru:'Waterproof Dog Coat Advantage: The Waterproof Dog Coat offers exceptional protection thanks to BREATHE-COMFORT technology. This high-tech fabric...', en:'Waterproof Dog Coat Advantage: The Waterproof Dog Coat offers exceptional protection thanks to BREATHE-COMFORT technology. This high-tech fabric...', sr:'Waterproof Dog Coat Advantage: The Waterproof Dog Coat offers exceptional protection thanks to BREATHE-COMFORT technology. This high-tech fabric...' },
    price:22, image:'images/285.jpg', images:['images/285.jpg','images/286.jpg','images/287.jpg','images/288.jpg','images/289.jpg'],
    rating:4.8, accType:'other', dimensions:['25cm','30cm','40cm','45cm','50cm','55cm','60cm'] },
  { id:'dog-waste-bags-4-rolls-of-20-b', category:'accessories', section:'new-arrivals',
    name:{ ru:'Dog Waste Bags (4 Rolls of 20 Bags)', en:'Dog Waste Bags (4 Rolls of 20 Bags)', sr:'Dog Waste Bags (4 Rolls of 20 Bags)' },
    description:{ ru:'Dispenser Bags (4 Rolls) Pack with 4 replacement bags for the collected poop dispensers. Each roll contains 20 bags. Total: 80 bags. Available in...', en:'Dispenser Bags (4 Rolls) Pack with 4 replacement bags for the collected poop dispensers. Each roll contains 20 bags. Total: 80 bags. Available in...', sr:'Dispenser Bags (4 Rolls) Pack with 4 replacement bags for the collected poop dispensers. Each roll contains 20 bags. Total: 80 bags. Available in...' },
    price:5, image:'images/290.jpg', images:['images/290.jpg','images/291.jpg','images/292.jpg'],
    rating:4.8, accType:'other' },
  { id:'waterproof-plaid-dog-rain-coat', category:'accessories', section:'',
    name:{ ru:'Waterproof Plaid Dog Rain Coat', en:'Waterproof Plaid Dog Rain Coat', sr:'Waterproof Plaid Dog Rain Coat' },
    description:{ ru:'Raincoat with hood Raincoat with hood for dogs with check pattern. Nylon covered with polyurethane, waterproof and windproof. With its graceful hood...', en:'Raincoat with hood Raincoat with hood for dogs with check pattern. Nylon covered with polyurethane, waterproof and windproof. With its graceful hood...', sr:'Raincoat with hood Raincoat with hood for dogs with check pattern. Nylon covered with polyurethane, waterproof and windproof. With its graceful hood...' },
    price:15, image:'images/293.jpg', images:['images/293.jpg','images/294.jpg','images/295.jpg','images/296.jpg','images/297.jpg'],
    rating:4.8, accType:'other', dimensions:['25cm','45cm','40cm','35cm','30cm'] },
  { id:'black-dog-heat-pants-size-0', category:'accessories', section:'',
    name:{ ru:'Black Dog Heat Pants - Size 0', en:'Black Dog Heat Pants - Size 0', sr:'Black Dog Heat Pants - Size 0' },
    description:{ ru:'Braguita Ibáñez for zeal The panties for jealousy Ibáñez is the ideal solution for your dog\'s hot weather, avoiding that you can go and dirty the...', en:'Braguita Ibáñez for zeal The panties for jealousy Ibáñez is the ideal solution for your dog\'s hot weather, avoiding that you can go and dirty the...', sr:'Braguita Ibáñez for zeal The panties for jealousy Ibáñez is the ideal solution for your dog\'s hot weather, avoiding that you can go and dirty the...' },
    price:9, image:'images/298.jpg', images:['images/298.jpg','images/299.jpg','images/300.jpg','images/301.jpg'],
    rating:4.8, accType:'other', dimensions:['T.0 28-34 cm.','T.1 32-38 cm.','T.2 34-44 cm.','T.3 36-48 cm.','T.4 38-54 cm.','T.5 42-60 cm.'] },
  { id:'street-breathe-comfort-dog-coa', category:'accessories', section:'',
    name:{ ru:'Street Breathe Comfort Dog Coat', en:'Street Breathe Comfort Dog Coat', sr:'Street Breathe Comfort Dog Coat' },
    description:{ ru:'Coat + Street Breathe Comfort Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under...', en:'Coat + Street Breathe Comfort Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under...', sr:'Coat + Street Breathe Comfort Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under...' },
    price:30, image:'images/302.jpg', images:['images/302.jpg','images/303.jpg','images/304.jpg'],
    rating:4.8, accType:'other', dimensions:['25 CM','30 CM','35 CM','50 CM','75 CM','40 CM','65 CM','70 CM','45 cm','60 CM','55 CM'] },
  { id:'premium-dog-poop-bag-dispenser', category:'accessories', section:'new-arrivals',
    name:{ ru:'“PREMIUM” Dog Poop Bag Dispenser', en:'“PREMIUM” Dog Poop Bag Dispenser', sr:'“PREMIUM” Dog Poop Bag Dispenser' },
    description:{ ru:'"PREMIUM" Poop Bag Dispenser "The Iba "Premium" poop bag dispenser is the ideal solution for a peaceful walk with your dog. Made from durable,...', en:'"PREMIUM" Poop Bag Dispenser "The Iba "Premium" poop bag dispenser is the ideal solution for a peaceful walk with your dog. Made from durable,...', sr:'"PREMIUM" Poop Bag Dispenser "The Iba "Premium" poop bag dispenser is the ideal solution for a peaceful walk with your dog. Made from durable,...' },
    price:10, image:'images/317.jpg', images:['images/317.jpg','images/318.jpg','images/319.jpg','images/320.jpg','images/321.jpg'],
    rating:4.8, accType:'other' },
  { id:'pads-cleanliness-education-mat', category:'accessories', section:'',
    name:{ ru:'PADS Cleanliness Education Mats', en:'PADS Cleanliness Education Mats', sr:'PADS Cleanliness Education Mats' },
    description:{ ru:'Potty training thanks to these PADS This educator is the ideal complement for puppies who are learning to urinate in a specific place and for dogs...', en:'Potty training thanks to these PADS This educator is the ideal complement for puppies who are learning to urinate in a specific place and for dogs...', sr:'Potty training thanks to these PADS This educator is the ideal complement for puppies who are learning to urinate in a specific place and for dogs...' },
    price:49, image:'images/322.jpg', images:['images/322.jpg','images/323.jpg'],
    rating:4.8, accType:'other', dimensions:['T. M','T. S'] },
  { id:'dog-poop-bag-dispenser', category:'accessories', section:'',
    name:{ ru:'Dog poop bag dispenser', en:'Dog poop bag dispenser', sr:'Dog poop bag dispenser' },
    description:{ ru:'Bone Dispenser Bags Bone shaped bag dispenser to collect your dog\'s droppings comfortably and cleanly. It has a small metal carabiner that allows it...', en:'Bone Dispenser Bags Bone shaped bag dispenser to collect your dog\'s droppings comfortably and cleanly. It has a small metal carabiner that allows it...', sr:'Bone Dispenser Bags Bone shaped bag dispenser to collect your dog\'s droppings comfortably and cleanly. It has a small metal carabiner that allows it...' },
    price:5, image:'images/334.jpg', images:['images/334.jpg','images/335.jpg','images/336.jpg'],
    rating:4.8, accType:'other' },
  { id:'dog-nappies-size-1-32-42cm-bla', category:'accessories', section:'',
    name:{ ru:'Dog Nappies. Size 1 - 32-42cm - Black (12 Un.)', en:'Dog Nappies. Size 1 - 32-42cm - Black (12 Un.)', sr:'Dog Nappies. Size 1 - 32-42cm - Black (12 Un.)' },
    description:{ ru:'Disposable diapers black Practical ultra absorbent disposable diaper for dogs. UTILITIES: · Prevents penetration during heat. · Prevents the woman...', en:'Disposable diapers black Practical ultra absorbent disposable diaper for dogs. UTILITIES: · Prevents penetration during heat. · Prevents the woman...', sr:'Disposable diapers black Practical ultra absorbent disposable diaper for dogs. UTILITIES: · Prevents penetration during heat. · Prevents the woman...' },
    price:17, image:'images/349.jpg', images:['images/349.jpg','images/350.jpg','images/351.jpg'],
    rating:4.8, accType:'other', dimensions:['T.3','T.6','T.5','T.1','T.4','T.2','T. 7'] },
  { id:'premium-dog-coat-pilot', category:'accessories', section:'new-arrivals',
    name:{ ru:'Premium Dog Coat "Pilot"', en:'Premium Dog Coat "Pilot"', sr:'Premium Dog Coat "Pilot"' },
    description:{ ru:'Quality Dog Coat Dog coat with extra soft fleece. The fleece with which it is made is particularly soft and pleasant. It is also remarkable for its...', en:'Quality Dog Coat Dog coat with extra soft fleece. The fleece with which it is made is particularly soft and pleasant. It is also remarkable for its...', sr:'Quality Dog Coat Dog coat with extra soft fleece. The fleece with which it is made is particularly soft and pleasant. It is also remarkable for its...' },
    price:23, image:'images/352.jpg', images:['images/352.jpg','images/353.jpg','images/354.jpg','images/355.jpg','images/356.jpg'],
    rating:4.8, accType:'other', dimensions:['25cm','30cm','35cm','45cm'] },
  { id:'black-aluminum-poop-scoop', category:'accessories', section:'',
    name:{ ru:'Black Aluminum Poop Scoop', en:'Black Aluminum Poop Scoop', sr:'Black Aluminum Poop Scoop' },
    description:{ ru:'Black Aluminum Excrement Collector Practical collector of dog or cat excrement for the garden or the kennel. The posture of the collection is very...', en:'Black Aluminum Excrement Collector Practical collector of dog or cat excrement for the garden or the kennel. The posture of the collection is very...', sr:'Black Aluminum Excrement Collector Practical collector of dog or cat excrement for the garden or the kennel. The posture of the collection is very...' },
    price:81, image:'images/357.jpg',
    rating:4.8, accType:'other' },
  { id:'iba-waste-bag-13-rolls-of-dog-', category:'accessories', section:'',
    name:{ ru:'Ibá Waste Bag + 13 rolls of dog dejection bags', en:'Ibá Waste Bag + 13 rolls of dog dejection bags', sr:'Ibá Waste Bag + 13 rolls of dog dejection bags' },
    description:{ ru:'Pouches (13 Rolls) Plus Dispenser The bags collect the replacement "poo" with the pouch dispenser. The package contains 13 rolls of sachets for...', en:'Pouches (13 Rolls) Plus Dispenser The bags collect the replacement "poo" with the pouch dispenser. The package contains 13 rolls of sachets for...', sr:'Pouches (13 Rolls) Plus Dispenser The bags collect the replacement "poo" with the pouch dispenser. The package contains 13 rolls of sachets for...' },
    price:17, image:'images/358.jpg', images:['images/358.jpg','images/359.jpg'],
    rating:4.8, accType:'other' },
  { id:'nylon-leash-with-handle-and-ba', category:'accessories', section:'',
    name:{ ru:'Nylon Leash With Handle And Bag Holder For Dogs', en:'Nylon Leash With Handle And Bag Holder For Dogs', sr:'Nylon Leash With Handle And Bag Holder For Dogs' },
    description:{ ru:'A 2-In-1 Leash: Performs Its Role As A Wonder Ride Strap, And Contains The Very Useful Option: The Poop Bag Holder Is Integrated Into This...', en:'A 2-In-1 Leash: Performs Its Role As A Wonder Ride Strap, And Contains The Very Useful Option: The Poop Bag Holder Is Integrated Into This...', sr:'A 2-In-1 Leash: Performs Its Role As A Wonder Ride Strap, And Contains The Very Useful Option: The Poop Bag Holder Is Integrated Into This...' },
    price:21, image:'images/360.jpg', images:['images/360.jpg','images/361.jpg','images/362.jpg','images/363.jpg'],
    rating:4.8, accType:'other' },

  // ── COSMETICS (PetDesign) ──
  { id:'extra-body-cream', category:'cosmetics', section:'new-arrivals',
    name:{ ru:'EXTRA BODY CREAM', en:'EXTRA BODY CREAM', sr:'EXTRA BODY CREAM' },
    description:{ ru:'EXTRA BODY CREAM is a concentrated volume balm with an instant effect, formulated for dogs and cats. Who is this product for? Everyone will find it...', en:'EXTRA BODY CREAM is a concentrated volume balm with an instant effect, formulated for dogs and cats. Who is this product for? Everyone will find it...', sr:'EXTRA BODY CREAM is a concentrated volume balm with an instant effect, formulated for dogs and cats. Who is this product for? Everyone will find it...' },
    price:108, image:'images/364.png',
    rating:4.8, cosType:'mask', variants:[{name:'1 Litre',price:108},{name:'3 Litres',price:303}] },
  { id:'villanelle-creme-ultra-demelan', category:'cosmetics', section:'',
    name:{ ru:'VILLANELLE, Crème Ultra-Démêlante & Séchage Rapide', en:'VILLANELLE, Crème Ultra-Démêlante & Séchage Rapide', sr:'VILLANELLE, Crème Ultra-Démêlante & Séchage Rapide' },
    description:{ ru:'VILLANELLE est le nouveau traitement "Ultra-Démêlant" de Special One. Conçue pour dissoudre les feutrages les plus critiques, elle réduit jusqu\'à 40%...', en:'VILLANELLE est le nouveau traitement "Ultra-Démêlant" de Special One. Conçue pour dissoudre les feutrages les plus critiques, elle réduit jusqu\'à 40%...', sr:'VILLANELLE est le nouveau traitement "Ultra-Démêlant" de Special One. Conçue pour dissoudre les feutrages les plus critiques, elle réduit jusqu\'à 40%...' },
    price:104, image:'images/365.jpg',
    rating:4.8, cosType:'mask', variants:[{name:'500 mL',price:104},{name:'3 L',price:390}] },
  { id:'glossy-pose-pour-plomber-allou', category:'cosmetics', section:'',
    name:{ ru:'Glossy Pose - Pour Plomber, allourdir, nourrir, faire pousser comme jamais', en:'Glossy Pose - Pour Plomber, allourdir, nourrir, faire pousser comme jamais', sr:'Glossy Pose - Pour Plomber, allourdir, nourrir, faire pousser comme jamais' },
    description:{ ru:'GLOSSY POSE est le traitement restructurant intensif de Special One, conçu pour la sauvegarde et la mise en valeur des manteaux longs, frangés et...', en:'GLOSSY POSE est le traitement restructurant intensif de Special One, conçu pour la sauvegarde et la mise en valeur des manteaux longs, frangés et...', sr:'GLOSSY POSE est le traitement restructurant intensif de Special One, conçu pour la sauvegarde et la mise en valeur des manteaux longs, frangés et...' },
    price:129, image:'images/366.jpg',
    rating:4.8, cosType:'mask', variants:[{name:'500 mL',price:129},{name:'3 L',price:501}] },
  // ── COSMETICS - Bain Collection (PetDesign) ──
  { id:'super-keeper', category:'cosmetics', section:'',
    name:{ ru:'SUPER KEEPER', en:'SUPER KEEPER', sr:'SUPER KEEPER' },
    description:{ ru:'Super Keeper – Special One | Product Details SUPER KEEPER is the Special One protective integrator, highly restorative , Designed to strengthen and rebuild the coat. Its blend of selected plant oil...', en:'Super Keeper – Special One | Product Details SUPER KEEPER is the Special One protective integrator, highly restorative , Designed to strengthen and rebuild the coat. Its blend of selected plant oil...', sr:'Super Keeper – Special One | Product Details SUPER KEEPER is the Special One protective integrator, highly restorative , Designed to strengthen and rebuild the coat. Its blend of selected plant oil...' },
    price:57, image:'images/387.png', images:['images/387.png','images/388.png','images/389.jpg'],
    rating:4.8, cosType:'serum', variants:[{name:'250 mL',price:57},{name:'1 Litre',price:133}] },
  { id:'platynum-pro-shampoing-volume', category:'cosmetics', section:'best-sellers',
    name:{ ru:'PLATINUM PRO, volume shampoo', en:'PLATINUM PRO, volume shampoo', sr:'PLATINUM PRO, volume shampoo' },
    description:{ ru:'PLATINUM PRO is the Special One professional shampoo whose main focus is the VOLUME . Ideal for shows and scissor cuts, it reveals the full natural volume of the fur, provides lasting straightening...', en:'PLATINUM PRO is the Special One professional shampoo whose main focus is the VOLUME . Ideal for shows and scissor cuts, it reveals the full natural volume of the fur, provides lasting straightening...', sr:'PLATINUM PRO is the Special One professional shampoo whose main focus is the VOLUME . Ideal for shows and scissor cuts, it reveals the full natural volume of the fur, provides lasting straightening...' },
    price:34, image:'images/390.png', images:['images/390.png','images/391.jpg','images/392.jpg'],
    rating:4.8, cosType:'shampoo', variants:[{name:'250 mL',price:34},{name:'1 Litre',price:66},{name:'5 Litres',price:192}] },
  { id:'shampoing-salon-toilettage', category:'cosmetics', section:'',
    name:{ ru:'BLUE SKY PRO, can be diluted 40 times!', en:'BLUE SKY PRO, can be diluted 40 times!', sr:'BLUE SKY PRO, can be diluted 40 times!' },
    description:{ ru:'BLUE SKY PRO is the highly concentrated Special One professional shampoo universal . Designed for grooming salons and breeders, it offers the best value for money in the range : ultra versatile, ul...', en:'BLUE SKY PRO is the highly concentrated Special One professional shampoo universal . Designed for grooming salons and breeders, it offers the best value for money in the range : ultra versatile, ul...', sr:'BLUE SKY PRO is the highly concentrated Special One professional shampoo universal . Designed for grooming salons and breeders, it offers the best value for money in the range : ultra versatile, ul...' },
    price:252, image:'images/393.png', images:['images/393.png','images/394.png','images/395.jpg'],
    rating:4.8, cosType:'shampoo', variants:[{name:'10 Litres',price:252},{name:'250 mL',price:36},{name:'1 Litre',price:72}] },
  { id:'bombastic-special-one-en', category:'cosmetics', section:'best-sellers',
    name:{ ru:'BOMBASTIC - the essential serum ✨', en:'BOMBASTIC - the essential serum ✨', sr:'BOMBASTIC - the essential serum ✨' },
    description:{ ru:'Bombastic – Special One | Product Sheet BOMBASTIC is the Reconstructive Liquid Fiber Special One — no shampoo, no conditioner, no oily serum. A true innovation in zoo-cosmetology: Remineralizing + ...', en:'Bombastic – Special One | Product Sheet BOMBASTIC is the Reconstructive Liquid Fiber Special One — no shampoo, no conditioner, no oily serum. A true innovation in zoo-cosmetology: Remineralizing + ...', sr:'Bombastic – Special One | Product Sheet BOMBASTIC is the Reconstructive Liquid Fiber Special One — no shampoo, no conditioner, no oily serum. A true innovation in zoo-cosmetology: Remineralizing + ...' },
    price:130, image:'images/396.png',
    rating:4.8, cosType:'serum', dimensions:['1 Liter'] },
  { id:'4poodle-shampoing-caniche-special-one', category:'cosmetics', section:'',
    name:{ ru:'4Poodle - Special Edition - Straightens and volumizes', en:'4Poodle - Special Edition - Straightens and volumizes', sr:'4Poodle - Special Edition - Straightens and volumizes' },
    description:{ ru:'4POODLE PRO (pronounced "For Poudeul Pro") is the shampoo that will revolutionize all your blow-drying of hair to volumize and straighten. The best shampoo on the market for this — a technical inno...', en:'4POODLE PRO (pronounced "For Poudeul Pro") is the shampoo that will revolutionize all your blow-drying of hair to volumize and straighten. The best shampoo on the market for this — a technical inno...', sr:'4POODLE PRO (pronounced "For Poudeul Pro") is the shampoo that will revolutionize all your blow-drying of hair to volumize and straighten. The best shampoo on the market for this — a technical inno...' },
    price:231, image:'images/397.png', images:['images/397.png','images/398.png','images/399.jpg','images/400.png','images/401.png'],
    rating:4.8, cosType:'shampoo', variants:[{name:'5 Litres',price:231},{name:'1 Litre',price:79}] },
  { id:'aqua-nettoyant-oculaire', category:'cosmetics', section:'best-sellers',
    name:{ ru:'AQUA eye cleaner', en:'AQUA eye cleaner', sr:'AQUA eye cleaner' },
    description:{ ru:'AQUA eye cleanser is an ultra-gentle ophthalmic lotion with plant extracts. Finally a product that allows you to REMOVE THE TRACES OF TEARS thanks to natural active ingredients. . Who is this produ...', en:'AQUA eye cleanser is an ultra-gentle ophthalmic lotion with plant extracts. Finally a product that allows you to REMOVE THE TRACES OF TEARS thanks to natural active ingredients. . Who is this produ...', sr:'AQUA eye cleanser is an ultra-gentle ophthalmic lotion with plant extracts. Finally a product that allows you to REMOVE THE TRACES OF TEARS thanks to natural active ingredients. . Who is this produ...' },
    price:30, image:'images/402.jpg',
    rating:4.8, cosType:'other', dimensions:['100 mL'] },
  { id:'aquapure-chlorexidine-propolis', category:'cosmetics', section:'',
    name:{ ru:'AQUAPURE PRO - 1st washing and disinfecting shampoo', en:'AQUAPURE PRO - 1st washing and disinfecting shampoo', sr:'AQUAPURE PRO - 1st washing and disinfecting shampoo' },
    description:{ ru:'AQUAPURE PRO is the Special One shampoo strongest washing power in the range . It cleans even the dirtiest animals very thoroughly, and allows for a reset of the epidermis thanks to its natural ant...', en:'AQUAPURE PRO is the Special One shampoo strongest washing power in the range . It cleans even the dirtiest animals very thoroughly, and allows for a reset of the epidermis thanks to its natural ant...', sr:'AQUAPURE PRO is the Special One shampoo strongest washing power in the range . It cleans even the dirtiest animals very thoroughly, and allows for a reset of the epidermis thanks to its natural ant...' },
    price:34, image:'images/403.png', images:['images/403.png','images/404.png','images/405.jpg'],
    rating:4.8, cosType:'shampoo', variants:[{name:'250 mL',price:34},{name:'5 L',price:193}] },
  { id:'aquablu-pro-shampoing-bleu', category:'cosmetics', section:'best-sellers',
    name:{ ru:'AQUABLU PRO', en:'AQUABLU PRO', sr:'AQUABLU PRO' },
    description:{ ru:'Aquablu Pro – Special One | Product Sheet AQUABLU PRO is the Special One professional shampoo with marine bio-derived ingredients and reflective blue pigments, specially designed for neutralize yel...', en:'Aquablu Pro – Special One | Product Sheet AQUABLU PRO is the Special One professional shampoo with marine bio-derived ingredients and reflective blue pigments, specially designed for neutralize yel...', sr:'Aquablu Pro – Special One | Product Sheet AQUABLU PRO is the Special One professional shampoo with marine bio-derived ingredients and reflective blue pigments, specially designed for neutralize yel...' },
    price:30, image:'images/406.png', images:['images/406.png','images/407.png','images/408.jpg'],
    rating:4.8, cosType:'shampoo', variants:[{name:'250 mL',price:30},{name:'5 Litres',price:169}] },
  { id:'absolute-4poodle-grooming-poodle', category:'cosmetics', section:'',
    name:{ ru:'Absolute 4Poodle - The best anti-static volume spray', en:'Absolute 4Poodle - The best anti-static volume spray', sr:'Absolute 4Poodle - The best anti-static volume spray' },
    description:{ ru:'ABSOLUTE 4POODLE is the Special One anti-static conditioning finishing spray, dedicated to all hair types with volume or those needing to be straightened. Its precious formula — enriched with cashm...', en:'ABSOLUTE 4POODLE is the Special One anti-static conditioning finishing spray, dedicated to all hair types with volume or those needing to be straightened. Its precious formula — enriched with cashm...', sr:'ABSOLUTE 4POODLE is the Special One anti-static conditioning finishing spray, dedicated to all hair types with volume or those needing to be straightened. Its precious formula — enriched with cashm...' },
    price:59, image:'images/409.png', images:['images/409.png','images/410.png','images/411.png'],
    rating:4.8, cosType:'spray', variants:[{name:'250 mL',price:59},{name:'1 Liter',price:140}] },
  { id:'keratine-pro-shampoing-texture-epilation', category:'cosmetics', section:'best-sellers',
    name:{ ru:'KERATINE PRO, texture shampoo +++', en:'KERATINE PRO, texture shampoo +++', sr:'KERATINE PRO, texture shampoo +++' },
    description:{ ru:'KERATIN PRO is the Special One texturizing and hardening shampoo, to be used in very specific situations : Post-bath hair removal, revealing natural volume, enhancing hair texture. A precision tool...', en:'KERATIN PRO is the Special One texturizing and hardening shampoo, to be used in very specific situations : Post-bath hair removal, revealing natural volume, enhancing hair texture. A precision tool...', sr:'KERATIN PRO is the Special One texturizing and hardening shampoo, to be used in very specific situations : Post-bath hair removal, revealing natural volume, enhancing hair texture. A precision tool...' },
    price:63, image:'images/412.png', images:['images/412.png','images/413.jpg','images/414.jpg','images/415.jpg'],
    rating:4.8, cosType:'shampoo', variants:[{name:'1 Litre',price:63},{name:'5 Litres',price:170},{name:'250 mL',price:33}] },
  { id:'skincare-pro-shampoo-treatment-care', category:'cosmetics', section:'',
    name:{ ru:'SKINCARE pro, treatment shampoo', en:'SKINCARE pro, treatment shampoo', sr:'SKINCARE pro, treatment shampoo' },
    description:{ ru:'SKINCARE PRO is the Special One oil-based dermo-cleansing shampoo, specifically formulated for problem or delicate skin . It restores the balance of the dermis and hair, restores the natural produc...', en:'SKINCARE PRO is the Special One oil-based dermo-cleansing shampoo, specifically formulated for problem or delicate skin . It restores the balance of the dermis and hair, restores the natural produc...', sr:'SKINCARE PRO is the Special One oil-based dermo-cleansing shampoo, specifically formulated for problem or delicate skin . It restores the balance of the dermis and hair, restores the natural produc...' },
    price:96, image:'images/417.png', images:['images/417.png','images/418.png','images/419.jpg','images/420.jpg'],
    rating:4.8, cosType:'shampoo', variants:[{name:'1 Liter',price:96},{name:'5 Liters',price:291},{name:'250 mL',price:51}] },
  { id:'aquarosa-passion-special-one', category:'cosmetics', section:'best-sellers',
    name:{ ru:'Aquarosa PASSION Pro * Glitter *', en:'Aquarosa PASSION Pro * Glitter *', sr:'Aquarosa PASSION Pro * Glitter *' },
    description:{ ru:'AQUAROSA PASSION It was created for true enthusiasts. 95% identical to the Aquarosa Pro — same multivitamin formula, same effectiveness — plus a rich and silky creamy texture, a delicate and envelo...', en:'AQUAROSA PASSION It was created for true enthusiasts. 95% identical to the Aquarosa Pro — same multivitamin formula, same effectiveness — plus a rich and silky creamy texture, a delicate and envelo...', sr:'AQUAROSA PASSION It was created for true enthusiasts. 95% identical to the Aquarosa Pro — same multivitamin formula, same effectiveness — plus a rich and silky creamy texture, a delicate and envelo...' },
    price:39, image:'images/421.png', images:['images/421.png','images/422.png','images/423.jpg'],
    rating:4.8, cosType:'shampoo', variants:[{name:'250 mL',price:39},{name:'5 L',price:222}] },
  { id:'style-360-spray-volume', category:'cosmetics', section:'',
    name:{ ru:'STYLE 360, volume spray', en:'STYLE 360, volume spray', sr:'STYLE 360, volume spray' },
    description:{ ru:'STYLE 360 is the very first conditioner in the Special One range — a classic with a particularly technical formulation. Designed for maximize the volume of all furs While eliminating static electri...', en:'STYLE 360 is the very first conditioner in the Special One range — a classic with a particularly technical formulation. Designed for maximize the volume of all furs While eliminating static electri...', sr:'STYLE 360 is the very first conditioner in the Special One range — a classic with a particularly technical formulation. Designed for maximize the volume of all furs While eliminating static electri...' },
    price:133, image:'images/424.png', images:['images/424.png','images/425.png','images/426.png'],
    rating:4.8, cosType:'spray', variants:[{name:'1 Litre',price:133},{name:'200 mL',price:67}] },
  { id:'special-rinse-shampoing-sans-rincage', category:'cosmetics', section:'best-sellers',
    name:{ ru:'Special Rinse, "leave-in" shampoo', en:'Special Rinse, "leave-in" shampoo', sr:'Special Rinse, "leave-in" shampoo' },
    description:{ ru:'Shampoo WITHOUT RINSE, ideal for removing traces and other organic soiling. Odors also disappear instantly. Who is this product made for? Everyone will find a real interest in it! ☑️ Groomers ☑️ Br...', en:'Shampoo WITHOUT RINSE, ideal for removing traces and other organic soiling. Odors also disappear instantly. Who is this product made for? Everyone will find a real interest in it! ☑️ Groomers ☑️ Br...', sr:'Shampoo WITHOUT RINSE, ideal for removing traces and other organic soiling. Odors also disappear instantly. Who is this product made for? Everyone will find a real interest in it! ☑️ Groomers ☑️ Br...' },
    price:66, image:'images/427.png', images:['images/427.png','images/428.jpg'],
    rating:4.8, cosType:'shampoo', variants:[{name:'1 Litre',price:66},{name:'250 mL',price:30}] },
  { id:'aquaterme-argile-verte', category:'cosmetics', section:'',
    name:{ ru:'AQUA TERME PRO, clay care shampoo', en:'AQUA TERME PRO, clay care shampoo', sr:'AQUA TERME PRO, clay care shampoo' },
    description:{ ru:'AQUA TERME PRO Special One is a professional shampoo formulated with green clay and mint, designed for skin requiring a treatment action. purifies and deeply cleanses while respecting the hydrolipi...', en:'AQUA TERME PRO Special One is a professional shampoo formulated with green clay and mint, designed for skin requiring a treatment action. purifies and deeply cleanses while respecting the hydrolipi...', sr:'AQUA TERME PRO Special One is a professional shampoo formulated with green clay and mint, designed for skin requiring a treatment action. purifies and deeply cleanses while respecting the hydrolipi...' },
    price:77, image:'images/429.png', images:['images/429.png','images/430.png','images/431.png'],
    rating:4.8, cosType:'shampoo', variants:[{name:'1 Litre',price:77},{name:'5 Litres',price:216}] },
  { id:'tech-in-color-raviveur-de-couleurs', category:'cosmetics', section:'best-sellers',
    name:{ ru:'TECH IN COLOR, color reviver', en:'TECH IN COLOR, color reviver', sr:'TECH IN COLOR, color reviver' },
    description:{ ru:'TECH IN COLOR is the professional treatment from Special One for enhance the natural color of the dress . His natural pigments interact with the keratin structures of the hair to prolong shine unti...', en:'TECH IN COLOR is the professional treatment from Special One for enhance the natural color of the dress . His natural pigments interact with the keratin structures of the hair to prolong shine unti...', sr:'TECH IN COLOR is the professional treatment from Special One for enhance the natural color of the dress . His natural pigments interact with the keratin structures of the hair to prolong shine unti...' },
    price:76, image:'images/432.png', images:['images/432.png','images/433.png','images/434.jpg','images/435.jpg','images/436.jpg'],
    rating:4.8, cosType:'other', variants:[{name:'A - WHITE/TWO-COLOR/TRICO COAT',price:76},{name:'B - BLACK/GREY COAT',price:76},{name:'C - APRICOT/FAUVE COAT',price:76},{name:'D - BROWN COAT, RUBY',price:76},{name:'E - CREAM/BLOND COAT',price:76}] },
  { id:'beauty-rinse-reequilibreur-de-ph', category:'cosmetics', section:'',
    name:{ ru:'BEAUTY RINSE, pH rebalancing', en:'BEAUTY RINSE, pH rebalancing', sr:'BEAUTY RINSE, pH rebalancing' },
    description:{ ru:'Hydrogen potential rebalancing lotion: cleanse the skin, force the scales to close, prevent the return of knots, air the hair. Who is this product for? Everyone will find it of real interest! ☑️ Gr...', en:'Hydrogen potential rebalancing lotion: cleanse the skin, force the scales to close, prevent the return of knots, air the hair. Who is this product for? Everyone will find it of real interest! ☑️ Gr...', sr:'Hydrogen potential rebalancing lotion: cleanse the skin, force the scales to close, prevent the return of knots, air the hair. Who is this product for? Everyone will find it of real interest! ☑️ Gr...' },
    price:35, image:'images/437.png', images:['images/437.png','images/438.png','images/439.jpg','images/440.jpg'],
    rating:4.8, cosType:'spray', variants:[{name:'250 mL',price:35},{name:'1 Litre',price:69},{name:'5 Litres',price:174}] },
  { id:'aqua-oto-hygiene-des-oreilles', category:'cosmetics', section:'best-sellers',
    name:{ ru:'AQUA OTO Ear Hygiene', en:'AQUA OTO Ear Hygiene', sr:'AQUA OTO Ear Hygiene' },
    description:{ ru:'AQUA OTO is a specific lotion for ear cleaning, but also for the prevention of blockages and infections. Who is this product for? Everyone will find something of real interest in it! ☑️ Groomers ☑️...', en:'AQUA OTO is a specific lotion for ear cleaning, but also for the prevention of blockages and infections. Who is this product for? Everyone will find something of real interest in it! ☑️ Groomers ☑️...', sr:'AQUA OTO is a specific lotion for ear cleaning, but also for the prevention of blockages and infections. Who is this product for? Everyone will find something of real interest in it! ☑️ Groomers ☑️...' },
    price:43, image:'images/441.png',
    rating:4.8, cosType:'other', dimensions:['150 mL'] },
  { id:'multifix-fluide-modelant', category:'cosmetics', section:'',
    name:{ ru:'MULTIFIX, modeling fluid', en:'MULTIFIX, modeling fluid', sr:'MULTIFIX, modeling fluid' },
    description:{ ru:'MULTIFIX is Special One\'s professional modeling fluid for create and maintain long-lasting hairstyles — smooth or curly effect. Thanks to its water-soluble film with memory effect , It protects the...', en:'MULTIFIX is Special One\'s professional modeling fluid for create and maintain long-lasting hairstyles — smooth or curly effect. Thanks to its water-soluble film with memory effect , It protects the...', sr:'MULTIFIX is Special One\'s professional modeling fluid for create and maintain long-lasting hairstyles — smooth or curly effect. Thanks to its water-soluble film with memory effect , It protects the...' },
    price:63, image:'images/442.jpg',
    rating:4.8, cosType:'spray', dimensions:['200 mL'] },
  { id:'blue-sky-pro-bamboo-10-l', category:'cosmetics', section:'best-sellers',
    name:{ ru:'Blue Sky Pro (Bamboo) 10 L', en:'Blue Sky Pro (Bamboo) 10 L', sr:'Blue Sky Pro (Bamboo) 10 L' },
    description:{ ru:'Blue Sky Pro Bamboo – Special One | Product Sheet BLUE SKY PRO BAMBOO is the Special One multitasking shampoo enriched with bamboo marrow extract. Warning: this is not simply a scented version of t...', en:'Blue Sky Pro Bamboo – Special One | Product Sheet BLUE SKY PRO BAMBOO is the Special One multitasking shampoo enriched with bamboo marrow extract. Warning: this is not simply a scented version of t...', sr:'Blue Sky Pro Bamboo – Special One | Product Sheet BLUE SKY PRO BAMBOO is the Special One multitasking shampoo enriched with bamboo marrow extract. Warning: this is not simply a scented version of t...' },
    price:247, image:'images/443.png', images:['images/443.png','images/444.jpg'],
    rating:4.8, cosType:'shampoo' },
  { id:'hair-strip-ear-powder', category:'cosmetics', section:'',
    name:{ ru:'Hair Strip, Ear Powder', en:'Hair Strip, Ear Powder', sr:'Hair Strip, Ear Powder' },
    description:{ ru:'Powder used during ear waxing - ear hygiene Who is this product made for? Everyone will find a real interest in it! ☑️ Groomers ☑️ Breeders ☑️ Individuals ☑️ Competitors ☑️ Handlers ✨ HAIR STRIP is...', en:'Powder used during ear waxing - ear hygiene Who is this product made for? Everyone will find a real interest in it! ☑️ Groomers ☑️ Breeders ☑️ Individuals ☑️ Competitors ☑️ Handlers ✨ HAIR STRIP is...', sr:'Powder used during ear waxing - ear hygiene Who is this product made for? Everyone will find a real interest in it! ☑️ Groomers ☑️ Breeders ☑️ Individuals ☑️ Competitors ☑️ Handlers ✨ HAIR STRIP is...' },
    price:22, image:'images/445.png',
    rating:4.8, cosType:'other' },
  { id:'laque-brillance-final-fix-soft-ecologiqu', category:'cosmetics', section:'best-sellers',
    name:{ ru:'FINAL FIX SOFT Ecological Shine Lacquer', en:'FINAL FIX SOFT Ecological Shine Lacquer', sr:'FINAL FIX SOFT Ecological Shine Lacquer' },
    description:{ ru:'Light hold hairspray to provide hold and texture without any stiffness. Residue-free and safe for the hair. FINAL FIX SOFT ECOLOGIC is an eco-friendly, gas-free hairspray that will give shine, hold...', en:'Light hold hairspray to provide hold and texture without any stiffness. Residue-free and safe for the hair. FINAL FIX SOFT ECOLOGIC is an eco-friendly, gas-free hairspray that will give shine, hold...', sr:'Light hold hairspray to provide hold and texture without any stiffness. Residue-free and safe for the hair. FINAL FIX SOFT ECOLOGIC is an eco-friendly, gas-free hairspray that will give shine, hold...' },
    price:42, image:'images/446.png',
    rating:4.8, cosType:'spray', dimensions:['200mL'] },
  { id:'masque-toilettage-argile-verte', category:'cosmetics', section:'',
    name:{ ru:'DETOX THERAPY pre-bath mask with green clay', en:'DETOX THERAPY pre-bath mask with green clay', sr:'DETOX THERAPY pre-bath mask with green clay' },
    description:{ ru:'Detox Therapy – Special One | Product Sheet DETOX THERAPY is the Special One professional pre-bath mask formulated with green clay — the "land that heals a thousand ills" — to act against the main ...', en:'Detox Therapy – Special One | Product Sheet DETOX THERAPY is the Special One professional pre-bath mask formulated with green clay — the "land that heals a thousand ills" — to act against the main ...', sr:'Detox Therapy – Special One | Product Sheet DETOX THERAPY is the Special One professional pre-bath mask formulated with green clay — the "land that heals a thousand ills" — to act against the main ...' },
    price:229, image:'images/447.png', images:['images/447.png','images/448.png','images/449.png'],
    rating:4.8, cosType:'mask', variants:[{name:'5 Litres',price:229},{name:'1 Litre',price:78}] },
  { id:'parfum-de-luxe-by-special-one', category:'cosmetics', section:'best-sellers',
    name:{ ru:'Luxury Perfume, by Special One', en:'Luxury Perfume, by Special One', sr:'Luxury Perfume, by Special One' },
    description:{ ru:'Pet perfumes, high-end Special One PERFUME LINE , by Special One A complete line of high-end perfumes, for dogs and cats, created in Grasse. Built with passion and refinement, offer your animals a ...', en:'Pet perfumes, high-end Special One PERFUME LINE , by Special One A complete line of high-end perfumes, for dogs and cats, created in Grasse. Built with passion and refinement, offer your animals a ...', sr:'Pet perfumes, high-end Special One PERFUME LINE , by Special One A complete line of high-end perfumes, for dogs and cats, created in Grasse. Built with passion and refinement, offer your animals a ...' },
    price:75, image:'images/451.jpg', images:['images/451.jpg','images/452.jpg','images/453.jpg','images/454.jpg','images/455.jpg'],
    rating:4.8, cosType:'spray', variants:[{name:'Spring Water',price:75},{name:'Brave Water',price:75},{name:'Energy Water',price:75},{name:'Moon Water',price:75},{name:'Rock Water',price:75},{name:'L’è Bell',price:75},{name:'Kikinsci',price:75}] },
  { id:'aqua-vita-le-pouvoir-de-la-cryotherapie', category:'cosmetics', section:'',
    name:{ ru:'AQUA VITA, le pouvoir de  la cryothérapie *nouveau*', en:'AQUA VITA, le pouvoir de  la cryothérapie *nouveau*', sr:'AQUA VITA, le pouvoir de  la cryothérapie *nouveau*' },
    description:{ ru:'AQUA VITA – CRIO THERAPY est le produit de beauté innovant Special One aux actifs certifiés BIO — aloès, marron d\'Inde et vitamine C. Une vraie révolution dans le toilettage professionnel : sa mous...', en:'AQUA VITA – CRIO THERAPY est le produit de beauté innovant Special One aux actifs certifiés BIO — aloès, marron d\'Inde et vitamine C. Une vraie révolution dans le toilettage professionnel : sa mous...', sr:'AQUA VITA – CRIO THERAPY est le produit de beauté innovant Special One aux actifs certifiés BIO — aloès, marron d\'Inde et vitamine C. Une vraie révolution dans le toilettage professionnel : sa mous...' },
    price:30, image:'images/456.png', images:['images/456.png','images/457.png','images/458.jpg','images/459.png'],
    rating:4.8, cosType:'serum' },
  { id:'lacquer-final-fix-strong-gaz', category:'cosmetics', section:'best-sellers',
    name:{ ru:'FINAL FIX STRONG Gas Lacquer', en:'FINAL FIX STRONG Gas Lacquer', sr:'FINAL FIX STRONG Gas Lacquer' },
    description:{ ru:'AEROSOL LACQUER is the Special One professional lacquer strong fixing and micro-fine diffusion for an invisible result. Maximum volume, maximum hold — without weighing hair down, without residue. T...', en:'AEROSOL LACQUER is the Special One professional lacquer strong fixing and micro-fine diffusion for an invisible result. Maximum volume, maximum hold — without weighing hair down, without residue. T...', sr:'AEROSOL LACQUER is the Special One professional lacquer strong fixing and micro-fine diffusion for an invisible result. Maximum volume, maximum hold — without weighing hair down, without residue. T...' },
    price:38, image:'images/460.png',
    rating:4.8, cosType:'spray', dimensions:['500mL'] },
  { id:'laque-final-fix-strong-ecologique', category:'cosmetics', section:'',
    name:{ ru:'FINAL FIX STRONG Ecological Lacquer', en:'FINAL FIX STRONG Ecological Lacquer', sr:'FINAL FIX STRONG Ecological Lacquer' },
    description:{ ru:'Strong hold hairspray to lock in fur. Residue-free, safe for the hair. FINAL FIX STRONG ECOLOGIC: Strong and fast hold, dries quickly, easy to remove with a brush, leaves no residue. Ideal for appl...', en:'Strong hold hairspray to lock in fur. Residue-free, safe for the hair. FINAL FIX STRONG ECOLOGIC: Strong and fast hold, dries quickly, easy to remove with a brush, leaves no residue. Ideal for appl...', sr:'Strong hold hairspray to lock in fur. Residue-free, safe for the hair. FINAL FIX STRONG ECOLOGIC: Strong and fast hold, dries quickly, easy to remove with a brush, leaves no residue. Ideal for appl...' },
    price:46, image:'images/461.png',
    rating:4.8, cosType:'spray', dimensions:['200mL'] },
  { id:'huiles-essentielles-chien-special-one', category:'cosmetics', section:'best-sellers',
    name:{ ru:'Calming Mix - MARI PINTAU - Essential Oils from Sardinia', en:'Calming Mix - MARI PINTAU - Essential Oils from Sardinia', sr:'Calming Mix - MARI PINTAU - Essential Oils from Sardinia' },
    description:{ ru:'MARI PINTAU (Sardinia Blend) - Calming This cleansing oil Professional Special One dedicated to furs in high need of be nourished and soothed. It helps soothe redness and agitated and nervous subje...', en:'MARI PINTAU (Sardinia Blend) - Calming This cleansing oil Professional Special One dedicated to furs in high need of be nourished and soothed. It helps soothe redness and agitated and nervous subje...', sr:'MARI PINTAU (Sardinia Blend) - Calming This cleansing oil Professional Special One dedicated to furs in high need of be nourished and soothed. It helps soothe redness and agitated and nervous subje...' },
    price:100, image:'images/462.png',
    rating:4.8, cosType:'shampoo', dimensions:['500 mL'] },
  { id:'model-cream-creme-d-accroche-pour-blanch', category:'cosmetics', section:'',
    name:{ ru:'MODEL CREAM, bonding cream for whitening', en:'MODEL CREAM, bonding cream for whitening', sr:'MODEL CREAM, bonding cream for whitening' },
    description:{ ru:'✨Hair whitening cream✨ Who is this product for? Everyone will find something of real interest in it! ✅ Groomers ✅ Livestock farmers ✅ Individuals ✅ Competitors ✅ Handlers What benefits can I expect...', en:'✨Hair whitening cream✨ Who is this product for? Everyone will find something of real interest in it! ✅ Groomers ✅ Livestock farmers ✅ Individuals ✅ Competitors ✅ Handlers What benefits can I expect...', sr:'✨Hair whitening cream✨ Who is this product for? Everyone will find something of real interest in it! ✅ Groomers ✅ Livestock farmers ✅ Individuals ✅ Competitors ✅ Handlers What benefits can I expect...' },
    price:90, image:'images/463.png',
    rating:4.8, cosType:'mask', dimensions:['500mL'] },
  { id:'soft-grooming-powder-poudre-blanche', category:'cosmetics', section:'best-sellers',
    name:{ ru:'SOFT GROOMING POWDER, white powder', en:'SOFT GROOMING POWDER, white powder', sr:'SOFT GROOMING POWDER, white powder' },
    description:{ ru:'SOFT GROOMING POWDER is the impalpable white powder that we recommend for whitening the coat . Who is this product for? Everyone will find it of real interest! ☑️ Groomers ☑️ Breeders ☑️ Individual...', en:'SOFT GROOMING POWDER is the impalpable white powder that we recommend for whitening the coat . Who is this product for? Everyone will find it of real interest! ☑️ Groomers ☑️ Breeders ☑️ Individual...', sr:'SOFT GROOMING POWDER is the impalpable white powder that we recommend for whitening the coat . Who is this product for? Everyone will find it of real interest! ☑️ Groomers ☑️ Breeders ☑️ Individual...' },
    price:70, image:'images/464.png', images:['images/464.png','images/465.png','images/466.jpg'],
    rating:4.8, cosType:'other', dimensions:['250 grammes'] },
  { id:'trim-grooming-powder', category:'cosmetics', section:'',
    name:{ ru:'TRIM GROOMING POWDER', en:'TRIM GROOMING POWDER', sr:'TRIM GROOMING POWDER' },
    description:{ ru:'Trim Growing Powder is a professional powder specially formulated to whiten and prepare the coat for bleaching. hair removal . Who is this product for? Everyone will find something of real interest...', en:'Trim Growing Powder is a professional powder specially formulated to whiten and prepare the coat for bleaching. hair removal . Who is this product for? Everyone will find something of real interest...', sr:'Trim Growing Powder is a professional powder specially formulated to whiten and prepare the coat for bleaching. hair removal . Who is this product for? Everyone will find something of real interest...' },
    price:49, image:'images/467.jpg',
    rating:4.8, cosType:'spray', dimensions:['75 grams'] },
  { id:'huiles-essentielles-chien-special-one-2', category:'cosmetics', section:'best-sellers',
    name:{ ru:'Purifying Mix - SATURNIA - Tuscan Essential Oils', en:'Purifying Mix - SATURNIA - Tuscan Essential Oils', sr:'Purifying Mix - SATURNIA - Tuscan Essential Oils' },
    description:{ ru:'SATURNIA (Tuscan Blend) - Purifying This cleansing oil Professional Special One An energizing blend of essential oils, formulated to deeply purify your pet\'s skin. . Who is this product for? Everyo...', en:'SATURNIA (Tuscan Blend) - Purifying This cleansing oil Professional Special One An energizing blend of essential oils, formulated to deeply purify your pet\'s skin. . Who is this product for? Everyo...', sr:'SATURNIA (Tuscan Blend) - Purifying This cleansing oil Professional Special One An energizing blend of essential oils, formulated to deeply purify your pet\'s skin. . Who is this product for? Everyo...' },
    price:100, image:'images/468.png',
    rating:4.8, cosType:'shampoo', dimensions:['500mL'] },
  { id:'huiles-essentielles-chien-special-one-1', category:'cosmetics', section:'',
    name:{ ru:'Toning Mix - PORTOFINO - Essential Oils from Liguria', en:'Toning Mix - PORTOFINO - Essential Oils from Liguria', sr:'Toning Mix - PORTOFINO - Essential Oils from Liguria' },
    description:{ ru:'PORTOFINO (Ligurian Blend) - Toning This Professional Special One washing oil is dedicated to coats in dire need of invigoration. Suitable for duller coats and dehydrated skin, it calms agitated an...', en:'PORTOFINO (Ligurian Blend) - Toning This Professional Special One washing oil is dedicated to coats in dire need of invigoration. Suitable for duller coats and dehydrated skin, it calms agitated an...', sr:'PORTOFINO (Ligurian Blend) - Toning This Professional Special One washing oil is dedicated to coats in dire need of invigoration. Suitable for duller coats and dehydrated skin, it calms agitated an...' },
    price:100, image:'images/469.png',
    rating:4.8, cosType:'shampoo', dimensions:['500 mL'] },
  { id:'huiles-essentielles-chien-special-one-3', category:'cosmetics', section:'best-sellers',
    name:{ ru:'Energizing Mix - ROCCALUMERA - Essential Oils of Sicily', en:'Energizing Mix - ROCCALUMERA - Essential Oils of Sicily', sr:'Energizing Mix - ROCCALUMERA - Essential Oils of Sicily' },
    description:{ ru:'ROCCALUMERA (Sicilian Blend) - Energizing This cleansing oil Professional Special One An energizing treatment which, thanks to the active ingredients of Sicilian fruits, restores strength and shine...', en:'ROCCALUMERA (Sicilian Blend) - Energizing This cleansing oil Professional Special One An energizing treatment which, thanks to the active ingredients of Sicilian fruits, restores strength and shine...', sr:'ROCCALUMERA (Sicilian Blend) - Energizing This cleansing oil Professional Special One An energizing treatment which, thanks to the active ingredients of Sicilian fruits, restores strength and shine...' },
    price:100, image:'images/470.png',
    rating:4.8, cosType:'shampoo', dimensions:['500mL'] },
  { id:'amantea-spray-mix-no-stress', category:'cosmetics', section:'',
    name:{ ru:'AMANTEA - Spray - Mix No Stress', en:'AMANTEA - Spray - Mix No Stress', sr:'AMANTEA - Spray - Mix No Stress' },
    description:{ ru:'Plongez dans notre dernière création aromathérapeutique... elle est absolument magique, un véritable cocon de tranquillité... nous sommes littéralement transportés ! Son nom ? AMANTEA - ACQUA PROFU...', en:'Plongez dans notre dernière création aromathérapeutique... elle est absolument magique, un véritable cocon de tranquillité... nous sommes littéralement transportés ! Son nom ? AMANTEA - ACQUA PROFU...', sr:'Plongez dans notre dernière création aromathérapeutique... elle est absolument magique, un véritable cocon de tranquillité... nous sommes littéralement transportés ! Son nom ? AMANTEA - ACQUA PROFU...' },
    price:40, image:'images/471.jpg',
    rating:4.8, cosType:'shampoo' },
  { id:'positano-spray-mix-bien-etre', category:'cosmetics', section:'best-sellers',
    name:{ ru:'POSITANO - Spray -  Mix Bien-être', en:'POSITANO - Spray -  Mix Bien-être', sr:'POSITANO - Spray -  Mix Bien-être' },
    description:{ ru:'Découvrez notre création aromathérapeutique exceptionnelle... elle est absolument divine, un véritable talisman de voyage... nous sommes complètement sous le charme ! Son nom ? POSITANO - ACQUA PRO...', en:'Découvrez notre création aromathérapeutique exceptionnelle... elle est absolument divine, un véritable talisman de voyage... nous sommes complètement sous le charme ! Son nom ? POSITANO - ACQUA PRO...', sr:'Découvrez notre création aromathérapeutique exceptionnelle... elle est absolument divine, un véritable talisman de voyage... nous sommes complètement sous le charme ! Son nom ? POSITANO - ACQUA PRO...' },
    price:40, image:'images/472.jpg',
    rating:4.8, cosType:'shampoo' },
  { id:'amantea-mix-anti-stress', category:'cosmetics', section:'',
    name:{ ru:'AMANTEA - Mix Anti Stress', en:'AMANTEA - Mix Anti Stress', sr:'AMANTEA - Mix Anti Stress' },
    description:{ ru:'Découvrez notre toute dernière pépite aromatique... elle est absolument envoûtante, un véritable sanctuaire de sérénité... nous en sommes totalement émerveillés ! Son nom ? AMANTEA ! Amantea = Mix ...', en:'Découvrez notre toute dernière pépite aromatique... elle est absolument envoûtante, un véritable sanctuaire de sérénité... nous en sommes totalement émerveillés ! Son nom ? AMANTEA ! Amantea = Mix ...', sr:'Découvrez notre toute dernière pépite aromatique... elle est absolument envoûtante, un véritable sanctuaire de sérénité... nous en sommes totalement émerveillés ! Son nom ? AMANTEA ! Amantea = Mix ...' },
    price:40, image:'images/473.jpg',
    rating:4.8, cosType:'shampoo' },
  { id:'la-maddalena-spray-eau-parfumee-mix-puri', category:'cosmetics', section:'best-sellers',
    name:{ ru:'LA MADDALENA - Spray - Mix Purifiant', en:'LA MADDALENA - Spray - Mix Purifiant', sr:'LA MADDALENA - Spray - Mix Purifiant' },
    description:{ ru:'Notre nouvelle création aromatique est arrivée... elle est absolument exceptionnelle, une véritable révolution olfactive... on en est complètement conquis ! Son nom ? LA MADDALENA - ACQUA PROFUMATA...', en:'Notre nouvelle création aromatique est arrivée... elle est absolument exceptionnelle, une véritable révolution olfactive... on en est complètement conquis ! Son nom ? LA MADDALENA - ACQUA PROFUMATA...', sr:'Notre nouvelle création aromatique est arrivée... elle est absolument exceptionnelle, une véritable révolution olfactive... on en est complètement conquis ! Son nom ? LA MADDALENA - ACQUA PROFUMATA...' },
    price:37, image:'images/474.jpg',
    rating:4.8, cosType:'shampoo' },
  { id:'ostuni-spray-mix-douce-nuit', category:'cosmetics', section:'',
    name:{ ru:'OSTUNI - Spray -  Mix Douce Nuit', en:'OSTUNI - Spray -  Mix Douce Nuit', sr:'OSTUNI - Spray -  Mix Douce Nuit' },
    description:{ ru:'Immergez-vous dans notre création nocturne par excellence... elle est absolument féerique, un véritable voyage sous les étoiles méditerranéennes... nous en sommes complètement captivés ! Son nom ? ...', en:'Immergez-vous dans notre création nocturne par excellence... elle est absolument féerique, un véritable voyage sous les étoiles méditerranéennes... nous en sommes complètement captivés ! Son nom ? ...', sr:'Immergez-vous dans notre création nocturne par excellence... elle est absolument féerique, un véritable voyage sous les étoiles méditerranéennes... nous en sommes complètement captivés ! Son nom ? ...' },
    price:40, image:'images/475.jpg',
    rating:4.8, cosType:'shampoo' },
  { id:'ostuni-mix-douce-nuit', category:'cosmetics', section:'best-sellers',
    name:{ ru:'OSTUNI - Mix Douce-Nuit', en:'OSTUNI - Mix Douce-Nuit', sr:'OSTUNI - Mix Douce-Nuit' },
    description:{ ru:'Laissez-vous envelopper par notre nouvelle création nocturne... elle est absolument enchanteresse, un véritable cocon de douceur... nous en sommes totalement émerveillés ! Son nom ? OSTUNI ! Ostuni...', en:'Laissez-vous envelopper par notre nouvelle création nocturne... elle est absolument enchanteresse, un véritable cocon de douceur... nous en sommes totalement émerveillés ! Son nom ? OSTUNI ! Ostuni...', sr:'Laissez-vous envelopper par notre nouvelle création nocturne... elle est absolument enchanteresse, un véritable cocon de douceur... nous en sommes totalement émerveillés ! Son nom ? OSTUNI ! Ostuni...' },
    price:40, image:'images/476.jpg',
    rating:4.8, cosType:'shampoo' },
  { id:'positano-mix-bien-etre', category:'cosmetics', section:'',
    name:{ ru:'POSITANO - Mix Bien-être', en:'POSITANO - Mix Bien-être', sr:'POSITANO - Mix Bien-être' },
    description:{ ru:'Voici notre nouvelle pépite olfactive... elle est absolument prodigieuse, un véritable élixir de confort... nous en sommes profondément enthousiasmés ! Son nom ? POSITANO ! Positano = Mix Bien-Être...', en:'Voici notre nouvelle pépite olfactive... elle est absolument prodigieuse, un véritable élixir de confort... nous en sommes profondément enthousiasmés ! Son nom ? POSITANO ! Positano = Mix Bien-Être...', sr:'Voici notre nouvelle pépite olfactive... elle est absolument prodigieuse, un véritable élixir de confort... nous en sommes profondément enthousiasmés ! Son nom ? POSITANO ! Positano = Mix Bien-Être...' },
    price:40, image:'images/477.jpg',
    rating:4.8, cosType:'shampoo' },
  { id:'la-maddalena-mix-purifiant', category:'cosmetics', section:'best-sellers',
    name:{ ru:'LA MADDALENA - Mix Purifiant', en:'LA MADDALENA - Mix Purifiant', sr:'LA MADDALENA - Mix Purifiant' },
    description:{ ru:'Notre nouvelle création aromatique est arrivée... elle est absolument rafraîchissante, une véritable symphonie purifiante... on en est complètement transporté ! Son nom ? LA MADDALENA ! La Maddalen...', en:'Notre nouvelle création aromatique est arrivée... elle est absolument rafraîchissante, une véritable symphonie purifiante... on en est complètement transporté ! Son nom ? LA MADDALENA ! La Maddalen...', sr:'Notre nouvelle création aromatique est arrivée... elle est absolument rafraîchissante, une véritable symphonie purifiante... on en est complètement transporté ! Son nom ? LA MADDALENA ! La Maddalen...' },
    price:40, image:'images/478.jpg',
    rating:4.8, cosType:'shampoo' },

  { id:'microfiber-mat-2', category:'beds', section:'',
    name:{ ru:'Microfiber mat', en:'Microfiber mat', sr:'Microfiber mat' },
    description:{ ru:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', en:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', sr:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...' },
    price:42, image:'images/177.jpg', images:['images/177.jpg','images/178.jpg','images/179.jpg','images/180.jpg','images/181.jpg'],
    rating:4.8, dimensions:['Bleu'] },
  { id:'microfiber-mat-4', category:'beds', section:'',
    name:{ ru:'Microfiber mat', en:'Microfiber mat', sr:'Microfiber mat' },
    description:{ ru:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', en:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', sr:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...' },
    price:28, image:'images/185.jpg', images:['images/185.jpg','images/186.jpg','images/187.jpg'],
    rating:4.8, dimensions:['PETIT','MOYEN','GRAND'] },
  { id:'microfiber-mat-5', category:'beds', section:'',
    name:{ ru:'Microfiber mat', en:'Microfiber mat', sr:'Microfiber mat' },
    description:{ ru:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', en:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', sr:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...' },
    price:150, image:'images/195.jpg', images:['images/195.jpg','images/196.jpg','images/197.jpg','images/198.jpg','images/199.jpg'],
    rating:4.8 },
  { id:'microfiber-mat-6', category:'beds', section:'',
    name:{ ru:'Microfiber mat', en:'Microfiber mat', sr:'Microfiber mat' },
    description:{ ru:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', en:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', sr:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...' },
    price:31, image:'images/200.jpg', images:['images/200.jpg','images/201.jpg','images/202.jpg','images/203.jpg','images/204.jpg'],
    rating:4.8, dimensions:['PETIT','MOYEN','GRAND'] },
  { id:'microfiber-mat-7', category:'beds', section:'',
    name:{ ru:'Microfiber mat', en:'Microfiber mat', sr:'Microfiber mat' },
    description:{ ru:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', en:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', sr:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...' },
    price:67, image:'images/236.jpg',
    rating:4.8 },
  { id:'microfiber-mat-8', category:'beds', section:'',
    name:{ ru:'Microfiber mat', en:'Microfiber mat', sr:'Microfiber mat' },
    description:{ ru:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', en:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', sr:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...' },
    price:64, image:'images/237.jpg', images:['images/237.jpg','images/238.jpg','images/239.jpg'],
    rating:4.8 },
  { id:'microfiber-mat-9', category:'beds', section:'',
    name:{ ru:'Microfiber mat', en:'Microfiber mat', sr:'Microfiber mat' },
    description:{ ru:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', en:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', sr:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...' },
    price:165, image:'images/240.jpg', images:['images/240.jpg','images/241.jpg','images/242.jpg','images/243.jpg','images/244.jpg'],
    rating:4.8, dimensions:['PETIT','GRAND'] },
  { id:'microfiber-mat-10', category:'beds', section:'',
    name:{ ru:'Microfiber mat', en:'Microfiber mat', sr:'Microfiber mat' },
    description:{ ru:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', en:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', sr:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...' },
    price:74, image:'images/245.jpg', images:['images/245.jpg','images/246.jpg','images/247.jpg','images/248.jpg','images/249.jpg'],
    rating:4.8, dimensions:['PETIT','GRAND'] },
  { id:'microfiber-mat-11', category:'beds', section:'',
    name:{ ru:'Microfiber mat', en:'Microfiber mat', sr:'Microfiber mat' },
    description:{ ru:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', en:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', sr:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...' },
    price:65, image:'images/250.jpg', images:['images/250.jpg','images/251.jpg','images/252.jpg','images/253.jpg','images/254.jpg'],
    rating:4.8, dimensions:['PETIT','GRAND'] },
  { id:'microfiber-mat-12', category:'beds', section:'',
    name:{ ru:'Microfiber mat', en:'Microfiber mat', sr:'Microfiber mat' },
    description:{ ru:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', en:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', sr:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...' },
    price:40, image:'images/255.jpg', images:['images/255.jpg','images/256.jpg','images/257.jpg'],
    rating:4.8 },
  { id:'microfiber-mat-13', category:'beds', section:'',
    name:{ ru:'Microfiber mat', en:'Microfiber mat', sr:'Microfiber mat' },
    description:{ ru:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', en:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', sr:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...' },
    price:31, image:'images/258.jpg', images:['images/258.jpg','images/259.jpg','images/260.jpg','images/261.jpg','images/262.jpg'],
    rating:4.8, dimensions:['PETIT','MOYEN','GRAND'] },
  { id:'microfiber-mat-14', category:'beds', section:'',
    name:{ ru:'Microfiber mat', en:'Microfiber mat', sr:'Microfiber mat' },
    description:{ ru:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', en:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...', sr:'Multifunctional microfiber mat for dogs and cats. Absorbs like a sponge and five times more than a regular carpet, dirt and water. Made of polyester...' },
    price:30, image:'images/263.jpg', images:['images/263.jpg','images/264.jpg','images/265.jpg','images/266.jpg'],
    rating:4.8, dimensions:['PETIT','MOYEN','GRAND'] },
  { id:'winter-trees-bed-2', category:'beds', section:'',
    name:{ ru:'"WINTER Trees" Bed', en:'"WINTER Trees" Bed', sr:'"WINTER Trees" Bed' },
    description:{ ru:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...', en:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...', sr:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...' },
    price:49, image:'images/161.jpg', images:['images/161.jpg','images/162.jpg','images/163.jpg'],
    rating:4.8, dimensions:['PETIT','GRAND'] },
  { id:'winter-trees-bed-4', category:'beds', section:'',
    name:{ ru:'"WINTER Trees" Bed', en:'"WINTER Trees" Bed', sr:'"WINTER Trees" Bed' },
    description:{ ru:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...', en:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...', sr:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...' },
    price:49, image:'images/174.jpg', images:['images/174.jpg','images/175.jpg','images/176.jpg'],
    rating:4.8, dimensions:['PETIT','GRAND'] },
  { id:'winter-trees-bed-5', category:'beds', section:'',
    name:{ ru:'"WINTER Trees" Bed', en:'"WINTER Trees" Bed', sr:'"WINTER Trees" Bed' },
    description:{ ru:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...', en:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...', sr:'"Winter Trees" square dog and cat bed. This bed is very soft and cozy. It combines a very soft interior in gray, with the exterior fabric in the same...' },
    price:56, image:'images/205.jpg', images:['images/205.jpg','images/206.jpg','images/207.jpg','images/208.jpg','images/209.jpg'],
    rating:4.8, dimensions:['MOYEN','PETIT','GRAND','SUPER GRAND'] },
  { id:'ball-with-playful-elastic-laun', category:'toys', section:'',
    name:{ ru:'Ball with playful elastic launcher', en:'Ball with playful elastic launcher', sr:'Ball with playful elastic launcher' },
    description:{ ru:'Elastic launcher with ball Throwing ball toy for dogs. The throwing rope is a strong elastic that will give your dog more play in stretching. The...', en:'Elastic launcher with ball Throwing ball toy for dogs. The throwing rope is a strong elastic that will give your dog more play in stretching. The...', sr:'Elastic launcher with ball Throwing ball toy for dogs. The throwing rope is a strong elastic that will give your dog more play in stretching. The...' },
    price:7, image:'images/72.jpg', images:['images/72.jpg','images/73.jpg'],
    rating:4.8, toyType:'chew', dimensions:['Ovale rouge','Ronde bleue'] },
  { id:'rubber-dog-play-bone-shape-10-', category:'toys', section:'',
    name:{ ru:'Rubber Dog Play - Bone Shape 10.5 Cm', en:'Rubber Dog Play - Bone Shape 10.5 Cm', sr:'Rubber Dog Play - Bone Shape 10.5 Cm' },
    description:{ ru:'Rubber bones with drawn legs. With this toy, you can have a fun time with your pet playing toss and bring. When you throw it on the ground, it...', en:'Rubber bones with drawn legs. With this toy, you can have a fun time with your pet playing toss and bring. When you throw it on the ground, it...', sr:'Rubber bones with drawn legs. With this toy, you can have a fun time with your pet playing toss and bring. When you throw it on the ground, it...' },
    price:3, image:'images/80.jpg', images:['images/80.jpg','images/81.jpg','images/82.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'dog-play-ball-diameter-6cm-dog', category:'toys', section:'',
    name:{ ru:'Dog Play Ball Diameter 6cm - "Dog Paws" Pattern', en:'Dog Play Ball Diameter 6cm - "Dog Paws" Pattern', sr:'Dog Play Ball Diameter 6cm - "Dog Paws" Pattern' },
    description:{ ru:'Irregular Relief Bullet Due To Molded Dog Footprints Thermoplastic Rubber (TPR) Round Toy Ball for Dogs. Funny ball with drawings of raised...', en:'Irregular Relief Bullet Due To Molded Dog Footprints Thermoplastic Rubber (TPR) Round Toy Ball for Dogs. Funny ball with drawings of raised...', sr:'Irregular Relief Bullet Due To Molded Dog Footprints Thermoplastic Rubber (TPR) Round Toy Ball for Dogs. Funny ball with drawings of raised...' },
    price:3, image:'images/83.jpg', images:['images/83.jpg','images/84.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'toy-with-tied-cord', category:'toys', section:'',
    name:{ ru:'Toy with tied cord', en:'Toy with tied cord', sr:'Toy with tied cord' },
    description:{ ru:'Knotted Cord Gear Toy TPR Rubber Dog Toy with Knotted Fabric Cord. It\'s a perfect toy to keep your best friend busy. Perfect for tug of war. Even if...', en:'Knotted Cord Gear Toy TPR Rubber Dog Toy with Knotted Fabric Cord. It\'s a perfect toy to keep your best friend busy. Perfect for tug of war. Even if...', sr:'Knotted Cord Gear Toy TPR Rubber Dog Toy with Knotted Fabric Cord. It\'s a perfect toy to keep your best friend busy. Perfect for tug of war. Even if...' },
    price:6, image:'images/85.jpg',
    rating:4.8, toyType:'chew' },
  { id:'smiling-spiked-ball', category:'toys', section:'',
    name:{ ru:'Smiling Spiked Ball', en:'Smiling Spiked Ball', sr:'Smiling Spiked Ball' },
    description:{ ru:'A very original rubber ball for dogs, ideal for activating them in play. This fun ball with different emoticons is perfect for practicing your dog\'s...', en:'A very original rubber ball for dogs, ideal for activating them in play. This fun ball with different emoticons is perfect for practicing your dog\'s...', sr:'A very original rubber ball for dogs, ideal for activating them in play. This fun ball with different emoticons is perfect for practicing your dog\'s...' },
    price:6, image:'images/86.jpg', images:['images/86.jpg','images/87.png'],
    rating:4.8, toyType:'chew' },
  { id:'dog-game-in-the-shape-of-a-rub', category:'toys', section:'',
    name:{ ru:'Dog game in the shape of a rubber tire', en:'Dog game in the shape of a rubber tire', sr:'Dog game in the shape of a rubber tire' },
    description:{ ru:'A Toy In The Shape Of A Tire, Available In Three Colors: Yellow, Pink Or Blue. So There Is Something For Everyone. Rubber toy in the shape of a dog...', en:'A Toy In The Shape Of A Tire, Available In Three Colors: Yellow, Pink Or Blue. So There Is Something For Everyone. Rubber toy in the shape of a dog...', sr:'A Toy In The Shape Of A Tire, Available In Three Colors: Yellow, Pink Or Blue. So There Is Something For Everyone. Rubber toy in the shape of a dog...' },
    price:4, image:'images/90.jpg', images:['images/90.jpg','images/91.jpg','images/92.jpg','images/93.jpg','images/94.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'stick-with-rope-toy', category:'toys', section:'',
    name:{ ru:'Stick with rope toy', en:'Stick with rope toy', sr:'Stick with rope toy' },
    description:{ ru:'Stick with cloth rope toy Rubber toy with dog rope. Thanks to its long shape and cord, this toy is perfect for playing tug of war. Play games,...', en:'Stick with cloth rope toy Rubber toy with dog rope. Thanks to its long shape and cord, this toy is perfect for playing tug of war. Play games,...', sr:'Stick with cloth rope toy Rubber toy with dog rope. Thanks to its long shape and cord, this toy is perfect for playing tug of war. Play games,...' },
    price:4, image:'images/97.jpg',
    rating:4.8, toyType:'chew' },
  { id:'reward-fillable-egg-dog-toy', category:'toys', section:'',
    name:{ ru:'Reward Fillable Egg Dog Toy', en:'Reward Fillable Egg Dog Toy', sr:'Reward Fillable Egg Dog Toy' },
    description:{ ru:'A Stunningly Designed Game That Has The Chance To Be Stuffed With Rewards Like A Fun Egg-Shaped Kong Dog Toy. This game egg, by its shape, causes...', en:'A Stunningly Designed Game That Has The Chance To Be Stuffed With Rewards Like A Fun Egg-Shaped Kong Dog Toy. This game egg, by its shape, causes...', sr:'A Stunningly Designed Game That Has The Chance To Be Stuffed With Rewards Like A Fun Egg-Shaped Kong Dog Toy. This game egg, by its shape, causes...' },
    price:5, image:'images/101.jpg', images:['images/101.jpg','images/102.jpg','images/103.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'bone-toy-with-fabric-cord', category:'toys', section:'',
    name:{ ru:'Bone toy with fabric cord', en:'Bone toy with fabric cord', sr:'Bone toy with fabric cord' },
    description:{ ru:'Bone toy with fabric cord Rubber toy with dog rope. Designed in a fun funny toy shape, on a fabric cord tied on both sides, making it irresistible...', en:'Bone toy with fabric cord Rubber toy with dog rope. Designed in a fun funny toy shape, on a fabric cord tied on both sides, making it irresistible...', sr:'Bone toy with fabric cord Rubber toy with dog rope. Designed in a fun funny toy shape, on a fabric cord tied on both sides, making it irresistible...' },
    price:11, image:'images/107.jpg',
    rating:4.8, toyType:'chew' },
  { id:'dog-toy-bone-twister-13cm', category:'toys', section:'',
    name:{ ru:'Dog Toy - Bone Twister 13cm', en:'Dog Toy - Bone Twister 13cm', sr:'Dog Toy - Bone Twister 13cm' },
    description:{ ru:'A Great Classic Of The Dog Game: The Colorful Soft And Resistant Bone thermoplastic rubber toy for dogs with bone shape, very strong and resistant....', en:'A Great Classic Of The Dog Game: The Colorful Soft And Resistant Bone thermoplastic rubber toy for dogs with bone shape, very strong and resistant....', sr:'A Great Classic Of The Dog Game: The Colorful Soft And Resistant Bone thermoplastic rubber toy for dogs with bone shape, very strong and resistant....' },
    price:3, image:'images/108.jpg', images:['images/108.jpg','images/109.jpg','images/110.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'bone-with-relief-mini-pics-15-', category:'toys', section:'',
    name:{ ru:'Bone With Relief Mini Pics 15 Cm', en:'Bone With Relief Mini Pics 15 Cm', sr:'Bone With Relief Mini Pics 15 Cm' },
    description:{ ru:'Bones Available In Three Different Colors, With Mini Soft Spikes On Their Surface A tough bone-shaped TPR (thermoplastic rubber) dog toy. With this...', en:'Bones Available In Three Different Colors, With Mini Soft Spikes On Their Surface A tough bone-shaped TPR (thermoplastic rubber) dog toy. With this...', sr:'Bones Available In Three Different Colors, With Mini Soft Spikes On Their Surface A tough bone-shaped TPR (thermoplastic rubber) dog toy. With this...' },
    price:5, image:'images/111.jpg', images:['images/111.jpg','images/112.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'colorful-balloon-with-fabric-c', category:'toys', section:'',
    name:{ ru:'Colorful balloon with fabric cord', en:'Colorful balloon with fabric cord', sr:'Colorful balloon with fabric cord' },
    description:{ ru:'Colorful Balloon with Fabric Cord Made from thermoplastic rubber and fabric cord, this ball provides fun for all dogs. TPR rubber is important in...', en:'Colorful Balloon with Fabric Cord Made from thermoplastic rubber and fabric cord, this ball provides fun for all dogs. TPR rubber is important in...', sr:'Colorful Balloon with Fabric Cord Made from thermoplastic rubber and fabric cord, this ball provides fun for all dogs. TPR rubber is important in...' },
    price:11, image:'images/113.jpg', images:['images/113.jpg','images/114.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'ball-with-knotted-fabric-cord', category:'toys', section:'',
    name:{ ru:'Ball with knotted fabric cord', en:'Ball with knotted fabric cord', sr:'Ball with knotted fabric cord' },
    description:{ ru:'Ball with knotted fabric cord Rubber dog loop with knotted fabric cord on both sides. This is a fantastic ball to spend hours fetching your dog. Made...', en:'Ball with knotted fabric cord Rubber dog loop with knotted fabric cord on both sides. This is a fantastic ball to spend hours fetching your dog. Made...', sr:'Ball with knotted fabric cord Rubber dog loop with knotted fabric cord on both sides. This is a fantastic ball to spend hours fetching your dog. Made...' },
    price:8, image:'images/115.jpg', images:['images/115.jpg','images/116.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'floating-rugby-ball', category:'toys', section:'',
    name:{ ru:'Floating rugby ball', en:'Floating rugby ball', sr:'Floating rugby ball' },
    description:{ ru:'Floating rugby ball Floating rugby ball for dogs made of very pleasant and soft to the touch fabric. This rugby ball will surely guard your pet. Even...', en:'Floating rugby ball Floating rugby ball for dogs made of very pleasant and soft to the touch fabric. This rugby ball will surely guard your pet. Even...', sr:'Floating rugby ball Floating rugby ball for dogs made of very pleasant and soft to the touch fabric. This rugby ball will surely guard your pet. Even...' },
    price:8, image:'images/117.jpg',
    rating:4.8, toyType:'chew' },
  { id:'multicolored-rotating-rings-ga', category:'toys', section:'',
    name:{ ru:'Multicolored Rotating Rings Game for Dogs', en:'Multicolored Rotating Rings Game for Dogs', sr:'Multicolored Rotating Rings Game for Dogs' },
    description:{ ru:'Original Toy By Its Colors As Its Multi-Shaped Configuration. dog toy in TPR (thermoplastic rubber), a material of great resistance. Formed by an...', en:'Original Toy By Its Colors As Its Multi-Shaped Configuration. dog toy in TPR (thermoplastic rubber), a material of great resistance. Formed by an...', sr:'Original Toy By Its Colors As Its Multi-Shaped Configuration. dog toy in TPR (thermoplastic rubber), a material of great resistance. Formed by an...' },
    price:3, image:'images/122.jpg', images:['images/122.jpg','images/123.jpg','images/124.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'gear-shaped-dog-toy', category:'toys', section:'',
    name:{ ru:'Gear Shaped Dog Toy', en:'Gear Shaped Dog Toy', sr:'Gear Shaped Dog Toy' },
    description:{ ru:'A Clever Set Of Gears Of Different Colors For A Game Having An Overall Oval Shape dog toy. Made of TPR (thermoplastic rubber), a material of great...', en:'A Clever Set Of Gears Of Different Colors For A Game Having An Overall Oval Shape dog toy. Made of TPR (thermoplastic rubber), a material of great...', sr:'A Clever Set Of Gears Of Different Colors For A Game Having An Overall Oval Shape dog toy. Made of TPR (thermoplastic rubber), a material of great...' },
    price:3, image:'images/127.jpg', images:['images/127.jpg','images/128.jpg','images/129.jpg','images/130.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'game-for-dogs-assembled-rings', category:'toys', section:'',
    name:{ ru:'Game for Dogs - Assembled Rings', en:'Game for Dogs - Assembled Rings', sr:'Game for Dogs - Assembled Rings' },
    description:{ ru:'A Clever Set Of Gears Of Different Colors For A Game Having An Overall Oval Shape dog toy. Made of TPR (thermoplastic rubber), a material of great...', en:'A Clever Set Of Gears Of Different Colors For A Game Having An Overall Oval Shape dog toy. Made of TPR (thermoplastic rubber), a material of great...', sr:'A Clever Set Of Gears Of Different Colors For A Game Having An Overall Oval Shape dog toy. Made of TPR (thermoplastic rubber), a material of great...' },
    price:3, image:'images/131.jpg', images:['images/131.jpg','images/132.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'throwing-cloth-bow-ball', category:'toys', section:'',
    name:{ ru:'Throwing cloth bow ball', en:'Throwing cloth bow ball', sr:'Throwing cloth bow ball' },
    description:{ ru:'A Fun Dog Game Rubber ball with rag knots for dogs. This ball is ideal for playing with your dog. You can play the always efficient throwing and...', en:'A Fun Dog Game Rubber ball with rag knots for dogs. This ball is ideal for playing with your dog. You can play the always efficient throwing and...', sr:'A Fun Dog Game Rubber ball with rag knots for dogs. This ball is ideal for playing with your dog. You can play the always efficient throwing and...' },
    price:9, image:'images/134.jpg', images:['images/134.jpg','images/135.jpg'],
    rating:4.8, toyType:'chew' },
  { id:'rooster-fai-main-natural-fun', category:'toys', section:'',
    name:{ ru:'Rooster Fai Main "NATURAL Fun"', en:'Rooster Fai Main "NATURAL Fun"', sr:'Rooster Fai Main "NATURAL Fun"' },
    description:{ ru:'Handmade Toys In Natural And Qualitative Materials: Leather, Jutte, Rope, Etc Cock toy handmade with leather and other natural materials. This dog...', en:'Handmade Toys In Natural And Qualitative Materials: Leather, Jutte, Rope, Etc Cock toy handmade with leather and other natural materials. This dog...', sr:'Handmade Toys In Natural And Qualitative Materials: Leather, Jutte, Rope, Etc Cock toy handmade with leather and other natural materials. This dog...' },
    price:14, image:'images/137.jpg',
    rating:4.8, toyType:'chew' },
  { id:'tug-bag-shape-natural-fun', category:'toys', section:'',
    name:{ ru:'Tug Bag Shape "NATURAL Fun"', en:'Tug Bag Shape "NATURAL Fun"', sr:'Tug Bag Shape "NATURAL Fun"' },
    description:{ ru:'Rope / Tug Set With Your Dog. Original Shaped Rope And Leather Toy, Natural Materials dog toy, in the shape of a bag, in leather and other 100%...', en:'Rope / Tug Set With Your Dog. Original Shaped Rope And Leather Toy, Natural Materials dog toy, in the shape of a bag, in leather and other 100%...', sr:'Rope / Tug Set With Your Dog. Original Shaped Rope And Leather Toy, Natural Materials dog toy, in the shape of a bag, in leather and other 100%...' },
    price:9, image:'images/138.jpg',
    rating:4.8, toyType:'chew' },
  { id:'dog-coat-green-trek-breathe-co', category:'accessories', section:'',
    name:{ ru:'Dog Coat Green Trek Breathe Comfort', en:'Dog Coat Green Trek Breathe Comfort', sr:'Dog Coat Green Trek Breathe Comfort' },
    description:{ ru:'Coat + Trek Breathe Comfort Green Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under...', en:'Coat + Trek Breathe Comfort Green Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under...', sr:'Coat + Trek Breathe Comfort Green Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under...' },
    price:31, image:'images/305.jpg', images:['images/305.jpg','images/306.jpg','images/307.jpg','images/308.jpg','images/309.jpg'],
    rating:4.8, accType:'other', dimensions:['30cm','35cm','40cm','45cm','55cm','60CM','65cm','70cm','75cm','80cm','25cm','50cm'] },
  { id:'safe-breathe-comfort-jacket-re', category:'accessories', section:'',
    name:{ ru:'Safe Breathe Comfort Jacket Red', en:'Safe Breathe Comfort Jacket Red', sr:'Safe Breathe Comfort Jacket Red' },
    description:{ ru:'Breathe Comfort Raincoat Waterproof dog cape made with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under special...', en:'Breathe Comfort Raincoat Waterproof dog cape made with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under special...', sr:'Breathe Comfort Raincoat Waterproof dog cape made with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under special...' },
    price:20, image:'images/310.jpg', images:['images/310.jpg','images/311.jpg'],
    rating:4.8, accType:'other', dimensions:['60CM','25cm','30cm','35cm','40cm','50cm','55cm','65cm','70cm','75cm'] },
  { id:'dog-coat-fuchsia-trek-breathe-', category:'accessories', section:'',
    name:{ ru:'Dog Coat Fuchsia Trek Breathe-Comfort', en:'Dog Coat Fuchsia Trek Breathe-Comfort', sr:'Dog Coat Fuchsia Trek Breathe-Comfort' },
    description:{ ru:'Coat + Trek Breathe Comfort Fuchsia Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced...', en:'Coat + Trek Breathe Comfort Fuchsia Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced...', sr:'Coat + Trek Breathe Comfort Fuchsia Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced...' },
    price:31, image:'images/312.jpg', images:['images/312.jpg','images/313.jpg','images/314.jpg','images/315.jpg','images/316.jpg'],
    rating:4.8, accType:'other', dimensions:['25cm','30cm','35cm','40cm','45cm','50cm','55cm','60CM','65cm','70cm','75cm','80cm'] },
  { id:'dog-coat-sky-blue-trek-breathe', category:'accessories', section:'',
    name:{ ru:'Dog Coat Sky Blue Trek Breathe Comfort', en:'Dog Coat Sky Blue Trek Breathe Comfort', sr:'Dog Coat Sky Blue Trek Breathe Comfort' },
    description:{ ru:'Coat + Trek Breathe Comfort Blue Celeste Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced...', en:'Coat + Trek Breathe Comfort Blue Celeste Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced...', sr:'Coat + Trek Breathe Comfort Blue Celeste Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced...' },
    price:31, image:'images/324.jpg', images:['images/324.jpg','images/325.jpg','images/326.jpg','images/327.jpg','images/328.jpg'],
    rating:4.8, accType:'other', dimensions:['50cm','80cm','25cm','30cm','35cm','40cm','55cm','60CM','65cm','70cm','75cm','45cm'] },
  { id:'trendy-breathe-comfort-blue-do', category:'accessories', section:'',
    name:{ ru:'Trendy Breathe Comfort Blue Dog Coat', en:'Trendy Breathe Comfort Blue Dog Coat', sr:'Trendy Breathe Comfort Blue Dog Coat' },
    description:{ ru:'Capa + Trendy Breathe Comfort Blue Dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under special...', en:'Capa + Trendy Breathe Comfort Blue Dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under special...', sr:'Capa + Trendy Breathe Comfort Blue Dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under special...' },
    price:18, image:'images/329.jpg', images:['images/329.jpg','images/330.jpg','images/331.jpg','images/332.jpg','images/333.jpg'],
    rating:4.8, accType:'other', dimensions:['50cm','55cm','60CM','65cm','70cm','25cm','30cm','35cm','40cm','45cm'] },
  { id:'dog-coat-gray-trek-breathe-com', category:'accessories', section:'',
    name:{ ru:'Dog Coat Gray Trek Breathe-Comfort', en:'Dog Coat Gray Trek Breathe-Comfort', sr:'Dog Coat Gray Trek Breathe-Comfort' },
    description:{ ru:'Coat + Trek Breathable Comfort Gray Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced...', en:'Coat + Trek Breathable Comfort Gray Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced...', sr:'Coat + Trek Breathable Comfort Gray Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced...' },
    price:31, image:'images/337.jpg', images:['images/337.jpg','images/338.jpg','images/339.jpg','images/340.jpg','images/341.jpg'],
    rating:4.8, accType:'other', dimensions:['65cm','70cm','75cm','80cm','40cm','45 cm','50cm','55cm','60CM','25cm','30cm','35cm'] },
  { id:'scott-breathe-comfort-dog-coat', category:'accessories', section:'',
    name:{ ru:'Scott Breathe Comfort Dog Coat', en:'Scott Breathe Comfort Dog Coat', sr:'Scott Breathe Comfort Dog Coat' },
    description:{ ru:'Coat + Scott Breathe Comfort Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under...', en:'Coat + Scott Breathe Comfort Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under...', sr:'Coat + Scott Breathe Comfort Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under...' },
    price:27, image:'images/342.jpg', images:['images/342.jpg','images/343.jpg','images/344.jpg','images/345.jpg'],
    rating:4.8, accType:'other', dimensions:['30 CM','70 CM','25 CM','75 CM','65 CM','55 CM','60 CM','45 cm','50 CM','35 CM','40 CM'] },
  { id:'dog-coat-blue-zip-breathe-comf', category:'accessories', section:'',
    name:{ ru:'Dog Coat Blue Zip Breathe Comfort', en:'Dog Coat Blue Zip Breathe Comfort', sr:'Dog Coat Blue Zip Breathe Comfort' },
    description:{ ru:'Capa + Zip Breathe Comfort Blue Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under...', en:'Capa + Zip Breathe Comfort Blue Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under...', sr:'Capa + Zip Breathe Comfort Blue Waterproof dog coat equipped with BREATHE-COMFORT technology. BREATHE-COMFORT is a high-tech fabric produced under...' },
    price:25, image:'images/346.jpg', images:['images/346.jpg','images/347.jpg','images/348.jpg'],
    rating:4.8, accType:'other', dimensions:['BLEU T.65CM','BLEU T.25CM','BLEU T.30CM','BLEU T.35CM','BLEU T.40CM','BLEU T.45CM','BLEU T.50CM','BLEU T.75CM','BLEU T.55CM','BLEU T.60CM','BLEU T.70CM'] },
];

const collections = [
  { id:'beds',
    title:{ ru:'Лежанки', en:'Dog Beds', sr:'Ležaljke' },
    description:{ ru:'Комфортные и стильные лежанки для вашего питомца.', en:'Comfortable and stylish beds for your beloved pet.', sr:'Udobne i stilske ležaljke za vašeg ljubimca.' },
    image:'images/23.webp' },
  { id:'toys',
    title:{ ru:'Игрушки', en:'Toys', sr:'Igračke' },
    description:{ ru:'Забавные игрушки для активных игр и развития.', en:'Fun toys for active play and development.', sr:'Zabavne igračke za aktivnu igru i razvoj.' },
    image:'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80' },
  { id:'accessories',
    title:{ ru:'Аксессуары', en:'Accessories', sr:'Oprema' },
    description:{ ru:'Шлейки, щётки, ошейники и другие аксессуары.', en:'Harnesses, brushes, collars and other accessories.', sr:'Povodci, četke, ogrlice i ostala oprema.' },
    image:'images/11.png' },
  { id:'cosmetics',
    title:{ ru:'Косметика', en:'Cosmetics', sr:'Kozmetika' },
    description:{ ru:'Профессиональная косметика Special One для ухода за шерстью.', en:'Professional Special One grooming cosmetics.', sr:'Profesionalna Special One kozmetika za negu dlake.' },
    image:'images/45.png' },
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
    { key:'accType', prop:'accType', options:['harness','brush','fleaCollar','leash','bowl'] },
    { key:'color', prop:'color', options:['apricot','blue','pink','yellow','black','mint','beige','roseRed','gray','white','green'] },
    { key:'price',   type:'price',   ranges:['0-25','25-35','35-999'] },
  ],
  cosmetics: [
    { key:'cosType', prop:'cosType', options:['shampoo','mask','conditioner','oil','integrator'] },
    { key:'price',   type:'price',   ranges:['0-35','35-55','55-999'] },
  ],
};

const categoryBanners = {
  beds:        'images/4.png',
  toys:        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1600&q=80',
  accessories: 'images/11.png',
  cosmetics:   'images/45.png',
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
    { id:'europe', cost:10, countries:[
      'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT',
      'LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','BA','ME','MK','AL','XK'
    ]},
  ],
  defaultCost: 20,
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
const filterState = { beds:{}, toys:{}, accessories:{}, cosmetics:{} };

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
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = t(el.dataset.i18nHtml);
    if (v && v !== el.dataset.i18nHtml) el.innerHTML = v;
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
  if (['beds','toys','accessories','cosmetics'].includes(route)) {
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
  if (['beds','toys','accessories','cosmetics'].includes(route)) prevCategory = route;
  route = r;
  const path = r === 'home' ? '/' : '/' + r;
  history.pushState({ route: r }, '', path);
  renderRoute();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderRoute() {
  showLoading();
  const home = document.getElementById('home-sections');
  const pages = document.querySelectorAll('.page-view');
  const isHome = !['beds','toys','accessories','cosmetics'].includes(route) && !route.startsWith('product/');

  home.style.display = isHome ? '' : 'none';
  pages.forEach(p => p.style.display = 'none');

  if (route === 'beds' || route === 'toys' || route === 'accessories' || route === 'cosmetics') {
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
      `<option value="${s}" ${(p.size?s===p.size:i===0)?'selected':''}>${t('filters.'+s) !== 'filters.'+s ? t('filters.'+s) : s}</option>`
    ).join('')}</select>`;
  }
  if (p.color) {
    const colors = p.availableColors || ['beige','brown','gray','blue','orange','black','red','purple','green'];
    optHTML += `<select>${colors.map(c =>
      `<option value="${c}" ${c===p.color?'selected':''}>${t('filters.'+c)}</option>`
    ).join('')}</select>`;
  }  if (p.variants) {
    optHTML += `<select id="pd-variant-select">${p.variants.map((v,i) =>
      `<option value="${i}" data-price="${v.price}" ${i===0?'selected':''}>${v.name} — ${fmt(v.price)}</option>`
    ).join('')}</select>`;
  } else if (p.dimensions) {
    optHTML += `<select>${p.dimensions.map((d,i) =>
      `<option value="${d}" ${i===0?'selected':''}>${d}</option>`
    ).join('')}</select>`;
  }  opts.innerHTML = optHTML;

  // Variant price change handler
  const variantSel = document.getElementById('pd-variant-select');
  if (variantSel) {
    variantSel.addEventListener('change', () => {
      const vi = +variantSel.value;
      const newPrice = p.variants[vi].price;
      document.getElementById('pd-price').textContent = fmt(newPrice);
    });
  }

  // Add to cart button
  const addBtn = document.getElementById('pd-add');
  addBtn.textContent = t('product.addToCart');
  addBtn.onclick = () => {
    const vs = document.getElementById('pd-variant-select');
    if (vs) {
      const vi = +vs.value;
      addToCart(p.id, p.variants[vi].name, p.variants[vi].price);
    } else {
      addToCart(p.id);
    }
  };

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

function addToCart(id, variantName, variantPrice) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const cartId = variantName ? id + '::' + variantName : id;
  const existing = cart.find(i => i.cartId === cartId);
  if (existing) existing.qty += 1;
  else {
    const item = { ...p, qty: 1, cartId };
    if (variantName) { item.variantName = variantName; item.price = variantPrice; }
    cart.push(item);
  }
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

function changeQty(cartId, delta) {
  const item = cart.find(i => (i.cartId || i.id) === cartId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCartDrawer();
  updateCartCount();
}

function removeItem(cartId) {
  const idx = cart.findIndex(i => (i.cartId || i.id) === cartId);
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
    el.innerHTML = cart.map(item => {
      const cid = (item.cartId || item.id).replace(/'/g, "\\'");
      const varLabel = item.variantName ? `<span class="cart-item-variant">${item.variantName}</span>` : '';
      return `
      <div class="cart-item">
        <img class="cart-item-thumb" src="${item.image}" alt="${item.name[locale]}">
        <div class="cart-item-info">
          <h4>${item.name[locale]}${varLabel}</h4>
          <p class="cart-item-price">${fmt(item.price)} × ${item.qty}</p>
          <div class="cart-item-actions">
            <button type="button" onclick="changeQty('${cid}',-1)">−</button>
            <span class="cart-item-qty">${item.qty}</span>
            <button type="button" onclick="changeQty('${cid}',1)">+</button>
            <button type="button" class="cart-item-remove" onclick="removeItem('${cid}')">${t('cart.remove')}</button>
          </div>
        </div>
      </div>
    `}).join('');
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
  } catch (e) { /* Google Pay not available */ }
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
  } catch (e) { /* Apple Pay not available */ }
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
    const email = document.getElementById('contact-email').value.trim();
    if (!email) return;
    fetch('/api/subscribe', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ email })
    }).then(r => r.json()).then(d => {
      if (d.ok) {
        showToast(t('contact.success'));
      } else {
        showToast(d.message || 'Error');
      }
    }).catch(() => showToast(t('contact.success')));
    e.target.reset();
  });

  // Navigation links
  document.querySelectorAll('.nav a, .hero-cta a, .footer-links a').forEach(link => {
    link.addEventListener('click', e => {
      if (link.getAttribute('target') === '_blank') return;
      e.preventDefault();
      navigateTo(link.getAttribute('href').replace(/^[\/#]+/,''));
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

  // Browser back/forward
  window.addEventListener('popstate', () => {
    const path = window.location.pathname.replace(/^\//, '') || 'home';
    if (path !== route) { route = path; renderRoute(); }
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
  // SPA redirect from 404.html
  const redirect = sessionStorage.getItem('redirect');
  if (redirect) { sessionStorage.removeItem('redirect'); history.replaceState(null, '', redirect); }
  route = window.location.pathname.replace(/^\//, '') || 'home';
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

/* ═══════════════════════════════════════════════
   MOBILE ENHANCEMENTS
   ═══════════════════════════════════════════════ */
(function initMobileEnhancements() {
  if (window.innerWidth > 768) return;

  /* ─── BOTTOM NAV BAR ─── */
  const bottomBar = document.getElementById('mobile-bottom-bar');
  const mobCartBtn = document.getElementById('mob-cart-btn');
  const mobCartCount = document.getElementById('mob-cart-count');

  // Sync cart count
  if (mobCartCount) {
    const mainCount = document.getElementById('cart-count');
    if (mainCount) {
      const syncCount = () => { mobCartCount.textContent = mainCount.textContent; };
      syncCount();
      new MutationObserver(syncCount).observe(mainCount, { childList:true, characterData:true, subtree:true });
    }
  }

  // Cart button opens drawer
  if (mobCartBtn) {
    mobCartBtn.addEventListener('click', () => {
      const toggle = document.getElementById('cart-toggle');
      if (toggle) toggle.click();
    });
  }

  // Update active tab on navigation
  function updateBottomNav(page) {
    if (!bottomBar) return;
    bottomBar.querySelectorAll('[data-mobnav]').forEach(a => {
      a.classList.toggle('active', a.dataset.mobnav === page);
    });
  }

  // Listen for navigation clicks
  if (bottomBar) {
    bottomBar.querySelectorAll('[data-mobnav]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const nav = a.dataset.mobnav;
        const mainNavLink = document.querySelector(`.nav a[data-nav="${nav}"]`);
        if (mainNavLink) mainNavLink.click();
        updateBottomNav(nav);
      });
    });
  }

  // Observe main nav active changes
  const mainNav = document.getElementById('site-nav');
  if (mainNav) {
    new MutationObserver(() => {
      const active = mainNav.querySelector('a.active');
      if (active) updateBottomNav(active.dataset.nav);
    }).observe(mainNav, { attributes:true, subtree:true, attributeFilter:['class'] });
  }

  // Hide bottom bar when drawer is open
  const drawer = document.querySelector('.drawer');
  if (drawer && bottomBar) {
    new MutationObserver(() => {
      bottomBar.style.transform = drawer.classList.contains('open') ? 'translateY(100%)' : '';
      bottomBar.style.transition = 'transform 0.3s ease';
    }).observe(drawer, { attributes:true, attributeFilter:['class'] });
  }

  /* ─── HORIZONTAL SCROLL FOR GRIDS ─── */
  function enableMobileScroll() {
    document.querySelectorAll('#home-sections .pgrid').forEach(g => {
      if (!g.classList.contains('mobile-scroll')) g.classList.add('mobile-scroll');
    });
    document.querySelectorAll('.col-grid').forEach(g => {
      if (!g.classList.contains('mobile-scroll-col')) g.classList.add('mobile-scroll-col');
    });
    document.querySelectorAll('.trust-grid').forEach(g => {
      if (!g.classList.contains('mobile-scroll-trust')) g.classList.add('mobile-scroll-trust');
    });
    document.querySelectorAll('.reviews-grid').forEach(g => {
      if (!g.classList.contains('mobile-scroll-reviews')) g.classList.add('mobile-scroll-reviews');
    });
  }
  enableMobileScroll();
  new MutationObserver(enableMobileScroll).observe(document.getElementById('main'), { childList:true, subtree:true });

  /* ─── SECTION FADE-IN ON SCROLL ─── */
  const sections = document.querySelectorAll('.section');
  if (sections.length) {
    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('mob-visible');
          sectionObs.unobserve(e.target);
        }
      });
    }, { threshold:0.1 });
    sections.forEach(s => sectionObs.observe(s));
  }

  /* ─── STICKY ADD-TO-CART BAR ─── */
  const stickyBar = document.getElementById('pd-sticky-bar');
  const stickyPrice = document.getElementById('sticky-price');
  const stickyAddBtn = document.getElementById('sticky-add-btn');

  if (stickyBar && stickyAddBtn) {
    const pdPage = document.getElementById('product-page');
    if (pdPage) {
      new MutationObserver(() => {
        const visible = pdPage.style.display !== 'none';
        if (visible) {
          const priceEl = document.querySelector('.pd-price');
          if (priceEl && stickyPrice) stickyPrice.textContent = priceEl.textContent;
          stickyBar.classList.add('visible');
        } else {
          stickyBar.classList.remove('visible');
        }
      }).observe(pdPage, { attributes:true, attributeFilter:['style'] });
    }

    stickyAddBtn.addEventListener('click', () => {
      const mainBtn = document.querySelector('#product-page .btn-primary[data-add]') ||
                       document.querySelector('#product-page .btn-primary');
      if (mainBtn) mainBtn.click();
    });
  }

  /* ─── HIDE HEADER ON SCROLL DOWN, SHOW ON SCROLL UP ─── */
  let lastScrollY = 0;
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > lastScrollY && y > 80) {
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.3s ease';
      } else {
        header.style.transform = 'translateY(0)';
      }
      lastScrollY = y;
    }, { passive:true });
  }

})();

/* ─── HIDE MOBILE-ONLY ELEMENTS ON DESKTOP ─── */
(function hideDesktopMobileEls() {
  if (window.innerWidth > 768) {
    ['mobile-bottom-bar','pd-sticky-bar'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }
})();
