import React from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";
import "./CategoryDropdown.css"; // Import the CSS file

const CategoryDropdown = ({ setShowDropdown }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryTitle) => {
    // Navigate to the correct URL with the category query parameter
    navigate(`/products?category=${categoryTitle}`);
    setShowDropdown(false); // Close the dropdown after clicking a category
  };

  return (
    <div className="category-dropdown">
      {/* Dropdown Title */}
      <div className="category-title">
        <div className="category-title-icon">
          <span className="category-icon-text">S</span>
        </div>
        <h3 className="category-title-text">Sách Trong Nước</h3>
      </div>
      <div className="category-grid">
        {categoriesData.map((category, index) => (
          <div
            key={index}
            className="category-item"
            onClick={() => handleCategoryClick(category.title)}
          >
            <img
              src={category.image_Url}
              alt={category.title}
              className="category-item-image"
            />
            <h4 className="category-item-title">{category.title}</h4>
          </div>
        ))}
      </div>

      {/* Sách Nước Ngoài Section */}
      <div className="foreign-books-section">
        <h3 className="foreign-books-title">Sách Nước Ngoài</h3>
        <div className="foreign-books-link">
          <a href="#" className="foreign-books-see-more">Xem Thêm</a>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
