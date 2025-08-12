export default function ResumePage() {
  return (
    <main className="min-h-screen p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Resume / CV</h1>
      <div className="flex gap-4 mb-6">
        <a
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-3 py-2 rounded"
          href="/static/media/Jeff_Bollinger-Resume-2023-redacted.31d6cfe0d16ae931b73c.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          View PDF
        </a>
        <a
          className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium px-3 py-2 rounded border border-white/10"
          href="/static/media/Jeff_Bollinger-Resume-2023-redacted.31d6cfe0d16ae931b73c.docx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download DOCX
        </a>
      </div>
      <div className="bg-white rounded overflow-hidden h-[80vh]">
        <iframe
          title="Jeff Bollinger Resume"
          src="/static/media/Jeff_Bollinger-Resume-2023-redacted.31d6cfe0d16ae931b73c.pdf"
          className="w-full h-full"
        />
      </div>
    </main>
  );
}


