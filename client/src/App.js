import {Routes,Route} from 'react-router-dom'
import Homepage from './pages/HomePage.js'
import Contact from './pages/contact.js'
import About from './pages/About.js'
import PageNotFound from './pages/pagenotfound.js'
import Register from './pages/Auth/register.js'
import Login from './pages/Auth/login.js'
import Dashboard from './pages/user/dashboard.js'
import PrivateRoute from './components/routes/private.js'
import Forgotpassword from './pages/Auth/forgotpw.js'
import Resetpassword from './pages/Auth/resetpw.js'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PrivateRoute/>}>
          <Route path='' element = {<Homepage/>} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path='' element = {<Dashboard/>} />
        </Route>
        <Route path='/login' element = {<Login/>} />
        <Route path='/register' element = {<Register/>} />
        <Route path='/forgotpassword' element = {<Forgotpassword/>} />
        <Route path="/resetpassword" element={<PrivateRoute/>}>
          <Route path='' element = {<Resetpassword/>} />
        </Route>
        <Route path='/resetpassword/:token' element = {<Resetpassword/>} />
        <Route path='/contact' element = {<Contact/>} />
        <Route path='/about' element = {<About/>} />
        <Route path='/*' element = {<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
