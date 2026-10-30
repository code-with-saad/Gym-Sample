# GYM SAMPLE WEBSITE

A dark-first, responsive React and Vite sample website for Reshape Ladies Fitness Club. It includes a five-link mobile page-navigation bar, Framer Motion transitions, GSAP scroll effects, and a scroll-driven Three.js dumbbell. Pages cover the club, on-site and online services, example membership options, and contact/location.

The 3D module loads only when its section approaches the viewport. It renders on scroll or resize instead of using a permanent animation loop, with capped pixel density on mobile. A static illustration is shown if WebGL is unavailable, and reduced-motion preferences are respected.

## Run locally

Requirements: Node.js 20 or later.

```sh
npm ci
npm run dev
```

For a production build, run `npm run build`. The output will be placed in `dist/`. Use `npm run preview` to preview it. For a deployed SPA, configure the host to serve `index.html` for routes such as `/classes` and `/membership`.

## Before launch

- Confirm the phone number. The direct-contact instructions supplied **0315 0048177**, which is used on the site. The business row separately listed **0315 8046177**.
- Confirm that the chosen phone number can receive WhatsApp messages. The inquiry form opens a prefilled WhatsApp message; it does not store inquiries or send them from a server.
- Confirm the map result and exact address before visiting or publishing. The map is embedded using the business name and supplied address, not verified coordinates.
- Review excerpts are attributed to their public sources. Confirm permission and current review counts before publishing.
- All photography is illustrative and is not of the actual club. Replace it with approved photographs if available.
- Membership types on the site are examples, not confirmed offers. Add current packages, prices, class times and coaching details after verification.
- The site does not include a live checkout. A real payment provider, merchant account, security setup and confirmed pricing are needed for online payments. The accepted card/NFC methods in the brief are not evidence of an online payment integration.
