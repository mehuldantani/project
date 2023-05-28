import {React} from 'react'
import {NavLink} from 'react-router-dom'

const Adminmenu = () => {
  return (
    <>
        <div className="list-group text-center">
            <h4>Admin Panel</h4>
            <NavLink to="/dashboard/admin/add-product" className="list-group-item list-group-item-action">
                Create Product
            </NavLink>
            <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
                Products
            </NavLink>
            <NavLink to="/dashboard/admin/add-category" className="list-group-item list-group-item-action">
                Manage Categories
            </NavLink>
            <NavLink to="/dashboard/admin/add-coupon" className="list-group-item list-group-item-action">
                Manage Coupons
            </NavLink>
            <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
                Manage Users
            </NavLink>
            <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">
                Your Orders
            </NavLink>
        </div>
    </>
  )
}

export default Adminmenu;