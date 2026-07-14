# Girinova Car Rentals — Landing Page

## Overview
A React + Vite single-page marketing site for a car rental & driver service business (Girinova, Visakhapatnam). Static frontend only — no backend or database. Imported from GitHub, originally deployed to GitHub Pages under `/Carrental/`.

## Tech Stack
- React 19 + Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Framer Motion, lucide-react icons

## Running on Replit
- Dev workflow: `Start application` runs `npm run dev`, served on port 5000 (webview).
- `vite.config.js` sets `base: '/'` in dev and `base: '/Carrental/'` only when building for production (`NODE_ENV === 'production'`), since the GitHub Pages deploy expects that subpath but Replit's preview serves from root.

## Structure
- `src/sections/*` — page sections (Hero, Services, Gallery, Testimonials, etc.)
- `src/components/*` — reusable UI (Navbar, VehicleCard, WhatsAppButton, etc.)
- `src/data/*` — static vehicle & testimonial data

## User preferences
- Font: Poppins (practical, widely-supported, not a decorative/display font).
- Background: white/light as the dominant primary color; keep hover and highlight colors deliberate (royal blue `#1E3A8A` primary, warm orange `#F97316` accent/CTA, WhatsApp green `#25D366` for chat actions).
- SEO matters — keep meta description/keywords, Open Graph tags, and structured data (JSON-LD LocalBusiness) up to date as content changes.
- Hero section should have a unique, brand-specific visual concept (not a generic AI-template look) — avoid dark gradient-blob hero patterns.
