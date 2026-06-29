import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a 3D Property Page",
  description:
    "Request an early-access 3D property page for a real estate listing.",
  openGraph: {
    title: "Request a 3D Property Page | EstateAI",
    description:
      "Send a request for a browser-ready 3D page for a real estate property.",
    images: ["/og-image.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a 3D Property Page | EstateAI",
    description:
      "Send a request for a browser-ready 3D page for a real estate property.",
    images: ["/og-image.png"]
  }
};

export default function RequestLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
