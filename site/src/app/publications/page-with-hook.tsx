"use client";
import { ProjectCard } from "../(components)/ProjectCard";
import { PUBLICATIONS } from "../../data/publications";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export default function PublicationsPage() {
  const { visibleItems, hasMore, loadMore, sentinelRef } = useInfiniteScroll(PUBLICATIONS);
  
  // Debug logging
  console.log('PUBLICATIONS length:', PUBLICATIONS.length);
  console.log('visibleItems length:', visibleItems.length);
  console.log('hasMore:', hasMore);


  return (
    <main className="min-h-screen p-8 text-white">
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-purple-400">Publications and Conferences</span>
      </h1>
      <p className="text-white/80 mb-6">This is a non-exhaustive list of blogs, podcasts, articles, reviews, conferences hosted, and other publications I&apos;ve created, co-created, or been involved in.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleItems.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              console.log('Load more clicked!');
              loadMore();
            }}
            className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium"
          >
            Load more
          </button>
        </div>
      )}

      <div ref={sentinelRef} className="h-10" />
    </main>
  );
}


