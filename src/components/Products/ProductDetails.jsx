import React, { useEffect, useState } from "react";
import currency from "currency-formatter";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import { FaShippingFast, FaTags, FaCreditCard, FaPercentage } from "react-icons/fa";
import { FaTruck, FaUndoAlt, FaHandshake } from "react-icons/fa";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    return deliveryDate.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
    });
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    if(!isAuthenticated) {
      navigate('/login');
      return;
    }
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Sản phẩm đã có trong giỏ hàng!");
    } else {
      if (data.stock < 1) {
        toast.error("Sản phẩm có số lượng giới hạn!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Sản phẩm đã thêm vào giỏ hàng!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Vui lòng đăng nhập để nhắn tin");
    }
  };


  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}${data && data.images[select]}`}
                  alt=""
                  className="w-[80%] rounded-[8px]"
                />
                <div className="w-full flex">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        key={index}
                        className={`${
                          select === index ? "border" : "null"
                        } cursor-pointer`}
                      >
                        <img
                          src={`${backend_url}${i}`}
                          alt=""
                          className="h-[115px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                </div>

                {/* Phần thông tin chính sách bên dưới ảnh */}
                <div className="mt-5">
                  <h3 className="font-bold text-lg">Chính sách ưu đãi của cửa hàng</h3>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-center">
                      <FaTruck className="text-red-600 w-5 h-5 mr-2" />
                      <span className="font-semibold">Thời gian giao hàng:</span> Giao nhanh và uy tín
                    </li>
                    <li className="flex items-center">
                      <FaUndoAlt className="text-red-600 w-5 h-5 mr-2" />
                      <span className="font-semibold">Chính sách đổi trả:</span> Đổi trả miễn phí toàn quốc
                    </li>
                    <li className="flex items-center">
                      <FaHandshake className="text-red-600 w-5 h-5 mr-2" />
                      <span className="font-semibold">Chính sách khách sỉ:</span> Ưu đãi khi mua số lượng lớn
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bắt đầu phần bên phải */}
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className="text-[24px] font-bold">{data.name}</h1>
                <p>
                  Nhà xuất bản: <span className="text-blue-500">{data.publisher}</span>
                </p>
                <p>
                  Xuất xứ: <span>Việt Nam</span>
                </p>
                <p>
                  Tác giả: <span className="text-blue-500">{data.author}</span>
                </p>
                <div className="flex items-center my-3">
                  <span className="text-[#f1055c] text-[28px] font-bold">
                    {currency.format(data.discountPrice, { code: "VND" })}
                  </span>
                  {data.originalPrice && (
                    <span className="text-gray-500 line-through ml-4">
                      {currency.format(data.originalPrice, { code: "VND" })}
                    </span>
                  )}
                  <span className="ml-3 bg-red-500 text-white px-2 rounded">
                    -20%
                  </span>
                </div>

                <div className="my-4 p-4 bg-gray-100 rounded-md">
                  {/* Thông tin vận chuyển */}
                  <h3 className="font-bold mb-3">Thông tin vận chuyển</h3>
                  <div className="mb-4">
                    <p>
                      Giao hàng đến: <span className="font-semibold">{user?.addresses[0]?.address1}, {user?.addresses[0]?.city}</span>{" "}
                      <Link className="text-blue-500">Thay đổi</Link>
                    </p>
                    <p className="flex items-center text-green-600 font-semibold">
                      <FaShippingFast className="mr-2 w-5 h-5" />
                      Giao hàng tiêu chuẩn - Dự kiến giao {getDeliveryDate()}
                    </p>
                  </div>

                  {/* Ưu đãi liên quan */}
                  {/* <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">Ưu đãi liên quan</h3>
                    <Link to="#" className="text-blue-500">Xem thêm</Link>
                  </div>
                  <div className="grid grid-cols-1 800px:grid-cols-2 gap-4">
                    <div className="p-2 flex items-center bg-yellow-100 rounded-md shadow-sm">
                      <FaPercentage className="w-6 h-6 mr-2 text-yellow-600" />
                      <span className="text-sm">Mã giảm 10k - Đơn 150k</span>
                    </div>
                    <div className="p-2 flex items-center bg-yellow-100 rounded-md shadow-sm">
                      <FaPercentage className="w-6 h-6 mr-2 text-yellow-600" />
                      <span className="text-sm">Mã giảm 25k - Đơn 250k</span>
                    </div>
                    <div className="p-2 flex items-center bg-blue-100 rounded-md shadow-sm">
                      <FaCreditCard className="w-6 h-6 mr-2 text-blue-600" />
                      <span className="text-sm">Vnpay: giảm 5k cho đơn từ 100k</span>
                    </div>
                    <div className="p-2 flex items-center bg-blue-100 rounded-md shadow-sm">
                      <FaCreditCard className="w-6 h-6 mr-2 text-blue-600" />
                      <span className="text-sm">Sacombank: hoàn tiền 5%</span>
                    </div>
                  </div> */}
                </div>

                {/* Số lượng và nút đặt hàng */}
                <div className="flex items-center my-5">
                  <span className="text-lg font-semibold">Số lượng:</span>
                  <div className="ml-3 flex items-center border rounded-lg overflow-hidden">
                    <button
                      className="p-2 bg-gray-200"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="px-4">{count}</span>
                    <button
                      className="p-2 bg-gray-200"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center mt-6 space-x-4">
                  <button
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <AiOutlineShoppingCart className="mr-2" />
                    Thêm vào giỏ hàng
                  </button>
                  <div className="flex items-center">
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer text-red-500"
                        onClick={() => removeFromWishlistHandler(data)}
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center mt-5">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-3"
                    />
                  </Link>
                  <div>
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h4 className="font-bold">{data.shop.name}</h4>
                    </Link>
                    <p className="text-gray-500">({averageRating}/5 ⭐) Đánh giá</p>
                  </div>
                  <button
                    className={`${styles.button} ml-auto bg-red-500 text-white hover:bg-red-600`}
                    onClick={handleMessageSubmit}
                  >
                    Gửi tin nhắn <AiOutlineMessage className="ml-2" />
                  </button>
                </div>
              </div>
              {/* Kết thúc phần bên phải */}
            </div>
          </div>
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Mô tả
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Đánh giá 
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
           Cửa hàng
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2 bg-[#cccccc70] rounded-lg p-2">
                <img
                  src={`${backend_url}/${item.user.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] text-xl mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <div className="items-center py-3 p-2 ml-2"> <p className="font-[500] text-base">{item.comment}</p></div>
                 
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>Sản phẩm chưa có đánh giá!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${backend_url}${data?.shop?.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) đánh giá
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Tham gia:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Số lượng sản phẩm:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Số lượng Review:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              {/* <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
