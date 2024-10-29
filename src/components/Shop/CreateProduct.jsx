import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct, getAllProductsShop } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import axios from "axios";
import { backend_url, server } from "../../server";

const CreateProduct = ({ productData, isEdit }) => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [author, setAuthor] = useState(""); // Thêm trường author
  const [publisher, setPublisher] = useState(""); // Thêm trường publisher

  // Đổ dữ liệu cũ vào form khi ở chế độ chỉnh sửa
  useEffect(() => {
    console.log("check product: ", productData)
    if (isEdit && productData) {
      setName(productData.name);
      setDescription(productData.description);
      setCategory(productData.category);
      setTags(productData.tags);
      setOriginalPrice(productData.originalPrice);
      setDiscountPrice(productData.discountPrice);
      setStock(productData.stock);
      setAuthor(productData.author);
      setPublisher(productData.publisher);
      setImages(productData.images || []);
    }
  }, [isEdit, productData]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  console.log(images);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newForm = new FormData();
  
    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("author", author);
    newForm.append("publisher", publisher);
    newForm.append("shopId", seller._id);
  
    if (isEdit) {
      try {
        await axios.put(`${server}/product/update-product/${productData._id}`, newForm, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success("Product updated successfully!");
        window.location.href = "/dashboard-products";
      } catch (error) {
        toast.error("Error updating product!");
      }
    } else {
      dispatch(createProduct(newForm));
    }
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">{isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Tên sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên sản phẩm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Mô tả <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Thêm mô tả sản phẩm..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Thể loại <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Chọn danh mục SP</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Thêm tag cho sản phẩm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Giá gốc</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Thêm giá gốc của sản phẩm (Gía chưa áp dụng khuyến mãi)!"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Giá khuyến mãi <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Giá sản phẩm sau khi áp dụng khuyễn mãi..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Số lượng sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Thêm số lượng sản phẩm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
           Hình ảnh <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {/* {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))} */}
              {images &&
                images.map((image, index) => (
                  <img
                    key={index}
                    src={
                      typeof image === "string"
                        ? `${backend_url}${image}` // Nếu image là URL (chuỗi), hiển thị trực tiếp URL đầy đủ
                        : URL.createObjectURL(image) // Nếu image là File, sử dụng URL.createObjectURL()
                    }
                    alt=""
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                ))}
          </div>
          <br />
        <div>
          <label className="pb-2">
            Tác giả <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="author"
            value={author}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Nhập tên tác giả..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Nhà xuất bản <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="publisher"
            value={publisher}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setPublisher(e.target.value)}
            placeholder="Nhập tên nhà xuất bản..."
          />
        </div>
          <br />
          <div>
            <input
              type="submit"
              value={isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
