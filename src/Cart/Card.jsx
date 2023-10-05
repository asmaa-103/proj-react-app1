import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import $ from "jquery"
import {Helmet} from "react-helmet";

import { Link } from "react-router-dom";
 export default function Card() {
let[ CartData, setCartData] = useState(null)


  
let {getAllCartData, deleteProduct, UpdateProduct, CartCount, setCartCount} = useContext(CartContext)
    useEffect(()=>{
  
      getAllData()

    },[])






    async function getAllData(){
      $(".loading").fadeIn(1000)
      let {data} = await  getAllCartData()
      setCartData(data.data)
      $(".loading").fadeOut(1000)
    }
async function DeleteProduct(id){
  let {data} = await deleteProduct(id)
  setCartData(data.data)
setCartCount(data.numOfCartItems)

}
async function UpdateCount(id,count){
let {data} = await  UpdateProduct(id,count)
console.log(data);

setCartData(data.data)
}



   return (
   <>

   <Helmet>
    <title>Cart</title>
   </Helmet>
<div className='loading  position-fixed top-0 end-0 bottom-0 start-0 '>
  <i className='fa-solid fa-spinner fa-spin text-white fa-3x'></i>
</div>

     <div className=" bg-light p-4 cart">


       <div className=" row d-flex justify-content-betwween ">
<div className="col-lg-4">
  <h3 className="cartshop">Cart Shop</h3>
<h5 className="">Total Price:{}<span className="text-main"> { CartData?.totalCartPrice}</span></h5>
</div>
<div className="col-lg-4 ms-auto">
< Link to={ '/checkout/' +  CartData?._id }>
        <span  className="btn btn-primary btn-lg ng-star-inserted check">Check Out</span>
       </Link>
<h4>total number of items: <span className="text-success">{CartCount}</span></h4>

</div>
       </div>

     {CartData?.products.map((el)=>{
 return     <div key={el._id} className="row border-buttom py-2 justify-content-between my-5">

<div className="col-lg-12">
 <div className="row justify-content-betwween align-items-center">

   <div className="col-lg-2">

     <img src={el.product.imageCover} alt="" className="w-100"/>
   </div>



   <div className="col-lg-8">
   <h4>{el.product.title.split(" ").slice(0, 2).join(" ")}</h4>
   <p  className="text-main">{el.price} EGP</p>
   <p className="cursor-pointer" onClick={()=>DeleteProduct(el.product._id)}> 
   <i className="fa-solid fa-trash-can text-danger"> </i> <span>Remove</span>

   </p>

   </div>


<div className="col-lg-2">

  


<button onClick={()=>UpdateCount(el.product._id , el.count + 1 )}   _ngcontent-txy-c24="" class="btn btn-count btn-md">+</button>

<span className="mx-2">{el.count} </span>
<button  disabled={el.count== 0} onClick={()=>UpdateCount(el.product._id , el.count - 1 )}   _ngcontent-txy-c24="" class="btn btn-count btn-md">-</button>
</div>

 </div>
</div>


</div>



     })}
     </div>
     </>
   )
 }
 