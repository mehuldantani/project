import React from 'react'
import {NavLink} from 'react-router-dom'

const header = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink to='/' className="navbar-brand">
    CloudCart
  </NavLink>
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
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <NavLink to='/' className="nav-link">
          Home <span className="sr-only"></span>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/' className="nav-link">
          Categories
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/contact' className="nav-link">
          Coupons
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/' className="nav-link">
          Orders
        </NavLink>
      </li>
    </ul>
  </div>
</nav>

    </>
  )
}

export default header