import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast'
import {Helmet} from "react-helmet";

export default function Product() {
  let { addCart,addWishList,setCartCount  } = useContext(CartContext)
  let [SearchList, setSearchList] = useState([])


  let basUrl = 'https://ecommerce.routemisr.com'
  let [products, setproducts] = useState([])

  useEffect(() => {
    getAllProducts()
    $(".pageItem").on("click", function (e) {
      let page = $(e.target).html()
      console.log(page);
      getAllProducts(page)
    })
  }, [])
  async function getAllProducts(page = 1) {
    $(".loading").fadeIn(1000)

    let { data } = await axios.get(`${basUrl}/api/v1/products?page=${page}`)
    setproducts(data.data)
    setSearchList(data.data)
    $(".loading").fadeOut(1000)
  }


  async function addCartData(id) {
    let { data } = await addCart(id)
    if (data.status == "success") {
      setCartCount(data.numOfCartItems)

      toast.success(data.message,{
        position: 'top-right',
      style: {
        backgroundColor: 'rgb(79, 167, 79)',
        color: 'white',
      },
      })
    } else {
      toast.error("error")
    }
  }

  async function addWishListData(id) {
    let { data } = await addWishList(id)
   console.log(data.data);
   if (data.status == "success") {
    toast.success(data.message,{
      position: 'top-right',
      style: {
        backgroundColor: 'rgb(79, 167, 79)',
        color: 'white',
      },

    })
  } else {
    toast.error("error")
  }
  }


  function search(e){
    console.log(e.target.value);
    let searchVal = e.target.value
  
    let myProduct = [...SearchList]
    myProduct = SearchList.filter((el)=>{
      return el.title.toLowerCase().includes(searchVal.toLowerCase())
    })
    console.log(myProduct);
    setproducts(myProduct)
  }
  

  return (
   
<>
<Helmet>
  <title>Products</title>
</Helmet>
<Toaster></Toaster>
    <div className='loading  position-fixed top-0 end-0 bottom-0 start-0 '>
      <i className='fa-solid fa-spinner fa-spin text-white fa-3x'></i>
    </div>
 <input type='text' onChange={search} placeholder='searsh...' className='form-control w-75 mx-auto inputSearch'/>

    <div className='row my-5 g-4'>

      {products.map((product) => {
        return <div key={product._id} className='col-md-3'>

          <div className="product p-3 cursor-pointer">

            <Link to={'/productdetails/' + product._id}>
              <img src={product.imageCover} className='w-100' alt='' />
              <p className='text-main'>{product.category.name}</p>
              <h6>{product.title.split(" ").slice(0, 2).join(" ")}</h6>
              <div className='d-flex justify-content-between'>
                <span>{product.price} EGP</span>
                <span><i className='fa-solid fa-star rating-color'></i>{product.ratingsAverage}</span>
              </div>

            </Link>
<div className='d-flex justify-content-between align-items-center'>
<button onClick={() => addCartData(product._id)} className='btn  my-2 d-block w-75 addcart'>Add Card</button>
            <i className="fa-solid fa-heart fs-5 heart "  onClick={() => addWishListData(product._id)}></i>
</div>
         



          </div>
        </div>
      })}
    </div>
    <nav className='d-flex justify-content-center' aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item"><a className="page-link  pageItem" >1</a></li>
        <li className="page-item"><a className="page-link  pageItem" >2</a></li>
      </ul>
    </nav>


  </>
  )
}
