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
    title: "Modern apartment in Thessaloniki",
    city: "Thessaloniki, Greece",
    description:
      "A clean demo property page showing how EstateAI can present an apartment as an interactive 3D model directly in the browser.",
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
    ]
  }
];

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}
