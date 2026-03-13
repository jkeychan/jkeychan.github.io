"use client";

import { useEffect, useRef, useState } from "react";

type Props = { total: number; onDone: () => void };

// Derive unix-style filenames from publication titles
function toFilename(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) + ".md"
  );
}

const SAMPLE_TITLES = [
  "(Re)building Threat Detection and Incident Response at LinkedIn",
  "Crafting the Infosec Playbook",
  "Disk Image Deception",
  "The Right Data at the Right Time",
  "Cognitive Bias in Incident Response",
  "CSIRT Schiltron: Training, Techniques, and Talent",
  "How Computer Incident Response Teams Use CTI",
  "Incident Detection and Response",
  "Ad-Weary Or, What Could Possibly Go Wrong",
  "FIRST Technical Colloquium Amsterdam",
  "The State of Web Security: Attack and Response",
  "Cloud Security Observability for Detection and Response",
];

const SIZES = ["24K", "148K", "18K", "32K", "21K", "44K", "38K", "29K", "17K", "52K", "36K", "27K"];

export function PublicationsTerminal({ total, onDone }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<"cmd" | "extracting" | "done">("cmd");
  const prefersReduced = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced.current) {
      onDone();
      return;
    }

    // Short pause then start extraction
    const t = setTimeout(() => setPhase("extracting"), 600);
    return () => clearTimeout(t);
  }, [onDone]);

  useEffect(() => {
    if (phase !== "extracting") return;

    const filenames = SAMPLE_TITLES.map(toFilename);
    let i = 0;

    const iv = setInterval(() => {
      if (i < filenames.length) {
        const size = SIZES[i] ?? "22K";
        setLines((prev) => [...prev, `x  experience/${filenames[i]}  (${size})`]);
        i++;
      } else {
        clearInterval(iv);
        const remaining = total - filenames.length;
        setTimeout(() => {
          setLines((prev) => [
            ...prev,
            `... ${remaining} more archived entries`,
            ``,
            `${total} files extracted.`,
          ]);
          setPhase("done");
        }, 200);
      }
    }, 75);

    return () => clearInterval(iv);
  }, [phase, total]);

  // Auto-scroll terminal output
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(onDone, 900);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  return (
    <div
      ref={containerRef}
      className="bg-terminal-bg text-[12px] leading-[1.85] p-6 overflow-y-auto h-64 border border-[rgba(0,229,229,0.15)] mb-8"
      aria-live="polite"
      aria-label="Extracting publications archive"
    >
      {/* Command line */}
      <div className="mb-1">
        <span className="text-terminal-cyan">jeff@terminal</span>
        <span className="text-terminal-cyan-35">:</span>
        <span className="text-[rgba(0,229,229,0.5)]">~</span>
        <span className="text-terminal-cyan-35"> $ </span>
        <span className="text-terminal-cyan">
          tar -xzvf experience.tar.gz --directory=./experience
        </span>
      </div>

      {/* Extracted filenames */}
      {lines.map((line, i) =>
        line === "" ? (
          <div key={i} className="h-[1.85em]" />
        ) : line.startsWith("...") ? (
          <div key={i} className="text-[rgba(0,229,229,0.3)] italic">{line}</div>
        ) : line.endsWith("extracted.") ? (
          <div key={i} className="text-terminal-cyan mt-1 font-bold">{line}</div>
        ) : (
          <div key={i} className="text-terminal-cyan-35">
            <span className="text-[rgba(0,229,229,0.5)]">x  </span>
            <span className="text-terminal-cyan">
              {line.replace(/^x  /, "").split("  ")[0]}
            </span>
            <span className="text-[rgba(0,229,229,0.25)]">
              {"  " + (line.split("  ").pop() ?? "")}
            </span>
          </div>
        )
      )}

      {/* Idle cursor while waiting */}
      {phase === "cmd" && (
        <span
          aria-hidden="true"
          className="cursor-blink inline-block w-[8px] h-[13px] bg-terminal-cyan align-middle"
        />
      )}

      {/* Done line with blinking cursor */}
      {phase === "done" && (
        <div className="mt-2">
          <span className="text-terminal-cyan">jeff@terminal</span>
          <span className="text-terminal-cyan-35">:</span>
          <span className="text-[rgba(0,229,229,0.5)]">~</span>
          <span className="text-terminal-cyan-35"> $ </span>
          <span className="text-terminal-cyan">ls -1 experience/ | head -5</span>
          <br />
          {SAMPLE_TITLES.slice(0, 5).map((t) => (
            <div key={t} className="text-terminal-cyan-35 pl-2">
              {toFilename(t)}
            </div>
          ))}
          <div className="text-terminal-cyan-35 pl-2 italic">
            ... and {total - 5} more
          </div>
          <div className="mt-2">
            <span className="text-terminal-cyan">jeff@terminal</span>
            <span className="text-terminal-cyan-35">:</span>
            <span className="text-[rgba(0,229,229,0.5)]">~</span>
            <span className="text-terminal-cyan-35"> $ </span>
            <span
              aria-hidden="true"
              className="cursor-blink inline-block w-[8px] h-[13px] bg-terminal-cyan align-middle"
            />
          </div>
        </div>
      )}
    </div>
  );
}
