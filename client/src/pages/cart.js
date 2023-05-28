import React, { useState,useEffect } from 'react'
import Layout from '../components/layout/layout.js';
import {useCart} from '../context/cart.js'
import {useAuth} from '../context/auth.js'
import axios from 'axios'
import {toast} from 'react-hot-toast'

const Cart = () => {

    const [cart,setCart] = useCart();
    const [coupon,setCoupon] = useState('')
    const [totalmrp, setTotalMRP] = useState(0)
    const [coupondiscount,setCoupondiscount] = useState(0)

    const removeCartItem = (id) => {
        let items = cart.filter((product) => product._id != id)
        setCart(items)
        localStorage.setItem('cart',JSON.stringify(items))
    }

    const totalMRP = () => {
        const totalPrice = cart.reduce((accumulator, currentProduct) => {
            return accumulator + currentProduct.price;
          }, 0);
        setTotalMRP(totalPrice);
    }

    const calculateDiscount = async () => {
        
        try{
            const resp = await axios.post("http://localhost:4000/api/v1/coupon/getcoupondetails",{
                "code":coupon
            });
            if (resp.data.coupon.length > 0) {
              const discount = Number(resp.data.coupon[0].discount)/100;
              console.log(discount)
              setCoupondiscount(discount)
              toast.success('Coupon Applied Successfully.');
            } else {
              // show error message to the user
              toast.error("Invalid Coupon Code");
            }
          } catch(error){
            if (error.response) {
              // handle error response with status code 400
              toast.error(error.response.data.message);
            } else {
              // handle other errors
              toast.error('Invalid Coupon Code');
            }
          }
    }

    useEffect(()=>{
        totalMRP();
    },[cart])

    return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-6'>
            <b className='m-3'>{cart.length} Items in your Cart</b>
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
            <b className='m-3'>Payment and Checkout</b>
            <div className='card m-3 p-4' style={{ width: "25rem", backgroundColor: "#f7f7f7", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
    <h6 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Price Details ({cart.length} items)</h6>
    <div style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
        <h6 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>Total MRP:</h6>
        <span style={{ fontSize: "16px", color: "#888" }}>Rs. {totalmrp}</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <input
            type="text"
            name="coupon"
            placeholder='Enter Coupon Code'
            className='form-control m-2'
            value={coupon}
            onChange={(e)=> setCoupon(e.target.value)}
            style={{ width: "15rem", marginRight: "10px" }}
        />
        <button className='btn btn-primary' onClick={calculateDiscount}>Apply</button>
    </div>
    <div style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
        <h6 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>Coupon Discount:</h6>
        <span style={{ fontSize: "16px", color: "#888" }}>Rs. -{Math.floor(coupondiscount*totalmrp)}</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <h6 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "0" }}>Total Amount:</h6>
        <span style={{ fontSize: "18px", marginLeft: "10px" }}><b>Rs. {Math.floor(totalmrp - coupondiscount*totalmrp)}</b></span>
    </div>
    <button className='btn btn-primary' style={{ borderRadius: "5px", padding: "10px 20px", fontSize: "16px", fontWeight: "bold" }}>Pay Now</button>
</div>

            </div>
        </div>
    </div>    
    </Layout>
  )
}

export default Cart