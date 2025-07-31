import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "./productDetail.css"
import axios from 'axios'
import Navbar from '../components/Navbar'

const ProductDetail = () => {

   const {productId} = useParams()
    
    useEffect(() => {
        getProductDetail()

    }, [])
    

    const getProductDetail = async()=>{

       await axios.get("https://e-commerce-react-backend-wkkw.onrender.com/products/"+productId)
        .then((res)=>{
            console.log(res);
            
        })
        .catch((err)=>{
            console.log(err);
        })

    }

  return (
    <div>
      <Navbar />
      <div className='product-container'>
     
        <div className="main">
          <div className="left">
              <img src="https://www.shutterstock.com/image-vector/man-inscription-admin-icon-outline-600nw-1730974153.jpg" alt="ADMIN RIGHTS" />
          </div>
          <div className="right">
              <h1>Restricted</h1>
             {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, perspiciatis quas nostrum est non quia dolor odio dolore? Error, distinctio.</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
