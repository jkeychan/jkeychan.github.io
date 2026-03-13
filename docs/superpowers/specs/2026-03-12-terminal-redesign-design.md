# Terminal Redesign — Design Spec

**Date:** 2026-03-12
**Status:** Approved

---

## Overview

Redesign jeff-bollinger.com from its current generic dark/purple aesthetic to a terminal-inspired design with a cyan phosphor palette. The direction is "terminal-inspired, not theatrical" — strong monospace typography and phosphor glow atmosphere without fake command prompts or CLI theater. The goal is a site that feels specific to Jeff's identity as a security author and leader, not a generic tech portfolio.

---

## Design Direction

### Aesthetic
- **Style:** Terminal-inspired. Monospace throughout, cyan-on-near-black, subtle scanline texture.
- **Tone:** No command prompts, no fake shell interactions. The *feeling* of a terminal — not a costume.
- **Memorable element:** Full JetBrains Mono type system + blinking block cursor on hero name + phosphor cyan glow.

### Color System

All colors defined as CSS variables in `globals.css` `@theme` block:

```css
--color-terminal-bg:        #000a0a;
--color-terminal-cyan:      #00e5e5;
--color-terminal-cyan-60:   rgba(0, 229, 229, 0.6);
--color-terminal-cyan-35:   rgba(0, 229, 229, 0.35);
--color-terminal-border:    rgba(0, 229, 229, 0.12);   /* default borders */
--color-terminal-border-hv: rgba(0, 229, 229, 0.25);   /* hover state borders */
--color-terminal-surface:   rgba(0, 229, 229, 0.02);   /* card/block backgrounds */
```

Specific usages:
- **Background (`body`):** solid `#000a0a` — replaces the `linear-gradient(270deg, #1b1429, #140f23)` currently in `globals.css` line 11
- **Primary text:** `#00e5e5`
- **Secondary text / body copy:** `rgba(0, 229, 229, 0.6)`
- **Dim labels / section headings:** `rgba(0, 229, 229, 0.35)`
- **Default borders:** `rgba(0, 229, 229, 0.12)`
- **Hover borders:** `rgba(0, 229, 229, 0.25)`
- **Card / block backgrounds:** `rgba(0, 229, 229, 0.02)`
- **Scanline overlay:** CSS `repeating-linear-gradient` at 0.8% opacity

### Typography

- **Font family:** JetBrains Mono — weights 300, 400, 500, 700 — loaded via `next/font/google`
- **Replaces:** Geist Sans and Geist Mono (both removed entirely)
- **CSS variable:** `--font-jetbrains-mono` set as `--font-sans` and `--font-mono` in `@theme`
- **Hero name:** `text-[40px] md:text-[60px]`, weight 700, `tracking-tight`, cyan `text-shadow: 0 0 40px rgba(0,229,229,0.3)`
- **Section labels (`//` headings):** `text-[11px]`, `tracking-[4px]`, uppercase, `rgba(0,229,229,0.35)`, with bottom border rule
- **Body copy:** `text-[13px] md:text-[14px]`, `leading-[1.7]`
- **Buttons / tags / nav links:** `text-[10px] md:text-[12px]`, `tracking-[2px]`, uppercase

### Scanline Overlay
- A `<div>` in `RootLayout`, `position: fixed`, `inset: 0`, `pointer-events: none`, `aria-hidden="true"`, `z-index: 50`
- CSS: `background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,200,200,0.008) 3px, rgba(0,200,200,0.008) 4px)`
- Nav sits at `z-index: 60` (above scanline)

### Key UI Patterns

- **No rounded corners anywhere:** Remove all `rounded`, `rounded-lg`, `rounded-full`, `rounded-md` from every element — buttons, cards, tags, avatar, skip link. The terminal aesthetic is sharp-edged throughout.
- **Floating-label info blocks:** bordered box (`border`, `bg-terminal-surface`) with a label element `position: absolute; top: -8px; left: 18px` using `background: #000a0a` to cut out from the border line, `text-[10px] tracking-[3px] uppercase opacity-40`
- **Blinking block cursor:** `<span aria-hidden="true">` — `inline-block w-[4px] h-[50px] md:h-[62px] bg-terminal-cyan align-middle ml-1.5 shadow-[0_0_10px_rgba(0,229,229,0.8)]` with class `cursor-blink` (defined in `globals.css`). Stops blinking under `prefers-reduced-motion` (stays visible, opacity 1).
- **Section headings:** text prefixed with `//`, dim cyan, letter-spaced, with `border-b border-terminal-border pb-3 mb-6`
- **Skill tags:** `text-[11px] tracking-[1.5px] uppercase border border-terminal-border bg-terminal-surface px-3 py-1.5`
- **Cards:** `border border-terminal-border bg-terminal-surface overflow-hidden` with `hover:border-terminal-border-hv hover:bg-[rgba(0,229,229,0.04)]`
- **Button primary:** `bg-terminal-cyan text-black font-bold text-[12px] tracking-[2px] uppercase px-5 py-2.5`
- **Button secondary:** `bg-transparent text-terminal-cyan text-[12px] tracking-[2px] uppercase px-5 py-2.5 border border-terminal-border hover:border-terminal-border-hv`
- **Nav:** `fixed z-[60]`, `bg-[rgba(0,10,10,0.92)] backdrop-blur`, `border-b border-terminal-border`
- **Image filter:** Apply `[filter:saturate(0.5)_contrast(1.1)]` as a Tailwind arbitrary-value class to all card and avatar images for palette cohesion. Do not use `saturate-50` or `contrast-110` utilities — use the single arbitrary class.

### Focus Indicators
- Update `globals.css` `:focus-visible` from purple-400 to: `outline: 2px solid #00e5e5; outline-offset: 2px`

---

## Files to Modify

### `site/src/app/globals.css`
1. Replace `@theme` block: remove Geist font variables, add JetBrains Mono variable and all `--color-terminal-*` tokens
2. Replace `body` rule: `background: #000a0a`, `font-family: var(--font-jetbrains-mono), monospace`
3. Update `:focus-visible`: change outline color from `#a78bfa` to `#00e5e5`
4. Remove `.star-field`, `.star-field::before`, `.star-field::after`, and `@keyframes twinkle` entirely (dead code after layout change)
5. Add cursor blink rules:
```css
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
.cursor-blink { animation: blink 1.1s step-end infinite; }
@media (prefers-reduced-motion: reduce) { .cursor-blink { animation: none; opacity: 1; } }
```

### `site/src/app/layout.tsx`
1. Replace `Geist` / `Geist_Mono` imports with `JetBrains_Mono` from `next/font/google` (weights: `['300','400','500','700']`, variable: `--font-jetbrains-mono`)
2. Remove `star-field` `<div>` from JSX
3. Add scanline overlay `<div>` with inline style or className: `fixed inset-0 pointer-events-none z-50 bg-[repeating-linear-gradient(...)]`, `aria-hidden="true"`
4. Update nav: `z-[60]`, new color classes. Add active-link highlighting: extract nav links into a `NavLinks` client component at `site/src/app/(components)/NavLinks.tsx` with `"use client"` directive. It uses `usePathname()` from `next/navigation` — apply `text-terminal-cyan` to the link whose `href` exactly matches the current pathname, `text-terminal-cyan-35 hover:text-terminal-cyan` to all other links. Import and render `<NavLinks />` inside the `<nav>` in `layout.tsx`.
5. Update skip-to-content link: replace `focus:bg-purple-600 focus:text-white` with `focus:bg-terminal-cyan focus:text-black`
6. Update footer classes to new palette
7. All structured data (Schema.org scripts) — **no changes**

### `site/src/app/page.tsx`
Restructure hero JSX. New layout:

```
<section> grid grid-cols-1 md:grid-cols-[1fr_auto] gap-14 items-start
  <div> (text column)
    label:  // security author & leader
    h1:     Jeff\nBollinger + blinking cursor span
    p:      bio text (keep existing copy)
    div:    CTA buttons (Publications primary, Resume/CV secondary)
  </div>
  <div> (avatar column)
    avatar image — square, no border-radius, thin cyan border, subtle glow shadow
    filter: saturate(0.5) contrast(1.1)
  </div>
</section>

<div> (about block — floating-label pattern)
  label: "about"
  content: condensed prose from existing "What I do" bullet list
</div>

<div> (skills row — flex wrap)
  skill tags from existing "Core skills"
</div>

<section> (recent highlights)
  section heading: // recent highlights
  3-col ProjectCard grid (unchanged cards, new styles)
</section>
```

Specific changes:
- Remove `TypewriterText` component usage and import
- Remove decorative SVG `<Image>` (the `home-main.bb0187d...svg`)
- Remove the `lg:grid-cols-3` info section; replace with stacked about block + skills row
- Avatar: keep same `src="/static/media/avatar.d355c64ac071e83edeabfc9c51f454d3.svg"`, dimensions `w-36 h-36 md:w-40 md:h-40` (144px / 160px), remove `rounded-full`, add `border border-terminal-border shadow-[0_0_30px_rgba(0,229,229,0.08)] [filter:saturate(0.5)_contrast(1.1)]`
- "What I do" bullet list → condensed paragraph in about block: *"Cybersecurity leader focused on building and running security operations programs. Detection engineering, incident response, security architecture, and growing high-performing teams."*
- Hero name: `text-[40px] md:text-[60px] font-bold tracking-tight` — remove `font-extrabold`, remove `text-purple-400` span wrapper (whole name is `text-terminal-cyan`)
- Heading text change: remove "Hello I'm" prefix — just "Jeff\nBollinger" with a `<br>` and blinking cursor
- Hero CTAs: two buttons only — "Publications" (primary) and "Resume / CV" (secondary). Remove the standalone LinkedIn CTA button from the hero; LinkedIn remains accessible in the nav.

### `site/src/app/publications/page.tsx`
1. Update page heading to match new pattern: `// writing, talks & appearances` label, then `<h1>Publications</h1>` (change existing h1 text from "Publications and Conferences" to "Publications"). After the h1 text, inline a count badge: `<span className="text-[10px] tracking-[2px] border border-terminal-border px-2.5 py-1 ml-4 align-middle">{publications.length}</span>`. The `publications` array is already imported in the file so `publications.length` is available directly — no additional data fetching needed.
2. Add subtitle paragraph (content from existing page or new brief copy)
3. Update all color/border classes to new palette
4. Add active nav state (handled by `NavLinks` client component in layout)
5. Keep: IntersectionObserver lazy loading, load-more button, all structured data

### `site/src/app/resume/page.tsx`
1. Add page header: `// resume & cv` label + `<h1>Resume / CV</h1>` using new heading pattern
2. Update download buttons to primary/secondary button styles (remove `rounded`)
3. Update iframe container: replace `bg-white rounded overflow-hidden h-[80vh]` with `bg-transparent border border-terminal-border overflow-hidden h-[80vh]`
4. Keep: PDF/DOCX download links, embedded iframe

### `site/src/app/not-found.tsx`
1. `// 404` as section label
2. `<h1>404</h1>` in `text-[60px] font-bold text-terminal-cyan`
3. Brief message and links back to home/publications using new link style
4. Remove purple color class

### `site/src/app/(components)/ProjectCard.tsx`
1. Update className strings: borders → `border-terminal-border`, backgrounds → `bg-terminal-surface`, text colors → new palette
2. Remove inline `style={{ textAlign: "justify" }}` from description element (line ~41)
3. Link/CTA button → new secondary button style
4. Image: add Tailwind arbitrary-value class `[filter:saturate(0.5)_contrast(1.1)]` for palette cohesion. Do not use `saturate-50` or `contrast-110` utilities.

### `site/src/app/(components)/TypewriterText.tsx`
- No changes needed (component is no longer used on the homepage)
- Do not delete — may be used elsewhere or in future

---

## Dependencies

All dependencies are already at latest major versions. On implementation:
- Run `npm install` in `/site` to pull latest patch/minor versions
- Add `JetBrains_Mono` to the font import — no new packages needed
- Remove `Geist` and `Geist_Mono` font imports

---

## What Is Preserved (Do Not Change)

- All Schema.org structured data (`lib/schema.ts`, layout, page files)
- All SEO metadata (title, description, OG tags, Twitter card)
- All ARIA labels, semantic HTML, heading hierarchy, `prefers-reduced-motion` handling
- IntersectionObserver lazy loading on publications page
- `publications/data.ts` — no data changes
- `types.ts` — no type changes
- `lib/schema.ts` — no changes
- Static export configuration (`next.config.ts`)
- CI/CD workflows
- `.nvmrc` (Node 25)

---

## Out of Scope

- Content changes beyond what is explicitly called out above
- New pages or routes
- Any backend or data layer changes
- Adding new npm packages
