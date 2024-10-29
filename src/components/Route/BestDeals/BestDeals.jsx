import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData.sort((a, b) => b.sold_out - a.sold_out); 
    const firstFive = sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);

  return (
    <div className={`${styles.section} bg-white p-6 rounded-lg shadow-md`}>
      <header className="mb-8 p-4 bg-gray-100 rounded-lg border-b-2 border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Sản phẩm bán chạy</h1>
      </header>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]">
        {data && data.length !== 0 ? (
          data.map((i, index) => <ProductCard data={i} key={index} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">Không có sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
};

export default BestDeals;
