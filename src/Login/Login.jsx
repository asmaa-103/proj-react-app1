import axios from 'axios'
import { useFormik} from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import {Link, useNavigate} from "react-router-dom"


export default function Login({saveUserData}) {
  let baseUrl = "https://ecommerce.routemisr.com/"
  let nav = useNavigate()
    let [errorMessage, setErrorMessage] = useState("")
    let [loading , setLoading] = useState(false)
  
    let validationSchema = Yup.object({
      email:Yup.string().required("Email Required").email("Enter Valid Email"),
      password:Yup.string().required("Password Required").matches(/^[A-z][a-z0-9]{3,16}$/ , "Enter Valid Password"),
    })
  
    let loginform = useFormik({
      initialValues:{
        email:"",
        password:""
      
      },
      validate:()=>{},
      validationSchema,
      onSubmit:submitlogin
    })
  
    async function submitlogin(val) {
      setLoading(true)
      let {data} = await axios.post(`${baseUrl}api/v1/auth/signin` , val).catch((error)=>{
        setErrorMessage(error.response.data.message)
        setLoading(false)
      })


      if(data.message === "success"){
        setLoading(false)
        localStorage.setItem("userToken",data.token )
        saveUserData(data.user)
        console.log(data.user);
        nav('/home')

      }
  
    }
  
  
  
  
    return (
      <>
  
  <div className='mt-3'>
  
    <h2 className='text-center'>Login Form</h2>
    {errorMessage === "" ? "" :<div className="alert alert-danger text-center">{errorMessage}</div> }
    
  <form onSubmit={loginform.handleSubmit}>
  
    <div className=' my-2'>
  <label htmlFor="email">email</label>
  < input onChange={loginform.handleChange} className='form-control' type="email" name="email" id="email" />
  <p className='text-danger  my-2'>{loginform.errors.email}</p>
    </div>
    <div className=' my-2'>
  <label htmlFor="password">password</label>
  < input onChange={loginform.handleChange} className='form-control' type="password" name="password" id="password" />
  <p className='text-danger  my-2'>{loginform.errors.password}</p>
    </div>
  <Link to= '/forgetpassword'>Forgetpassword..?</Link>
    {loading ?<button  type='button' className='btn btn-success ms-auto d-block mt-3'>
    <i className='fa-solid fa-spinner fa-spin'></i></button> : <button disabled={!(loginform.dirty&& loginform.isValid)}
    type='submit' className='btn btn-success ms-auto d-block mt-3'>Login</button>  }
  
  
  
  
  
  
  
  </form>
  </div>
      </>
    )
}