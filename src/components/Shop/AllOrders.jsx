import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";
import currency from "currency-formatter";

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller.role === "Employee") {
      dispatch(getAllOrdersOfShop("66a201577851f82045bebbb5"));
    } else {
      dispatch(getAllOrdersOfShop(seller._id));
    }
  }, [dispatch, seller]);

  const convertStatusToVietnamese = (status) => {
    switch (status) {
      case "Delivered":
        return "Đã giao";
      case "Pending":
        return "Đang chờ xử lý";
      case "Processing":
        return "Đang xử lý";
      case "Cancelled":
      case "Cancel":
        return "Đã hủy";
      case "Shipping":
        return "Chuyển đến giao hàng";
      case "On the way":
        return "Đang giao hàng";
      case "Received":
        return "Đã nhận";
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

  const handleResetFilters = () => {
    setMinDate("");
    setMaxDate("");
    setMinPrice("");
    setMaxPrice("");
    setOrderStatus("");
  };

  const columns = [
    { field: "index", headerName: "Thứ tự", minWidth: 100, flex: 0.5 },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã giao"
          ? "greenColor"
          : "redColor";
      },
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
      field: "createdAt",
      headerName: "Ngày đặt hàng",
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        const date = new Date(params.row.createdAt);
        return date.toLocaleDateString("vi-VN");
      },
    },
    {
      field: "paymentStatus",
      headerName: "Thanh toán",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "handlerName",
      headerName: "Người xử lý",
      minWidth: 100,
      flex: 1,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const filteredOrders = orders?.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const inDateRange =
      (!minDate || orderDate >= new Date(minDate)) &&
      (!maxDate || orderDate <= new Date(maxDate));
    const inPriceRange =
      (!minPrice || order.totalPrice >= Number(minPrice)) &&
      (!maxPrice || order.totalPrice <= Number(maxPrice));
    const matchesStatus =
      !orderStatus || convertStatusToVietnamese(order.status) === orderStatus;

    return inDateRange && inPriceRange && matchesStatus;
  });

  const row = [];
  filteredOrders?.forEach((item, index) => {
    row.push({
      index: index + 1,
      itemsQty: item.cart.length,
      total: `${currency.format(item.totalPrice, { code: "VND" })}`,
      status: convertStatusToVietnamese(item.status),
      handlerName: item.handledBy ? item.handledBy.name : "Chưa xác định",
      createdAt: item.createdAt,
      paymentStatus: getPaymentStatus(item.paymentInfo),
      id: item._id,
    });
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          {/* Bộ lọc */}
          <div className="flex gap-4 mb-4 items-center">
            <fieldset className="border p-2">
              <legend className="text-sm">Ngày</legend>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={minDate}
                  onChange={(e) => setMinDate(e.target.value)}
                  className="border p-2"
                />
                <input
                  type="date"
                  value={maxDate}
                  onChange={(e) => setMaxDate(e.target.value)}
                  className="border p-2"
                />
              </div>
            </fieldset>
            <fieldset className="border p-2">
              <legend className="text-sm">Giá</legend>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Nhập giá min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="border p-2"
                />
                <input
                  type="number"
                  placeholder="Nhập giá max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="border p-2"
                />
              </div>
            </fieldset>
            <div className="flex items-center gap-2">
              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className="border p-2"
              >
                <option value="">Trạng thái</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đang chờ xử lý">Đang chờ xử lý</option>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Đã hủy">Đã hủy</option>
                <option value="Chuyển đến giao hàng">Chuyển đến giao hàng</option> 
                <option value="Đang giao hàng">Đang giao hàng</option>
              </select>
              <Button
                onClick={handleResetFilters}
                style={{ backgroundColor: "red", color: "black", padding: "8px 16px" }}
              >
                Bỏ lọc
              </Button>
            </div>
          </div>
          {/* Hiển thị bảng đơn hàng */}
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllOrders;
