import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import UserNav from './UserNav'
import './UserHome.css'
import '../productDetail.css'
const UserProductDetail = () => {

   const {productId} = useParams()
    
    useEffect(() => {
        getProductDetail()

    }, [])
    
    const [productData, setproductData] = useState({})

    const getProductDetail = async()=>{

       await axios.get("https://e-commerce-react-backend-wkkw.onrender.com/products/"+productId)
        .then((res)=>{
            console.log(res);
            setproductData(res.data.product)
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    const addToCart = async () => {
        try {
            await axios.post(`https://e-commerce-react-backend-wkkw.onrender.com/cart/add/${productId}`);
            alert('Product added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add product to cart');
        }
    }

  return (
    <div>
      <UserNav />
      <div className='product-container'>
       
        <div className="main">
          <div className="left">
              <img src={productData.image} alt={productData.title} />
          </div>
          <div className="right">
              <div className="product-header">
                <h1>{productData.title}</h1>
              </div>
              
              <div className="product-description">
                <h3>Description</h3>
                <p>{productData.description}</p>
              </div>

              <div className="product-price">
                <div className="price-container">
                  <span className="current-price">₹{productData.price}</span>
                </div>
              </div>

              <div className="product-actions">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <select id="quantity" defaultValue="1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                
                <div className="action-buttons">
                  <button className="buy-now-btn" onClick={addToCart}>
                    <i className="ri-shopping-bag-line"></i>
                    Buy Now
                  </button>
                  <button className="add-to-cart-btn" onClick={addToCart}>
                    <i className="ri-shopping-cart-line"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserProductDetail
