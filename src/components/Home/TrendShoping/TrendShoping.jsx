import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CardProductTrend from "./CardProductTrend";

const tabs = [
  { id: 1, label: "Xu Hướng Theo Ngày", key: "daily" },
  { id: 2, label: "Sách HOT - Giảm Sốc", key: "hot" },
  { id: 3, label: "Bestseller Ngoại Văn", key: "bestseller" },
];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const TrendShopping = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const { allProducts } = useSelector((state) => state.products);
  const [products, setProducts] = useState({ daily: [], hot: [], bestseller: [] });

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const shuffledProducts = shuffleArray([...allProducts]);
      const chunkSize = Math.floor(shuffledProducts.length / 3);
      const remainder = shuffledProducts.length % 3;

      setProducts({
        daily: shuffledProducts.slice(0, chunkSize + remainder),
        hot: shuffledProducts.slice(chunkSize + remainder, chunkSize * 2 + remainder),
        bestseller: shuffledProducts.slice(chunkSize * 2 + remainder),
      });
    }
  }, [allProducts]);

  return (
    <div className="bg-pink-100 p-4 rounded-lg">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-red-500 flex items-center">
            <span className="mr-2">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/icon_dealhot_new.png"
                alt="icon"
              />
            </span>
            Xu Hướng Mua Sắm
          </h2>
        </div>
        <div className="flex border-b border-gray-200 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-4 -mb-px text-gray-700 font-semibold ${
                activeTab === tab.key ? "border-b-2 border-red-500 text-red-500" : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products[activeTab] && products[activeTab].length > 0 ? (
            products[activeTab].map((product, index) => (
              <CardProductTrend data={product} key={index} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">Không có sản phẩm nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendShopping;
