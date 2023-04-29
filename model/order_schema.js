const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        products:{
            type:[{
                productid:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"product",
                    required:true
                },
                count:Number,
                price: Number
            }],
            required:true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        phoneNumber:{
            type:Number,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        coupon:String,
        transactionId: String,
        status:{
            type: String,
            enum:["ORDERED","SHIPPED","DELIVERED","CANCELLED"],
            default:"ORDERED" 
        },
        paymentMode: String
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("order",orderSchema)