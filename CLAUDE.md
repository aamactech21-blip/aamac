# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## Architecture

**Next.js 16 App Router** marketing site for AAMAC Technology (Kuwait AV integration company). No backend — all customer contact is via WhatsApp deep links (`wa.me`) and `mailto:` links.

### Key directories

- `app/` — Pages: `/`, `/about`, `/services`, `/products`, `/contact`
- `components/home/` — Section components that compose the home page
- `components/contact/` — Contact form (submits via `mailto:`)
- `components/ui/` — Shadcn/ui primitives (52 components, don't edit these)
- `lib/utils.ts` — `cn()` helper for Tailwind class merging
- `hooks/` — `use-toast` and `use-mobile` hooks

### Styling

Tailwind CSS v4. Design tokens are defined as CSS variables in `app/globals.css`:
- `--accent-av: #1652F0` (blue, AV services)
- `--accent-products: #E63946` (red, products)
- `--section-bg: #F6F5F2` (light beige, alternating sections)
- Typography: Manrope (sans) + Instrument Serif (accent headings)

### Path alias

`@/*` maps to the project root (set in `tsconfig.json`).

### Build notes

`next.config.mjs` has `ignoreBuildErrors: true` and `images.unoptimized: true` — the site is intended for static export compatibility.
