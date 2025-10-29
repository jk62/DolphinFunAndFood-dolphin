// src/app/reels/page.tsx
import { loadReels } from "@/lib/loadReels";
import ReelsClient from "./ReelsClient";

// export const dynamic = "force-static"; // ok since we read from /public at build
// src/app/reels/page.tsx
export const dynamic = "force-dynamic"; // or remove the line entirely


export default async function ReelsPage() {
  const data = await loadReels();
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Reels</h1>
      <ReelsClient data={data} />
    </main>
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // src/app/reels/page.tsx
// "use client";

// import { useRef, useState } from "react";

// type ReelCat = "all" | "restaurant" | "banquets" | "water-park";
// type Reel = {
//   kind: "mp4";
//   src: string;
//   poster?: string;
//   title: string;
//   cat: Exclude<ReelCat, "all">;
// };

// const REELS: Reel[] = [
//   {
//     kind: "mp4",
//     src: "/videos/reels/kabab-khayo-na.mp4",
//     poster: "/images/gallery/dolphin_building.jpg",
//     title: "Kabab Khayo Na — Teaser",
//     cat: "restaurant",
//   },
//   {
//     kind: "mp4",
//     src: "/videos/reels/kabab-khayenge-kya.mp4",
//     poster: "/images/gallery/dolphin_building.jpg",
//     title: "Kabab Khayenge Kya — Teaser",
//     cat: "restaurant",
//   },
// ];

// const TABS = [
//   { key: "all", label: "All" as const },
//   { key: "restaurant", label: "Restaurant" as const },
//   { key: "banquets", label: "Banquets" as const },
//   { key: "water-park", label: "Water Park" as const },
// ];
// type TabKey = (typeof TABS)[number]["key"];

// export default function ReelsPage() {
//   const [tab, setTab] = useState<TabKey>("all");
//   const list = REELS.filter((r) => (tab === "all" ? true : r.cat === tab));

//   return (
//     <main className="mx-auto max-w-6xl px-4 py-10">
//       <h1 className="text-3xl font-semibold mb-6">Reels</h1>

//       {/* Tabs */}
//       <div className="flex gap-2 rounded-2xl bg-sky-50 p-1 w-full sm:w-auto">
//         {TABS.map((t) => (
//           <button
//             key={t.key}
//             onClick={() => setTab(t.key)}
//             className={
//               "px-4 py-2 rounded-xl text-sm font-medium " +
//               (tab === t.key
//                 ? "bg-white shadow text-sky-800"
//                 : "text-slate-700 hover:bg-white/70")
//             }
//             aria-pressed={tab === t.key}
//           >
//             {t.label}
//           </button>
//         ))}
//       </div>

//       {/* Grid: vertical 9:16 cards (shorts-style) */}
//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {list.map((r, i) => (
//           <div
//             key={i}
//             className="rounded-2xl overflow-hidden bg-black aspect-[9/16] relative"
//           >
//             <Mp4Card reel={r} />
//             <div className="absolute left-0 right-0 bottom-0 bg-black/60 text-white text-xs p-2 text-center">
//               {r.title}
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

// /** Shorts-style video card:
//  * - Autoplay muted on hover (desktop) for preview
//  * - On click/tap: unmute + show controls and keep playing with sound
//  */
// function Mp4Card({ reel }: { reel: Reel }) {
//   const ref = useRef<HTMLVideoElement>(null);
//   const [muted, setMuted] = useState(true);
//   const [controls, setControls] = useState(false);

//   return (
//     <div className="h-full w-full relative">
//       <video
//         ref={ref}
//         className="h-full w-full object-cover"
//         src={reel.src}
//         poster={reel.poster}
//         muted={muted} // required for hover autoplay
//         playsInline
//         loop
//         // Desktop hover preview
//         onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
//         onMouseLeave={(e) => e.currentTarget.pause()}
//         // Click/tap: unmute + show controls (sound allowed due to user gesture)
//         onClick={() => {
//           const v = ref.current;
//           if (!v) return;
//           if (muted) {
//             setMuted(false);
//             setControls(true);
//             v.muted = false;
//             v.play().catch(() => {});
//           } else {
//             // optional: toggle pause on second click
//             if (v.paused) v.play().catch(() => {});
//             else v.pause();
//           }
//         }}
//         controls={controls}
//         preload="metadata"
//         controlsList="nodownload noplaybackrate"
//       />

//       {/* Hint overlay while muted */}
//       {muted && (
//         <div className="pointer-events-none absolute inset-0 grid place-items-center">
//           <span className="rounded-full bg-white/90 px-3 py-1 text-sm shadow">
//             Tap for sound
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }
