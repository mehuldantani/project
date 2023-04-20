import mongoose from "mongoose";


const couponSchema = mongoose.Schema(
    {
    code:{
        type: String,
        required: [true,'code must have a name.'],
        minlength: [5,'code must be atleast of 5 chars']
    },
    discount:{
        type: Number,
        required: [true,'Enter a discount %.']
    },
    active:{
        type: Boolean,
        default: true
    }
    },
    {timestamps: true}
    );

export default mongoose.model('coupon',couponSchema)