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
  title: "Jeff Bollinger | Resume, CV, and Publications",
  description:
    "Jeff Bollinger's official resume website featuring comprehensive details about his expertise in cybersecurity, projects, and publications.",
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
        <nav className="fixed top-0 left-0 right-0 z-10 backdrop-blur bg-black/10 border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
            <Link href="/" className="text-white hover:opacity-80">Home</Link>
            <Link href="/project" className="text-white hover:opacity-80">Publications</Link>
            <Link href="/resume" className="text-white hover:opacity-80">Resume/CV</Link>
          </div>
        </nav>
        <div className="pt-16">{children}</div>
        <footer className="mt-16 border-t border-white/10 text-white/80">
          <div className="mx-auto max-w-6xl px-4 py-8 flex items-center justify-between">
            <span>Original Template by <a className="underline hover:opacity-80" href="https://github.com/soumyajit4419/Portfolio/" target="_blank" rel="noopener noreferrer">Soumyajit Behera</a></span>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/jeffb0llinger" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">LinkedIn</a>
              <a href="https://github.com/jkeychan" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">GitHub</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
