import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'

export default function Navbar({userData, Logout}) {
 let {CartCount} = useContext(CartContext)
  return (
    <>
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
  <div className="container">
    <Link className="navbar-brand" to="home">
<h3><i class="fa-solid fa-cart-shopping text-success"></i>fresh cart</h3>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon">
</span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     {userData != null ?  <ul className="navbar-nav m-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="home" >Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="cart" >Cart </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="wishList" >wisList</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="product" >Products </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="brand" >Brand </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="category" >Category </Link>
        </li>
   
      </ul> : ""}



      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      
       {userData == null ? <>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="login" >Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/" >Register</Link>
        </li>
       
       </> :  <>
       
       <li className="nav-item">
          <Link className="nav-link position-relative" aria-current="page" to='cart' >

          <i class="fa-solid fa-cart-shopping fa-lg "></i>
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
{CartCount}
  </span>


          </Link>
        </li>
       
        <li className="nav-item">
          <span onClick={Logout} className="nav-link cursor-pointer " aria-current="page" to="product" >LogOut</span>
        </li></>}
      
       
      
      </ul>
      
    </div>
  </div>
</nav>
    </>
  )
}