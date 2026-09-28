"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

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
    // Reduced motion renders the full phrase directly; nothing to animate
    if (prefersReducedMotion) return;

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
        if (next < phrases.length || loop) {
          timeoutRef.current = window.setTimeout(() => {
            setIndex(next < phrases.length ? next : 0);
            setPhase("typing");
          }, 0);
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

  const showCaret = !prefersReducedMotion && phase !== "holding";
  const minHeightEm = `${reserveLines * lineHeight}em`;

  return (
    <span
      className={className}
      style={{ display: "block", lineHeight, minHeight: minHeightEm }}
      aria-live="polite"
      aria-atomic="true"
    >
      {prefersReducedMotion ? phrase : display}
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
