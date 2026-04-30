# Small Distillery (Template 4)

Next.js 16 storefront for **[PLAN-04-DISTILLERY.md](../PLAN-04-DISTILLERY.md)**. Forked from the shared storefront stack with themes **Heritage** (default), **Modern Craft**, and **Estate**. Dev server uses port **3005**. Default company slug: **`distillery`**.

## Quick start

```bash
cd distillery
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL and NEXT_PUBLIC_COMPANY_SLUG as needed
npm run dev
```

Open [http://localhost:3005](http://localhost:3005).

## Backend

Same django-crm API as other templates. Provision a company (slug `distillery` or your choice) via `/admin/setup`. First-party catalog products use blank `supplier_slug`; checkout uses `isCourierGuyCartItem` — see PLAN-04 pitfall section.

## Themes

`data-theme`: `heritage` (default), `modern-craft`, `estate`. Cookie / localStorage key: `site_theme`.

## Scripts

- `npm run dev` — dev server (port 3005)
- `npm run build` — production build
- `npm test` — Vitest
