import React, { useEffect, useState } from "react";
import "./UserHome.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserNav = () => {
  const [cartCount, setCartCount] = useState(0);
  const [currentMode, setCurrentMode] = useState("user");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

  const handleModeSwitch = () => {
    if (currentMode === "user") {
      setShowPasswordModal(true);
    } else {
      setCurrentMode("user");
      navigate("/");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "admin11") {
      setCurrentMode("admin");
      setShowPasswordModal(false);
      setPassword("");
      setErrorMessage("");
      navigate("/admin/");
    } else {
      setErrorMessage("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const handleCancel = () => {
    setShowPasswordModal(false);
    setPassword("");
    setErrorMessage("");
  };

  return (
    <>
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
        <div className="nav-right">
          <Link to="/cart" className="cart-link">
            <i className="ri-shopping-cart-line"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <button 
            className="mode-switch-btn"
            onClick={handleModeSwitch}
          >
            <i className="ri-admin-line"></i>
            {currentMode === "user" ? "Admin" : "User"}
          </button>
        </div>
      </nav>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Admin Authentication</h3>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="password">Enter Admin Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">Login</button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserNav;
