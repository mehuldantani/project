import React, { useState,useEffect } from 'react'
import Layout from '../components/layout/layout.js';
import {useCart} from '../context/cart.js'
import {useAuth} from '../context/auth.js'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const Cart = () => {
    
    const navigate = useNavigate();
    const [cart,setCart] = useCart();
    const [coupon,setCoupon] = useState('');
    const [totalmrp, setTotalMRP] = useState(0);
    const [coupondiscount,setCoupondiscount] = useState(0);
    const [auth,setAuth] = useAuth();

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

    const handlePayment = async () => {
        const productarray = cart.map((obj) => {
            const newObject = {
              productId: obj._id,
              count: 1
            };
            return newObject;
          });
        try{
            const resp = await axios.post("http://localhost:4000/api/v1/order/razorpay",{
                "products":productarray,
                "couponCode":coupon
            }
            );
            if (resp.status === 200 && resp.data.success) {
              //oepn razorpayid
              handleOpenRazorpay(resp.data.order.id);
              toast.success(`Order Created successfully`);
              
            } else {
              // show error message to the user
              toast.error("Something Went Wrong.");
            }
          } catch(error){
            toast.error("Something Went Wrong.")
          }
    }

    const handleOpenRazorpay = (id) => {
        var options = 
        {
            "name": "CloudCart",
            "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                toast.success("Payment Successfull")
                setCart([])
                generateOrder(id);
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp = new window.Razorpay(options);
        rzp.open();
    }

    const generateOrder = async (rzp_id) => {
      try{
        const productarray = cart.map((obj) => {
          const newObject = {
            productid: obj._id,
            price: obj.price,
            count: 1
          };
          return newObject;
        });
        const neworder = {
          "razorpayOrderId":rzp_id,
          "userid":auth.id,
          "products":productarray,
          "coupon":coupon,
          "amount":Math.floor(totalmrp - coupondiscount*totalmrp)
      };
        const resp = await axios.post("http://localhost:4000/api/v1/order",neworder);
        if (resp.status === 200 && resp.data.success) {
          if(auth.role == 'ADMIN'){
            navigate('/dashboard/admin/orders');
          }
          else{
            navigate('/dashboard/user/orders');
          }
          toast.success(`Order Placed Successfully`);
        } else {
          // show error message to the user
          toast.error("Something Went Wrong.");
        }
      } catch(error){
        if (error.response) {
          // handle error response with status code 400
          toast.error(error.response.data.message);
          console.log(error.response.data.message)
        } else {
          // handle other errors
          console.log(error);
          toast.error('Something Went Wrong.');
        }
      }
    };

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
    <button className='btn btn-primary' style={{ borderRadius: "5px", padding: "10px 20px", fontSize: "16px", fontWeight: "bold" }} onClick={handlePayment}>Pay Now</button>
</div>

            </div>
        </div>
    </div>    
    </Layout>
  )
}

export default Cart