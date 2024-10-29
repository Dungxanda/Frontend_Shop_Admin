import React from 'react';
// Import các thành phần giao diện cần sử dụng
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import BannerHome from '../components/Home/Banner/BannerHome';
import SliderBookHighlight from '../components/Home/SliderFashSale/SliderBookHighlight';
import FooterHome from '../components/Home/Footer';
import TrendShoping from '../components/Home/TrendShoping/TrendShoping';

// Component chính của trang HomePage
const HomePage = () => {
  return (
    <div>
        {/* Header: Thanh điều hướng chính của trang */}
        <Header activeHeading={1} />

        {/* BannerHome: Hiển thị banner quảng cáo ở đầu trang */}
        <BannerHome />

        {/* SliderBookHighlight: Thanh trượt hiển thị các sản phẩm khuyến mãi */}
        <SliderBookHighlight 
          title={'Khuyến Mãi'}
        />

        {/* Categories: Hiển thị danh sách các danh mục sản phẩm */}
        <Categories />

        {/* TrendShoping: Hiển thị các sản phẩm theo xu hướng mua sắm */}
        <TrendShoping />

        {/* BestDeals: Hiển thị các ưu đãi tốt nhất */}
        <BestDeals />

        {/* Events: Hiển thị các sự kiện đang diễn ra */}
        <Events />

        {/* FeaturedProduct: Hiển thị các sản phẩm nổi bật */}
        <FeaturedProduct />

        <br/>

        {/* Footer: Chân trang chính của trang */}
        <Footer />

    </div>
  )
}

export default HomePage;
