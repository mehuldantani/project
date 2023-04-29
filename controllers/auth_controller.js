const User = require("../model/user_schema.js")
const asyncHandler = require('../services/async_handler.js')
const customerror = require('../utils/custom_error.js')
const emailsend = require("../utils/email.js")
const crypto = require("crypto")

exports.cookieOptions = {
    expires: new Date(Date.now() + 3*24*60*60*1000),
    httpOnly: true
}

/******************************************************
 * @SIGNUP
 * @route http://localhost:4000/api/auth/signup
 * @description User signUp controller for creating a user
 * @parameters name,email,password
 * @returns User Object
 ********************************************************/

exports.signUp = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body

    //validation
    if (!(name || email || password)){
        throw new customerror('Please fill all the fields',400)
    }

    //check if user exists
    const existingUser = User.findOne({email})

    if(existingUser){
        throw new customerror('User already exists please use signup option',400)
    }

    //create a user

    const user = await User.create({
        name,
        email,
        password
    });

    //get token from schema
    const token = user.getJwtToken()
    console.log(user)
    //need to do this as select false will only apply when selecitng and not when Creating
    user.password = undefined

    res.cookie("token",token,cookieOptions)
    res.status(200).json({
        success:true,
        token,
        user
    })

});

/******************************************************
 * @LOGIN
 * @route http://localhost:4000/api/auth/login
 * @description User login controller for loggin in a user
 * @parameters email,password
 * @returns User Object with token
 ********************************************************/

exports.login = asyncHandler(async (req,resp) =>{
    const {email,password} = req.body

    //validation
    if (!(email || password)){
        throw new customerror('Email and password is required for Login.',400)
    }

    //check with user and password
    //select will include password in the returned object, did this because we kept select property False in schema design
    const userExists = User.findOne({email}).select("+password")

    if(!userExists){
        throw new customerror('Invalid Credentials.',400)
    }

    //match the password
    const isPWmatched =  await user.comparePasssword(password)

    if (!isPWmatched){
        throw new customerror('Invalid Credentials.',400)
    }

    //get token
    const token = user.getJwtToken()
    user.password = undefined

    //send response
    res.cookie("token",token,cookieOptions)
    res.status(200).json({
        success: true,
        token,
        user
    })


})

/******************************************************
 * @LOGOUT
 * @route http://localhost:4000/api/auth/logout
 * @description User logout by clearing cookies token
 * @parameters
 * @returns Success
 ********************************************************/

// kept req -> _req which is a symbol that this parameter is not used, just a preferrence not a standard
exports.logout = asyncHandler(async (_req,res) =>{
    //reset token
    //    res.clearCookie() -> this can also be used
    res.cookie("token",null,
    {
        expires: new Date(Date.now()),
        httponly: true
    })

    //send response
    res.status(200).json({
        success:true,
        message: "Logged Out"
    })
})

/******************************************************
 * @FORGOT_PASSWORD
 * @route http://localhost:4000/api/auth/password/forgot
 * @description user will submit email and we will generate a token and send a email with link
 * @parameters  email
 * @returns Success message - email send to your email
 ********************************************************/

exports.forgotPassword = asyncHandler(async(req,res)=>{

    const {email} = req.body

    //validation
    if (!email){
        throw new customerror('Please fill all the fields',400)
    }

    //check if user exists
    const existingUser = User.findOne({email})

    //if user not found then return
    if(!existingUser){
        throw new customerror('User Not Found',400)
    }

    //get forgot pw token
    const resetToken = user.generateForgotPWToken()

    //savve info in DB
    await user.save({validateBeforeSave: false})

    //generate reset password url
    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/password/forgot/${resetToken}`

    //email content
    const text = `Your Password reset url is 
    \n\n ${resetUrl}\n\n`

    //send and email
    try {
        await emailsend({
            email: user.email,
            subject: "Reset password - Mehul",
            text:text
        })

        //send response
        res.status(200).json({
            success: true,
            message: `We have sent an email to ${user.email} with Reset password link.`
        })
    } catch (err) {

        //Rollback the chanes on email failure
        user.forgotpasswordExpiry = undefined
        user.forgotpasswordToken = undefined
        
        throw new customerror('Failed',400)
    }
})

/******************************************************
 * @RESET_PASSWORD
 * @route http://localhost:4000/api/auth/password/forgot/:resetToken
 * @description user will able to reset pw based on url token
 * @parameters  toekn, password and confirm password
 * @returns Success message
 ********************************************************/

exports.resetPassword = asyncHandler(async(req,res)=>{

    //get token from the url
    const {token: resetToken} = req.params

    //get password and confirm password from body
    const {password,confirmPassword} = req.body

    if (password !== confirmPassword) {
        throw new customerror('Passwords are not matching',400)
    }

    const resetPasswordToken =  crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

    //find user with same token and valid expiry time
    const userFound = user.findOne({
        forgotpasswordToken: resetPasswordToken,
        forgotpasswordExpiry: {$gt: Date.now()}
    })

    //send response
    if(!userFound){
        throw new customerror("URL Expired",400)
    }

    //update detail, password not excrypted here because it is handled in schema
    userFound.password = password
    userFound.forgotpasswordToken = undefined
    userFound.forgotpasswordExpiry = undefined

    //save to DB
    await user.save()

    //set token
    const token = user.getJwtToken()
    user.password = undefined

    res.cookie("token",token,cookieOptions)
    res.status(200).json({
        success:true,
        message: 'Password Reset successfully.'
    })


})

/******************************************************
 * @GET_PROFILE
 * @route http://localhost:4000/api/auth/profile
 * @description show user info
 * @parameters  cookie token
 * @returns Success message
 ********************************************************/

exports.getProfile = asyncHandler(async(req,res)=>{
    const {user} = req

    //check user
    if(!user){
        throw new customerror('User Not Found',400)
    }

    //send resp
    res.status(200).json({
        success:true,
        user
    })

})