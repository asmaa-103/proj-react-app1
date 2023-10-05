import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import $ from 'jquery'
import {Helmet} from "react-helmet";



export default function Categry() {
    let {getAllCategory, getSubCategory} = useContext(CartContext)
let[Categry , setCategory] = useState([])
let[SubCategory, setSubCategory] = useState([])


useEffect(()=>{
  
    allCategory()
},[])

async function allCategory(){
  $(".loading").fadeIn(1000)

  let {data} = await  getAllCategory()
  setCategory(data.data)
  $(".loading").fadeOut(1000)

}

async function getSubCategorios(id){
  $(".loading").fadeIn(1000)

  let {data} = await getSubCategory(id)
  console.log(data.data);
  setSubCategory(data.data)
  $(".loading").fadeOut(1000)

}
  
  return (
    <>

<Helmet>
  <title>categories</title>
</Helmet>

<div className='loading  position-fixed top-0 end-0 bottom-0 start-0 '>
        <i className='fa-solid fa-spinner fa-spin text-white fa-3x'></i>
      </div>
    
    <div className="row">
    {Categry.map((product)=>{
   
    return  <div key={product._id}  className='col-md-4 g-4' onClick={()=>getSubCategorios(product._id)}>
    
    <div className=" brab border cursor-pointer">
      
    <img src={product.image}className='w-100 immgg' alt=''/>
    <p className='text-center text-main fs-5'>{product.slug}</p>
    
    </div>

    </div>
    })}

    </div>
    
    <div className="row my-5 d-flex align-items-center justify-content-center ">
      {SubCategory.map((el)=>{

        return <>

        
        <div className="col-md-3 border g-4 me-3 p-3"  key={el._id} >
<h3> {el.name}</h3>

</div>
        </>






      })}
    </div>


    </>
  )
}
