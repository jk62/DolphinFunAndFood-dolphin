// app/components/GalleryCarousel.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Updated Slide type to match the new content structure
type Slide = {
  src: string;
  alt?: string;
  tagline?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
};

export default function GalleryCarousel({
  slides,
  interval = 4000,
  ratio = "aspect-[16/9]", // wide band
}: {
  slides: Slide[];
  interval?: number;
  ratio?: string;
}) {
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // ▶ Auto-advance, works for ANY number of slides ≥ 2
  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    if (!slides || slides.length < 2) return;

    timer.current = setInterval(
      () => setI((p) => (p + 1) % slides.length),
      interval
    );

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [slides.length, interval]);

  if (!slides || slides.length === 0) return null;

  //-------------------------------------------------------------------
  return (
    <div className={`relative overflow-hidden ${ratio}`}>
      {slides.map((s, idx) => (
        <div
          key={s.src + idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* MAIN FLEX ROW */}
          <div className="relative w-full h-full flex items-center justify-center px-4 md:px-12">
            {/* CAPTION CARD */}
            <div
              className="
              relative z-10
              bg-sky-700 text-white
              w-[min(75%,_720px)]
              h-[50%] md:h-[75%]          /* caption card height */
              -mt-8 md:-mt-24             /* lift card so top is above image top */
              mb-4 md:mb-16
              mr-[-3.5rem] md:mr-[-4.5rem]/* slide under image from the left */
              rounded-3xl shadow-lg
              pl-8 pr-12 py-6 md:pl-10 md:pr-16 md:py-8
              flex flex-col justify-center
            "
            >
              {s.title && (
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  {s.title}
                </h2>
              )}

              {s.description && (
                <p className="text-base md:text-lg mb-4 last:mb-0">
                  {s.description}
                </p>
              )}

              {!s.title && !s.description && s.tagline && (
                <p className="text-xl md:text-3xl font-semibold mb-0">
                  {s.tagline}
                </p>
              )}

              {!s.title && !s.description && !s.tagline && (
                <>
                  <h2 className="text-2xl md:text-4xl font-bold mb-4">
                    Default Title Text
                  </h2>
                  <p className="text-base md:text-lg mb-0">
                    This is some default description text. Please provide title,
                    description, or tagline via props.
                  </p>
                </>
              )}

              {s.buttonText && s.buttonLink && (
                <a
                  href={s.buttonLink}
                  className="mt-6 px-6 py-3 bg-white text-sky-700 font-semibold rounded-md self-start hover:bg-gray-100 transition-colors"
                >
                  {s.buttonText}
                </a>
              )}
            </div>

            {/* IMAGE CARD – unchanged */}
            <div
              className="
              relative z-20
              w-full max-w-3xl
              h-[70%] md:h-[80%]
              rounded-3xl overflow-hidden shadow-xl
            "
            >
              <Image
                src={s.src}
                alt={s.alt ?? s.title ?? "Dolphin Fun & Food"}
                fill
                sizes="100vw"
                priority={idx === i}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            aria-label="Previous image"
            onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-3 py-1 z-30 hover:bg-black/60 transition-colors"
          >
            ‹
          </button>
          <button
            aria-label="Next image"
            onClick={() => setI((p) => (p + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-3 py-1 z-30 hover:bg-black/60 transition-colors"
          >
            ›
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-30">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 w-5 rounded-full ${
                  idx === i ? "bg-white" : "bg-white/60"
                } cursor-pointer hover:bg-white/80 transition-colors`}
                onClick={() => setI(idx)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // app/components/GalleryCarousel.tsx
// "use client";

// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

// type Slide = { src: string; alt?: string; tagline?: string };

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

//   return (
//     <div className={`relative overflow-hidden ${ratio}`}>
//       {/* Slides with fade transition */}
//       {slides.map((s, idx) => (
//         <div
//           key={s.src + idx}
//           className={`absolute inset-0 transition-opacity duration-700 ${
//             idx === i ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <div className="flex h-full flex-col md:flex-row bg-sky-700 text-white">
//             {/* LEFT: tagline */}
//             <div className="flex-1 flex items-center justify-center px-6 md:px-10 py-8">
//               <p className="text-xl md:text-3xl font-semibold text-center md:text-left max-w-md">
//                 {s.tagline ?? "Fresh moments at Dolphin Fun & Food."}
//               </p>
//             </div>

//             {/* thin vertical white gap */}
//             <div className="hidden md:block w-[1px] bg-white/70 my-6" />

//             {/* RIGHT: image (no cropping) */}
//             <div className="flex-1 relative bg-sky-900">
//               <Image
//                 src={s.src}
//                 alt={s.alt ?? "Dolphin Fun & Food"}
//                 fill
//                 sizes="100vw"
//                 priority={idx === i}
//                 className="object-contain"
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Arrows */}
//       {slides.length > 1 && (
//         <>
//           <button
//             aria-label="Previous image"
//             onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
//             className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-3 py-1"
//           >
//             ‹
//           </button>
//           <button
//             aria-label="Next image"
//             onClick={() => setI((p) => (p + 1) % slides.length)}
//             className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-3 py-1"
//           >
//             ›
//           </button>

//           {/* Dots */}
//           <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
//             {slides.map((_, idx) => (
//               <span
//                 key={idx}
//                 className={`h-1.5 w-5 rounded-full ${
//                   idx === i ? "bg-white" : "bg-white/60"
//                 }`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // app/components/GalleryCarousel.tsx
// "use client";

// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

// // ⬅️ add optional `tagline`
// type Slide = { src: string; alt?: string; tagline?: string };

// export default function GalleryCarousel({
//   slides,
//   interval = 4000,
//   ratio = "aspect-[16/9]", // a bit wider for text + image
// }: {
//   slides: Slide[];
//   interval?: number;
//   ratio?: string; // Tailwind aspect class
// }) {
//   const [i, setI] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const timer = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (paused || slides.length < 2) return;
//     timer.current = setInterval(
//       () => setI((p) => (p + 1) % slides.length),
//       interval
//     );
//     return () => {
//       if (timer.current) clearInterval(timer.current);
//     };
//   }, [paused, slides.length, interval]);

//   if (!slides.length) return null;

//   return (
//     <div
//       className={`relative overflow-hidden rounded-3xl bg-white ${ratio}`}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       {/* Slides */}
//       {slides.map((s, idx) => (
//         <div
//           key={s.src + idx}
//           className={`absolute inset-0 transition-opacity duration-700 ${
//             idx === i ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           {/* FLEX LAYOUT: text left, image right */}
//           <div className="flex h-full flex-col md:flex-row">
//             {/* LEFT: text block */}
//             <div className="w-full md:w-2/5 bg-sky-900/90 text-white p-6 md:p-10 flex items-center justify-center">
//               <p className="text-xl md:text-2xl font-semibold text-center leading-relaxed">
//                 {s.tagline ?? "Dolphin Fun &amp; Food — moments to remember."}
//               </p>
//             </div>

//             {/* RIGHT: image */}
//             <div className="relative w-full md:w-3/5">
//               <Image
//                 src={s.src}
//                 alt={s.alt ?? "Dolphin Fun & Food"}
//                 fill
//                 sizes="100vw"
//                 className="object-cover"
//                 priority={idx === i}
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Arrows */}
//       {slides.length > 1 && (
//         <>
//           <button
//             aria-label="Previous image"
//             onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
//             className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1"
//           >
//             ‹
//           </button>
//           <button
//             aria-label="Next image"
//             onClick={() => setI((p) => (p + 1) % slides.length)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1"
//           >
//             ›
//           </button>

//           {/* Dots */}
//           <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
//             {slides.map((_, idx) => (
//               <span
//                 key={idx}
//                 className={`h-1.5 w-5 rounded-full ${
//                   idx === i ? "bg-white" : "bg-white/60"
//                 }`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// code below without caption
// // app/components/GalleryCarousel.tsx
// "use client";

// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

// type Slide = { src: string; alt?: string };

// export default function GalleryCarousel({
//   slides,
//   interval = 4000,
//   ratio = "aspect-[5/2]", // ~2.5:1 banner-ish
// }: {
//   slides: Slide[];
//   interval?: number;
//   ratio?: string; // Tailwind aspect class
// }) {
//   const [i, setI] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const timer = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (paused || slides.length < 2) return;
//     timer.current = setInterval(
//       () => setI((p) => (p + 1) % slides.length),
//       interval
//     );
//     return () => {
//       if (timer.current) clearInterval(timer.current);
//     };
//   }, [paused, slides.length, interval]);

//   if (!slides.length) return null;

//   return (
//     <div
//       className={`relative overflow-hidden ${ratio}`}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       {/* Slides */}
//       {slides.map((s, idx) => (
//         <div
//           key={s.src + idx}
//           className={`absolute inset-0 transition-opacity duration-700 ${
//             idx === i ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <Image
//             src={s.src}
//             alt={s.alt ?? "Dolphin Fun & Food"}
//             fill
//             sizes="100vw"
//             priority={idx === i}
//             className="object-cover"
//           />
//         </div>
//       ))}

//       {/* Arrows */}
//       {slides.length > 1 && (
//         <>
//           <button
//             aria-label="Previous image"
//             onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
//             className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1"
//           >
//             ‹
//           </button>
//           <button
//             aria-label="Next image"
//             onClick={() => setI((p) => (p + 1) % slides.length)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1"
//           >
//             ›
//           </button>

//           {/* Dots */}
//           <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
//             {slides.map((_, idx) => (
//               <span
//                 key={idx}
//                 className={`h-1.5 w-5 rounded-full ${
//                   idx === i ? "bg-white" : "bg-white/60"
//                 }`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
