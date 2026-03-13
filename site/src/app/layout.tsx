import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { NavLinks } from "./(components)/NavLinks";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jeff-bollinger.com"),
  title: {
    default: "Jeff Bollinger | Resume, CV, and Publications",
    template: "%s | Jeff Bollinger",
  },
  description:
    "Jeff Bollinger's official resume website featuring comprehensive details about his expertise in cybersecurity, executive leadership, security engineering, and publications.",
  alternates: { canonical: "/" },
  keywords: [
    "Jeff Bollinger",
    "Jeff Bollinger Resume",
    "Jeff Bollinger CV",
    "Jeff Bollinger Publications",
    "Jeff Bollinger Security",
    "Jeff Bollinger Security Engineering",
    "Jeff Bollinger Security Operations",
    "Jeffrey Bollinger",
    "executive leadership",
    "cybersecurity",
    "incident response",
    "detection engineering",
    "security architecture",
    "security operations",
    "security design",
    "security engineering",
    "security",
    "security consulting",
    "security services",
  ],
  authors: [{ name: "Jeff Bollinger", url: "https://www.linkedin.com/in/jeffb0llinger/" }],
  creator: "Jeff Bollinger",
  publisher: "Jeff Bollinger",
  openGraph: {
    type: "website",
    url: "https://www.jeff-bollinger.com/",
    title: "Jeff Bollinger | Resume, CV, and Publications",
    description:
      "Jeff Bollinger's official resume website featuring comprehensive details about his expertise in cybersecurity, projects, and publications.",
    siteName: "Jeff Bollinger",
    images: [
      {
        url: "https://www.jeff-bollinger.com/og-card.png",
        width: 1200,
        height: 630,
        alt: "Jeff Bollinger | Cybersecurity Leader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeff Bollinger | Resume, CV, and Publications",
    description:
      "Jeff Bollinger's official resume website featuring comprehensive details about his expertise in cybersecurity, executive leadership, security engineering, and publications.",
    images: [
      "https://www.jeff-bollinger.com/og-card.png",
    ],
  },
  other: {
    "referrer": "strict-origin-when-cross-origin",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      </head>
      <body
        className={`${jetbrainsMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-terminal-cyan focus:text-black focus:px-4 focus:py-2 focus:text-[12px] focus:tracking-[2px] focus:uppercase focus:font-bold"
        >
          Skip to main content
        </a>
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 50,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,200,200,0.008) 3px, rgba(0,200,200,0.008) 4px)",
          }}
        />
        {/* ProfilePage with Person schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              mainEntity: {
                "@type": "Person",
                name: "Jeff Bollinger",
                url: "https://www.jeff-bollinger.com",
                jobTitle: "Director, Incident Response and Detection Engineering",
                description:
                  "Expert in cybersecurity with over 25 years of experience in incident response, detection engineering, and executive leadership.",
                image: "https://www.jeff-bollinger.com/static/media/avatar.d355c64ac071e83edeabfc9c51f454d3.svg",
                worksFor: [
                  {
                    "@type": "Organization",
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/",
                  },
                  {
                    "@type": "Organization",
                    name: "Cisco",
                    url: "https://www.cisco.com/",
                  },
                ],
                affiliation: [
                  { "@type": "Organization", name: "LinkedIn", url: "https://www.linkedin.com/" },
                  { "@type": "Organization", name: "Cisco", url: "https://www.cisco.com/" },
                  { "@type": "Organization", name: "University of North Carolina at Chapel Hill", url: "https://www.unc.edu/" },
                ],
                knowsAbout: [
                  "Cybersecurity",
                  "Computer Security",
                  "Executive Leadership",
                  "Security Engineering",
                  "Security Operations",
                  "Security Architecture",
                  "Security Design",
                  "Security",
                  "Security Consulting",
                  "Penetration Testing",
                  "CSIRT",
                  "Incident Response",
                  "Director",
                ],
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    contactType: "professional",
                    url: "https://www.linkedin.com/in/jeffb0llinger/",
                  },
                ],
                sameAs: [
                  "https://www.linkedin.com/in/jeffb0llinger/",
                  "https://github.com/jkeychan",
                  "https://www.infosecplaybook.com/",
                  "https://www.oreilly.com/pub/au/6508",
                ],
              },
            }),
          }}
        />
        {/* ImageObject for avatar */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageObject",
              contentUrl: "https://www.jeff-bollinger.com/static/media/avatar.d355c64ac071e83edeabfc9c51f454d3.svg",
              creator: {
                "@type": "Person",
                name: "Jeff Bollinger",
              },
              creditText: "Jeff Bollinger",
              caption: "Jeff Bollinger - Cybersecurity Leader",
              license: "https://www.jeff-bollinger.com/",
              copyrightNotice: "\u00a9 Jeff Bollinger. All rights reserved.",
              acquireLicensePage: "https://www.jeff-bollinger.com/",
            }),
          }}
        />
        {/* Organization schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "LinkedIn",
              url: "https://www.linkedin.com/",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Cisco",
              url: "https://www.cisco.com/",
            }),
          }}
        />
        {/* BreadcrumbList - will be overridden per page for more specific paths */}
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
              ],
            }),
          }}
        />
        <nav
          className="fixed top-0 left-0 right-0 z-[60] backdrop-blur bg-[rgba(0,10,10,0.92)] border-b border-terminal-border"
          aria-label="Main navigation"
        >
          <div className="mx-auto max-w-5xl px-6 py-4 flex items-center">
            <NavLinks />
          </div>
        </nav>
        <div className="pt-16" id="main-content">{children}</div>
        <footer className="mt-8 border-t border-[rgba(0,229,229,0.08)]">
          <div className="mx-auto max-w-5xl px-6 py-6">
            <p className="text-[11px] tracking-[2px] text-[rgba(0,229,229,0.2)]">
              &copy; {new Date().getFullYear()} Jeff Bollinger
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
