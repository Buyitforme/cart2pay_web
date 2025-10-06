import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { ReactNode } from 'react';

interface SliderComponentProps {
  children: ReactNode[];
}

const SliderComponent = ({ children }: SliderComponentProps) => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={3}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop={true}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="w-full"
    >
      {children.map((child, idx) => (
        <SwiperSlide key={idx}>
          <div className="flex justify-center">{child}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderComponent;


