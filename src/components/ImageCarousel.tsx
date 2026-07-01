import { useRef, useState } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 1) {
    return (
      <div className="aspect-video overflow-hidden rounded-lg">
        <OptimizedImage src={images[0]} alt={alt} />
      </div>
    );
  }

  // ponytail: handle native scroll updates to update active dot
  const handleScroll = () => {
    if (!ref.current) return;
    const index = Math.round(ref.current.scrollLeft / ref.current.clientWidth);
    setActiveIndex((prev) => (prev !== index ? index : prev));
  };

  // ponytail: prevent click propagation to parental <a> tag
  const scroll = (e: React.MouseEvent, direction: "prev" | "next") => {
    e.stopPropagation();
    e.preventDefault();
    if (!ref.current) return;
    const { clientWidth } = ref.current;
    ref.current.scrollBy({
      left: direction === "next" ? clientWidth : -clientWidth,
      behavior: "smooth",
    });
  };

  // ponytail: prevent click propagation to parental <a> tag
  const goToSlide = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    if (!ref.current) return;
    ref.current.scrollTo({
      left: index * ref.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="group relative">
      <div
        ref={ref}
        onScroll={handleScroll}
        className="flex aspect-video snap-x snap-mandatory overflow-x-auto rounded-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, i) => (
          <div key={i} className="min-w-full snap-start">
            <OptimizedImage src={image} alt={`${alt} - Image ${i + 1}`} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={(e) => scroll(e, "prev")}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => scroll(e, "next")}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => goToSlide(e, i)}
            className={`h-2 w-2 rounded-full transition-colors duration-200 ${
              activeIndex === i ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
