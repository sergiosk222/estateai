type PropertyGalleryProps = {
  images: string[];
};

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {images.map((image, index) => (
        <div
          key={image}
          className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100"
        >
          <img
            src={`${image}?auto=format&fit=crop&w=900&q=80`}
            alt={`Property image ${index + 1}`}
            className="h-64 w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
