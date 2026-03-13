import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 text-[#00e5e5] text-center">
      <p className="text-[11px] tracking-[4px] uppercase text-[rgba(0,229,229,0.35)] mb-4">
        {"// not found"}
      </p>
      <h1 className="text-[80px] font-bold tracking-tight text-[#00e5e5] [text-shadow:0_0_40px_rgba(0,229,229,0.3)] leading-none mb-4">
        404
      </h1>
      <p className="text-[13px] text-[rgba(0,229,229,0.5)] mb-10 max-w-md leading-[1.7]">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="bg-[#00e5e5] text-black font-bold text-[12px] tracking-[2px] uppercase px-5 py-2.5"
        >
          Go Home
        </Link>
        <Link
          href="/publications"
          className="bg-transparent text-[#00e5e5] text-[12px] tracking-[2px] uppercase px-5 py-2.5 border border-[rgba(0,229,229,0.3)] hover:border-[rgba(0,229,229,0.5)]"
        >
          Publications
        </Link>
      </div>
    </main>
  );
}
