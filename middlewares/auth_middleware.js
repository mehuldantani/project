const config = require("../config/config.js")
const user = require("../model/user_schema.js")
const asyncHandler = require('../services/async_handler.js')
const CustomError = require("../utils/custom_error.js")
const JWT = require("jsonwebtoken")

const islogedin = asyncHandler(async(req,_res,next)=>{
    let token;

    if (
        req.cookies.token || 
        (req.headers.authorization && req.headers.authorization.startsWith('Bearer')))
    {

        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }

    if(!token){
        throw new CustomError('Token Validation Failed. Please Login in order to use this route.',400)
    }

    try {
        //decode the token
        const decodedJWT =  JWT.verify(token,config.JWT_SECRET)

        req.user = await user.findById(decodedJWT._id, "name email role")
        
        next()
    } catch (error) {
        throw new CustomError('Not Authorized to access this route.',400)
    }

})

//to check for roles
const authorize = (...requiredRoles) => asyncHandler( async (req, _res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
        throw new CustomError("You are not authorized to access this resource")
    }
    next()
})

module.exports = {islogedin,authorize}