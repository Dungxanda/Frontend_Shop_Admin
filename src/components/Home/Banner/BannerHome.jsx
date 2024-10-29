import React, { useState, useEffect } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import BannerBig from './BannerBig';

// Danh sách các slide cho carousel
const slides = [
  {
    src: 'https://cdn0.fahasa.com/media/magentothem/banner7/NCC_0724_MCBOOKS_Slide_840x320.jpg',
    alt: 'Car 1'
  },
  {
    src: 'https://cdn0.fahasa.com/media/magentothem/banner7/Backtoschool_0724_LDP_840x320.png',
    alt: 'Car 2'
  },
  {
    src: 'https://cdn0.fahasa.com/media/magentothem/banner7/Diamond_T07_ThienLong_Slide_840x320_1.jpg',
    alt: 'Car 3'
  },
  {
    src: 'https://cdn0.fahasa.com/media/magentothem/banner7/NCC_0724_MCBOOKS_Slide_840x320.jpg',
    alt: 'Car 4'
  }
];

// Danh sách các hình ảnh phụ
const additionalImages = [
  {
    src: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-08-2024/Diamond_T07_Ver1SmallBanner_310x210_2.jpg',
    alt: 'Additional Image 1'
  },
  {
    src: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-07-2024/BannerNgoaiVan0707_SmallBanner_310x210.jpg',
    alt: 'Additional Image 2'
  },
  {
    src: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-07-2024/Backtoschool_mainbannerT7__SmallBanner_310x210.jpg',
    alt: 'Additional Image 3'
  },
  {
    src: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-08-2024/Diamond_T07_Zenbooks_SmallBanner_310x210_2.jpg',
    alt: 'Additional Image 4'
  }
];

const BannerHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Trạng thái cho slide hiện tại
  const [animating, setAnimating] = useState(false); // Trạng thái cho animation của carousel
  const [showBannerBig, setShowBannerBig] = useState(false); // Kiểm tra xem có hiển thị BannerBig không

  const navigate = useNavigate(); // Hook dùng để điều hướng trong ứng dụng

  // Tự động chuyển đổi các slide sau mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      if (!animating) {
        const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval); // Xóa interval khi component bị hủy
  }, [currentIndex, animating]);

  // Hàm để chuyển sang slide tiếp theo
  const next = () => {
    if (animating) return;
    const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  // Hàm để quay lại slide trước đó
  const previous = () => {
    if (animating) return;
    const nextIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(nextIndex);
  };

  // Chuyển đến slide cụ thể khi người dùng click vào indicator
  const goToIndex = (newIndex) => {
    if (animating) return;
    setCurrentIndex(newIndex);
  };

  // Tạo các phần tử slide cho carousel
  const slideItems = slides.map((slide, index) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={index}
    >
      <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover rounded-lg" />
    </CarouselItem>
  ));

  // Điều hướng đến trang best-selling
  const handleRedirectSelling = () => {
    navigate('best-selling');
  };

  // Hiển thị component BannerBig khi người dùng click vào banner
  const handleImageClick = () => {
    setShowBannerBig(true);
  };

  // Nếu showBannerBig là true, hiển thị component BannerBig
  if (showBannerBig) {
    return <BannerBig />;
  }

  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Hiển thị các banner chính */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2 relative h-full cursor-pointer" onClick={handleImageClick}>
            <div className="h-full bg-orange-200 rounded-lg flex flex-col justify-center items-center">
              <div className="relative w-full h-full">
                <Carousel activeIndex={currentIndex} next={next} previous={previous}>
                  <CarouselIndicators items={slides} activeIndex={currentIndex} onClickHandler={goToIndex} />
                  {slideItems}
                  <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                  <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
              </div>
            </div>
          </div>
          {/* Hiển thị các hình ảnh phụ */}
          <div className="flex flex-col gap-1 justify-between h-full md:h-auto">
            <div className="h-48 md:h-1/2" onClick={handleImageClick}>
              <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-07-2024/DoiTac_SubBanner_392x156_2.jpg" alt="Image 1" className="w-full h-full object-cover cursor-pointer" />
            </div>
            <div className="h-48 md:h-1/2" onClick={handleImageClick}>
              <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-08-2024/VPbank392x156.png" alt="Image 2" className="w-full h-full object-cover cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Hiển thị danh sách các hình ảnh bổ sung */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {additionalImages.map((image, index) => (
            <div key={index} className="h-full bg-blue-200 rounded-lg flex justify-center items-center">
              <img src={image.src} alt={image.alt} onClick={handleRedirectSelling} className="w-full h-full object-cover rounded-lg cursor-pointer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerHome;
