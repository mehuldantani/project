import React from 'react'
import Layout from '../components/layout/layout.js';
import {useCart} from '../context/cart.js'
import {useAuth} from '../context/auth.js'

const Cart = () => {

    const [cart,setCart] = useCart();
    const [auth,setAuth] = useAuth();

    const removeCartItem = (id) => {
        let items = cart.filter((product) => product._id != id)
        setCart(items)
        localStorage.setItem('cart',JSON.stringify(items))
    }

    return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-6'>
            {cart?.map((product) => (
                <div className='row m-2  card flex-row'>
                    <div className='col-md-4'>
                    <img
                        className="card-img-top m-4 zoom-image"
                        src={product.photos[0].secure_url}
                        alt={product.name}
                        style={{ width: "100px", height: "100px" }}
                        />
                    </div>
                    <div className='col-md-8 mt-2'>
                    <div className="d-flex justify-content-between align-items-center">
                        <b>{product.name}</b>
                        <span className="remove-icon" onClick={()=> removeCartItem(product._id)}>
                            &times;
                        </span>
                    </div>
                    <h6 className=''>{product.description.substring(0,30)}</h6>
                    <h4 className='mt-6'>Rs. {product.price}</h4>
                    </div>
                </div>
            ))}
            </div>
            <div className='col-md-6'>
            Payment and Checkout
            </div>
        </div>
    </div>    
    </Layout>
  )
}

export default Cart