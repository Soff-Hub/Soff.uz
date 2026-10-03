# Platform Subscription (Start / Pro / Max) — Frontend Guide

One monthly subscription for the whole site. The subscriber can "claim" a limited number of documents per month from any seller who put the document into the subscription. A claimed document stays open forever. Pro and Max include SoffX AI.

- **Auth:** send the JWT as `Authorization: Bearer <token>`.
- **Who can call what:**
  - Customer endpoints: verified customers **and** sellers.
  - Seller endpoints: verified sellers.
  - Admin endpoints: superuser, staff or `role=admin`.
- **Errors:** a `400` returns `{"msg": "...", "code": "..."}`. Show `msg` to the user and branch on `code`.
- **Amounts** are integers in so'm.
- **Lists** use `limit`/`offset` pagination and return `{count, next, previous, results}`.
- **`msg` type:** on `subscribe/` and `verify/` validation errors, `msg` can be an array (`{"msg": ["..."]}`). Take the first element when it is a list.

---

## Screens and flows (what to build)

### 1. Pricing page: "Obuna"
- Load `GET tiers/` and show one card per tier with:
  - price per month;
  - "Oyiga N ta fayl";
  - "Kuniga N ta" when `daily_limit > 0`;
  - "N so'mgacha bo'lgan fayllar", or "Barcha fayllar" when `max_document_price` is null;
  - a SoffX AI badge when `soffx_plan` is not `none`. Show `pro` as "SoffX AI Pro" and `ultra` as "SoffX AI Max".
- If the user is logged in, also load `GET my/`. When there is an active subscription:
  - mark the current tier "Joriy ta'rif";
  - on the other tiers, show "Keyingi oydan o'tish", which calls `POST change-tier/`.
- If the user is not logged in, the button sends them to login first.

### 2. Checkout modal (2 steps)
1. **Card form:** card number (16 digits) and expiry (`MMYY`), then `POST subscribe/`.
   - Keep the returned `subscription` id.
   - Show "Kod {phone_number} raqamiga yuborildi".
2. **SMS code:** `POST verify/`.
   - On `200`, show a success screen with `downloads_left` and close the modal.
   - On `409`, wait and re-fetch `my/`. Do not resend the request.
   - If the code expired, go back to step 1.
- Disable the button while a request is in flight.

### 3. "Mening obunam" (profile section)
Built from `GET my/`.

- **Tier info:**
  - tier title and status badge;
  - "Keyingi to'lov: {ends_at}" when `auto_renew`, otherwise "Obuna {ends_at} gacha amal qiladi";
  - card `**** {card_last4}`.
- **Usage:** a progress bar for `current_period.downloads_used / download_limit`, plus "Qoldi: {downloads_left}".
- **Buttons:**
  - "Bekor qilish" → `cancel/`. Ask for confirmation first and explain that access stays until `ends_at`.
  - "Qayta yoqish" → `resume/`. Show it only when `status = cancelled`.
  - "Pulni qaytarish" → `refund/`. Show it only during the first 3 days and when `downloads_used = 0`. The backend checks this again anyway.
  - "SoffX AI ga o'tish" → `POST soffx-login/`, then `window.location = url`. Show it only when `soffx` is not null and `soffx.status = "success"`. While the status is `pending`, show "SoffX AI tayyorlanmoqda…".
- **Status banners:**

  | Status | Banner text |
  |---|---|
  | `past_due` | "To'lov o'tmadi, kartangizni tekshiring" |
  | `cancelled` | "Avtomatik yangilanish o'chirilgan" |

- **"Obuna orqali olingan fayllar"** tab: `GET claims/`.

### 4. Document card and detail page
- `in_platform_sub` (bool) is returned next to `has_purchased` by the document detail, video detail, multi-resource detail and video list endpoints. It already accounts for blocked documents and for documents that are leaving. Other list endpoints don't return it yet: ask the backend if you need the badge there.
- Button logic on the detail page:

  | Condition | UI |
  |---|---|
  | `has_purchased = true` | Normal download / watch (as today) |
  | `in_platform_sub` and user has an active subscription | Primary "Obuna orqali olish (qoldi: N)" plus secondary "Sotib olish" |
  | `in_platform_sub` and no subscription | "Sotib olish" plus a link "yoki obuna bilan oling →" to the pricing page |
  | not `in_platform_sub` | "Sotib olish" only (as today) |

- "Obuna orqali olish" → `POST claim/<id>/`.
  - On success, mark the document as purchased.
  - Open or download `file_url`. For video or multi-resource documents, `file_url` may be null: reload the detail page, which now returns the files.
  - Update the remaining count from `downloads_left`.
- Show an "Obunada" badge on document cards where `in_platform_sub` is true.

### 5. Seller studio: "Obuna" page
- **Toggle:** "Yangi fayllarim avtomatik obunaga qo'shilsin" (`GET|PATCH settings/`).
- **Table:** from `GET documents/`, with filters "Obunada / Obunada emas", category and search. Columns:
  - checkbox;
  - title;
  - price;
  - state:
    - "Obunada";
    - "{date} da chiqadi" when `platform_sub_leave_at` is set;
    - "Admin tomonidan bloklangan";
    - "Obunada emas";
  - `claims_count`;
  - `earnings`.
- **Bulk bar:** "Tanlanganlarni qo'shish", "Tanlanganlarni olib tashlash", "Hammasini qo'shish", "Narx oralig'i / kategoriya bo'yicha qo'shish" → `POST documents/bulk/`. Show the returned `msg` as a toast.
- **Before removing**, warn: "Fayl 30 kundan keyin obunadan chiqadi. Allaqachon olgan foydalanuvchilarda qoladi."
- **Info block** for sellers: "To'lovning 50% i sotuvchilarga. Har bir obunachining oyi tugaganda, u olgan fayllar narxiga qarab (1–4 ball) bo'linadi. Bitta fayl uchun narxining 90% idan oshmaydi."
- **Earnings card:** `GET earnings/` with a date range. Show "To'langan: {paid}" and "Hisoblanishi kutilmoqda: {pending_claims} ta yuklab olish", plus the documents table.

### 6. Admin panel: "Platforma obunasi"
- **Filters:** date range and tier.
- **KPI cards** (from `overview/`):
  - `active` (with the `active_by_tier` split);
  - `mrr`;
  - `revenue`;
  - `seller_payouts`;
  - `soffx_cost`;
  - `profit`;
  - `new_subscriptions`;
  - `renewals`;
  - `churn_percent`;
  - `refunds`;
  - `downloads`;
  - `zero_download_percent`;
  - `avg_limit_usage_percent`.
- **Charts** (from `daily/`):
  - lines for `new` and `renewals`;
  - bars for `revenue` and `profit`;
  - a line for `downloads`.
- **Tables:**
  - `top/` (sellers and documents);
  - `subscriptions/` (search by phone, status filter), where clicking a row opens the detail.
- **Subscription detail** (`subscriptions/<id>/`):
  - periods (accordion) with their claims table: document, seller, points, payout;
  - payments with receipt statuses;
  - SoffX jobs;
  - a "Pulni qaytarish" button (`refund/`, needs confirmation).

### Error code → UI

| `code` | Where | Show |
|---|---|---|
| `no_subscription` | claim | Open the pricing page |
| `not_in_subscription` | claim | "Bu fayl obunaga kirmaydi" and hide the claim button |
| `tier_too_low` | claim | Suggest upgrading (pricing page) |
| `monthly_limit` | claim | "Bu oy limiti tugadi", with an upgrade CTA |
| `daily_limit` | claim | "Ertaga yana olishingiz mumkin" |
| `own_document` | claim | Hide the claim button on the seller's own documents |
| `window_passed`, `has_claims`, `already_settled` | refund | Show `msg` and hide the refund button |

### Test server notes
- `TEST_PURCHASE=True` is on, so any card number and any SMS code work and no money is charged.
- SoffX is not connected yet. `soffx.status` stays `pending`, so hide the SoffX button for now.

---

# API reference

## Customer — `/api/v1/customer/platform-sub/`

### `GET tiers/` (public)
```json
[{"id": 1, "code": "start", "title": "Start", "description": null, "price": 39000,
  "monthly_limit": 10, "daily_limit": 5, "max_document_price": 30000,
  "soffx_plan": "none", "duration_days": 30}]
```
- `max_document_price: null` means every document is available on this tier.
- `soffx_plan` is one of `none`, `pro` or `ultra`. Show `ultra` as **"Max"**.

### Buying (2 steps, Click card)
1. `POST subscribe/`
   - Body: `{"tier": 1, "card_number": "8600...", "expire_date": "MMYY"}`.
   - Response: `{"subscription": 12, "phone_number": "+99890***", "msg": "..."}`.
   - Click sends an SMS code to the card's phone number.
   - If a subscription is already live, the response is `400`.
2. `POST verify/`
   - Body: `{"subscription": 12, "code": "12345"}`.
   - Response: the subscription object (see `my/`).
   - The SMS code expires after 5 minutes. After that the user has to start again from step 1.
   - A double-submit returns `409`.

### `GET my/`
```json
{"subscription": {
  "id": 12, "status": "active", "auto_renew": true,
  "tier": {...}, "scheduled_tier": null,
  "started_at": "...", "ends_at": "...", "card_last4": "1234",
  "current_period": {"starts_at": "...", "ends_at": "...", "download_limit": 10,
                     "daily_limit": 5, "max_document_price": 30000,
                     "downloads_used": 3, "downloads_left": 7},
  "soffx": {"plan": "pro", "status": "success", "kind": "subscription"}
}}
```
- When the user has no subscription, the response is `{"subscription": null}`.
- `status` values:

  | Value | Meaning |
  |---|---|
  | `active` | Paid and renewing |
  | `cancelled` | Auto-renew is off; claiming still works until `ends_at` |
  | `past_due` | The renewal charge failed. Retried once a day, 3 times in total |

- `soffx` is `null` on Start.
- `soffx.status` is `pending`, `success` or `failed`.
- `soffx.kind` tells you how SoffX granted access:

  | Value | Meaning |
  |---|---|
  | `subscription` | New subscription |
  | `extended` | Existing subscription extended |
  | `upgraded` / `changed` | Plan switched |
  | `tokens` | The user already had their own SoffX plan, so tokens were added instead |

### Other actions

| Endpoint | Body | Effect |
|---|---|---|
| `POST cancel/` | — | Turns auto-renew off. Claiming still works until `ends_at` |
| `POST resume/` | — | Turns auto-renew back on (only for `cancelled`) |
| `POST change-tier/` | `{"tier": 2}` | The new tier starts from the next renewal (`scheduled_tier`). Sending the current tier clears the change |
| `POST refund/` | — | Full refund, only within **3 days** of the payment and only if **nothing was claimed**. Error codes: `window_passed`, `has_claims`, `already_settled` |
| `POST soffx-login/` | `{"redirect": "/chat"}` (optional, must be a relative path) | Returns `{"url": "..."}`. Open it to sign in to SoffX AI. The link is single-use and lasts 2 minutes |

### Claiming a document
`POST claim/<document_id>/`
```json
{"claimed": true, "document": 55, "slug": "...", "file_url": "https://...", "downloads_left": 6}
```
- `claimed: false` means the document was already claimed. It is free again and `downloads_left` is `null`.
- Error `code` values:

  | Code | Meaning |
  |---|---|
  | `no_subscription` | User has no active subscription |
  | `not_in_subscription` | The document is not in the subscription |
  | `tier_too_low` | The document's price is above the tier's limit. Suggest upgrading |
  | `monthly_limit` | Monthly limit reached |
  | `daily_limit` | Daily limit reached |
  | `own_document` | The user is the seller of this document |

- After a claim, every existing document endpoint treats the document as purchased: `has_purchased`, file URLs and the video key.

`GET claims/` — the user's claimed documents (paginated).

**Document payloads:** document detail, video detail, multi-resource detail and video list return `in_platform_sub`. See section 4 of "Screens and flows" for the button logic.

---

## Seller — `/api/v1/seller/platform-sub/`

### `GET documents/?in_platform_sub=true|false&category=&search=`
This lists the seller's approved, paid documents together with their subscription state.
```json
{"id": 5, "title": "...", "slug": "...", "price": 20000, "discount_price": 20000, "category": 3,
 "in_platform_sub": true, "platform_sub_joined_at": "...", "platform_sub_leave_at": null,
 "platform_sub_blocked": false, "claims_count": 14, "earnings": 32100}
```
- `platform_sub_leave_at` set: the seller removed the document. It stays in the subscription until that date. Show "X sanada chiqadi".
- `platform_sub_blocked: true`: an admin excluded the document. It cannot be added.

### `POST documents/bulk/`
```json
{"action": "add", "document_ids": [1, 2]}
{"action": "add", "all": true}
{"action": "add", "category": 3, "min_price": 5000, "max_price": 30000}
{"action": "remove", "document_ids": [1]}
```
- Response: `{"changed": 2, "msg": "..."}`.
- Filters can be combined.
- A removal takes effect **30 days later**. Users who already claimed the document keep it.

### `GET|PATCH settings/`
`{"auto_include_in_platform_sub": true}` makes newly approved documents join the subscription automatically.

### `GET earnings/?from=YYYY-MM-DD&to=YYYY-MM-DD` (default: last 30 days)
```json
{"from": "...", "to": "...", "claims": 14, "paid": 32100, "pending_claims": 3,
 "documents": [{"document": 5, "title": "...", "claims": 9, "paid": 21000}]}
```
- `pending_claims`: the subscriber's month has not ended yet. The money is paid out on that subscriber's period end date.
- How the money is split, so you can explain it to sellers:
  1. Half of every subscription payment goes to sellers.
  2. That half is split over the documents the subscriber took that month, by price points (1–4).
  3. A single document never earns more than 90% of its price.

---

## Admin panel — `/api/v1/seller/admin/platform-sub/`

Every endpoint accepts `?from=YYYY-MM-DD&to=YYYY-MM-DD` (default: last 30 days) and `&tier=<id>`.

| Endpoint | What |
|---|---|
| `GET overview/` | Headline numbers, listed below |
| `GET daily/` | One row per day with `new`, `renewals`, `failed_renewals`, `revenue`, `downloads`, `settled_revenue`, `payouts`, `soffx_cost`, `profit`. Use it for charts |
| `GET top/` | `{sellers: [...], documents: [...]}`: top earners and most-claimed documents |
| `GET subscriptions/?status=&tier=&search=<phone/email>` | List with `paid`, `seller_payouts`, `soffx_cost`, `profit` and `downloads` for each subscription |
| `GET subscriptions/<id>/` | Full detail: every period with its claims (who got how much), payments with their receipts, SoffX sync jobs |
| `POST subscriptions/<id>/refund/` | Manual refund that ignores the 3-day / no-download rule. Still refused after settlement (`already_settled`) |

Fields of `overview/`:

| Group | Fields |
|---|---|
| Live state | `active`, `active_by_tier`, `auto_renew_on`, `mrr` (monthly recurring revenue from auto-renewing subscriptions) |
| Activity in the range | `new_subscriptions`, `renewals`, `failed_renewals`, `refunds`, `refunded_amount`, `revenue`, `expired`, `churn_percent`, `downloads` |
| Settled money in the range | `settled_periods`, `settled_revenue`, `seller_payouts`, `soffx_cost`, `profit`, `zero_download_percent`, `avg_limit_usage_percent` |

`profit` = settled revenue − seller payouts − SoffX cost. It counts only periods that have been settled, because before settlement the payout is not known yet.
