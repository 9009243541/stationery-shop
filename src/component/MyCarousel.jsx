import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"; // You can replace this with any icon lib

const MyCarousel = () => {
  const slides = [
    {
      src: "./images/child_3.jpg",
      alt: "Slide 1",
    },
    {
      src: "./images/girl_with_notbook.jpg",
      alt: "Slide 2",
    },
    // {
    //   src: "https://i.pinimg.com/736x/61/19/33/61193324b96e1e87736220a58dfa63d5.jpg",
    //   alt: "Slide 3",
    // },
    {
      src: "./images/slide-ngo-2.webp",
      alt: "Slide 3",
    },
  ];

  return (
    <div className="w-full h-[60vh] sm:h-[70vh] md:h-screen overflow-hidden md:p-2 rounded">
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={3000}
        transitionTime={600}
        swipeable
        emulateTouch
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute left-4 top-1/2 transform -translate-y-1/2  bg-opacity-40 p-2 rounded-full text-orange-400 hover:text-white z-10 hover:bg-opacity-70"
            >
              <IconChevronLeft size={24} />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute right-4 top-1/2 transform -translate-y-1/2  bg-opacity-40 p-2 rounded-full  text-orange-400 hover:text-white z-10 hover:bg-opacity-70"
            >
              <IconChevronRight size={24} />
            </button>
          )
        }
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-[60vh] sm:h-[70vh] md:h-screen object-contain md:object-cover rounded"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
