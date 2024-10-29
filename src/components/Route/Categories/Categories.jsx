import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div className={`branding my-4 flex justify-between w-full p-3 rounded-md`}>
        </div>
        <div className={`${styles.heading}`}>
          <h1 className="text-2xl font-bold text-gray-800">Danh mục sách</h1>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-300 p-6 rounded-lg mb-12" id="categories">
        <div className="flex flex-wrap justify-center">
          {categoriesData && categoriesData.map((category) => {
            const handleSubmit = () => {
              navigate(`/products?category=${category.title}`);
            };

            return (
              <div
                className="flex-shrink-0 m-2 max-w-[140px] flex flex-col items-center p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                key={category.id}
                onClick={handleSubmit}
              >
                <img
                  src={category.image_Url}
                  className="w-full h-24 object-cover rounded-t-lg mb-2"
                  alt={category.title}
                />
                <h5 className="text-base font-semibold text-gray-700 text-center">{category.title}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Categories;
