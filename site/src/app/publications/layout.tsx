import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications and Conferences",
  description:
    "Non-exhaustive list of Jeff Bollinger's blogs, articles, conferences hosted, and other publications.",
  alternates: { canonical: "/publications" },
};

export default function PublicationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
