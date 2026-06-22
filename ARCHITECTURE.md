# Zook Admin — Architecture & Folder Structure

This document describes the recommended architecture for `zook_admin`, why it
was chosen, and how to migrate the existing code into it. The skeleton has
already been scaffolded — this is the map.

## 1. The approach: feature-based (modular) architecture

The app is organised **by feature, not by file type**. Instead of one giant
`pages/` folder plus scattered `components/`, `hooks/`, and `services/`
folders, each business domain (auth, orders, products, kyc…) owns a
self-contained folder holding its API calls, hooks, components, and state.

Why this fits Zook Admin:

- It is a **data-heavy dashboard** with clearly separated domains (orders, KYC,
  listings, vendors). Those domains map cleanly to features.
- A new engineer can open `features/orders/` and see *everything* about orders
  in one place, instead of hunting across five top-level folders.
- Features are deletable and movable as units, which keeps the codebase from
  rotting as it grows.
- Shared, dumb building blocks (buttons, layout, the API client) stay in
  clearly-marked shared folders so they aren't duplicated.

Three rules keep it clean:

1. **Features may use shared code** (`lib/`, `components/ui/`, `hooks/`).
2. **Features must not import from each other's internals** — only via a
   feature's `index.js` public surface (so boundaries stay explicit).
3. **Components never call `axios` directly** — they call a feature hook, which
   calls the feature's `api/` module. One direction, one data path.

## 2. Target folder structure

```
src/
├── app/                      # App-level wiring (composition root)
│   ├── App.jsx               # runs useAuthInit(), renders the router
│   ├── providers/
│   │   └── AppProviders.jsx  # QueryClientProvider + BrowserRouter (+future)
│   └── router/
│       ├── AppRouter.jsx     # all routes; public vs protected groups
│       ├── ProtectedRoute.jsx# auth guard
│       └── routes.js         # ROUTES path constants
│
├── config/
│   └── env.js                # the ONLY place that reads import.meta.env
│
├── lib/                      # framework-level shared infra (not domain logic)
│   ├── axios.js              # configured axios + auth/refresh interceptors
│   ├── queryClient.js        # the React Query client + defaults
│   └── queryKeys.js          # central registry of cache keys
│
├── components/               # shared, reusable, presentational components
│   ├── ui/                   # Button, Input, Badge, Spinner, Modal…
│   └── layout/               # MainLayout, Sidebar  (move here from src/layout)
│
├── hooks/                    # generic shared hooks (useDebounce, useMediaQuery)
├── utils/                    # pure helpers (formatCurrency, formatDate)
│
├── features/                 # ← the heart of the app
│   ├── auth/
│   │   ├── api/authApi.js         # login / refresh / logout calls
│   │   ├── store/authStore.js     # Zustand: user + in-memory token + status
│   │   ├── hooks/                  # useLogin, useLogout, useAuthInit
│   │   ├── components/LoginPage.jsx
│   │   └── index.js               # public surface
│   │
│   ├── orders/
│   │   ├── api/ordersApi.js        # data-access (mock + real)
│   │   ├── hooks/useOrders.js      # useOrders / useOrder / useUpdateOrderStatus
│   │   ├── components/             # OrdersTable, OrderRow, OrderDetail…
│   │   └── index.js
│   │
│   ├── products/  kyc/  c2c/  strikes/  fraud/   ← same shape per domain
│
├── data/                     # mock datasets (used when VITE_USE_MOCK=true)
├── pages/                    # LEGACY — being migrated into features (see §6)
├── index.css
└── main.jsx                  # entry: <AppProviders><App/></AppProviders>
```

## 3. Layer responsibilities

| Layer | Folder | Responsibility | Knows about |
|-------|--------|----------------|-------------|
| Composition | `app/` | Wire providers + routing | Everything |
| Config | `config/` | Env vars | Nothing |
| Infra | `lib/` | HTTP client, query client, keys | Auth store (for token) |
| Feature API | `features/*/api/` | Talk to backend / mock | `lib/axios`, `config` |
| Feature hooks | `features/*/hooks/` | React Query + store glue | feature api, store |
| Feature store | `features/*/store/` | Client state (Zustand) | Nothing |
| Feature UI | `features/*/components/` | Render + local state | feature hooks |
| Shared UI | `components/` | Dumb, reusable views | Nothing domain-specific |

Data flows one way:
**component → feature hook → feature api → `lib/axios` → backend**, and back.

## 4. State management — three tiers

The single most common mistake is putting everything in one global store.
Instead, classify state and use the right tool for each:

### Tier 1 — Server state → **React Query** (`@tanstack/react-query`)

Anything that lives in the database (orders, products, KYC queue). React Query
owns fetching, caching, dedup, background refetch, and loading/error flags. You
write **zero** `useState`/`useEffect` for fetching.

```jsx
// features/orders/hooks/useOrders.js
export function useOrders(filters = {}) {
  return useQuery({
    queryKey: queryKeys.orders.list(filters),
    queryFn: () => fetchOrders(filters),
  });
}

// In a page — that's the whole data layer:
function AllOrders() {
  const [status, setStatus] = useState("All");
  const { data: orders = [], isLoading, isError } = useOrders({ status });

  if (isLoading) return <Spinner />;
  if (isError)   return <ErrorState />;
  return <OrdersTable rows={orders} />;
}
```

Writes invalidate the cache so the UI self-updates:

```jsx
const update = useUpdateOrderStatus();
update.mutate({ id, status: "Delivered" }); // list refetches automatically
```

### Tier 2 — Global client state → **Zustand**

Small, app-wide state that isn't server data: the logged-in user, the
in-memory access token, theme, sidebar-open. Tiny and boilerplate-free.

```jsx
// read just what you need (re-renders only when `user` changes)
const user = useAuthStore((s) => s.user);
const logout = useLogout();
```

### Tier 3 — Local UI state → **useState**

State that belongs to one component: form inputs, which tab is active, which row
is selected, modal open/closed. Keep it local — don't promote it to a store.

```jsx
const [search, setSearch] = useState("");
const [activeTab, setActiveTab] = useState("All");
```

Decision rule: **Does the server own it? → React Query. Do many unrelated
components need it? → Zustand. Otherwise → useState.**

## 5. Authentication — login API + in-memory JWT with refresh

Chosen model: the **access token lives only in memory** (Zustand), and a
long-lived **refresh token is an httpOnly cookie** the JavaScript never sees.
This avoids the XSS token-theft risk of `localStorage` while surviving reloads.

Backend contract expected by `features/auth/api/authApi.js`:

```
POST /auth/login    { email, password } -> { user, accessToken }   + Set-Cookie: refresh (httpOnly)
POST /auth/refresh  {}                   -> { user, accessToken }   (reads refresh cookie)
POST /auth/logout   {}                   -> 204                     (clears refresh cookie)
```

Flow:

1. **Login** — `useLogin` calls `/auth/login`; on success the `{ user,
   accessToken }` lands in `authStore` (status → `authenticated`) and the user
   is redirected to where they were headed.
2. **Authorized requests** — the axios *request* interceptor attaches
   `Authorization: Bearer <accessToken>` from the store.
3. **Token expiry** — when any request returns `401`, the axios *response*
   interceptor calls `/auth/refresh` once (the cookie rides along), stores the
   new token, and replays the original request. Parallel 401s share one refresh.
4. **Reload** — memory is wiped, so on startup `useAuthInit` calls
   `/auth/refresh` silently. While it runs, `ProtectedRoute` shows a splash, so
   an authenticated user never flashes the login screen.
5. **Logout** — `useLogout` hits `/auth/logout`, clears the store, and calls
   `queryClient.clear()` to drop all cached data.

`ProtectedRoute` wraps every private route; unauthenticated users are redirected
to `/login` with their intended destination remembered.

> **Mock mode:** set `VITE_USE_MOCK=true` to develop with no backend — login
> accepts any non-empty email/password and data comes from `src/data/`. Flip to
> `false` and point `VITE_API_URL` at the real API to go live. No code changes.

## 6. Migration plan — current → target

The skeleton is additive and the app already runs through it. Migrate pages into
features **incrementally**, one domain at a time, with no big-bang rewrite.

Mapping:

| Today | Becomes |
|-------|---------|
| `src/App.jsx` (routing) | `src/app/router/AppRouter.jsx` (done; old file now a re-export) |
| `src/main.jsx` | thin entry via `AppProviders` (done) |
| `src/layout/MainLayout.jsx`, `src/components/sidebar/` | `src/components/layout/` |
| `src/pages/AllOrders.jsx` | `src/features/orders/components/AllOrders.jsx` |
| `src/pages/ProductCatalog.jsx` | `src/features/products/components/ProductCatalog.jsx` |
| `src/pages/KycReview.jsx` | `src/features/kyc/components/KycReview.jsx` |
| `src/pages/C2CDrafts.jsx` | `src/features/c2c/components/C2CDrafts.jsx` |
| `src/pages/StrikeManagement.jsx` | `src/features/strikes/components/StrikeManagement.jsx` |
| `src/pages/Fraudreview.jsx` | `src/features/fraud/components/FraudReview.jsx` |
| `src/pages/Overview.jsx` | `src/features/dashboard/components/Overview.jsx` |
| inline `const data = [...]` in pages | `features/<x>/api/` + `data/` mock |

Per-feature recipe (use orders as the worked example that's already done):

1. Create `features/<name>/{api,hooks,components,index.js}`.
2. Move the page component into `components/`, update its import in
   `AppRouter.jsx`.
3. Extract the page's hardcoded array into `api/<name>Api.js` (mock + real
   branches) and a `data/` file.
4. Add a `use<Name>()` query hook in `hooks/`; replace the component's inline
   array with `const { data = [] } = use<Name>()`.
5. Add cache keys to `lib/queryKeys.js`.
6. Export the public surface from `index.js`.

Suggested order (lightest first): Orders ✅ → Products → KYC → C2C → Strikes →
Fraud → Dashboard.

## 7. Conventions

- One component per file; component file = PascalCase, others = camelCase.
- Import a feature only through its `index.js`, never deep paths.
- New env var? Add it to `config/env.js` and `.env.example` — nowhere else.
- New cache key? Add it to `lib/queryKeys.js`.
- Keep `components/ui/` dumb (no data fetching, no store access).
- Format/derive data in `utils/` or selectors, not inside JSX.

## 8. Setup

New dependencies were added to `package.json` (`@tanstack/react-query`, `axios`,
`zustand`). Install and run:

```bash
npm install
cp .env.example .env     # VITE_USE_MOCK=true works with no backend
npm run dev
```

You'll land on `/login`. In mock mode, any email + password signs you in and
drops you into the existing dashboard, now behind the auth guard.
