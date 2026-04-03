# AGENTS.md — Legide Stitches

> Handcrafted crochet fashion brand — static frontend + Express dev server.

---

## 📦 Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Express dev server on `http://localhost:3000` |
| `npm run preview` | Same as dev (static preview) |
| `npm run build` | No-op — static site, no build step |

**No linter, formatter, or test runner** is currently configured. Add ESLint/Prettier if needed.

---

## 📁 Project Structure

```
legide-stitches/
├── server.js              # Express static server (ESM)
├── package.json
├── public/
│   ├── images/            # All product, hero, category, testimonial images
│   └── icons/             # favicon.svg
└── src/
    ├── css/
    │   ├── base/          # variables.css, reset.css, typography.css
    │   ├── components/    # navbar, buttons, cards, footer
    │   ├── layout/        # grid.css, sections.css
    │   └── main.css       # Entry point — @imports all CSS
    ├── js/
    │   ├── main.js        # Theme, forms, filters, lazy load, scroll
    │   ├── navbar.js      # Mobile hamburger toggle
    │   ├── slider.js      # Testimonial carousel
    │   └── animations.js  # IntersectionObserver fade-in
    └── pages/
        ├── index.html
        ├── shop.html
        ├── about.html
        └── contact.html
```

---

## 🎨 Code Style Guidelines

### HTML
- **Semantic elements** — `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`
- **Accessibility** — `aria-label`, `aria-hidden`, `role`, `alt` on all images
- **BEM naming** — `block__element--modifier` (e.g., `product-card__image-wrapper`, `btn--primary`)
- **Data attributes** — Use `data-*` for JS hooks: `data-product-id`, `data-category`, `data-form`, `data-field`, `data-action`, `data-filter`
- **No inline CSS or JS** — everything goes in dedicated files
- **Page header** — `<link>` to `../css/main.css`, `<script>` tags at bottom with `defer`

### CSS
- **Entry point** — `src/css/main.css` imports all sub-modules via `@import`
- **Import paths** — relative to `src/css/`: `base/variables.css`, `components/navbar.css`, `layout/sections.css`
- **CSS custom properties** — all design tokens in `base/variables.css` (colors, spacing, typography, shadows, transitions)
- **8pt spacing grid** — use `--space-*` variables
- **Responsive breakpoints** — `480px`, `768px` (tablet), `1024px` (desktop)
- **Mobile-first** — base styles are mobile, `@media (min-width: ...)` for larger
- **No inline styles** — never use `style=""` attributes

### JavaScript
- **IIFE modules** — each JS file is wrapped in `(function () { 'use strict'; ... })();`
- **Object pattern** — group related logic into objects (e.g., `const ThemeManager = { init() {...} }`)
- **DOM ready** — check `document.readyState === 'loading'` before attaching `DOMContentLoaded`
- **Event delegation** — prefer attaching listeners to parents when handling multiple similar elements
- **Passive listeners** — use `{ passive: true }` on scroll/touch events
- **No frameworks** — vanilla JS only

### Server (server.js)
- **ESM** — `"type": "module"` in package.json
- **Static serving** — `express.static(__dirname)` serves entire project root
- **Port** — `process.env.PORT || 3000`
- **Graceful shutdown** — handles `SIGINT`

---

## 🖼️ Images

- All images live in `public/images/`
- HTML references use relative paths: `../../public/images/filename.jpg`
- CSS references from `src/css/layout/sections.css` use: `../../../public/images/filename.jpg`
- CSS references from `src/css/main.css` use: `../../public/images/filename.jpg`

---

## 🔌 Backend Integration

- Forms in `main.js` have simulated submission — replace with `fetch('/api/...')` calls
- Product data is hardcoded in HTML — replace with API-driven rendering when backend is ready
- `data-*` attributes are already in place for API mapping
