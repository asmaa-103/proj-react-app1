import axios from 'axios'
import { useFormik} from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import {useNavigate} from "react-router-dom"



export default function Register() {
  let baseUrl = "https://ecommerce.routemisr.com"
let nav = useNavigate()
  let [errorMessage, setErrorMessage] = useState("")
  let [loading , setLoading] = useState(false)

  let validationSchema = Yup.object({
    name:Yup.string().required("Name Required").min(3,"min length 3").max(20),
    email:Yup.string().required("Email Required").email("Enter Valid Email"),
    password:Yup.string().required("Password Required").matches(/^[A-z][a-z0-9]{3,16}$/ , "Enter Valid Password"),
    rePassword:Yup.string().required("rePassword required").oneOf([Yup.ref("password")]),
  phone:Yup.string().required("phone required").matches(/^01[1250][0-9]{8}$/, "Enter valid phone")
  })

  let registerform = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    validate:()=>{},
    validationSchema,
    onSubmit:submitRegister
  })

  async function submitRegister(val) {
    setLoading(true)
    let {data} = await axios.post(`${baseUrl}/api/v1/auth/signup` , val).catch((error)=>{
       
      setErrorMessage(error.response.data.message)
      setLoading(false)
    })
    if(data.message === "success"){
      nav('/login')
      setLoading(false)
    }

  }

  return (
    <>

<div className='mt-3'>

  <h2 className='text-center'>Register Form</h2>
  {errorMessage === "" ? "" :<div className="alert alert-danger text-center">{errorMessage}</div> }
  
<form onSubmit={registerform.handleSubmit}>

  <div className=' my-2'>
<label htmlFor="name">name</label>
< input onBlur={registerform.handleBlur} onChange={registerform.handleChange} className='form-control' type="text"  name="name"  id="name" />
{registerform.touched.name  && registerform.errors.name ? <p className='text-danger  my-2'>{registerform.errors.name}</p> : ""}
  </div>
  <div className=' my-2'>
<label htmlFor="email">email</label>
< input onBlur={registerform.handleBlur}  onChange={registerform.handleChange} className='form-control' type="email" name="email" id="email" />
{registerform.touched.email && registerform.errors.email ? <p className='text-danger  my-2'>{registerform.errors.email}</p> : ""}
  </div>
  <div className=' my-2'>
<label htmlFor="password">password</label>
< input onBlur={registerform.handleBlur}  onChange={registerform.handleChange} className='form-control' type="password" name="password" id="password" />
{registerform.touched.password && registerform.errors.password ? <p className='text-danger  my-2'>{registerform.errors.password}</p> :""}
  </div>
  <div className=' my-2'>
<label htmlFor="rePassword">rePassword</label>
< input onBlur={registerform.handleBlur}  onChange={registerform.handleChange} className='form-control' type="password" name="rePassword" id="rePassword" />
{registerform.touched.rePassword && registerform.errors.rePassword ? <p className='text-danger  my-2'>{registerform.errors.rePassword}</p> : ""}
  </div>
  <div className=' my-2'>
<label htmlFor="phone">phone</label>
< input onBlur={registerform.handleBlur}  onChange={registerform.handleChange} className='form-control' type="tel"  name="phone" id="phone" />
 {registerform.touched.phone && registerform.errors.phone ? <p className='text-danger  my-2'>{registerform.errors.phone}</p> : ""}
  </div>


  {loading ?<button  type='button' className='btn btn-success ms-auto d-block mt-3'>
  <i className='fa-solid fa-spinner fa-spin'></i></button> : <button disabled={!(registerform.dirty&& registerform.isValid)}
  type='submit' className='btn btn-success ms-auto d-block mt-3'>Register</button>  }







</form>
</div>
    </>
  )
}