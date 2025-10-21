// app/gallery/best-moments/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

const IMAGES = [
  { src: "/best-moments/family-01.jpg", alt: "Family having fun" },
  { src: "/best-moments/family-02.jpg", alt: "Family cheering" },
  { src: "/best-moments/thrill-01.jpg", alt: "Thrill face on ride" },
  { src: "/best-moments/splash-01.jpg", alt: "Big splash moment" },
  // add more…
];

export default function BestMomentsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Best Moments (Today)</h1>
      <p className="mt-2 text-slate-600">
        Curated highlights from the day. Tap any photo to view full-size and
        download.
      </p>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setOpenIdx(i)}
            className="group relative overflow-hidden rounded-lg border"
            aria-label={`Open ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={600}
              className="aspect-square w-full object-cover transition group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={i < 6}
            />
          </button>
        ))}
      </div>

      {/* Simple lightbox */}
      {openIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 p-4"
          onClick={() => setOpenIdx(null)}
        >
          <div
            className="relative mx-auto max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={IMAGES[openIdx].src}
              alt={IMAGES[openIdx].alt}
              width={1600}
              height={1600}
              className="w-full rounded-lg object-contain"
            />

            <div className="mt-3 flex items-center justify-between text-white">
              <button
                className="rounded border border-white/40 px-3 py-2"
                onClick={() =>
                  setOpenIdx((i) =>
                    i! > 0 ? (i as number) - 1 : IMAGES.length - 1
                  )
                }
              >
                ‹ Prev
              </button>

              {/* Download = right-click optional */}
              <a
                href={IMAGES[openIdx].src}
                download
                className="rounded bg-white px-4 py-2 font-medium text-black"
              >
                Download
              </a>

              <button
                className="rounded border border-white/40 px-3 py-2"
                onClick={() => setOpenIdx((i) => (i! + 1) % IMAGES.length)}
              >
                Next ›
              </button>
            </div>

            <button
              onClick={() => setOpenIdx(null)}
              className="absolute right-0 top-0 -translate-y-1/2 rounded bg-white px-3 py-1 text-black"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
