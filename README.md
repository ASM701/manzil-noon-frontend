# Manzil Noon — منزل نون

> A family house of fashion, built with love and named for Nada.

Manzil Noon is a full-stack e-commerce website for a Kuwaiti loungewear brand. The name translates to "House of Noon" in Arabic — Noon (ن) being the Arabic letter for N, the initial of the founder's mother, Nada. Products are crafted in Lebanon and sold in Kuwait.

🌐 **Live Site:** [manzilnoon.com](https://manzilnoon.com)

---

## Overview

Manzil Noon offers a curated collection of women's and kids' loungewear including robes, ponchos, and matching accessories. Each product is handcrafted in Lebanon and comes with matching slippers. The website provides a seamless shopping experience with product videos, color variant switching, gift wrapping, and complete-the-set options.

---

## Features

### Storefront
- Product catalog with category filtering (Robes, Ponchos, Bags, Kids)
- Color variant switching with image and video updates
- Multi-image gallery per product
- Looping product video previews
- Complete the Set — pairs robes with matching bags at a discounted price
- Gift wrapping option with +KD 18.000 addition
- Size selector for applicable products (e.g. Long/Short for Everyday Robe)
- Sold Out / Low Stock indicators
- New In page for latest arrivals
- Collections dropdown navigation

### User Accounts
- Register and login with email/password
- Persistent wishlist — saved across sessions and devices
- Persistent cart — saved across sessions and devices
- Profile page with personal details and order history
- Secure authentication via Supabase Auth

### Checkout & Orders
- Checkout page with delivery details form
- Order summary with gift wrapping indicators
- Order confirmation with success page
- Order history in user profile

### Admin Dashboard
- View all orders with customer details (name, email, phone, address)
- Update order status (Pending → Confirmed → Shipped → Delivered → Cancelled)
- Inventory management — adjust stock per variant and size
- Automatic stock decrease on order placement
- Email notification on every new order

### Email Notifications
- Order confirmation email to store owner on every purchase
- Contact form submissions delivered via email
- Powered by Resend with verified `manzilnoon.com` domain

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | UI framework and build tool |
| React Router | Client-side routing |
| CSS Modules | Component-scoped styling |
| Supabase JS | Authentication and session management |
| Cormorant Garamond + Jost | Brand typography |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| Supabase (PostgreSQL) | Database and storage |
| Resend | Transactional email |
| Vercel | Hosting and deployment |

### Database Tables
- `products` — product catalog
- `product_variants` — color variants with images and videos
- `product_variant_sizes` — size options per variant (e.g. Long/Short)
- `wishlists` — user wishlisted items
- `carts` — user cart items
- `orders` — placed orders
- `order_items` — individual items within each order
- `profiles` — user profile data
- `site_settings` — global settings (gift price, gift image)

---

## Project Structure

```
manzil-noon/
├── public/                  # Static assets and favicon
├── src/
│   ├── assets/              # Product images and logo
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── CartSidebar.jsx
│   │   ├── StoryBanner.jsx
│   │   └── LogoMark.jsx
│   ├── context/             # Global state management
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   ├── lib/                 # API and Supabase client
│   │   ├── api.js
│   │   └── supabase.js
│   ├── pages/               # Page components
│   │   ├── HomePage (inline in App.jsx)
│   │   ├── ProductDetailPage.jsx
│   │   ├── NewInPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── WishlistPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── OrderSuccessPage.jsx
│   │   └── AdminPage.jsx
│   ├── App.jsx              # Root component and routes
│   ├── main.jsx             # Entry point
│   └── index.css            # Global CSS variables
├── index.html
├── vite.config.js
└── vercel.json              # Vercel routing config
```

---

## Deployment

The frontend is deployed on **Vercel** and automatically redeploys on every push to `main`.

**Live URL:** [manzilnoon.com](https://manzilnoon.com)

---

## Brand

- **Name:** Manzil Noon (منزل نون) — House of Nada
- **Based in:** Kuwait
- **Made in:** Lebanon
- **Instagram:** [@manzilnoonkw](https://www.instagram.com/manzilnoonkw)
- **Colors:** Navy `#16166B` · Cream `#F5F0E6` · Taupe `#C4AE96`
- **Fonts:** Cormorant Garamond (headings) · Jost (body)

---

## Related Repositories

- **Backend:** [manzil-noon-backend](https://github.com/ASM701/manzil-noon-backend) — Node.js + Express API

---

## License

Private repository. All rights reserved © 2025 Manzil Noon.