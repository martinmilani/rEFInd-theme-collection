import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import getCloudinaryPublicId from "@src/utils/getCloudinaryPublicId";
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

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
  }
});

function OptimizedImage({ publicId, alt }: { publicId: string; alt: string }) {
  const myImage = cld.image(publicId).format("webp").quality("auto");

  return <AdvancedImage cldImg={myImage} alt={alt} />;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  return (
    <div className={`group relative`}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
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
            <div className="aspect-video overflow-hidden rounded-lg">
              <OptimizedImage
                publicId={getCloudinaryPublicId(image)}
                alt={`${alt} - Image ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation buttons */}
        <div className="swiper-button-prev p-4 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <div className="swiper-button-next p-4 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

        {/* Pagination */}
        <div className="swiper-pagination absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </Swiper>
    </div>
  );
}
