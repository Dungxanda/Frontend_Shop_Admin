import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import CreateProduct from "../../components/Shop/CreateProduct";
import axios from "axios";
import { server } from "../../server"; // Đường dẫn API

const ShopCreateProduct = () => {
  const { id } = useParams(); // Lấy product ID từ URL
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    if (id) {
      // Gọi API lấy thông tin chi tiết sản phẩm nếu có ID
      axios
        .get(`${server}/product/product/${id}`)
        .then((response) => {
          setProductData(response.data.product);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [id]);

  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          {/* Truyền productData vào CreateProduct */}
          {/* <CreateProduct productData={productData} isEdit={!!id} /> */}
          <CreateProduct productData={productData} isEdit={!!id} />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
