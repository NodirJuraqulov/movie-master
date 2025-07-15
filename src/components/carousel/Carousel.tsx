import React, { useState, useEffect, type FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import type { IMovie } from "@/types";
import { Spin } from "antd";

import "./styles.css";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { IMAGE_URL } from "@/const";
import { useNavigate } from "react-router-dom";

interface Props {
  data: undefined | IMovie[];
  isLoading: boolean;
}

const Carousel: FC<Props> = ({ data, isLoading }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);

  useEffect(() => {
    if (mainSwiper && thumbsSwiper && !thumbsSwiper.destroyed) {
      mainSwiper.thumbs.swiper = thumbsSwiper;
      mainSwiper.thumbs.init && mainSwiper.thumbs.init();
      mainSwiper.thumbs.update(true);
    }
  }, [mainSwiper, thumbsSwiper]);

  const navigate = useNavigate();

  return (
    <>
      <Swiper
        onSwiper={setMainSwiper}
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            maxWidth: "1360px",
            height: "640px",
            borderRadius: "12px",
          } as React.CSSProperties
        }
        loop={false}
        spaceBetween={4}
        navigation={true}
        speed={1500}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2 mt-2 relative"
      >
        {isLoading ? (
          <SwiperSlide>
            <div className="w-full h-full bg-slate-200 dark:bg-[#111] text-4xl text-red-500 flex items-center justify-center">
              <Spin tip="Yuklanmoqda..." size="large" />
            </div>
          </SwiperSlide>
        ) : (
          (data ?? []).slice(0, 5).map((m, i) => (
            <SwiperSlide key={i}>
              <img
                src={IMAGE_URL + m.backdrop_path}
                onClick={() => navigate(`/movie/${m.id}`)}
              />
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                <h2 className="text-[32px] leading-[40px] font-medium text-white mb-4">
                  "{m.title}"
                </h2>

                <div className="flex items-center justify-center gap-2 text-white">
                  <p>{m.release_date.split("-")[0]}</p>
                  <p>•</p>
                  <p>{m.genre_ids[0]}</p>
                  <p>•</p>
                  <p>{m.original_language.toUpperCase()}</p>
                  <p>•</p>
                  <p>{m.vote_average}</p>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>

      <div className="w-full flex justify-center">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={false}
          spaceBetween={4}
          slidesPerView="auto"
          freeMode={true}
          slideToClickedSlide={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper mb-[50px] mx-auto mt-4"
          style={{ width: "556px" }}
        >
          {(data ?? []).slice(0, 5).map((m, i) => (
            <SwiperSlide
              key={m.id ?? i} // har doim `key` bering
              style={{ borderRadius: "12px", width: "108px", height: "64px" }}
              className="w-[108px]"
            >
              <img
                className="w-full h-full object-cover"
                style={{ borderRadius: "12px" }}
                src={IMAGE_URL + m.backdrop_path}
                alt={m.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default React.memo(Carousel);
