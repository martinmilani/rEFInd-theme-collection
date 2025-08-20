import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

function OptimizedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="h-full w-full object-cover"
    />
  );
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  if (images.length === 1) {
    return (
      <div className="aspect-video overflow-hidden rounded-lg object-cover">
        <OptimizedImage src={images[0]} alt={alt} />
      </div>
    );
  }

  return (
    <div className="group relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={false}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination"
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-video overflow-hidden rounded-lg object-cover">
              <OptimizedImage src={image} alt={`${alt} - Image ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev p-4 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <div className="swiper-button-next p-4 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <div className="swiper-pagination absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </Swiper>
    </div>
  );
}

