import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-white text-center">
      <h1 className="text-6xl font-extrabold text-purple-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
      <p className="text-white/70 mb-8 max-w-md">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2 rounded"
        >
          Go Home
        </Link>
        <Link
          href="/publications"
          className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium px-4 py-2 rounded border border-white/10"
        >
          Publications
        </Link>
      </div>
    </main>
  );
}
