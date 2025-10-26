// src/app/reels/ReelsClient.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import type { Reel } from "@/lib/loadReels";

const TABS = [
  { key: "all", label: "All" as const },
  { key: "restaurant", label: "Restaurant" as const },
  { key: "banquets", label: "Banquets" as const },
  { key: "kids-zone", label: "Kids Zone" as const },
  { key: "water-park", label: "Water Park" as const },
];
type TabKey = (typeof TABS)[number]["key"];

export default function ReelsClient({ data }: { data: Reel[] }) {
  const [tab, setTab] = useState<TabKey>("all");
  const list = useMemo(
    () => data.filter((r) => (tab === "all" ? true : r.cat === tab)),
    [data, tab]
  );

  return (
    <>
      {/* Tabs */}
      <div className="flex gap-2 rounded-2xl bg-sky-50 p-1 w-full sm:w-auto">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={
              "px-4 py-2 rounded-xl text-sm font-medium " +
              (tab === t.key
                ? "bg-white shadow text-sky-800"
                : "text-slate-700 hover:bg-white/70")
            }
            aria-pressed={tab === t.key}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid: vertical cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((r, i) => (
          <div
            key={`${r.src}-${i}`}
            className="rounded-2xl overflow-hidden bg-black aspect-[9/16] relative"
          >
            <Mp4Card reel={r} />
            <div className="absolute left-0 right-0 bottom-0 bg-black/60 text-white text-xs p-2 text-center">
              {r.title}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Mp4Card({ reel }: { reel: Reel }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [controls, setControls] = useState(false);

  return (
    <div className="h-full w-full relative">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={reel.src}
        poster={reel.poster}
        muted={muted}
        playsInline
        loop
        preload="metadata"
        controls={controls}
        controlsList="nodownload noplaybackrate"
        onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
        onMouseLeave={(e) => e.currentTarget.pause()}
        onClick={() => {
          const v = ref.current;
          if (!v) return;
          if (muted) {
            setMuted(false);
            setControls(true);
            v.muted = false;
            v.play().catch(() => {});
          } else {
            if (v.paused) v.play().catch(() => {});
            else v.pause();
          }
        }}
      />
      {muted && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="rounded-full bg-white/90 px-3 py-1 text-sm shadow">
            Tap for sound
          </span>
        </div>
      )}
    </div>
  );
}
