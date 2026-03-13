"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINK_BASE = "text-[12px] tracking-[2px] uppercase";
const NAV_LINK_INACTIVE = `${NAV_LINK_BASE} text-terminal-cyan-35 hover:text-terminal-cyan`;

const links = [
  { href: "/", label: "Home" },
  { href: "/publications", label: "Publications" },
  { href: "/resume", label: "Resume / CV" },
];

const externalLinks = [
  { href: "https://www.linkedin.com/in/jeffb0llinger", label: "LinkedIn" },
  { href: "https://github.com/jkeychan", label: "GitHub" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-6 w-full">
      <div className="flex items-center gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={
              pathname === href
                ? `${NAV_LINK_BASE} text-terminal-cyan`
                : NAV_LINK_INACTIVE
            }
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-6">
        {externalLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={NAV_LINK_INACTIVE}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
