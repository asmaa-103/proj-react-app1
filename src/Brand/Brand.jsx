import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import $ from "jquery"
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";

export default function Brand() {
let {getAllBrands} = useContext(CartContext)
let[Brand , setBrand] = useState([])



useEffect(()=>{
  
  allBrands()

},[])

async function allBrands(){
  $(".loading").fadeIn(1000)

  let {data} = await  getAllBrands()
  console.log(data.data);
  setBrand(data.data)
  $(".loading").fadeOut(1000)

}

function getBrandModal(el){
console.log(el);
document.getElementById('demo').setAttribute("src", el.image)
document.getElementById('modelName').innerHTML = ( el.name)
document.getElementById('modelSlug').innerHTML = ( el.slug)

}

  return (
<>
<Helmet>
  <title>Brands</title>
</Helmet>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close ms-auto" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body d-flex align-items-center">
        <div className="col-lg-6">
          <h2 className='text-success' id='modelName'>{}</h2>
          <p id='modelSlug'></p>
        </div>
        <div className='col-lg-6'>
        <img src='' id='demo' alt='' className='w-100'/>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    


<div className='loading  position-fixed top-0 end-0 bottom-0 start-0 '>
  <i className='fa-solid fa-spinner fa-spin text-white fa-3x'></i>
</div>

    <div className=''>
      <h1 className=' text-center brand text-main'> All Brands</h1>
    </div>


<div className="row g-3">
{Brand.map((product, i)=>{
return  <div onClick={()=>getBrandModal(product)}  className='col-md-3 'data-bs-toggle="modal" data-bs-target="#exampleModal">

<div className=" brab border cursor-pointer">
  
<Link to= {''}>
<img src={product.image}className='w-100' alt=''/>
<p className='text-center'>{product.name}</p>


</Link>


</div>
</div>
})}
</div>

</>
    

  )
}
