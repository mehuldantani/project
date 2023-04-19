import mongoose, { mongo } from "mongoose";

const collectionSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:[true,'Category Must have a name.'],
            trim: true,
            maxlength: [120,'Name must be within 120 chars.']
        },
    },
    {timestamps:true }
)

export default mongoose.model("collection",collectionSchema)