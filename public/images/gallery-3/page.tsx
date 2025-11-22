// public/images/gallery-3/page.tsx
"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";

type Category = "all" | "restaurant" | "banquets" | "water-park";
type Pic = { src: string; alt: string; cat: Exclude<Category, "all"> };

const IMAGES: Pic[] = [
  {
    src: "/images/gallery/dolphin_building.jpg",
    alt: "Dolphin Fun & Food — facade",
    cat: "banquets",
  },
  {
    src: "/images/gallery/dolphin_veg_nonveg_delights.jpg",
    alt: "Veg & Non-Veg delights",
    cat: "restaurant",
  },
  {
    src: "/images/gallery/dolphin2.jpg",
    alt: "Dolphin at sunset",
    cat: "water-park",
  },
  {
    src: "/images/gallery/wave1.jpg",
    alt: "Underwater family fun",
    cat: "water-park",
  },
  // Add more and tag them!
];

const TABS: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "restaurant", label: "Restaurant" },
  { key: "banquets", label: "Banquets" },
  { key: "water-park", label: "Water Park" },
];

export default function GalleryPage() {
  const [tab, setTab] = useState<Category>("all");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Filter by tab
  const list = useMemo(
    () => (tab === "all" ? IMAGES : IMAGES.filter((p) => p.cat === tab)),
    [tab]
  );

  // When tab changes, close lightbox
  useEffect(() => setOpenIdx(null), [tab]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Gallery</h1>

      {/* Tabs */}
      <div className="flex gap-2 rounded-2xl bg-sky-50 p-1 w-full sm:w-auto">
        {TABS.map(({ key, label }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={
                "px-4 py-2 rounded-xl text-sm font-medium " +
                (active
                  ? "bg-white shadow text-sky-800"
                  : "text-slate-700 hover:bg-white/70")
              }
              aria-pressed={active}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setOpenIdx(i)}
            className="group relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3] focus:outline-none"
            aria-label={`Open image: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 rounded-2xl" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {openIdx !== null && (
        <dialog
          open
          className="backdrop:bg-black/60 p-0 rounded-2xl max-w-[92vw] max-h-[92vh]"
          onClose={() => setOpenIdx(null)}
        >
          <div className="relative">
            <Image
              src={list[openIdx].src}
              alt={list[openIdx].alt}
              fill
              sizes="92vw"
              className="object-contain bg-black rounded-2xl"
              priority
            />
            <button
              onClick={() => setOpenIdx(null)}
              className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium shadow hover:bg-white"
            >
              Close
            </button>
            <div className="absolute left-0 right-0 bottom-0 bg-black/60 text-white text-sm p-2 text-center rounded-b-2xl">
              {list[openIdx].alt}
            </div>
          </div>
        </dialog>
      )}
    </main>
  );
}
