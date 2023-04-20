import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
    name:{
        type: String,
        required:[true,'Product must have a name.'],
        trim: true,
        maxlength:[120,'Product name must be within 120 chars.']
    },
    price:{
        type:Number,
        reqired:[true,"Provide a product number."],
        maxlength:[5,'You can\'t seel so much expensive product here.']
    },
    description:{
        type: String,
        //use some form of editor - personal assigment.
    },
    photos:[{
        secure_url:{
            type:String,
            required:true
        }
    }],
    stock:{
        type:Number,
        default: 0
    },
    soldUnits:{
        type:Number,
        default:0
    },
    collectionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"collection"
    }
    },
    {timestamps: true}
)

export default mongoose.model('product',productSchema)