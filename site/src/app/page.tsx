import { TypewriterText } from "./(components)/TypewriterText";
import { ProjectCard } from "./(components)/ProjectCard";
export default function Home() {
  return (
    <main className="min-h-[80vh] p-6 md:p-8 text-white">
      <section className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-1">
            Hello I&apos;m <span className="text-purple-400">Jeff Bollinger</span>
          </h1>
          <TypewriterText
            className="text-purple-300 text-lg md:text-2xl mb-3 block"
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
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h2 className="text-white/90 font-semibold mb-2">What I do</h2>
              <ul className="list-disc pl-5 text-white/80 space-y-1 text-sm">
                <li>Build and lead detection engineering and incident response programs</li>
                <li>Design security architecture and observability for large enterprises</li>
                <li>Coach and mentor high-performing security teams</li>
              </ul>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h2 className="text-white/90 font-semibold mb-2">Core skills</h2>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-2 py-1 rounded bg-purple-600/30 border border-purple-300/20">Threat Detection</span>
                <span className="px-2 py-1 rounded bg-purple-600/30 border border-purple-300/20">Incident Response</span>
                <span className="px-2 py-1 rounded bg-purple-600/30 border border-purple-300/20">Detection Engineering</span>
                <span className="px-2 py-1 rounded bg-purple-600/30 border border-purple-300/20">Security Architecture</span>
              </div>
            </div>
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
      <section className="mx-auto max-w-5xl mt-10">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">Recent highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            imageSrc="/static/media/cover-blue-edition.0781c7b04869f677781b.png"
            title="Crafting the Infosec Playbook"
            description="Co-authored book on building incident response programs and monitoring architecture."
            linkHref="https://www.infosecplaybook.com/"
            imageFit="contain"
          />
          <ProjectCard
            imageSrc="/static/media/broken-disk.5b8ebec8d7f8f022e876.png"
            title="Disk Image Deception"
            description="Cisco Security blog post on a malspam campaign misusing .IMG files and key lessons learned."
            linkHref="https://blogs.cisco.com/security/disk-image-deception-incident-response"
          />
          <ProjectCard
            imageSrc="/static/media/cloud.e6bacd0aae8c329e0edd.png"
            title="Cloud Security Observability"
            description="Discussion on enterprise-scale observability for detection and response (Google Cloud Security Podcast)."
            linkHref="https://cloud.withgoogle.com/cloudsecurity/podcast/ep96-cloud-security-observability-for-detection-and-response/"
          />
        </div>
      </section>
    </main>
  );
}
