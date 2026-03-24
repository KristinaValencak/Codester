# Codester

Production-ready React web application focused on presenting Playwright + Cucumber QA services, educational content, and lead generation through a multilingual landing experience.

## Live Demo

[codester.si](https://codester.si/)

## Overview

Codester is a single-page application built with React and Vite. The project combines:

- Service presentation (Playwright + Cucumber test automation and QA offer)
- Educational sections (Playwright/Cucumber video tutorials and process breakdown)
- Conversion-focused UX (contact form with EmailJS integration)
- Localization-first routing and content (`sl` and `en`)

## Tech Stack

- React 19
- Vite 7
- React Router 7
- i18next + react-i18next
- Tailwind CSS 4
- EmailJS Browser SDK
- React Helmet Async
- Vercel Analytics
- ESLint 9

## Project Structure

```text
codester/
├─ src/
│  ├─ components/        # Landing page sections and shared UI blocks
│  ├─ i18n/              # i18next configuration and locale JSON files
│  ├─ routing/           # Language-aware routing and layout wrappers
│  ├─ App.jsx            # Main page composition
│  └─ main.jsx           # App bootstrap + providers
├─ public/               # Static public assets
├─ en/                   # Optional language route static entry helper
└─ index.html            # Vite HTML entry
```

## Local Development

### Prerequisites

- Node.js 20+ (recommended)
- npm 10+ (recommended)

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Linting

```bash
npm run lint
```

## Environment Variables

Contact form delivery uses EmailJS. Create a `.env` file in the project root and define:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

`VITE_` prefix is required so Vite can expose these variables to the client bundle.

## Localization & Routing

- Default language: Slovenian (`sl`)
- English language path: `/en/*`
- Language is derived from URL first, then from persisted localStorage preference

## Deployment Notes

- Optimized for static hosting platforms (e.g. Vercel, Netlify, Cloudflare Pages)
- Ensure SPA rewrite rules are enabled so client-side routes resolve correctly
- For language routes, keep fallback routing active to `index.html`

## License
All rights reserved © 2026 Kristina Valenčak

This project is a proprietary application and is not open source.  
Unauthorized use, copying, modification, or distribution is strictly prohibited.  
See `LICENSE` for full legal terms.
