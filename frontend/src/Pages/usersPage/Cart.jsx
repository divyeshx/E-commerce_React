import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserNav from "./UserNav";
import "./Cart.css";
import "./UserHome.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("https://e-commerce-react-backend-wkkw.onrender.com/cart");
      setCartItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`https://e-commerce-react-backend-wkkw.onrender.com/cart/${cartItemId}`);
      fetchCartItems(); // Refresh cart after removal
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (Number(item.productId?.price) || 0);
    }, 0);
  };

  if (loading) {
    return (
      <div>
        <UserNav />
        <div className="cart-container">
          <h2>Loading cart...</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UserNav />
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Add some products to your cart to get started!</p>
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="item-image">
                    <img src={item.productId?.image} alt={item.productId?.title} />
                  </div>
                  <div className="item-details">
                    <h3>{item.productId?.title}</h3>
                    <p>{item.productId?.description}</p>
                    <p className="price">₹{item.productId?.price}</p>
                  </div>
                  <div className="item-actions">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="total">
                <h3>Total: ₹{calculateTotal()}</h3>
              </div>
              <div className="checkout-actions">
                <Link to="/" className="continue-shopping">
                  Continue Shopping
                </Link>
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 