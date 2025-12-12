"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Slide = {
  src: string;
  alt?: string;
  tagline: string;
};

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function GalleryCarousel({
  slides,
  ratio = "aspect-[16/9]",
}: {
  slides: Slide[];
  ratio?: string;
}) {
  const TOTAL = slides.length;

  // responsive: 1-up on mobile, 3-up on md+
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setPerPage(mq.matches ? 3 : 1);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const pages = useMemo(() => {
    if (!TOTAL) return [];
    const pg = chunk(slides, perPage);
    // If last page is short, wrap-fill from the start (so desktop always looks full)
    if (pg.length && pg[pg.length - 1].length < perPage) {
      const need = perPage - pg[pg.length - 1].length;
      pg[pg.length - 1] = [...pg[pg.length - 1], ...slides.slice(0, need)];
    }
    return pg;
  }, [slides, perPage, TOTAL]);

  const PAGE_TOTAL = pages.length;

  // hooks must always run
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // seamless loop: clone first page at end
  const CLONED_PAGES = PAGE_TOTAL > 0 ? [...pages, pages[0]] : pages;

  // auto-advance
  useEffect(() => {
    if (PAGE_TOTAL === 0) return;
    const id = setInterval(() => {
      setIsTransitioning(true);
      setIndex((p) => p + 1);
    }, 8000);
    return () => clearInterval(id);
  }, [PAGE_TOTAL]);

  // jump back when hitting cloned page
  useEffect(() => {
    if (PAGE_TOTAL === 0) return;
    const lastIndex = CLONED_PAGES.length - 1;

    if (index === lastIndex) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(0);
      }, 700);
      return () => clearTimeout(t);
    } else {
      setIsTransitioning(true);
    }
  }, [index, PAGE_TOTAL, CLONED_PAGES.length]);

  if (PAGE_TOTAL === 0) return null;

  const logicalIndex =
    index === CLONED_PAGES.length - 1 ? 0 : Math.min(index, PAGE_TOTAL - 1);

  const goBy = (delta: number) => {
    setIsTransitioning(true);
    let next = logicalIndex + delta;
    if (next < 0) next = PAGE_TOTAL - 1;
    if (next >= PAGE_TOTAL) next = 0;
    setIndex(next);
  };

  const goTo = (target: number) => {
    setIsTransitioning(true);
    setIndex(target);
  };

  return (
    <section className="bg-sky-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className={`relative w-full ${ratio}`}>
          {/* base panel */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.20)]" />

          {/* viewport */}
          <div className="relative h-full overflow-hidden rounded-[2.5rem]">
            <div
              className={
                "flex h-full w-full " +
                (isTransitioning
                  ? "transition-transform duration-700 ease-out"
                  : "")
              }
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {CLONED_PAGES.map((page, pIdx) => (
                <div
                  key={pIdx}
                  className="w-full shrink-0 h-full px-5 py-6 md:px-10 md:py-10"
                >
                  <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {page.map((slide, sIdx) => (
                      <div key={slide.src + sIdx} className="h-full">
                        {/* CARD with overlap */}
                        <div className="relative h-full rounded-[2rem] bg-transparent">
                          {/* IMAGE */}
                          <div className="relative overflow-hidden rounded-[2rem] shadow-xl">
                            {/* <div className="relative aspect-[4/3]"> */}
                            {/* <div className="relative aspect-[16/11] md:aspect-[16/10]"> */}
                            <div className="relative aspect-[3/4] md:aspect-[4/5]">
                              <Image
                                src={slide.src}
                                alt={slide.alt || "Dolphin Fun & Food"}
                                fill
                                sizes="(min-width: 768px) 33vw, 100vw"
                                // className="object-cover"
                                className="object-cover object-top"
                                priority={pIdx === 0 && sIdx === 0}
                              />
                            </div>
                          </div>

                          {/* TEXT PANEL (overlapping) */}
                          {/* <div className="relative -mt-6 md:-mt-8 px-3"> */}
                          <div className="relative -mt-3 md:-mt-5 px-3">
                            <div className="rounded-[1.75rem] bg-sky-800 text-white shadow-2xl p-5 md:p-6">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-100/80">
                                Dolphin Fun &amp; Food
                              </p>
                              <h3 className="mt-2 text-lg md:text-xl font-semibold leading-snug">
                                {slide.tagline}
                              </h3>
                              <p className="mt-2 text-sm text-sky-100/90">
                                NH-44, Ganaur — Food • Family • Full-on Fun
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* arrows */}
            {PAGE_TOTAL > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => goBy(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white shadow"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => goBy(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white shadow"
                >
                  ›
                </button>
              </>
            )}

            {/* dots */}
            {PAGE_TOTAL > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {pages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    className={
                      "h-1.5 w-6 rounded-full border border-white/40 transition " +
                      (i === logicalIndex ? "bg-sky-700" : "bg-sky-300/70")
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
// //
// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";

// type Slide = {
//   src: string;
//   alt?: string;
//   tagline: string;
// };

// export default function GalleryCarousel({
//   slides,
//   ratio = "aspect-[16/9]",
// }: {
//   slides: Slide[];
//   ratio?: string;
// }) {
//   const TOTAL = slides.length;

//   // hooks must always run in same order
//   const [index, setIndex] = useState(0); // index in the track
//   const [isTransitioning, setIsTransitioning] = useState(true);

//   // add a cloned first slide at the end for seamless loop
//   const CLONED_SLIDES = TOTAL > 0 ? [...slides, slides[0]] : slides;

//   // auto-advance every 8s
//   useEffect(() => {
//     if (TOTAL === 0) return;

//     const id = setInterval(() => {
//       setIsTransitioning(true);
//       setIndex((prev) => prev + 1);
//     }, 8000);

//     return () => clearInterval(id);
//   }, [TOTAL]);

//   // when we reach the cloned slide, jump back to 0 with no animation
//   useEffect(() => {
//     if (TOTAL === 0) return;

//     const lastIndex = CLONED_SLIDES.length - 1;

//     if (index === lastIndex) {
//       const timeout = setTimeout(() => {
//         setIsTransitioning(false); // disable transition for the jump
//         setIndex(0); // jump to real first slide
//       }, 700); // matches duration-700 below

//       return () => clearTimeout(timeout);
//     } else {
//       setIsTransitioning(true);
//     }
//   }, [index, TOTAL, CLONED_SLIDES.length]);

//   if (TOTAL === 0) return null;

//   // logical index ignoring the cloned slide
//   const logicalIndex =
//     index === CLONED_SLIDES.length - 1 ? 0 : Math.min(index, TOTAL - 1);

//   const goBy = (delta: number) => {
//     if (TOTAL === 0) return;
//     setIsTransitioning(true);

//     let next = logicalIndex + delta;
//     if (next < 0) next = TOTAL - 1;
//     if (next >= TOTAL) next = 0;

//     setIndex(next);
//   };

//   const goTo = (target: number) => {
//     if (TOTAL === 0) return;
//     setIsTransitioning(true);
//     setIndex(target);
//   };

//   return (
//     <section className="bg-sky-50 py-10">
//       <div className="mx-auto max-w-6xl px-4">
//         <div className={`relative w-full ${ratio}`}>
//           {/* base panel */}
//           <div className="absolute inset-0 rounded-[2.5rem] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.25)]" />

//           {/* slider viewport */}
//           <div className="relative h-full overflow-hidden rounded-[2.5rem]">
//             <div
//               className={
//                 "flex h-full w-full " +
//                 (isTransitioning
//                   ? "transition-transform duration-700 ease-out"
//                   : "")
//               }
//               style={{ transform: `translateX(-${index * 100}%)` }}
//             >
//               {CLONED_SLIDES.map((slide, idx) => (
//                 <div
//                   key={idx}
//                   className="flex w-full shrink-0 flex-col items-stretch gap-6 px-6 py-6 md:flex-row md:px-10 md:py-8"
//                 >
//                   {/* LEFT: blue text card */}
//                   <div className="relative z-10 flex-1 max-w-xl rounded-[2rem] bg-sky-700 px-6 py-8 text-white shadow-xl md:px-8 md:py-10">
//                     <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-100/80">
//                       Dolphin Fun &amp; Food
//                     </p>
//                     <h2 className="mt-3 text-2xl font-semibold leading-snug md:text-3xl lg:text-4xl">
//                       {slide.tagline}
//                     </h2>
//                     <p className="mt-4 text-sm text-sky-100/90 md:text-base">
//                       Food, family, and full-on fun on NH-44 at Ganaur.
//                     </p>
//                   </div>

//                   {/* RIGHT: overlapping photo card */}
//                   <div className="relative flex-1 md:-ml-10">
//                     <div className="relative h-[220px] w-full overflow-hidden rounded-[2rem] shadow-xl md:h-full">
//                       <Image
//                         src={slide.src}
//                         alt={slide.alt || "Dolphin Fun & Food gallery image"}
//                         fill
//                         sizes="(min-width: 1024px) 50vw, 100vw"
//                         className="object-cover"
//                         priority={idx === 0}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* arrows */}
//             {TOTAL > 1 && (
//               <>
//                 <button
//                   type="button"
//                   aria-label="Previous slide"
//                   onClick={() => goBy(-1)}
//                   className="absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow md:flex"
//                 >
//                   ‹
//                 </button>
//                 <button
//                   type="button"
//                   aria-label="Next slide"
//                   onClick={() => goBy(1)}
//                   className="absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow md:flex"
//                 >
//                   ›
//                 </button>
//               </>
//             )}

//             {/* dots */}
//             {TOTAL > 1 && (
//               <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center gap-2">
//                 {slides.map((_, i) => (
//                   <button
//                     key={i}
//                     type="button"
//                     className={
//                       "h-1.5 w-5 rounded-full border border-white/50 transition " +
//                       (i === logicalIndex ? "bg-sky-600" : "bg-sky-300/70")
//                     }
//                     onClick={() => goTo(i)}
//                     // allow clicks
//                     style={{ pointerEvents: "auto" }}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";

// type Slide = {
//   src: string;
//   alt?: string;
//   tagline: string;
// };

// export default function GalleryCarousel({
//   slides,
//   ratio = "aspect-[16/9]",
// }: {
//   slides: Slide[];
//   ratio?: string;
// }) {
//   const [index, setIndex] = useState(0);

//   // auto-advance every 8s
//   useEffect(() => {
//     if (!slides.length) return;
//     const id = setInterval(
//       () => setIndex((prev) => (prev + 1) % slides.length),
//       8000
//     );
//     return () => clearInterval(id);
//   }, [slides.length]);

//   if (!slides.length) return null;

//   const go = (delta: number) => {
//     setIndex((prev) => (prev + delta + slides.length) % slides.length);
//   };

//   return (
//     <section className="bg-sky-50 py-10">
//       <div className="mx-auto max-w-6xl px-4">
//         <div className={`relative w-full ${ratio}`}>
//           {/* base panel */}
//           <div className="absolute inset-0 rounded-[2.5rem] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.25)]" />

//           {/* slider viewport */}
//           <div className="relative h-full overflow-hidden rounded-[2.5rem]">
//             <div
//               className="flex h-full w-full transition-transform duration-700 ease-out"
//               style={{ transform: `translateX(-${index * 100}%)` }}
//             >
//               {slides.map((slide) => (
//                 <div
//                   key={slide.src}
//                   className="flex w-full shrink-0 flex-col items-stretch gap-6 px-6 py-6 md:flex-row md:px-10 md:py-8"
//                 >
//                   {/* LEFT: blue text card */}
//                   <div className="relative z-10 flex-1 max-w-xl rounded-[2rem] bg-sky-700 px-6 py-8 text-white shadow-xl md:px-8 md:py-10">
//                     <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-100/80">
//                       Dolphin Fun &amp; Food
//                     </p>
//                     <h2 className="mt-3 text-2xl font-semibold leading-snug md:text-3xl lg:text-4xl">
//                       {slide.tagline}
//                     </h2>
//                     <p className="mt-4 text-sm text-sky-100/90 md:text-base">
//                       Food, family, and full-on fun on NH-44 at Ganaur.
//                     </p>
//                   </div>

//                   {/* RIGHT: overlapping photo card */}
//                   <div className="relative flex-1 md:-ml-10">
//                     <div className="relative h-[220px] w-full overflow-hidden rounded-[2rem] shadow-xl md:h-full">
//                       <Image
//                         src={slide.src}
//                         alt={slide.alt || "Dolphin Fun & Food gallery image"}
//                         fill
//                         sizes="(min-width: 1024px) 50vw, 100vw"
//                         className="object-cover"
//                         priority={index === 0}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* arrows */}
//             <button
//               type="button"
//               aria-label="Previous slide"
//               onClick={() => go(-1)}
//               className="absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow md:flex"
//             >
//               ‹
//             </button>
//             <button
//               type="button"
//               aria-label="Next slide"
//               onClick={() => go(1)}
//               className="absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow md:flex"
//             >
//               ›
//             </button>

//             {/* dots */}
//             <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center gap-2">
//               {slides.map((_, i) => (
//                 <span
//                   key={i}
//                   className={`h-1.5 w-5 rounded-full transition ${
//                     i === index ? "bg-sky-600" : "bg-sky-300/70"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // app/components/GalleryCarousel.tsx
// "use client";

// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

// // Updated Slide type to match the new content structure
// type Slide = {
//   src: string;
//   alt?: string;
//   tagline?: string;
//   title?: string;
//   description?: string;
//   buttonText?: string;
//   buttonLink?: string;
// };

// export default function GalleryCarousel({
//   slides,
//   interval = 4000,
//   ratio = "aspect-[16/9]", // wide band
// }: {
//   slides: Slide[];
//   interval?: number;
//   ratio?: string;
// }) {
//   const [i, setI] = useState(0);
//   const timer = useRef<ReturnType<typeof setInterval> | null>(null);

//   // ▶ Auto-advance, works for ANY number of slides ≥ 2
//   useEffect(() => {
//     if (timer.current) clearInterval(timer.current);
//     if (!slides || slides.length < 2) return;

//     timer.current = setInterval(
//       () => setI((p) => (p + 1) % slides.length),
//       interval
//     );

//     return () => {
//       if (timer.current) clearInterval(timer.current);
//     };
//   }, [slides.length, interval]);

//   if (!slides || slides.length === 0) return null;

//   //-------------------------------------------------------------------
//   return (
//     <div className={`relative overflow-hidden ${ratio}`}>
//       {slides.map((s, idx) => (
//         <div
//           key={s.src + idx}
//           className={`absolute inset-0 transition-opacity duration-700 ${
//             idx === i ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           {/* MAIN FLEX ROW */}
//           <div className="relative w-full h-full flex items-center justify-center px-4 md:px-12">
//             {/* CAPTION CARD */}
//             <div
//               className="
//               relative z-10
//               bg-sky-700 text-white
//               w-[min(75%,_720px)]
//               h-[50%] md:h-[75%]          /* caption card height */
//               -mt-8 md:-mt-24             /* lift card so top is above image top */
//               mb-4 md:mb-16
//               mr-[-3.5rem] md:mr-[-4.5rem]/* slide under image from the left */
//               rounded-3xl shadow-lg
//               pl-8 pr-12 py-6 md:pl-10 md:pr-16 md:py-8
//               flex flex-col justify-center
//             "
//             >
//               {s.title && (
//                 <h2 className="text-2xl md:text-4xl font-bold mb-4">
//                   {s.title}
//                 </h2>
//               )}

//               {s.description && (
//                 <p className="text-base md:text-lg mb-4 last:mb-0">
//                   {s.description}
//                 </p>
//               )}

//               {!s.title && !s.description && s.tagline && (
//                 <p className="text-xl md:text-3xl font-semibold mb-0">
//                   {s.tagline}
//                 </p>
//               )}

//               {!s.title && !s.description && !s.tagline && (
//                 <>
//                   <h2 className="text-2xl md:text-4xl font-bold mb-4">
//                     Default Title Text
//                   </h2>
//                   <p className="text-base md:text-lg mb-0">
//                     This is some default description text. Please provide title,
//                     description, or tagline via props.
//                   </p>
//                 </>
//               )}

//               {s.buttonText && s.buttonLink && (
//                 <a
//                   href={s.buttonLink}
//                   className="mt-6 px-6 py-3 bg-white text-sky-700 font-semibold rounded-md self-start hover:bg-gray-100 transition-colors"
//                 >
//                   {s.buttonText}
//                 </a>
//               )}
//             </div>

//             {/* IMAGE CARD – unchanged */}
//             <div
//               className="
//               relative z-20
//               w-full max-w-3xl
//               h-[70%] md:h-[80%]
//               rounded-3xl overflow-hidden shadow-xl
//             "
//             >
//               <Image
//                 src={s.src}
//                 alt={s.alt ?? s.title ?? "Dolphin Fun & Food"}
//                 fill
//                 sizes="100vw"
//                 priority={idx === i}
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       {slides.length > 1 && (
//         <>
//           <button
//             aria-label="Previous image"
//             onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
//             className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-3 py-1 z-30 hover:bg-black/60 transition-colors"
//           >
//             ‹
//           </button>
//           <button
//             aria-label="Next image"
//             onClick={() => setI((p) => (p + 1) % slides.length)}
//             className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-3 py-1 z-30 hover:bg-black/60 transition-colors"
//           >
//             ›
//           </button>

//           <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-30">
//             {slides.map((_, idx) => (
//               <span
//                 key={idx}
//                 className={`h-1.5 w-5 rounded-full ${
//                   idx === i ? "bg-white" : "bg-white/60"
//                 } cursor-pointer hover:bg-white/80 transition-colors`}
//                 onClick={() => setI(idx)}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
