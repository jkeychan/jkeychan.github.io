import { TypewriterText } from "./(components)/TypewriterText";
export default function Home() {
  return (
    <main className="min-h-[80vh] p-6 md:p-8 text-white">
      <section className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-2">
            Hello I'm <span className="text-purple-400">Jeff Bollinger</span>
          </h1>
          <TypewriterText
            className="text-purple-300 text-lg md:text-2xl mb-4 block"
            phrases={[
              "Infosec Professional for over 20 years",
              "Threat Detection and Incident Response",
              "Detection Engineering and Security Architecture",
              "Leadership, mentoring, and building strong teams",
            ]}
          />
          <div className="flex flex-wrap gap-3 mt-2">
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
        <div className="relative md:justify-self-end">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.25),transparent_60%)]" />
          <img
            src="/static/media/home-main.bb0187d03cff74c7d9bec63d61173238.svg"
            alt="Home Illustration"
            className="w-full max-w-[560px] h-auto"
          />
        </div>
      </section>
    </main>
  );
}
