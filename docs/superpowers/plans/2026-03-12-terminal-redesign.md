# Terminal Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic dark/purple aesthetic with a terminal-inspired cyan phosphor design using JetBrains Mono throughout, subtle scanlines, and sharp-edged components.

**Architecture:** All changes are CSS class and JSX restructuring within the existing Next.js 15 App Router static export. New files: `NavLinks.tsx` client component. Modified files: `globals.css`, `layout.tsx`, `page.tsx`, `ProjectCard.tsx`, `publications/page.tsx`, `resume/page.tsx`, `not-found.tsx`. No new npm packages; `JetBrains_Mono` is available via `next/font/google`.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS v4, TypeScript 5, Node 25. Static export (`next build` outputs to `site/out/`). CI runs `npm ci && npm run build` on PRs — no separate test runner.

**Spec:** `docs/superpowers/specs/2026-03-12-terminal-redesign-design.md`

**Local commands (run from `site/` directory):**
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build (same as CI): `npm run build`

---

## Chunk 1: Branch Setup and Dependency Refresh

### Task 1: Create feature branch

**Files:** none

- [ ] **Step 1: Create and checkout feature branch**

```bash
git checkout -b feat/terminal-redesign
```

- [ ] **Step 2: Refresh dependencies to latest patch versions**

```bash
cd site && npm install
```

- [ ] **Step 3: Verify baseline build passes before any changes**

```bash
cd site && npm run build
```

Expected: Build completes with no errors. Output in `site/out/`.

- [ ] **Step 4: Verify baseline lint passes**

```bash
cd site && npm run lint
```

Expected: No lint errors.

- [ ] **Step 5: Commit dependency refresh if package-lock.json changed**

```bash
git add site/package-lock.json && git diff --cached --stat
# Only commit if lock file changed
git commit -m "deps: refresh to latest patch versions"
```

---

## Chunk 2: Foundation — CSS Theme and Font

### Task 2: Rewrite `globals.css`

**Files:**
- Modify: `site/src/app/globals.css`

This is the foundation. All other tasks depend on the CSS variables defined here being in place.

- [ ] **Step 1: Replace `globals.css` entirely**

```css
@import "tailwindcss";

@theme inline {
  --color-background: #000a0a;
  --color-foreground: #00e5e5;
  --font-sans: var(--font-jetbrains-mono);
  --font-mono: var(--font-jetbrains-mono);

  /* Terminal color system */
  --color-terminal-bg:        #000a0a;
  --color-terminal-cyan:      #00e5e5;
  --color-terminal-cyan-60:   rgba(0, 229, 229, 0.6);
  --color-terminal-cyan-35:   rgba(0, 229, 229, 0.35);
  --color-terminal-border:    rgba(0, 229, 229, 0.12);
  --color-terminal-border-hv: rgba(0, 229, 229, 0.25);
  --color-terminal-surface:   rgba(0, 229, 229, 0.02);
}

body {
  background: #000a0a;
  color: #00e5e5;
  font-family: var(--font-jetbrains-mono), monospace;
  overflow-y: auto;
}

/* Focus indicators (accessibility) */
:focus-visible {
  outline: 2px solid #00e5e5;
  outline-offset: 2px;
}

/* Blinking block cursor */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.cursor-blink {
  animation: blink 1.1s step-end infinite;
}

@media (prefers-reduced-motion: reduce) {
  .cursor-blink {
    animation: none;
    opacity: 1;
  }
}
```

- [ ] **Step 2: Verify TypeScript still compiles**

```bash
cd site && npm run build 2>&1 | head -30
```

Expected: No TypeScript errors (build may fail on missing font variable — that's expected, fixed in Task 3).

- [ ] **Step 3: Commit**

```bash
git add site/src/app/globals.css
git commit -m "style: replace purple theme with terminal cyan system"
```

---

## Chunk 3: Layout Foundation — Font, Scanline, Nav

Tasks 3 and 4 in this chunk are **independent** and can run in parallel.

### Task 3: Create `NavLinks.tsx` client component

**Files:**
- Create: `site/src/app/(components)/NavLinks.tsx`

This is a new `"use client"` component that handles active-route highlighting. It must be created before `layout.tsx` is updated to import it.

- [ ] **Step 1: Create `NavLinks.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/publications", label: "Publications" },
  { href: "/resume", label: "Resume / CV" },
];

const externalLinks = [
  { href: "https://www.linkedin.com/in/jeffb0llinger", label: "LinkedIn" },
  { href: "https://github.com/jkeychan", label: "GitHub" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-6 w-full">
      <div className="flex items-center gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={
              pathname === href
                ? "text-[12px] tracking-[2px] uppercase text-[#00e5e5]"
                : "text-[12px] tracking-[2px] uppercase text-[rgba(0,229,229,0.35)] hover:text-[#00e5e5]"
            }
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-6">
        {externalLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] tracking-[2px] uppercase text-[rgba(0,229,229,0.35)] hover:text-[#00e5e5]"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd site && npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors on the new file.

- [ ] **Step 3: Commit**

```bash
git add site/src/app/(components)/NavLinks.tsx
git commit -m "feat: add NavLinks client component with active-route highlighting"
```

---

### Task 4: Update `layout.tsx` — font, scanline, nav, skip link

**Files:**
- Modify: `site/src/app/layout.tsx`

- [ ] **Step 1: Replace font import and body classes**

Replace the top of the file:

```tsx
// OLD — remove these two imports:
import { Geist, Geist_Mono } from "next/font/google";

// NEW — replace with:
import { JetBrains_Mono } from "next/font/google";
import { NavLinks } from "./(components)/NavLinks";
```

Replace font instantiation (the two `const geistSans` / `const geistMono` blocks):

```tsx
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
```

- [ ] **Step 2: Update `<body>` className**

```tsx
// OLD:
<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

// NEW:
<body className={`${jetbrainsMono.variable} antialiased`}>
```

- [ ] **Step 3: Replace star-field div with scanline overlay**

```tsx
// OLD — remove this line entirely:
<div className="star-field" aria-hidden="true" />

// NEW — replace with:
<div
  aria-hidden="true"
  style={{
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 50,
    background:
      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,200,200,0.008) 3px, rgba(0,200,200,0.008) 4px)",
  }}
/>
```

- [ ] **Step 4: Update skip-to-content link classes**

```tsx
// OLD:
className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-purple-600 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-medium"

// NEW:
className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-[#00e5e5] focus:text-black focus:px-4 focus:py-2 focus:text-[12px] focus:tracking-[2px] focus:uppercase focus:font-bold"
```

- [ ] **Step 5: Replace `<nav>` contents**

Find the `<div>` that is the direct child of `<nav>` (currently contains the Home/Publications/Resume links and the LinkedIn/GitHub external links). Replace the entire div and everything inside it with:

```tsx
<div className="mx-auto max-w-5xl px-6 py-4 flex items-center">
  <NavLinks />
</div>
```

Also update the `<nav>` element's own classes:

```tsx
// OLD:
<nav className="fixed top-0 left-0 right-0 z-10 backdrop-blur bg-black/10 border-b border-white/10" ...>

// NEW:
<nav className="fixed top-0 left-0 right-0 z-[60] backdrop-blur bg-[rgba(0,10,10,0.92)] border-b border-[rgba(0,229,229,0.12)]" ...>
```

- [ ] **Step 6: Update footer**

```tsx
// OLD:
<footer className="mt-8 border-t border-white/10 text-white/60 text-sm">
  <div className="mx-auto max-w-6xl px-4 py-6">
    <p>&copy; Jeff Bollinger</p>
  </div>
</footer>

// NEW:
<footer className="mt-8 border-t border-[rgba(0,229,229,0.08)]">
  <div className="mx-auto max-w-5xl px-6 py-6">
    <p className="text-[11px] tracking-[2px] text-[rgba(0,229,229,0.2)]">
      &copy; {new Date().getFullYear()} Jeff Bollinger
    </p>
  </div>
</footer>
```

- [ ] **Step 7: Verify build**

```bash
cd site && npm run build 2>&1 | tail -20
```

Expected: Build completes successfully. Font variable resolves, no TypeScript errors.

- [ ] **Step 8: Verify lint**

```bash
cd site && npm run lint
```

Expected: No errors.

- [ ] **Step 9: Commit**

```bash
git add site/src/app/layout.tsx
git commit -m "style: update layout with JetBrains Mono, scanline, terminal nav"
```

---

## Chunk 4: Homepage Restructure

### Task 5: Rewrite `page.tsx`

**Files:**
- Modify: `site/src/app/page.tsx`

This task restructures the hero grid, removes TypewriterText and decorative SVG, adds the about block and skills row.

- [ ] **Step 1: Update imports**

Remove the `TypewriterText` import. Keep all others:

```tsx
import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "./(components)/ProjectCard";
// (remove TypewriterText import)
```

- [ ] **Step 2: Replace the hero section JSX**

Replace the entire `<section>` hero block (lines 85–138 in current file) with:

```tsx
<main className="min-h-[80vh] px-6 md:px-8 pt-8 pb-16 text-[#00e5e5]" id="main-content-inner">
  {/* Hero */}
  <section className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-14 items-start mb-16 pb-16 border-b border-[rgba(0,229,229,0.1)]">
    <div>
      <p className="text-[11px] tracking-[4px] uppercase text-[rgba(0,229,229,0.35)] mb-4">
        // security author &amp; leader
      </p>
      <h1 className="text-[40px] md:text-[60px] font-bold tracking-tight text-[#00e5e5] [text-shadow:0_0_40px_rgba(0,229,229,0.3)] leading-none mb-5">
        Jeff<br />Bollinger
        <span
          aria-hidden="true"
          className="cursor-blink inline-block w-[4px] h-[50px] md:h-[62px] bg-[#00e5e5] align-middle ml-2 [box-shadow:0_0_10px_rgba(0,229,229,0.8)]"
        />
      </h1>
      <p className="text-[13px] md:text-[14px] text-[rgba(0,229,229,0.6)] leading-[1.7] max-w-[440px] mb-8">
        Author of <em>Crafting the Infosec Playbook</em>. Writing and speaking
        on security operations, threat hunting, and incident response.
      </p>
      <div className="flex gap-3">
        <Link
          href="/publications"
          className="bg-[#00e5e5] text-black font-bold text-[12px] tracking-[2px] uppercase px-5 py-2.5"
        >
          Publications
        </Link>
        <Link
          href="/resume"
          className="bg-transparent text-[#00e5e5] text-[12px] tracking-[2px] uppercase px-5 py-2.5 border border-[rgba(0,229,229,0.3)] hover:border-[rgba(0,229,229,0.5)]"
        >
          Resume / CV
        </Link>
      </div>
    </div>
    <div>
      <Image
        src="/static/media/avatar.d355c64ac071e83edeabfc9c51f454d3.svg"
        alt="Jeff Bollinger"
        width={160}
        height={160}
        priority
        className="w-36 h-36 md:w-40 md:h-40 border border-[rgba(0,229,229,0.25)] [box-shadow:0_0_30px_rgba(0,229,229,0.08)] [filter:saturate(0.5)_contrast(1.1)]"
      />
    </div>
  </section>
```

- [ ] **Step 3: Add about block and skills row**

After the hero section closing tag, add:

```tsx
  {/* About block */}
  <div className="mx-auto max-w-5xl mb-8">
    <div className="relative border border-[rgba(0,229,229,0.15)] bg-[rgba(0,229,229,0.02)] px-7 py-5">
      <span className="absolute -top-[9px] left-4 bg-[#000a0a] px-2 text-[10px] tracking-[3px] uppercase text-[rgba(0,229,229,0.4)]">
        about
      </span>
      <p className="text-[13px] text-[rgba(0,229,229,0.65)] leading-[1.8]">
        Cybersecurity leader focused on building and running security operations
        programs. Detection engineering, incident response, security
        architecture, and growing high-performing teams.
      </p>
    </div>
  </div>

  {/* Skills */}
  <div className="mx-auto max-w-5xl flex flex-wrap gap-2 mb-16">
    {[
      "Threat Detection",
      "Incident Response",
      "Detection Engineering",
      "Security Architecture",
      "Executive Leadership",
      "Security Operations",
      "Security Engineering",
    ].map((skill) => (
      <span
        key={skill}
        className="text-[11px] tracking-[1.5px] uppercase border border-[rgba(0,229,229,0.15)] bg-[rgba(0,229,229,0.03)] px-3 py-1.5 text-[rgba(0,229,229,0.5)]"
      >
        {skill}
      </span>
    ))}
  </div>
```

- [ ] **Step 4: Update Recent Highlights section**

Replace the current highlights section:

```tsx
  {/* Recent highlights */}
  <section className="mx-auto max-w-5xl">
    <h2 className="text-[11px] tracking-[4px] uppercase text-[rgba(0,229,229,0.35)] mb-6 pb-3 border-b border-[rgba(0,229,229,0.08)]">
      // recent highlights
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProjectCard
        imageSrc="/static/media/cover-blue-edition.0781c7b04869f677781b.png"
        title="Crafting the Infosec Playbook"
        description="Co-authored book on building incident response programs and monitoring architecture."
        linkHref="https://www.infosecplaybook.com/"
        imageFit="contain"
      />
      <ProjectCard
        imageSrc="/static/media/moonbase.498c0f55cde35211bd65.png"
        title="(Re)building Threat Detection and Incident Response at LinkedIn"
        description="How LinkedIn rebuilt its security operations platform and teams, scaling protection for employees and members."
        linkHref="https://engineering.linkedin.com/blog/2022/-re-building-threat-detection-and-incident-response-at-linkedin"
      />
      <ProjectCard
        imageSrc="/static/media/cloud.e6bacd0aae8c329e0edd.png"
        title="Cloud Security Observability"
        description="Discussion on enterprise-scale observability for detection and response (Google Cloud Security Podcast)."
        linkHref="https://cloud.withgoogle.com/cloudsecurity/podcast/ep96-cloud-security-observability-for-detection-and-response/"
      />
    </div>
  </section>
</main>
```

- [ ] **Step 5: Verify TypeScript**

```bash
cd site && npx tsc --noEmit 2>&1
```

Expected: No errors.

- [ ] **Step 6: Verify build**

```bash
cd site && npm run build 2>&1 | tail -10
```

Expected: Build completes successfully.

- [ ] **Step 7: Commit**

```bash
git add site/src/app/page.tsx
git commit -m "style: redesign homepage with terminal hero, about block, skills row"
```

---

## Chunk 5: Shared Components

### Task 6: Update `ProjectCard.tsx`

**Files:**
- Modify: `site/src/app/(components)/ProjectCard.tsx`

- [ ] **Step 1: Replace the entire component**

```tsx
import Image from "next/image";
import type { ProjectCardProps } from "@/types";

export function ProjectCard({
  imageSrc,
  title,
  description,
  linkHref,
  linkLabel = "Link",
  imageFit = "cover",
  imagePosition = "center",
}: ProjectCardProps) {
  const fitClass =
    imageFit === "contain" ? "object-contain" : "object-cover";
  const posClass =
    imagePosition === "top"
      ? "object-top"
      : imagePosition === "bottom"
        ? "object-bottom"
        : imagePosition === "left"
          ? "object-left"
          : imagePosition === "right"
            ? "object-right"
            : "object-center";

  return (
    <div className="border border-[rgba(0,229,229,0.12)] bg-[rgba(0,229,229,0.02)] overflow-hidden flex flex-col h-full hover:border-[rgba(0,229,229,0.25)] hover:bg-[rgba(0,229,229,0.04)] transition-colors">
      <div className="w-full h-56 md:h-64 bg-[#001010] overflow-hidden relative border-b border-[rgba(0,229,229,0.08)]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`${fitClass} ${posClass} [filter:saturate(0.5)_contrast(1.1)]`}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-[#00e5e5] text-[13px] font-bold mb-2 leading-snug">{title}</h3>
        <p className="text-[rgba(0,229,229,0.45)] text-[11px] flex-1 leading-[1.6]">
          {description}
        </p>
        <div className="mt-4">
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[2px] uppercase text-[rgba(0,229,229,0.6)] hover:text-[#00e5e5]"
          >
            {linkLabel} &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
cd site && npm run lint
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add site/src/app/(components)/ProjectCard.tsx
git commit -m "style: update ProjectCard with terminal aesthetic"
```

---

## Chunk 6: Secondary Pages (run in parallel — no dependencies between them)

Tasks 7, 8, and 9 touch independent files and can be executed simultaneously.

### Task 7: Update `publications/page.tsx`

**Files:**
- Modify: `site/src/app/publications/page.tsx`

- [ ] **Step 1: Update page header and styles**

Replace the `<main>` block (everything inside the outer fragment after the schema scripts) with:

```tsx
<main className="min-h-screen px-6 md:px-8 pt-8 pb-16 text-[#00e5e5]">
  {/* Page header */}
  <div className="mx-auto max-w-5xl mb-12">
    <p className="text-[11px] tracking-[4px] uppercase text-[rgba(0,229,229,0.35)] mb-4">
      // writing, talks &amp; appearances
    </p>
    <h1 className="text-[40px] font-bold tracking-tight text-[#00e5e5] [text-shadow:0_0_30px_rgba(0,229,229,0.2)] leading-none mb-4">
      Publications
      <span className="text-[10px] tracking-[2px] border border-[rgba(0,229,229,0.15)] px-2.5 py-1 ml-4 align-middle font-normal">
        {publications.length}
      </span>
    </h1>
    <p className="text-[13px] text-[rgba(0,229,229,0.5)] leading-[1.7] max-w-[560px]">
      A non-exhaustive collection of blogs, podcasts, articles, conference
      talks, and other publications I&apos;ve created, co-created, or been
      involved in.
    </p>
  </div>

  {/* Grid */}
  <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {visibleItems.map((p) => (
      <ProjectCard key={p.title} {...p} />
    ))}
  </div>

  {/* Load more */}
  {visibleCount < publications.length && (
    <div className="mx-auto max-w-5xl mt-12 pt-6 border-t border-[rgba(0,229,229,0.08)] flex items-center gap-6">
      <button
        onClick={() =>
          setVisibleCount((prev) =>
            Math.min(prev + 12, publications.length),
          )
        }
        aria-label="Load more publications"
        className="bg-transparent text-[#00e5e5] text-[11px] tracking-[2px] uppercase px-5 py-2.5 border border-[rgba(0,229,229,0.3)] hover:border-[rgba(0,229,229,0.5)]"
      >
        Load more
      </button>
      <span className="text-[11px] text-[rgba(0,229,229,0.25)] tracking-[1px]">
        Showing {Math.min(visibleCount, publications.length)} of {publications.length}
      </span>
    </div>
  )}

  <div ref={sentinelRef} className="h-10" />
</main>
```

- [ ] **Step 2: Verify build**

```bash
cd site && npm run build 2>&1 | tail -10
```

Expected: Builds successfully.

- [ ] **Step 3: Commit**

```bash
git add site/src/app/publications/page.tsx
git commit -m "style: update publications page with terminal aesthetic"
```

---

### Task 8: Update `resume/page.tsx`

**Files:**
- Modify: `site/src/app/resume/page.tsx`

- [ ] **Step 1: Replace the `<main>` block**

```tsx
<main className="min-h-screen px-6 md:px-8 pt-8 pb-16 text-[#00e5e5]">
  {/* Page header */}
  <div className="mx-auto max-w-5xl mb-8">
    <p className="text-[11px] tracking-[4px] uppercase text-[rgba(0,229,229,0.35)] mb-4">
      // resume &amp; cv
    </p>
    <h1 className="text-[40px] font-bold tracking-tight text-[#00e5e5] [text-shadow:0_0_30px_rgba(0,229,229,0.2)] leading-none mb-8">
      Resume / CV
    </h1>
    <div className="flex gap-3 mb-8">
      <a
        className="bg-[#00e5e5] text-black font-bold text-[12px] tracking-[2px] uppercase px-5 py-2.5"
        href="/static/media/Jeff_Bollinger-Resume-2023-redacted.31d6cfe0d16ae931b73c.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        View PDF
      </a>
      <a
        className="bg-transparent text-[#00e5e5] text-[12px] tracking-[2px] uppercase px-5 py-2.5 border border-[rgba(0,229,229,0.3)] hover:border-[rgba(0,229,229,0.5)]"
        href="/static/media/Jeff_Bollinger-Resume-2023-redacted.31d6cfe0d16ae931b73c.docx"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download DOCX
      </a>
    </div>
    <div className="border border-[rgba(0,229,229,0.15)] overflow-hidden h-[80vh]">
      <iframe
        title="Jeff Bollinger Resume"
        src="/static/media/Jeff_Bollinger-Resume-2023-redacted.31d6cfe0d16ae931b73c.pdf"
        className="w-full h-full"
      />
    </div>
  </div>
</main>
```

- [ ] **Step 2: Verify build**

```bash
cd site && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
git add site/src/app/resume/page.tsx
git commit -m "style: update resume page with terminal aesthetic"
```

---

### Task 9: Update `not-found.tsx`

**Files:**
- Modify: `site/src/app/not-found.tsx`

- [ ] **Step 1: Replace the component**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 text-[#00e5e5] text-center">
      <p className="text-[11px] tracking-[4px] uppercase text-[rgba(0,229,229,0.35)] mb-4">
        // not found
      </p>
      <h1 className="text-[80px] font-bold tracking-tight text-[#00e5e5] [text-shadow:0_0_40px_rgba(0,229,229,0.3)] leading-none mb-4">
        404
      </h1>
      <p className="text-[13px] text-[rgba(0,229,229,0.5)] mb-10 max-w-md leading-[1.7]">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="bg-[#00e5e5] text-black font-bold text-[12px] tracking-[2px] uppercase px-5 py-2.5"
        >
          Go Home
        </Link>
        <Link
          href="/publications"
          className="bg-transparent text-[#00e5e5] text-[12px] tracking-[2px] uppercase px-5 py-2.5 border border-[rgba(0,229,229,0.3)] hover:border-[rgba(0,229,229,0.5)]"
        >
          Publications
        </Link>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd site && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
git add site/src/app/not-found.tsx
git commit -m "style: update 404 page with terminal aesthetic"
```

---

## Chunk 7: Verification, Review, and PR

Tasks 10–14 run after all implementation tasks complete. Tasks 10–13 can run in parallel.

### Task 10: Full build and lint verification

**Files:** none

- [ ] **Step 1: Full clean build**

```bash
cd site && rm -rf .next out && npm run build
```

Expected: Exits 0. `site/out/` directory populated with static HTML.

- [ ] **Step 2: Full lint pass**

```bash
cd site && npm run lint
```

Expected: No errors, no warnings that would become errors.

- [ ] **Step 3: TypeScript strict check**

```bash
cd site && npx tsc --noEmit
```

Expected: No errors.

---

### Task 11: Dev server visual inspection

**Files:** none

- [ ] **Step 1: Start dev server**

```bash
cd site && npm run dev
```

- [ ] **Step 2: Check each route visually**

Open `http://localhost:3000` and verify:

| Route | Check |
|-------|-------|
| `/` | Hero with blinking cursor, about block, skills, 3 highlight cards |
| `/publications` | Terminal heading with count badge, cyan cards, load-more button |
| `/resume` | Terminal heading, cyan buttons, white-background-free iframe container |
| `/404` | Navigate to `/doesnotexist` — see cyan 404 page |
| Nav | Active link highlights correctly on each route |
| Focus | Tab through page — focus rings are cyan, not purple |
| Skip link | Tab once on any page — skip link appears in cyan |

- [ ] **Step 3: Check reduced-motion**

In browser DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Verify the blinking cursor stops moving (stays visible at opacity 1).

---

### Task 12: Code review using `coderabbit:code-review` skill

- [ ] **Step 1: Run code review**

Use `coderabbit:code-review` skill on the changes in the `feat/terminal-redesign` branch.

Focus areas: accessibility regressions, TypeScript correctness, any leftover purple/white classes from the old theme.

- [ ] **Step 2: Address any blocking issues found**

Fix issues, re-lint, re-build before proceeding.

---

### Task 13: Simplification pass using `code-simplifier:code-simplifier` skill

- [ ] **Step 1: Run simplification**

Use `code-simplifier:code-simplifier` skill on all modified files:
- `site/src/app/globals.css`
- `site/src/app/layout.tsx`
- `site/src/app/(components)/NavLinks.tsx`
- `site/src/app/(components)/ProjectCard.tsx`
- `site/src/app/page.tsx`
- `site/src/app/publications/page.tsx`
- `site/src/app/resume/page.tsx`
- `site/src/app/not-found.tsx`

- [ ] **Step 2: Verify build and lint still pass after any simplifications**

```bash
cd site && npm run build && npm run lint
```

- [ ] **Step 3: Commit any simplification changes**

```bash
git add -p  # stage only simplification changes
git commit -m "refactor: simplify terminal redesign implementation"
```

---

### Task 14: Open PR

- [ ] **Step 1: Push branch**

```bash
git push -u origin feat/terminal-redesign
```

- [ ] **Step 2: Create PR**

```bash
gh pr create \
  --title "feat: terminal redesign — cyan phosphor aesthetic" \
  --body "$(cat <<'EOF'
## Summary

- Replaces generic dark/purple palette with terminal-inspired cyan phosphor design
- JetBrains Mono throughout; subtle scanline overlay; blinking block cursor on hero
- Restructures homepage hero: label + name + cursor + bio + 2 CTAs + avatar column
- Removes TypewriterText component usage and decorative SVG
- Adds floating-label about block and skills tags row
- New \`NavLinks\` client component with active-route highlighting via \`usePathname()\`
- Updates all pages: publications, resume, 404
- All existing SEO, structured data, and accessibility preserved

## Test plan

- [ ] CI passes: actionlint, zizmor, ratchet, \`npm run build\`
- [ ] ESLint: \`npm run lint\` — no errors
- [ ] TypeScript: \`npx tsc --noEmit\` — no errors
- [ ] Visual: all routes render correctly in dev server
- [ ] Accessibility: cyan focus rings, skip link, reduced-motion cursor

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 3: Verify CI passes**

```bash
gh pr checks --watch
```

Expected: All checks pass — actionlint, zizmor, ratchet, pages-preview build.

---

## Subagent Execution Notes

When running via `superpowers:subagent-driven-development`:

**Parallel groups** (dispatch simultaneously):
- Group A (independent, run in parallel): Tasks 3 + 4 (NavLinks + layout)
- Group B (run after Group A completes): Task 5 (homepage, depends on NavLinks)
- Group C (run after Task 6 foundation is set): Tasks 7 + 8 + 9 (secondary pages, fully independent of each other)
- Group D (run after all implementation): Tasks 10 + 11 + 12 + 13 (verification, visual, review, simplification — parallel)
- Group E (final, sequential): Task 14 (PR creation)

**Minimum 8 subagents** cover: Tasks 3, 4, 5, 6, 7, 8, 9 (implementation) + Task 10 (build) + Task 11 (visual) + Task 12 (code review) + Task 13 (simplification). Run Groups A, C, and D each as a parallel batch.
