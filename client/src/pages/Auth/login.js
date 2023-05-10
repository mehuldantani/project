import {React,useState} from 'react';
import Layout from '../../components/layout/layout.js';
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../../context/auth.js';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();


  //handle submit
  const HandleSubmit = async (e)=>{
    e.preventDefault()
    try{
      const resp = await axios.post("api/v1/auth/login",{
        "email": email,
        "password": password
      }
      );
      if (resp.status === 200 && resp.data.success) {
        setAuth({
          ...resp.data.userExists
        })
        // show success message to the user
        toast.success("Login successful");
        navigate('/')
      } else {
        // show error message to the user
        toast.error("Invalid email or password");
      }
    } catch(error){
      console.log(error)
      toast.error("Something Went Wrong.")
    }
  }

  return (
    <Layout>
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="max-width-250 rounded p-5 login-container">
        <h2 class="text-center mb-4">Sign In</h2>
        <form onSubmit={HandleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input 
              type="email" 
              class="form-control" 
              id="exampleInputEmail1" 
              aria-describedby="emailHelp"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input 
              type="password" 
              class="form-control" 
              id="exampleInputPassword1"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Submit</button>
        </form>
        <div class="mt-3 text-center">
        <Link to='/register' className="singup">
          Sign up now
          </Link>
        </div>
      </div>
    </div>
  </Layout>

  )
}

export default Login;
