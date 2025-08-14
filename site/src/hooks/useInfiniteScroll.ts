import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll<T>(
  items: T[],
  initialCount: number = 12,
  increment: number = 12
) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + increment, items.length));
        }
      },
      { rootMargin: "1000px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length, increment]);

  const visibleItems = items.slice(0, Math.min(visibleCount, items.length));
  const hasMore = visibleCount < items.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + increment, items.length));
  };

  return {
    visibleItems,
    hasMore,
    loadMore,
    sentinelRef,
  };
}
