import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfoShipCard from './InfoShipCard';
import Loader from '../../Layout/Loader';
import { server } from '../../../server'; // Sử dụng URL của API

const InfoShip = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API để lấy danh sách tất cả các mã giảm giá
    axios
      .get(`${server}/coupon/get-all-coupons`, { withCredentials: true })
      .then((res) => {
        setCoupons(res.data.couponCodes); // Lưu danh sách mã giảm giá vào state
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Hiển thị loader trong khi chờ dữ liệu
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-red-500 p-4">
      {coupons.map((coupon, index) => (
        <InfoShipCard
          key={index}
          name={coupon.name} // Dùng `name` làm mã voucher
          subtitle="Áp dụng cho các đơn hàng đủ điều kiện"
          expiration={new Date(coupon.createdAt).toLocaleString()} // Định dạng ngày hết hạn
          status={new Date(coupon.createdAt) > new Date() ? 'available' : 'expired'}
          value={coupon.value}
          minAmount={coupon.minAmount}
          maxAmount={coupon.maxAmount}
        />
      ))}
    </div>
  );
};

export default InfoShip;
