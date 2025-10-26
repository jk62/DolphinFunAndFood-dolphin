"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useCallback } from "react";
import type { Pic } from "@/lib/loadGallery";

type Category = "all" | "restaurant" | "banquets" | "kids-zone" | "water-park";

const TABS: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "restaurant", label: "Restaurant" },
  { key: "banquets", label: "Banquets" },
  { key: "kids-zone", label: "Kids Zone" },
  { key: "water-park", label: "Water Park" },
];

export default function GalleryClient({ images }: { images: Pic[] }) {
  const [tab, setTab] = useState<Category>("all");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const list = useMemo(
    () => (tab === "all" ? images : images.filter((p) => p.cat === tab)),
    [tab, images]
  );

  useEffect(() => setOpenIdx(null), [tab]);

  const goPrev = useCallback(() => {
    if (openIdx === null || list.length === 0) return;
    setOpenIdx((openIdx + list.length - 1) % list.length);
  }, [openIdx, list.length]);

  const goNext = useCallback(() => {
    if (openIdx === null || list.length === 0) return;
    setOpenIdx((openIdx + 1) % list.length);
  }, [openIdx, list.length]);

  useEffect(() => {
    if (openIdx === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIdx(null);
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx, goPrev, goNext]);

  return (
    <>
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
            <button
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-lg shadow hover:bg-white"
            >
              ←
            </button>
            <button
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-lg shadow hover:bg-white"
            >
              →
            </button>
            <div className="absolute left-0 right-0 bottom-0 bg-black/60 text-white text-sm p-2 text-center rounded-b-2xl">
              {list[openIdx].alt}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
