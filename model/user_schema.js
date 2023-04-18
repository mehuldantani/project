import mongoose from "mongoose";
import AuthRoles from '../utils/authroles'

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

export default mongoose.model("User",userSchema);
