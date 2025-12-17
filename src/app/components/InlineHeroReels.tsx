"use client";

import { useEffect, useRef, useState } from "react";

export default function InlineHeroReels({
  videos,
  fixed = false,
  className = "",
}: {
  videos: { src: string; poster?: string }[];
  fixed?: boolean;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [needTap, setNeedTap] = useState(false);
  const [visible, setVisible] = useState(false);
  const vref = useRef<HTMLVideoElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);

  // Only autoplay when visible
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setVisible(entries[0]?.isIntersecting ?? false),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Attempt autoplay on index/visibility change
  useEffect(() => {
    const v = vref.current;
    if (!v || !visible) return;
    setNeedTap(false);
    v.muted = true;
    v.playsInline = true;
    const tryPlay = () => v.play().catch(() => setNeedTap(true));
    if (v.readyState >= 2) tryPlay();
    else {
      const on = () => {
        v.removeEventListener("canplay", on);
        tryPlay();
      };
      v.addEventListener("canplay", on);
      return () => v.removeEventListener("canplay", on);
    }
  }, [i, visible]);

  // Auto advance every 7s (pause on hover)
  useEffect(() => {
    if (!videos.length || paused || !visible) return;
    const id = setInterval(() => setI((p) => (p + 1) % videos.length), 7000);
    return () => clearInterval(id);
  }, [videos.length, paused, visible]);

  if (!videos?.length) return null;

  const next = () => setI((p) => (p + 1) % videos.length);
  const prev = () => setI((p) => (p - 1 + videos.length) % videos.length);

  return (
    <div
      ref={hostRef}
      className={
        "relative rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur " +
        (fixed ? "" : "w-full aspect-[9/16]") +
        " " +
        className
      }
      style={fixed ? { width: 360, height: 500 } : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={() => {
        const v = vref.current;
        if (!v) return;
        v.muted = true;
        v.playsInline = true;
        v.play()
          .then(() => setNeedTap(false))
          .catch(() => {});
      }}
    >
      <video
        key={videos[i].src}
        ref={vref}
        src={videos[i].src}
        poster={videos[i].poster}
        muted
        playsInline
        autoPlay
        loop={false}
        preload="metadata"
        className="block w-full h-full object-cover"
        onEnded={next}
        onError={next}
      />

      {needTap && (
        <div className="absolute inset-0 grid place-items-center bg-black/35 text-white">
          <span className="rounded-full bg-white/90 text-black px-3 py-1 text-sm shadow">
            ▶ Tap to start slideshow
          </span>
        </div>
      )}

      {videos.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
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
                className={`h-1.5 w-4 rounded-full ${
                  idx === i ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
