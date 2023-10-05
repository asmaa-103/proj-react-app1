import React from 'react'
import image from '../../src/assets/images/noot.jpg'


export default function Notfound() {
  return (
    <div>
      <div className='d-flex justify-items-center align-items-center  notfound '>
        <img src={image} className='w-75' alt=''/>
      </div>
    </div>
  )
}
