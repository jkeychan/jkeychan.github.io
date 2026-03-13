"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "../(components)/ProjectCard";
import { publications } from "./data";
import { generateSchemas } from "@/lib/schema";

export default function PublicationsPage() {
  const [visibleCount, setVisibleCount] = useState(12);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + 12, publications.length),
          );
        }
      },
      { rootMargin: "1000px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visibleItems = publications.slice(
    0,
    Math.min(visibleCount, publications.length),
  );
  const { itemList, schemas } = generateSchemas(publications);

  return (
    <>
      {/* ItemList schema for publications collection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemList),
        }}
      />
      {/* Individual publication schemas */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      {/* BreadcrumbList for Publications page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.jeff-bollinger.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Publications",
                item: "https://www.jeff-bollinger.com/publications",
              },
            ],
          }),
        }}
      />
      <main className="min-h-screen px-6 md:px-8 pt-8 pb-16 text-terminal-cyan">
        {/* Page header */}
        <div className="mx-auto max-w-5xl mb-12">
          <p className="text-[11px] tracking-[4px] uppercase text-terminal-cyan-35 mb-4">
            {"// writing, talks & appearances"}
          </p>
          <h1 className="text-[40px] font-bold tracking-tight text-terminal-cyan [text-shadow:0_0_30px_rgba(0,229,229,0.2)] leading-none mb-4">
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
              className="bg-transparent text-terminal-cyan text-[11px] tracking-[2px] uppercase px-5 py-2.5 border border-[rgba(0,229,229,0.3)] hover:border-[rgba(0,229,229,0.5)]"
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
    </>
  );
}
