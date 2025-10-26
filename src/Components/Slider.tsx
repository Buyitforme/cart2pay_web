import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface Store {
  name: string;
  logo: string;
  url: string;
}

interface ImageSliderProps {
  images: Store[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      loop
      slidesPerView={3}
      spaceBetween={20}
      className="w-full"
      breakpoints={{
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}
    >
      
      {images.map((store, index) => (
        <SwiperSlide key={index}>
          <a href={store.url} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center justify-center h-24">
              <img
                src={store.logo}
                alt={store.name}
                className="max-h-full w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
