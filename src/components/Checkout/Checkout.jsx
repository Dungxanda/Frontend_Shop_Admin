import React, { useState, useEffect } from "react";
import styles from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import currency from "currency-formatter";
import { server } from "../../server";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("VN");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [specificAddress, setSpecificAddress] = useState(""); // Địa chỉ cụ thể
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
        setProvinces(response.data.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`);
          setDistricts(response.data.data);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };

      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`);
          setWards(response.data.data);
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      };

      fetchWards();
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  const paymentSubmit = () => {
    if(specificAddress === ""|| country === "" || city === "" || selectedDistrict === "" || address1 === ""){
      toast.error("Vui lòng chọn và nhập đầy đủ địa chỉ giao hàng!")
    } else{
      const selectedDistrictName = districts.find(district => district.id === selectedDistrict)?.name || '';
      const selectedWardName = address1;
      
      const shippingAddress = {
        address1: `${specificAddress}, ${selectedWardName}, ${selectedDistrictName}`,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      }

      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const shipping = subTotalPrice * 0.02;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Mã voucher không hợp lệ cho cửa hàng này!");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Mã Voucher này không tồn tại!");
        setCouponCode("");
      }
    });
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            specificAddress={specificAddress}
            setSpecificAddress={setSpecificAddress}
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
            provinces={provinces}
            districts={districts}
            wards={wards}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10 bg-[#f63b60f3]`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Thanh toán</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  specificAddress,
  setSpecificAddress,
  selectedProvince,
  setSelectedProvince,
  selectedDistrict,
  setSelectedDistrict,
  provinces,
  districts,
  wards,
}) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Thông tin giao hàng</h5>
      <br />
      <form>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block pb-2">Tên khách hàng:</label>
            <input
              type="text"
              value={user && user.name}
              required
              className={`${styles.input} w-full`}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block pb-2">Email:</label>
            <input
              type="email"
              value={user && user.email}
              required
              className={`${styles.input} w-full`}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block pb-2">Số điện thoại: +(84)</label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className={`${styles.input} w-full`}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block pb-2">Tỉnh, thành phố:</label>
            <select
              className="w-full border h-[40px] rounded-[5px]"
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setCity(provinces.find((p) => p.id === e.target.value)?.name || '');
              }}
            >
              <option value="">Chọn tỉnh, thành phố</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block pb-2">Quận, huyện:</label>
            <select
              className="w-full border h-[40px] rounded-[5px]"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedProvince}
            >
              <option value="">Chọn quận, huyện</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block pb-2">Phường, xã:</label>
            <select
              className="w-full border h-[40px] rounded-[5px]"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              disabled={!selectedDistrict}
            >
              <option value="">Chọn phường, xã</option>
              {wards.map((ward) => (
                <option key={ward.id} value={ward.name}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block pb-2">Địa chỉ cụ thể:</label>
            <input
              type="text"
              required
              value={specificAddress}
              onChange={(e) => setSpecificAddress(e.target.value)}
              className={`${styles.input} w-full`}
              placeholder="Nhập số nhà, tên đường..."
            />
          </div>
        </div>
      </form>
      <h5
        className="text-[18px] cursor-pointer inline-block"
        onClick={() => setUserInfo(!userInfo)}
      >
        Chọn địa chỉ mà bạn đã lưu: <h5 className="text-[#027df0fd]">(Nhấn vào đây để chọn)</h5> 
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1" key={index}>
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() => {
                    setAddress1(item.address1);
                    setSpecificAddress(item.specificAddress);
                    setSelectedProvince(item.provinceId);
                    setSelectedDistrict(item.districtId);
                    setCity(item.city);
                  }}
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Tổng tiền:</h3>
        <h5 className="text-[18px] font-[600]">{currency.format(subTotalPrice, { code: "VND" })}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Phí giao hàng:</h3>
        <h5 className="text-[18px] font-[600]">{currency.format(shipping.toFixed(2), { code: "VND" })}</h5>
      </div>  
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Voucher:</h3>
        <h5 className="text-[18px] font-[600]">
          -{discountPercentenge ? "" + `${currency.format(discountPercentenge.toString(), { code: "VND" })}` : null}
        </h5>
      </div>
      <h3 className="text-[16px] font-[400] text-[#000000a4]">Tổng cộng:</h3>
      <h5 className="text-[18px] font-[600] text-end pt-3"> {currency.format(totalPrice, { code: "VND" })}</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Áp dụng mã Voucher ngay!!! "
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] font-bold rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Áp dụng mã voucher"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;
