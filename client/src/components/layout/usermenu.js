import React from 'react'
import { NavLink } from 'react-router-dom'

const Usermenu = () => {
  return (
    <>
         <div className="list-group text-center">
            <h4>User Panel</h4>
            <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
                Profile
            </NavLink>
            <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
                My Orders
            </NavLink>
        </div>
    </>
  )
}

export default Usermenu