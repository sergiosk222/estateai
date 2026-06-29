import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const siteUrl = "https://estateai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EstateAI — 3D Property Pages for Real Estate",
    template: "%s | EstateAI"
  },
  description:
    "EstateAI helps real estate agents create shareable 3D property pages that help buyers understand listings before they visit.",
  applicationName: "EstateAI",
  keywords: [
    "real estate",
    "3D property",
    "property viewer",
    "real estate 3D",
    "digital twin",
    "3D apartment",
    "real estate technology",
    "Thessaloniki real estate",
    "Greece property"
  ],
  authors: [{ name: "EstateAI" }],
  creator: "EstateAI",
  publisher: "EstateAI",
  openGraph: {
    title: "EstateAI — 3D Property Pages for Real Estate",
    description:
      "Shareable 3D property pages that help buyers understand real estate listings before they visit.",
    url: siteUrl,
    siteName: "EstateAI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EstateAI 3D property page preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "EstateAI — 3D Property Pages for Real Estate",
    description:
      "Shareable 3D property pages that help buyers understand real estate listings before they visit.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
