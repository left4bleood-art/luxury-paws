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
const PAYPAL_BASE = 'https://api-m.sandbox.paypal.com';

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
    itemsReceived: 'Мы получили ваш заказ',
    items: 'товар(ов)',
    total: 'Итого',
    shippingTo: 'Доставка по адресу',
    willContact: 'Мы свяжемся с вами для уточнения деталей доставки.',
    newOrder: 'Новый заказ получен',
    customer: 'Покупатель',
    phone: 'Телефон',
    payment: 'Оплата',
    itemsTitle: 'Товары',
    address: 'Адрес доставки',
    apt: 'Кв. не указана',
  },
  en: {
    subject: 'Order Confirmation',
    greeting: 'Thank you for your order',
    dear: 'Dear',
    orderNum: 'Order number',
    itemsReceived: 'We have received your order for',
    items: 'item(s)',
    total: 'Total',
    shippingTo: 'Shipping to',
    willContact: 'We will contact you soon with delivery details.',
    newOrder: 'New order received',
    customer: 'Customer',
    phone: 'Phone',
    payment: 'Payment',
    itemsTitle: 'Items',
    address: 'Shipping Address',
    apt: 'Apt not provided',
  },
  sr: {
    subject: 'Potvrda porudžbine',
    greeting: 'Hvala vam na porudžbini',
    dear: 'Poštovani/a',
    orderNum: 'Broj porudžbine',
    itemsReceived: 'Primili smo vašu porudžbinu za',
    items: 'proizvod(a)',
    total: 'Ukupno',
    shippingTo: 'Dostava na adresu',
    willContact: 'Kontaktiraćemo vas uskoro sa detaljima dostave.',
    newOrder: 'Nova porudžbina primljena',
    customer: 'Kupac',
    phone: 'Telefon',
    payment: 'Plaćanje',
    itemsTitle: 'Proizvodi',
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

function createOrderNumber() {
  return `LP-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;
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

  const customerMail = {
    from: process.env.EMAIL_FROM,
    to: order.customer.email,
    subject: `Luxury Paws — ${lang.subject}`,
    html: `<h1>${lang.greeting}</h1>
      <p>${lang.dear} ${esc(order.customer.firstName)},</p>
      <p>${lang.orderNum}: <strong>${esc(order.orderNumber)}</strong></p>
      <p>${lang.itemsReceived} ${order.items.length} ${lang.items}.</p>
      <ul>${order.items.map((item) => `<li>${esc(item.name)} × ${item.quantity} — €${item.unit_price}</li>`).join('')}</ul>
      <p><strong>${lang.total}:</strong> €${order.totals.total}</p>
      <p>${lang.shippingTo}: ${order.customer.address.country ? esc(order.customer.address.country) + ', ' : ''}${esc(order.customer.address.street)}, ${esc(order.customer.address.city)}, ${esc(order.customer.address.state)}, ${esc(order.customer.address.zip)}</p>
      <p>${lang.willContact}</p>`,
  };

  const ownerMail = {
    from: process.env.EMAIL_FROM,
    to: process.env.STORE_EMAIL,
    subject: `${lang.newOrder} — ${order.customer.firstName} ${order.customer.lastName}`,
    html: `<h1>${lang.newOrder}</h1>
      <p><strong>${lang.orderNum}:</strong> ${esc(order.orderNumber)}</p>
      <p><strong>${lang.customer}:</strong> ${esc(order.customer.firstName)} ${esc(order.customer.lastName)}</p>
      <p><strong>Email:</strong> ${esc(order.customer.email)}</p>
      <p><strong>${lang.phone}:</strong> ${esc(order.customer.phone)}</p>
      <p><strong>${lang.payment}:</strong> ${esc(order.paymentProvider)}</p>
      <p><strong>${lang.total}:</strong> €${order.totals.total}</p>
      <h2>${lang.itemsTitle}</h2>
      <ul>${order.items.map((item) => `<li>${esc(item.name)} × ${item.quantity} — €${item.unit_price}</li>`).join('')}</ul>
      <h2>${lang.address}</h2>
      <p>${order.customer.address.country ? esc(order.customer.address.country) + '<br>' : ''}${esc(order.customer.address.street)}<br>${esc(order.customer.address.city)}, ${esc(order.customer.address.state)}, ${esc(order.customer.address.zip)}</p>
      <p>${esc(order.customer.address.apartment) || lang.apt}</p>`,
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
