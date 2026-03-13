"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
                ? "text-[12px] tracking-[2px] uppercase text-[#00e5e5]"
                : "text-[12px] tracking-[2px] uppercase text-[rgba(0,229,229,0.35)] hover:text-[#00e5e5]"
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
            className="text-[12px] tracking-[2px] uppercase text-[rgba(0,229,229,0.35)] hover:text-[#00e5e5]"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
