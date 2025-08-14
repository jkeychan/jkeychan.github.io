import { ProjectCard } from "../(components)/ProjectCard";
import { PUBLICATIONS } from "../../data/publications";

export default function PublicationsPage() {
  return (
    <main className="min-h-screen p-8 text-white">
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-purple-400">Publications and Conferences</span>
      </h1>
      <p className="text-white/80 mb-6">
        This is a non-exhaustive list of blogs, podcasts, articles, reviews, conferences hosted, and other publications I&apos;ve created, co-created, or been involved in.
      </p>
      
      <p className="text-white/60 mb-4">
        {PUBLICATIONS.length} publications
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PUBLICATIONS.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </main>
  );
}
