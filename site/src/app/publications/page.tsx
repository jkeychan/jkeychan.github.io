"use client";
import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "../(components)/ProjectCard";

type Publication = {
  imageSrc: string;
  title: string;
  description: string;
  linkHref: string;
  imageFit?: "cover" | "contain";
  thumbnailUrl?: string;
  uploadDate?: string;
  videoId?: string;
};

// Helper function to check if URL matches a specific hostname
function urlMatchesHostname(url: string, hostnames: string[]): boolean {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    return hostnames.some((h) => hostname === h.toLowerCase() || hostname === `www.${h.toLowerCase()}`);
  } catch {
    // Invalid URL, return false
    return false;
  }
}

// Helper function to determine schema type
function getSchemaType(publication: Publication): "Article" | "VideoObject" | "Event" | "Book" {
  const { title, description, linkHref } = publication;
  const lowerTitle = title.toLowerCase();
  const lowerDesc = description.toLowerCase();

  // Check for YouTube videos
  if (urlMatchesHostname(linkHref, ["youtube.com", "youtu.be"])) {
    return "VideoObject";
  }

  // Check for book
  if (lowerTitle.includes("crafting the infosec playbook") && urlMatchesHostname(linkHref, ["infosecplaybook.com"])) {
    return "Book";
  }

  // Check for events/conferences
  const eventKeywords = ["presentation", "presented", "summit", "conference", "colloquium", "symposium", "cisco live", "sans", "first", "lacnic", "interop", "b-sides"];
  if (eventKeywords.some(keyword => lowerTitle.includes(keyword) || lowerDesc.includes(keyword))) {
    return "Event";
  }

  // Default to Article
  return "Article";
}

// Generate structured data schemas
function generateSchemas(cards: Publication[]) {
  const baseUrl = "https://www.jeff-bollinger.com";
  
  // ItemList schema
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: cards.length,
    itemListElement: cards.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": getSchemaType(card),
        name: card.title,
        url: card.linkHref,
      },
    })),
  };

  // Individual schemas
  const schemas = cards.map((card) => {
    const schemaType = getSchemaType(card);
    const imageUrl = `${baseUrl}${card.imageSrc}`;
    const thumbnailUrl = card.thumbnailUrl ?? imageUrl;
    const baseSchema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": schemaType,
      name: card.title,
      description: card.description || "",
      url: card.linkHref,
      image: imageUrl,
      author: {
        "@type": "Person",
        name: "Jeff Bollinger",
        url: "https://www.jeff-bollinger.com",
      },
    };

    // Add type-specific properties
    if (schemaType === "VideoObject") {
      const embedUrl =
        card.videoId && urlMatchesHostname(card.linkHref, ["youtube.com", "youtu.be"])
          ? `https://www.youtube.com/embed/${card.videoId}`
          : card.linkHref;
      baseSchema.embedUrl = embedUrl;
      baseSchema.thumbnailUrl = thumbnailUrl;
      if (card.uploadDate) {
        baseSchema.uploadDate = card.uploadDate;
      }
    } else if (schemaType === "Event") {
      baseSchema.eventAttendanceMode = "https://schema.org/OfflineEventAttendanceMode";
      // Could add startDate, endDate, location if available
    } else if (schemaType === "Book") {
      baseSchema.publisher = {
        "@type": "Organization",
        name: "O'Reilly Media",
        url: "https://www.oreilly.com/",
      };
      baseSchema.isbn = "978-1491949405";
    } else if (schemaType === "Article") {
      // Determine publisher from URL using proper hostname matching
      if (urlMatchesHostname(card.linkHref, ["cisco.com"])) {
        baseSchema.publisher = {
          "@type": "Organization",
          name: "Cisco",
          url: "https://www.cisco.com/",
        };
      } else if (urlMatchesHostname(card.linkHref, ["linkedin.com", "engineering.linkedin.com"])) {
        baseSchema.publisher = {
          "@type": "Organization",
          name: "LinkedIn Engineering",
          url: "https://engineering.linkedin.com/",
        };
      } else if (urlMatchesHostname(card.linkHref, ["cloud.withgoogle.com"])) {
        baseSchema.publisher = {
          "@type": "Organization",
          name: "Google Cloud",
          url: "https://cloud.withgoogle.com/",
        };
      }
    }

    return baseSchema;
  });

  return { itemList, schemas };
}

const cards = [
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
    videoId: "zfIAifhRMto",
    thumbnailUrl: "https://img.youtube.com/vi/zfIAifhRMto/hqdefault.jpg",
    uploadDate: "2018-06-13T06:39:12-07:00",
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
  {
    imageSrc: "/static/media/international-women-in-engineering-day.jpeg",
    title: "International Women in Engineering Day LinkedIn Live",
    description: "",
    linkHref: "https://www.inwed.org.uk/activity/voices-in-infosec-linkedin-live-event/",
  },
  {
    imageSrc: "/static/media/cisco-security-blogs.jpg",
    title: "Cisco Security Blogs by Jeff Bollinger",
    description: "",
    linkHref: "https://blogs.cisco.com/author/jeffbollinger",
    imageFit: "contain" as const,
  },
  {
    imageSrc: "/static/media/cisco-tac-security-podcast-websec.jpeg",
    title: "Cisco TAC Security Podcast: Web Security with Jeff Bollinger",
    description: "",
    linkHref: "https://podcasts.apple.com/us/podcast/how-cisco-uses-web-security-appliance-to-protect-its/id343898585?i=1000370866442",
  },
  {
    imageSrc: "/static/media/zdnet-linkedin-cut-time.jpeg",
    title: "ZDNet article: LinkedIn has massively cut time to detect threats",
    description: "",
    linkHref: "https://www.zdnet.com/article/linkedin-has-massively-cut-the-time-it-takes-to-detect-security-threats-heres-how-it-did-it/",
  },
  {
    imageSrc: "/static/media/rsa-crafting-infosec-playbook-review.jpeg",
    title: "RSA: Crafting the Infosec Playbook Review",
    description: "",
    linkHref: "https://www.rsaconference.com/library/blog/crafting-the-infosec-playbook-security-monitoring-and-incident-response-master-pl",
  },
  {
    imageSrc: "/static/media/siem-books-amazon.jpeg",
    title: "SIEM Books on Amazon (Solutions Review)",
    description: "",
    linkHref: "https://solutionsreview.com/security-information-event-management/the-6-highest-rated-siem-books-available-on-amazon/",
  },
  {
    imageSrc: "/static/media/register-confirmation-bias-interview.jpeg",
    title: "Interview: Confirmation bias in incident response (The Register)",
    description: "",
    linkHref: "https://www.theregister.com/2016/07/27/cisco_warns_responders_drop_ego_assimilate_with_the_ir_playbook/",
  },
  {
    imageSrc: "/static/media/acm-sigcas-responsible-disclosure.jpeg",
    title: "ACM SIGCAS: Responsible Disclosure",
    description: "",
    linkHref: "https://dl.acm.org/doi/abs/10.1145/1111635.1111636",
  },
  {
    imageSrc: "/static/media/splunk-book-review.jpeg",
    title: "Splunk: Book review of Crafting the Infosec Playbook",
    description: "",
    linkHref: "https://www.splunk.com/en_us/blog/learn/cybersecurity-infosec-books.html",
  },
  {
    imageSrc: "/static/media/cisco-cybersecurity-threat-hunting.jpg",
    title: "Cisco Cybersecurity Series: Threat Hunting (quoted)",
    description: "",
    linkHref: "https://www.cisco.com/c/dam/global/en_uk/products/collateral/cybersecurity-series-2019-threat-hunting.pdf",
  },
  {
    imageSrc: "/static/media/cisco-it-case-study-web-security.jpeg",
    title: "Cisco IT Case Study: Web Security",
    description: "",
    linkHref: "https://www.cisco.com/c/dam/en_us/about/ciscoitatwork/borderless_networks/docs/cisco_it_case_study_wsa.pdf",
  },
  {
    imageSrc: "/static/media/cisco-datacenter-network-ips.jpeg",
    title: "Cisco Datacenter Case Study: Network IPS",
    description: "",
    linkHref: "https://www.cisco.com/c/dam/en_us/about/ciscoitatwork/downloads/ciscoitatwork/pdf/CSIRT_Network-Based_Intrusion_Prevention_System_Case_Study.pdf",
  },
  {
    imageSrc: "/static/media/unc-sils-article-logo.png",
    title: "Article on Jeff Bollinger from UNC SILS",
    description: "",
    linkHref: "https://sils.unc.edu/news/2015/bollinger-infosec-book",
    imageFit: "contain" as const,
  },
  {
    imageSrc: "/static/media/oreilly-author-page.png",
    title: "O'Reilly Author Page for Jeff Bollinger",
    description: "",
    linkHref: "https://www.oreilly.com/pub/au/6508",
    imageFit: "contain" as const,
  },
  {
    imageSrc: "/static/media/awesome-incident-response.svg",
    title: "Crafting the Infosec Playbook on Awesome Incident Response",
    description: "",
    linkHref: "https://github.com/meirwah/awesome-incident-response",
    imageFit: "contain" as const,
  },
  {
    imageSrc: "/static/media/bsides-asheville-ad-weary.png",
    title: "Ad Weary - BSides Asheville Information Security Conference",
    description: "",
    linkHref: "https://youtu.be/zfIAifhRMto?si=DFar-Sm7SSGcjQxv",
    videoId: "zfIAifhRMto",
    thumbnailUrl: "https://img.youtube.com/vi/zfIAifhRMto/hqdefault.jpg",
    uploadDate: "2018-06-13T06:39:12-07:00",
    imageFit: "contain" as const,
  },
  {
    imageSrc: "/static/media/breaking-into-cybersecurity.webp",
    title: "Breaking into Cybersecurity with Jeff Bollinger - Incident Response",
    description: "",
    linkHref: "https://www.youtube.com/live/Bkbgzz4L8J4?si=mKI1oR0ZdrgR4-Jb",
    videoId: "Bkbgzz4L8J4",
    thumbnailUrl: "https://img.youtube.com/vi/Bkbgzz4L8J4/hqdefault.jpg",
    uploadDate: "2022-01-28T22:34:53-08:00",
    imageFit: "contain" as const,
  },
  {
    imageSrc: "/static/media/linkedin-human-intuition.webp",
    title: "LinkedIn's Jeff Bollinger on the Role of Human Intuition in Addressing Security Challenges.",
    description: "",
    linkHref: "https://www.youtube.com/watch?v=1QfJwvNb_Uk",
    videoId: "1QfJwvNb_Uk",
    thumbnailUrl: "https://img.youtube.com/vi/1QfJwvNb_Uk/hqdefault.jpg",
    uploadDate: "2024-05-07T09:35:30-07:00",
    imageFit: "contain" as const,
  },
];

export default function PublicationsPage() {
  const [visibleCount, setVisibleCount] = useState(12);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setVisibleCount((prev) => Math.min(prev + 12, cards.length));
      }
    }, { rootMargin: "1000px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visibleItems = cards.slice(0, Math.min(visibleCount, cards.length));
  const { itemList, schemas } = generateSchemas(cards);

  return (
    <>
      {/* ItemList schema for publications collection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemList),
        }}
      />
      {/* Individual publication schemas */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      {/* BreadcrumbList for Publications page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.jeff-bollinger.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Publications",
                item: "https://www.jeff-bollinger.com/publications",
              },
            ],
          }),
        }}
      />
      <main className="min-h-screen p-8 text-white">
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-purple-400">Publications and Conferences</span>
      </h1>
      <p className="text-white/80 mb-6">This is a non-exhaustive list of blogs, podcasts, articles, reviews, conferences hosted, and other publications I&apos;ve created, co-created, or been involved in.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleItems.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>

      {visibleCount < cards.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => Math.min(prev + 12, cards.length))}
            className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium"
          >
            Load more
          </button>
        </div>
      )}

      <div ref={sentinelRef} className="h-10" />
    </main>
    </>
  );
}


