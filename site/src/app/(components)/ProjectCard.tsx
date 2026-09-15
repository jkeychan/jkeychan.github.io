import Image from "next/image";
import type { ProjectCardProps } from "@/types";

export function ProjectCard({
  imageSrc,
  title,
  description,
  linkHref,
  imageFit = "cover",
}: ProjectCardProps) {
  const fitClass =
    imageFit === "contain" ? "object-contain" : "object-cover";

  return (
    <div className="card-pulse border-2 border-[rgba(0,229,229,0.22)] bg-terminal-surface overflow-hidden flex flex-col h-full hover:border-[rgba(0,229,229,0.45)] hover:bg-[rgba(0,229,229,0.04)] transition-colors">
      <div className="w-full h-56 md:h-64 bg-[#001010] overflow-hidden relative border-b border-[rgba(0,229,229,0.08)]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`${fitClass} object-center [filter:saturate(0.5)_contrast(1.1)]`}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-terminal-cyan text-[13px] font-bold mb-2 leading-snug">{title}</h3>
        <p className="text-[rgba(0,229,229,0.45)] text-[11px] flex-1 leading-[1.6]">
          {description}
        </p>
        <div className="mt-4">
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[2px] uppercase text-terminal-cyan-60 hover:text-terminal-cyan"
          >
            Link &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
