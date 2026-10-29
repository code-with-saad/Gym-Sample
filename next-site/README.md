# IronForge Fitness - Premium Gym Web Platform

![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-black?style=for-the-badge&logo=framer)
![Lucide](https://img.shields.io/badge/Lucide_Icons-latest-F5A623?style=for-the-badge)

[Live Demo](https://ironforgefitness.pk) *(Demo placeholder link until production hosting DNS assignment)*

---

## Overview

IronForge Fitness is a multi-page, dark-aesthetic web application designed for high-end fitness clubs, strength facilities, and gyms in Lahore, Pakistan. Built using the Next.js App Router and optimized for static export (`output: 'export'`), the platform provides a production-grade digital experience for pitch demos to local gym owners.

It includes centralized design tokens via CSS variables (supporting **Gold**, **Lime**, and **Rose** themes), dynamic client personalization routes (`/demo/[slug]`), and an interactive suite of gym utilities.

---

## Features

- **Dark Premium Aesthetics**: Near-black backgrounds (`#0A0A0B`), sleek surface elevations (`#121214`), subtle borders, and gold accent glow highlights.
- **Dynamic Theming via CSS Variables**:
  - `gold` (IronForge Default - Strength and Performance)
  - `rose` (Aura / Reshape Ladies - Empowering Women's Fitness)
  - `lime` (High-energy Athletic Conditioning)
- **Home Sections**:
  - High-impact Hero with Bebas Neue typography, rating badges, diagonal slash accents, and dual CTAs.
  - 5-Column bordered glass Feature Strip overlapping the hero bottom.
  - Ethos and Mission section with 4 interactive count-up stat counters.
  - Programs Showcase with 6 specialized disciplines (Gym Training, Weight Loss, Muscle Building, Personal Training, Cardio Endurance, Group Classes).
  - Continuous animated marquee strip of fitness disciplines.
  - 4-step transformation blueprint.
  - Certified coach roster with credentials and 1:1 booking buttons.
  - Membership pricing matrix with monthly, quarterly, and yearly billing toggles (PKR currency).
  - Testimonial carousel with star ratings and verified achievement pills.
  - Interactive Before & After comparison drag slider for body transformations.
  - Accessible FAQ accordion with smooth state transitions.
  - Full-width CTA conversion band and comprehensive footer.
- **Dedicated Multi-Page Architecture**:
  - `/` (Home landing page)
  - `/about` (Facility philosophy, safety protocols, and embedded biometric calculator)
  - `/programs` (Deep dive specifications of all 6 training tracks)
  - `/trainers` (Coach certifications, bios, and direct booking links)
  - `/schedule` (Weekly class timetable with day tabs and category filtering)
  - `/pricing` (Tiered membership breakdown with FAQ)
  - `/gallery` (Facility image gallery with interactive category filter and full-screen lightbox modal)
  - `/contact` (Location information, lazy-loaded Google Maps embed, driving directions, and inquiry form)
  - `/demo` (Index directory listing all lead previews)
  - `/demo/[slug]` (Personalized lead pitch pages driven by `data/leads.json`)
- **Interactive Tools**:
  - **Mifflin-St Jeor Biometric Calculator**: Real-time BMI score, Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and daily protein target recommendations.
  - **Zero-Backend WhatsApp Join Form**: Sanitized client-side form dispatching prefilled, URL-encoded WhatsApp messages (`wa.me`).
  - **Sticky Glass Navbar & Chrome**: Scroll-triggered blur header, scroll progress indicator, back-to-top button, and floating WhatsApp contact button.
  - **Static SEO & Social**: Pre-rendered Open Graph tags, Twitter cards, dynamic sitemap (`/sitemap.xml`), and robots configuration (`/robots.txt`).

---

## Configuration-Driven Architecture

All content is decoupled from layout components:
- **`src/config/gym.config.ts`**: Centralized configuration containing gym identity, phone numbers, WhatsApp, coordinates, programs, pricing, coaches, schedule, and FAQ.
- **`src/config/images.ts`**: Image registry pointing to SVG asset placeholders in `public/images/placeholders/`. Real photos can be dropped in without changing component code.
- **`src/lib/leads.ts`**: Lead parser supplying pre-rendered dynamic routes for `/demo/[slug]` with `generateStaticParams`.

---

## Setup and Run Instructions

### Prerequisites
- Node.js 18.17+ or 20+
- npm 9+

### Installation

```bash
# Navigate into the project folder
cd next-site

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Linting & Type Checking

```bash
npm run lint
```

### Static Production Build

```bash
npm run build
```

This compiles and generates the complete static export bundle into the `out/` folder, ready for deployment to any static hosting provider (Vercel, Cloudflare Pages, AWS S3 / CloudFront, Netlify, or Apache/Nginx).
