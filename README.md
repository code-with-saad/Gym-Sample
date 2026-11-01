# Gym Web Platform

![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.x-black?style=for-the-badge&logo=framer)
![Lucide](https://img.shields.io/badge/Lucide_Icons-1.x-F5A623?style=for-the-badge)

Live demo — coming soon

---

## Overview

A multi-page, dark-aesthetic web application built for fitness clubs, strength facilities, and gyms. Built with the Next.js App Router and compiled to a fully static export (`output: 'export'`), it is designed as a pitch platform: a single codebase renders personalized preview pages for prospective gym clients via `/demo/[slug]` routes driven by a local `data/leads.json` file.

Design tokens are centralized as CSS variables with three switchable themes: **Gold**, **Rose**, and **Lime**.

---

## Features

- **Dark premium aesthetics**: near-black backgrounds, surface elevations, subtle borders, and accent glow highlights.
- **Three CSS-variable themes**: `gold` (strength/performance default), `rose` (women's fitness), `lime` (high-energy conditioning).
- **Home sections**:
  - Hero with Bebas Neue typography, rating badge, diagonal slash accents, and dual CTAs.
  - 5-column glass feature strip overlapping the hero bottom.
  - About section with 4 animated count-up stat counters.
  - Programs grid: 6 training disciplines (Gym Training, Weight Loss, Muscle Building, Personal Training, Cardio Endurance, Group Classes).
  - Continuous animated marquee strip.
  - 4-step process blueprint.
  - Coach roster with credentials and booking buttons.
  - Membership pricing matrix with monthly, quarterly, and yearly billing toggles (PKR currency).
  - Testimonial carousel with star ratings and swipe gesture support.
  - Interactive before/after comparison drag sliders.
  - FAQ accordion with smooth state transitions.
  - Full-width CTA conversion band and comprehensive footer.
- **Multi-page architecture**:
  - `/` Home landing page (summary with hero, feature strip, teasers, testimonials, final CTA)
  - `/about` Facility overview, coaches roster, process blueprint, and biometric calculator
  - `/programs` Training discipline specifications, weekly class timetable, membership pricing (#pricing), and FAQ
  - `/gallery` Image gallery with category filter, full-screen lightbox, and before/after comparison sliders
  - `/contact` Location details, operating hours, inquiry form, embedded Google Maps, and FAQ
  - `/demo` Index listing of all demo previews
  - `/demo/[slug]` Personalized lead pitch pages (requires `data/leads.json` — see below)
- **Demo mode content rules**: all testimonials, trainer cards, and pricing on `/demo/[slug]` pages are clearly marked as sample content and contain no claims specific to the lead's business.
- **Interactive tools**:
  - Mifflin-St Jeor biometric calculator (BMI, BMR, TDEE, daily protein target).
  - Zero-backend WhatsApp join form dispatching prefilled `wa.me` messages.
  - Sticky navbar with scroll-triggered blur, scroll progress bar, back-to-top button, and floating contact button.
- **Static SEO**: pre-rendered Open Graph tags, Twitter cards, dynamic sitemap, and robots configuration.
- **Mobile-first responsive**: fluid `clamp()` typography, horizontal scroll containers with snap for schedule tabs and gallery filters, `touch-action: pan-y` on drag elements, 44px minimum tap targets, 16px minimum input font sizes, full-height mobile menu drawer.

---

## Configuration-Driven Architecture

All content is decoupled from layout components:

- **`src/config/gym.config.ts`**: centralized configuration for the default site (identity, phone, WhatsApp, programs, pricing, coaches, schedule, FAQ).
- **`src/config/images.ts`**: image registry pointing to assets in `public/images/`. Drop in real photos without changing component code.
- **`src/lib/leads.ts`**: lead parser for `/demo/[slug]` static routes. Gracefully returns an empty array when `data/leads.json` is absent.

---

## Demo Pages (`/demo/[slug]`)

Demo pages are generated from `data/leads.json`, which lives **outside** `next-site/` and is **not committed** to the repository. This keeps real contact details and business data out of version control.

### Adding leads

1. Create `data/leads.json` adjacent to the `next-site/` folder (i.e., at `<repo-root>/next-site/../data/leads.json`).
2. The file must be a JSON array. Each entry requires:

```json
[
  {
    "slug": "url-safe-gym-name",
    "name": "Gym Display Name",
    "rating": 4.8,
    "reviews": 300,
    "phoneE164": "+92XXXXXXXXXX",
    "whatsapp": "92XXXXXXXXXX",
    "address": "Full address string",
    "hours": "Mon-Sat(6am-11pm), Sun(Closed)",
    "about": "Optional raw notes string",
    "audience": "mixed",
    "flags": {
      "sauna": false,
      "wifi": true,
      "parking": false,
      "onlineClasses": false,
      "childCare": false
    }
  }
]
```

- `audience`: `"mixed"` or `"ladies"` — controls which theme and program set is used.
- `whatsapp`: phone number digits only (no `+`). Empty string disables WhatsApp and falls back to a call link.
- If `data/leads.json` is absent, the build succeeds and no `/demo/[slug]` pages are generated.

---

## Setup and Run

### Prerequisites

- Node.js 18.17+ or 20+
- npm 9+

### Installation

```bash
cd next-site
npm install
```

### Development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Lint and type check

```bash
npm run lint
npx tsc --noEmit
```

### Static production build

```bash
npm run build
```

Generates a complete static export into `out/`, ready for deployment to any static host (Vercel, Cloudflare Pages, AWS S3/CloudFront, Netlify, or Apache/Nginx).
