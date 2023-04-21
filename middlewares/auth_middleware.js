import config from "../config/config.js"
import user from "../model/user_schema.js"
import asyncHandler from '../services/async_handler.js'
import CustomError from "../utils/custom_error.js"
import JWT from "jsonwebtoken"

export const isloogedin = asyncHandler(async(req,res,next)=>{
    let token;

    if (
        req.cookies.token || 
        (req.headers.authorization && req.headers.authorization.startswith('Bearer'))) {

        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }

    if(!token){
        throw new CustomError('Not Authorized to access this route.',400)
    }

    try {
        //decode the token
        const decodedJWT =  JWT.verify(token,config.JWT_SECRET)

        req.user = await user.findById(decodedJWT._id)
        
        next()
    } catch (error) {
        throw new CustomError('Not Authorized to access this route.',400)
    }

})