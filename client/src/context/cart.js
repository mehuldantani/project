import {useState,useContext,createContext,useEffect} from "react";

const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [Cart, setCart] = useState([]);
    
    useEffect(()=>{
      const data = localStorage.getItem('cart')
      if(data) setCart(JSON.parse(data))
    },[])

    return (
      <CartContext.Provider value={[Cart, setCart]}>
        {children}
      </CartContext.Provider>
    );
  };

//custom hook
const useCart = () => {
    return useContext(CartContext)
}

export { useCart , CartProvider };