// src/app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FacebookPageEmbed from "./components/FacebookPageEmbed";
import GalleryCarousel from "./components/GalleryCarousel";

type GalleryItem = { src: string; alt?: string };
type ReelItem = { src: string; poster?: string };

const HERO = [
  { src: "/images/gallery/baloon-01.jpg", alt: "Balloon decor — entrance" },
  { src: "/images/gallery/baloon-02.jpg", alt: "Balloon arch — celebration" },
];

/** Reels slider (desktop: fixed 360 box; mobile: fluid full-width 9:16) */
function InlineHeroReels({
  videos,
  fixed = false,
  className = "",
}: {
  videos: { src: string; poster?: string }[];
  fixed?: boolean; // true for 360x360 box (desktop hero slot)
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
        (fixed ? "" : "w-full aspect-[9/16]") + // fluid vertical on mobile
        " " +
        className
      }
      style={fixed ? { width: 360, height: 360 } : undefined}
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

export default function Home() {
  const [i, setI] = useState(0);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [reels, setReels] = useState<ReelItem[]>([]);

  // Rotate hero background
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % HERO.length), 4000);
    return () => clearInterval(id);
  }, []);

  // Load images + reels
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetch("/api/media", { cache: "no-store" });
        const json = await res.json();
        if (!cancel) {
          setGallery(Array.isArray(json.gallery) ? json.gallery : []);
          setReels(Array.isArray(json.reels) ? json.reels : []);
          console.log("✅ /api/media", json);
        }
      } catch {}
    })();
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-sky-50 text-slate-900">
      {/* HERO (desktop keeps side panels; mobile shows only the background + title) */}
      <section className="relative h-[48vh] min-h-[480px] w-full overflow-hidden bg-slate-200">
        <Image
          key={HERO[i].src}
          src={HERO[i].src}
          alt={HERO[i].alt}
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/20 z-0" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 mx-auto max-w-5xl px-4 text-white text-center">
          <h1 className="text-3xl font-semibold drop-shadow">
            Dolphin Fun &amp; Food
          </h1>
          <p className="mt-1 text-slate-100/90 drop-shadow">
            Restaurant • Banquets • 8-acre Water Park
          </p>
        </div>

        {/* LEFT (desktop only): reels fixed box */}
        {reels.length > 0 && (
          <div className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-50">
            <InlineHeroReels videos={reels} fixed />
          </div>
        )}

        {/* RIGHT (desktop only): Facebook page fixed box */}
        <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <div className="rounded-2xl bg-white/80 backdrop-blur p-3 shadow-xl">
            <FacebookPageEmbed
              width={360}
              height={500}
              smallHeader={false}
              hideCover={false}
            />
          </div>
        </div>
      </section>

      {/* HEADER */}
      <header className="w-full border-b border-sky-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
          <Image
            src="/images/dolphin-logo.jpg"
            alt="Dolphin Fun & Food logo"
            width={56}
            height={56}
            className="rounded-md object-cover"
            priority
          />
          <div>
            <h2 className="text-xl font-bold tracking-wide">
              Dolphin <span className="text-sky-600">Fun &amp; Food</span>
            </h2>
            <p className="text-sm text-slate-600">
              Restaurant • Banquets • Water Park
            </p>
          </div>
          <div className="ml-auto text-sm text-sky-700 font-medium">
            Official site — launching soon
          </div>
        </div>
      </header>

      {/* WELCOME + GALLERY */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
          {gallery.length > 0 ? (
            <GalleryCarousel slides={gallery} ratio="aspect-[4/3]" />
          ) : (
            <Image
              src="/images/dolphin-banner.jpg"
              alt="Dolphin Fun & Food banner"
              width={2400}
              height={1200}
              className="w-full h-auto object-cover"
              priority
            />
          )}
          <div className="p-6 md:p-10">
            <h3 className="text-2xl md:text-3xl font-semibold mb-3">Welcome</h3>
            <p className="text-slate-700 leading-relaxed">
              A premium 8-acre destination on the highway — fine dining, grand
              banquets, and a thrilling water park.
            </p>
            <p className="mt-4 text-slate-600">
              This is a placeholder page. We’ll be adding booking, menus,
              gallery, and more step-by-step.
            </p>
            <div className="mt-6">
              <Link
                href="/banquet-enquiry"
                className="inline-block rounded-xl bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700"
              >
                Book a Banquet Enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE STACKED EMBEDS */}
      <section className="md:hidden mx-auto max-w-6xl px-4 space-y-6 mt-6">
        {reels.length > 0 && (
          <div className="rounded-2xl overflow-hidden shadow">
            {/* Fluid 9:16 reels on mobile */}
            <InlineHeroReels videos={reels} />
          </div>
        )}
        <div className="rounded-2xl overflow-hidden shadow">
          {/* Responsive FB embed (auto-width) */}
          <FacebookPageEmbed
            height={520}
            smallHeader={false}
            hideCover={false}
            responsive
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} Dolphin Fun &amp; Food
        </div>
      </footer>
    </main>
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// CODE BELOW IS DESKTOP LAPTOP FRIENDLY ONLY
// // src/app/page.tsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import FacebookPageEmbed from "./components/FacebookPageEmbed";
// import GalleryCarousel from "./components/GalleryCarousel";

// type GalleryItem = { src: string; alt?: string };
// type ReelItem = { src: string; poster?: string };

// const HERO = [
//   { src: "/images/gallery/baloon-01.jpg", alt: "Balloon decor — entrance" },
//   { src: "/images/gallery/baloon-02.jpg", alt: "Balloon arch — celebration" },
// ];

// /** Inline reels slider (avoids any import/path cache issues) */
// /** Inline reels slider with reliable autoplay */
// function InlineHeroReels({
//   videos,
// }: {
//   videos: { src: string; poster?: string }[];
// }) {
//   const [i, setI] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [needTap, setNeedTap] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const vref = useRef<HTMLVideoElement | null>(null);
//   const hostRef = useRef<HTMLDivElement | null>(null);

//   // Observe visibility: only try playing when in viewport
//   useEffect(() => {
//     const el = hostRef.current;
//     if (!el) return;
//     const io = new IntersectionObserver(
//       (entries) => setVisible(entries[0]?.isIntersecting ?? false),
//       { threshold: 0.25 }
//     );
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);

//   // Try to (auto)play whenever index/visibility changes
//   useEffect(() => {
//     const v = vref.current;
//     if (!v || !visible) return;

//     setNeedTap(false);
//     // important: set attributes BEFORE play
//     v.muted = true;
//     v.playsInline = true;

//     const tryPlay = () =>
//       v.play().catch(() => {
//         // autoplay blocked; ask for one tap
//         setNeedTap(true);
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
//   }, [i, visible]);

//   // Auto-advance every 7s (pause on hover)
//   useEffect(() => {
//     if (!videos.length || paused || !visible) return;
//     const id = setInterval(() => setI((p) => (p + 1) % videos.length), 7000);
//     return () => clearInterval(id);
//   }, [videos.length, paused, visible]);

//   if (!videos?.length) return null;

//   const next = () => setI((p) => (p + 1) % videos.length);
//   const prev = () => setI((p) => (p - 1 + videos.length) % videos.length);

//   return (
//     <div
//       ref={hostRef}
//       className="relative rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur"
//       style={{ width: 360, height: 360 }}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       onPointerDown={() => {
//         // one-time user gesture unlock
//         const v = vref.current;
//         if (!v) return;
//         v.muted = true;
//         v.playsInline = true;
//         v.play()
//           .then(() => setNeedTap(false))
//           .catch(() => {});
//       }}
//     >
//       <video
//         key={videos[i].src}
//         ref={vref}
//         src={videos[i].src}
//         poster={videos[i].poster}
//         muted
//         playsInline
//         autoPlay
//         loop={false}
//         preload="metadata"
//         className="block w-full h-full object-cover"
//         onEnded={next}
//         onError={() => next()}
//       />

//       {/* Tap overlay if autoplay blocked */}
//       {needTap && (
//         <div className="absolute inset-0 grid place-items-center bg-black/35 text-white">
//           <span className="rounded-full bg-white/90 text-black px-3 py-1 text-sm shadow">
//             ▶ Tap to start slideshow
//           </span>
//         </div>
//       )}

//       {videos.length > 1 && (
//         <>
//           <button
//             onClick={prev}
//             aria-label="Previous"
//             className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1"
//           >
//             ‹
//           </button>
//           <button
//             onClick={next}
//             aria-label="Next"
//             className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1"
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
//     </div>
//   );
// }

// export default function Home() {
//   const [i, setI] = useState(0);
//   const [gallery, setGallery] = useState<GalleryItem[]>([]);
//   const [reels, setReels] = useState<ReelItem[]>([]);

//   useEffect(() => {
//     const id = setInterval(() => setI((p) => (p + 1) % HERO.length), 4000);
//     return () => clearInterval(id);
//   }, []);

//   useEffect(() => {
//     let cancel = false;
//     (async () => {
//       try {
//         const res = await fetch("/api/media", { cache: "no-store" });
//         const json = await res.json();
//         if (!cancel) {
//           setGallery(Array.isArray(json.gallery) ? json.gallery : []);
//           setReels(Array.isArray(json.reels) ? json.reels : []);
//           console.log("✅ /api/media", json);
//         }
//       } catch {}
//     })();
//     return () => {
//       cancel = true;
//     };
//   }, []);

//   return (
//     <main className="min-h-screen bg-sky-50 text-slate-900">
//       {/* HERO */}
//       <section className="relative h-[48vh] min-h-[480px] w-full overflow-hidden bg-slate-200">
//         <Image
//           key={HERO[i].src}
//           src={HERO[i].src}
//           alt={HERO[i].alt}
//           fill
//           priority
//           sizes="100vw"
//           className="object-contain"
//         />
//         <div className="pointer-events-none absolute inset-0 bg-black/20 z-0" />
//         <div className="absolute left-1/2 -translate-x-1/2 bottom-6 mx-auto max-w-5xl px-4 text-white text-center">
//           <h1 className="text-3xl font-semibold drop-shadow">
//             Dolphin Fun &amp; Food
//           </h1>
//           <p className="mt-1 text-slate-100/90 drop-shadow">
//             Restaurant • Banquets • 8-acre Water Park
//           </p>
//         </div>

//         {/* LEFT: inline reels panel */}
//         {reels.length > 0 && (
//           <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50">
//             <InlineHeroReels videos={reels} />
//           </div>
//         )}

//         {/* RIGHT: FB page */}
//         <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10">
//           <div className="w-[360px] rounded-2xl bg-white/80 backdrop-blur p-3 shadow-xl">
//             {/* <FacebookPageEmbed height={360} />
//              */}
//             <FacebookPageEmbed
//               width={360}
//               height={500} // ↑ taller so cover + first post fit
//               smallHeader={false} // large header
//               hideCover={false} // show the cover photo
//             />
//           </div>
//         </div>
//       </section>

//       {/* Header */}
//       <header className="w-full border-b border-sky-200 bg-white/80 backdrop-blur">
//         <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
//           <Image
//             src="/images/dolphin-logo.jpg"
//             alt="Dolphin Fun & Food logo"
//             width={56}
//             height={56}
//             className="rounded-md object-cover"
//             priority
//           />
//           <div>
//             <h2 className="text-xl font-bold tracking-wide">
//               Dolphin <span className="text-sky-600">Fun &amp; Food</span>
//             </h2>
//             <p className="text-sm text-slate-600">
//               Restaurant • Banquets • Water Park
//             </p>
//           </div>
//           <div className="ml-auto text-sm text-sky-700 font-medium">
//             Official site — launching soon
//           </div>
//         </div>
//       </header>

//       {/* Welcome with gallery */}
//       <section className="mx-auto max-w-6xl px-4 py-8">
//         <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
//           {gallery.length > 0 ? (
//             <GalleryCarousel slides={gallery} ratio="aspect-[4/3]" />
//           ) : (
//             <Image
//               src="/images/dolphin-banner.jpg"
//               alt="Dolphin Fun & Food banner"
//               width={2400}
//               height={1200}
//               className="w-full h-auto object-cover"
//               priority
//             />
//           )}
//           <div className="p-6 md:p-10">
//             <h3 className="text-2xl md:text-3xl font-semibold mb-3">Welcome</h3>
//             <p className="text-slate-700 leading-relaxed">
//               A premium 8-acre destination on the highway — fine dining, grand
//               banquets, and a thrilling water park.
//             </p>
//             <p className="mt-4 text-slate-600">
//               This is a placeholder page. We’ll be adding booking, menus,
//               gallery, and more step-by-step.
//             </p>
//             <div className="mt-6">
//               <Link
//                 href="/banquet-enquiry"
//                 className="inline-block rounded-xl bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700"
//               >
//                 Book a Banquet Enquiry
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mobile embeds */}
//       <section className="md:hidden mx-auto max-w-6xl px-4 space-y-8">
//         {reels.length > 0 && (
//           <div className="flex justify-center">
//             <div className="w-full max-w-[500px]">
//               <InlineHeroReels videos={reels} />
//             </div>
//           </div>
//         )}
//         <div className="flex justify-center pb-6">
//           <div className="w-full max-w-[500px]">
//             <FacebookPageEmbed height={600} />
//           </div>
//         </div>
//       </section>

//       <footer className="mt-16 border-t border-sky-200">
//         <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
//           © {new Date().getFullYear()} Dolphin Fun &amp; Food
//         </div>
//       </footer>
//     </main>
//   );
// }
