import {React} from 'react'
import {NavLink} from 'react-router-dom'

const Adminmenu = () => {
  return (
    <>
        <div className="list-group text-center">
            <h4>Admin Panel</h4>
            <NavLink to="/dashboard/admin/add-product" className="list-group-item list-group-item-action">
                Add New Product
            </NavLink>
            <NavLink to="/dashboard/admin/add-category" className="list-group-item list-group-item-action">
                Add New Category
            </NavLink>
            <NavLink to="/dashboard/admin/add-coupon" className="list-group-item list-group-item-action">
                Add New Coupon Code
            </NavLink>
            <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
                All Users
            </NavLink>
            <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
                Product List
            </NavLink>
            <NavLink to="/dashboard/admin/categories" className="list-group-item list-group-item-action">
                Category List
            </NavLink>
            <NavLink to="/dashboard/admin/coupons" className="list-group-item list-group-item-action">
                Coupon Code List
            </NavLink>
        </div>
    </>
  )
}

export default Adminmenu;