"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function HeroSwiper({
  slides,
}: {
  slides: { src: string; alt?: string }[];
}) {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination, EffectFade]}
      loop={true}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      navigation={true}
      pagination={{ clickable: true }}
      slidesPerView={1}
      className="group" 
    >
      {slides.map((img, index) => (
        <SwiperSlide key={img.src}>
          <div className="w-full aspect-[16/9] relative bg-black">
            <Image
              src={img.src}
              alt={img.alt || ""}
              fill
              priority={index === 0}
              className="object-cover opacity-90"
            />
            {/* Dark gradient overlay for better text/controls visibility if needed, 
                though global css usually handles arrows. 
                We add global style overrides for swiper-button-prev/next to be white 
                via Tailwind arbitrary modifiers or global css, but inline style works too.
            */}
          </div>
        </SwiperSlide>
      ))}
      
      {/* Custom Styles for Swiper Controls - making them white and drop-shadowed, identifying via class names.
          Note: Swiper puts elements inside .swiper container. We target them with [&_...] selector on the main component.
      */}
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: white !important;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
          transition: opacity 0.3s;
        }
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.7) !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: white !important;
          opacity: 1;
        }
        
        /* Mobile: Hide arrows */
        @media (max-width: 768px) {
           .swiper-button-prev,
           .swiper-button-next {
             display: none !important;
           }
        }
      `}</style>
    </Swiper>
  );
}
