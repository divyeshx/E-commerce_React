import React, { useState } from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [currentMode, setCurrentMode] = useState("admin");
  const navigate = useNavigate();

  const handleModeSwitch = () => {
    if (currentMode === "admin") {
      setCurrentMode("user");
      navigate("/");
    } else {
      setCurrentMode("admin");
      navigate("/admin/");
    }
  };

  return (
    <nav>
        <h2>ShipKart</h2>
        <div className='search'>
            <input type="text" placeholder="Search products..." />
            <i className="ri-search-line"></i>
        </div>
        <div className="right">
          <button 
            className="mode-switch-btn"
            onClick={handleModeSwitch}
          >
            <i className="ri-user-line"></i>
            User Mode
          </button>
          <Link to="/admin/products/add">Add new Product</Link>
        </div>
    </nav>
  )
}

export default Navbar