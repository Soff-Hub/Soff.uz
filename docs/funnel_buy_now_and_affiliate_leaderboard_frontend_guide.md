# Funnel Chart (new steps) + Affiliate Leaderboard — Frontend Guide

Two changes:

1. **Funnel chart** — two new Google Analytics steps: `buy_now` ("Xoziroq xarid qilish" button) and `begin_checkout`.
2. **Affiliate leaderboard** — new public endpoint listing the top affiliate earners.

All amounts are integers in so'm.

---

## 1. Funnel chart — new keys

`GET /api/v1/seller/admin/marketing/funnel-chart/`

- Auth: admin JWT — `Authorization: Bearer <token>` (unchanged)
- Query params are unchanged (`year`, `month`, `refresh_cache`).

### GA events the site must send

The numbers come from Google Analytics, filtered by **exact** event name (case-sensitive):

| Event name | When to send it |
|---|---|
| `buy_now` | User presses the **"Xoziroq xarid qilish"** button |
| `begin_checkout` | User starts checkout |

```js
gtag('event', 'buy_now');
gtag('event', 'begin_checkout');
```

If the name is different (e.g. `Buy_Now`, `buy-now`), the chart will show `0`.
New events can take 24–48 h to appear in GA reports.

### New keys

Added to **every item of `chart_data`** and to **`totals`**, in both daily and monthly mode:

| Key | Meaning |
|---|---|
| `buy_now` | Unique users who pressed "Xoziroq xarid qilish" |
| `buy_now_raw` | Total number of presses (one user can press many times) |
| `begin_checkout` | Unique users who triggered `begin_checkout` |
| `begin_checkout_raw` | Total number of `begin_checkout` events |

Same idea as the existing `carts_created` / `carts_created_raw`: the plain key is **unique users**, `_raw` is **all events**. Use the plain key for funnel steps.

In `totals`, `buy_now` and `begin_checkout` are unique users over the whole period, so they are **not** the sum of the daily values (a user who clicks on 3 different days counts once). The `_raw` totals are plain sums.

### Suggested funnel order

| Step | Key | Label |
|---|---|---|
| 1 | `content_views` | Content view |
| 2 | `buy_now` | Xoziroq xarid qilish |
| 3 | `checkout_views` | Checkout page |
| 4 | `begin_checkout` | Begin checkout |
| 5 | `registrations` | Ro'yhatdan o'tish |
| 6 | `verified_users` | Muvofaqiyatli kirish |
| 7 | `carts_created` | To'lov qilishga urunishlar |
| 8 | `approved_carts` | Muvofaqiyatli to'lovlar |

### Example (daily mode, one `chart_data` item)

```json
{
  "date": "2026-10-01",
  "day": 1,
  "content_views": 1420,
  "checkout_views": 310,
  "buy_now": 95,
  "buy_now_raw": 140,
  "begin_checkout": 80,
  "begin_checkout_raw": 112,
  "registrations": 40,
  "verified_users": 33,
  "carts_created": 25,
  "carts_created_raw": 31,
  "approved_carts": 12,
  "approved_carts_raw": 14
}
```

Monthly mode items keep their existing keys (`month`, `month_code`, `active_old_users`, …) plus the four new ones.

Responses are cached for 15 minutes — add `?refresh_cache=true` to see fresh numbers right away.

---

## 2. Affiliate leaderboard (public)

`GET /api/v1/seller/affiliate/leaderboard/`

- Auth: **none** — public, works for logged-out visitors. Don't send a token.
- Cached for 5 minutes, so a new sale may take up to 5 minutes to appear.

### Query params

| Param | Default | Meaning |
|---|---|---|
| `days` | `30` | Count sales from the last N days |
| `since` | — | `YYYY-MM-DD`, count sales from this date (e.g. challenge start). Overrides `days`. |
| `all` | — | `true` = all time. Overrides `days` and `since`. |
| `top` | `10` | List size, max `50` |

Examples:

```
/api/v1/seller/affiliate/leaderboard/
/api/v1/seller/affiliate/leaderboard/?since=2026-10-01&top=20
/api/v1/seller/affiliate/leaderboard/?all=true
```

### Response `200`

```json
{
  "period": "since_2026-10-01",
  "results": [
    {"rank": 1, "name": "Ali V.", "image": "https://<media-host>/users/ali.jpg", "sales": 12, "earned": 54000},
    {"rank": 2, "name": "Foydalanuvchi", "image": null, "sales": 4, "earned": 18500}
  ]
}
```

| Field | Meaning |
|---|---|
| `period` | Echo of the period used: `days_30`, `since_2026-10-01` or `all` |
| `rank` | Place, starting at 1 |
| `name` | First name + last-name initial. `"Foydalanuvchi"` when the user has no name — show it as is. |
| `image` | Avatar URL, or `null` → show a default avatar |
| `sales` | Paid orders that came through this user's affiliate links |
| `earned` | So'm earned from those orders in the period |

`results` is `[]` when nobody earned anything in the period — show an empty state.

For privacy the response contains no user ID, username, phone or wallet balance, so entries can't link to a profile. Ask backend if that's needed.

### Errors `400`

```json
{"error": "Invalid 'since' parameter. Use YYYY-MM-DD."}
{"error": "Invalid 'top' parameter. Must be an integer."}
{"error": "Invalid 'days' parameter. Must be an integer."}
```
