export type EventData = {
  startDate: string; // ISO 8601 date
  endDate?: string; // ISO 8601 date
  locationName: string;
  locationAddress: string;
  organizerName: string;
  organizerUrl?: string;
};

export type Publication = {
  imageSrc: string;
  title: string;
  description: string;
  linkHref: string;
  imageFit?: "cover" | "contain";
  thumbnailUrl?: string;
  uploadDate?: string;
  videoId?: string;
  eventData?: EventData;
};

export type ProjectCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  linkHref: string;
  linkLabel?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: "center" | "top" | "bottom" | "left" | "right";
};
