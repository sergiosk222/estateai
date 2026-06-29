import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Examples",
  description:
    "Explore example 3D property pages created for the EstateAI early MVP.",
  openGraph: {
    title: "EstateAI Examples — 3D Property Pages",
    description:
      "Explore example 3D property pages with photos, descriptions and browser-based 3D viewing.",
    images: ["/og-image.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "EstateAI Examples — 3D Property Pages",
    description:
      "Explore example 3D property pages with photos, descriptions and browser-based 3D viewing.",
    images: ["/og-image.png"]
  }
};

export default function ExamplesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
