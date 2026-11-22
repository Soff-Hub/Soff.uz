# Paynet Payment — Frontend Guide

Adds **Paynet** as a payment option at checkout, next to Click and Payme.

- Auth: send the buyer's JWT — `Authorization: Bearer <token>`
- Same checkout endpoint as Click/Payme; only `provider` changes.
- All amounts are integers in so'm.

**Main difference from Click/Payme:** Paynet does **not** redirect the buyer back
to our site after paying. The frontend has to wait on its own and check whether
the purchase went through (section 3).

---

## 1. Create the order

`POST /api/v1/seller/payment/create/`

```json
{
  "documents": [1979150],
  "provider": "paynet",
  "purchase_type": "document",
  "affiliate_code": "optional"
}
```

| Field | Required | Notes |
|---|---|---|
| `documents` | yes | IDs of the items in the cart. For playlists, pass playlist IDs here. |
| `provider` | yes | `"paynet"` |
| `purchase_type` | no | `"document"` (default) or `"playlist"` |
| `affiliate_code` | no | Same as for Click/Payme |

Send the same `Referer`/`Origin` the browser sends anyway — the backend uses it to
know which storefront the order came from. No `card_number` / `expire_date`.

### Response `201`

```json
{
  "cart": 477356,
  "msg": "Success",
  "amount": 1100,
  "provider": "paynet",
  "url": "https://app.paynet.uz/?m=54349&c=477356&a=1100"
}
```

| Field | Meaning |
|---|---|
| `cart` | Order number. The buyer may need it if they pay manually in the Paynet app. |
| `amount` | Total to pay in so'm, **including** the platform fee. Show this, not the item price. |
| `url` | Paynet payment page, with our merchant, the order and the amount prefilled. |

### Errors `400`

Same shape as Click/Payme, e.g. `{"msg": "Bu hujjat faqat obuna orqali ochiladi, alohida sotib bo'lmaydi."}`.
Show `msg` to the user.

---

## 2. Send the buyer to Paynet

Open `url`:

- **Desktop:** open in a **new tab** (`window.open(url, "_blank")`), so our page stays
  open and can keep checking the order (section 3).
- **Mobile:** same link; it opens the Paynet page (or the Paynet app if installed).

Don't call `/payment/create/` again while the buyer is paying — every call
creates a **new** order. If they come back and press "Pay" again, reuse the
`url` you already have.

---

## 3. Detect that the payment went through

Paynet approves the order directly on our backend, usually within seconds of
the buyer paying. Poll the purchase check for the item:

`GET /api/v1/customer/has-purchased/<slug>/`

```json
{ "has_purchased": true }
```

Suggested flow after opening the Paynet page:

1. Show a waiting state: *"To'lov Paynet'da amalga oshirilmoqda… To'lovdan so'ng
   shu sahifaga qayting."* with a **"To'lovni tekshirish"** button.
2. Poll `has-purchased` every **4 seconds**, and immediately when the tab becomes
   visible again (`visibilitychange`). Stop after **10 minutes**.
3. When `has_purchased` is `true`: stop polling, show success and send the buyer
   to their purchases, the same page Click/Payme return to:
   - video documents → `/videos/purchased`
   - everything else → `/account/sellerproducts`
   - other storefronts (not soff.uz) → `/account/purchases`
4. If 10 minutes pass: keep the "To'lovni tekshirish" button, and tell the buyer
   the purchase will appear in their account once paid.

For a cart with several items, polling the first item's slug is enough — the
whole order is approved at once.

**Playlists:** `has-purchased` is for documents. For a playlist, re-fetch the
playlist detail and check `is_purchased_playlist`.

---

## 4. Checkout UI

- Add Paynet to the payment method list with the Paynet logo; value `"paynet"`.
- Payment details are entered on Paynet's side — no card form on our page.
- Show the total from the response (`amount`), since it includes the platform fee.

---

## 5. Testing

On production, use a cheap document and your own account. The backend team can
watch the payment end to end with:

```
python manage.py paynet_live_check --cart-id <cart>
```

Things to check:

- The Paynet page shows the same amount as our checkout (e.g. 1 100 so'm, not 110 000).
- After paying, the waiting screen turns into success without reloading.
- The document opens / downloads from the purchases page.
