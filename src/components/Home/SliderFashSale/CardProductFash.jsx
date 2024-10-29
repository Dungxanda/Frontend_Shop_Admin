import React from "react";
import { Link } from "react-router-dom";
import currency from "currency-formatter";
import { backend_url } from "../../../server";

const CardProductFash = ({ data, isEvent }) => {
  // Tính toán phần trăm giảm giá
  const discountPercentage = Math.round(
    ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Link
        to={`${isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}
        className="hover:no-underline"
      >
        <img
          src={`${backend_url}${data.images && data.images[0]}`}
          alt={data.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold h-12 overflow-hidden">
            {data.name}
          </h3>
          <p className="text-red-500">
            {currency.format(data.discountPrice, { code: "VND" })}
          </p>
          {data.originalPrice && (
            <p className="line-through text-gray-500">
              {currency.format(data.originalPrice, { code: "VND" })}
            </p>
          )}
          {data.originalPrice && data.discountPrice && (
            <p className="text-green-500">{`-${discountPercentage}%`}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CardProductFash;
