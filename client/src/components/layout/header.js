import React from 'react'
import {NavLink,Link} from 'react-router-dom'
import {HiShoppingCart} from 'react-icons/hi'

const header = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="brand">
    <Link to='/' className="navbar-brand">
    <HiShoppingCart style={{ fontSize: '40px' }} /> CloudCart
    </Link>
    </div>
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarText"
    aria-controls="navbarText"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <NavLink to='/asd' className="nav-link">
          Categories
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/contact' className="nav-link">
          Coupons
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/as' className="nav-link">
          Cart(0)
        </NavLink>
      </li>
    </ul>
  </div>
    </nav>
    </>
  )
}

export default header