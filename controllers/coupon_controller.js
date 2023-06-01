const coupon_schema = require("../model/coupon_schema.js")
const asyncHandler = require("../services/async_handler.js")
const customError = require("../utils/custom_error.js")

/**********************************************************
 * @CREATE_COUPON
 * @route https://localhost:5000/api/coupon
 * @description Controller used for creating a new coupon
 * @description Only admin and Moderator can create the coupon
 * @returns Coupon Object with success message "Coupon Created SuccessFully"
 *********************************************************/
const createCoupon = asyncHandler(async(req,resp)=>{
    //get params
    const {code,discount} = req.body

    //validate
    if(!(code || discount)){
        throw new customError("Please provide all the required fields.",400)
    }

    const coupon = await coupon_schema.create({
        code: code,
        discount: discount
    })

    if(!coupon){
        throw new customError("There was an error while creating a coupon.",400)
    }

    resp.status(200).json({
        success: true,
        message: "coupon was created successfully.",
        coupon
    })

})

/**********************************************************
 * @DEACTIVATE_COUPON
 * @route https://localhost:5000/api/coupon/deactive/:couponId
 * @description Controller used for deactivating the coupon
 * @description Only admin and Moderator can update the coupon
 * @returns Coupon Object with success message "Coupon Deactivated SuccessFully"
 *********************************************************/

const deactiveCoupon = asyncHandler(async(req,res)=>{
    //get couponID
    const  {id: couponId} = req.params

    //deactive the coupon
    const coupon = coupon_schema.findByIdAndUpdate(
        couponId,
        {
            active: false
        },{
            new:true,
            runValidators: true
        })

    if(!coupon){
        throw new customError("Error while deactivating the coupon.",400)
    }

    //send response
    res.status(200).json({
        success:true,
        coupon
    })

})

/**********************************************************
 * @UPDATE_COUPON
 * @route https://localhost:5000/api/coupon/:couponId
 * @description Controller used for updating the coupon
 * @description Only admin and Moderator can update the coupon
 * @returns Success Message "Coupon updated SuccessFully"
 *********************************************************/
const updateCoupon = asyncHandler(async(req,res)=>{
    //get couponID
    const  {id: couponId} = req.params
    const {code,discount} = req.body
    
    //update the coupon
    const coupon = await coupon_schema.findByIdAndUpdate(
        couponId,
        {
            code,
            discount
        },{
            new:true,
            runValidators: true
        })

    if(!coupon){
        throw new customError("Error while updating the coupon.",400)
    }

    //send response
    res.status(200).json({
        success:true,
        coupon
    })

})

const getCouponbycode = asyncHandler(async(req,res)=>{
    //get couponID
    const {code} = req.body
    
    //update the coupon
    const coupon = await coupon_schema.find({code});

    if(!coupon){
        throw new customError("Invalid Coupon Code",400)
    }

    //send response
    res.status(200).json({
        success:true,
        coupon
    })

})

/**********************************************************
 * @DELETE_COUPON
 * @route https://localhost:5000/api/coupon/:couponId
 * @description Controller used for deleting the coupon
 * @description Only admin and Moderator can delete the coupon
 * @returns Success Message "Coupon Deleted SuccessFully"
 *********************************************************/

const deleteCoupon = asyncHandler(async(req,res)=>{
    //get couponID
    const  {id: couponId} = req.params
    
    //delete the coupon
    const coupon = await coupon_schema.findByIdAndDelete(couponId)

    if(!coupon){
        throw new customError("Error while deleting the coupon.",400)
    }

    //send response
    res.status(200).json({
        success:true,
        coupon
    })

})

/**********************************************************
 * @GET_ALL_COUPONS
 * @route https://localhost:5000/api/coupon
 * @description Controller used for getting all coupons details
 * @description Only admin and Moderator can get all the coupons
 * @returns allCoupons Object
 *********************************************************/

const getAllCoupons = asyncHandler(async(req,res)=>{
    const coupons = await coupon_schema.find()

    if(!coupons){
        throw new customError("No Coupons Found.",400)
    }

    res.status(200).json({
        success:"true",
        coupons
    })
})

module.exports = {createCoupon,deactiveCoupon,deleteCoupon,getAllCoupons,updateCoupon,getCouponbycode}