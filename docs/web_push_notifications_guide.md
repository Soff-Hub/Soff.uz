# Web Push bildirishnomalar — OneSignal o'rniga tekin yechim

Maqsad: brauzer yopiq bo'lsa ham foydalanuvchiga bildirishnoma yuborish
(yangi xabar, buyurtma, xarid va h.k.) — **pullik servissiz, cheklovsiz**.

**Tavsiya:** standart **Web Push (VAPID)** — o'zimizning service worker +
backendda `pywebpush`. Uchinchi tomon servisi yo'q, obunachi soni va xabar
soni bo'yicha limit yo'q, hammasi bepul.

---

## 1. Hozirgi holat (nima buzilgan)

| Joy | Holat |
|---|---|
| `public/OneSignalSDKWorker.js` | Hali turibdi, OneSignal CDN'dan skript yuklaydi |
| `pages/_app.jsx` | `OneSignal.init(...)` kodi `d180b6301` commitda olib tashlangan |
| `package.json` | `react-onesignal` paketi yo'q |
| `widgets/header/HeaderActions/HeaderNotifications.jsx` | Sayt ichidagi bildirishnomalar WebSocket orqali ishlaydi (`ws/user-notification/`) |

Natija: push umuman ishlamaydi, lekin oldin obuna bo'lgan foydalanuvchilarning
brauzerida eski OneSignal service worker hali ro'yxatda turibdi.

Sayt ochiq paytda WebSocket yetarli. Push faqat **sayt yopiq** bo'lganda kerak —
shuning uchun WebSocket qoladi, push uning yoniga qo'shiladi.

---

## 2. Nega aynan Web Push (VAPID)

| Variant | Narx | Afzallik | Kamchilik |
|---|---|---|---|
| **Web Push (VAPID)** ✅ | Bepul, limit yo'q | Tashqi servis yo'q, SDK yo'q, ma'lumot o'zimizda | Backendda ~100 qator kod |
| Firebase Cloud Messaging | Bepul | Mobil ilova bilan bitta tizim | Firebase SDK (~100KB), Google akkaunt, ichida baribir Web Push |
| OneSignal | Bepul tarifda cheklovlar | Tayyor dashboard | Tashqi skript, sahifani sekinlashtiradi, obunachilar ularda saqlanadi |

Agar kelajakda mobil ilova (Android/iOS native) uchun ham push kerak bo'lsa —
FCM tanlanadi. Faqat sayt uchun — VAPID eng sodda va eng yengil.

Brauzerlar: Chrome, Edge, Firefox, Opera, Safari (macOS 13+). iPhone'da faqat
iOS 16.4+ va sayt **"Bosh ekranga qo'shilgan"** (PWA) bo'lsa ishlaydi.

---

## 3. Qanday ishlaydi

```
Brauzer                         Soff backend                 Push servis (Google/Mozilla/Apple)
  │ 1. ruxsat so'raydi               │                                │
  │ 2. pushManager.subscribe() ─────────────────────────────────────▶│
  │◀──────────────── subscription (endpoint + kalitlar) ─────────────│
  │ 3. POST /push/subscribe/ ───────▶│ saqlaydi                       │
  │                                  │ 4. hodisa bo'ldi (yangi xabar) │
  │                                  │──── pywebpush (VAPID imzo) ───▶│
  │◀──────────────────── 5. push → sw.js → showNotification ─────────│
```

Push servislari brauzer kompaniyalariniki va bepul — biz ularga to'g'ridan-to'g'ri
yuboramiz.

---

## 4. VAPID kalitlarini yaratish (bir marta)

```bash
npx web-push generate-vapid-keys
```

| Kalit | Qayerga |
|---|---|
| Public key | Frontend: `NEXT_PUBLIC_VAPID_PUBLIC_KEY` |
| Private key | Faqat backend: `VAPID_PRIVATE_KEY` (hech qachon frontendga emas) |

Backendda yana: `VAPID_SUBJECT=mailto:noreply.soff@gmail.com`.

Kalitlarni o'zgartirmang — o'zgartirilsa barcha obunalar yaroqsiz bo'ladi.

---

## 5. Frontend

### 5.1 Eski OneSignal workerni o'chirish

`public/OneSignalSDKWorker.js` faylini **o'chirmang**, ichini almashtiring.
Brauzer eski worker yangilanishini shu URL bo'yicha tekshiradi — fayl o'zini
o'zi ro'yxatdan o'chiradi:

```js
// public/OneSignalSDKWorker.js — eski obunalarni tozalash uchun
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => {
    self.registration.unregister();
});
```

2–3 oydan keyin bu faylni butunlay olib tashlash mumkin.

### 5.2 Service worker — `public/sw.js`

```js
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
    let data = {};
    try {
        data = event.data ? event.data.json() : {};
    } catch (e) {
        data = { body: event.data && event.data.text() };
    }

    const title = data.title || 'Soff.uz';
    event.waitUntil(
        self.registration.showNotification(title, {
            body: data.body || '',
            icon: data.icon || '/static/img/logo-192.png',
            badge: '/static/img/badge-72.png',
            tag: data.tag, // bir xil tag — eskisini almashtiradi
            data: { url: data.url || '/account/notification' },
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data.url;

    event.waitUntil(
        self.clients
            .matchAll({ type: 'window', includeUncontrolled: true })
            .then((clients) => {
                const tab = clients.find((c) => c.url.startsWith(self.location.origin));
                if (tab) {
                    tab.navigate(url);
                    return tab.focus();
                }
                return self.clients.openWindow(url);
            })
    );
});
```

Icon fayllarini (`logo-192.png`, `badge-72.png`) `public/static/img/` ga qo'yish kerak.

### 5.3 Obuna bo'lish — `shared/utilities/push.js`

```js
import { api as axios } from '~/repositories/api';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

export const isPushSupported = () =>
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window;

function urlBase64ToUint8Array(base64) {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    const raw = atob((base64 + padding).replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from([...raw].map((ch) => ch.charCodeAt(0)));
}

export async function subscribeToPush(token) {
    if (!isPushSupported() || !VAPID_PUBLIC_KEY) return null;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;

    const registration = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;

    const subscription =
        (await registration.pushManager.getSubscription()) ||
        (await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        }));

    await axios.post('push/subscribe/', subscription.toJSON(), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return subscription;
}

export async function unsubscribeFromPush(token) {
    if (!isPushSupported()) return;
    const registration = await navigator.serviceWorker.getRegistration('/sw.js');
    const subscription = await registration?.pushManager.getSubscription();
    if (!subscription) return;

    await axios.post(
        'push/unsubscribe/',
        { endpoint: subscription.endpoint },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    await subscription.unsubscribe();
}
```

### 5.4 Qachon ruxsat so'rash

**Sahifa ochilishi bilanoq so'ramang** — Chrome bunday saytlarni "bezovta
qiluvchi" deb belgilaydi va so'rovni avtomatik yashiradi. To'g'ri yo'l:

1. Foydalanuvchi **login qilgan** bo'lsin (obuna userga bog'lanadi).
2. Avval o'zimizning kichik banner/modal: *"Yangi xabar va buyurtmalardan xabardor
   bo'lish uchun bildirishnomalarni yoqing"* — **[Yoqish]** / **[Keyinroq]**.
3. Faqat **[Yoqish]** bosilganda `subscribeToPush(token)` chaqiriladi
   (`Notification.requestPermission()` foydalanuvchi bosishi ichida bo'lishi shart —
   Safari boshqacha ruxsat bermaydi).
4. **[Keyinroq]** bosilsa — 7 kun ko'rsatmaslik (`localStorage`).
5. `Notification.permission === 'denied'` bo'lsa — banner umuman ko'rsatilmaydi.

Yaxshi joylar: header'dagi qo'ng'iroqcha (`HeaderNotifications`) yonida,
`pages/account/notification.jsx` sahifasida, birinchi xariddan yoki birinchi
chat xabaridan keyin.

### 5.5 Login / logout

- Login'dan keyin: agar `Notification.permission === 'granted'` bo'lsa,
  `subscribeToPush(token)` ni jim chaqiring (so'rov chiqmaydi, obuna yangi userga bog'lanadi).
- Logout'da: `unsubscribeFromPush(token)` — aks holda bitta kompyuterda keyingi
  foydalanuvchi oldingi userning bildirishnomalarini oladi.

### 5.6 iPhone uchun manifest

`public/manifest.json`:

```json
{
  "name": "Soff.uz",
  "short_name": "Soff",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#00a44f",
  "icons": [
    { "src": "/static/img/logo-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/static/img/logo-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

`pages/_document.jsx` `<Head>` ichiga: `<link rel="manifest" href="/manifest.json" />`.

iOS Safari'da banner o'rniga *"Ulashish → Bosh ekranga qo'shish"* yo'riqnomasini
ko'rsatish kerak, chunki u yerda push faqat PWA ichida ishlaydi.

---

## 6. Backend

### 6.1 Model

```python
class PushSubscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="push_subscriptions")
    endpoint = models.URLField(max_length=1000, unique=True)
    p256dh = models.CharField(max_length=255)
    auth = models.CharField(max_length=255)
    user_agent = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
```

Bitta userda bir nechta obuna bo'lishi normal (telefon, noutbuk, boshqa brauzer).

### 6.2 Endpointlar

| Method | URL | Body | Izoh |
|---|---|---|---|
| `POST` | `/push/subscribe/` | `{ endpoint, keys: { p256dh, auth } }` | `endpoint` bo'yicha upsert, userni yangilash |
| `POST` | `/push/unsubscribe/` | `{ endpoint }` | Obunani o'chirish |

Ikkalasi ham `Authorization: Bearer <token>` talab qiladi.

### 6.3 Yuborish

```bash
pip install pywebpush
```

```python
import json
from pywebpush import webpush, WebPushException
from django.conf import settings

def send_push(user, title, body, url="/account/notification", tag=None):
    payload = json.dumps({"title": title, "body": body, "url": url, "tag": tag})

    for sub in user.push_subscriptions.all():
        try:
            webpush(
                subscription_info={
                    "endpoint": sub.endpoint,
                    "keys": {"p256dh": sub.p256dh, "auth": sub.auth},
                },
                data=payload,
                vapid_private_key=settings.VAPID_PRIVATE_KEY,
                vapid_claims={"sub": settings.VAPID_SUBJECT},
                ttl=60 * 60 * 24,
            )
        except WebPushException as e:
            # 404/410 — obuna o'lgan (user ruxsatni olib tashlagan yoki brauzerni tozalagan)
            if e.response is not None and e.response.status_code in (404, 410):
                sub.delete()
```

- `send_push` ni **fon vazifasida** chaqiring (Celery / background task) — HTTP
  so'rovni kutib turmasin.
- Uni hozir `ws/user-notification/` ga xabar yuboriladigan joyning o'zida chaqiring —
  shunda bitta hodisa ham WebSocket'ga, ham push'ga ketadi.
- Payload 4KB dan oshmasin — faqat sarlavha, qisqa matn va link.
- `user.get_notification == False` bo'lsa (mavjud `toggle-notification` sozlamasi)
  push yubormang.

### 6.4 Payload formati

```json
{
  "title": "Yangi xabar",
  "body": "Ali: Assalomu alaykum, buyurtma bo'yicha...",
  "url": "/chat",
  "tag": "chat-123"
}
```

| Maydon | Majburiy | Izoh |
|---|---|---|
| `title` | ha | Qisqa, 50 belgigacha |
| `body` | yo'q | 120 belgigacha, HTML yo'q |
| `url` | yo'q | Bosilganda ochiladigan sahifa, default `/account/notification` |
| `tag` | yo'q | Bir xil tag'li bildirishnomalar bir-birini almashtiradi (masalan, bitta chat) |

---

## 7. Qaysi hodisalarga push yuborish

| Hodisa | Kimga | `url` |
|---|---|---|
| Yangi chat xabari | Qabul qiluvchi | `/chat` |
| Mahsulot sotildi | Sotuvchi | `/account/notification` |
| Xarid muvaffaqiyatli | Xaridor | xarid sahifasi |
| Freelance buyurtma holati o'zgardi | Buyurtmachi / ijrochi | buyurtma sahifasi |
| Mahsulot moderatsiyadan o'tdi / rad etildi | Sotuvchi | mahsulot sahifasi |

Reklama/aksiya push'larini kuniga 1 tadan ko'p yubormang — odamlar ruxsatni
o'chirib qo'yadi.

---

## 8. Test qilish

1. `localhost` da ishlaydi (HTTPS shart emas); prod'da HTTPS shart.
2. Chrome DevTools → **Application → Service Workers** — `sw.js` faol ekanini tekshiring.
3. Shu yerda **Push** tugmasi bilan test JSON yuborib ko'rish mumkin.
4. Backenddan: `python manage.py shell` → `send_push(user, "Test", "Salom")`.
5. Sayt yopiq holatda ham kelishini tekshiring.
6. Ruxsatni bloklab, keyin `send_push` → obuna bazadan o'chishini tekshiring (410).

---

## 9. Qo'shimcha: `HeaderNotifications.jsx` dagi kamchiliklar

Push bilan bog'liq emas, lekin shu ish bilan birga tuzatish kerak:

- `useMemo` ichida `openNotification()` chaqirilmoqda — bu side-effect, `useEffect` bo'lishi kerak.
- `shared/hooks/useWebSocket.js` ulanish uzilsa qayta ulanmaydi — `onclose` da
  bir necha soniyadan keyin `connect()` qilish kerak (yoki loyihada bor
  `react-use-websocket` dagi `shouldReconnect` ishlatilsin).

---

## 10. Checklist

**Frontend**
- [ ] `public/OneSignalSDKWorker.js` — o'zini o'chiradigan versiyaga almashtirildi
- [ ] `public/sw.js` qo'shildi
- [ ] `shared/utilities/push.js` qo'shildi
- [ ] `NEXT_PUBLIC_VAPID_PUBLIC_KEY` `.env` ga qo'shildi
- [ ] Ruxsat banneri (faqat login qilgan userlarga, tugma bosilganda)
- [ ] Login'da jim qayta obuna, logout'da obunani o'chirish
- [ ] `manifest.json` + icon'lar + `_document.jsx` da link

**Backend**
- [ ] VAPID kalitlari `.env` da
- [ ] `PushSubscription` modeli + migratsiya
- [ ] `/push/subscribe/`, `/push/unsubscribe/`
- [ ] `send_push` fon vazifasi, 404/410 da obunani o'chirish
- [ ] WebSocket bildirishnoma yuboriladigan joylarga `send_push` qo'shildi
- [ ] `get_notification` sozlamasi hisobga olinadi
