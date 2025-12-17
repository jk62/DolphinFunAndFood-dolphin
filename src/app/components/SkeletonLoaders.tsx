export function ReelsSkeleton() {
  return (
    <section className="bg-sky-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-full aspect-[9/16] rounded-2xl bg-white/50 animate-pulse shadow-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function GalleryGridSkeleton() {
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
