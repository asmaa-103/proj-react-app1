import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import $ from 'jquery'
import {Helmet} from "react-helmet";

export default function WishList() {
 let {getAllWishList,addCart,  deleteWish, setCartCount} =  useContext(CartContext)
let [AllWishes ,setAllWishes ] = useState(null)

useEffect(()=>{
    getAllWishes()
},[])


async function getAllWishes (){
  $(".loading").fadeIn(1000)

    let {data} = await  getAllWishList()
    console.log(data.data);
    setAllWishes(data.data)
  $(".loading").fadeOut(1000)

}



async function Deletewishes(id){
  $(".loading").fadeIn(1000)

    let {data} = await deleteWish(id)
    console.log(data);
    setAllWishes(data.data)
    $(".loading").fadeOut(1000)

    getAllWishes ()

  }

  async function addCartData(id) {
    let { data } = await addCart(id)
    if (data.status == "success") {
      setCartCount(data.numOfCartItems)
  }
  }

  return (

  <>

  <Helmet>
    <title>wishList</title>
  </Helmet>
   <div className='loading  position-fixed top-0 end-0 bottom-0 start-0 '>
        <i className='fa-solid fa-spinner fa-spin text-white fa-3x'></i>
      </div>

  <div className=" bg-light p-4">
     {AllWishes?.map((el)=>{
 return     <div key={el._id} className="row border-buttom py-2 justify-content-between my-5">

 <div className="col-lg-6">
   
  <div className="row align-items-center">
 
    <div className="col-lg-3">
 
      <img src={el.imageCover} alt="" className="w-100"/>
    </div>
    <div className="col-lg-9">
      <h6 className='fw-bold'>{el.title}</h6>
    <p className='text-success'>{el.price} EGP</p>
 
    <p className="cursor-pointer" onClick={()=>Deletewishes(el._id)}> 
   <i className="fa-solid fa-trash-can text-danger"> </i> <span>Remove</span>
   </p>
 
    </div>
 
  </div>
 </div>


 <div className="col-lg-2">
  <button onClick={()=>{addCartData(el._id);Deletewishes(el._id)}} type="button" class="btn  btn-outline-success px-4 py-2 text-black">add To Cart</button>
 </div>
 </div>

 
      })}

      </div>
  
  
  
  </>)
}
