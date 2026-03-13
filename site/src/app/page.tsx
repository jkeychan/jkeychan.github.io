import Image from "next/image";
import Link from "next/link";
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
      <main className="min-h-[80vh] px-6 md:px-8 pt-8 pb-16 text-terminal-cyan">
        {/* Hero */}
        <section className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-14 items-start mb-16 pb-16 border-b border-[rgba(0,229,229,0.1)]">
          <div>
            <p className="text-[11px] tracking-[4px] uppercase text-terminal-cyan-35 mb-4">
              {"// security author & leader"}
            </p>
            <h1 className="text-[40px] md:text-[60px] font-bold tracking-tight text-terminal-cyan [text-shadow:0_0_40px_rgba(0,229,229,0.3)] leading-none mb-3">
              Jeff<br />Bollinger
              <span
                aria-hidden="true"
                className="cursor-blink inline-block w-[4px] h-[50px] md:h-[62px] bg-terminal-cyan align-middle ml-2 [box-shadow:0_0_10px_rgba(0,229,229,0.8)]"
              />
            </h1>
            <TypewriterText
              className="text-[12px] tracking-[3px] uppercase text-terminal-cyan-35 mb-5"
              phrases={[
                "Threat Detection + Incident Response",
                "Detection Engineering + Security Architecture",
                "Executive Leadership + Team Building",
                "Security Author + International Speaker",
              ]}
              typingMsPerChar={40}
              deletingMsPerChar={20}
              holdBeforeDeleteMs={1800}
              holdBeforeNextMs={400}
            />
            <p className="text-[13px] md:text-[14px] text-terminal-cyan-60 leading-[1.7] max-w-[440px] mb-8">
              Author of <em>Crafting the Infosec Playbook</em>. Writing and speaking
              on security operations, threat hunting, and incident response.
            </p>
            <div className="flex gap-3">
              <Link
                href="/publications"
                className="bg-terminal-cyan text-black font-bold text-[12px] tracking-[2px] uppercase px-5 py-2.5"
              >
                Publications
              </Link>
              <Link
                href="/resume"
                className="bg-transparent text-terminal-cyan text-[12px] tracking-[2px] uppercase px-5 py-2.5 border border-[rgba(0,229,229,0.3)] hover:border-[rgba(0,229,229,0.5)] transition-colors"
              >
                Resume / CV
              </Link>
            </div>
          </div>
          <div>
            <Image
              src="/static/media/avatar.d355c64ac071e83edeabfc9c51f454d3.svg"
              alt="Jeff Bollinger"
              width={160}
              height={160}
              priority
              className="card-pulse w-36 h-36 md:w-40 md:h-40 border-2 border-[rgba(0,229,229,0.3)] [filter:saturate(0.5)_contrast(1.1)]"
            />
          </div>
        </section>

        {/* About block */}
        <div className="mx-auto max-w-5xl mb-8">
          <div className="relative border border-[rgba(0,229,229,0.15)] bg-terminal-surface px-7 py-5">
            <span className="absolute -top-[9px] left-4 bg-terminal-bg px-2 text-[10px] tracking-[3px] uppercase text-[rgba(0,229,229,0.4)]">
              about
            </span>
            <p className="text-[13px] text-[rgba(0,229,229,0.65)] leading-[1.8]">
              Cybersecurity leader focused on building and running security operations
              programs. Detection engineering, incident response, security
              architecture, and growing high-performing teams.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mx-auto max-w-5xl flex flex-wrap gap-2 mb-16">
          {[
            "Threat Detection",
            "Incident Response",
            "Detection Engineering",
            "Security Architecture",
            "Executive Leadership",
            "Security Operations",
            "Security Engineering",
          ].map((skill) => (
            <span
              key={skill}
              className="text-[11px] tracking-[1.5px] uppercase border border-[rgba(0,229,229,0.15)] bg-[rgba(0,229,229,0.03)] px-3 py-1.5 text-[rgba(0,229,229,0.5)]"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Recent highlights */}
        <section className="mx-auto max-w-5xl">
          <h2 className="text-[11px] tracking-[4px] uppercase text-terminal-cyan-35 mb-6 pb-3 border-b border-[rgba(0,229,229,0.08)]">
            {"// recent highlights"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
