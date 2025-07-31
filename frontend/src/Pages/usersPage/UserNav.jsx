import React, { useEffect, useState } from "react";
import "./UserHome.css";
import { Link } from "react-router-dom";
import axios from "axios";

const UserNav = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const response = await axios.get("https://e-commerce-react-backend-wkkw.onrender.com/cart");
      setCartCount(response.data.length);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  return (
    <nav>
      <Link to="/">
        <h2>ShipKart</h2>
      </Link>
      <Link to="/">
        <div className="search">
          <input type="text" placeholder="Search products" />
          <button id="button">Search </button>
        </div>
      </Link>
      <Link to="/cart" className="cart-link">
        <i className="ri-shopping-cart-line"></i>
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </Link>
    </nav>
  );
};

export default UserNav;
