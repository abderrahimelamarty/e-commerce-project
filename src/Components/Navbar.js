import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png'
import logo1 from'./logo cart.png'
import { auth } from '../Config/Config';


export const Navbar = ({user,totalProducts,uid}) => {
   const admin='vxlnFA5zTjQ2PjJGkGWdfTenMz62';
   const client=uid;
   console.log(client);
   const nav=useNavigate();
   const logout=()=>{
    auth.signOut().then(()=>{
      nav("/login", { replace: true });

    })
  }
  return (
    <div>
 <nav className="navbar navbar-expand-sm bg-light  fixed-top  navbar-dark">
   
  <div className="container-fluid ">
    <Link className="navbar-brand" to="/">
       <img src={logo} alt="Avatar Logo" style={{width:"80px"}}/>   
    </Link>
    {!user&& <>
      <ul className='nav'>
      <li className="nav-item">
      <Link className="nav-link" to="login" style={{color:"black"}}>Login</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="signup" style={{color:"black"}} >Sign up</Link>
    </li>
    </ul>
    </>}

{user&&client==admin&&
<>
<ul className="navbar-nav justify-content-center">
  <li className="nav-item">
    <Link  className='nav-link'   to="/"   style={{color:"black"}}> <h3> This is your e-commerce website {user}</h3></Link>
    </li>
  </ul>
  <ul className="navbar-nav justify-content-right">
  <span className='cart-indicator'> {totalProducts}</span>
    <li className="nav-item">
      <Link className="nav-link" to="/cart" style={{color:"black"}} ><img src={logo1} style={{width:"30px"}}></img></Link>
     
    </li>
  
    <li>
   <Link className='nav-link' to="/AddProducts"> < button  className='btn btn-primary'> Add Products</button></Link> 
    </li>
    <li>
      <Link className="nav-link" to="/" style={{color:"black"}} >< button  className='btn btn-primary'  onClick={logout}> logout</button></Link>
    </li>
   
  </ul>
</>
}
{user&&client!==admin &&
<>
<ul className="navbar-nav justify-content-center">
  <li className="nav-item">
    <Link  className='nav-link'   to="/"   style={{color:"black"}}> <h3>Welecome to Our ecommerce website {user}</h3></Link>
    </li>
  </ul>
  <ul className="navbar-nav justify-content-right">
  <span className='cart-indicator'> {totalProducts}</span>
    <li className="nav-item">
      <Link className="nav-link" to="/cart" style={{color:"black"}} ><img src={logo1} style={{width:"30px"}}></img></Link>
     
    </li>
  
   
    <li>
      <Link className="nav-link" to="/" style={{color:"black"}} >< button  className='btn btn-primary'  onClick={logout}> logout</button></Link>
    </li>
   
  </ul>

</>
}

 

    
  </div>
</nav>


    </div>
  )
}

export default Navbar;
