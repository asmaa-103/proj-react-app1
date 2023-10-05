import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function Category() {
    let[CategoryList, setCategoryList] = useState ([])
    useEffect(()=>{
        getAllCategory()
    },[])

    async function getAllCategory(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setCategoryList(data.data)
    }
  return (
    <div>
      
      <OwlCarousel className='owl-theme'  items={6} loop >
  {CategoryList.map((el)=>{
    return   <div className='item'>
   <img src={el.image} className='smallImg w-100' alt=''/>

    </div>
  })}
   
   
</OwlCarousel>;
    
    </div>
  )
}