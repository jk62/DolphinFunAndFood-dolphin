"use client";

import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

import { Review } from "@/app/reviews/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function VideoCarousel({ reviews }: { reviews: Review[] }) {
  const swiperRef = useRef<SwiperType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!reviews.length) return null;

  return (
    <div ref={containerRef} className="w-full py-8">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={() => {
          // Pause all videos when slide changes
          containerRef.current
            ?.querySelectorAll("video")
            .forEach((video) => video.pause());
        }}
        modules={[Autoplay, Pagination, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full !pb-12"
        breakpoints={{
            320: {
                slidesPerView: 1.2,
            },
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="max-w-xs md:max-w-sm">
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-xl">
               {/* Video Element */}
               {review.videoSrc ? (
                 <video
                   src={review.videoSrc}
                   className="h-full w-full object-cover"
                   controls
                   playsInline
                   onPlay={() => {
                     swiperRef.current?.autoplay.stop();
                   }}
                   onPause={() => {
                     swiperRef.current?.autoplay.start();
                   }}
                   onEnded={() => {
                     swiperRef.current?.autoplay.start();
                   }}
                 />
               ) : (
                 <div className="flex h-full items-center justify-center bg-sky-900 text-white p-6 text-center">
                    <div>
                        <p className="text-xl font-bold mb-2">&quot;{review.text}&quot;</p>
                        <p className="text-sm opacity-80">- {review.name}</p>
                    </div>
                 </div>
               )}
               {/* Overlay Info: Branding */}
               <div className="absolute top-4 left-4 z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/dolphin-logo.jpg" 
                    alt="Logo" 
                    className="h-12 w-12 rounded-full border-2 border-white/50 shadow-md object-cover opacity-90"
                  />
               </div>

               <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
                  <p className="font-bold text-white text-sm md:text-base drop-shadow-md opacity-90">
                    Dolphin Fun & Food
                  </p>
               </div>

               {/* Existing Overlay Info (Name/Rating) - moved up slightly to not overlap text logo */}
               <div className="absolute bottom-12 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white pointer-events-none">
                 <p className="font-medium text-lg">{review.name}</p>
                 <div className="flex text-yellow-400 text-sm">
                   {"★".repeat(review.rating)}
                 </div>
               </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
