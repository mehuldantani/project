import product from "../model/product_shcema.js"
import coupon from "../model/coupon_schema.js"
import order from "../model/order_schema.js"
import asyncHandler from "../services/async_handler.js"
import customError from "../utils/custom_error.js"
import razorpay from "../config/razorpay_config.js"

/******************************************************
 * @Generate_razorpay_id   POST request
 * @route http://localhost:4000/api/order/razorpay
 * @description controller used to generate razorpay id
 * @parameters product details
 * @returns order Object with razorpay id
 ********************************************************/

//generate razorpay order ID
export const generateRazorpayID = asyncHandler(async(req,res)=>{
    //get product and coupon
    
    let totalAmount;
    //verify product price from the backend

    //finalise the price using coupon details if any

    const options = {
        amount: Math.round(totalAmount*100),    //*100 for converting to paise
        currency: "INR",
        receipt: `receiptID_${new Date().getTime()}`
    }

    const order = await razorpay.orders.create(options)

    if(!order){
        throw new customError('UNable to generate order',400)
    }

    res.status(200).json({
        success: true,
        message: "razorpay order id generated successfully",
        order
    })
})