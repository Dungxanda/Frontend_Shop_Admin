import React, { useState, useEffect } from "react";
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";
import { useSelector } from "react-redux";
import CardProductFash from "./CardProductFash";
import { FaChevronRight } from "react-icons/fa";

const SliderBookHighlight = () => {
  const { allProducts } = useSelector((state) => state.products || {});
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const next = () => {
    if (animating) return;
    const nextIndex = (activeIndex + 1) % (allProducts?.length || 1);
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const prevIndex = (activeIndex - 1 + (allProducts?.length || 1)) % (allProducts?.length || 1);
    setActiveIndex(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3000);
    return () => clearInterval(interval);
  }, [animating]);

  if (!allProducts || allProducts.length === 0) {
    return <p className="text-center text-gray-500">Không có sản phẩm nào.</p>;
  }

  const slides = allProducts.map((product, index) => {
    const slideItems = [];
    const itemsPerSlide = window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 5;
    for (let j = 0; j < itemsPerSlide; j++) {
      const itemIndex = (index + j) % allProducts.length;
      slideItems.push(
        <div key={itemIndex} className={`w-1/${itemsPerSlide} p-2`}>
          <CardProductFash data={allProducts[itemIndex]} />
        </div>
      );
    }

    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <div className="flex flex-wrap justify-center">
          {slideItems}
        </div>
      </CarouselItem>
    );
  });

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div className="bg-[#ff6c6b] p-4 rounded-lg">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-2 p-4 bg-white rounded-lg shadow-md mx-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-red-500 flex items-center">
              FLASH SALE <span className="ml-1">⚡</span>
            </h2>
            <span className="text-lg">Kết thúc trong</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-xl bg-black text-white px-2 py-1 rounded">
                {hours}
              </span>
              <span className="font-bold text-xl">:</span>
              <span className="font-bold text-xl bg-black text-white px-2 py-1 rounded">
                {minutes}
              </span>
              <span className="font-bold text-xl">:</span>
              <span className="font-bold text-xl bg-black text-white px-2 py-1 rounded">
                {seconds}
              </span>
            </div>
          </div>
          <button className="text-blue-500 font-semibold hover:text-blue-700 transition duration-300 flex items-center gap-1 mt-2 sm:mt-0">
            Xem tất cả <FaChevronRight />
          </button>
        </div>
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          ride="carousel"
        >
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
      </div>
    </div>
  );
};

export default SliderBookHighlight;
