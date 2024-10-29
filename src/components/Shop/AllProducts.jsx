import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop, deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import currency from "currency-formatter";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const [filterName, setFilterName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  const handleResetFilters = () => {
    setFilterName("");
    setMinPrice("");
    setMaxPrice("");
  };

  const columns = [
    { field: "index", headerName: "TT", minWidth: 100, flex: 0.5 },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Giá",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Số lượng",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Đã bán",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Xem",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <a href={`http://localhost:3000/product/${params.id}`} target="_blank" rel="noopener noreferrer">
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </a>
        );
      },
    },
    {
      field: "Sửa",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/dashboard-edit-product/${params.id}`}>
            <Button>
              <AiOutlineEdit size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Xóa",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleDelete(params.id)}>
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  // Lọc sản phẩm theo tên và khoảng giá
  const filteredProducts = products?.filter((item) => {
    const inNameFilter = item.name?.toLowerCase().includes(filterName.toLowerCase());
    const price = item.discountPrice;
    const inPriceFilter =
      (!minPrice || price >= Number(minPrice)) &&
      (!maxPrice || price <= Number(maxPrice));
    return inNameFilter && inPriceFilter;
  });

  const row = [];
  filteredProducts?.forEach((item, index) => {
    row.push({
      index: index + 1,
      name: item.name,
      price: `${currency.format(item.discountPrice, {
        code: "VND",
      })}`,
      Stock: item.stock,
      sold: item.sold_out,
      id: item._id,
    });
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          {/* Thêm các input lọc */}
          <div className="flex gap-4 mb-4 items-center">
            <input
              type="text"
              placeholder="Lọc theo tên"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="border p-2"
            />
            <div className="flex items-center gap-2">
              <label>Từ</label>
              <input
                type="number"
                placeholder="Nhập giá min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border p-2"
              />
            </div>
            <div className="flex items-center gap-2">
              <label>Đến</label>
              <input
                type="number"
                placeholder="Nhập giá max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border p-2"
              />
            </div>
            <Button 
              onClick={handleResetFilters} className="bg-red-500 text-white p-2"
              style={{ backgroundColor: "red", color: "black", padding: "8px 16px" }}
            >
              Bỏ lọc
            </Button>
          </div>
          {/* Hiển thị bảng sản phẩm */}
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

export default AllProducts;
