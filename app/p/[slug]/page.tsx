import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import ModelViewer from "@/components/ModelViewer";
import PropertyGallery from "@/components/PropertyGallery";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import ShareButton from "@/components/ShareButton";
import { getPropertyBySlug } from "@/data/properties";

type PropertyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property not found",
      description: "This EstateAI property page could not be found."
    };
  }

  return {
    title: `${property.title}`,
    description: property.description,
    openGraph: {
      title: `${property.title} | EstateAI`,
      description: property.description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${property.title} preview`
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.title} | EstateAI`,
      description: property.description,
      images: ["/og-image.png"]
    }
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Property not found</h1>
          <Link href="/" className="mt-6 inline-block underline">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <PublicHeader />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-neutral-500">
            {property.city}
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            {property.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            {property.description}
          </p>
        </div>

        <ModelViewer src={property.modelUrl} poster={property.images[0]} />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <ShareButton />

          <TrackedLink
            href="/request"
            eventName="property_request_click"
            eventProperties={{
              property: property.slug
            }}
            className="rounded-full border border-neutral-300 px-6 py-3 text-center text-sm font-semibold transition hover:bg-neutral-100"
          >
            Request a 3D page
          </TrackedLink>

          <TrackedLink
            href="/examples"
            eventName="property_more_examples_click"
            eventProperties={{
              property: property.slug
            }}
            className="rounded-full border border-neutral-300 px-6 py-3 text-center text-sm font-semibold transition hover:bg-neutral-100"
          >
            View more examples
          </TrackedLink>
        </div>

        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-bold">Property photos</h2>
          <PropertyGallery images={property.images} />
        </section>
      </section>

      <PublicFooter />
    </main>
  );
}
