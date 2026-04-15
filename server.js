require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const app = express();
const port = process.env.PORT || 4242;

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || '';
const PAYPAL_BASE = 'https://api-m.paypal.com';

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

/* ─── PayPal helpers ─── */
async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
  const r = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await r.json();
  return data.access_token;
}

async function paypalRequest(path, method, body) {
  const token = await getPayPalAccessToken();
  const opts = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(`${PAYPAL_BASE}${path}`, opts);
  return r.json();
}

const emailI18n = {
  ru: {
    subject: 'Подтверждение заказа',
    greeting: 'Спасибо за ваш заказ',
    dear: 'Уважаемый(ая)',
    orderNum: 'Номер заказа',
    date: 'Дата',
    paid: 'Оплачено',
    itemsReceived: 'Мы получили ваш заказ',
    items: 'товар(ов)',
    itemsTitle: 'Товары',
    qty: 'Кол-во',
    price: 'Цена',
    subtotal: 'Подытог',
    shipping: 'Доставка',
    discount: 'Скидка',
    free: 'Бесплатно',
    total: 'Итого',
    shippingTo: 'Доставка по адресу',
    willContact: 'Мы свяжемся с вами для уточнения деталей доставки.',
    newOrder: 'Новый заказ получен',
    customer: 'Покупатель',
    phone: 'Телефон',
    payment: 'Оплата',
    address: 'Адрес доставки',
    apt: 'Кв. не указана',
  },
  en: {
    subject: 'Order Confirmation',
    greeting: 'Thank you for your order',
    dear: 'Dear',
    orderNum: 'Order number',
    date: 'Date',
    paid: 'Paid',
    itemsReceived: 'We have received your order for',
    items: 'item(s)',
    itemsTitle: 'Items',
    qty: 'Qty',
    price: 'Price',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    discount: 'Discount',
    free: 'Free',
    total: 'Total',
    shippingTo: 'Shipping to',
    willContact: 'We will contact you soon with delivery details.',
    newOrder: 'New order received',
    customer: 'Customer',
    phone: 'Phone',
    payment: 'Payment',
    address: 'Shipping Address',
    apt: 'Apt not provided',
  },
  sr: {
    subject: 'Potvrda porudžbine',
    greeting: 'Hvala vam na porudžbini',
    dear: 'Poštovani/a',
    orderNum: 'Broj porudžbine',
    date: 'Datum',
    paid: 'Plaćeno',
    itemsReceived: 'Primili smo vašu porudžbinu za',
    items: 'proizvod(a)',
    itemsTitle: 'Proizvodi',
    qty: 'Kol.',
    price: 'Cena',
    subtotal: 'Međuzbir',
    shipping: 'Dostava',
    discount: 'Popust',
    free: 'Besplatno',
    total: 'Ukupno',
    shippingTo: 'Dostava na adresu',
    willContact: 'Kontaktiraćemo vas uskoro sa detaljima dostave.',
    newOrder: 'Nova porudžbina primljena',
    customer: 'Kupac',
    phone: 'Telefon',
    payment: 'Plaćanje',
    address: 'Adresa za dostavu',
    apt: 'Stan nije naveden',
  },
};

/* ─── PayPal Routes ─── */
app.post('/api/paypal/create-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    const order = await paypalRequest('/v2/checkout/orders', 'POST', {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: (currency || 'EUR').toUpperCase(),
          value: parseFloat(amount).toFixed(2),
        },
      }],
    });
    res.json({ id: order.id });
  } catch (error) {
    console.error('PayPal create order error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/paypal/capture-order', async (req, res) => {
  try {
    const { orderID } = req.body;
    if (!orderID) {
      return res.status(400).json({ error: 'Missing orderID' });
    }
    const capture = await paypalRequest(`/v2/checkout/orders/${encodeURIComponent(orderID)}/capture`, 'POST');
    res.json(capture);
  } catch (error) {
    console.error('PayPal capture error:', error);
    res.status(500).json({ error: error.message });
  }
});

/* ─── Promo codes (server-side, max 100 uses each) ─── */
const fs = require('fs');
const PROMO_FILE = __dirname + '/promo-usage.json';
const ORDER_COUNTER_FILE = __dirname + '/order-counter.json';
const PROMO_CODES = {
  LUXURY20: { discount: 5, type: 'percent', maxUses: 100 },
  PAWLOVE:  { discount: 5, type: 'fixed',   maxUses: 100 },
};

function loadPromoUsage() {
  try { return JSON.parse(fs.readFileSync(PROMO_FILE, 'utf8')); }
  catch { return {}; }
}
function savePromoUsage(data) {
  fs.writeFileSync(PROMO_FILE, JSON.stringify(data));
}

app.post('/api/validate-promo', (req, res) => {
  const code = (req.body.code || '').trim().toUpperCase();
  const promo = PROMO_CODES[code];
  if (!promo) return res.json({ valid: false });

  const usage = loadPromoUsage();
  const used = usage[code] || 0;
  if (used >= promo.maxUses) return res.json({ valid: false, exhausted: true });

  res.json({ valid: true, discount: promo.discount, type: promo.type, remaining: promo.maxUses - used });
});

app.post('/api/use-promo', (req, res) => {
  const code = (req.body.code || '').trim().toUpperCase();
  const promo = PROMO_CODES[code];
  if (!promo) return res.json({ ok: false });

  const usage = loadPromoUsage();
  const used = usage[code] || 0;
  if (used >= promo.maxUses) return res.json({ ok: false, exhausted: true });

  usage[code] = used + 1;
  savePromoUsage(usage);
  res.json({ ok: true, remaining: promo.maxUses - used - 1 });
});

function createOrderNumber() {
  let counter = { last: 0 };
  try { counter = JSON.parse(fs.readFileSync(ORDER_COUNTER_FILE, 'utf8')); } catch {}
  counter.last += 1;
  fs.writeFileSync(ORDER_COUNTER_FILE, JSON.stringify(counter));
  return String(counter.last).padStart(6, '0');
}

async function sendEmail(order) {
  const lang = emailI18n[order.locale] || emailI18n.en;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const date = new Date().toLocaleDateString(order.locale === 'ru' ? 'ru-RU' : order.locale === 'sr' ? 'sr-RS' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const itemsRows = order.items.map(item => `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #f0ebe4;font-family:'Inter',Arial,sans-serif;font-size:14px;color:#3a3229;">
        ${esc(item.name)}
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #f0ebe4;font-family:'Inter',Arial,sans-serif;font-size:14px;color:#6b5e50;text-align:center;">
        ${item.quantity}
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #f0ebe4;font-family:'Inter',Arial,sans-serif;font-size:14px;color:#3a3229;text-align:right;font-weight:600;">
        €${(item.unit_price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('');

  const sub = order.totals.sub || 0;
  const ship = order.totals.ship || 0;
  const disc = order.totals.disc || 0;
  const total = order.totals.total || 0;

  const discountRow = disc > 0 ? `
    <tr>
      <td colspan="2" style="padding:6px 16px;font-family:'Inter',Arial,sans-serif;font-size:13px;color:#8b6914;text-align:right;">
        ${lang.discount || 'Discount'}
      </td>
      <td style="padding:6px 16px;font-family:'Inter',Arial,sans-serif;font-size:13px;color:#8b6914;text-align:right;font-weight:600;">
        -€${disc.toFixed(2)}
      </td>
    </tr>` : '';

  const addr = order.customer.address;
  const fullAddr = [addr.country, addr.street, addr.city, addr.state, addr.zip].filter(Boolean).map(s => esc(s)).join(', ');

  const customerHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f7f2eb;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1a1612 0%,#2c2418 100%);border-radius:16px 16px 0 0;padding:40px 32px;text-align:center;">
      <div style="font-size:13px;letter-spacing:3px;color:#d4a94c;text-transform:uppercase;margin-bottom:8px;">🐾 Luxury Paws</div>
      <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;color:#fff;font-weight:700;">${lang.greeting}!</h1>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;padding:36px 32px;border-left:1px solid #f0ebe4;border-right:1px solid #f0ebe4;">

      <p style="font-size:15px;color:#3a3229;line-height:1.7;margin:0 0 24px;">
        ${lang.dear} ${esc(order.customer.firstName)},
      </p>

      <!-- Order info badge -->
      <div style="background:linear-gradient(135deg,#faf6f0 0%,#f5eee4 100%);border:1px solid rgba(212,169,76,0.2);border-radius:12px;padding:20px 24px;margin-bottom:28px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-size:12px;color:#8b7a66;text-transform:uppercase;letter-spacing:1px;">${lang.orderNum}</td>
            <td style="font-size:12px;color:#8b7a66;text-transform:uppercase;letter-spacing:1px;text-align:right;">${lang.date || 'Date'}</td>
          </tr>
          <tr>
            <td style="font-size:22px;font-weight:800;color:#1a1612;font-family:Georgia,'Times New Roman',serif;padding-top:4px;">#${esc(order.orderNumber)}</td>
            <td style="font-size:14px;color:#3a3229;text-align:right;padding-top:4px;">${date}</td>
          </tr>
        </table>
      </div>

      <!-- Payment badge -->
      <div style="display:inline-block;background:#e8f5e9;color:#2e7d32;font-size:13px;font-weight:700;padding:8px 18px;border-radius:50px;margin-bottom:24px;">
        ✓ ${lang.paid || 'Paid'} — ${esc(order.paymentProvider)}
      </div>

      <!-- Items table -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
        <thead>
          <tr style="background:#faf6f0;">
            <th style="padding:10px 16px;font-family:'Inter',Arial,sans-serif;font-size:11px;color:#8b7a66;text-transform:uppercase;letter-spacing:1px;text-align:left;">${lang.itemsTitle}</th>
            <th style="padding:10px 16px;font-family:'Inter',Arial,sans-serif;font-size:11px;color:#8b7a66;text-transform:uppercase;letter-spacing:1px;text-align:center;">${lang.qty || 'Qty'}</th>
            <th style="padding:10px 16px;font-family:'Inter',Arial,sans-serif;font-size:11px;color:#8b7a66;text-transform:uppercase;letter-spacing:1px;text-align:right;">${lang.price || 'Price'}</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>

      <!-- Totals -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
        <tr>
          <td colspan="2" style="padding:6px 16px;font-family:'Inter',Arial,sans-serif;font-size:13px;color:#6b5e50;text-align:right;">
            ${lang.subtotal || 'Subtotal'}
          </td>
          <td style="padding:6px 16px;font-family:'Inter',Arial,sans-serif;font-size:13px;color:#3a3229;text-align:right;">
            €${sub.toFixed(2)}
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding:6px 16px;font-family:'Inter',Arial,sans-serif;font-size:13px;color:#6b5e50;text-align:right;">
            ${lang.shipping || 'Shipping'}
          </td>
          <td style="padding:6px 16px;font-family:'Inter',Arial,sans-serif;font-size:13px;color:#3a3229;text-align:right;">
            ${ship > 0 ? '€' + ship.toFixed(2) : (lang.free || 'Free')}
          </td>
        </tr>
        ${discountRow}
        <tr>
          <td colspan="3" style="padding:0 16px;"><div style="border-top:2px solid #d4a94c;margin:8px 0;"></div></td>
        </tr>
        <tr>
          <td colspan="2" style="padding:8px 16px;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;color:#1a1612;text-align:right;">
            ${lang.total}
          </td>
          <td style="padding:8px 16px;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:800;color:#1a1612;text-align:right;">
            €${total.toFixed(2)}
          </td>
        </tr>
      </table>

      <!-- Shipping address -->
      <div style="background:#faf6f0;border-radius:10px;padding:18px 22px;margin-bottom:24px;">
        <div style="font-size:11px;color:#8b7a66;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">📦 ${lang.shippingTo}</div>
        <div style="font-size:14px;color:#3a3229;line-height:1.6;">
          ${esc(order.customer.firstName)} ${esc(order.customer.lastName)}<br>
          ${fullAddr}${addr.apartment ? '<br>' + esc(addr.apartment) : ''}
        </div>
      </div>

      <p style="font-size:14px;color:#6b5e50;line-height:1.7;margin:0;">
        ${lang.willContact}
      </p>
    </div>

    <!-- Footer -->
    <div style="background:linear-gradient(135deg,#1a1612 0%,#2c2418 100%);border-radius:0 0 16px 16px;padding:28px 32px;text-align:center;">
      <div style="font-size:11px;letter-spacing:2px;color:#d4a94c;text-transform:uppercase;margin-bottom:6px;">Luxury Paws</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.4);">Premium Dog Boutique — theluxurypaws.com</div>
    </div>

  </div>
</body>
</html>`;

  const ownerHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:20px;background:#f7f2eb;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #f0ebe4;">
    <div style="background:#1a1612;padding:24px 28px;">
      <h1 style="margin:0;font-size:18px;color:#d4a94c;">🐾 ${lang.newOrder}</h1>
    </div>
    <div style="padding:28px;">
      <p><strong>${lang.orderNum}:</strong> #${esc(order.orderNumber)}</p>
      <p><strong>${lang.customer}:</strong> ${esc(order.customer.firstName)} ${esc(order.customer.lastName)}</p>
      <p><strong>Email:</strong> ${esc(order.customer.email)}</p>
      <p><strong>${lang.phone}:</strong> ${esc(order.customer.phone)}</p>
      <p><strong>${lang.payment}:</strong> ${esc(order.paymentProvider)}</p>
      <p><strong>${lang.total}:</strong> €${total.toFixed(2)}</p>
      <hr style="border:none;border-top:1px solid #f0ebe4;margin:20px 0;">
      <h3 style="color:#1a1612;">${lang.itemsTitle}</h3>
      <ul style="padding-left:20px;">${order.items.map(item => `<li>${esc(item.name)} × ${item.quantity} — €${(item.unit_price * item.quantity).toFixed(2)}</li>`).join('')}</ul>
      <h3 style="color:#1a1612;">${lang.address}</h3>
      <p>${fullAddr}${addr.apartment ? '<br>' + esc(addr.apartment) : ''}</p>
    </div>
  </div>
</body>
</html>`;

  const customerMail = {
    from: process.env.EMAIL_FROM,
    to: order.customer.email,
    subject: `Luxury Paws — ${lang.subject} #${order.orderNumber}`,
    html: customerHtml,
  };

  const ownerMail = {
    from: process.env.EMAIL_FROM,
    to: process.env.STORE_EMAIL,
    subject: `${lang.newOrder} #${order.orderNumber} — ${order.customer.firstName} ${order.customer.lastName}`,
    html: ownerHtml,
  };

  await transporter.sendMail(customerMail);
  await transporter.sendMail(ownerMail);
}

app.post('/api/send-order', async (req, res) => {
  const order = req.body;
  try {
    if (!order || !order.customer || !order.items || order.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid order payload.' });
    }
    order.orderNumber = createOrderNumber();
    await sendEmail(order);
    res.json({ success: true, orderNumber: order.orderNumber });
  } catch (error) {
    console.error('Order email error', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/config', (req, res) => {
  res.json({
    paypalClientId: PAYPAL_CLIENT_ID,
  });
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
