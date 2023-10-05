import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from "yup"
import { CartContext } from '../Context/CartContext'
import { useParams } from 'react-router-dom'

export default function CheckOut() {
   let {id} = useParams()
let {checkPayment} = useContext(CartContext)

    let validationSchema = Yup.object({
        details:Yup.string().required("details Required").min(3,"min length 3").max(50),
        city:Yup.string().required("city Required").min(3,"min length 3").max(50),
      phone:Yup.string().required("phone required").matches(/^01[1250][0-9]{8}$/, "Enter valid phone")
      })
  let payForm =  useFormik({
    initialValues:{
        details:"",
        phone:"",
        city:""
    },


validationSchema,
onSubmit: function(val){
payShipping(val)
}
    })
  async  function payShipping(val){
let {data} = await checkPayment(id, val)
console.log(data);
if (data.status == "success"){
    window.location.href = data.session.url
}
    }
  return (
    <div className='chekout'>
      <form onSubmit={payForm.handleSubmit}>
        <label htmlFor='details'>details:</label>
        <input onChange={payForm.handleChange} onBlur={payForm.handleBlur} className='form-control' id='details' name='details'/>
        {payForm.touched.details  && payForm.errors.details ? <p className='text-danger  my-2'>{payForm.errors.details}</p> : ""}
        <label htmlFor='phone'>phone:</label>
        <input onChange={payForm.handleChange} onBlur={payForm.handleBlur} className='form-control' id='phone' name='phone' type='tel'/>
        {payForm.touched.phone  && payForm.errors.phone ? <p className='text-danger  my-2'>{payForm.errors.phone}</p> : ""}

        <label htmlFor='city'>city:</label>
        <input onChange={payForm.handleChange} onBlur={payForm.handleBlur} className='form-control' id='city' name='city'/>
        {payForm.touched.city  && payForm.errors.city ? <p className='text-danger  my-2'>{payForm.errors.city}</p> : ""}

        <button className='btn btn-success d-block w-100'>pay</button>
      </form>
    </div>
  )
}
