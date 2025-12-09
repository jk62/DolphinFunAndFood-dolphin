"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt?: string;
  tagline: string;
};

export default function GalleryCarousel({
  slides,
  ratio = "aspect-[16/9]",
}: {
  slides: Slide[];
  ratio?: string;
}) {
  const [index, setIndex] = useState(0);

  // auto-advance every 8s
  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      8000
    );
    return () => clearInterval(id);
  }, [slides.length]);

  if (!slides.length) return null;

  const go = (delta: number) => {
    setIndex((prev) => (prev + delta + slides.length) % slides.length);
  };

  return (
    <section className="bg-sky-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className={`relative w-full ${ratio}`}>
          {/* base panel */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.25)]" />

          {/* slider viewport */}
          <div className="relative h-full overflow-hidden rounded-[2.5rem]">
            <div
              className="flex h-full w-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.src}
                  className="flex w-full shrink-0 flex-col items-stretch gap-6 px-6 py-6 md:flex-row md:px-10 md:py-8"
                >
                  {/* LEFT: blue text card */}
                  <div className="relative z-10 flex-1 max-w-xl rounded-[2rem] bg-sky-700 px-6 py-8 text-white shadow-xl md:px-8 md:py-10">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-100/80">
                      Dolphin Fun &amp; Food
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold leading-snug md:text-3xl lg:text-4xl">
                      {slide.tagline}
                    </h2>
                    <p className="mt-4 text-sm text-sky-100/90 md:text-base">
                      Food, family, and full-on fun on NH-44 at Ganaur.
                    </p>
                  </div>

                  {/* RIGHT: overlapping photo card */}
                  <div className="relative flex-1 md:-ml-10">
                    <div className="relative h-[220px] w-full overflow-hidden rounded-[2rem] shadow-xl md:h-full">
                      <Image
                        src={slide.src}
                        alt={slide.alt || "Dolphin Fun & Food gallery image"}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* arrows */}
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(-1)}
              className="absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow md:flex"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(1)}
              className="absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow md:flex"
            >
              ›
            </button>

            {/* dots */}
            <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-5 rounded-full transition ${
                    i === index ? "bg-sky-600" : "bg-sky-300/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
