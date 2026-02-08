import Carousel from "react-bootstrap/Carousel";
import { bannerSlides } from "../../mockdata/products";
import { Link } from "react-router-dom";

export default function Slider() {
  return (
    <Carousel fade>
      {bannerSlides.map((slide) => (
        <Carousel.Item key={slide.id} interval={3000} className="relative">
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-[80vh] min-h-[600px] object-cover"
          />
          <Carousel.Caption className="z-20 flex h-full flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {slide.title}
            </h1>

            <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
              {slide.subtitle}
            </p>

            <Link
              to={slide.link}
              className="mt-6 inline-block rounded-lg bg-gold-gradient px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
            >
              {slide.cta}
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
