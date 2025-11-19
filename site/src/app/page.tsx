import { TypewriterText } from "./(components)/TypewriterText";
import { ProjectCard } from "./(components)/ProjectCard";
export default function Home() {
  return (
    <>
      {/* Book schema for Crafting the Infosec Playbook */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Book",
            name: "Crafting the Infosec Playbook",
            description: "Co-authored book on building incident response programs and monitoring architecture.",
            author: {
              "@type": "Person",
              name: "Jeff Bollinger",
              url: "https://www.jeff-bollinger.com",
            },
            publisher: {
              "@type": "Organization",
              name: "O'Reilly Media",
              url: "https://www.oreilly.com/",
            },
            isbn: "978-1491949405",
            bookFormat: "https://schema.org/Hardcover",
            url: "https://www.infosecplaybook.com/",
            image: "https://www.jeff-bollinger.com/static/media/cover-blue-edition.0781c7b04869f677781b.png",
          }),
        }}
      />
      {/* Article schema for (Re)building Threat Detection and Incident Response at LinkedIn */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "(Re)building Threat Detection and Incident Response at LinkedIn",
            description: "How LinkedIn rebuilt its security operations platform and teams, scaling protection for employees and members.",
            author: {
              "@type": "Person",
              name: "Jeff Bollinger",
              url: "https://www.jeff-bollinger.com",
            },
            publisher: {
              "@type": "Organization",
              name: "LinkedIn Engineering",
              url: "https://engineering.linkedin.com/",
            },
            url: "https://engineering.linkedin.com/blog/2022/-re-building-threat-detection-and-incident-response-at-linkedin",
            image: "https://www.jeff-bollinger.com/static/media/moonbase.498c0f55cde35211bd65.png",
            datePublished: "2022-01-01T00:00:00Z",
          }),
        }}
      />
      {/* Article schema for Cloud Security Observability Podcast */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Cloud Security Observability for Detection and Response",
            description: "Discussion on enterprise-scale observability for detection and response (Google Cloud Security Podcast).",
            author: {
              "@type": "Person",
              name: "Jeff Bollinger",
              url: "https://www.jeff-bollinger.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Google Cloud",
              url: "https://cloud.withgoogle.com/",
            },
            url: "https://cloud.withgoogle.com/cloudsecurity/podcast/ep96-cloud-security-observability-for-detection-and-response/",
            image: "https://www.jeff-bollinger.com/static/media/cloud.e6bacd0aae8c329e0edd.png",
          }),
        }}
      />
      <main className="min-h-[80vh] p-6 md:p-8 text-white">
      <section className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-1">
            Hello I&apos;m <span className="text-purple-400">Jeff Bollinger</span>
          </h1>
        </div>
        <div className="mt-1 flex items-start gap-4">
          <img
            src="/static/media/avatar.d355c64ac071e83edeabfc9c51f454d3.svg"
            alt="Jeff Bollinger headshot"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-white/20 shadow-sm"
          />
          <div className="min-h-[160px] md:min-h-[120px] flex-1">
            <TypewriterText
              className="text-purple-300 text-lg md:text-2xl mb-3 block"
              phrases={[
                "Infosec Professional | 25 years",
                "Threat Detection | Incident Response",
                "Detection Engineering | Security Architecture",
                "Executive Leadership | Mentoring, Team Building",
              ]}
            />
            <p className="text-white/80 text-sm md:text-base mt-2 mb-4">
              Jeff Bollinger is a cybersecurity leader focused on incident response, detection engineering, and
              large-scale security operations. He has led programs at LinkedIn and Cisco and frequently writes and
              speaks about security monitoring, threat detection, and response.
            </p>
          </div>
        </div>
        <div className="md:col-span-2 flex flex-wrap gap-3">
          <a
            href="/publications"
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
      </section>

      <section className="mx-auto max-w-5xl mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <h2 className="text-white/90 font-semibold mb-2">What I do</h2>
          <ul className="list-disc pl-5 text-white/80 space-y-1 text-sm">
            <li>Build, modernize, and lead detection engineering, incident response, and insider threat programs</li>
            <li>Design reliable security architecture and observability for large enterprises</li>
            <li>Coach and mentor high-performing security teams</li>
            <li>Build and lead security operations centers</li>
            <li>Lead security architecture and design</li>
            <li>Lead security operations and incident response</li>
          </ul>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <h2 className="text-white/90 font-semibold mb-2">Core skills</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-2 py-1 rounded bg-purple-600/30 border border-purple-300/20">Threat Detection</span>
            <span className="px-2 py-1 rounded bg-purple-600/30 border border-purple-300/20">Incident Response</span>
            <span className="px-2 py-1 rounded bg-purple-600/30 border border-purple-300/20">Detection Engineering</span>
            <span className="px-2 py-1 rounded bg-purple-600/30 border border-purple-300/20">Security Architecture</span>
            <span className="px-2 py-1 rounded bg-purple-600/30 border border-purple-300/20">Executive Leadership</span>
            <span className="px-2 py-1 rounded bg-purple-600/30 border border-purple-300/20">Security Operations</span>
            <span className="px-2 py-1 rounded bg-purple-600/30 border border-purple-300/20">Security Engineering</span>
          </div>
        </div>
        <div className="relative rounded-lg border border-white/10 bg-white/5 overflow-hidden h-full">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.18),transparent_60%)]" />
          <img
            src="/static/media/home-main.bb0187d03cff74c7d9bec63d61173238.svg"
            alt="Home Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      <section className="mx-auto max-w-5xl mt-10">
        <h1 className="text-2xl font-semibold text-purple-400 mb-4">Recent highlights</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            imageSrc="/static/media/cover-blue-edition.0781c7b04869f677781b.png"
            title="Crafting the Infosec Playbook"
            description="Co-authored book on building incident response programs and monitoring architecture."
            linkHref="https://www.infosecplaybook.com/"
            imageFit="contain"
          />
          <ProjectCard
            imageSrc="/static/media/moonbase.498c0f55cde35211bd65.png"
            title="(Re)building Threat Detection and Incident Response at LinkedIn"
            description="How LinkedIn rebuilt its security operations platform and teams, scaling protection for employees and members."
            linkHref="https://engineering.linkedin.com/blog/2022/-re-building-threat-detection-and-incident-response-at-linkedin"
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
    </>
  );
}
