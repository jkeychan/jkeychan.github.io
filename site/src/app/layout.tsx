import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        url: "https://www.jeff-bollinger.com/og-card.svg",
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
      "https://www.jeff-bollinger.com/og-card.svg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="star-field" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jeff Bollinger",
              url: "https://www.jeff-bollinger.com",
              jobTitle: "Director, Incident Response and Detection Engineering",
              description:
                "Expert in cybersecurity with over 25 years of experience in incident response, detection engineering, and executive leadership.",
              affiliation: [
                { "@type": "Organization", name: "LinkedIn" },
                { "@type": "Organization", name: "Cisco" },
                { "@type": "Organization", name: "University of North Carolina at Chapel Hill" }
              ],
              knowsAbout: [
                "Cybersecurity",
                "Computer Security",
                "Executive Leadership",
                "Security Engineering",
                "Security Operations",
                "Security Architecture",
                "Security Design",
                "Security Engineering",
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
                "https://www.oreilly.com/pub/au/6508"
              ],
            }),
          }}
        />
        <nav className="fixed top-0 left-0 right-0 z-10 backdrop-blur bg-black/10 border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
            <Link href="/" className="text-white hover:opacity-80">Home</Link>
            <Link href="/publications" className="text-white hover:opacity-80">Publications</Link>
            <Link href="/resume" className="text-white hover:opacity-80">Resume/CV</Link>
          </div>
        </nav>
        <div className="pt-16">{children}</div>
        <footer className="mt-8 border-t border-white/10 text-white/80">
          <div className="w-full px-4 py-8 flex items-center justify-start">
            <div className="max-w-6xl w-full mx-auto flex gap-4">
              <a href="https://www.linkedin.com/in/jeffb0llinger" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">LinkedIn</a>
              <a href="https://github.com/jkeychan" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">GitHub</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
