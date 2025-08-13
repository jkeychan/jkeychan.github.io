"use client";
import { useEffect } from "react";
import Link from "next/link";


export default function ProjectPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace("/publications");
    }
  }, []);

  return (
    <main className="min-h-screen p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">This page has moved</h1>
      <p>
        Publications are now at{" "}
        <Link href="/publications" className="underline text-purple-300">
          /publications
        </Link>
        . If you are not redirected automatically, use the link above.
      </p>
    </main>
  );
}


