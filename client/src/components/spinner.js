import React,{useState,useEffect, useInsertionEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';

const Spinner = ({path = "login"}) => {

  const [count,setCount] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
    const interval = setInterval(() => {
      setCount((prevval) => --prevval)
    }, 1000);

    count === 0 && navigate(`/${path}`,{
      state:location.pathname
    })
    
    return ()=> clearInterval(interval)
  },[count,navigate,location,path])

  return (
    <>
    <div
  className="d-flex flex-column justify-content-center align-items-center"
  style={{ height: "100vh" }}>
  <div className='mb-3'>
  <div className="spinner-grow mx-2" role="status"></div>
  <div className="spinner-grow mx-2" role="status"></div>
  <div className="spinner-grow mx-2" role="status"></div>
  </div>
  <span className="sr-only fs-3">Authenticating . . .</span>
</div>

    </>
  )
}

export default Spinner;