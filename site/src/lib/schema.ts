import type { Publication } from "@/types";

const BASE_URL = "https://www.jeff-bollinger.com";

/** Determine the Schema.org type for a publication entry. */
export function getSchemaType(
  publication: Publication,
): "Article" | "Event" | "Book" | "VideoObject" {
  const { isbn, eventData, videoId } = publication;

  if (isbn) {
    return "Book";
  }

  // Only use Event when structured event data is present to satisfy required fields.
  if (eventData) {
    return "Event";
  }

  if (videoId) {
    return "VideoObject";
  }

  return "Article";
}

/** Build the embed URL for a video publication. */
function getVideoEmbedUrl(publication: Publication): string | null {
  const { videoId, videoPlatform } = publication;
  if (!videoId) return null;
  if (videoPlatform === "vimeo") {
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return `https://www.youtube.com/embed/${videoId}`;
}

/** Generate JSON-LD structured data for an array of publications. */
export function generateSchemas(cards: Publication[]) {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: cards.length,
    itemListElement: cards.map((card, index) => {
      const schemaType = getSchemaType(card);
      const imageUrl = `${BASE_URL}${card.imageSrc}`;
      const description = card.description || card.title;
      const item: Record<string, unknown> = {
        "@type": schemaType,
        name: card.title,
        url: card.linkHref,
        description,
        image: imageUrl,
      };

      if (schemaType === "Event" && card.eventData) {
        item.eventStatus = "https://schema.org/EventScheduled";
        item.eventAttendanceMode =
          "https://schema.org/OfflineEventAttendanceMode";
        item.startDate = card.eventData.startDate;
        if (card.eventData.endDate) {
          item.endDate = card.eventData.endDate;
        }
        item.location = {
          "@type": "Place",
          name: card.eventData.locationName,
          address: {
            "@type": "PostalAddress",
            addressLocality: card.eventData.locationAddress,
          },
        };
        item.organizer = {
          "@type": "Organization",
          name: card.eventData.organizerName,
          ...(card.eventData.organizerUrl && {
            url: card.eventData.organizerUrl,
          }),
        };
        item.performer = {
          "@type": "Person",
          name: "Jeff Bollinger",
          url: BASE_URL,
        };
      } else if (schemaType === "VideoObject") {
        const embedUrl = getVideoEmbedUrl(card);
        if (embedUrl) item.embedUrl = embedUrl;
        item.contentUrl = card.linkHref;
        if (card.thumbnailUrl) item.thumbnailUrl = card.thumbnailUrl;
        if (card.uploadDate) item.uploadDate = card.uploadDate;
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

    if (schemaType === "Event" && card.eventData) {
      baseSchema.eventAttendanceMode =
        "https://schema.org/OfflineEventAttendanceMode";
      baseSchema.eventStatus = "https://schema.org/EventScheduled";
      baseSchema.performer = {
        "@type": "Person",
        name: "Jeff Bollinger",
        url: BASE_URL,
      };
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
    } else if (schemaType === "VideoObject") {
      const embedUrl = getVideoEmbedUrl(card);
      if (embedUrl) baseSchema.embedUrl = embedUrl;
      baseSchema.contentUrl = card.linkHref;
      if (card.thumbnailUrl) baseSchema.thumbnailUrl = card.thumbnailUrl;
      if (card.uploadDate) baseSchema.uploadDate = card.uploadDate;
      if (card.publisher) {
        baseSchema.publisher = {
          "@type": "Organization",
          name: card.publisher.name,
          url: card.publisher.url,
        };
        baseSchema.creator = {
          "@type": "Organization",
          name: card.publisher.name,
          url: card.publisher.url,
        };
        // Jeff is the interviewee/subject, not the video's author
        baseSchema.author = {
          "@type": "Organization",
          name: card.publisher.name,
          url: card.publisher.url,
        };
        baseSchema.about = {
          "@type": "Person",
          name: "Jeff Bollinger",
          url: BASE_URL,
        };
      }
    } else if (card.publisher) {
      baseSchema.publisher = {
        "@type": "Organization",
        name: card.publisher.name,
        url: card.publisher.url,
      };
      if (card.isbn) baseSchema.isbn = card.isbn;
    }

    return baseSchema;
  });

  return { itemList, schemas };
}
