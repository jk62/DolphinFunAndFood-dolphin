import { Review } from "@/app/reviews/data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-current" : "text-gray-300"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="mb-4 flex items-center justify-between">
        <StarRating rating={review.rating} />
        <span className="text-xs text-slate-400">{review.date}</span>
      </div>

      <div className="flex-1">
        {review.videoSrc ? (
          <div className="mb-4 relative w-full aspect-[9/16] rounded-lg overflow-hidden bg-black group">
             {/* Branding Overlays */}
             <div className="absolute top-2 left-2 z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/dolphin-logo.jpg" 
                  alt="Logo" 
                  className="h-8 w-8 rounded-full border border-white/50 shadow-sm"
                />
             </div>
             <div className="absolute bottom-2 right-2 z-10 pointer-events-none">
                  <p className="font-bold text-white text-[10px] drop-shadow-md opacity-90">
                    Dolphin Fun & Food
                  </p>
             </div>

             {/* Using standard video tag for simple preview - can be upgraded to custom player */}
            <video
              src={review.videoSrc}
              className="absolute inset-0 h-full w-full object-cover"
              controls
              muted // Auto-mute for politeness
            />
          </div>
        ) : null}
        <p className="text-slate-700 italic text-sm md:text-base leading-relaxed">
          &quot;{review.text}&quot;
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold">
          {review.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.avatar}
              alt={review.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            review.name.charAt(0)
          )}
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">{review.name}</h4>
          {review.role && (
            <p className="text-xs text-slate-500">{review.role}</p>
          )}
        </div>
      </div>
    </div>
  );
}
