import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function ForgetPassword() {

  let Nav =  useNavigate()


    let [errors, seterrors]= useState("")

let  validationSchema = yup.object({
    email:yup.string().email("Enter Valid Email").required("email required")
})
let forgetForm = useFormik({
    initialValues:{
        email:"",
    },
    validationSchema,
    onSubmit: sendForgetApi
})

async function sendForgetApi(val){
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, val).catch((err)=>{
console.log(err);
    })

    if(data.statusMsg   == "success"){
document.getElementById("resetForm").classList.remove("d-none")
document.getElementById("forgetForm").classList.add("d-none")
    }
    console.log(data);
}





let  validationSchema2 = yup.object({
    resetCode:yup.string().matches(/^[0-9]+$/, "must be only number").required("resetCode required")
})

let resetForm = useFormik({
    initialValues:{
        resetCode:""
    },
    validationSchema: validationSchema2,
onSubmit: sendResetCode

})

 async function sendResetCode(value){
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, value).catch((err)=>{
        seterrors(err.response.data.message)

        console.log(err.response.data.message);
            })

            if(data.status == "Success"){
                Nav('/resetpassword')
            }
            console.log(data);

            }

    
 


  return  (

<>
  
  <div className='my-5' id='forgetForm'>
        
  
        <form onSubmit={forgetForm.handleSubmit}> 
         <label htmlFor='email'>Enter Email:</label>
            <input className='form-control my-2' name='email' id='email' onChange={forgetForm.handleChange} onBlur={forgetForm.handleBlur}></input>
           {forgetForm.errors.email && forgetForm.touched.email ? <p className='text-danger'>{forgetForm.errors.email}</p>: "" }
        
        
           <button disabled={!(forgetForm.isValid)}  className=' btn btn-success'>Send </button>
        </form>
        
            </div>
    
    
  
    <div className='my-5 d-none' id='resetForm'>
  
  
  <form   onSubmit={resetForm.handleSubmit}>
   {errors ? <div className='alert alert-danger'>{errors}</div> : ""}
      <label htmlFor='resetCode'>Reset Code:</label>
      <input onBlur={resetForm.handleBlur} onChange={resetForm.handleChange} className='form-control my-3' name='resetCode' id='rsetCode'></input>
      {resetForm.touched.resetCode ? <p className='text-danger'>{resetForm.errors.resetcode}</p>: "" }
      <button  disabled= {!(resetForm.isValid)}className='btn btn-success'>Verify Code</button>
  </form>
  
    </div>
    </>



  )
}


  