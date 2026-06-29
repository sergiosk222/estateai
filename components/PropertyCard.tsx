import Link from "next/link";
import type { Property } from "@/data/properties";

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/p/${property.slug}`}
      className="group overflow-hidden rounded-[1.5rem] border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 sm:rounded-[2rem]"
    >
      <div className="overflow-hidden bg-neutral-100">
        <img
          src={`${property.images[0]}?auto=format&fit=crop&w=1200&q=85`}
          alt={property.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-neutral-500">
              {property.city}
            </p>

            <h2 className="mt-2 text-xl font-black tracking-tight sm:text-2xl">
              {property.title}
            </h2>
          </div>

          <span className="shrink-0 rounded-full bg-black px-3 py-2 text-xs font-black uppercase tracking-wide text-white">
            3D
          </span>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-neutral-600">
          {property.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm font-bold text-neutral-950">
            Open 3D page
          </span>

          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-lg font-black transition group-hover:bg-black group-hover:text-white">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
