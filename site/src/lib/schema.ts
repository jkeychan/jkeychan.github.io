import type { Publication } from "@/types";

const BASE_URL = "https://www.jeff-bollinger.com";

/** Check whether a URL's hostname matches any of the given hostnames (with/without www). */
export function urlMatchesHostname(url: string, hostnames: string[]): boolean {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    return hostnames.some(
      (h) =>
        hostname === h.toLowerCase() ||
        hostname === `www.${h.toLowerCase()}`,
    );
  } catch {
    return false;
  }
}

/** Extract a YouTube video ID from common YouTube URL formats. */
export function extractYouTubeVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // youtube.com/watch?v=VIDEO_ID
    if (
      (hostname === "youtube.com" || hostname === "www.youtube.com") &&
      urlObj.searchParams.has("v")
    ) {
      return urlObj.searchParams.get("v");
    }
    // youtube.com/live/VIDEO_ID
    if (
      (hostname === "youtube.com" || hostname === "www.youtube.com") &&
      urlObj.pathname.startsWith("/live/")
    ) {
      const parts = urlObj.pathname.split("/");
      const liveIndex = parts.indexOf("live");
      if (liveIndex !== -1 && liveIndex < parts.length - 1) {
        return parts[liveIndex + 1].split("?")[0];
      }
    }
    // youtu.be/VIDEO_ID
    if (hostname === "youtu.be" || hostname === "www.youtu.be") {
      return urlObj.pathname.slice(1).split("?")[0];
    }
  } catch {
    // Invalid URL
  }
  return null;
}

/** Determine the Schema.org type for a publication entry. */
export function getSchemaType(
  publication: Publication,
): "Article" | "VideoObject" | "Event" | "Book" {
  const { title, description, linkHref } = publication;
  const lowerTitle = title.toLowerCase();
  const lowerDesc = description.toLowerCase();

  if (urlMatchesHostname(linkHref, ["youtube.com", "youtu.be"])) {
    return "VideoObject";
  }

  if (
    lowerTitle.includes("crafting the infosec playbook") &&
    urlMatchesHostname(linkHref, ["infosecplaybook.com"])
  ) {
    return "Book";
  }

  const eventKeywords = [
    "presentation",
    "presented",
    "summit",
    "conference",
    "colloquium",
    "symposium",
    "cisco live",
    "sans",
    "first",
    "lacnic",
    "interop",
    "b-sides",
  ];
  if (
    eventKeywords.some(
      (keyword) =>
        lowerTitle.includes(keyword) || lowerDesc.includes(keyword),
    )
  ) {
    return "Event";
  }

  return "Article";
}

/** Generate JSON-LD structured data for an array of publications. */
export function generateSchemas(cards: Publication[]) {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: cards.length,
    itemListElement: cards.map((card, index) => {
      const schemaType = getSchemaType(card);
      const item: Record<string, unknown> = {
        "@type": schemaType,
        name: card.title,
        url: card.linkHref,
      };

      if (schemaType === "VideoObject") {
        const imageUrl = `${BASE_URL}${card.imageSrc}`;
        item.thumbnailUrl = card.thumbnailUrl ?? imageUrl;
        if (card.uploadDate) {
          item.uploadDate = card.uploadDate;
        }
      }

      return {
        "@type": "ListItem",
        position: index + 1,
        item,
      };
    }),
  };

  const schemas = cards.map((card) => {
    const schemaType = getSchemaType(card);
    const imageUrl = `${BASE_URL}${card.imageSrc}`;
    const thumbnailUrl = card.thumbnailUrl ?? imageUrl;
    const description = card.description || card.title;

    const baseSchema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": schemaType,
      name: card.title,
      description,
      url: card.linkHref,
      image: imageUrl,
      author: {
        "@type": "Person",
        name: "Jeff Bollinger",
        url: BASE_URL,
      },
    };

    if (schemaType === "VideoObject") {
      const videoId =
        card.videoId || extractYouTubeVideoId(card.linkHref);
      baseSchema.embedUrl = videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : card.linkHref;
      baseSchema.thumbnailUrl = thumbnailUrl;
      baseSchema.description = description;
      if (card.uploadDate) {
        baseSchema.uploadDate = card.uploadDate;
      }
    } else if (schemaType === "Event") {
      baseSchema.eventAttendanceMode =
        "https://schema.org/OfflineEventAttendanceMode";
      baseSchema.eventStatus =
        "https://schema.org/EventScheduled";
      baseSchema.performer = {
        "@type": "Person",
        name: "Jeff Bollinger",
        url: BASE_URL,
      };
      if (card.eventData) {
        baseSchema.startDate = card.eventData.startDate;
        if (card.eventData.endDate) {
          baseSchema.endDate = card.eventData.endDate;
        }
        baseSchema.location = {
          "@type": "Place",
          name: card.eventData.locationName,
          address: {
            "@type": "PostalAddress",
            addressLocality: card.eventData.locationAddress,
          },
        };
        baseSchema.organizer = {
          "@type": "Organization",
          name: card.eventData.organizerName,
          ...(card.eventData.organizerUrl && {
            url: card.eventData.organizerUrl,
          }),
        };
      }
    } else if (schemaType === "Book") {
      baseSchema.publisher = {
        "@type": "Organization",
        name: "O'Reilly Media",
        url: "https://www.oreilly.com/",
      };
      baseSchema.isbn = "978-1491949405";
    } else if (schemaType === "Article") {
      if (urlMatchesHostname(card.linkHref, ["cisco.com"])) {
        baseSchema.publisher = {
          "@type": "Organization",
          name: "Cisco",
          url: "https://www.cisco.com/",
        };
      } else if (
        urlMatchesHostname(card.linkHref, [
          "linkedin.com",
          "engineering.linkedin.com",
        ])
      ) {
        baseSchema.publisher = {
          "@type": "Organization",
          name: "LinkedIn Engineering",
          url: "https://engineering.linkedin.com/",
        };
      } else if (
        urlMatchesHostname(card.linkHref, ["cloud.withgoogle.com"])
      ) {
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
