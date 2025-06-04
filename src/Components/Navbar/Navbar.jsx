import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/freshcart-logo.svg'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthStore'
import { CartContext } from '../../Context/CartContext'
import { ValidationContext } from '../UpdateData/ValidationContext'

export default function Navbar() {
  const { token } = useContext(AuthContext);
  const {numOfCartItems} = useContext(CartContext);
  const {handleLogout} = useContext(ValidationContext);
  




  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/products">
    <img src={logo} alt="Fresh Cart Logo." />
    
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {token && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/products">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item position-relative">
          {/* Cart link with badge for number of items */}
          <Link className="nav-link" to="/cart">Cart</Link>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {numOfCartItems ? numOfCartItems : ''}
          </span>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/allorders">All Orders</Link>
        </li>
      </ul>}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
        <li className="nav-item">
          <ul className='list-unstyled d-flex gap-2 align-items-center'>
            <li>
              <i className='fa-brands fa-instagram'></i>
            </li>
            <li>
              <i className='fa-brands fa-facebook-f'></i>
            </li>
            <li>
              <i className='fa-brands fa-linkedin'></i>
            </li>
            <li>
              <i className='fa-brands fa-twitter'></i>
            </li>
          </ul>
        </li>
        
        
        { token ? <>  <li className="nav-item">
          <Link  to={'/profile'}  className="nav-link">Profile</Link>
        </li>  <li className="nav-item">
          <span role='button' onClick={handleLogout} className="nav-link">Logout</span>
        </li></> : <><li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li></> }
      </ul>
      
    </div>
  </div>
</nav>
    
    </>
  )
}
