require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const nodemailer = require('nodemailer');
const fetch = global.fetch || require('node-fetch');

function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const app = express();
const port = process.env.PORT || 4242;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-08-16' });

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

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

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, email } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: { message: 'Invalid amount' } });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount, 10),
      currency: 'eur',
      receipt_email: email,
      metadata: { integration_check: 'accept_a_payment' },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: error.message } });
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

async function getPayPalAccessToken() {
  const base = process.env.PAYPAL_ENV === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  return data.access_token;
}

app.post('/api/create-paypal-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const token = await getPayPalAccessToken();
    const base = process.env.PAYPAL_ENV === 'sandbox'
      ? 'https://api-m.sandbox.paypal.com'
      : 'https://api-m.paypal.com';
    const order = await fetch(`${base}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{ amount: { currency_code: 'EUR', value: Number(amount).toFixed(2) } }],
      }),
    }).then((r) => r.json());
    res.json(order);
  } catch (error) {
    console.error('PayPal order creation', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/capture-paypal-order', async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId || typeof orderId !== 'string' || !/^[A-Z0-9]+$/.test(orderId)) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }
    const token = await getPayPalAccessToken();
    const base = process.env.PAYPAL_ENV === 'sandbox'
      ? 'https://api-m.sandbox.paypal.com'
      : 'https://api-m.paypal.com';
    const result = await fetch(`${base}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((r) => r.json());
    res.json(result);
  } catch (error) {
    console.error('PayPal capture', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/config', (req, res) => {
  res.json({
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    paypalClientId: process.env.PAYPAL_CLIENT_ID || '',
  });
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
