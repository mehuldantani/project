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

})