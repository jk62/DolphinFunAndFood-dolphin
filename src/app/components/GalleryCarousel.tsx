// app/components/GalleryCarousel.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = { src: string; alt?: string };

export default function GalleryCarousel({
  slides,
  interval = 4000,
  ratio = "aspect-[5/2]", // ~2.5:1 banner-ish
}: {
  slides: Slide[];
  interval?: number;
  ratio?: string; // Tailwind aspect class
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    timer.current = setInterval(
      () => setI((p) => (p + 1) % slides.length),
      interval
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, slides.length, interval]);

  if (!slides.length) return null;

  return (
    <div
      className={`relative overflow-hidden ${ratio}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((s, idx) => (
        <div
          key={s.src + idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt ?? "Dolphin Fun & Food"}
            fill
            sizes="100vw"
            priority={idx === i}
            className="object-cover"
          />
        </div>
      ))}

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            aria-label="Previous image"
            onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1"
          >
            ‹
          </button>
          <button
            aria-label="Next image"
            onClick={() => setI((p) => (p + 1) % slides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 w-5 rounded-full ${
                  idx === i ? "bg-white" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
