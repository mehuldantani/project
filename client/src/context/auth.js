import {useState,useEffect,useContext,createContext} from "react";
import axios from "axios";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
      user: null,
      token: "",
    });
 
    //set defaultheader token on all request
    axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(()=>{
      const data = localStorage.getItem('auth')

      if(data){
        const parseData = JSON.parse(data)
        setAuth({
          ...auth,
          user: parseData.userExists.name,
          token: parseData.token
        })
      }

    },[])
    return (
      <AuthContext.Provider value={[auth, setAuth]}>
        {children}
      </AuthContext.Provider>
    );
  };

//custom hook
const useAuth = () => {
    return useContext(AuthContext)
}

export { useAuth , AuthProvider };