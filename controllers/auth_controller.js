import User from "../model/user_schema.js"
import asyncHandler from '../services/async_handler.js'
import customerror from '../utils/custom_error.js'

export const cookieOptions = {
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

export const signUp = asyncHandler(async (req,res) => {
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

export const login = asyncHandler(async (req,resp) =>{
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
export const logout = asyncHandler(async (_req,res) =>{
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