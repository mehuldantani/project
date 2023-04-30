const product_schema = require("../model/product_shcema.js")
const coupon_schema = require("../model/coupon_schema.js")
const order = require("../model/order_schema.js")
const asyncHandler = require("../services/async_handler.js")
const customError = require("../utils/custom_error.js")
const razorpay = require("../config/razorpay_config.js")
const product_shcema = require("../model/product_shcema.js")
const user_schema = require("../model/user_schema.js")
const { CustomerProfiles } = require("aws-sdk")
const CustomError = require("../utils/custom_error.js")
const order_schema = require("../model/order_schema.js")
const mongoose = require("mongoose")
/******************************************************
 * @Generate_razorpay_id   POST request
 * @route http://localhost:4000/api/order/razorpay
 * @description controller used to generate razorpay id
 * @parameters product details
 * @returns order Object with razorpay id
 ********************************************************/

//generate razorpay order ID
const generateRazorpayID = asyncHandler(async(req,res)=>{
    //get product and coupon
    const {products,couponCode} = req.body

    //product should be there
    if(!products || products.length === 0){
        throw new customError("No Products Found.",400)
    }

    let totalAmount = 0;

    let productPriceCal = Promise.all(products.map(
        async(product) =>{
            const {productId,count} = product
            //check product with DB
            const dbProduct = await product_shcema.findById(productId)
            if(!dbProduct){
                throw new customError("No Product Found.",400)
            }
            totalAmount = totalAmount + dbProduct.price * count
        }
    ))

    //execute all the promises
    await productPriceCal

    let discountAmount = 0;
    console.log(totalAmount)
    //if coupon exists then apply coupon code
    if(couponCode.length > 0){
        //verify couponcode in db
        const dbCoupon = await coupon_schema.findOne({code: couponCode})

        if(dbCoupon){
            discountAmount = totalAmount*(dbCoupon.discount/100)
        }
    }
    //finalise the price using coupon details if any
    totalAmount = totalAmount - discountAmount
    
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

//create order in DB
const generateOrder = asyncHandler(async(req,res)=>{
    const {razorpayOrderId,userid,phoneNumber,products,coupon,amount} = req.body

    const dbUser = await user_schema.findById(userid)

    if(!dbUser){
        throw new customError("No user found with this details.")
    }
    
    if(!products){
        throw new customError("please add product first.",400)
    }

    if(!razorpayOrderId){
        throw new customError("Payment is not completed.",400)
    }

    const dbOrder = await order_schema.create({
        products,
        user: userid,
        phoneNumber,
        amount,
        coupon,
        transactionId:razorpayOrderId,
        paymentMode: "RazorPay"
    })

    if(!dbOrder){
        throw new customError("An Error occured while creating an order.",400)
    }

    res.status(200).json({
        success:true,
        dbOrder
    })

})

//get my orders
const getMyOrders = asyncHandler(async(req, res) => {
    const {id:userId} = req.params

    const myOrders = await order_schema.findOne({user:userId})

    if(!myOrders){
        throw new customError("No Order Found",400)
    }

    res.status(200).json({
        success:true,
        myOrders
    })

})

//Todo: get all my orders: Admin
const getAllOrders = asyncHandler(async(req, res) => {
    const allOrders = await order_schema.find()

    if(!allOrders){
        throw new customError("No Orders Found.",400)
    }

    res.status(200).json({
        success:true,
        allOrders
    })

})


//Todo: update order Status: Admin
const updateOrderStatus = asyncHandler(async(req, res) => {

    //get couponID
    const  {id: orderId} = req.params
    const {status} = req.body
    
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        throw new customError("Invalid Order ID", 400);
    }

    //update the coupon
    const orderUpdate = await order_schema.findByIdAndUpdate(
        orderId,
        {
            status
        },{
            new:true,
            runValidators: true
        })

    if(!orderUpdate){
        throw new customError("Error while updating status.",400)
    }

    res.status(200).json({
        success:true,
        orderUpdate
    })
    
})

module.exports = {generateRazorpayID,generateOrder,getAllOrders,getMyOrders,updateOrderStatus}