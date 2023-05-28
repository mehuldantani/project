import Layout from '../../components/layout/layout.js';
import toast from 'react-hot-toast';
import {React,useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName] = useState("")

    const navigate = useNavigate();

  
    //handle submit
    const HandleSubmit = async (e)=>{
      e.preventDefault()
      try{
        const resp = await axios.post("api/v1/auth/signup",{
            "name": name,
            "email": email,
            "password": password
        }
        );
        if (resp.status === 200 && resp.data.success) {
          // show success message to the user
          //navigate('/contact')
          toast.success("User Created Successfully.");
          
        } else {
          // show error message to the user
          toast.error("Something Went Wrong.");
        }
      } catch(error){
        console.log(error)
        toast.error("Something Went Wrong.")
      }
    }
  
    return (
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="max-width-250 rounded p-5 login-container">
      <h2 class="text-center mb-4">Sign Up</h2>
      <form onSubmit={HandleSubmit}>
        <div class="mb-3">
          <label for="exampleInputName" class="form-label">Name</label>
          <input 
            type="text" 
            class="form-control" 
            id="exampleInputName" 
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            required
          />
        </div>
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
      <Link to='/login' className="signin">
        Sign In
        </Link>
      </div>
    </div>
  </div>
    )
  }

export default Register;