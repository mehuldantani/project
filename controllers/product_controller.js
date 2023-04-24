import product_schema from "../model/product_shcema.js"
import {s3fileupload,s3filedelete} from "../services/file_upload.js"
import asyncHandler from '../services/async_handler.js'
import customerror from '../utils/custom_error.js'
import config from "../config/config.js"

import mongoose from "mongoose"
import fs from "fs"
import formidable from "formidable"


/******************************************************
 * @add_product   POST request
 * @route http://localhost:4000/api/product
 * @description to add a new product
 * @parameters product details
 * @returns User Object 
 ********************************************************/

export const addProduct = asyncHandler(async (req,res)=>{
        const form = formidable({
            multiples:true,
            keepExtensions:true
        });

        form.parse(req,async function (err,fields,files){
            try {
                if(err){
                    throw new customerror(err.message,500)
                }
                
                //generate product id
                let productId = new mongoose.Types.ObjectId().toHexString()

                //console.log(fields,files)

                //check for fields
                if(!fields.name || !fields.price || !fields.description || !fields.collectionId ){
                    throw new customerror("Please fill all the details",500)
                }
                
                //handling images on cloud
                let imgArrResp = Promise.all(

                    //for a safe side convert it again to array
                    Object.keys(files).map(async (filekey,index)=>{
                        //get individual file key
                        const element = files[filekey]

                        const path = fs.readFileSync(element.filepath)

                        const upload = await s3fileupload({
                            bucketName: config.S3_BUCKET_NAME,
                            key: `products/${productId}/photo_${index+1}.png`,
                            body: path,
                            contentType: element.mimetype
                        }
                        )
                        return {secure_url:upload.Location}

                    })
                )
                
                //allowing all promise to fulfil
                let imgArray = await imgArrResp;

                const product = await product_schema.create({
                    _id:productId,
                    photos:imgArray,
                    ...fields
                })

                if(!product){
                    throw new customerror("Product was not added",400)

                    //remove images if product failed from MONGODB side
                }

                res.status(200).json({
                    success:true,
                    product
                })

            } catch (err) {
                return res.status(500).json({
                    message: err.message || "Something went wrong."
                })
            }
        })
})

/******************************************************
 * @Get_product   POST request
 * @route http://localhost:4000/api/product
 * @description list of all products
 * @parameters product details
 * @returns User Object 
 ********************************************************/

export const getAllProducts = asyncHandler(async(req,res)=>{
    //get all the products
    const products = await product_schema.find({})

    if(!products){
        throw new customerror("No Products Found",400)
    }

    res.status(200).json({
        success:true,
        products
    })

})

/******************************************************
 * @getproducbyid   POST request
 * @route http://localhost:4000/api/product
 * @description find specific product
 * @parameters product details
 * @returns User Object 
 ********************************************************/

export const getProductById = asyncHandler(async(req,res)=>{
    //get and ID
    const {id:productid} = req.params

    //find product by ID
    const products = await product_schema.findById({productid})

    if(!products){
        throw new customerror("No Products Found",400)
    }
    //send respoinse
    res.status(200).json({
        success:true,
        products
    })

})

