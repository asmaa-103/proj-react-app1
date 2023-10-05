import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { CartContext } from '../Context/CartContext';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';


export default function ProductsDetails() {
let {addCart, setCartCount} = useContext (CartContext)
  let { id } = useParams()
  let [Product, setproduct] = useState(null)
  useEffect(() => {
    getProductDetails()
  }, [])



  async function getProductDetails() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setproduct(data.data)

  }


  
  async function addCartData(id) {
    let { data } = await addCart(id)
    if (data.status == "success") {
      setCartCount(data.numOfCartItems)
    toast.success(data.message, {
      position: 'top-right'
    })
    }else{
      toast.error("error")
    }
  }
  return (
    <>
    <Toaster></Toaster>
      {Product != null ? <div className='row d-flex align-items-center justify-content-center'>
        <div className='col-lg-3'>
          <OwlCarousel className='owl-theme' loop margin={10} items={1} >
            {Product.images.map((el) => {

              return <div class='item'>
                <img src={el} className='w-100' alt='' />


              </div>
            })}

          </OwlCarousel>;
        </div>
        <div className="col-lg-9">
          <h3>{Product.title}</h3>
          <p>{Product.description}</p>
          <p className='text-main'>{Product.category.name}</p>
          <div className='d-flex justify-content-between'>
            <span>{Product.price}EGP</span>
            <span><i className='fa-solid fa-star rating-color'></i>{Product.ratingsAverage}</span>
          </div>

          <button  onClick={() => addCartData(Product._id)} className='btn btn-success w-100 my-4'>Add To Cart</button>
        </div>

      </div> : ""}



    </>
  )
}
