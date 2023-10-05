import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props){
   let [CartCount, setCartCount] = useState(0)

let headersData = {
   token : localStorage.getItem("userToken")
}
useEffect(()=>{
 async function getData(){
let {data} = await getAllCartData()
setCartCount(data.numOfCartItems)
  }
  getData()
}, [])


function getAllCartData(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers: headersData
    
       })
  
}

function getAllBrands(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`,{
  headers: headersData

   })
}

function getAllCategory(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`,{
  headers: headersData

   })
}
function deleteProduct(id){
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
  headers: headersData

   })
}



function addWishList(id){
   let body = {
      "productId":id
   }
   return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` ,  body ,{

   headers: headersData
    })
}

function getAllWishList(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      headers: headersData
    
       })
}


function deleteWish(id){
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
  headers: headersData

   })
}

function UpdateProduct(id, count){
   let body = {
       "count":count
    }
   return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, body ,{
 
   headers: headersData
    })
 }


 function checkPayment (id,shippingData){
   let body = {
      shippingAdress: shippingData
   }
   return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?
   url=http://localhost:3000/`, body, {
      headers: headersData
   })
 }

function addCart(id){
  let body = {
      "productId":id
   }
  return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, body ,{

  headers: headersData
   })
}

function getSubCategory(id){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories `,{
      headers: headersData
   })
}



   return <CartContext.Provider value={{addCart,CartCount,setCartCount,getSubCategory, getAllCartData, deleteProduct, UpdateProduct,   checkPayment, getAllBrands, getAllCategory,addWishList,
      getAllWishList, deleteWish, }}>
     { props.children}
   </CartContext.Provider>
}
