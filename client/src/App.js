import {Routes,Route} from 'react-router-dom'
import Homepage from './pages/HomePage.js'
import Contact from './pages/contact.js'
import About from './pages/About.js'
import PageNotFound from './pages/pagenotfound.js'
import Register from './pages/Auth/register.js'
import Login from './pages/Auth/login.js'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Login/>} />
        <Route path='/register' element = {<Register/>} />
        <Route path='/contact' element = {<Contact/>} />
        <Route path='/about' element = {<About/>} />
        <Route path='/*' element = {<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
