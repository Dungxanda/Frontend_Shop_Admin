import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";
import CategoryDropdown from "../Home/CategoryDropdown/CategoryDropdown";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Set "Danh mục" as active if the current path has a category query parameter
    if (location.pathname === "/products" && location.search.includes("category")) {
      setActive(2); // "Danh mục" is now the 2nd item (index 1 + 1)
    } else {
      // Determine the active menu item based on the current path
      const activeIndex = navItems.findIndex((item) => item.url === location.pathname);
      setActive(activeIndex !== -1 ? activeIndex + 1 : 0);
    }
  }, [location]);

  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems.map((item, index) => (
        <div
          key={index}
          className="relative flex"
          onMouseEnter={() => {
            if (item.title === "Danh mục") setShowDropdown(true);
          }}
          onMouseLeave={() => {
            if (item.title === "Danh mục") setShowDropdown(false);
          }}
        >
          <Link
            to={item.url === "#" ? "/" : item.url} // Handle the "#" case for "Danh mục"
            className={`${
              active === index + 1
                ? "text-[#e9d619] font-[700]"
                : "text-black 800px:text-[#ffffff]"
            } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer`}
            style={{ textDecorationLine: "none" }}
          >
            {item.title}
          </Link>

          {item.title === "Danh mục" && showDropdown && (
            <div
              className="absolute top-full left-0 z-20" // Ensure dropdown is above other elements
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <CategoryDropdown setShowDropdown={setShowDropdown} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
