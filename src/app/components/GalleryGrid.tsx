"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GALLERY2_IMAGES, GalleryItem } from "../constants";

const G2_STRIP_STARTS = [0, 10, 20, 30, 40];

function makeStrip(start: number, size: number) {
  const out: GalleryItem[] = [];
  for (let k = 0; k < size; k++) {
    const idx = (start + k) % GALLERY2_IMAGES.length;
    out.push(GALLERY2_IMAGES[idx]);
  }
  return out;
}

export default function GalleryGrid() {
  const [stripStep, setStripStep] = useState(0);

  useEffect(() => {
    if (!GALLERY2_IMAGES.length) return;
    const id = setInterval(
      () => setStripStep((p) => (p + 1) % G2_STRIP_STARTS.length),
      6000
    );
    return () => clearInterval(id);
  }, []);

  const gallery2Strip = makeStrip(G2_STRIP_STARTS[stripStep], 10);

  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {gallery2Strip.map((img, idx) => (
            <div
              key={img.src + idx}
              className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 shadow-sm"
            >
              <Image
                src={img.src}
                alt={img.alt ?? "Dolphin Fun & Food gallery"}
                fill
                sizes="(min-width: 1024px) 18vw, 45vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
