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
  "pic-19.jpg",
  "pic-20.png",
  "pic-21.png",
  "pic-22.png",
  "pic-23.png",
  "pic-24.png",
  "pic-25.png",
  "pic-26.jpg",
  "pic-27.jpg",
  "pic-28.jpg",
  "pic-29.jpg",
  "pic-30.jpg",
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
  "pic-51.jpg",
  "pic-52.jpg",
  "pic-53.jpg",
  "pic-54.jpg",
  "pic-55.jpg",
  "pic-56.jpg",
  "pic-57.jpg",
  "pic-58.jpg",
  "pic-59.jpg",
  "pic-60.jpg",
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
  "pic-19.jpg",
  "pic-20.jpg",
  "pic-21.jpg",
  "pic-22.png",
  "pic-23.jpg",
  "pic-24.jpg",
  "pic-25.png",
  "pic-26.jpg",
  "pic-27.jpg",
  "pic-28.jpg",
  "pic-29.jpg",
  "pic-30.jpg",
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
  "pic-51.jpg",
  "pic-52.jpg",
  "pic-53.jpg",
  "pic-54.jpg",
  "pic-55.jpg",
  "pic-56.jpg",
  "pic-57.jpg",
  "pic-58.jpg",
  "pic-59.jpg",
  "pic-60.jpg",
  "pic-61.jpg",
  "pic-62.jpg",
  "pic-63.jpg",
  "pic-64.jpg",
  "pic-65.jpg",
  "pic-66.jpg",
  "pic-67.jpg",
  "pic-68.jpg",
  "pic-69.jpg",
  "pic-70.jpg",
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
      7000
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
              Restaurant • Banquets • upcoming 8-acre Water Park
            </p>
            <p className="mt-1 text-sm md:text-base text-sky-100">
              Murthal’s New Destination for Food, Fun &amp; Family!
            </p>
          </div>

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
            Now open on NH-44 at Ganaur — Murthal&rsquo;s new destination
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
                priority={g3Index === 0}
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
