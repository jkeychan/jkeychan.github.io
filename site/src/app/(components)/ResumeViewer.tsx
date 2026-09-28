"use client";

import { type ReactNode, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const MEDIA = "/static/media/";
const PDF_SRC = `${MEDIA}Jeff_Bollinger-Resume-2026.pdf`;
const FILES = ["docx", "pdf", "tex"].map(
  (ext) => `Jeff_Bollinger-Resume-2026.${ext}`,
);

// Verbatim BSD `ls -lh` of the files in public/static/media
const LS_OUTPUT = `total 208
-rw-r--r--  1 jeff  staff    13K Sep 15 14:02 Jeff_Bollinger-Resume-2026.docx
-rw-r--r--  1 jeff  staff    72K Sep 15 17:46 Jeff_Bollinger-Resume-2026.pdf
-rw-r--r--  1 jeff  staff   7.1K Sep 15 14:02 Jeff_Bollinger-Resume-2026.tex
-rw-r--r--  1 jeff  staff   292B Sep 28 07:50 SHA256SUMS`;

const PRE =
  "mt-1 mb-3 font-[inherit] overflow-x-auto [scrollbar-width:thin] [scrollbar-color:rgba(0,229,229,0.25)_transparent]";

const PHASES = [
  "ls",
  "hash",
  "check",
  "open",
  "progress",
  "done",
  "viewer",
] as const;
type Phase = (typeof PHASES)[number];

type Sum = { name: string; actual: string | null; ok: boolean };

async function sha256Hex(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const digest = await crypto.subtle.digest("SHA-256", await res.arrayBuffer());
  return Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}

// Hash each file in the browser and compare against SHA256SUMS written at build time
async function checksums(): Promise<Sum[]> {
  const sums = await fetch(`${MEDIA}SHA256SUMS`)
    .then((r) => (r.ok ? r.text() : ""))
    .catch(() => "");
  const expected = new Map(
    sums
      .trim()
      .split("\n")
      .map((line) => {
        const [hash, name] = line.split("  ");
        return [name, hash];
      }),
  );
  return Promise.all(
    FILES.map(async (name) => {
      const actual = await sha256Hex(MEDIA + name).catch(() => null);
      return {
        name,
        actual,
        ok: actual !== null && actual === expected.get(name),
      };
    }),
  );
}

function Cursor() {
  return (
    <span
      className="cursor-blink inline-block w-[8px] h-[13px] bg-terminal-cyan align-middle ml-1"
      aria-hidden="true"
    />
  );
}

function Prompt({ cmd, children }: { cmd: string; children?: ReactNode }) {
  return (
    <div>
      <span className="text-terminal-cyan">jeff@terminal</span>
      <span className="text-terminal-cyan-35">:</span>
      <span className="text-[rgba(0,229,229,0.5)]">~/documents/resume</span>
      <span className="text-terminal-cyan-35"> $ </span>
      <span className="text-terminal-cyan">{cmd}</span>
      {children}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  const filled = Math.floor(value / 5);
  return (
    <span>
      <span className="text-terminal-cyan">{"█".repeat(filled)}</span>
      <span className="text-[rgba(0,229,229,0.2)]">
        {"░".repeat(20 - filled)}
      </span>
    </span>
  );
}

export function ResumeViewer() {
  const [phase, setPhase] = useState<Phase>("ls");
  const [progress, setProgress] = useState(0);
  const [sums, setSums] = useState<Sum[] | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const t = setTimeout(() => setPhase("hash"), 700);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (phase !== "hash") return;
    let cancelled = false;
    let t: ReturnType<typeof setTimeout>;
    checksums().then((result) => {
      if (cancelled) return;
      setSums(result);
      t = setTimeout(() => setPhase("check"), 600);
    });
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === "check") {
      const t = setTimeout(() => setPhase("open"), 900);
      return () => clearTimeout(t);
    }
    if (phase === "open") {
      const t = setTimeout(() => setPhase("progress"), 600);
      return () => clearTimeout(t);
    }
  }, [phase]);

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

  const reached = (p: Phase) => PHASES.indexOf(phase) >= PHASES.indexOf(p);

  const viewer = (
    <iframe
      title="Jeff Bollinger Resume"
      src={PDF_SRC}
      className="w-full h-[80vh]"
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
  );

  if (prefersReducedMotion) return viewer;

  return (
    <>
      <div className="w-full bg-terminal-bg p-6 text-[13px] leading-[1.9]">
        <Prompt cmd="ls -lh" />
        {phase === "ls" && <Cursor />}

        {reached("hash") && (
          <>
            <pre className={`${PRE} text-terminal-cyan-35`}>{LS_OUTPUT}</pre>
            {/* hash files in the browser */}
            <Prompt cmd="sha256sum Jeff_Bollinger-Resume-2026.*" />
            {sums ? (
              <pre className={`${PRE} text-terminal-cyan-35`}>
                {sums
                  .map(({ name, actual }) =>
                    actual
                      ? `${actual}  ${name}`
                      : `sha256sum: ${name}: No such file or directory`,
                  )
                  .join("\n")}
              </pre>
            ) : (
              <Cursor />
            )}
          </>
        )}

        {/* verify against published checksums */}
        {sums && reached("check") && (
          <>
            <Prompt cmd="sha256sum -c SHA256SUMS" />
            <pre className={PRE}>
              {sums.map(({ name, actual, ok }) => (
                <div key={name} className="text-terminal-cyan-35">
                  {name}:{" "}
                  <span className={ok ? "text-terminal-cyan" : "text-red-400"}>
                    {ok ? "OK" : actual ? "FAILED" : "FAILED open or read"}
                  </span>
                </div>
              ))}
            </pre>
          </>
        )}

        {reached("open") && (
          <Prompt cmd="open Jeff_Bollinger-Resume-2026.pdf" />
        )}

        {reached("progress") && (
          <div className="mt-2 text-terminal-cyan-35">
            Rendering pages <ProgressBar value={progress} />{" "}
            <span className="text-terminal-cyan">{progress}%</span>
          </div>
        )}

        {reached("done") && (
          <div className="mt-1 text-terminal-cyan">
            Document ready.{" "}
            <span className="text-terminal-cyan-35">
              {phase === "done"
                ? "Launching viewer"
                : "Opened in viewer below."}
            </span>
            {phase === "done" && <Cursor />}
          </div>
        )}

        {phase === "viewer" && (
          <div className="mt-3">
            <Prompt cmd="">
              <Cursor />
            </Prompt>
          </div>
        )}
      </div>

      {phase === "viewer" && (
        <div className="border-t border-[rgba(0,229,229,0.15)] animate-fade-in">
          {viewer}
        </div>
      )}
    </>
  );
}
