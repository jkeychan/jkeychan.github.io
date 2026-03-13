import Image from "next/image";
import type { ProjectCardProps } from "@/types";

export function ProjectCard({
  imageSrc,
  title,
  description,
  linkHref,
  linkLabel = "Link",
  imageFit = "cover",
  imagePosition = "center",
}: ProjectCardProps) {
  const fitClass =
    imageFit === "contain" ? "object-contain" : "object-cover";
  const posClass =
    imagePosition === "top"
      ? "object-top"
      : imagePosition === "bottom"
        ? "object-bottom"
        : imagePosition === "left"
          ? "object-left"
          : imagePosition === "right"
            ? "object-right"
            : "object-center";

  return (
    <div className="border border-[rgba(0,229,229,0.12)] bg-[rgba(0,229,229,0.02)] overflow-hidden flex flex-col h-full hover:border-[rgba(0,229,229,0.25)] hover:bg-[rgba(0,229,229,0.04)] transition-colors">
      <div className="w-full h-56 md:h-64 bg-[#001010] overflow-hidden relative border-b border-[rgba(0,229,229,0.08)]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`${fitClass} ${posClass} [filter:saturate(0.5)_contrast(1.1)]`}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-[#00e5e5] text-[13px] font-bold mb-2 leading-snug">{title}</h3>
        <p className="text-[rgba(0,229,229,0.45)] text-[11px] flex-1 leading-[1.6]">
          {description}
        </p>
        <div className="mt-4">
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[2px] uppercase text-[rgba(0,229,229,0.6)] hover:text-[#00e5e5]"
          >
            {linkLabel} &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
