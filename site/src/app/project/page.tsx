import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://www.jeff-bollinger.com/publications",
  },
};

export default function ProjectPage() {
  redirect("/publications");
}
