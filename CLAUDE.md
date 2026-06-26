# CLAUDE.md — Green Light House
# Complete project context for Claude Code.
# Read this entire file before writing any code.
# Every design decision, color, component, and feature is specified here.
# ══════════════════════════════════════════════════════════════════════

## PROJECT OVERVIEW

Name:          Green Light House
Brand mark:    GLH
Domain:        greenlighthouse.pk
Business:      Premium lighting retail store
Location:      Township, Lahore, Pakistan
Contact:       Hassaan — WhatsApp: 0323-4641691
WA deep link:  https://wa.me/923234641691

Type:          Full-stack ecommerce website
Stack:         Next.js 14 (App Router) + MongoDB + Mongoose + Tailwind CSS
Language:      JavaScript (no TypeScript)
CSS:           Tailwind CSS v3 + custom CSS variables in globals.css
Images:        Cloudinary for all uploaded images
Auth:          JWT + HTTP-only cookies (admin only)

DO NOT use plain React (Create React App). This project MUST use
Next.js 14 with App Router for server-side rendering (SEO critical).
DO NOT use a separate Express server. Use Next.js API routes (/app/api/).

---

## TECH STACK — EXACT PACKAGES

```bash
# Initialize project
npx create-next-app@latest green-light-house --js --tailwind --app --no-src-dir

# Dependencies to install
npm install mongoose cloudinary next-cloudinary
npm install jsonwebtoken bcryptjs cookie
npm install @tailwindcss/aspect-ratio
npm install react-hot-toast
npm install swiper               # product image gallery
npm install react-leaflet leaflet # Google Maps alternative (free)
```

---

## FOLDER STRUCTURE

```
green-light-house/
├── CLAUDE.md                    ← This file (do not delete)
├── .env.local                   ← Environment variables
├── next.config.js
├── tailwind.config.js
├── app/
│   ├── layout.js                ← Root layout (fonts, providers, navbar, footer)
│   ├── page.js                  ← Homepage
│   ├── globals.css              ← Design tokens + Tailwind base
│   ├── category/
│   │   └── [slug]/
│   │       └── page.js          ← Category or subcategory page
│   ├── product/
│   │   └── [slug]/
│   │       └── page.js          ← Single product page
│   ├── cart/
│   │   └── page.js
│   ├── about/
│   │   └── page.js
│   ├── faq/
│   │   └── page.js
│   ├── contact/
│   │   └── page.js
│   ├── search/
│   │   └── page.js
│   ├── admin/
│   │   ├── layout.js            ← Admin layout (sidebar, different from public)
│   │   ├── page.js              ← Admin dashboard
│   │   ├── login/
│   │   │   └── page.js
│   │   ├── products/
│   │   │   ├── page.js          ← All products list
│   │   │   ├── new/
│   │   │   │   └── page.js      ← Add product form
│   │   │   └── [id]/
│   │   │       └── page.js      ← Edit product form
│   │   ├── categories/
│   │   │   ├── page.js
│   │   │   ├── new/
│   │   │   │   └── page.js
│   │   │   └── [id]/
│   │   │       └── page.js
│   │   ├── orders/
│   │   │   └── page.js
│   │   ├── reviews/
│   │   │   └── page.js
│   │   └── settings/
│   │       └── page.js
│   └── api/
│       ├── products/
│       │   ├── route.js         ← GET all, POST create
│       │   └── [id]/
│       │       └── route.js     ← GET one, PUT update, DELETE
│       ├── categories/
│       │   ├── route.js
│       │   └── [id]/
│       │       └── route.js
│       ├── reviews/
│       │   ├── route.js
│       │   └── [id]/
│       │       └── route.js
│       ├── orders/
│       │   └── route.js
│       ├── upload/
│       │   └── route.js         ← Cloudinary upload handler
│       ├── auth/
│       │   ├── login/
│       │   │   └── route.js
│       │   └── logout/
│       │       └── route.js
│       └── settings/
│           └── route.js
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── DarkModeToggle.jsx
│   │   └── FloatingWhatsApp.jsx
│   ├── ui/
│   │   ├── CategoryCard.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ReviewCard.jsx
│   │   ├── Button.jsx
│   │   ├── Badge.jsx
│   │   ├── StarRating.jsx
│   │   └── Breadcrumb.jsx
│   ├── homepage/
│   │   ├── CategorySection.jsx
│   │   ├── NewArrivalsSection.jsx
│   │   ├── FeaturedSection.jsx
│   │   ├── SaleSection.jsx
│   │   └── ReviewsSection.jsx
│   ├── product/
│   │   ├── ImageGallery.jsx
│   │   ├── ProductInfo.jsx
│   │   ├── ProductSpecs.jsx
│   │   └── RelatedProducts.jsx
│   ├── cart/
│   │   ├── CartItem.jsx
│   │   ├── CustomerForm.jsx
│   │   ├── OrderPopup.jsx
│   │   └── WhatsAppGenerator.js
│   └── admin/
│       ├── AdminSidebar.jsx
│       ├── ProductForm.jsx
│       ├── CategoryForm.jsx
│       ├── ImageUploader.jsx
│       └── ReviewModerator.jsx
├── lib/
│   ├── mongodb.js               ← Database connection
│   ├── cloudinary.js            ← Cloudinary config
│   ├── auth.js                  ← JWT helpers
│   └── whatsapp.js              ← Message template generator
├── models/
│   ├── Product.js
│   ├── Category.js
│   ├── Review.js
│   ├── Order.js
│   └── Settings.js
└── context/
    ├── DarkModeContext.jsx
    └── CartContext.jsx
```

---

## ENVIRONMENT VARIABLES (.env.local)

```
MONGODB_URI=mongodb://localhost:27017/greenlighthouse
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_very_long_secret_key_here
NEXT_PUBLIC_SITE_URL=https://greenlighthouse.pk
NEXT_PUBLIC_WHATSAPP_NUMBER=923234641691
```

---

## DESIGN SYSTEM — PASTE THIS INTO globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── Google Fonts ─────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;500;600&display=swap');

/* ── Design Tokens ────────────────────────────────────────── */
:root {
  /* Brand colors */
  --clr-primary:          #1A4731;
  --clr-primary-dark:     #122F21;
  --clr-gold:             #C9A84C;
  --clr-gold-dark:        #A8893A;
  --clr-whatsapp:         #25D366;
  --clr-whatsapp-dark:    #1DA851;

  /* Light mode (default) */
  --clr-page-bg:          #F8F7F4;
  --clr-surface:          #FFFFFF;
  --clr-text-primary:     #1C1C1C;
  --clr-text-secondary:   #6B6B6B;
  --clr-text-muted:       #999999;
  --clr-border:           #E8E8E8;

  /* Dark mode (toggled via JS class on <html>) */
  /* These are overridden in .dark class below */

  /* Category card overlay (CRITICAL — do not change) */
  --cat-overlay: linear-gradient(
    to top,
    rgba(0,0,0,0.82) 0%,
    rgba(0,0,0,0.25) 40%,
    rgba(0,0,0,0.06) 70%
  );

  /* Typography */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body:    'Inter', -apple-system, sans-serif;
  --font-label:   'Montserrat', Arial, sans-serif;

  /* Transitions */
  --transition-default: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-color:   color 200ms ease, background-color 400ms ease;
}

/* ── Dark Mode ────────────────────────────────────────────── */
html.dark {
  --clr-page-bg:        #090909;
  --clr-surface:        #111111;
  --clr-text-primary:   #F0EDE6;
  --clr-text-secondary: rgba(255,255,255,0.55);
  --clr-text-muted:     rgba(255,255,255,0.30);
  --clr-border:         rgba(255,255,255,0.08);
}

/* ── Base Styles ─────────────────────────────────────────── */
body {
  background-color: var(--clr-page-bg);
  color: var(--clr-text-primary);
  font-family: var(--font-body);
  transition: background-color 0.4s ease, color 0.4s ease;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 400;
}

/* ── Category Card ────────────────────────────────────────── */
/* 
  IMPORTANT: When admin uploads a real photo, the image sits
  behind this overlay. The photo is fully visible in the upper
  portion of the card (rgba 0.06 = almost transparent).
  The bottom 40% gets progressively darker for text readability.
  Result: beautiful photo + always-readable category name.
*/
.category-card {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transition: var(--transition-default);
}

.category-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 500ms ease;
}

.category-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--cat-overlay);
  pointer-events: none;
  z-index: 1;
}

.category-card:hover img {
  transform: scale(1.06);
}

.category-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
}

.category-card .card-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

/* ── Product Card ─────────────────────────────────────────── */
.product-card {
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 250ms ease, box-shadow 250ms ease;
  background: var(--clr-surface);
  border: 0.5px solid var(--clr-border);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.product-card:hover .product-image img {
  transform: scale(1.04);
}

.product-image {
  overflow: hidden;
  position: relative;
}

.product-image img {
  transition: transform 400ms ease;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── Scrollbar ────────────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--clr-border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--clr-text-muted); }
```

---

## TAILWIND CONFIG — tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:    '#1A4731',
        'primary-dark': '#122F21',
        gold:       '#C9A84C',
        'gold-dark':'#A8893A',
        whatsapp:   '#25D366',
        ivory:      '#F8F7F4',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['Inter', '-apple-system', 'sans-serif'],
        label:   ['Montserrat', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        card: '10px',
        btn:  '2px',
        'btn-wa': '4px',
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

---

## COMPONENT SPECIFICATIONS

### Navbar (components/layout/Navbar.jsx)

```
Height:          64px (desktop), 56px (mobile)
Position:        sticky top-0 z-50
Background:      var(--clr-primary) = #1A4731

Transparent state: on homepage, the navbar is transparent when
  scrollY < 80. After 80px scroll it becomes solid #1A4731.
  Use useEffect + window.addEventListener('scroll', ...).

LOGO (left):
  Line 1: "GLH"
    font-family: var(--font-heading) [Playfair Display]
    font-size: 18px
    font-weight: 400
    color: #FFFFFF
    letter-spacing: 0.28em

  Line 2: "Green Light House"
    font-family: var(--font-label)
    font-size: 7px
    color: rgba(255,255,255,0.40)
    letter-spacing: 0.20em
    text-transform: uppercase

NAV LINKS (center, desktop only):
  - Shop         → /category (shows all top-level categories)
  - Categories   → dropdown or /category
  - New Arrivals → /new-arrivals (filter tag)
  - About        → /about

  Style: color rgba(255,255,255,0.70), font-label 11px, letter-spacing 0.04em
  Hover: color #FFFFFF, gold bottom-border appears

RIGHT SIDE (desktop):
  - Search input: bg rgba(255,255,255,0.08), border rgba(255,255,255,0.14),
                  border-radius 3px, placeholder "Search products..."
  - Heart icon:   wishlist (future feature, show as icon only for now)
  - Cart icon:    links to /cart, show item count badge in gold
  - WhatsApp:     color #25D366, links to wa.me deep link
  - Dark toggle:  30px circle button, moon/sun emoji
                  onclick: document.documentElement.classList.toggle('dark')
                  Also save preference to localStorage

MOBILE (< 768px):
  - Hamburger icon left
  - GLH logo center
  - Cart icon right
  - Drawer: full-screen from left, includes search + links + WA button
```

### Category Card (components/ui/CategoryCard.jsx)

```jsx
// Props: { category, size }
// size: 'homepage' | 'subcategory' (same visual, different height in parent)

// CRITICAL IMAGE OVERLAY IMPLEMENTATION:
// The image IS visible — it shows through the gradient overlay.
// Upper 70% of card: almost no overlay (image crystal clear)
// Lower 30%: progressively darker (text lives here, always readable)
// This is the exact effect seen in the approved design.

// Structure:
<div className="category-card" style={{ height: size === 'homepage' ? '320px' : '240px' }}>
  {/* REAL PHOTO FROM CLOUDINARY */}
  <Image
    src={category.image}
    alt={category.name}
    fill
    className="object-cover"
  />

  {/* GRADIENT OVERLAY — makes text readable, photo still beautiful */}
  {/* This is in CSS via .category-card::after */}

  {/* GOLD BORDER — subtle premium touch */}
  <div className="absolute inset-0 rounded-card border border-[rgba(201,168,76,0.15)] pointer-events-none z-10" />

  {/* CATEGORY TAG — top left */}
  <div className="absolute top-3 left-3 z-20 ...">
    <span>{category.name}</span>
  </div>

  {/* CENTER CONTENT — always visible, sits on dark overlay */}
  <div className="card-content">
    <span className="text-gold text-[9px] font-label tracking-[0.35em] uppercase">Explore</span>
    <h3 className="font-heading text-white text-[28px]">{category.name}</h3>
    <div className="w-10 h-[0.8px] bg-[rgba(201,168,76,0.55)]" />
    <div className="flex items-center gap-[5px] text-[rgba(255,255,255,0.48)] text-[10px] font-label tracking-[0.18em] uppercase">
      <span>Discover Collection</span>
      <ArrowRightIcon />
    </div>
  </div>
</div>
```

### Product Card (components/ui/ProductCard.jsx)

```
Structure (top to bottom):
  1. IMAGE AREA (height: 200px desktop, 160px mobile)
     - Product photo (object-fit: cover)
     - Background fallback: #E8E4DC (warm gray)
     - Badge: top-left NEW (#1A4731 bg) or top-right SALE (#C9A84C bg)
     - Wishlist heart: top-right, 22px circle, white 90% bg
     - Image zooms on card hover (scale 1.04, overflow hidden)

  2. INFO AREA (padding: 12px)
     - Category label: Montserrat 8px, #999, uppercase, letter-spacing 0.08em
     - Product name: Playfair Display 13px, var(--clr-text-primary), 2-line max
     - Star rating (for bestsellers): gold stars, review count in gray
     - PRICE ROW:
         Regular: Inter 600, 13px, #1A4731 (PKR X,XXX format)
         Sale: new price in green + old price strikethrough gray
       + WhatsApp button: 26px circle, #1A4731 bg, white WA icon
         onclick: opens wa.me link with pre-filled product inquiry message

WhatsApp message template for product cards:
  `Hi! I'm interested in ${product.name} (Ref: ${product.sku}).
   Please confirm availability and delivery details.`
  URL: https://wa.me/923234641691?text=...encoded...
```

### Dark Mode Toggle (components/layout/DarkModeToggle.jsx)

```jsx
// This is a simple button that toggles dark class on <html>
// It also saves to localStorage so preference persists

'use client';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('glh-theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      localStorage.setItem('glh-theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('glh-theme', 'dark');
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="w-[30px] h-[30px] rounded-full bg-[rgba(255,255,255,0.10)]
                 border border-[rgba(255,255,255,0.20)] flex items-center
                 justify-center text-sm transition-all duration-300 cursor-pointer"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
```

---

## ALL PAGES — SPECIFICATIONS

### Homepage (/app/page.js)

Sections in order (top to bottom):
1. Navbar (sticky, transparent on load → green on scroll)
2. Category Section — full-width cards, one per row, main categories only
3. New Arrivals — horizontal scroll on mobile, 4-col grid desktop, 8 products
4. Featured Products — 4-col grid, products marked isFeatured: true
5. Sale Products — products with salePrice set
6. Customer Reviews — 3 testimonials (approved reviews only)
7. Store Info — address, WhatsApp, hours
8. Footer
9. Floating WhatsApp button (bottom-right, fixed)

SEO for homepage:
```js
export const metadata = {
  title: 'Green Light House | Premium Lighting Store in Lahore, Pakistan',
  description: 'Shop premium indoor and outdoor lighting at Green Light House, Lahore. Chandeliers, pendants, wall lights, LED panels and more. Order via WhatsApp.',
  keywords: 'lights Lahore, ceiling lights Pakistan, chandeliers, pendant lights, LED lights',
  openGraph: {
    title: 'Green Light House — Illuminate Your World',
    description: 'Premium lighting for Pakistani homes and offices.',
    url: 'https://greenlighthouse.pk',
    images: [{ url: '/og-image.jpg' }],
  },
};
```

### Category Page (/app/category/[slug]/page.js)

This page handles ALL levels of the category hierarchy.

Logic:
```
if (category.children.length > 0) {
  // Show subcategory cards — 2 per row
  // Do NOT show products
} else {
  // Show products — 4 per row (desktop)
  // Show filters: price range, sort by
}
```

Always show:
- Breadcrumb navigation at top
- Category name as H1
- Category description (if set)

Breadcrumb example:
  Home > Outdoor Lighting > Garden Lights
  Schema: BreadcrumbList JSON-LD

Card layout for subcategories:
  grid-template-columns: repeat(2, 1fr) always (regardless of depth)
  Cards are same .category-card component, height 240px

### Product Listing (same page, when category has no children)

Grid:
  Desktop (1024px+):  4 columns, gap 24px
  Tablet (768px):     3 columns, gap 16px
  Mobile (< 768px):   2 columns, gap 12px

Filters sidebar (desktop) / bottom sheet (mobile):
  - Price range slider
  - Sort: Newest, Price low-high, Price high-low, Most reviewed
  - In stock only toggle

### Product Detail (/app/product/[slug]/page.js)

Sections:
1. Breadcrumb
2. Product gallery (Swiper.js, up to 10 images)
   - Main image large view
   - Thumbnail strip below
   - Click main image: full-screen lightbox
   - Swipe on mobile
3. Product info:
   - H1: product name
   - Star rating + review count (anchor to reviews)
   - Price (or sale price with original crossed out)
   - Short description
   - Badges: NEW / SALE / FEATURED
   - Stock status: In Stock / Out of Stock / Limited Stock
   - Spec table (wattage, lumens, fitting, IP rating, dimensions, material, dimmable, warranty)
   - PRIMARY CTA: "Order via WhatsApp" button (#1A4731, full width)
   - SECONDARY CTA: "Add to Cart" button (outline, full width)
4. Full description (expandable)
5. Related products (same category, 4 cards)
6. Customer reviews section

SEO: Product schema JSON-LD (Product, AggregateRating, Offer)

### Cart (/app/cart/page.js)

Layout:
- Left: Cart items list (image, name, qty stepper, price, remove)
- Right: Order summary + Customer info form

Customer form fields:
  - Full Name (required)
  - Phone Number (required)
  - City (required)
  - Special Instructions (optional textarea)

"Place Order" button:
  1. Validates form
  2. Shows OrderPopup modal explaining delivery policy:
     "Green Light House does not provide delivery directly.
      Customers in Lahore may arrange their own rider or collect from our store.
      Customers outside Lahore may use any courier of their choice."
  3. User clicks "Confirm & Send WhatsApp"
  4. Generates WhatsApp message with all order details
  5. Opens wa.me link in new tab
  6. Clears cart

WhatsApp message format:
```
*New Order — Green Light House*

*Customer:* {name}
*Phone:* {phone}
*City:* {city}
*Instructions:* {instructions}

*Items:*
{product name} x{qty} — PKR {price}
{product name} x{qty} — PKR {price}

*Total: PKR {total}*

Order placed via greenlighthouse.pk
```

### Admin Panel (/admin/*)

Admin login at /admin/login (JWT auth, 7-day cookie)
Admin layout has sidebar navigation (not the public navbar/footer)

Admin sidebar links:
  - Dashboard (stats overview)
  - Products (list, add, edit, delete)
  - Categories (tree view, add, edit, delete, reorder)
  - Orders (WhatsApp inquiry log, status: New/Processing/Completed)
  - Reviews (pending approval, approve/reject)
  - Settings (store info, WhatsApp numbers, social links, about text, maps URL)

---

## DATABASE SCHEMAS

### Category

```js
const CategorySchema = new Schema({
  name:        { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  description: String,
  image:       String,              // Cloudinary URL
  parent:      { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  order:       { type: Number, default: 0 },
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });
```

### Product

```js
const ProductSchema = new Schema({
  name:         { type: String, required: true },
  slug:         { type: String, required: true, unique: true },
  sku:          String,
  description:  String,
  shortDesc:    String,
  category:     { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  images:       [String],           // Cloudinary URLs, max 10
  price:        { type: Number, required: true },
  salePrice:    Number,             // If set, product is on sale
  stockStatus:  {
    type: String,
    enum: ['inStock', 'outOfStock', 'limitedStock'],
    default: 'inStock'
  },
  isFeatured:   { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  specs: {
    wattage:      String,
    lumens:       String,
    colorTemp:    String,
    fitting:      String,
    ipRating:     String,
    dimensions:   String,
    material:     String,
    dimmable:     Boolean,
    warranty:     String,
  },
  avgRating:    { type: Number, default: 0 },
  reviewCount:  { type: Number, default: 0 },
  isActive:     { type: Boolean, default: true },
}, { timestamps: true });
```

### Review

```js
const ReviewSchema = new Schema({
  product:    { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name:       { type: String, required: true },
  city:       String,
  rating:     { type: Number, required: true, min: 1, max: 5 },
  title:      String,
  body:       { type: String, required: true },
  photos:     [String],             // Cloudinary URLs
  isApproved: { type: Boolean, default: false },
  adminReply: String,
}, { timestamps: true });
```

### Order

```js
const OrderSchema = new Schema({
  customer: {
    name:  { type: String, required: true },
    phone: { type: String, required: true },
    city:  { type: String, required: true },
    notes: String,
  },
  items: [{
    product:  { type: Schema.Types.ObjectId, ref: 'Product' },
    name:     String,               // snapshot at time of order
    price:    Number,               // snapshot
    qty:      Number,
  }],
  total:     Number,
  status: {
    type: String,
    enum: ['new', 'processing', 'completed', 'cancelled'],
    default: 'new'
  },
  whatsappSent: { type: Boolean, default: false },
}, { timestamps: true });
```

### Settings

```js
const SettingsSchema = new Schema({
  storeName:      { type: String, default: 'Green Light House' },
  address:        String,
  whatsappNumbers:[String],         // multiple allowed
  socialLinks: {
    facebook:  String,
    instagram: String,
    tiktok:    String,
    youtube:   String,
  },
  aboutText:      String,
  mapEmbedUrl:    String,
  businessHours:  String,
  deliveryPolicy: String,
}, { timestamps: true });
```

---

## API ROUTES

```
GET    /api/categories              → all top-level categories
GET    /api/categories/[slug]       → category + children
GET    /api/products                → paginated, with filters (?category=&featured=&sale=&new=&q=)
GET    /api/products/[slug]         → single product with related
POST   /api/products                → create (admin only)
PUT    /api/products/[id]           → update (admin only)
DELETE /api/products/[id]           → delete (admin only)
POST   /api/reviews                 → submit review (public)
GET    /api/reviews?product=        → approved reviews for product
PUT    /api/reviews/[id]/approve    → admin approve
DELETE /api/reviews/[id]            → admin reject
POST   /api/orders                  → save order record
GET    /api/orders                  → admin view all
PUT    /api/orders/[id]             → update status
POST   /api/upload                  → upload image to Cloudinary
POST   /api/auth/login              → admin login
POST   /api/auth/logout             → clear cookie
GET    /api/settings                → public store settings
PUT    /api/settings                → admin update settings
```

---

## MONGODB CONNECTION (lib/mongodb.js)

```js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}
```

---

## SEO IMPLEMENTATION

Every public page must have:
1. Unique <title> and <meta description> via Next.js metadata export
2. Open Graph tags
3. Canonical URL
4. Semantic HTML: <header>, <main>, <section>, <article>, <footer>, <nav>
5. One <h1> per page
6. Breadcrumb component + BreadcrumbList JSON-LD schema
7. Image alt attributes on all <Image> components
8. Clean URLs (slugs, no IDs in URLs)
9. Loading="lazy" on below-fold images
10. loading="eager" + fetchpriority="high" on hero/LCP images

Product page JSON-LD:
```js
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  image: product.images,
  description: product.description,
  sku: product.sku,
  offers: {
    '@type': 'Offer',
    price: product.salePrice || product.price,
    priceCurrency: 'PKR',
    availability: product.stockStatus === 'inStock'
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
  },
  aggregateRating: product.reviewCount > 0 ? {
    '@type': 'AggregateRating',
    ratingValue: product.avgRating,
    reviewCount: product.reviewCount,
  } : undefined,
};
```

---

## WHATSAPP INTEGRATION (lib/whatsapp.js)

```js
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER; // 923234641691

export function productInquiryLink(product) {
  const msg = `Hi! I'm interested in ${product.name} (Ref: ${product.sku || product._id}).%0APlease confirm availability and delivery details.`;
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

export function orderMessageLink(order) {
  const items = order.items
    .map(i => `• ${i.name} x${i.qty} — PKR ${i.price.toLocaleString()}`)
    .join('%0A');
  const msg =
    `*New Order — Green Light House*%0A%0A` +
    `*Customer:* ${order.customer.name}%0A` +
    `*Phone:* ${order.customer.phone}%0A` +
    `*City:* ${order.customer.city}%0A` +
    `*Instructions:* ${order.customer.notes || 'None'}%0A%0A` +
    `*Items:*%0A${items}%0A%0A` +
    `*Total: PKR ${order.total.toLocaleString()}*%0A%0A` +
    `Order placed via greenlighthouse.pk`;
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}
```

---

## DEVELOPMENT ORDER — FOLLOW THIS EXACTLY

### Phase 1 — Foundation (do first)
1. npx create-next-app@latest green-light-house --js --tailwind --app --no-src-dir
2. Install all packages listed above
3. Create .env.local with all variables
4. Copy globals.css content from this file
5. Copy tailwind.config.js from this file
6. Create lib/mongodb.js
7. Create context/DarkModeContext.jsx
8. Create context/CartContext.jsx
9. Wrap app/layout.js with both providers

### Phase 2 — Layout Components (do second)
1. Build Navbar.jsx (with transparent-on-scroll, dark mode toggle, mobile drawer)
2. Build Footer.jsx
3. Build FloatingWhatsApp.jsx (fixed bottom-right, pulse animation)
4. Add Navbar + Footer to app/layout.js

### Phase 3 — UI Components (do third)
1. Build CategoryCard.jsx (with real image + overlay effect)
2. Build ProductCard.jsx (with all states: default, NEW badge, SALE badge)
3. Build Breadcrumb.jsx
4. Build StarRating.jsx
5. Build Button.jsx (4 variants: primary gold, outline green, WA green, text link)
6. Build Badge.jsx (NEW, SALE, FEATURED, OUT OF STOCK)

### Phase 4 — Homepage (do fourth)
1. Build CategorySection.jsx (renders CategoryCard components)
2. Build NewArrivalsSection.jsx (horizontal scroll mobile, grid desktop)
3. Build FeaturedSection.jsx
4. Build ReviewsSection.jsx
5. Assemble app/page.js using mock/static data first

### Phase 5 — Category + Product Pages
1. Build app/category/[slug]/page.js (with subcategory vs product logic)
2. Build product listing grid with filters
3. Build ImageGallery.jsx (Swiper.js based)
4. Build app/product/[slug]/page.js

### Phase 6 — Cart + WhatsApp Order
1. Build CartContext (add, remove, update qty, clear)
2. Build app/cart/page.js
3. Build OrderPopup.jsx (delivery policy modal)
4. Integrate whatsapp.js orderMessageLink

### Phase 7 — Database + API Routes
1. Create all Mongoose models
2. Create lib/mongodb.js connection
3. Build all API routes (see API section above)
4. Replace static/mock data with real API calls using fetch()
5. Add loading states and error handling

### Phase 8 — Admin Panel
1. Build admin login page + JWT auth
2. Build AdminSidebar.jsx
3. Build admin/categories page (tree view)
4. Build admin/products page (data table + CRUD)
5. Build admin/orders page
6. Build admin/reviews page (approve/reject)
7. Build admin/settings page

### Phase 9 — SEO + Performance
1. Add metadata exports to all pages
2. Add JSON-LD schemas (Product, Breadcrumb)
3. Audit all images for alt text
4. Run Lighthouse audit, fix Core Web Vitals issues
5. Test mobile responsiveness on real device

---

## IMPORTANT DESIGN RULES — DO NOT BREAK THESE

1. Category cards ALWAYS show the admin-uploaded photo with gradient overlay
   The overlay CSS is: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.06) 70%)
   This makes the photo visible AND text readable simultaneously.

2. Homepage: category cards are ONE per row (full width), not 2 or 3.

3. Category pages: subcategory cards are always TWO per row.

4. Product grid: FOUR per row on desktop (not 5 — premium spacing matters).

5. Colors: use CSS variables, not hardcoded hex values in component files.

6. Dark mode: toggle the 'dark' class on <html>. Tailwind darkMode: 'class' handles the rest.

7. The green color (#1A4731) is used SPARINGLY. It appears in: navbar, primary buttons, product price text, and one CTA section. The page is mostly ivory (#F8F7F4) and white.

8. WhatsApp button color (#25D366) appears ONLY on WhatsApp-specific buttons.
   Never use this green for decorative elements.

9. Fonts: Headings = Playfair Display. Body = Inter. Labels/buttons = Montserrat.
   Never use a system font for headings.

10. Every Next.js page must export metadata. Never skip this.

---

## DOMAIN & BRAND NOTES

- Website URL:     greenlighthouse.pk
- Brand display:   Green Light House (two E's — correct spelling)
- Social handles:  greeenlighthouse (three E's — username workaround, intentional)
- Logo:            "GLH" in Playfair Display + "Green Light House" below in Montserrat
- On About page:   Mention that social media can be found as @greeenlighthouse
- Contact:         Hassaan — 0323-4641691

# ══════════════════════════════════════════════════════════════════════
# END OF CLAUDE.md
# Read this before every session. All design decisions are final.

# ══════════════════════════════════════════════════════════════════════