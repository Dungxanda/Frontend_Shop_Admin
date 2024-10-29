import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useSelector } from "react-redux";

const Hero = () => {
  const { isSeller } = useSelector((state) => state.seller);
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://static.wixstatic.com/media/9d865c_e06d8b20039b4d9ea6035344b2b2c90b~mv2.jpg/v1/fill/w_1899,h_585,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9d865c_e06d8b20039b4d9ea6035344b2b2c90b~mv2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Kiana shop <br />
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Là dịch vụ thương mại điện tử. Nơi bạn có thể mua những sản phẩm mà
          mình yêu thích với giá cả hợp lý. <br /> Ngoài ra bạn cũng có thể trở
          thành một người kinh doanh trên hệ thống của chúng tôi . <br /> Hãy
          trải nghiệm ngay thôi nào.
        </p>
        <div className="flex justify-evenly">
          <Link to="/products">
            <div className={`${styles.button} mt-5`}>
              <span className="text-[#fff] font-[Poppins] text-[18px]">
                Mua ngay
              </span>
            </div>
          </Link>
          {/* <Link to="/shop-create" >
            <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Seller
                 </span>
            </div>
        </Link> */}
          {/* <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link> */}
          {isSeller && isSeller ? null : (
            <Link to="/shop-create">
              <div className={`${styles.button} mt-5`}>
                <span className="text-[#fff] font-[Poppins] text-[18px]">
                  Seller
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
