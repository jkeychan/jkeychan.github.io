type ProjectCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  linkHref: string;
  linkLabel?: string;
};

export function ProjectCard({ imageSrc, title, description, linkHref, linkLabel = "Link" }: ProjectCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden shadow-md flex flex-col h-full">
      <div className="w-full h-56 md:h-64 bg-black/20 overflow-hidden">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover object-center" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        <p className="text-white/80 text-sm flex-1" style={{ textAlign: "justify" }}>{description}</p>
        <div className="mt-4">
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-3 py-2 rounded"
          >
            {linkLabel}
          </a>
        </div>
      </div>
    </div>
  );
}


