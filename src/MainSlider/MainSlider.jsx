import React from 'react'
import image1 from '../assets/images/image3.jpeg'
import image2 from '../assets/images/image3.jpeg'
import image3 from '../assets/images/image4.jpeg'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function MainSlider() {
  return (
    <>
      <div className="row g-0">
        <div className="col-lg-9">


<OwlCarousel className='owl-theme' loop margin={10} items={1} >
    <div className='item'>
    <img src={image1} className='w-100 mainImg' alt=''/>

    </div>
    <div className='item'>
    <img src={image2} className='w-100 mainImg' alt=''/>

    </div>
    <div className='item'>
    <img src={image3} className='w-100 mainImg' alt=''/>

    </div>
   
</OwlCarousel>;
        </div>

        <div className="col-lg-3">
        <img src={image2} className='w-100 smallImg' alt=''/>
        <img src={image3} className='w-100  smallImg' alt=''/>

        </div>
      </div>
    </>
  )
}
