const User = require("../model/user_schema.js")
const asyncHandler = require('../services/async_handler.js')
const customerror = require('../utils/custom_error.js')
const emailsend = require("../utils/email.js")
const crypto = require("crypto")

const cookieOptions = {
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

const signUp = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body

    //validation
    if (!(name || email || password)){
        throw new customerror('Name, Email and Password Required for Signup.',400)
    }

    //check if user exists
    console.log(email,password)

    const existingUser = await User.findOne({email})
    if(existingUser){
        throw new customerror('User already exists please use signup option',400)
    }

    if (password.length < 8) {
        throw new customerror('Password should be at least 8 characters long', 400);
    }

    //create a user

    const user = await User.create({
        name,
        email,
        password
    });

    //get token from schema
    const token = user.getJwtToken()
    //console.log(user)
    //need to do this as select false will only apply when selecitng and not when Creating
    user.password = undefined
    const resetUrl = `https://cloud-cart.netlify.app`
    try {
        await emailsend({
            template:'newUser',
            email: user.email,
            subject: `Welcome to CloudCart. -${user.name}` ,
            navigateLink:resetUrl,
            name: user.name
        })
    } catch (error) {
        
    }

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

const login = asyncHandler(async (req,resp) =>{
    const {email,password} = req.body

    //validation
    if (!(email || password)){
        throw new customerror('Email and password is required for Login.',200)
    }

    //check with user and password
    //select will include password in the returned object, did this because we kept select property False in schema design
    const userExists = await User.findOne({email}).select("+password")

    if(!userExists){
        throw new customerror('Invalid Credentials.',200)
    }

    //match the password
    const isPWmatched =  await userExists.comparePasssword(password)

    if (!isPWmatched){
        throw new customerror('Invalid Credentials.',200)
    }

    //get token
    const token = userExists.getJwtToken()
    userExists.password = undefined

    //send response
    resp.cookie("token",token,cookieOptions)
    resp.status(200).json({
        success: true,
        token,
        userExists
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
const logout = asyncHandler(async (_req,res) =>{
    //reset token
    //    res.clearCookie() -> this can also be used
    res.cookie("token", null, {
        expires: new Date(0),
        httpOnly: true
      });      

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

const forgotPassword = asyncHandler(async(req,res)=>{
    const {email} = req.body

    //validation
    if (!email){
        throw new customerror('Please fill all the fields',400)
    }

    //check if user exists
    const existingUser = await User.findOne({email})

    //if user not found then return
    if(!existingUser){
        throw new customerror('User Not Found',400)
    }

    //get forgot pw token
    const resetToken = existingUser.generateForgotPWToken()

    //savve info in DB
    await existingUser.save({validateBeforeSave: false})

    //generate reset password url
    const resetUrl = `https://cloud-cart.netlify.app/resetpassword/${resetToken}`

    //send and email
    try {
        await emailsend({
            template:'forgotPw',
            email: existingUser.email,
            subject: `Reset password -${existingUser.name}` ,
            navigateLink:resetUrl,
            name: existingUser.name
        })

        //send response
        res.status(200).json({
            success: true,
            message: `We have sent an email to ${existingUser.email} with Reset password link.`
        })
    } catch (err) {

        //Rollback the chanes on email failure
        existingUser.forgotpasswordExpiry = undefined
        existingUser.forgotpasswordToken = undefined
        console.log(err)
        throw new customerror('Error in Email Send',400)
    }
})

/******************************************************
 * @RESET_PASSWORD
 * @route http://localhost:4000/api/auth/password/forgot/:resetToken
 * @description user will able to reset pw based on url token
 * @parameters  toekn, password and confirm password
 * @returns Success message
 ********************************************************/

const resetPassword = asyncHandler(async(req,res)=>{

    //get token from the url
    const {token: resetToken} = req.params

    //get password and confirm password from body
    const {password,confirmPassword} = req.body

    if (password !== confirmPassword) {
        throw new customerror('Passwords are not matching',400)
    }
    
    if (password.length < 8) {
        throw new customerror('Password should be at least 8 characters long', 400);
    }


    const resetPasswordToken =  crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

    //find user with same token and valid expiry time
    const userFound = await User.findOne({
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
    await userFound.save()

    //set token
    const token = userFound.getJwtToken()
    userFound.password = undefined

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

const getProfile = asyncHandler(async(req,res)=>{
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

module.exports = {cookieOptions,getProfile,forgotPassword,login,logout,resetPassword,signUp };
