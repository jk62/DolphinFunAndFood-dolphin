"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // correct import path
import "swiper/css";
import "swiper/css/autoplay";

export default function HeroSwiper({
  slides,
}: {
  slides: { src: string; alt?: string }[];
}) {
  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      autoplay={{ delay: 7000, disableOnInteraction: false }}
      slidesPerView={1}
    >
      {slides.map((img) => (
        <SwiperSlide key={img.src}>
          {/* <div className="relative w-full h-[60vh] md:h-[70vh]"> */}
          <div className="w-full aspect-[16/9] relative">
          {/* <div className="relative w-full aspect-[16/9] md:aspect-[21/9]"> */}
            <Image
              src={img.src}
              alt={img.alt || ""}
              fill
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
