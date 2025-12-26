"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSwiper({
  slides,
}: {
  slides: { src: string; alt?: string }[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image Overlay - Darker for better text contrast */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#003B5C]/50 via-transparent to-[#003B5C]/90 z-10" />

      {/* Background Images Carousel */}
      {slides.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`relative w-full h-full ${
              index === currentImageIndex ? "animate-slow-zoom" : ""
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt || "Hero Image"}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-20">
        <span className="inline-block py-1 px-3 rounded-full bg-black/30 backdrop-blur-md text-white/90 text-sm font-semibold mb-6 tracking-wider uppercase border border-white/20 shadow-sm">
          The Ultimate Family Destination
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
          Dive into <span className="text-[#00EAFF] drop-shadow-md">Fun</span>,
          <br />
          Feast on <span className="text-[#FF9900] drop-shadow-md">Flavours</span>.
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg">
          Experience the region&apos;s largest water park, fine dining, and endless
          entertainment all in one vibrant place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#location-map"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('location-map');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#FF9900] text-[#003B5C] px-8 py-4 rounded-full font-bold text-lg shadow-xl flex items-center gap-2 w-full sm:w-auto justify-center border-2 border-transparent hover:scale-105 transition-transform"
          >
            {/* MapPin Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Get Directions
          </a>
          <Link 
            href="/menu-image"
            className="bg-[#003B5C]/80 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#003B5C] transition-all flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg hover:scale-105"
          >
            {/* Utensils Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M7 2v20" />
              <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
            </svg>
            View Menu
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-6 h-6 text-white/50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes slow-zoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// "use client";

// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules"; 
// import "swiper/css";
// import "swiper/css/autoplay";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade";

// export default function HeroSwiper({
//   slides,
// }: {
//   slides: { src: string; alt?: string }[];
// }) {
//   return (
//     <Swiper
//       modules={[Autoplay, Navigation, Pagination, EffectFade]}
//       loop={true}
//       effect="fade"
//       fadeEffect={{ crossFade: true }}
//       autoplay={{
//         delay: 5000,
//         disableOnInteraction: false,
//         pauseOnMouseEnter: true,
//       }}
//       navigation={true}
//       pagination={{ clickable: true }}
//       slidesPerView={1}
//       className="group" 
//     >
//       {slides.map((img, index) => (
//         <SwiperSlide key={img.src}>
//           <div className="w-full aspect-[16/9] relative bg-black">
//             <Image
//               src={img.src}
//               alt={img.alt || ""}
//               fill
//               priority={index === 0}
//               className="object-cover opacity-90"
//             />
//             {/* Dark gradient overlay for better text/controls visibility if needed, 
//                 though global css usually handles arrows. 
//                 We add global style overrides for swiper-button-prev/next to be white 
//                 via Tailwind arbitrary modifiers or global css, but inline style works too.
//             */}
//           </div>
//         </SwiperSlide>
//       ))}
      
//       {/* Custom Styles for Swiper Controls - making them white and drop-shadowed, identifying via class names.
//           Note: Swiper puts elements inside .swiper container. We target them with [&_...] selector on the main component.
//       */}
//       <style jsx global>{`
//         .swiper-button-prev,
//         .swiper-button-next {
//           color: white !important;
//           text-shadow: 0 1px 3px rgba(0,0,0,0.5);
//           transition: opacity 0.3s;
//         }
//         .swiper-pagination-bullet {
//           background: rgba(255,255,255,0.7) !important;
//           opacity: 0.5;
//         }
//         .swiper-pagination-bullet-active {
//           background: white !important;
//           opacity: 1;
//         }
        
//         /* Mobile: Hide arrows */
//         @media (max-width: 768px) {
//            .swiper-button-prev,
//            .swiper-button-next {
//              display: none !important;
//            }
//         }
//       `}</style>
//     </Swiper>
//   );
// }
