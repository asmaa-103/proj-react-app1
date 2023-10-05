import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function ResetPassword() {
let nav = useNavigate()
let [err, seterr] = useState("")
    let validationSchema = yup.object({
        email:yup.string().email("Enter Valid Email").required("email required"),
        newPassword:yup.string().required("Password Required").matches(/^[A-z][a-z0-9]{3,16}$/ , "Enter Valid Password"),
    })

    let  ResetPasswordForm = useFormik({
        initialValues:{
            email:"",
            newPassword:"",
        },
validationSchema,

onSubmit: ResetPassword



    })


async function ResetPassword(value){

    let{data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, value).catch((error)=>{
        seterr(error.response.data.message)

    })
    if(data.token){
        nav('/login')
    }


}
  return (
    <div>
      
      <form onSubmit={ResetPasswordForm.handleSubmit}>
      {err ? <div className='alert alert-danger'>{err}</div> : ""}
      <label htmlFor='email'>email:</label>
      <input onChange={ResetPasswordForm.handleChange} onBlur={ResetPasswordForm.handleBlur} className='form-control my-3' name='email' id='email'></input>
      {ResetPasswordForm.touched.resetCode ? <p className='text-danger'>{ResetPasswordForm.errors.email}</p>: "" }


      <label htmlFor='newPassword'>repassword:</label>
      <input  onChange={ResetPasswordForm.handleChange} onBlur={ResetPasswordForm.handleBlur}  className='form-control my-3' name='newPassword' id='newPassword'></input>
      {ResetPasswordForm.touched.resetCode ? <p className='text-danger'>{ResetPasswordForm.errors.newPassword}</p>: "" }
      <button className='btn btn-success'>reset password</button>
  </form>



    </div>
  )
}

