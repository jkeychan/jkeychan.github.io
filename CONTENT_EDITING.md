## How to edit content and images (Home, Publications, Resume)

This doc explains where text and images live, and how to preview and deploy safely using the `gh-pages` staging flow.

### 1) Quick file map

- Home page: `site/src/app/page.tsx`
  - Headline: the `<h1>` string near the top ("Hello I&apos;m Jeff Bollinger").
  - Typewriter tagline: the `phrases={[ ... ]}` array passed to `TypewriterText`.
  - CTA button labels/links: the three `<a>` elements under the typewriter tagline.
  - "What I do" and "Core skills" lists: inside the two small cards under the CTAs.
  - "Recent highlights": three `ProjectCard` elements at the bottom of the file. Edit title, description, link, and image.

- Publications page: `site/src/app/project/page.tsx`
  - Main publications grid: the `publications` array at the top. Each item supports:
    - `imageSrc`, `title`, `description`, `linkHref`
    - Optional: `imageFit: "cover" | "contain"` and `imagePosition: "center" | "top" | "bottom" | "left" | "right"` to control cropping.
  - Additional links grid: the `additionalLinks` array. For most links the image is auto-wired to a placeholder SVG in `/placeholders/*.svg`. For YouTube items we set `imageSrc` explicitly (already created themed placeholders).

- Resume page: `site/src/app/resume/page.tsx`
  - The embedded viewer links to the PDF/DOCX in `site/public/static/media/*`.

- Shared layout (nav/footer, SEO): `site/src/app/layout.tsx`
  - Nav links, footer links, JSON-LD, and canonical metadata live here.

- Static files served as-is:
  - Images and documents: `site/public/static/media/*`
  - Placeholder images (auto-generated SVGs): `site/public/placeholders/*`
  - SEO files (served by gh-pages): `site/public/sitemap.xml`, `site/public/robots.txt`

### 2) Edit the Home page text

1. Open `site/src/app/page.tsx`.
2. Update the `<h1>` text and the `phrases={[ ... ]}` array for the typewriter.
3. Change CTA labels or URLs by editing the three `<a>` tags under the typewriter.
4. Edit the lists under "What I do" and "Core skills" inside the two small cards.
5. Adjust "Recent highlights" by editing the three `ProjectCard` components at the bottom. Each card supports:
   - `imageSrc`, `title`, `description`, `linkHref`
   - Optional visual controls: `imageFit` (cover/contain) and `imagePosition` (center/top/bottom/left/right)

### 3) Edit the Publications page

1. Open `site/src/app/project/page.tsx`.
2. In the `publications` array, add or edit objects with:
   ```ts
   {
     imageSrc: "/static/media/<your-image>.png",
     title: "Title",
     description: "Short synopsis",
     linkHref: "https://...",
     // optional
     imageFit: "contain", // or "cover"
     imagePosition: "center" // top|bottom|left|right
   }
   ```
3. In the `additionalLinks` array, add items with `title` and `href`. To use a custom image, add `imageSrc: "/placeholders/your-file.svg"` (or a file in `/static/media/`).
4. If a card crops awkwardly, add `imageFit: "contain"` and/or `imagePosition` to keep the full composition in view.

### 4) Update images

- Put new images into: `site/public/static/media/`
  - Recommended size for card images: ~1200×630 (landscape), PNG/JPG/SVG.
  - Use descriptive filenames (e.g., `linkedin-rebuilding-ir.png`).
- For placeholder-style graphics, drop SVGs into: `site/public/placeholders/` and reference them via `/placeholders/<file>.svg`.
  - The Additional Links grid auto-derives placeholders by slug; you can override with a custom `imageSrc`.

### 5) Local preview

```bash
cd site
npm install        # first time only
npm run dev -p 3000
# Visit http://127.0.0.1:3000
```

### 6) Commit, push, and deploy to staging (gh-pages)

1. Commit your edits on the feature branch:
   ```bash
   git add -A
   git commit -m "content: home/publications updates"
   git push origin feat/static-next-export
   ```
2. In GitHub → Actions, run the workflow: "Build → gh-pages branch (manual)" with ref `feat/static-next-export`.
3. Ensure GitHub Pages is configured to serve from the `gh-pages` branch (Settings → Pages → Source: `gh-pages` / root).
4. After the run completes, hard-refresh the live site.

### 7) Keep sitemaps and robots in sync

- Live site reads `site/public/sitemap.xml` and `site/public/robots.txt`. Update these when adding/removing routes.
- After deployment, submit the sitemap at:
  - Google: Search Console → Sitemaps → `https://www.jeff-bollinger.com/sitemap.xml`
  - Bing: Webmaster Tools → Sitemaps → `https://www.jeff-bollinger.com/sitemap.xml`

### 8) Notes

- All external links open in a new tab by default (`target="_blank"`).
- Card ALT text is derived from the `title` field.
- If you see Pages serving older files, re-run the `gh-pages` manual workflow and hard-refresh (CDN cache).


