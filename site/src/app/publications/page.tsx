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
      <main className="min-h-screen p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          <span className="text-purple-400">
            Publications and Conferences
          </span>
        </h1>
        <p className="text-white/80 mb-6">
          This is a non-exhaustive list of blogs, podcasts, articles,
          reviews, conferences hosted, and other publications I&apos;ve
          created, co-created, or been involved in.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>

        {visibleCount < publications.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() =>
                setVisibleCount((prev) =>
                  Math.min(prev + 12, publications.length),
                )
              }
              aria-label="Load more publications"
              className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium"
            >
              Load more
            </button>
          </div>
        )}

        <div ref={sentinelRef} className="h-10" />
      </main>
    </>
  );
}
