import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,'Name is Required.'],
            maxlength: [50,'Name must be within 50 chars.']
        }
    }
)