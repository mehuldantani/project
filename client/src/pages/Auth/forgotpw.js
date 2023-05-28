import Layout from '../../components/layout/layout.js';
import toast from 'react-hot-toast';
import {React,useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Forgotpassword = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName] = useState("")

    const navigate = useNavigate();

  
    //handle submit
    const HandleSubmit = async (e)=>{
      e.preventDefault()
      try{
        const resp = await axios.post("api/v1/auth/password/forgot/",{
            "email": email
        }
        );
        if (resp.status === 200 && resp.data.success) {
          
          toast.success(`We have sent an email to ${email} address.`);
          // show success message to the user
          navigate('/login')
          
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
      <h2 class="text-center mb-4">Forgot Password</h2>
      <form onSubmit={HandleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Registered Email address</label>
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
        <button type="submit" class="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  </div>
  
    )
  }

export default Forgotpassword;