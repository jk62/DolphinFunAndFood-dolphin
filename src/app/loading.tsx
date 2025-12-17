// optimizing to use raw divs for speed.

export default function Loading() {
  return (
    <div className="min-h-screen bg-sky-50">
      {/* Hero Skeleton (matches HeroSwiper aspect ratio) */}
      <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-slate-200 animate-pulse relative">
        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
          <svg
            className="w-16 h-16 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Title Band Skeleton */}
      <div className="bg-black/45 h-32 w-full flex flex-col items-center justify-center gap-3">
        <div className="h-8 w-64 bg-white/20 rounded animate-pulse" />
        <div className="h-4 w-48 bg-white/10 rounded animate-pulse" />
      </div>

      {/* Content Skeleton */}
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
    </div>
  );
}
