export type Property = {
  slug: string;
  title: string;
  city: string;
  description: string;
  modelUrl: string;
  images: string[];
};

export const properties: Property[] = [
  {
    slug: "demo-apartment",
    title: "Demo Apartment Template",
    city: "Thessaloniki, Greece",
    description:
      "A demo property page showing how EstateAI can present an apartment as an interactive 3D model directly in the browser. This is a template object used for product testing.",
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
    ]
  },
  {
    slug: "demo-villa",
    title: "Demo Villa Template",
    city: "Halkidiki, Greece",
    description:
      "A demo villa listing designed to show how larger properties can be presented with photos, description and a browser-based 3D viewing experience.",
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea"
    ]
  },
  {
    slug: "demo-office",
    title: "Demo Office Template",
    city: "Athens, Greece",
    description:
      "A demo office property page showing how EstateAI could be used for commercial spaces, offices, studios and business properties.",
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
      "https://images.unsplash.com/photo-1497366216548-37526070297c"
    ]
  }
];

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}
