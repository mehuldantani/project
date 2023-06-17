const product_schema = require("../model/product_shcema.js");
const order_schema = require("../model/order_schema.js");
const { s3fileupload, s3filedelete } = require("../services/file_upload.js");
const asyncHandler = require("../services/async_handler.js");
const customerror = require("../utils/custom_error.js");
const config = require("../config/config.js");

const mongoose = require("mongoose");
const fs = require("fs");
const formidable = require("formidable");

/******************************************************
 * @add_product   POST request
 * @route http://localhost:4000/api/product
 * @description to add a new product
 * @parameters product details
 * @returns User Object
 ********************************************************/

const addProduct = asyncHandler(async (req, res) => {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async function (err, fields, files) {
    try {
      if (err) {
        throw new customerror(err.message, 500);
      }
      //generate product id
      let productId = new mongoose.Types.ObjectId().toHexString();

      //check for fields
      if (
        !fields.name ||
        !fields.price ||
        !fields.description ||
        !fields.collectionId
      ) {
        throw new customerror(
          "Product Name, Price, Description and Category required to add a new product.",
          500
        );
      }

      //handling images on cloud
      let imgArrResp = Promise.all(
        //for a safe side convert it again to array
        Object.keys(files).map(async (filekey, index) => {
          //get individual file key
          const element = files[filekey];
          const path = fs.createReadStream(element.filepath);
          const upload = await s3fileupload({
            bucketName: config.S3_BUCKET_NAME,
            key: `products/${productId}/photo_${index + 1}.png`,
            body: path,
            contentType: element.mimetype,
          });
          return { secure_url: upload.Location };
        })
      );

      //allowing all promise to fulfil
      let imgArray = await imgArrResp;

      const product = await product_schema.create({
        _id: productId,
        photos: imgArray,
        ...fields,
      });

      if (!product) {
        throw new customerror("Product was not added", 400);

        //remove images from AWS if product failed from MONGODB side
      }

      res.status(200).json({
        success: true,
        product,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message || "Something went wrong.",
      });
    }
  });
});

/******************************************************
 * @Get_product   POST request
 * @route http://localhost:4000/api/product
 * @description list of all products
 * @parameters product details
 * @returns User Object
 ********************************************************/

const getAllProducts = asyncHandler(async (req, res) => {
  //get all the products
  const products = await product_schema.find({});

  if (!products) {
    throw new customerror("No Products Found", 400);
  }

  res.status(200).json({
    success: true,
    products,
  });
});

/******************************************************
 * @getproducbyid   POST request
 * @route http://localhost:4000/api/product
 * @description find specific product
 * @parameters product details
 * @returns User Object
 ********************************************************/

const getProductById = asyncHandler(async (req, res) => {
  //get and ID
  const { id: productid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productid)) {
    throw new customerror("Invalid Product ID", 400);
  }

  const products = await product_schema.find({ _id: productid });

  if (!products || products.length === 0) {
    throw new customerror("No Products Found", 404);
  }

  //send respoinse
  res.status(200).json({
    success: true,
    products,
  });
});

const getProductbyCollectionId = asyncHandler(async (req, res) => {
  //get collection ID
  const { categories, price } = req.body;

  // if (!mongoose.Types.ObjectId.isValid(collectionId)) {
  //     throw new customerror("Invalid Collection ID", 400);
  // }
  let args = {};
  if (categories?.length > 0) args.collectionId = categories;
  if (price?.length > 0) args.price = { $gte: price[0], $lte: price[1] };

  const products = await product_schema.find(args);

  if (!products || products.length === 0) {
    throw new customerror("No Products found under this category.");
  }

  res.status(200).json({
    success: true,
    products,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id: productID } = req.params;

  const product = await product_schema.findById(productID);

  if (!product) {
    throw new customerror("No product found", 404);
  }

  const orderswithproductid = await order_schema.find({
    "products.productid": productID,
  });

  if (orderswithproductid.length > 0) {
    throw new customerror("This product is already ordered.", 400);
  }

  let deletephotosfromS3 = Promise.all(
    product.photos.map(async (element, index) => {
      await s3filedelete({
        bucketName: config.S3_BUCKET_NAME,
        key: `products/${product._id}/photo_${index + 1}.png`,
      });
    })
  );

  await deletephotosfromS3;

  const deleted_product = await product_schema.deleteMany({ _id: productID });

  if (!deleted_product) {
    throw new customerror("Error While deleting product.", 404);
  }

  res.status(200).json({
    success: true,
    message: "Product has been deleted successfully.",
  });
});

module.exports = {
  getAllProducts,
  getProductById,
  getProductbyCollectionId,
  addProduct,
  deleteProduct,
};
