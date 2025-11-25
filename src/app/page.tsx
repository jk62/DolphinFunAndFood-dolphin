// src/app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FacebookPageEmbed from "./components/FacebookPageEmbed";
import GalleryCarousel from "./components/GalleryCarousel";
import FacebookPageEmbedShell from "./components/FacebookPageEmbedShell";

type GalleryItem = { src: string; alt?: string };
type ReelItem = { src: string; poster?: string };

//----------------------------------------
// MAIN FEATURED SLIDES (band with caption + image)
const FEATURED_SLIDES = [
  {
    src: "/images/gallery/pic-01.jpg",
    alt: "Colourful salad bowl",
    tagline: "Fresh, fun, and full of fuel.",
  },
  {
    src: "/images/gallery/pic-02.jpg",
    alt: "Veg North Indian Thali",
    tagline: "A perfectly curated plate of timeless North Indian flavours.",
  },
  {
    src: "/images/gallery/pic-03.jpg",
    alt: "Jumpy dolphin at sunrise",
    tagline: "Energy. Freedom. Fun — the Dolphin way.",
  },
  {
    src: "/images/gallery/pic-04.jpg",
    alt: "Mother & Child Underwater",
    tagline: "Where every splash becomes a memory.",
  },
  {
    src: "/images/gallery/pic-05.jpg",
    alt: "Kids & Family on Car Striking Ride",
    tagline: "Bump into happiness — one ride at a time!",
  },
  {
    src: "/images/gallery/pic-06.png",
    alt: "Opening Shortly Balloon 1",
    tagline: "Murthal’s New Destination for Food, Fun & Family!",
  },
  {
    src: "/images/gallery/pic-07.png",
    alt: "Opening Shortly Balloon 2",
    tagline: "Highway’s Happiest Stop — Opening Shortly!",
  },
  {
    src: "/images/gallery/pic-08.png",
    alt: "Yellow & White Balloon in the Sky ",
    tagline: "Highway’s Happiest Stop — Open Now!",
  },
  {
    src: "/images/gallery/pic-09.png",
    alt: "Dolphin at your service ",
    tagline: "When Hunger Strikes… Dive to Dolphin!",
  },
  {
    src: "/images/gallery/pic-10.png",
    alt: "Dolphin in the service of Buddha",
    tagline: "When a Dolphin Serves, Even Buddha Smiles.",
  },
  {
    src: "/images/gallery/pic-11.png",
    alt: "Ganpati Bappa’s Blessings…",
    tagline: "Bappa’s Blessings, Dolphin’s Devotion — A Heavenly Moment.",
  },
  {
    src: "/images/gallery/pic-12.png",
    alt: "Palm Breeze, Blue Seas, Big Smiles.",
    tagline: "From Ocean Vibes to High-Energy Rides!",
  },
];

//----------------------------------------
// SECOND GALLERY (tile slideshow from /images/gallery-2)

const GALLERY2_FILES = [
  "pic-01.jpg",
  "pic-02.jpg",
  "pic-03.jpg",
  "pic-04.jpg",
  "pic-05.jpg",
  "pic-06.jpg",
  "pic-07.jpg",
  "pic-08.jpg",
  "pic-09.jpg",
  "pic-10.jpg",
  "pic-11.jpg",
  "pic-12.jpg",
  "pic-13.jpg",
  "pic-14.jpg",
  "pic-15.jpg",
  "pic-16.jpg",
  "pic-17.png",
  "pic-18.jpg",
  "pic-19.png",
  "pic-20.png",
  "pic-21.png",
  "pic-22.png",
  "pic-23.png",
  "pic-24.png",
  "pic-25.png",
  "pic-26.png",
  "pic-27.jpg",
  "pic-28.png",
  "pic-29.jpg",
  "pic-30.png",
  "pic-31.png",
  "pic-32.jpg",
  "pic-33.png",
  "pic-34.jpg",
  "pic-35.jpg",
  "pic-36.png",
  "pic-37.png",
  "pic-38.jpg",
  "pic-39.png",
  "pic-40.png",
  "pic-41.jpg",
  "pic-42.jpg",
  "pic-43.jpg",
  "pic-44.jpg",
  "pic-45.jpg",
  "pic-46.jpg",
  "pic-47.jpg",
  "pic-48.jpg",
  "pic-49.jpg",
  "pic-50.jpg",
];

const GALLERY2_IMAGES: GalleryItem[] = GALLERY2_FILES.map((file) => ({
  src: `/images/gallery-2/${file}`,
  alt: `Dolphin Fun & Food gallery image ${file}`,
}));

//----------------------------------------
// THIRD GALLERY (full-bleed single-image slideshow from /images/gallery-3)
const GALLERY3_FILES = [
  "pic-01.jpg",
  "pic-02.jpg",
  "pic-03.jpg",
  "pic-04.jpg",
  "pic-05.jpg",
  "pic-06.jpg",
  "pic-07.jpg",
  "pic-08.jpg",
  "pic-09.jpg",
  "pic-10.jpg",
  "pic-11.jpg",
  "pic-12.jpg",
  "pic-13.jpg",
  "pic-14.jpg",
  "pic-15.jpg",
  "pic-16.jpg",
  "pic-17.png",
  "pic-18.jpg",
  "pic-19.png",
  "pic-20.png",
  "pic-21.png",
  "pic-22.png",
  "pic-23.png",
  "pic-24.png",
  "pic-25.png",
  "pic-26.png",
  "pic-27.jpg",
  "pic-28.png",
  "pic-29.jpg",
  "pic-30.png",
  "pic-31.png",
  "pic-32.jpg",
  "pic-33.png",
  "pic-34.jpg",
  "pic-35.jpg",
  "pic-36.png",
  "pic-37.png",
  "pic-38.jpg",
  "pic-39.png",
  "pic-40.png",
  "pic-41.jpg",
  "pic-42.jpg",
  "pic-43.jpg",
  "pic-44.jpg",
  "pic-45.jpg",
  "pic-46.jpg",
  "pic-47.jpg",
  "pic-48.jpg",
  "pic-49.jpg",
  "pic-50.jpg",
];

const GALLERY3_IMAGES: GalleryItem[] = GALLERY3_FILES.map((file) => ({
  src: `/images/gallery-3/${file}`,
  alt: `Dolphin Fun & Food interior ${file}`,
}));

//----------------------------------------
// Tile strips (gallery-2)
// Strip 1 → 01–10
// Strip 2 → 11–20
// Strip 3 → 21–30
// Strip 4 → 31–40
// Strip 5 → 41–50
const G2_STRIP_STARTS = [0, 10, 20, 30, 40];

function makeStrip(start: number, size: number) {
  const out: GalleryItem[] = [];
  for (let k = 0; k < size; k++) {
    const idx = (start + k) % GALLERY2_IMAGES.length;
    out.push(GALLERY2_IMAGES[idx]);
  }
  return out;
}

//----------------------------------------
/** Reels slider */
function InlineHeroReels({
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

//----------------------------------------

export default function Home() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [reels1, setReels1] = useState<ReelItem[]>([]);
  const [reels2, setReels2] = useState<ReelItem[]>([]);
  const [reels3, setReels3] = useState<ReelItem[]>([]);
  const [reels4, setReels4] = useState<ReelItem[]>([]); // NEW

  // gallery-2 tile slideshow state
  const [stripStep, setStripStep] = useState(0);

  // gallery-3 full-bleed slideshow state
  const [g3Index, setG3Index] = useState(0);

  // Load images + reels from /api/media
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetch("/api/media", { cache: "no-store" });
        const json = await res.json();
        if (!cancel) {
          setGallery(Array.isArray(json.gallery) ? json.gallery : []);
          setReels1(Array.isArray(json.reels1) ? json.reels1 : []);
          setReels2(Array.isArray(json.reels2) ? json.reels2 : []);
          setReels3(Array.isArray(json.reels3) ? json.reels3 : []);
          setReels4(Array.isArray(json.reels4) ? json.reels4 : []); // NEW
          console.log("✅ /api/media", json);
        }
      } catch {
        // optional: log error
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  // auto-advance gallery-2 tile strips
  useEffect(() => {
    if (!GALLERY2_IMAGES.length) return;
    const id = setInterval(
      () => setStripStep((p) => (p + 1) % G2_STRIP_STARTS.length),
      6000
    );
    return () => clearInterval(id);
  }, []);

  const gallery2Strip = makeStrip(G2_STRIP_STARTS[stripStep], 10);

  // auto-advance gallery-3 full-bleed slideshow
  useEffect(() => {
    if (!GALLERY3_IMAGES.length) return;
    const id = setInterval(
      () => setG3Index((p) => (p + 1) % GALLERY3_IMAGES.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  const g3Current = GALLERY3_IMAGES[g3Index];

  // MOBILE: combine all reels into one playlist
  const mobileReels: ReelItem[] = [...reels1, ...reels2, ...reels3, ...reels4];

  return (
    <main className="min-h-screen bg-sky-50 text-slate-900">
      {/* HERO: title + 4 reels in one row, with venue wallpaper */}
      <section className="relative text-white overflow-hidden">
        {/* 🔵 Background venue image */}
        <Image
          src="/images/gallery/dolphin-venue.jpg"
          alt="Dolphin Fun & Food venue"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover brightness-75 contrast-105 saturate-105"
        />

        {/* Slight dark overlay so text & reels stay readable */}
        <div className="absolute inset-0 z-0 bg-black/10" />

        {/* existing content, pulled above background */}
        <div className="mx-auto max-w-7xl px-4 py-10 relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              Dolphin Fun &amp; Food
            </h1>
            <p className="text-slate-200">
              Restaurant • Banquets • 8-acre Water Park
            </p>
          </div>

          {/* centered row, equal gaps */}
          {/* <div className="mt-6 flex justify-center gap-10 flex-wrap">
            <InlineHeroReels
              videos={reels1}
              fixed
              className="w-[360px] h-[640px]"
            />
            <InlineHeroReels
              videos={reels2}
              fixed
              className="w-[360px] h-[640px]"
            />
            <InlineHeroReels
              videos={reels3}
              fixed
              className="w-[360px] h-[640px]"
            />
            <InlineHeroReels
              videos={reels4}
              fixed
              className="w-[360px] h-[640px]"
            />
          </div> */}

          {/* centered row, 4 columns on desktop */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <InlineHeroReels videos={reels1} />
            <InlineHeroReels videos={reels2} />
            <InlineHeroReels videos={reels3} />
            <InlineHeroReels videos={reels4} />
          </div>
        </div>
      </section>

      {/* HEADER BAR */}
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

      {/* FEATURED BAND + G3 FULL-BLEED + TILE GALLERY + FB + WELCOME */}
      <section className="w-full bg-sky-50">
        {/* 1️⃣ Full-bleed caption+image slideshow (edge-to-edge) */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <GalleryCarousel slides={FEATURED_SLIDES} ratio="aspect-[16/9]" />
        </div>

        {/* 2️⃣ NEW: full-bleed single-image slideshow from gallery-3 */}
        {GALLERY3_IMAGES.length > 0 && (
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-black">
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <Image
                key={g3Current.src}
                src={g3Current.src}
                alt={g3Current.alt ?? "Dolphin Fun & Food gallery"}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* 3️⃣ gallery-2 tile slideshow, 2 rows of 5, edge-to-edge */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-1 md:gap-2">
            {gallery2Strip.map((img, idx) => (
              <div
                key={img.src + idx}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt ?? "Dolphin Fun & Food gallery"}
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4️⃣ DESKTOP FACEBOOK PAGE EMBED (moved from hero) */}
        <div className="hidden md:block mx-auto max-w-6xl px-4 pt-4">
          <FacebookPageEmbedShell />
        </div>

        {/* 5️⃣ WELCOME card */}
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-8">
          <div className="rounded-3xl shadow-lg bg-white p-6 md:p-10">
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
        {mobileReels.length > 0 && (
          <div className="rounded-2xl overflow-hidden shadow">
            {/* Fluid 9:16 reels on mobile */}
            <InlineHeroReels videos={mobileReels} />
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

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// Code below with facebook in hero panel
// // src/app/page.tsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import FacebookPageEmbed from "./components/FacebookPageEmbed";
// import GalleryCarousel from "./components/GalleryCarousel";
// import FacebookPageEmbedShell from "./components/FacebookPageEmbedShell";

// type GalleryItem = { src: string; alt?: string };
// type ReelItem = { src: string; poster?: string };

// //----------------------------------------
// // MAIN FEATURED SLIDES (band with caption + image)
// const FEATURED_SLIDES = [
//   {
//     src: "/images/gallery/pic-01.jpg",
//     alt: "Colourful salad bowl",
//     tagline: "Fresh, fun, and full of fuel.",
//   },
//   {
//     src: "/images/gallery/pic-02.jpg",
//     alt: "Veg North Indian Thali",
//     tagline: "A perfectly curated plate of timeless North Indian flavours.",
//   },
//   {
//     src: "/images/gallery/pic-03.jpg",
//     alt: "Jumpy dolphin at sunrise",
//     tagline: "Energy. Freedom. Fun — the Dolphin way.",
//   },
//   {
//     src: "/images/gallery/pic-04.jpg",
//     alt: "Mother & Child Underwater",
//     tagline: "Where every splash becomes a memory.",
//   },
//   {
//     src: "/images/gallery/pic-05.jpg",
//     alt: "Kids & Family on Car Striking Ride",
//     tagline: "Bump into happiness — one ride at a time!",
//   },
//   {
//     src: "/images/gallery/pic-06.png",
//     alt: "Opening Shortly Balloon 1",
//     tagline: "Murthal’s New Destination for Food, Fun & Family!",
//   },
//   {
//     src: "/images/gallery/pic-07.png",
//     alt: "Opening Shortly Balloon 2",
//     tagline: "Highway’s Happiest Stop — Opening Shortly!",
//   },
//   {
//     src: "/images/gallery/pic-08.png",
//     alt: "Yellow & White Balloon in the Sky ",
//     tagline: "Highway’s Happiest Stop — Open Now!",
//   },
//   {
//     src: "/images/gallery/pic-09.png",
//     alt: "Dolphin at your service ",
//     tagline: "When Hunger Strikes… Dive to Dolphin!",
//   },
//   {
//     src: "/images/gallery/pic-10.png",
//     alt: "Dolphin in the service of Buddha",
//     tagline: "When a Dolphin Serves, Even Buddha Smiles.",
//   },
//   {
//     src: "/images/gallery/pic-11.png",
//     alt: "Ganpati Bappa’s Blessings…",
//     tagline: "Bappa’s Blessings, Dolphin’s Devotion — A Heavenly Moment.",
//   },
//   {
//     src: "/images/gallery/pic-12.png",
//     alt: "Palm Breeze, Blue Seas, Big Smiles.",
//     tagline: "From Ocean Vibes to High-Energy Rides!",
//   },
// ];

// //----------------------------------------
// // SECOND GALLERY (tile slideshow from /images/gallery-2)

// const GALLERY2_FILES = [
//   "pic-01.jpg",
//   "pic-02.jpg",
//   "pic-03.jpg",
//   "pic-04.jpg",
//   "pic-05.jpg",
//   "pic-06.jpg",
//   "pic-07.jpg",
//   "pic-08.jpg",
//   "pic-09.jpg",
//   "pic-10.jpg",
//   "pic-11.jpg",
//   "pic-12.jpg",
//   "pic-13.jpg",
//   "pic-14.jpg",
//   "pic-15.jpg",
//   "pic-16.jpg",
//   "pic-17.png",
//   "pic-18.jpg",
//   "pic-19.png",
//   "pic-20.png",
//   "pic-21.png",
//   "pic-22.png",
//   "pic-23.png",
//   "pic-24.png",
//   "pic-25.png",
//   "pic-26.png",
//   "pic-27.jpg",
//   "pic-28.png",
//   "pic-29.jpg",
//   "pic-30.png",
//   "pic-31.png",
//   "pic-32.jpg",
//   "pic-33.png",
//   "pic-34.jpg",
//   "pic-35.jpg",
//   "pic-36.png",
//   "pic-37.png",
//   "pic-38.jpg",
//   "pic-39.png",
//   "pic-40.png",
//   "pic-41.jpg",
//   "pic-42.jpg",
//   "pic-43.jpg",
//   "pic-44.jpg",
//   "pic-45.jpg",
//   "pic-46.jpg",
//   "pic-47.jpg",
//   "pic-48.jpg",
//   "pic-49.jpg",
//   "pic-50.jpg",
// ];

// const GALLERY2_IMAGES: GalleryItem[] = GALLERY2_FILES.map((file) => ({
//   src: `/images/gallery-2/${file}`,
//   alt: `Dolphin Fun & Food gallery image ${file}`,
// }));

// //----------------------------------------
// // THIRD GALLERY (full-bleed single-image slideshow from /images/gallery-3)
// const GALLERY3_FILES = [
//   "pic-01.jpg",
//   "pic-02.jpg",
//   "pic-03.jpg",
//   "pic-04.jpg",
//   "pic-05.jpg",
//   "pic-06.jpg",
//   "pic-07.jpg",
//   "pic-08.jpg",
//   "pic-09.jpg",
//   "pic-10.jpg",
//   "pic-11.jpg",
//   "pic-12.jpg",
//   "pic-13.jpg",
//   "pic-14.jpg",
//   "pic-15.jpg",
//   "pic-16.jpg",
//   "pic-17.png",
//   "pic-18.jpg",
//   "pic-19.png",
//   "pic-20.png",
//   "pic-21.png",
//   "pic-22.png",
//   "pic-23.png",
//   "pic-24.png",
//   "pic-25.png",
//   "pic-26.png",
//   "pic-27.jpg",
//   "pic-28.png",
//   "pic-29.jpg",
//   "pic-30.png",
//   "pic-31.png",
//   "pic-32.jpg",
//   "pic-33.png",
//   "pic-34.jpg",
//   "pic-35.jpg",
//   "pic-36.png",
//   "pic-37.png",
//   "pic-38.jpg",
//   "pic-39.png",
//   "pic-40.png",
//   "pic-41.jpg",
//   "pic-42.jpg",
//   "pic-43.jpg",
//   "pic-44.jpg",
//   "pic-45.jpg",
//   "pic-46.jpg",
//   "pic-47.jpg",
//   "pic-48.jpg",
//   "pic-49.jpg",
//   "pic-50.jpg",
// ];

// const GALLERY3_IMAGES: GalleryItem[] = GALLERY3_FILES.map((file) => ({
//   src: `/images/gallery-3/${file}`,
//   alt: `Dolphin Fun & Food interior ${file}`,
// }));

// //----------------------------------------
// // Tile strips (gallery-2)
// // Strip 1 → 01–10
// // Strip 2 → 11–20
// // Strip 3 → 21–30
// // Strip 4 → 31–40
// // Strip 5 → 41–50
// const G2_STRIP_STARTS = [0, 10, 20, 30, 40];

// function makeStrip(start: number, size: number) {
//   const out: GalleryItem[] = [];
//   for (let k = 0; k < size; k++) {
//     const idx = (start + k) % GALLERY2_IMAGES.length;
//     out.push(GALLERY2_IMAGES[idx]);
//   }
//   return out;
// }

// //----------------------------------------
// /** Reels slider */
// function InlineHeroReels({
//   videos,
//   fixed = false,
//   className = "",
// }: {
//   videos: { src: string; poster?: string }[];
//   fixed?: boolean;
//   className?: string;
// }) {
//   const [i, setI] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [needTap, setNeedTap] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const vref = useRef<HTMLVideoElement | null>(null);
//   const hostRef = useRef<HTMLDivElement | null>(null);

//   // Only autoplay when visible
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

//   // Attempt autoplay on index/visibility change
//   useEffect(() => {
//     const v = vref.current;
//     if (!v || !visible) return;
//     setNeedTap(false);
//     v.muted = true;
//     v.playsInline = true;
//     const tryPlay = () => v.play().catch(() => setNeedTap(true));
//     if (v.readyState >= 2) tryPlay();
//     else {
//       const on = () => {
//         v.removeEventListener("canplay", on);
//         tryPlay();
//       };
//       v.addEventListener("canplay", on);
//       return () => v.removeEventListener("canplay", on);
//     }
//   }, [i, visible]);

//   // Auto advance every 7s (pause on hover)
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
//       className={
//         "relative rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur " +
//         (fixed ? "" : "w-full aspect-[9/16]") +
//         " " +
//         className
//       }
//       style={fixed ? { width: 360, height: 500 } : undefined}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       onPointerDown={() => {
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
//         onError={next}
//       />

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

// //----------------------------------------

// export default function Home() {
//   const [gallery, setGallery] = useState<GalleryItem[]>([]);
//   const [reels1, setReels1] = useState<ReelItem[]>([]);
//   const [reels2, setReels2] = useState<ReelItem[]>([]);
//   const [reels3, setReels3] = useState<ReelItem[]>([]);

//   // gallery-2 tile slideshow state
//   const [stripStep, setStripStep] = useState(0);

//   // gallery-3 full-bleed slideshow state
//   const [g3Index, setG3Index] = useState(0);

//   // Load images + reels from /api/media
//   useEffect(() => {
//     let cancel = false;
//     (async () => {
//       try {
//         const res = await fetch("/api/media", { cache: "no-store" });
//         const json = await res.json();
//         if (!cancel) {
//           setGallery(Array.isArray(json.gallery) ? json.gallery : []);
//           setReels1(Array.isArray(json.reels1) ? json.reels1 : []);
//           setReels2(Array.isArray(json.reels2) ? json.reels2 : []);
//           setReels3(Array.isArray(json.reels3) ? json.reels3 : []);
//           console.log("✅ /api/media", json);
//         }
//       } catch {
//         // optional: log error
//       }
//     })();
//     return () => {
//       cancel = true;
//     };
//   }, []);

//   // auto-advance gallery-2 tile strips
//   useEffect(() => {
//     if (!GALLERY2_IMAGES.length) return;
//     const id = setInterval(
//       () => setStripStep((p) => (p + 1) % G2_STRIP_STARTS.length),
//       6000
//     );
//     return () => clearInterval(id);
//   }, []);

//   const gallery2Strip = makeStrip(G2_STRIP_STARTS[stripStep], 10);

//   // auto-advance gallery-3 full-bleed slideshow
//   useEffect(() => {
//     if (!GALLERY3_IMAGES.length) return;
//     const id = setInterval(
//       () => setG3Index((p) => (p + 1) % GALLERY3_IMAGES.length),
//       5000
//     );
//     return () => clearInterval(id);
//   }, []);

//   const g3Current = GALLERY3_IMAGES[g3Index];

//   // MOBILE: combine all reels into one playlist
//   const mobileReels: ReelItem[] = [...reels1, ...reels2, ...reels3];

//   return (
//     <main className="min-h-screen bg-sky-50 text-slate-900">
//       {/* HERO: title + 3 reels + Facebook card in one row, with venue wallpaper */}
//       <section className="relative text-white overflow-hidden">
//         {/* 🔵 Background venue image */}
//         <Image
//           src="/images/gallery/dolphin-venue.jpg"
//           alt="Dolphin Fun & Food venue"
//           fill
//           priority
//           sizes="100vw"
//           className="absolute inset-0 z-0 object-cover brightness-75 contrast-105 saturate-105"
//         />

//         {/* Slight dark overlay so text & reels stay readable */}
//         <div className="absolute inset-0 z-0 bg-black/10" />

//         {/* existing content, pulled above background */}
//         <div className="mx-auto max-w-7xl px-4 py-10 relative z-10">
//           <div className="text-center mb-6">
//             <h1 className="text-3xl md:text-4xl font-bold">
//               Dolphin Fun &amp; Food
//             </h1>
//             <p className="text-slate-200">
//               Restaurant • Banquets • 8-acre Water Park
//             </p>
//           </div>

//           {/* centered row, equal gaps */}
//           <div className="mt-6 flex justify-center gap-10">
//             <InlineHeroReels
//               videos={reels1}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <InlineHeroReels
//               videos={reels2}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <InlineHeroReels
//               videos={reels3}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <FacebookPageEmbedShell />
//           </div>
//         </div>
//       </section>

//       {/* HEADER BAR */}
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

//       {/* FEATURED BAND + G3 FULL-BLEED + TILE GALLERY + WELCOME */}
//       <section className="w-full bg-sky-50">
//         {/* 1️⃣ Full-bleed caption+image slideshow (edge-to-edge) */}
//         <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
//           <GalleryCarousel slides={FEATURED_SLIDES} ratio="aspect-[16/9]" />
//         </div>

//         {/* 2️⃣ NEW: full-bleed single-image slideshow from gallery-3 */}
//         {GALLERY3_IMAGES.length > 0 && (
//           <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-black">
//             <div className="relative aspect-[16/9] md:aspect-[21/9]">
//               <Image
//                 key={g3Current.src}
//                 src={g3Current.src}
//                 alt={g3Current.alt ?? "Dolphin Fun & Food gallery"}
//                 fill
//                 sizes="100vw"
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         )}

//         {/* 3️⃣ gallery-2 tile slideshow, 2 rows of 5, edge-to-edge */}
//         <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white py-10">
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-1 md:gap-2">
//             {gallery2Strip.map((img, idx) => (
//               <div
//                 key={img.src + idx}
//                 className="relative aspect-[4/3] overflow-hidden"
//               >
//                 <Image
//                   src={img.src}
//                   alt={img.alt ?? "Dolphin Fun & Food gallery"}
//                   fill
//                   sizes="20vw"
//                   className="object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 4️⃣ WELCOME card */}
//         <div className="mx-auto max-w-6xl px-4 pt-10 pb-8">
//           <div className="rounded-3xl shadow-lg bg-white p-6 md:p-10">
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

//       {/* MOBILE STACKED EMBEDS */}
//       <section className="md:hidden mx-auto max-w-6xl px-4 space-y-6 mt-6">
//         {mobileReels.length > 0 && (
//           <div className="rounded-2xl overflow-hidden shadow">
//             {/* Fluid 9:16 reels on mobile */}
//             <InlineHeroReels videos={mobileReels} />
//           </div>
//         )}
//         <div className="rounded-2xl overflow-hidden shadow">
//           {/* Responsive FB embed (auto-width) */}
//           <FacebookPageEmbed
//             height={520}
//             smallHeader={false}
//             hideCover={false}
//             responsive
//           />
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="mt-16 border-t border-sky-200">
//         <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
//           © {new Date().getFullYear()} Dolphin Fun &amp; Food
//         </div>
//       </footer>
//     </main>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// Code below renders same reels in first three fixed-size slots in desktop hero panel,
// // src/app/page.tsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import FacebookPageEmbed from "./components/FacebookPageEmbed";
// import GalleryCarousel from "./components/GalleryCarousel";
// import FacebookPageEmbedShell from "./components/FacebookPageEmbedShell";

// type GalleryItem = { src: string; alt?: string };
// type ReelItem = { src: string; poster?: string };

// //----------------------------------------
// // MAIN FEATURED SLIDES (band with caption + image)
// const FEATURED_SLIDES = [
//   {
//     src: "/images/gallery/pic-01.jpg",
//     alt: "Colourful salad bowl",
//     tagline: "Fresh, fun, and full of fuel.",
//   },
//   {
//     src: "/images/gallery/pic-02.jpg",
//     alt: "Veg North Indian Thali",
//     tagline: "A perfectly curated plate of timeless North Indian flavours.",
//   },
//   {
//     src: "/images/gallery/pic-03.jpg",
//     alt: "Jumpy dolphin at sunrise",
//     tagline: "Energy. Freedom. Fun — the Dolphin way.",
//   },
//   {
//     src: "/images/gallery/pic-04.jpg",
//     alt: "Mother & Child Underwater",
//     tagline: "Where every splash becomes a memory.",
//   },
//   {
//     src: "/images/gallery/pic-05.jpg",
//     alt: "Kids & Family on Car Striking Ride",
//     tagline: "Bump into happiness — one ride at a time!",
//   },
//   {
//     src: "/images/gallery/pic-06.png",
//     alt: "Opening Shortly Balloon 1",
//     tagline: "Murthal’s New Destination for Food, Fun & Family!",
//   },
//   {
//     src: "/images/gallery/pic-07.png",
//     alt: "Opening Shortly Balloon 2",
//     tagline: "Highway’s Happiest Stop — Opening Shortly!",
//   },
//   {
//     src: "/images/gallery/pic-08.png",
//     alt: "Yellow & White Balloon in the Sky ",
//     tagline: "Highway’s Happiest Stop — Open Now!",
//   },
//   {
//     src: "/images/gallery/pic-09.png",
//     alt: "Dolphin at your service ",
//     tagline: "When Hunger Strikes… Dive to Dolphin!",
//   },
//   {
//     src: "/images/gallery/pic-10.png",
//     alt: "Dolphin in the service of Buddha",
//     tagline: "When a Dolphin Serves, Even Buddha Smiles.",
//   },
//   {
//     src: "/images/gallery/pic-11.png",
//     alt: "Ganpati Bappa’s Blessings…",
//     tagline: "Bappa’s Blessings, Dolphin’s Devotion — A Heavenly Moment.",
//   },
//   {
//     src: "/images/gallery/pic-12.png",
//     alt: "Palm Breeze, Blue Seas, Big Smiles.",
//     tagline: "From Ocean Vibes to High-Energy Rides!",
//   },
// ];

// //----------------------------------------
// // SECOND GALLERY (tile slideshow from /images/gallery-2)

// const GALLERY2_FILES = [
//   "pic-01.jpg",
//   "pic-02.jpg",
//   "pic-03.jpg",
//   "pic-04.jpg",
//   "pic-05.jpg",
//   "pic-06.jpg",
//   "pic-07.jpg",
//   "pic-08.jpg",
//   "pic-09.jpg",
//   "pic-10.jpg",
//   "pic-11.jpg",
//   "pic-12.jpg",
//   "pic-13.jpg",
//   "pic-14.jpg",
//   "pic-15.jpg",
//   "pic-16.jpg",
//   "pic-17.png",
//   "pic-18.jpg",
//   "pic-19.png",
//   "pic-20.png",
//   "pic-21.png",
//   "pic-22.png",
//   "pic-23.png",
//   "pic-24.png",
//   "pic-25.png",
//   "pic-26.png",
//   "pic-27.jpg",
//   "pic-28.png",
//   "pic-29.jpg",
//   "pic-30.png",
//   "pic-31.png",
//   "pic-32.jpg",
//   "pic-33.png",
//   "pic-34.jpg",
//   "pic-35.jpg",
//   "pic-36.png",
//   "pic-37.png",
//   "pic-38.jpg",
//   "pic-39.png",
//   "pic-40.png",
//   "pic-41.jpg",
//   "pic-42.jpg",
//   "pic-43.jpg",
//   "pic-44.jpg",
//   "pic-45.jpg",
//   "pic-46.jpg",
//   "pic-47.jpg",
//   "pic-48.jpg",
//   "pic-49.jpg",
//   "pic-50.jpg",
// ];

// const GALLERY2_IMAGES: GalleryItem[] = GALLERY2_FILES.map((file) => ({
//   src: `/images/gallery-2/${file}`,
//   alt: `Dolphin Fun & Food gallery image ${file}`,
// }));

// //----------------------------------------
// // THIRD GALLERY (full-bleed single-image slideshow from /images/gallery-3)
// // NOTE: we reuse exactly the same file names as gallery-2, including .jpg/.png.
// const GALLERY3_FILES = [
//   "pic-01.jpg",
//   "pic-02.jpg",
//   "pic-03.jpg",
//   "pic-04.jpg",
//   "pic-05.jpg",
//   "pic-06.jpg",
//   "pic-07.jpg",
//   "pic-08.jpg",
//   "pic-09.jpg",
//   "pic-10.jpg",
//   "pic-11.jpg",
//   "pic-12.jpg",
//   "pic-13.jpg",
//   "pic-14.jpg",
//   "pic-15.jpg",
//   "pic-16.jpg",
//   "pic-17.png",
//   "pic-18.jpg",
//   "pic-19.png",
//   "pic-20.png",
//   "pic-21.png",
//   "pic-22.png",
//   "pic-23.png",
//   "pic-24.png",
//   "pic-25.png",
//   "pic-26.png",
//   "pic-27.jpg",
//   "pic-28.png",
//   "pic-29.jpg",
//   "pic-30.png",
//   "pic-31.png",
//   "pic-32.jpg",
//   "pic-33.png",
//   "pic-34.jpg",
//   "pic-35.jpg",
//   "pic-36.png",
//   "pic-37.png",
//   "pic-38.jpg",
//   "pic-39.png",
//   "pic-40.png",
//   "pic-41.jpg",
//   "pic-42.jpg",
//   "pic-43.jpg",
//   "pic-44.jpg",
//   "pic-45.jpg",
//   "pic-46.jpg",
//   "pic-47.jpg",
//   "pic-48.jpg",
//   "pic-49.jpg",
//   "pic-50.jpg",
// ];
// const GALLERY3_IMAGES: GalleryItem[] = GALLERY3_FILES.map((file) => ({
//   src: `/images/gallery-3/${file}`,
//   alt: `Dolphin Fun & Food interior ${file}`,
// }));

// //----------------------------------------
// // Tile strips (gallery-2)
// // Strip 1 → 01–10
// // Strip 2 → 11–20
// // Strip 3 → 21–30
// // Strip 4 → 31–40
// // Strip 5 → 41–50
// const G2_STRIP_STARTS = [0, 10, 20, 30, 40];

// function makeStrip(start: number, size: number) {
//   const out: GalleryItem[] = [];
//   for (let k = 0; k < size; k++) {
//     const idx = (start + k) % GALLERY2_IMAGES.length;
//     out.push(GALLERY2_IMAGES[idx]);
//   }
//   return out;
// }

// //----------------------------------------
// /** Reels slider */
// function InlineHeroReels({
//   videos,
//   fixed = false,
//   className = "",
// }: {
//   videos: { src: string; poster?: string }[];
//   fixed?: boolean;
//   className?: string;
// }) {
//   const [i, setI] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [needTap, setNeedTap] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const vref = useRef<HTMLVideoElement | null>(null);
//   const hostRef = useRef<HTMLDivElement | null>(null);

//   // Only autoplay when visible
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

//   // Attempt autoplay on index/visibility change
//   useEffect(() => {
//     const v = vref.current;
//     if (!v || !visible) return;
//     setNeedTap(false);
//     v.muted = true;
//     v.playsInline = true;
//     const tryPlay = () => v.play().catch(() => setNeedTap(true));
//     if (v.readyState >= 2) tryPlay();
//     else {
//       const on = () => {
//         v.removeEventListener("canplay", on);
//         tryPlay();
//       };
//       v.addEventListener("canplay", on);
//       return () => v.removeEventListener("canplay", on);
//     }
//   }, [i, visible]);

//   // Auto advance every 7s (pause on hover)
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
//       className={
//         "relative rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur " +
//         (fixed ? "" : "w-full aspect-[9/16]") +
//         " " +
//         className
//       }
//       style={fixed ? { width: 360, height: 500 } : undefined}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       onPointerDown={() => {
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
//         onError={next}
//       />

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

// //----------------------------------------

// export default function Home() {
//   const [gallery, setGallery] = useState<GalleryItem[]>([]);
//   const [reels, setReels] = useState<ReelItem[]>([]);

//   // gallery-2 tile slideshow state
//   const [stripStep, setStripStep] = useState(0);

//   // gallery-3 full-bleed slideshow state
//   const [g3Index, setG3Index] = useState(0);

//   // Load images + reels from /api/media (if used elsewhere)
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

//   // auto-advance gallery-2 tile strips
//   useEffect(() => {
//     if (!GALLERY2_IMAGES.length) return;
//     const id = setInterval(
//       () => setStripStep((p) => (p + 1) % G2_STRIP_STARTS.length),
//       6000
//     );
//     return () => clearInterval(id);
//   }, []);

//   const gallery2Strip = makeStrip(G2_STRIP_STARTS[stripStep], 10);

//   // auto-advance gallery-3 full-bleed slideshow
//   useEffect(() => {
//     if (!GALLERY3_IMAGES.length) return;
//     const id = setInterval(
//       () => setG3Index((p) => (p + 1) % GALLERY3_IMAGES.length),
//       5000
//     );
//     return () => clearInterval(id);
//   }, []);

//   const g3Current = GALLERY3_IMAGES[g3Index];

//   return (
//     <main className="min-h-screen bg-sky-50 text-slate-900">
//       {/* HERO: title + 3 reels + Facebook card in one row, with venue wallpaper */}
//       <section className="relative text-white overflow-hidden">
//         {/* 🔵 Background venue image */}
//         <Image
//           src="/images/gallery/dolphin-venue.jpg"
//           alt="Dolphin Fun & Food venue"
//           fill
//           priority
//           sizes="100vw"
//           className="absolute inset-0 z-0 object-cover brightness-75 contrast-105 saturate-105"
//         />

//         {/* Slight dark overlay so text & reels stay readable */}
//         <div className="absolute inset-0 z-0 bg-black/10" />

//         {/* existing content, pulled above background */}
//         <div className="mx-auto max-w-7xl px-4 py-10 relative z-10">
//           <div className="text-center mb-6">
//             <h1 className="text-3xl md:text-4xl font-bold">
//               Dolphin Fun &amp; Food
//             </h1>
//             <p className="text-slate-200">
//               Restaurant • Banquets • 8-acre Water Park
//             </p>
//           </div>

//           {/* centered row, equal gaps */}
//           <div className="mt-6 flex justify-center gap-10">
//             <InlineHeroReels
//               videos={reels}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <InlineHeroReels
//               videos={reels}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <InlineHeroReels
//               videos={reels}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <FacebookPageEmbedShell />
//           </div>
//         </div>
//       </section>

//       {/* HEADER BAR */}
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

//       {/* FEATURED BAND + G3 FULL-BLEED + TILE GALLERY + WELCOME */}
//       <section className="w-full bg-sky-50">
//         {/* 1️⃣ Full-bleed caption+image slideshow (edge-to-edge) */}
//         <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
//           <GalleryCarousel slides={FEATURED_SLIDES} ratio="aspect-[16/9]" />
//         </div>

//         {/* 2️⃣ NEW: full-bleed single-image slideshow from gallery-3 */}
//         {GALLERY3_IMAGES.length > 0 && (
//           <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-black">
//             <div className="relative aspect-[16/9] md:aspect-[21/9]">
//               <Image
//                 key={g3Current.src}
//                 src={g3Current.src}
//                 alt={g3Current.alt ?? "Dolphin Fun & Food gallery"}
//                 fill
//                 sizes="100vw"
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         )}

//         {/* 3️⃣ gallery-2 tile slideshow, 2 rows of 5, edge-to-edge */}
//         <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white py-10">
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-1 md:gap-2">
//             {gallery2Strip.map((img, idx) => (
//               <div
//                 key={img.src + idx}
//                 className="relative aspect-[4/3] overflow-hidden"
//               >
//                 <Image
//                   src={img.src}
//                   alt={img.alt ?? "Dolphin Fun & Food gallery"}
//                   fill
//                   sizes="20vw"
//                   className="object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 4️⃣ WELCOME card */}
//         <div className="mx-auto max-w-6xl px-4 pt-10 pb-8">
//           <div className="rounded-3xl shadow-lg bg-white p-6 md:p-10">
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

//       {/* MOBILE STACKED EMBEDS */}
//       <section className="md:hidden mx-auto max-w-6xl px-4 space-y-6 mt-6">
//         {reels.length > 0 && (
//           <div className="rounded-2xl overflow-hidden shadow">
//             {/* Fluid 9:16 reels on mobile */}
//             <InlineHeroReels videos={reels} />
//           </div>
//         )}
//         <div className="rounded-2xl overflow-hidden shadow">
//           {/* Responsive FB embed (auto-width) */}
//           <FacebookPageEmbed
//             height={520}
//             smallHeader={false}
//             hideCover={false}
//             responsive
//           />
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="mt-16 border-t border-sky-200">
//         <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
//           © {new Date().getFullYear()} Dolphin Fun &amp; Food
//         </div>
//       </footer>
//     </main>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// code below before introducing slideshow from gallery-3
// // src/app/page.tsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import FacebookPageEmbed from "./components/FacebookPageEmbed";
// import GalleryCarousel from "./components/GalleryCarousel";
// import FacebookPageEmbedShell from "./components/FacebookPageEmbedShell";

// type GalleryItem = { src: string; alt?: string };
// type ReelItem = { src: string; poster?: string };

// //----------------------------------------
// // MAIN FEATURED SLIDES (band with caption + image)
// const FEATURED_SLIDES = [
//   {
//     src: "/images/gallery/pic-01.jpg",
//     alt: "Colourful salad bowl",
//     tagline: "Fresh, fun, and full of fuel.",
//   },
//   {
//     src: "/images/gallery/pic-02.jpg",
//     alt: "Veg North Indian Thali",
//     tagline: "A perfectly curated plate of timeless North Indian flavours.",
//   },
//   {
//     src: "/images/gallery/pic-03.jpg",
//     alt: "Jumpy dolphin at sunrise",
//     tagline: "Energy. Freedom. Fun — the Dolphin way.",
//   },
//   {
//     src: "/images/gallery/pic-04.jpg",
//     alt: "Mother & Child Underwater",
//     tagline: "Where every splash becomes a memory.",
//   },
//   {
//     src: "/images/gallery/pic-05.jpg",
//     alt: "Kids & Family on Car Striking Ride",
//     tagline: "Bump into happiness — one ride at a time!",
//   },
//   {
//     src: "/images/gallery/pic-06.png",
//     alt: "Opening Shortly Balloon 1",
//     tagline: "Murthal’s New Destination for Food, Fun & Family!",
//   },
//   {
//     src: "/images/gallery/pic-07.png",
//     alt: "Opening Shortly Balloon 2",
//     tagline: "Highway’s Happiest Stop — Opening Shortly!",
//   },

//   {
//     src: "/images/gallery/pic-08.png",
//     alt: "Yellow & White Balloon in the Sky ",
//     tagline: "Highway’s Happiest Stop — Open Now!",
//   },
//   {
//     src: "/images/gallery/pic-09.png",
//     alt: "Dolphin at your service ",
//     tagline: "When Hunger Strikes… Dive to Dolphin!",
//   },
//   {
//     src: "/images/gallery/pic-10.png",
//     alt: "Dolphin in the service of Buddha",
//     tagline: "When a Dolphin Serves, Even Buddha Smiles.",
//   },
//   {
//     src: "/images/gallery/pic-11.png",
//     alt: "Ganpati Bappa’s Blessings…",
//     tagline: "Bappa’s Blessings, Dolphin’s Devotion — A Heavenly Moment.",
//   },
//   {
//     src: "/images/gallery/pic-12.png",
//     alt: "Palm Breeze, Blue Seas, Big Smiles.",
//     tagline: "From Ocean Vibes to High-Energy Rides!",
//   },
// ];

// //----------------------------------------
// // SECOND GALLERY (tile slideshow from /images/gallery-2)
// // const GALLERY2_IMAGES: GalleryItem[] = Array.from({ length: 15 }).map(
// //   (_v, idx) => {
// //     const n = String(idx + 1).padStart(2, "0");
// //     return {
// //       src: `/images/gallery-2/pic-${n}.jpg`,
// //       alt: `Dolphin Fun & Food gallery image ${n}`,
// //     };
// //   }
// // );

// // // starts for the 3 strips you described:
// // // 1) 01–10 (start 0)
// // // 2) 06–15 (start 5)
// // // 3) 10–15 + 01–05 (start 9)
// // const G2_STRIP_STARTS = [0, 5, 9];

// // function makeStrip(start: number, size: number) {
// //   if (!GALLERY2_IMAGES.length) return [];
// //   const out: GalleryItem[] = [];
// //   for (let k = 0; k < size; k++) {
// //     const idx = (start + k) % GALLERY2_IMAGES.length;
// //     out.push(GALLERY2_IMAGES[idx]);
// //   }
// //   return out;
// // }
// //----------------------------------------
// // ----------------------------------------
// // SECOND GALLERY (tile slideshow from /images/gallery-2)

// // Total number of gallery-2 images (pic-01 → pic-50)

// const GALLERY2_FILES = [
//   "pic-01.jpg",
//   "pic-02.jpg",
//   "pic-03.jpg",
//   "pic-04.jpg",
//   "pic-05.jpg",
//   "pic-06.jpg",
//   "pic-07.jpg",
//   "pic-08.jpg",
//   "pic-09.jpg",
//   "pic-10.jpg",
//   "pic-11.jpg",
//   "pic-12.jpg",
//   "pic-13.jpg",
//   "pic-14.jpg",
//   "pic-15.jpg",
//   "pic-16.jpg",
//   "pic-17.png",
//   "pic-18.jpg",
//   "pic-19.png",
//   "pic-20.png",
//   "pic-21.png",
//   "pic-22.png",
//   "pic-23.png",
//   "pic-24.png",
//   "pic-25.png",
//   "pic-26.png",
//   "pic-27.jpg",
//   "pic-28.png",
//   "pic-29.jpg",
//   "pic-30.png",
//   "pic-31.png",
//   "pic-32.jpg",
//   "pic-33.png",
//   "pic-34.jpg",
//   "pic-35.jpg",
//   "pic-36.png",
//   "pic-37.png",
//   "pic-38.jpg",
//   "pic-39.png",
//   "pic-40.png",
//   "pic-41.jpg",
//   "pic-42.jpg",
//   "pic-43.jpg",
//   "pic-44.jpg",
//   "pic-45.jpg",
//   "pic-46.jpg",
//   "pic-47.jpg",
//   "pic-48.jpg",
//   "pic-49.jpg",
//   "pic-50.jpg",
// ];
// const GALLERY2_IMAGES = GALLERY2_FILES.map((file) => ({
//   src: `/images/gallery-2/${file}`,
//   alt: `Dolphin Fun & Food gallery image ${file}`,
// }));

// // We will show 10 images at a time as a strip.
// // With 50 images, define 5 strips:
// // Strip 1 → 01–10
// // Strip 2 → 11–20
// // Strip 3 → 21–30
// // Strip 4 → 31–40
// // Strip 5 → 41–50
// // strips
// const G2_STRIP_STARTS = [0, 10, 20, 30, 40];

// function makeStrip(start: number, size: number) {
//   const out = [];
//   for (let k = 0; k < size; k++) {
//     const idx = (start + k) % GALLERY2_IMAGES.length;
//     out.push(GALLERY2_IMAGES[idx]);
//   }
//   return out;
// }

// //----------------------------------------
// /** Reels slider
//  *  - desktop hero slots: fixed 360x500 (same as Facebook card)
//  *  - mobile: fluid full-width 9:16
//  */
// function InlineHeroReels({
//   videos,
//   fixed = false,
//   className = "",
// }: {
//   videos: { src: string; poster?: string }[];
//   fixed?: boolean;
//   className?: string;
// }) {
//   const [i, setI] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [needTap, setNeedTap] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const vref = useRef<HTMLVideoElement | null>(null);
//   const hostRef = useRef<HTMLDivElement | null>(null);

//   // Only autoplay when visible
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

//   // Attempt autoplay on index/visibility change
//   useEffect(() => {
//     const v = vref.current;
//     if (!v || !visible) return;
//     setNeedTap(false);
//     v.muted = true;
//     v.playsInline = true;
//     const tryPlay = () => v.play().catch(() => setNeedTap(true));
//     if (v.readyState >= 2) tryPlay();
//     else {
//       const on = () => {
//         v.removeEventListener("canplay", on);
//         tryPlay();
//       };
//       v.addEventListener("canplay", on);
//       return () => v.removeEventListener("canplay", on);
//     }
//   }, [i, visible]);

//   // Auto advance every 7s (pause on hover)
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
//       className={
//         "relative rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur " +
//         (fixed ? "" : "w-full aspect-[9/16]") +
//         " " +
//         className
//       }
//       style={fixed ? { width: 360, height: 500 } : undefined}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       onPointerDown={() => {
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
//         onError={next}
//       />

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

// //----------------------------------------

// export default function Home() {
//   const [gallery, setGallery] = useState<GalleryItem[]>([]);
//   const [reels, setReels] = useState<ReelItem[]>([]);

//   // Load images + reels
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

//   // ---- gallery-2 tile slideshow state ----
//   const [stripStep, setStripStep] = useState(0);

//   useEffect(() => {
//     if (!GALLERY2_IMAGES.length) return;
//     const id = setInterval(
//       () => setStripStep((p) => (p + 1) % G2_STRIP_STARTS.length),
//       6000
//     );
//     return () => clearInterval(id);
//   }, []);

//   const gallery2Strip = makeStrip(G2_STRIP_STARTS[stripStep], 10);

//   return (
//     <main className="min-h-screen bg-sky-50 text-slate-900">
//       {/* HERO: title + 3 reels + Facebook card in one row, with venue wallpaper */}
//       <section className="relative text-white overflow-hidden">
//         {/* 🔵 Background venue image */}
//         <Image
//           src="/images/gallery/dolphin-venue.jpg"
//           alt="Dolphin Fun & Food venue"
//           fill
//           priority
//           sizes="100vw"
//           className="absolute inset-0 z-0 object-cover brightness-75 contrast-105 saturate-105"
//         />

//         {/* Slight dark overlay so text & reels stay readable */}
//         <div className="absolute inset-0 z-0 bg-black/10" />

//         {/* existing content, pulled above background */}
//         <div className="mx-auto max-w-7xl px-4 py-10 relative z-10">
//           <div className="text-center mb-6">
//             <h1 className="text-3xl md:text-4xl font-bold">
//               Dolphin Fun &amp; Food
//             </h1>
//             <p className="text-slate-200">
//               Restaurant • Banquets • 8-acre Water Park
//             </p>
//           </div>

//           {/* centered row, equal gaps */}
//           <div className="mt-6 flex justify-center gap-10">
//             <InlineHeroReels
//               videos={reels}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <InlineHeroReels
//               videos={reels}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <InlineHeroReels
//               videos={reels}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <FacebookPageEmbedShell />
//           </div>
//         </div>
//       </section>

//       {/* HEADER BAR */}
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

//       {/* FEATURED BAND + TILE GALLERY + WELCOME */}
//       <section className="w-full bg-sky-50">
//         {/* Full-bleed caption+image slideshow (edge-to-edge) */}
//         <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
//           <GalleryCarousel slides={FEATURED_SLIDES} ratio="aspect-[16/9]" />
//         </div>

//         {/* NEW: gallery-2 tile slideshow, 2 rows of 5, edge-to-edge */}
//         <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white py-10">
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-1 md:gap-2">
//             {gallery2Strip.map((img, idx) => (
//               <div
//                 key={img.src + idx}
//                 className="relative aspect-[4/3] overflow-hidden"
//               >
//                 <Image
//                   src={img.src}
//                   alt={img.alt ?? "Dolphin Fun & Food gallery"}
//                   fill
//                   sizes="20vw"
//                   className="object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* WELCOME card moved to the bottom */}
//         <div className="mx-auto max-w-6xl px-4 pt-10 pb-8">
//           <div className="rounded-3xl shadow-lg bg-white p-6 md:p-10">
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

//       {/* MOBILE STACKED EMBEDS */}
//       <section className="md:hidden mx-auto max-w-6xl px-4 space-y-6 mt-6">
//         {reels.length > 0 && (
//           <div className="rounded-2xl overflow-hidden shadow">
//             {/* Fluid 9:16 reels on mobile */}
//             <InlineHeroReels videos={reels} />
//           </div>
//         )}
//         <div className="rounded-2xl overflow-hidden shadow">
//           {/* Responsive FB embed (auto-width) */}
//           <FacebookPageEmbed
//             height={520}
//             smallHeader={false}
//             hideCover={false}
//             responsive
//           />
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="mt-16 border-t border-sky-200">
//         <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
//           © {new Date().getFullYear()} Dolphin Fun &amp; Food
//         </div>
//       </footer>
//     </main>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // src/app/page.tsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import FacebookPageEmbed from "./components/FacebookPageEmbed";
// import GalleryCarousel from "./components/GalleryCarousel";
// import FacebookPageEmbedShell from "./components/FacebookPageEmbedShell";

// type GalleryItem = { src: string; alt?: string };
// type ReelItem = { src: string; poster?: string };

// //----------------------------------------
// // 1) Top band slideshow (already working)
// const FEATURED_SLIDES = [
//   {
//     src: "/images/gallery/pic-01.jpg",
//     alt: "Colourful salad bowl",
//     tagline: "Fresh, fun, and full of fuel.",
//   },
//   {
//     src: "/images/gallery/pic-02.jpg",
//     alt: "Veg North Indian Thali",
//     tagline: "A perfectly curated plate of timeless North Indian flavours.",
//   },
//   {
//     src: "/images/gallery/pic-03.jpg",
//     alt: "Jumpy dolphin at sunrise",
//     tagline: "Energy. Freedom. Fun — the Dolphin way.",
//   },
//   {
//     src: "/images/gallery/pic-04.jpg",
//     alt: "Mother & Child Underwater",
//     tagline: "Where every splash becomes a memory.",
//   },
//   {
//     src: "/images/gallery/pic-05.jpg",
//     alt: "Kids & Family on Car Striking Ride",
//     tagline: "Bump into happiness — one ride at a time!",
//   },
//   {
//     src: "/images/gallery/pic-06.jpg",
//     alt: "Opening Shortly Balloon – yellow",
//     tagline: "Murthal’s New Destination for Food, Fun & Family!",
//   },
//   {
//     src: "/images/gallery/pic-07.jpg",
//     alt: "Opening Shortly Balloon – white",
//     tagline: "Highway’s Happiest Stop — Opening Shortly!",
//   },
// ];

// //----------------------------------------
// // 2) NEW tiled gallery source – images in /public/images/gallery-2
// type Gallery2Item = { src: string; alt?: string };

// const GALLERY2_IMAGES: Gallery2Item[] = [
//   { src: "/images/gallery-2/pic-01.jpg", alt: "Dolphin water fun 1" },
//   { src: "/images/gallery-2/pic-02.jpg", alt: "Dolphin water fun 2" },
//   { src: "/images/gallery-2/pic-03.jpg", alt: "Dolphin water fun 3" },
//   { src: "/images/gallery-2/pic-04.jpg", alt: "Dolphin water fun 4" },
//   { src: "/images/gallery-2/pic-05.jpg", alt: "Dolphin water fun 5" },
//   { src: "/images/gallery-2/pic-06.jpg", alt: "Dolphin water fun 6" },
//   { src: "/images/gallery-2/pic-07.jpg", alt: "Dolphin water fun 7" },
//   { src: "/images/gallery-2/pic-08.jpg", alt: "Dolphin water fun 8" },
//   { src: "/images/gallery-2/pic-09.jpg", alt: "Dolphin water fun 9" },
//   { src: "/images/gallery-2/pic-10.jpg", alt: "Dolphin water fun 10" },
//   { src: "/images/gallery-2/pic-11.jpg", alt: "Dolphin water fun 11" },
//   { src: "/images/gallery-2/pic-12.jpg", alt: "Dolphin water fun 12" },
//   { src: "/images/gallery-2/pic-13.jpg", alt: "Dolphin water fun 13" },
//   { src: "/images/gallery-2/pic-14.jpg", alt: "Dolphin water fun 14" },
//   { src: "/images/gallery-2/pic-15.jpg", alt: "Dolphin water fun 15" },
//   // you can keep adding more pics here later
// ];

// //----------------------------------------
// /** Reels slider
//  *  - desktop hero slots: fixed 360x500 (same as Facebook card)
//  *  - mobile: fluid full-width 9:16
//  */
// function InlineHeroReels({
//   videos,
//   fixed = false,
//   className = "",
// }: {
//   videos: { src: string; poster?: string }[];
//   fixed?: boolean;
//   className?: string;
// }) {
//   const [i, setI] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [needTap, setNeedTap] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const vref = useRef<HTMLVideoElement | null>(null);
//   const hostRef = useRef<HTMLDivElement | null>(null);

//   // Only autoplay when visible
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

//   // Attempt autoplay on index/visibility change
//   useEffect(() => {
//     const v = vref.current;
//     if (!v || !visible) return;
//     setNeedTap(false);
//     v.muted = true;
//     v.playsInline = true;
//     const tryPlay = () => v.play().catch(() => setNeedTap(true));
//     if (v.readyState >= 2) tryPlay();
//     else {
//       const on = () => {
//         v.removeEventListener("canplay", on);
//         tryPlay();
//       };
//       v.addEventListener("canplay", on);
//       return () => v.removeEventListener("canplay", on);
//     }
//   }, [i, visible]);

//   // Auto advance every 7s (pause on hover)
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
//       className={
//         "relative rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur " +
//         (fixed ? "" : "w-full aspect-[9/16]") +
//         " " +
//         className
//       }
//       style={fixed ? { width: 360, height: 500 } : undefined}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       onPointerDown={() => {
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
//         onError={next}
//       />

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

// //----------------------------------------
// // 3) NEW: tiled gallery component with 10 tiles + custom offset pattern
// function TiledGallery({
//   images,
//   interval = 7000,
// }: {
//   images: Gallery2Item[];
//   interval?: number;
// }) {
//   // Offsets implement:
//   // 0  => pic-01..pic-10
//   // 5  => pic-06..pic-15
//   // 9  => pic-10..pic-15 + pic-01..pic-05
//   const OFFSETS = [0, 5, 9];
//   const [step, setStep] = useState(0);

//   useEffect(() => {
//     if (!images.length) return;
//     const id = setInterval(
//       () => setStep((p) => (p + 1) % OFFSETS.length),
//       interval
//     );
//     return () => clearInterval(id);
//   }, [images.length, interval]);

//   if (!images.length) return null;

//   const total = images.length;
//   const start = OFFSETS[step] % total;

//   // compute the 10 visible images according to current offset (wrap around)
//   const visible: Gallery2Item[] = [];
//   for (let k = 0; k < 10 && k < total; k++) {
//     visible.push(images[(start + k) % total]);
//   }

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
//       {visible.map((img, idx) => (
//         <div
//           key={`${img.src}-${idx}`}
//           className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md"
//         >
//           <Image
//             src={img.src}
//             alt={img.alt ?? "Dolphin Fun & Food gallery"}
//             fill
//             sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
//             className="object-cover"
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// //----------------------------------------

// export default function Home() {
//   const [gallery, setGallery] = useState<GalleryItem[]>([]);
//   const [reels, setReels] = useState<ReelItem[]>([]);

//   // Load images + reels
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
//       {/* HERO: title + 3 reels + Facebook card in one row, with venue wallpaper */}
//       <section className="relative text-white overflow-hidden">
//         {/* 🔵 Background venue image */}
//         <Image
//           src="/images/gallery/dolphin-venue.jpg"
//           alt="Dolphin Fun & Food venue"
//           fill
//           priority
//           sizes="100vw"
//           className="absolute inset-0 z-0 object-cover brightness-75 contrast-105 saturate-105"
//         />

//         {/* Slight dark overlay so text & reels stay readable */}
//         <div className="absolute inset-0 z-0 bg-black/10" />

//         {/* existing content, pulled above background */}
//         <div className="mx-auto max-w-7xl px-4 py-10 relative z-10">
//           <div className="text-center mb-6">
//             <h1 className="text-3xl md:text-4xl font-bold">
//               Dolphin Fun &amp; Food
//             </h1>
//             <p className="text-slate-200">
//               Restaurant • Banquets • 8-acre Water Park
//             </p>
//           </div>

//           {/* centered row, equal gaps */}
//           <div className="mt-6 flex justify-center gap-10">
//             <InlineHeroReels
//               videos={reels}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <InlineHeroReels
//               videos={reels}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <InlineHeroReels
//               videos={reels}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <FacebookPageEmbedShell />
//           </div>
//         </div>
//       </section>

//       {/* HEADER BAR */}
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

//       {/* FEATURED BAND + WELCOME CARD + NEW TILED GALLERY */}
//       <section className="w-full bg-sky-50">
//         {/* Full-bleed slideshow (edge-to-edge) */}
//         <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
//           <GalleryCarousel slides={FEATURED_SLIDES} ratio="aspect-[16/9]" />
//         </div>

//         {/* Welcome text card */}
//         <div className="mx-auto max-w-6xl px-4 pt-10 pb-8">
//           <div className="rounded-3xl shadow-lg bg-white p-6 md:p-10">
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

//         {/* NEW: Best Moments tiled gallery (10 tiles, cycling in 3 steps) */}
//         <div className="mx-auto max-w-6xl px-4 pb-12">
//           <h3 className="text-2xl md:text-3xl font-semibold mb-4">
//             Best Moments
//           </h3>
//           <p className="text-slate-600 mb-4">
//             A quick glimpse of the slides, splashes, and smiles at Dolphin Fun
//             &amp; Food — the tiles refresh in sets of ten.
//           </p>
//           <TiledGallery images={GALLERY2_IMAGES} />
//         </div>
//       </section>

//       {/* MOBILE STACKED EMBEDS */}
//       <section className="md:hidden mx-auto max-w-6xl px-4 space-y-6 mt-6">
//         {reels.length > 0 && (
//           <div className="rounded-2xl overflow-hidden shadow">
//             {/* Fluid 9:16 reels on mobile */}
//             <InlineHeroReels videos={reels} />
//           </div>
//         )}
//         <div className="rounded-2xl overflow-hidden shadow">
//           {/* Responsive FB embed (auto-width) */}
//           <FacebookPageEmbed
//             height={520}
//             smallHeader={false}
//             hideCover={false}
//             responsive
//           />
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="mt-16 border-t border-sky-200">
//         <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
//           © {new Date().getFullYear()} Dolphin Fun &amp; Food
//         </div>
//       </footer>
//     </main>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// With 3 reels plus facebook reel
// // src/app/page.tsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import FacebookPageEmbed from "./components/FacebookPageEmbed";
// import GalleryCarousel from "./components/GalleryCarousel";
// import FacebookPageEmbedShell from "./components/FacebookPageEmbedShell";

// type GalleryItem = { src: string; alt?: string };
// type ReelItem = { src: string; poster?: string };

// //----------------------------------------
// const FEATURED_SLIDES = [
//   {
//     src: "/images/gallery/pic-01.jpg",
//     alt: "Colourful salad bowl",
//     tagline: "Fresh, fun, and full of fuel.",
//   },
//   {
//     src: "/images/gallery/pic-02.jpg",
//     alt: "Veg North Indian Thali",
//     tagline: "A perfectly curated plate of timeless North Indian flavours.",
//   },
//   {
//     src: "/images/gallery/pic-03.jpg",
//     alt: "Jumpy dolphin at sunrise",
//     tagline: "Energy. Freedom. Fun — the Dolphin way.",
//   },
//   {
//     src: "/images/gallery/pic-04.jpg",
//     alt: "Mother & Child Underwater",
//     tagline: "Where every splash becomes a memory.",
//   },
//   {
//     src: "/images/gallery/pic-05.jpg",
//     alt: "Kids & Family on Car Striking Ride",
//     tagline: "Bump into happiness — one ride at a time!",
//   },
//   {
//     src: "/images/gallery/pic-06.jpg",
//     alt: "Opening Shortly Baloon-1",
//     tagline: "Murthal’s New Destination for Food, Fun & Family!",
//   },
//   {
//     src: "/images/gallery/pic-07.jpg",
//     alt: "Opening Shortly Baloon-2",
//     tagline:
//       "Highway’s Happiest Stop — Opening Shortly!",
//   },
// ];
// //----------------------------------------

// /** Reels slider
//  *  - desktop hero slots: fixed 360x500 (same as Facebook card)
//  *  - mobile: fluid full-width 9:16
//  */
// function InlineHeroReels({
//   videos,
//   fixed = false,
//   className = "",
// }: {
//   videos: { src: string; poster?: string }[];
//   fixed?: boolean;
//   className?: string;
// }) {
//   const [i, setI] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [needTap, setNeedTap] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const vref = useRef<HTMLVideoElement | null>(null);
//   const hostRef = useRef<HTMLDivElement | null>(null);

//   // Only autoplay when visible
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

//   // Attempt autoplay on index/visibility change
//   useEffect(() => {
//     const v = vref.current;
//     if (!v || !visible) return;
//     setNeedTap(false);
//     v.muted = true;
//     v.playsInline = true;
//     const tryPlay = () => v.play().catch(() => setNeedTap(true));
//     if (v.readyState >= 2) tryPlay();
//     else {
//       const on = () => {
//         v.removeEventListener("canplay", on);
//         tryPlay();
//       };
//       v.addEventListener("canplay", on);
//       return () => v.removeEventListener("canplay", on);
//     }
//   }, [i, visible]);

//   // Auto advance every 7s (pause on hover)
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
//       className={
//         "relative rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur " +
//         (fixed ? "" : "w-full aspect-[9/16]") +
//         " " +
//         className
//       }
//       style={fixed ? { width: 360, height: 500 } : undefined}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       onPointerDown={() => {
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
//         onError={next}
//       />

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

// export default function Home() {
//   const [gallery, setGallery] = useState<GalleryItem[]>([]);
//   const [reels, setReels] = useState<ReelItem[]>([]);

//   // Load images + reels
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

//   // Helper: first 3 reels for hero row
//   const heroReels = reels.slice(0, 3);

//   return (
//     <main className="min-h-screen bg-sky-50 text-slate-900">
//       {/* HERO: title + 3 reels + Facebook card in one row */}
//       {/* HERO: title + 3 reels + Facebook card in one row, with venue wallpaper */}
//       <section className="relative text-white overflow-hidden">
//         {/* 🔵 Background venue image */}
//         <Image
//           src="/images/gallery/dolphin-venue.jpg"
//           alt="Dolphin Fun & Food venue"
//           fill
//           priority
//           sizes="100vw"
//           className="absolute inset-0 z-0 object-cover brightness-75 contrast-105 saturate-105"
//         />

//         {/* Slight dark overlay so text & reels stay readable */}
//         <div className="absolute inset-0 z-0 bg-black/10" />

//         {/* existing content, pulled above background */}
//         <div className="mx-auto max-w-7xl px-4 py-10 relative z-10">
//           <div className="text-center mb-6">
//             <h1 className="text-3xl md:text-4xl font-bold">
//               Dolphin Fun &amp; Food
//             </h1>
//             <p className="text-slate-200">
//               Restaurant • Banquets • 8-acre Water Park
//             </p>
//           </div>

//           {/* centered row, equal gaps */}
//           <div className="mt-6 flex justify-center gap-10">
//             <InlineHeroReels
//               videos={reels}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <InlineHeroReels
//               videos={reels}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <InlineHeroReels
//               videos={reels}
//               fixed
//               className="w-[360px] h-[640px]"
//             />
//             <FacebookPageEmbedShell />
//           </div>
//         </div>
//       </section>

//       {/* HEADER BAR */}
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

//       {/* FEATURED BAND + WELCOME CARD */}
//       <section className="w-full bg-sky-50">
//         {/* Full-bleed slideshow (edge-to-edge) */}
//         <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
//           <GalleryCarousel slides={FEATURED_SLIDES} ratio="aspect-[16/9]" />
//         </div>

//         {/* White space between band and text */}
//         <div className="mx-auto max-w-6xl px-4 pt-10 pb-8">
//           <div className="rounded-3xl shadow-lg bg-white p-6 md:p-10">
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

//       {/* MOBILE STACKED EMBEDS */}
//       <section className="md:hidden mx-auto max-w-6xl px-4 space-y-6 mt-6">
//         {reels.length > 0 && (
//           <div className="rounded-2xl overflow-hidden shadow">
//             {/* Fluid 9:16 reels on mobile */}
//             <InlineHeroReels videos={reels} />
//           </div>
//         )}
//         <div className="rounded-2xl overflow-hidden shadow">
//           {/* Responsive FB embed (auto-width) */}
//           <FacebookPageEmbed
//             height={520}
//             smallHeader={false}
//             hideCover={false}
//             responsive
//           />
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="mt-16 border-t border-sky-200">
//         <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
//           © {new Date().getFullYear()} Dolphin Fun &amp; Food
//         </div>
//       </footer>
//     </main>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// with ballons
// // src/app/page.tsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import FacebookPageEmbed from "./components/FacebookPageEmbed";
// import GalleryCarousel from "./components/GalleryCarousel";

// import FacebookPageEmbedShell from "./components/FacebookPageEmbedShell";

// type GalleryItem = { src: string; alt?: string };
// type ReelItem = { src: string; poster?: string };

// const HERO = [
//   { src: "/images/gallery/baloon-01.jpg", alt: "Balloon decor — entrance" },
//   { src: "/images/gallery/baloon-02.jpg", alt: "Balloon arch — celebration" },
// ];
// //----------------------------------------
// const FEATURED_SLIDES = [
//   {
//     src: "/images/gallery/pic-01.jpg",
//     alt: "Colourful salad bowl",
//     tagline: "Fresh, fun, and full of fuel.", // 🥗 your chosen line
//   },
//   {
//     src: "/images/gallery/pic-02.jpg",
//     alt: "Veg North Indian Thali",
//     tagline: "A perfectly curated plate of timeless North Indian flavours.",
//   },
//   {
//     src: "/images/gallery/pic-03.jpg",
//     alt: "Jumpy dolphin at sunrise",
//     tagline: "Energy. Freedom. Fun — the Dolphin way.",
//   },
//   {
//     src: "/images/gallery/pic-04.jpg",
//     alt: "Mother & Child Underwater",
//     tagline: "Where every splash becomes a memory.",
//   },
//   {
//     src: "/images/gallery/pic-05.jpg",
//     alt: "Kids & Family on Car Striking Ride",
//     tagline: "Bump into happiness — one ride at a time!",
//   },

//   // ...continue up to pic-15
// ];
// //----------------------------------------

// /** Reels slider (desktop: fixed 360 box; mobile: fluid full-width 9:16) */
// function InlineHeroReels({
//   videos,
//   fixed = false,
//   className = "",
// }: {
//   videos: { src: string; poster?: string }[];
//   fixed?: boolean; // true for 360x360 box (desktop hero slot)
//   className?: string;
// }) {
//   const [i, setI] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [needTap, setNeedTap] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const vref = useRef<HTMLVideoElement | null>(null);
//   const hostRef = useRef<HTMLDivElement | null>(null);

//   // Only autoplay when visible
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

//   // Attempt autoplay on index/visibility change
//   useEffect(() => {
//     const v = vref.current;
//     if (!v || !visible) return;
//     setNeedTap(false);
//     v.muted = true;
//     v.playsInline = true;
//     const tryPlay = () => v.play().catch(() => setNeedTap(true));
//     if (v.readyState >= 2) tryPlay();
//     else {
//       const on = () => {
//         v.removeEventListener("canplay", on);
//         tryPlay();
//       };
//       v.addEventListener("canplay", on);
//       return () => v.removeEventListener("canplay", on);
//     }
//   }, [i, visible]);

//   // Auto advance every 7s (pause on hover)
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
//       className={
//         "relative rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur " +
//         (fixed ? "" : "w-full aspect-[9/16]") + // fluid vertical on mobile
//         " " +
//         className
//       }
//       style={fixed ? { width: 360, height: 360 } : undefined}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       onPointerDown={() => {
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
//         onError={next}
//       />

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

// export default function Home() {
//   const [i, setI] = useState(0);
//   const [gallery, setGallery] = useState<GalleryItem[]>([]);
//   const [reels, setReels] = useState<ReelItem[]>([]);

//   // Rotate hero background
//   useEffect(() => {
//     const id = setInterval(() => setI((p) => (p + 1) % HERO.length), 4000);
//     return () => clearInterval(id);
//   }, []);

//   // Load images + reels
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
//       {/* HERO (desktop keeps side panels; mobile shows only the background + title) */}
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
//         LEFT (desktop only): reels fixed box
//         {reels.length > 0 && (
//           <div className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-50">
//             <InlineHeroReels videos={reels} fixed />
//           </div>
//         )}
//         {/* RIGHT (desktop only): Facebook page fixed box */}
//         <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10">
//           <FacebookPageEmbedShell />
//         </div>
//       </section>

//       {/* HEADER */}
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

//       {/* WELCOME + GALLERY */}
//       {/* WELCOME + GALLERY */}
//       {/* FEATURED BAND + WELCOME CARD */}
//       <section className="w-full bg-sky-50">
//         {/* Full-bleed slideshow (edge-to-edge) */}
//         <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
//           <GalleryCarousel slides={FEATURED_SLIDES} ratio="aspect-[16/9]" />
//         </div>

//         {/* White space between band and text */}
//         <div className="mx-auto max-w-6xl px-4 pt-10 pb-8">
//           <div className="rounded-3xl shadow-lg bg-white p-6 md:p-10">
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

//       {/* MOBILE STACKED EMBEDS */}
//       <section className="md:hidden mx-auto max-w-6xl px-4 space-y-6 mt-6">
//         {reels.length > 0 && (
//           <div className="rounded-2xl overflow-hidden shadow">
//             {/* Fluid 9:16 reels on mobile */}
//             <InlineHeroReels videos={reels} />
//           </div>
//         )}
//         <div className="rounded-2xl overflow-hidden shadow">
//           {/* Responsive FB embed (auto-width) */}
//           <FacebookPageEmbed
//             height={520}
//             smallHeader={false}
//             hideCover={false}
//             responsive
//           />
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="mt-16 border-t border-sky-200">
//         <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
//           © {new Date().getFullYear()} Dolphin Fun &amp; Food
//         </div>
//       </footer>
//     </main>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// code below without caption with static images
// // src/app/page.tsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import FacebookPageEmbed from "./components/FacebookPageEmbed";
// import GalleryCarousel from "./components/GalleryCarousel";

// import FacebookPageEmbedShell from "./components/FacebookPageEmbedShell";

// type GalleryItem = { src: string; alt?: string };
// type ReelItem = { src: string; poster?: string };

// const HERO = [
//   { src: "/images/gallery/baloon-01.jpg", alt: "Balloon decor — entrance" },
//   { src: "/images/gallery/baloon-02.jpg", alt: "Balloon arch — celebration" },
// ];

// /** Reels slider (desktop: fixed 360 box; mobile: fluid full-width 9:16) */
// function InlineHeroReels({
//   videos,
//   fixed = false,
//   className = "",
// }: {
//   videos: { src: string; poster?: string }[];
//   fixed?: boolean; // true for 360x360 box (desktop hero slot)
//   className?: string;
// }) {
//   const [i, setI] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [needTap, setNeedTap] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const vref = useRef<HTMLVideoElement | null>(null);
//   const hostRef = useRef<HTMLDivElement | null>(null);

//   // Only autoplay when visible
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

//   // Attempt autoplay on index/visibility change
//   useEffect(() => {
//     const v = vref.current;
//     if (!v || !visible) return;
//     setNeedTap(false);
//     v.muted = true;
//     v.playsInline = true;
//     const tryPlay = () => v.play().catch(() => setNeedTap(true));
//     if (v.readyState >= 2) tryPlay();
//     else {
//       const on = () => {
//         v.removeEventListener("canplay", on);
//         tryPlay();
//       };
//       v.addEventListener("canplay", on);
//       return () => v.removeEventListener("canplay", on);
//     }
//   }, [i, visible]);

//   // Auto advance every 7s (pause on hover)
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
//       className={
//         "relative rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur " +
//         (fixed ? "" : "w-full aspect-[9/16]") + // fluid vertical on mobile
//         " " +
//         className
//       }
//       style={fixed ? { width: 360, height: 360 } : undefined}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       onPointerDown={() => {
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
//         onError={next}
//       />

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

// export default function Home() {
//   const [i, setI] = useState(0);
//   const [gallery, setGallery] = useState<GalleryItem[]>([]);
//   const [reels, setReels] = useState<ReelItem[]>([]);

//   // Rotate hero background
//   useEffect(() => {
//     const id = setInterval(() => setI((p) => (p + 1) % HERO.length), 4000);
//     return () => clearInterval(id);
//   }, []);

//   // Load images + reels
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
//       {/* HERO (desktop keeps side panels; mobile shows only the background + title) */}
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

//         {/* LEFT (desktop only): reels fixed box */}
//         {reels.length > 0 && (
//           <div className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-50">
//             <InlineHeroReels videos={reels} fixed />
//           </div>
//         )}

//         {/* RIGHT (desktop only): Facebook page fixed box */}
//         <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10">
//           <FacebookPageEmbedShell />
//         </div>
//       </section>

//       {/* HEADER */}
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

//       {/* WELCOME + GALLERY */}
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

//       {/* MOBILE STACKED EMBEDS */}
//       <section className="md:hidden mx-auto max-w-6xl px-4 space-y-6 mt-6">
//         {reels.length > 0 && (
//           <div className="rounded-2xl overflow-hidden shadow">
//             {/* Fluid 9:16 reels on mobile */}
//             <InlineHeroReels videos={reels} />
//           </div>
//         )}
//         <div className="rounded-2xl overflow-hidden shadow">
//           {/* Responsive FB embed (auto-width) */}
//           <FacebookPageEmbed
//             height={520}
//             smallHeader={false}
//             hideCover={false}
//             responsive
//           />
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="mt-16 border-t border-sky-200">
//         <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
//           © {new Date().getFullYear()} Dolphin Fun &amp; Food
//         </div>
//       </footer>
//     </main>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// CODE BELOW WITH TAPBABLE FACEBOOK PAGE
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

// /** Reels slider (desktop: fixed 360 box; mobile: fluid full-width 9:16) */
// function InlineHeroReels({
//   videos,
//   fixed = false,
//   className = "",
// }: {
//   videos: { src: string; poster?: string }[];
//   fixed?: boolean; // true for 360x360 box (desktop hero slot)
//   className?: string;
// }) {
//   const [i, setI] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [needTap, setNeedTap] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const vref = useRef<HTMLVideoElement | null>(null);
//   const hostRef = useRef<HTMLDivElement | null>(null);

//   // Only autoplay when visible
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

//   // Attempt autoplay on index/visibility change
//   useEffect(() => {
//     const v = vref.current;
//     if (!v || !visible) return;
//     setNeedTap(false);
//     v.muted = true;
//     v.playsInline = true;
//     const tryPlay = () => v.play().catch(() => setNeedTap(true));
//     if (v.readyState >= 2) tryPlay();
//     else {
//       const on = () => {
//         v.removeEventListener("canplay", on);
//         tryPlay();
//       };
//       v.addEventListener("canplay", on);
//       return () => v.removeEventListener("canplay", on);
//     }
//   }, [i, visible]);

//   // Auto advance every 7s (pause on hover)
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
//       className={
//         "relative rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur " +
//         (fixed ? "" : "w-full aspect-[9/16]") + // fluid vertical on mobile
//         " " +
//         className
//       }
//       style={fixed ? { width: 360, height: 360 } : undefined}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       onPointerDown={() => {
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
//         onError={next}
//       />

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

// export default function Home() {
//   const [i, setI] = useState(0);
//   const [gallery, setGallery] = useState<GalleryItem[]>([]);
//   const [reels, setReels] = useState<ReelItem[]>([]);

//   // Rotate hero background
//   useEffect(() => {
//     const id = setInterval(() => setI((p) => (p + 1) % HERO.length), 4000);
//     return () => clearInterval(id);
//   }, []);

//   // Load images + reels
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
//       {/* HERO (desktop keeps side panels; mobile shows only the background + title) */}
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

//         {/* LEFT (desktop only): reels fixed box */}
//         {reels.length > 0 && (
//           <div className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-50">
//             <InlineHeroReels videos={reels} fixed />
//           </div>
//         )}

//         {/* RIGHT (desktop only): Facebook page fixed box */}
//         <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10">
//           <div className="rounded-2xl bg-white/80 backdrop-blur p-3 shadow-xl">
//             <FacebookPageEmbed
//               width={360}
//               height={500}
//               smallHeader={false}
//               hideCover={false}
//             />
//           </div>
//         </div>
//       </section>

//       {/* HEADER */}
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

//       {/* WELCOME + GALLERY */}
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

//       {/* MOBILE STACKED EMBEDS */}
//       <section className="md:hidden mx-auto max-w-6xl px-4 space-y-6 mt-6">
//         {reels.length > 0 && (
//           <div className="rounded-2xl overflow-hidden shadow">
//             {/* Fluid 9:16 reels on mobile */}
//             <InlineHeroReels videos={reels} />
//           </div>
//         )}
//         <div className="rounded-2xl overflow-hidden shadow">
//           {/* Responsive FB embed (auto-width) */}
//           <FacebookPageEmbed
//             height={520}
//             smallHeader={false}
//             hideCover={false}
//             responsive
//           />
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="mt-16 border-t border-sky-200">
//         <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
//           © {new Date().getFullYear()} Dolphin Fun &amp; Food
//         </div>
//       </footer>
//     </main>
//   );
// }
