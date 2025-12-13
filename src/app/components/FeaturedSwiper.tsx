"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

type FeaturedSlide = {
  src: string;
  alt?: string;
  tagline: string;
};

export default function FeaturedSwiper({
  slides,
}: {
  slides: FeaturedSlide[];
}) {
  return (
    <section className="py-10 bg-sky-50">
      <div className="mx-auto max-w-6xl px-4">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          loop
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center">
                {/* card image */}
                <div className="relative w-full pb-[125%] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={slide.src}
                    alt={slide.alt || ""}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* text panel */}
                <div className="mt-4 w-full px-2 text-center">
                  <div className="rounded-2xl bg-sky-800 text-white p-4 shadow-lg">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-100/80">
                      Dolphin Fun &amp; Food
                    </p>
                    <h3 className="mt-2 text-lg font-semibold">
                      {slide.tagline}
                    </h3>
                    <p className="mt-2 text-sm text-sky-100/90">
                      NH-44, Ganaur — Food • Family • Full-on Fun
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
