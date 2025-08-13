"use client";
import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "../(components)/ProjectCard";

const publications = [
  {
    imageSrc: "/static/media/moonbase.498c0f55cde35211bd65.png",
    title: "(Re)building Threat Detection and Incident Response at LinkedIn",
    description:
      "This blog discusses how LinkedIn rebuilt its security operations platform and teams, scaled to protect nearly 20,000 employees and more than 875 million members, and our approach and strategy to achieve this objective.",
    linkHref:
      "https://engineering.linkedin.com/blog/2022/-re-building-threat-detection-and-incident-response-at-linkedin",
  },
  {
    imageSrc: "/static/media/cover-blue-edition.0781c7b04869f677781b.png",
    title: "Crafting the Infosec Playbook",
    description:
      "Co-authored this O'Reilly book on building an incident response program and creating the process, philosophy, and architecture for implementing an information security monitoring program. The book was also translated into Japanese.",
    linkHref: "https://www.infosecplaybook.com/",
    imageFit: "contain" as const,
  },
  {
    imageSrc: "/static/media/broken-disk.5b8ebec8d7f8f022e876.png",
    title: "Disk Image Deception",
    description:
      "Cisco blog post highlighting our encounter with a malspam campaign that misused the .IMG file extension and lessons learned.",
    linkHref:
      "https://blogs.cisco.com/security/disk-image-deception-incident-response",
  },
  {
    imageSrc: "/static/media/kill-chain.0ddaf11be14699561ffc.png",
    title: "The Right Data at the Right Time",
    description:
      "Presented at the SANS SIEM Summit on defining the right observability for security monitoring and how to apply the data collection principles to delivering security monitoring.",
    linkHref: "https://www.sans.org/presentations/the-right-data-at-the-right-time/",
  },
  {
    imageSrc: "/static/media/locks.33137b9b7fc27a57f175.png",
    title: "Cognitive Bias in Incident Response",
    description:
      "Blog on pitfalls of overconfidence in cybersecurity incident response, highlighting the Dunning–Kruger effect and emphasizing robust methodology.",
    linkHref:
      "https://blogs.cisco.com/security/cognitive-bias-in-incident-response",
  },
  {
    imageSrc: "/static/media/schiltron.d0ca5c27d5b5cfee981e.png",
    title: "CSIRT Schiltron: Training, Techniques, and Talent",
    description:
      "Presentation on enabling readiness and improving capabilities with evolving threat profiles and new skillsets for incident response teams.",
    linkHref:
      "https://www.first.org/resources/papers/conf2019/1100-CSIRT-Schiltron-Final.pdf",
    imageFit: "contain" as const,
  },
  {
    imageSrc: "/static/media/hacker.a0a5977e419ef5ecbc86.png",
    title:
      "How Computer Incident Response teams use CTI to keep up with the miscreants",
    description:
      "Presentation at LACNIC 29 in Panama on applying cyber threat intelligence to incident response and detection engineering playbooks.",
    linkHref:
      "https://www.first.org/events/symposium/panama2018/program#pHow-Computer-Incident-Response-teams-use-Cyber-Threat-Intelligence-CTI-to-ensure-they-keep-up-with-the-miscreants",
  },
  {
    imageSrc: "/static/media/interop.5e03f76b3da18aa7a93e.png",
    title: "Incident Detection and Response",
    description:
      "InterOp Japan presentation on building a world class security team and demonstrating approaches with web filtering and intrusion detection.",
    linkHref: "https://archive.interop.jp/2017/en/about/",
  },
  {
    imageSrc: "/static/media/bonzi.7015abbedc1e2d5d322f.png",
    title: "Ad-Weary Or, \"What Could Possibly Go Wrong?\"",
    description:
      "Presentation at Security B-Sides Asheville and LACNIC/LACNOG 26 on ad-ware threats in enterprise networks and mitigation lessons.",
    linkHref: "https://www.youtube.com/watch?v=zfIAifhRMto",
  },
  {
    imageSrc: "/static/media/ams.31a98a26e35e896408d3.png",
    title: "FIRST Technical Colloquium Amsterdam",
    description:
      "Annual FIRST Technical Colloquium in Amsterdam producing hundreds of talks on incident handling, threat intelligence, malware analysis, and more.",
    linkHref:
      "https://www.first.org/events/colloquia/amsterdam2022/program#pFIRST-TC-Amsterdam-2020-Day-1",
  },
  {
    imageSrc: "/static/media/web.621276f7226ea1a23b18.png",
    title: "The State of Web Security: Attack and Response",
    description:
      "Cisco Live presentations covering web-based attacks and protections through HTTP/S inspection and web-based logging and monitoring.",
    linkHref:
      "https://www.alcatron.net/Cisco%20Live%202013%20Melbourne/Cisco%20Live%20Content/Security/BRKSEC-2010%20%20The%20State%20of%20Web%20Security%20-%20Attack%20and%20Response.pdf",
  },
  {
    imageSrc: "/static/media/cloud.e6bacd0aae8c329e0edd.png",
    title:
      "Cloud Security Observability for Detection and Response (Podcast)",
    description:
      "Discussed enterprise scale security observability for incident response and threat detection on the Google Cloud Security Podcast.",
    linkHref:
      "https://cloud.withgoogle.com/cloudsecurity/podcast/ep96-cloud-security-observability-for-detection-and-response/",
  },
];

// No additionalLinks section anymore; all items are cards in `publications`.

export default function PublicationsPage() {
  const [visibleCount, setVisibleCount] = useState(10);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setVisibleCount((prev) => Math.min(prev + 10, publications.length));
      }
    }, { rootMargin: "200px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visibleItems = publications.slice(0, visibleCount);

  return (
    <main className="min-h-screen p-8 text-white">
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-purple-400">Publications and Conferences</span>
      </h1>
      <p className="text-white/80 mb-6">This is a non-exhaustive list of blogs, articles, conferences hosted, and other publications I&apos;ve created or co-created.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleItems.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>

      {visibleCount < publications.length && (
        <div ref={sentinelRef} className="h-10 mt-8" />
      )}
    </main>
  );
}


