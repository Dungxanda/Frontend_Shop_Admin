import React, { useEffect } from "react";
import { GiMoneyStack } from "react-icons/gi";
import { RiBillLine } from "react-icons/ri";
import { IoFileTrayStackedOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { DataGrid } from "@material-ui/data-grid";
import currency from "currency-formatter";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    
    if(seller.role === "Employee") {
      dispatch(getAllOrdersOfShop("66a201577851f82045bebbb5"));
    }
    else {
      dispatch(getAllOrdersOfShop(seller._id));
    }
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const availableBalance = seller?.availableBalance.toFixed(2);

  // Hàm chuyển đổi trạng thái từ tiếng Anh sang tiếng Việt
  const convertStatusToVietnamese = (status) => {
    switch (status) {
      case "Delivered":
        return "Đã giao";
      case "Pending":
        return "Đang chờ xử lý";
      case "Processing":
        return "Đang xử lý";
      case "Cancelled":
        return "Đã hủy";
      case "Cancel": // Thêm trường hợp cho trạng thái Cancel
        return "Đã hủy";
      case "Shipping":
        return "Đang được vận chuyển";
      case "On the way":
        return "Đang trên đường tới";
      default:
        return status;
    }
  };

  const getPaymentStatus = (paymentInfo) => {
    if (paymentInfo?.type === "VNPay" && paymentInfo?.status === "succeeded") {
      return "Đã thanh toán";
    }
    return "Chưa thanh toán";
  };

  const columns = [
    { field: "index", headerName: "STT", minWidth: 100, flex: 0.5 }, // Cột số thứ tự
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        const status = convertStatusToVietnamese(params.row.status);
        return status === "Đã giao" ? "greenColor" : "redColor";
      },
      valueGetter: (params) => convertStatusToVietnamese(params.row.status), // Hiển thị trạng thái bằng tiếng Việt
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Tổng cộng",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "paymentStatus", // Thêm cột "Trạng thái thanh toán"
      headerName: "Thanh toán",
      minWidth: 150,
      flex: 1,
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item, index) => {
      row.push({
        id: item._id, // Sử dụng id từ MongoDB để làm khóa duy nhất
        index: index + 1, // Thêm số thứ tự
        // itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        itemsQty: item.cart.length,
        total: `${currency.format(item.totalPrice, { code: "VND" })}`,
        paymentStatus: getPaymentStatus(item.paymentInfo),
        status: item.status, // Trạng thái ban đầu (được chuyển đổi trong DataGrid)
      });
    });

  return (
    <div className="w-full p-8">
      {seller.role === "Seller" &&
        <div>
          <h3 className="text-[22px] font-Poppins pb-2">Tổng quan</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <GiMoneyStack size={30} className="mr-2" fill="#00000085" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Thu nhập (Với 10% phí dịch vụ){" "}
                  <span className="text-[16px]"></span>
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {currency.format(availableBalance, { code: "VND" })}
              </h5>
              <Link to="/dashboard-withdraw-money">
                <h5 className="pt-4 pl-[2] text-[#077f9c]">Yêu cầu rút tiền</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <RiBillLine size={30} className="mr-2" fill="#00000085" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Đơn hàng
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {orders && orders.length}
              </h5>
              <Link to="/dashboard-orders">
                <h5 className="pt-4 pl-2 text-[#077f9c]">Danh sách đơn hàng</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <IoFileTrayStackedOutline
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Sản phẩm
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {products && products.length}
              </h5>
              <Link to="/dashboard-products">
                <h5 className="pt-4 pl-2 text-[#077f9c]">Danh sách sản phẩm</h5>
              </Link>
            </div>
          </div>
        </div>
      }
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Đơn hàng mới nhất</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default DashboardHero;
