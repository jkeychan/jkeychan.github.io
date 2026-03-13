import type { Metadata } from "next";
import { ResumeViewer } from "../(components)/ResumeViewer";

export const metadata: Metadata = {
  title: "Resume / CV",
  description: "Resume and CV for Jeff Bollinger.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <>
      {/* BreadcrumbList for Resume page */}
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
                name: "Resume/CV",
                item: "https://www.jeff-bollinger.com/resume",
              },
            ],
          }),
        }}
      />
      <main className="min-h-screen px-6 md:px-8 pt-8 pb-16 text-terminal-cyan">
        <div className="mx-auto max-w-5xl mb-8">
          <p className="text-[11px] tracking-[4px] uppercase text-terminal-cyan-35 mb-4">
            {"// resume & cv"}
          </p>
          <h1 className="text-[40px] font-bold tracking-tight text-terminal-cyan [text-shadow:0_0_30px_rgba(0,229,229,0.2)] leading-none mb-8">
            Resume / CV
          </h1>
          <div className="flex gap-3 mb-8">
            <a
              className="bg-terminal-cyan text-black font-bold text-[12px] tracking-[2px] uppercase px-5 py-2.5"
              href="/static/media/Jeff_Bollinger-Resume-2023-redacted.31d6cfe0d16ae931b73c.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF
            </a>
            <a
              className="bg-transparent text-terminal-cyan text-[12px] tracking-[2px] uppercase px-5 py-2.5 border border-[rgba(0,229,229,0.3)] hover:border-[rgba(0,229,229,0.5)] transition-colors"
              href="/static/media/Jeff_Bollinger-Resume-2023-redacted.31d6cfe0d16ae931b73c.docx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download DOCX
            </a>
          </div>
          <div className="border border-[rgba(0,229,229,0.15)] overflow-hidden h-[80vh]">
            <ResumeViewer />
          </div>
        </div>
      </main>
    </>
  );
}
