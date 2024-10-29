import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import currency from "currency-formatter";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../../server";
import Ratings from "../../Products/Ratings";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";

const CardProductTrend = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Sản phẩm đã có trong giỏ hàng!");
    } else {
      if (data.stock < 1) {
        toast.error("Sản phẩm số lượng có giới hạn!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Đã thêm vào giỏ hàng!");
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Link
        to={`${isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}
        className="hover:no-underline"
      >
        <img
          src={`${backend_url}${data.images && data.images[0]}`}
          alt={data.name}
          className="w-full h-40 object-cover mb-2 rounded-md"
        />
        <h3 className="text-lg font-semibold text-gray-800">{data.name}</h3>
      </Link>
      <div className="text-red-500 text-xl font-bold">
        {currency.format(data.discountPrice, { code: "VND" })}
      </div>
      {data.originalPrice && (
        <div className="text-gray-500 line-through">
          {currency.format(data.originalPrice, { code: "VND" })}
        </div>
      )}
      <div className="flex justify-between items-center mt-2">
        <Ratings rating={data?.ratings} />
        <span className="text-gray-500">{data.sold} đã bán</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer"
            onClick={() => removeFromWishlistHandler(data)}
            color="red"
            title="Xóa khỏi giỏ hàng yêu thích"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer"
            onClick={() => addToWishlistHandler(data)}
            color="#333"
            title="Thêm vào giỏ hàng yêu thích"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
          color="#333"
          title="Xem nhanh"
        />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer"
          onClick={() => addToCartHandler(data._id)}
          color="#444"
          title="Thêm vào giỏ hàng"
        />
      </div>
    </div>
  );
};

export default CardProductTrend;
