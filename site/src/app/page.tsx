export default function Home() {
  return (
    <main className="min-h-screen p-8 text-white">
      <section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Jeff Bollinger
          </h1>
          <p className="text-white/80 text-lg mb-6">
            Director, Incident Response and Detection Engineering. Cybersecurity
            leader with 20+ years of experience in incident response, detection
            engineering, and executive leadership.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/project"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2 rounded"
            >
              View Publications
            </a>
            <a
              href="/resume"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium px-4 py-2 rounded border border-white/10"
            >
              Resume / CV
            </a>
            <a
              href="https://www.linkedin.com/in/jeffb0llinger/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium px-4 py-2 rounded border border-white/10"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="relative">
          <img
            src="/static/media/home-main.bb0187d03cff74c7d9bec63d61173238.svg"
            alt="Home Illustration"
            className="w-full h-auto"
          />
        </div>
      </section>
    </main>
  );
}
