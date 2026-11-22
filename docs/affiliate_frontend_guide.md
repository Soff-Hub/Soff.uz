# Affiliate Links — Frontend Guide

Users can share a soff.uz link that carries their affiliate code. When someone buys
through it, the link owner earns **5% of the order (excluding VAT)** in
`affiliate_wallet`.

- Auth: send the user's JWT — `Authorization: Bearer <token>`
- All amounts are integers in so'm.

**Current bug (please fix first):** on the live site the code from `?affiliate=` is
kept **only in Redux memory**. Any full page load clears it before checkout:
refreshing, opening a product in a new tab, logging in through Google/Telegram, or
coming back later. The order is then created without `affiliate_code`, and the link
owner earns nothing. See section 2.

---

## 1. How the flow works

```
Owner: affiliate_program page ──POST seller/affiliate-create/──▶ https://soff.uz/...?affiliate=<uuid>
                                                                       │ shares the link
Buyer opens the link ──▶ frontend saves <uuid>  (MUST survive reloads & login)
                                                                       │
Buyer pays ──POST seller/payment/create/ { ..., affiliate_code: <uuid> } ──▶ cart linked to owner
                                                                       │
Payment confirmed (Click / Payme / Paynet / card) ──▶ owner's affiliate_wallet += 5%
```

The backend handles everything after `payment/create`. The frontend's only job is to
**save the code and send it with every order**.

---

## 2. Save the code (required change)

### What the code does now (from the production bundle)

- `_app`: a component reads `router.query.affiliate` and dispatches
  `setAffiliateId(code)` into the `affiliate` slice (`initialState: { affiliateId: null }`).
- Checkout reads `state.affiliate.affiliateId` and adds `affiliate_code` to
  `seller/payment/create/`. This is correct, but the value is `null` after any reload.
- Nothing is saved to localStorage or a cookie.

### What it should do

1. When the URL has `?affiliate=<code>`, save it to **localStorage (or a cookie)**
   with a timestamp. If a new code arrives, it replaces the old one (last click wins).
2. On app start, if there's no code in the URL, load the saved one into Redux,
   but only if it is less than **30 days** old.
3. Keep sending `state.affiliate.affiliateId` from checkout as you do now.

Example (adapt to the existing slice and `_app` component):

```js
// utils/affiliate.js
const KEY = "soff_affiliate";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function saveAffiliate(code) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ code, savedAt: Date.now() }));
  } catch {}
}

export function loadAffiliate() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { code, savedAt } = JSON.parse(raw);
    if (!code || Date.now() - savedAt > TTL_MS) {
      localStorage.removeItem(KEY);
      return null;
    }
    return code;
  } catch {
    return null;
  }
}
```

```jsx
// in the component inside _app that currently dispatches setAffiliateId
const router = useRouter();
const dispatch = useDispatch();
const fromUrl = router.query.affiliate;

useEffect(() => {
  if (!router.isReady) return;
  if (typeof fromUrl === "string" && fromUrl) {
    saveAffiliate(fromUrl);
    dispatch(setAffiliateId(fromUrl));
  } else {
    const saved = loadAffiliate();
    if (saved) dispatch(setAffiliateId(saved));
  }
}, [router.isReady, fromUrl]);
```

Notes:
- Don't clear the code when the user logs in or out. Login is the most common place it
  gets lost.
- If the Google/Telegram login redirect goes to another domain and back, localStorage
  on `soff.uz` survives it. Redux does not.
- Clearing the code after a successful purchase is optional. Keeping it means repeat
  purchases within 30 days also count for the affiliate.

---

## 3. Send the code with every order

`POST /api/v1/seller/payment/create/`. Add `affiliate_code` for **every** provider
and purchase type:

```json
{
  "documents": [1979150],
  "provider": "click",
  "purchase_type": "document",
  "affiliate_code": "62afa57a-c66f-4abe-8d2b-8aa0da686e38"
}
```

Check that **every** call to `seller/payment/create/` sends it. The bundle has at
least two:
- the provider flow (`click` / `payme` / `paynet`)
- the card flow (`provider: "card_data"`, with `card_number` and `expire_date`)

Also check one-click / "buy now" buttons that skip the cart page, if there are any.

Leave `affiliate_code` out (don't send `null` or `""`) when there is no code. If the
code is unknown, or the buyer owns the link, the backend just ignores it. The order
still goes through.

---

## 4. Affiliate program page

### Create a link

`POST /api/v1/seller/affiliate-create/`

```json
{ "link": "https://soff.uz/scientific-resources/all?slug=all" }
```

Response:

```json
{ "link": "https://soff.uz/scientific-resources/all?slug=all&affiliate=<uuid>" }
```

Backend changes (this release):
- The link **must start with a soff.uz page** (`https://soff.uz/...`). Other domains
  now get `400 {"link": "Mavjud bo'lmagan sahifa yuborildi, havolani tekshiring"}`.
  Before, anything was accepted by mistake.
- Links that already have a query string (`?slug=all`) now work. The code is added
  with `&affiliate=` instead of a second `?`.
- `400` with `link` also covers too many attempts (more than 50 in 30 minutes).

### Wallet stats

`GET /auth/user-affiliate-wallet/`

```json
{
  "affiliate_wallet": 15000,
  "affiliate_count": 4,
  "affiliate_sales_count": 3
}
```

| Field | Meaning |
|---|---|
| `affiliate_wallet` | Total earned, in so'm. |
| `affiliate_count` | Number of **links the user created**, not sales. |
| `affiliate_sales_count` | **New.** Number of paid orders that came through the user's links. |

The page currently shows `"{affiliate_count} ta havola orqali daromad"` (earnings
through N links). That's correct for links. If you want to show sales, use
`affiliate_sales_count`.

---

## 5. How to test

You need **two accounts**. Buying through your own link earns nothing; the backend
blocks self-referral on purpose.

1. Account A: create a link on the affiliate program page.
2. In a private window, open the link. In DevTools → Application → Local Storage,
   check that `soff_affiliate` is saved.
3. **Refresh the page**, then log in as account B with Google. Check that the key is
   still there.
4. Add an item to the cart and pay. In DevTools → Network, check that the
   `payment/create/` request body has `affiliate_code`.
5. After the payment is confirmed, account A's `user-affiliate-wallet/` should show a
   higher `affiliate_wallet` and `affiliate_sales_count`.

If step 4 has `affiliate_code` but the wallet doesn't change, send the order ID to the
backend team.
