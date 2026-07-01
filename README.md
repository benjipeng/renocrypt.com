# renocrypt.com

> The source for **[renocrypt.com](https://www.renocrypt.com)**, a writing site on machine learning, AI, and engineering, published under the *Matrix Alchemy* banner.

[![Live](https://img.shields.io/badge/live-renocrypt.com-0a0d1a?logo=ghost&logoColor=22d3ee)](https://www.renocrypt.com)
[![Astro](https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-222?logo=githubactions&logoColor=white)](.github/workflows/deploy.yml)

This repository builds and deploys renocrypt.com. It is a static [Astro](https://astro.build/) site — no runtime server, no theme submodule; everything lives under `src/`.

## Stack

- **[Astro 5](https://astro.build/)** as the static site generator (static output)
- **[Tailwind CSS 4](https://tailwindcss.com/)** via `@tailwindcss/vite`, with theme tokens in `src/styles/global.css` (day/night aware)
- **[MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/)** content with **KaTeX** math (`remark-math` + `rehype-katex`) and **Shiki** syntax highlighting (`github-dark-default`)
- **Content collections** (`src/content.config.ts`): `posts` (ML/AI writing) and `dev` (engineering notes)
- **RSS** (`@astrojs/rss`) and **sitemap** (`@astrojs/sitemap`); images optimized with `sharp`
- Variable fonts via Fontsource: Schibsted Grotesk, Spline Sans Mono, Unbounded
- **GitHub Actions** builds the site and publishes it to **GitHub Pages**
- Custom domain `www.renocrypt.com` (`public/CNAME`), with HTTPS enforced

## Local development

Requires **Node 22** (matches CI).

```bash
git clone https://github.com/benjipeng/renocrypt.com.git
cd renocrypt.com
npm install

# Start the dev server
npm run dev
```

The preview runs at `http://localhost:4321`. Other scripts:

```bash
npm run build     # production build to ./dist
npm run preview   # serve the built ./dist locally
npm run check     # astro check (TypeScript + template diagnostics)
```

## Structure

| Path | Purpose |
| :-- | :-- |
| `astro.config.mjs` | Site config, integrations, and the Markdown/MDX pipeline (math, Shiki) |
| `src/pages/` | Routes — `index`, `about`, `dev/`, `posts/`, `topics/`, `[...slug]`, `rss.xml.ts` |
| `src/content/` | Content collections (`posts/`, `dev/`); schema in `src/content.config.ts` |
| `src/layouts/` | `Base.astro` (shell, `<head>`, nav/footer) and `Article.astro` |
| `src/components/` | UI components, plus `art/` — the per-section generative SVGs |
| `src/styles/global.css` | Tailwind entry and theme tokens (dark default, light override) |
| `src/lib/` | Content helpers (collections, topics, canonical URLs) |
| `public/` | Files served verbatim: `favicon.svg`, `og.png`, `CNAME`, `robots.txt` |
| `.github/workflows/deploy.yml` | Build-and-deploy pipeline (Astro → GitHub Pages) |

## Deployment

Each push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): it sets up Node 22, installs with `npm ci`, builds with `npm run build` (`astro build`), and publishes `./dist` to GitHub Pages. DNS points `www.renocrypt.com` at Pages, so no manual step is needed after merge.

## License

Site content and posts are © Benji Peng unless noted otherwise. Site code builds on Astro and Tailwind CSS, each under the MIT license.
