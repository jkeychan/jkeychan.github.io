"use client";

import { useEffect, useRef, useState } from "react";

const PDF_SRC =
  "/static/media/Jeff_Bollinger-Resume-2023-redacted.31d6cfe0d16ae931b73c.pdf";

type Phase = "ls" | "open" | "progress" | "done" | "viewer";

function ProgressBar({ value }: { value: number }) {
  const filled = Math.floor(value / 5);
  return (
    <span>
      <span className="text-terminal-cyan">{"█".repeat(filled)}</span>
      <span className="text-[rgba(0,229,229,0.2)]">{"░".repeat(20 - filled)}</span>
    </span>
  );
}

export function ResumeViewer() {
  const [phase, setPhase] = useState<Phase>("ls");
  const [progress, setProgress] = useState(0);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced.current) {
      setPhase("viewer");
      return;
    }
    const t1 = setTimeout(() => setPhase("open"), 700);
    const t2 = setTimeout(() => setPhase("progress"), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (phase !== "progress") return;
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(p + Math.random() * 18 + 4, 100);
      setProgress(Math.floor(p));
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(() => setPhase("done"), 200);
      }
    }, 60);
    return () => clearInterval(iv);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(() => setPhase("viewer"), 700);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "viewer") {
    return (
      <div className="w-full h-full animate-fade-in">
        <iframe
          title="Jeff Bollinger Resume"
          src={PDF_SRC}
          className="w-full h-full"
        >
          <p className="text-[12px] text-terminal-cyan-35 p-4">
            PDF preview unavailable.{" "}
            <a
              href={PDF_SRC}
              className="text-terminal-cyan underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF directly
            </a>
          </p>
        </iframe>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-terminal-bg p-6 text-[13px] leading-[1.9] overflow-hidden">
      {/* ls command */}
      <div>
        <span className="text-terminal-cyan">jeff@terminal</span>
        <span className="text-terminal-cyan-35">:</span>
        <span className="text-[rgba(0,229,229,0.5)]">~/documents/resume</span>
        <span className="text-terminal-cyan-35"> $ </span>
        <span className="text-terminal-cyan">ls -lh</span>
      </div>

      {/* ls output */}
      {phase !== "ls" && (
        <div className="mt-1 mb-3">
          <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 text-terminal-cyan-35">
            <span>-rw-r--r--</span>
            <span className="text-terminal-cyan font-bold">
              Jeff_Bollinger-Resume-2023-redacted.pdf
            </span>
            <span>148K</span>
          </div>
          <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 text-terminal-cyan-35">
            <span>-rw-r--r--</span>
            <span>Jeff_Bollinger-Resume-2023-redacted.docx</span>
            <span>82K</span>
          </div>
        </div>
      )}

      {/* open command */}
      {(phase === "open" || phase === "progress" || phase === "done") && (
        <div>
          <span className="text-terminal-cyan">jeff@terminal</span>
          <span className="text-terminal-cyan-35">:</span>
          <span className="text-[rgba(0,229,229,0.5)]">~/documents/resume</span>
          <span className="text-terminal-cyan-35"> $ </span>
          <span className="text-terminal-cyan">
            open Jeff_Bollinger-Resume-2023-redacted.pdf
          </span>
        </div>
      )}

      {/* progress bar */}
      {(phase === "progress" || phase === "done") && (
        <div className="mt-2 text-terminal-cyan-35">
          <div>
            Rendering pages{" "}
            <ProgressBar value={progress} />{" "}
            <span className="text-terminal-cyan">{progress}%</span>
          </div>
        </div>
      )}

      {/* done */}
      {phase === "done" && (
        <div className="mt-1 text-terminal-cyan">
          Document ready.{" "}
          <span className="text-terminal-cyan-35">Launching viewer</span>
          <span className="cursor-blink inline-block w-[8px] h-[13px] bg-terminal-cyan align-middle ml-1" aria-hidden="true" />
        </div>
      )}

      {/* idle cursor on ls phase */}
      {phase === "ls" && (
        <span
          className="cursor-blink inline-block w-[8px] h-[13px] bg-terminal-cyan align-middle ml-1"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
