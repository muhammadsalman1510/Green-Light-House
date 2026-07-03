# CLAUDE.md — Green Light House
# Updated after Phase 8 completion.
# Read this entire file before writing any code.
# ══════════════════════════════════════════════════════════════════════

## PROJECT STATUS

Phases 1–8 complete. Frontend UI done. Backend API done.
Phase 9 (connect frontend to API) is next.

Completed:
  Phase 1  — Next.js setup, design tokens, context providers
  Phase 2  — Navbar, Footer, FloatingWhatsApp, Layout
  Phase 3  — UI components + full homepage (mock data)
  Phase 4  — Category pages, product listing, breadcrumbs
  Phase 5  — Product detail page, image gallery, specs, reviews
  Phase 6  — Cart, order popup, WhatsApp order flow
  Phase 7  — Search, FAQ, Contact, About pages
  Phase 8  — MongoDB models, Express API, auth, seed script

Remaining:
  Phase 9  — Connect frontend to real API
  Phase 10 — Admin panel
  Phase 11 — Cloudinary image uploads
  Phase 12 — SEO audit, deployment

---

## RUNNING THE PROJECT

Two terminals required simultaneously:

Terminal 1 — Frontend:
  cd green-light-house/client
  npm run dev
  Runs at: http://localhost:3000

Terminal 2 — Backend:
  cd green-light-house/server
  npm run dev
  Runs at: http://localhost:5000

First time setup (run once):
  cd green-light-house/server
  npm run seed
  Creates admin user: username=admin, password=changeme123

MongoDB:
  Option A (recommended): MongoDB Atlas free tier
    Create account at mongodb.com/atlas
    Create free M0 cluster
    Get connection string
    Add to server/.env as MONGODB_URI=mongodb+srv://...
  Option B: Local MongoDB
    Install MongoDB Community Edition
    Run: mongod

---

## FOLDER STRUCTURE (current state)

green-light-house/
├── CLAUDE.md
├── client/                          ← Next.js frontend
│   ├── package.json
│   ├── next.config.mjs
│   ├── tailwind.config.js
│   ├── .env.local
│   ├── pages/
│   │   ├── _app.js
│   │   ├── _document.js
│   │   ├── index.js                 ← Homepage
│   │   ├── cart.js
│   │   ├── about.js
│   │   ├── faq.js
│   │   ├── contact.js
│   │   ├── new-arrivals.js
│   │   ├── search.js
│   │   ├── 404.js
│   │   ├── category/
│   │   │   ├── index.js
│   │   │   └── [slug].js
│   │   └── product/
│   │       └── [slug].js
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FloatingWhatsApp.jsx
│   │   │   └── Layout.jsx
│   │   ├── ui/
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── StarRating.jsx
│   │   │   ├── Button.jsx
│   │   │   └── Breadcrumb.jsx
│   │   ├── homepage/
│   │   │   ├── CategorySection.jsx
│   │   │   ├── ProductSection.jsx
│   │   │   ├── ReviewsSection.jsx
│   │   │   └── WhatsAppCTASection.jsx
│   │   ├── category/
│   │   │   └── ProductFilters.jsx
│   │   ├── product/
│   │   │   ├── ImageGallery.jsx
│   │   │   ├── ProductSpecs.jsx
│   │   │   ├── RelatedProducts.jsx
│   │   │   └── ProductReviews.jsx
│   │   └── cart/
│   │       ├── CartItem.jsx
│   │       ├── CustomerForm.jsx
│   │       └── OrderPopup.jsx
│   ├── context/
│   │   ├── DarkModeContext.jsx
│   │   └── CartContext.jsx
│   └── lib/
│       ├── mockData.js              ← replaced by API in Phase 9
│       ├── categoryUtils.js         ← partially replaced in Phase 9
│       └── whatsapp.js
│
└── server/                          ← Express backend
    ├── package.json
    ├── server.js
    ├── .env
    ├── lib/
    │   └── mongodb.js
    ├── models/
    │   ├── Category.js
    │   ├── Product.js
    │   ├── Review.js
    │   ├── Order.js
    │   ├── Settings.js
    │   └── Admin.js
    ├── controllers/
    │   ├── authController.js
    │   ├── categoryController.js
    │   ├── productController.js
    │   ├── reviewController.js
    │   ├── orderController.js
    │   ├── settingsController.js
    │   └── uploadController.js
    ├── routes/
    │   ├── auth.js
    │   ├── categories.js
    │   ├── products.js
    │   ├── reviews.js
    │   ├── orders.js
    │   ├── settings.js
    │   └── upload.js
    ├── middleware/
    │   ├── auth.js
    │   └── errorHandler.js
    └── scripts/
        └── seed.js

---

## ENVIRONMENT VARIABLES

client/.env.local:
  MONGODB_URI=mongodb://localhost:27017/greenlighthouse
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  JWT_SECRET=greenlighthouse_super_secret_key_2025
  NEXT_PUBLIC_SITE_URL=https://greenlighthouse.pk
  NEXT_PUBLIC_WHATSAPP_NUMBER=923234641691
  NEXT_PUBLIC_API_URL=http://localhost:5000

server/.env:
  MONGODB_URI=mongodb://localhost:27017/greenlighthouse
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  JWT_SECRET=greenlighthouse_super_secret_key_2025
  PORT=5000
  CLIENT_URL=http://localhost:3000

---

## API ENDPOINTS (all running on port 5000)

PUBLIC (no auth required):
  GET    /health
  GET    /api/categories                    all active top-level or filtered
  GET    /api/categories?parent=null        top-level only
  GET    /api/categories?parent=SLUG        children of that category
  GET    /api/categories/:slug              single category
  GET    /api/products                      paginated, filterable
  GET    /api/products?category=SLUG        by category
  GET    /api/products?featured=true
  GET    /api/products?sale=true
  GET    /api/products?newArrival=true
  GET    /api/products?q=QUERY              search
  GET    /api/products/slug/:slug           single by slug
  GET    /api/products/:id                  single by id
  GET    /api/reviews/product/:productId    approved reviews
  POST   /api/reviews/product/:productId    submit review
  POST   /api/orders                        record order
  GET    /api/settings                      store settings

ADMIN (requires JWT in cookie or Authorization header):
  POST   /api/auth/login
  POST   /api/auth/logout
  GET    /api/auth/me
  GET    /api/categories/admin/all
  POST   /api/categories
  PUT    /api/categories/:id
  DELETE /api/categories/:id
  GET    /api/products/admin/all
  POST   /api/products
  PUT    /api/products/:id
  DELETE /api/products/:id
  GET    /api/reviews/admin/all
  GET    /api/reviews/admin/pending
  PUT    /api/reviews/admin/:id/approve
  PUT    /api/reviews/admin/:id/reply
  DELETE /api/reviews/admin/:id
  GET    /api/orders/admin
  GET    /api/orders/admin/stats
  GET    /api/orders/admin/:id
  PUT    /api/orders/admin/:id             update status
  GET    /api/settings
  PUT    /api/settings
  POST   /api/upload                       upload image to Cloudinary
  DELETE /api/upload                       delete image from Cloudinary

---

## DESIGN SYSTEM

Colors:
  Primary green:    #1A4731   navbar, buttons, prices
  Gold accent:      #C9A84C   eyebrows, badges, decorative
  Page background:  #F8F7F4   light mode
  Dark page:        #090909   dark mode
  Surface:          #FFFFFF   card backgrounds (light)
  Surface dark:     #111111   card backgrounds (dark mode)
  WhatsApp:         #25D366   WhatsApp buttons ONLY

Fonts (loaded via Google Fonts in _document.js):
  Headings:  Playfair Display — var(--font-heading)
  Body:      Inter            — var(--font-body)
  Labels:    Montserrat       — var(--font-label)

Dark mode:
  Toggle: html.dark class on <html> element
  Saved to localStorage as 'glh-theme'
  Tailwind darkMode: 'class' in tailwind.config.js

---

## LAYOUT RULES (do not change these)

Homepage:         category cards ONE per row (full width)
Category pages:   subcategory cards TWO per row always
Product grid:     FOUR columns desktop, THREE tablet, TWO mobile
Breadcrumbs:      on every category and product page

Category card image overlay (critical CSS in globals.css):
  background: linear-gradient(to top,
    rgba(0,0,0,0.82) 0%,
    rgba(0,0,0,0.25) 40%,
    rgba(0,0,0,0.06) 70%
  )
  Upper part shows real photo. Lower part dark for text.

---

## LOGO

Render in Navbar:
  Line 1: "GLH"
    font-heading (Playfair Display), 18px, white, letter-spacing 0.28em
  Line 2: "Green Light House"
    font-label (Montserrat), 7px, white 40%, letter-spacing 0.20em

Do NOT use GR3EN or GREEEN in the navbar logo.

---

## BRAND DETAILS

Store name:     Green Light House
Domain:         greenlighthouse.pk
WhatsApp:       0323-4641691 (Hassaan)
WA deep link:   https://wa.me/923234641691
Address:        Shop 7, 10-1-BII, Khokhar Chowk,
                College Road, Township, Lahore
Social:
  Instagram:    https://www.instagram.com/greenlight.lhr
  Facebook:     https://www.facebook.com/greeenlighthouse
  TikTok:       https://www.tiktok.com/@greeenlighthouse
  YouTube:      https://www.youtube.com/@greeenlighthouse

---

## ADMIN CREDENTIALS (change after first login)

Username: admin
Password: changeme123
Created by: cd server && npm run seed

---

## IMPORTANT ARCHITECTURAL DECISIONS

1. Pages Router (not App Router) — intentional for simplicity.
   Do not add 'use client' directives — that is App Router only.

2. ImageGallery uses dynamic import with ssr: false because
   Swiper.js uses browser DOM APIs.

3. server/lib/mongodb.js reads MONGODB_URI inside connectDB()
   not at module load time — required for ES module + dotenv.

4. category/[slug].js handles ALL category depth levels.
   If category has children → show 2-col subcategory cards.
   If category has no children → show 4-col product grid.

5. Cart uses localStorage via CartContext. No server session.

6. WhatsApp orders: client generates the message and opens
   wa.me link. Server records the order via POST /api/orders.
   This is called in handleConfirmOrder in cart.js.

7. Reviews require admin approval before appearing publicly.
   POST /api/reviews/product/:id saves with isApproved: false.

8. Images stored on Cloudinary. URLs saved as strings in DB.
   Cloudinary folder: 'green-light-house'

9. Cloudinary is configured and working as of Phase 11.
   Credentials are in server/.env (never commit this file).
   Upload flow: admin selects file → POST /api/upload →
   multer buffers the file in memory → uploadController
   converts to base64 → uploads to Cloudinary folder
   'green-light-house' → returns secure_url → stored as
   string in MongoDB → served via next/image component.
   next.config.mjs already has res.cloudinary.com in
   remotePatterns.
   CRITICAL: cloudinary.config() must NOT be called at module
   load time — ES module imports are hoisted above dotenv.config()
   in server.js, so env vars are undefined at that point. The
   uploadController uses a getCloudinary() helper that calls
   cloudinary.config() at request time (same pattern as mongodb.js).

# ══════════════════════════════════════════════════════════════════════
# END CLAUDE.md
# ══════════════════════════════════════════════════════════════════════