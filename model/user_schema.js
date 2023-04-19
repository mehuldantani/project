import mongoose from "mongoose";
import AuthRoles from '../utils/authroles'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"     //This  is default package comes with Nodejs.
import config from "../config/index"

//create a userschema for userinfomation
const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,'Name is Required.'],
            maxlength: [50,'Name must be within 50 chars.']
        },
        email:{
            type: String,
            required: [true,'Email is Required.'],
            unique: true
        },
        password:{
            type: String,
            required: [true,'Password is Required.'],
            minlength: [8,'password must be atleast 8 chars.'],
            select: false           //do not retrieve while retrieving the user
        },
        role:{
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER
        },
        forgotpasswordToken: String,
        forgotpasswordExpiry: Date
    },
    { timestamps: true }            //keep track of timestamps
);

//encrypt the password before saving it the DB.
userSchema.pre("save",async function(next){
    
    //if password is not modified then return next()
    if(!this.modified("password")) return next()

    //get the encrypted password
    this.password = await bcrypt.hash(this.password,10);

    next()
})

//add more features to schema
userSchema.methods = {
    //compare password
    comparePasssword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password);
    },

    //generate JWT(Json Web Token)
    getJwtToken: function(){
        return jwt.sign({
            _id: this._id,
            role: this.role
        },
        config.JWT_SECRET,
        {
            expiresIn: config.JWT_EXPIRY
        })
    }
}

export default mongoose.model("User",userSchema);
