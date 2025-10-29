// // src/app/components/ReelsSlider.tsx
// "use client";

// import { useEffect, useRef, useState } from "react";

// export type Reel = { src: string; poster?: string };

// export default function ReelsSlider({ videos }: { videos: Reel[] }) {
//   const [i, setI] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [needTap, setNeedTap] = useState(false);
//   const vref = useRef<HTMLVideoElement | null>(null);

//   // ----- Try to (auto)play current reel whenever index changes -----
//   useEffect(() => {
//     const v = vref.current;
//     if (!v) return;

//     setNeedTap(false);
//     v.muted = true;
//     v.playsInline = true;

//     const tryPlay = () =>
//       v.play().catch(() => {
//         // Retry once after a tiny delay; if still blocked, ask for tap
//         setTimeout(() => {
//           v.play().catch(() => setNeedTap(true));
//         }, 120);
//       });

//     if (v.readyState >= 2) tryPlay();
//     else {
//       const onCanPlay = () => {
//         v.removeEventListener("canplay", onCanPlay);
//         tryPlay();
//       };
//       v.addEventListener("canplay", onCanPlay);
//       return () => v.removeEventListener("canplay", onCanPlay);
//     }
//   }, [i]);

//   // ----- Auto-advance every 7s (unless paused/hovering or blocked) -----
//   useEffect(() => {
//     if (!videos.length || paused) return;
//     const id = setInterval(() => {
//       setI((p) => (p + 1) % videos.length);
//     }, 7000);
//     return () => clearInterval(id);
//   }, [videos.length, paused]);

//   if (!videos?.length) return null;

//   const goPrev = () => setI((p) => (p - 1 + videos.length) % videos.length);
//   const goNext = () => setI((p) => (p + 1) % videos.length);

//   return (
//     <div
//       className="relative rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur"
//       style={{ width: 360, height: 360 }}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       <video
//         key={videos[i].src}
//         ref={vref}
//         src={videos[i].src}
//         poster={videos[i].poster}
//         muted
//         playsInline
//         // don't loop: we want onEnded to advance
//         loop={false}
//         preload="metadata"
//         className="block w-full h-full object-cover"
//         onEnded={goNext}
//         onError={(e) => {
//           // Skip bad file so the slider doesn't get stuck
//           console.log("[ReelsSlider] video error:", videos[i].src, e);
//           goNext();
//         }}
//       />

//       {/* Tap overlay when autoplay is blocked */}
//       {needTap && (
//         <button
//           onClick={() => {
//             const v = vref.current;
//             if (!v) return;
//             v.play()
//               .then(() => setNeedTap(false))
//               .catch(() => {});
//           }}
//           className="absolute inset-0 flex items-center justify-center bg-black/30 text-white font-medium"
//         >
//           ▶ Tap to play
//         </button>
//       )}

//       {/* Prev / Next */}
//       {videos.length > 1 && (
//         <>
//           <button
//             aria-label="Previous reel"
//             onClick={goPrev}
//             className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1"
//           >
//             ‹
//           </button>
//           <button
//             aria-label="Next reel"
//             onClick={goNext}
//             className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1"
//           >
//             ›
//           </button>

//           {/* Dots */}
//           <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
//             {videos.map((_, idx) => (
//               <span
//                 key={idx}
//                 className={`h-1.5 w-4 rounded-full ${
//                   idx === i ? "bg-white" : "bg-white/50"
//                 }`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// src/app/components/ReelsSlider.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export type Reel = { src: string; poster?: string };

export default function ReelsSlider({ videos }: { videos: Reel[] }) {
  console.log("[ReelsSlider] mount, videos:", videos?.length, videos?.[0]);

  const [i, setI] = useState(0);
  const vref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;

    const play = () =>
      v.play().catch((e) => console.log("[ReelsSlider] play() failed", e));
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

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl"
      style={{
        width: 360,
        height: 360,
        background: "#111",
        border: "2px solid #0ea5e9",
      }}
    >
      <video
        key={videos[i].src}
        ref={vref}
        src={videos[i].src}
        poster={videos[i].poster}
        muted
        playsInline
        loop
        preload="metadata"
        controls // keep ON for now so you SEE the player
        autoPlay // nudge autoplay-friendly browsers
        className="block w-full h-full object-cover"
        onError={(e) =>
          console.log("[ReelsSlider] VIDEO ERROR", videos[i].src, e)
        }
        onCanPlay={() => console.log("[ReelsSlider] CANPLAY", videos[i].src)}
        onPlay={() => console.log("[ReelsSlider] PLAYING", videos[i].src)}
      />

      {videos.length > 1 && (
        <>
          <button
            onClick={() => setI((p) => (p - 1 + videos.length) % videos.length)}
            aria-label="Prev"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 text-white px-2 py-1"
          >
            ‹
          </button>
          <button
            onClick={() => setI((p) => (p + 1) % videos.length)}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 text-white px-2 py-1"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // src/app/components/ReelsSlider.tsx
// "use client";

// import { useEffect, useRef, useState } from "react";

// export type Reel = { src: string; poster?: string };

// export default function ReelsSlider({ videos }: { videos: Reel[] }) {
//   console.log(
//     "ReelsSlider mount -> videos length:",
//     videos?.length,
//     videos?.[0]
//   );

//   const [i, setI] = useState(0);
//   const vref = useRef<HTMLVideoElement | null>(null);

//   useEffect(() => {
//     const v = vref.current;
//     if (!v) return;
//     v.muted = true;
//     v.playsInline = true;

//     const play = () => v.play().catch((e) => console.log("play() failed", e));
//     if (v.readyState >= 2) play();
//     else {
//       const on = () => {
//         v.removeEventListener("canplay", on);
//         play();
//       };
//       v.addEventListener("canplay", on);
//       return () => v.removeEventListener("canplay", on);
//     }
//   }, [i]);

//   if (!videos?.length) return null;

//   return (
//     <div
//       className="relative rounded-2xl overflow-hidden shadow-xl"
//       style={{ width: 360, height: 360, background: "#111" }}
//     >
//       <video
//         key={videos[i].src}
//         ref={vref}
//         src={videos[i].src}
//         poster={videos[i].poster}
//         muted
//         playsInline
//         loop
//         preload="metadata"
//         controls // ← keep ON for debugging; remove later
//         className="block w-full h-full object-cover"
//         onError={(e) => console.log("SLIDER VIDEO ERROR", videos[i].src, e)}
//         onCanPlay={() => console.log("SLIDER CANPLAY", videos[i].src)}
//         onPlay={() => console.log("SLIDER PLAYING", videos[i].src)}
//       />

//       {videos.length > 1 && (
//         <>
//           <button
//             onClick={() => setI((p) => (p - 1 + videos.length) % videos.length)}
//             aria-label="Prev"
//             className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 text-white px-2 py-1"
//           >
//             ‹
//           </button>
//           <button
//             onClick={() => setI((p) => (p + 1) % videos.length)}
//             aria-label="Next"
//             className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 text-white px-2 py-1"
//           >
//             ›
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // src/app/components/ReelsSlider.tsx
// "use client";

// import { useEffect, useRef, useState } from "react";

// export type Reel = { src: string; poster?: string };

// export default function ReelsSlider({ videos }: { videos: Reel[] }) {
//   const [i, setI] = useState(0);
//   const vref = useRef<HTMLVideoElement | null>(null);

//   // try to play whenever slide changes
//   useEffect(() => {
//     const v = vref.current;
//     if (!v) return;
//     v.muted = true;
//     v.playsInline = true;

//     const tryPlay = () => v.play().catch(() => {});
//     if (v.readyState >= 2) tryPlay();
//     else {
//       const onCanPlay = () => {
//         v.removeEventListener("canplay", onCanPlay);
//         tryPlay();
//       };
//       v.addEventListener("canplay", onCanPlay);
//       return () => v.removeEventListener("canplay", onCanPlay);
//     }
//   }, [i]);

//   if (!videos?.length) return null;

//   return (
//     <div
//       className="relative rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur"
//       style={{ width: 360, height: 360 }}
//     >
//       <video
//         key={videos[i].src}
//         ref={vref}
//         src={videos[i].src}
//         poster={videos[i].poster}
//         muted
//         playsInline
//         loop
//         preload="metadata"
//         className="block w-full h-full object-cover"
//       />

//       {/* prev/next */}
//       {videos.length > 1 && (
//         <>
//           <button
//             aria-label="Prev"
//             onClick={() => setI((p) => (p - 1 + videos.length) % videos.length)}
//             className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1"
//           >
//             ‹
//           </button>
//           <button
//             aria-label="Next"
//             onClick={() => setI((p) => (p + 1) % videos.length)}
//             className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1"
//           >
//             ›
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// // app/components/ReelsSlider.tsx
// "use client";

// import { useEffect, useRef, useState } from "react";

// export type Reel = { src: string; poster?: string };

// export default function ReelsSlider({ videos }: { videos: Reel[] }) {
//   const [i, setI] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [needTap, setNeedTap] = useState(false);
//   const [err, setErr] = useState<string | null>(null);
//   const vidRef = useRef<HTMLVideoElement | null>(null);

//   // auto-advance every 7s
//   useEffect(() => {
//     if (paused || videos.length <= 1) return;
//     const id = setInterval(() => setI((p) => (p + 1) % videos.length), 7000);
//     return () => clearInterval(id);
//   }, [paused, videos.length]);

//   // (re)play on slide change
//   useEffect(() => {
//     const v = vidRef.current;
//     if (!v) return;
//     setErr(null);
//     setNeedTap(false);

//     // ensure muted & inline for autoplay policies
//     v.muted = true;
//     v.playsInline = true;

//     const tryPlay = () =>
//       v.play().catch(() => {
//         // retry once after a tiny delay
//         setTimeout(() => {
//           v.play().catch(() => {
//             // If it still fails, request user interaction
//             setNeedTap(true);
//           });
//         }, 120);
//       });

//     if (v.readyState >= 2) {
//       tryPlay();
//     } else {
//       const onCanPlay = () => {
//         v.removeEventListener("canplay", onCanPlay);
//         tryPlay();
//       };
//       v.addEventListener("canplay", onCanPlay);
//       return () => v.removeEventListener("canplay", onCanPlay);
//     }
//   }, [i, videos.length]);

//   const onManualPlay = () => {
//     const v = vidRef.current;
//     if (!v) return;
//     v.play()
//       .then(() => setNeedTap(false))
//       .catch(() => setErr("Playback failed"));
//   };

//   if (!videos.length) return null;
//   const current = videos[i];

//   return (
//     <div
//       className="relative overflow-hidden rounded-2xl shadow-xl bg-white/80 backdrop-blur"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       style={{ width: 360, height: 360 }}
//     >
//       <video
//         key={current.src}
//         ref={vidRef}
//         src={current.src}
//         poster={current.poster}
//         muted
//         playsInline
//         loop
//         preload="metadata"
//         className="block w-full h-full object-cover"
//         onError={() => {
//           setErr("Video failed");
//           // skip this one to avoid a stuck blank frame
//           setI((p) => (p + 1) % videos.length);
//         }}
//       />

//       {/* Manual play overlay when autoplay is blocked */}
//       {needTap && (
//         <button
//           onClick={onManualPlay}
//           className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-sm font-medium"
//         >
//           ▶ Tap to play
//         </button>
//       )}

//       {/* Arrows */}
//       {videos.length > 1 && (
//         <>
//           <button
//             aria-label="Previous reel"
//             onClick={() => setI((p) => (p - 1 + videos.length) % videos.length)}
//             className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-white text-sm"
//           >
//             ‹
//           </button>
//           <button
//             aria-label="Next reel"
//             onClick={() => setI((p) => (p + 1) % videos.length)}
//             className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-white text-sm"
//           >
//             ›
//           </button>

//           <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
//             {videos.map((_, idx) => (
//               <span
//                 key={idx}
//                 className={`h-1.5 w-4 rounded-full ${idx === i ? "bg-white" : "bg-white/50"}`}
//               />
//             ))}
//           </div>
//         </>
//       )}

//       {/* Error pill (debug, optional) */}
//       {err && (
//         <div className="absolute top-2 right-2 rounded bg-red-600 text-white text-xs px-2 py-0.5">
//           {err}
//         </div>
//       )}
//     </div>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // app/components/ReelsSlider.tsx
// "use client";

// import { useEffect, useRef, useState } from "react";

// export type Reel = { src: string; poster?: string };

// export default function ReelsSlider({ videos }: { videos: Reel[] }) {
//   const [i, setI] = useState(0);
//   const vidRef = useRef<HTMLVideoElement | null>(null);
//   const [paused, setPaused] = useState(false);

//   // auto-advance every 7s (pause on hover)
//   useEffect(() => {
//     if (paused || videos.length <= 1) return;
//     const id = setInterval(() => setI((p) => (p + 1) % videos.length), 7000);
//     return () => clearInterval(id);
//   }, [paused, videos.length]);

//   // ensure autoplay works on every slide
//   useEffect(() => {
//     const v = vidRef.current;
//     if (!v) return;
//     // some browsers require a small timeout before play()
//     const t = setTimeout(() => v.play().catch(() => void 0), 50);
//     return () => clearTimeout(t);
//   }, [i]);

//   if (!videos.length) return null;
//   const current = videos[i];

//   return (
//     <div
//       className="relative overflow-hidden rounded-2xl shadow-xl bg-white/80 backdrop-blur"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       <video
//         key={current.src}
//         ref={vidRef}
//         src={current.src}
//         poster={current.poster}
//         muted
//         playsInline
//         autoPlay
//         loop
//         preload="metadata"
//         className="block w-[360px] h-[360px] object-cover"
//       />

//       {/* Controls */}
//       {videos.length > 1 && (
//         <>
//           <button
//             aria-label="Previous reel"
//             onClick={() => setI((p) => (p - 1 + videos.length) % videos.length)}
//             className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-white text-sm"
//           >
//             ‹
//           </button>
//           <button
//             aria-label="Next reel"
//             onClick={() => setI((p) => (p + 1) % videos.length)}
//             className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-white text-sm"
//           >
//             ›
//           </button>

//           {/* Dots */}
//           <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
//             {videos.map((_, idx) => (
//               <span
//                 key={idx}
//                 className={`h-1.5 w-4 rounded-full ${idx === i ? "bg-white" : "bg-white/50"}`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
