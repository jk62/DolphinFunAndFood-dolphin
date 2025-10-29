// src/app/components/HeroReels.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export type HeroReel = { src: string; poster?: string };

export default function HeroReels({ videos }: { videos: HeroReel[] }) {
  console.log("[HeroReels] mount, videos:", videos?.length, videos?.[0]); // prove it mounts

  const [i, setI] = useState(0);
  const vref = useRef<HTMLVideoElement | null>(null);

  // try to autoplay when index changes
  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    const play = () =>
      v.play().catch((e) => console.log("[HeroReels] play() failed:", e));
    if (v.readyState >= 2) play();
    else {
      const on = () => {
        v.removeEventListener("canplay", on);
        play();
      };
      v.addEventListener("canplay", on);
      return () => v.removeEventListener("canplay", on);
    }
  }, [i]);

  if (!videos?.length) return null;

  const next = () => setI((p) => (p + 1) % videos.length);
  const prev = () => setI((p) => (p - 1 + videos.length) % videos.length);

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur"
      style={{ width: 360, height: 360 }}
    >
      <video
        key={videos[i].src}
        ref={vref}
        src={videos[i].src}
        poster={videos[i].poster}
        muted
        playsInline
        loop={false}
        preload="metadata"
        className="block w-full h-full object-cover"
        onEnded={next}
        onError={(e) => {
          console.log("[HeroReels] video error:", videos[i].src, e);
          next();
        }}
      />

      {videos.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Prev"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1"
          >
            ›
          </button>

          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {videos.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 w-4 rounded-full ${idx === i ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
