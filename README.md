# Legide Stitches - Frontend

> Handcrafted Elegance in Every Stitch

A modern, elegant, and responsive frontend website for **Legide Stitches** — a premium crochet fashion brand specializing in handcrafted crochet wears.

---

## 📁 Project Structure

```
legide-stitches/
│
├── public/
│   ├── images/          # Product & brand images
│   ├── icons/           # SVG icons & favicon
│   └── fonts/           # Custom fonts (if any)
│
├── src/
│   ├── css/
│   │   ├── base/
│   │   │   ├── reset.css          # CSS reset & normalize
│   │   │   ├── typography.css     # Typography styles & utilities
│   │   │   └── variables.css      # CSS custom properties (design tokens)
│   │   ├── components/
│   │   │   ├── navbar.css         # Navigation bar styles
│   │   │   ├── buttons.css        # Button variants & states
│   │   │   ├── cards.css          # Product, testimonial, category cards
│   │   │   └── footer.css         # Footer layout & styles
│   │   ├── layout/
│   │   │   ├── grid.css           # Grid system & flex utilities
│   │   │   └── sections.css       # Section layouts (hero, about, etc.)
│   │   └── main.css               # Main CSS entry point (imports all)
│   │
│   ├── js/
│   │   ├── main.js                # Core utilities, theme, forms, filters
│   │   ├── navbar.js              # Mobile menu toggle & behavior
│   │   ├── slider.js              # Testimonial carousel
│   │   └── animations.js          # Scroll-triggered fade-in animations
│   │
│   └── pages/
│       ├── index.html             # Homepage
│       ├── shop.html              # Product catalog
│       ├── about.html             # Brand story & mission
│       └── contact.html           # Contact form & info
│
├── .gitignore
└── README.md
```

---

## 🎨 Design System

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| **Primary** | Purple | `#c16efa` |
| **Secondary** | Sage Green | `#848e78` |
| **Tertiary** | Warm Peach | `#d99c74` |
| **Neutral** | Warm Cream | `#f5f2ed` |

### Typography

| Role | Font | Style |
|------|------|-------|
| **Headings** | Playfair Display | Serif, elegant |
| **Body** | Inter | Sans-serif, clean |
| **Accent** | Cormorant Garamond | Serif, italic quotes |

---

## 🚀 Getting Started

### Option 1: Open Directly

Simply open `src/pages/index.html` in your browser. No build step required.

### Option 2: Use a Local Server

For the best experience (especially for font loading and CORS):

```bash
# Using Python
cd legide-stitches/src/pages
python -m http.server 8080

# Using Node.js (npx)
npx serve src/pages

# Using PHP
cd legide-stitches/src/pages
php -S localhost:8080
```

Then visit `http://localhost:8080/index.html`

---

## ✨ Features

### Pages
- **Homepage** — Hero, featured products, about preview, categories, testimonials, newsletter
- **Shop** — Product grid with category filtering
- **About** — Brand story, mission & vision, craftsmanship process
- **Contact** — Contact form with validation, contact info, social links

### Functionality
- ✅ Responsive mobile navbar with hamburger toggle
- ✅ Dark/light mode toggle (persisted in localStorage)
- ✅ Smooth scrolling navigation
- ✅ Product hover animations (scale + overlay)
- ✅ Testimonial slider/carousel with auto-play & swipe
- ✅ Form validation (contact & newsletter)
- ✅ Lazy loading images
- ✅ Scroll progress indicator
- ✅ Fade-in on scroll animations
- ✅ Product category filtering (shop page)
- ✅ Loading skeleton styles (ready for API integration)

### Design
- ✅ Mobile-first responsive design
- ✅ BEM CSS naming convention
- ✅ Semantic HTML5 structure
- ✅ Accessible (ARIA labels, focus states, keyboard navigation)
- ✅ CSS custom properties for easy theming
- ✅ Clean, modular, reusable components

---

## 🔌 Backend Integration Ready

The frontend is structured for seamless Node.js backend integration:

### API-Ready Attributes
- `data-product-id` — Product identifiers for API calls
- `data-category` — Category filtering support
- `data-form` — Form type identification
- `data-field` — Form field mapping
- `data-action` — Action buttons (view-details, add-to-cart)

### Integration Points

```javascript
// Product API (in main.js - ProductFilter)
// Replace simulated data with:
// const response = await fetch('/api/products');

// Form Submission (in main.js - FormValidator)
// Replace simulated submission with:
// const response = await fetch('/api/contact', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(formData),
// });

// Newsletter (in main.js - FormValidator)
// const response = await fetch('/api/newsletter', { ... });
```

### Template Variables
When integrating with a templating engine (EJS, Handlebars, etc.):
- Product data → loop through `{{products}}`
- Categories → loop through `{{categories}}`
- User info → `{{user.name}}`, `{{user.cartCount}}`

---

## 📱 Responsive Breakpoints

| Breakpoint | Device |
|------------|--------|
| `320px` | Small mobile |
| `480px` | Mobile |
| `768px` | Tablet |
| `1024px` | Desktop |
| `1280px` | Large desktop |

---

## 🛠️ Customization

### Changing Colors

Edit `src/css/base/variables.css`:

```css
:root {
  --color-primary: #c16efa;
  --color-secondary: #848e78;
  --color-tertiary: #d99c74;
  --color-neutral: #f5f2ed;
}
```

### Changing Fonts

1. Update the Google Fonts import in `src/css/main.css`
2. Update font variables in `src/css/base/variables.css`

### Adding Products

Add product cards in `shop.html` with the structure:

```html
<article class="product-card" data-product-id="X" data-category="category">
  <div class="product-card__image-wrapper">
    <img src="path/to/image.jpg" alt="Product name" class="product-card__image" loading="lazy">
    ...
  </div>
  <div class="product-card__content">
    <span class="product-card__category">Category</span>
    <h3 class="product-card__title">Product Name</h3>
    <p class="product-card__price">₦00,000</p>
  </div>
</article>
```

---

## 📄 License

© 2026 Legide Stitches. All rights reserved.

---

## 🤝 Support

For questions or issues, contact: hello@legidestitches.com
