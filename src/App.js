import React, { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter,Navigate, createHashRouter } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import Notfound from './Notfound/Notfound'
import Product from './Products/Products'
import Card from './Cart/Card'
import jwtDecode from 'jwt-decode'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import ResetPassword from './ResetPassword/ResetPassword'
import ProductsDetails from './ProductDetails/ProductsDetails'
import CartContextProvider from './Context/CartContext'
import CheckOut from './CheckOut/CheckOut'
import Brand from './Brand/Brand'
import Categry from './Category/Categry'
import WishList from './WishList/WishList'

export default function App() {
let [userData, sedtUserDAta]= useState(null)
useEffect(()=>{
  if(localStorage.getItem("userToken")){
let token = localStorage.getItem("userToken")
 let data = jwtDecode(token)
 console.log(data);
 saveUserData(data)
  }
},[])
function saveUserData(data){
  sedtUserDAta(data)
}



function ProductRouer(props){
console.log(props);

if(localStorage.getItem("userToken")){
return props.children
}else{
 return <Navigate to="/login"></Navigate>

}
}

function Logout(){
  saveUserData(null)
  localStorage.removeItem("userToken")
 return <Navigate to="/login"></Navigate>

}
   
  let routes = createHashRouter([
    {path:"", element:<Layout Logout={Logout}   userData={userData}/> , children:[
      {path:"home" , element: <ProductRouer><Home userData={userData}/></ProductRouer>},
      {path:"cart" , element:  <ProductRouer> <Card    userData={userData}/></ProductRouer>},
      {path:"checkout/:id" , element:  <ProductRouer> <CheckOut/></ProductRouer>},
      {path:"brand" , element:  <ProductRouer> <Brand/></ProductRouer>},
      {path:"category" , element:  <ProductRouer> <Categry/></ProductRouer>},
      {path:"wishList" , element:  <ProductRouer> <WishList/></ProductRouer>},

      {path:"product" , element: <ProductRouer>  <Product   userData={userData}/></ProductRouer>},
      {path:"productdetails/:id" , element: <ProductRouer>  <ProductsDetails/></ProductRouer>},

      {path:"login" , element:<Login saveUserData ={ saveUserData}/>},
      {path:"forgetpassword" , element:  <ForgetPassword/>},
      {path:"resetpassword" , element:  <ResetPassword/>},


      {index:true , element:<Register/>},
      {path:"*" , element:<Notfound></Notfound>}
    ]}
  ])
  return <>
<CartContextProvider>
<RouterProvider router={routes} />

</CartContextProvider>


  
        </>
}

  