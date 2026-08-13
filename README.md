# Portfolio — Axel Balitaan

A single-page personal portfolio built with the Next.js App Router. It is one
continuous scroll through six sections, with the navbar, background, and text
colors re-theming themselves as each section comes into view.

## Stack

- **Next.js 15** (App Router, Turbopack dev server) + **React 19**
- **Tailwind CSS v4** — configured entirely in CSS, no `tailwind.config.js`
- **framer-motion** — scroll progress and entrance animations
- **Lenis** — smooth scrolling
- **lucide-react** — icons
- **react-intersection-observer**, **prop-types**
- ESLint 9 flat config (`eslint.config.js`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | `eslint .` |

### Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Sets `metadataBase` so OG/Twitter image URLs resolve absolutely. Falls back to `VERCEL_URL`, then `http://localhost:3000`. |

## Structure

```
app/
  layout.js               fonts, metadata/OG tags, root shell
  page.js                 the six scroll sections, in order
  globals.css             Tailwind import, @theme tokens, typography classes
  components/
    AppShell.jsx          Lenis setup, loading screen, ScrollProvider + Navbar
    Backdrop.jsx          fixed background that re-colors per section
    Navbar.jsx, Logo.jsx, ProjectCard.jsx, SectionHeading.jsx, Tag.jsx, Wave.jsx
    animation/            CardsAnimation, FadeScroll, SlideDiv
  sections/               Hero, Projects, Experience, Education, Skills, Contact
  utils/
    ScrollProvider.jsx    section definitions + active-section theme context
    ProjectList.js  ExperienceList.js  EducationList.js  SkillList.js  ContactList.js
```

The six sections — `home`, `projects`, `experience`, `education`, `skills`,
`contact` — are declared twice and must stay in sync: as `<section data-section="…">`
elements in `app/page.js`, and as theme entries in `app/utils/ScrollProvider.jsx`.
`ScrollProvider` measures the real on-screen offsets of the `data-section`
elements (sections are `min-h-svh`, so they can be taller than a viewport) and
exposes the active section's colors through the `useScrollTheme()` hook.

### Fonts and theme

Fonts are **Syne** (headings) and **Plus Jakarta Sans** (body), loaded and
self-hosted via `next/font/google` in `app/layout.js` and exposed to Tailwind as
`--font-var1` / `--font-var2`.

Tailwind v4 has no JS config here — colors (`brand-white`, `brand-primary`,
`brand-black`, `brand-gray`, …) and font tokens live in the `@theme static` block
in `app/globals.css`, alongside the `heading1`/`largetext`/`regulartext`/`smalltext`
typography component classes.

## Editing content

Copy lives in the data files under `app/utils/`, not in the components. To update
the site, edit these:

| File | Section |
| --- | --- |
| `ProjectList.js` | Projects (title, subtitle, accent `color`, stack tags, description, image, link) |
| `ExperienceList.js` | Experience (company, role, period, bullets) |
| `EducationList.js` | Education — exports `education`, `certifications`, `publications` |
| `SkillList.js` | Skills, grouped by category |
| `ContactList.js` | Contact links |

Project images go in `public/` and are referenced by filename via `imagePath`.

## Gotcha: never interpolate Tailwind class names

Tailwind v4 emits only the classes it finds as **complete literal strings** in the
source. A class assembled at runtime is never generated, so the style silently
disappears — no error, no build warning.

```js
// WRONG — Tailwind never sees "text-brand-white", nothing is emitted
const cls = `text-${color}`;

// RIGHT — full literal string
const cls = "text-brand-white";
```

Two consequences to preserve:

- `ScrollProvider.jsx` stores **full class strings** (`"bg-brand-primary"`,
  `"text-brand-black"`) per section rather than composing them from a color name.
  Add a section by writing out every class in full.
- Per-project accent colors are arbitrary hex values from `ProjectList.js`, so
  `ProjectCard.jsx` applies them with inline `style={{ color: project.color }}`
  instead of an arbitrary Tailwind value like `text-[--color]`.

This is the easiest way to break the site without noticing.

## Deploy

Deploys to Vercel as a standard Next.js app. Set `NEXT_PUBLIC_SITE_URL` to the
production domain once it is pointed.
