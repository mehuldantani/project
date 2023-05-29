import {Routes,Route} from 'react-router-dom'
import Homepage from './pages/HomePage.js'
import Contact from './pages/contact.js'
import About from './pages/About.js'
import Cart from './pages/cart.js'
import PageNotFound from './pages/pagenotfound.js'
import Admindashboard from './pages/Admin/admindashboard.js'
import Createproduct from './pages/Admin/createproduct.js'
import Createcategory from './pages/Admin/createcategory.js'
import Createcoupon from './pages/Admin/createcoupon.js'
import Products from './pages/Admin/products.js'
import Register from './pages/Auth/register.js'
import Login from './pages/Auth/login.js'
import Dashboard from './pages/user/dashboard.js'
import PrivateRoute from './components/routes/private.js'
import Forgotpassword from './pages/Auth/forgotpw.js'
import Resetpassword from './pages/Auth/resetpw.js'
import AdminRoute from './components/routes/admin.js'
import Users from './pages/Admin/user.js'
import Myorders from './pages/user/myorders.js'
import Myadminorders from './pages/user/myordersadmin.js'
import Myprofile from './pages/user/myprofile.js'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PrivateRoute/>}>
          <Route path='/cart' element = {<Cart/>} />
          <Route path='' element = {<Homepage/>} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path='user' element = {<Dashboard/>} />
          <Route path='user/profile' element = {<Myprofile/>} />
          <Route path='user/orders' element = {<Myorders/>} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path='admin' element = {<Admindashboard/>} />
          <Route path='admin/add-product' element = {<Createproduct/>} />
          <Route path='admin/add-category' element = {<Createcategory/>} />
          <Route path='admin/add-coupon' element = {<Createcoupon/>} />
          <Route path='admin/users' element = {<Users/>} />
          <Route path='admin/orders' element = {<Myadminorders/>} />
          <Route path='admin/products' element = {<Products/>} />
        </Route>
        <Route path='/login' element = {<Login/>} />
        <Route path='/register' element = {<Register/>} />
        <Route path='/forgotpassword' element = {<Forgotpassword/>} />
        <Route path='/resetpassword/:token' element = {<Resetpassword/>} />
        <Route path='/contact' element = {<Contact/>} />
        <Route path='/about' element = {<About/>} />
        <Route path='/*' element = {<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
