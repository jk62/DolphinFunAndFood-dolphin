export default function Loading() {
  return (
    <div className="min-h-screen bg-sky-50 pt-24 pb-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title Skeleton */}
        <div className="mb-8 flex flex-col items-center">
          <div className="h-10 w-64 rounded-lg bg-slate-200 animate-pulse mb-4" />
          <div className="h-4 w-96 rounded-lg bg-slate-200 animate-pulse" />
        </div>

        {/* Carousel Skeleton */}
        <div className="mb-12 flex justify-center gap-4 overflow-hidden opacity-50">
           <div className="hidden md:block h-96 w-64 rounded-2xl bg-slate-300 animate-pulse scale-90" />
           <div className="h-96 w-64 rounded-2xl bg-slate-300 animate-pulse shadow-xl" />
           <div className="hidden md:block h-96 w-64 rounded-2xl bg-slate-300 animate-pulse scale-90" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col"
            >
              <div className="flex justify-between mb-4">
                  <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-slate-100 rounded animate-pulse" />
              </div>
              <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
                  <div className="h-4 w-4/6 bg-slate-100 rounded animate-pulse" />
              </div>
              <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse" />
                  <div className="flex-1 space-y-1">
                      <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
                      <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
