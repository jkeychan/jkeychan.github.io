"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type TypewriterTextProps = {
  phrases: string[];
  typingMsPerChar?: number;
  deletingMsPerChar?: number;
  holdBeforeDeleteMs?: number;
  holdBeforeNextMs?: number;
  loop?: boolean;
  className?: string;
  reserveLines?: number;
  lineHeight?: number;
};

function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

export function TypewriterText({
  phrases,
  typingMsPerChar = 45,
  deletingMsPerChar = 25,
  holdBeforeDeleteMs = 900,
  holdBeforeNextMs = 300,
  loop = true,
  className,
  reserveLines = 2,
  lineHeight = 1.25,
}: TypewriterTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing",
  );
  const timeoutRef = useRef<number | null>(null);
  const phrase = useMemo(() => phrases[index] ?? "", [phrases, index]);

  useEffect(() => {
    // When reduced motion is preferred, show full phrase immediately
    if (prefersReducedMotion) {
      setDisplay(phrase);
      setPhase("holding");
      return;
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (phase === "typing") {
      if (display.length < phrase.length) {
        timeoutRef.current = window.setTimeout(() => {
          setDisplay(phrase.slice(0, display.length + 1));
        }, typingMsPerChar);
      } else {
        timeoutRef.current = window.setTimeout(
          () => setPhase("holding"),
          holdBeforeDeleteMs,
        );
      }
    } else if (phase === "deleting") {
      if (display.length > 0) {
        timeoutRef.current = window.setTimeout(() => {
          setDisplay(phrase.slice(0, display.length - 1));
        }, deletingMsPerChar);
      } else {
        const next = index + 1;
        if (next < phrases.length) {
          setIndex(next);
          setPhase("typing");
        } else if (loop) {
          setIndex(0);
          setPhase("typing");
        }
      }
    } else if (phase === "holding") {
      timeoutRef.current = window.setTimeout(
        () => setPhase("deleting"),
        holdBeforeNextMs,
      );
    }

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [
    display,
    phrase,
    phase,
    typingMsPerChar,
    deletingMsPerChar,
    holdBeforeDeleteMs,
    holdBeforeNextMs,
    index,
    phrases.length,
    loop,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(phrases[index] ?? "");
      setPhase("holding");
    } else {
      setDisplay("");
      setPhase("typing");
    }
  }, [index, prefersReducedMotion, phrases]);

  const showCaret = !prefersReducedMotion && phase !== "holding";
  const minHeightEm = `${reserveLines * lineHeight}em`;

  return (
    <span
      className={className}
      style={{ display: "block", lineHeight, minHeight: minHeightEm }}
      aria-live="polite"
      aria-atomic="true"
    >
      {display}
      {showCaret ? (
        <span
          aria-hidden="true"
          className="ml-1 inline-block w-[1ch] animate-pulse"
        >
          |
        </span>
      ) : null}
    </span>
  );
}
