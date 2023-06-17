const collection_schema = require("../model/collection_schema.js");
const product_schema = require("../model/product_shcema.js");
const asyncHandler = require("../services/async_handler.js");
const customerror = require("../utils/custom_error.js");

/******************************************************
 * @Create_collection   POST request
 * @route http://localhost:4000/api/collection
 * @description create a New request
 * @parameters name
 * @returns User Object
 ********************************************************/

const createCollection = asyncHandler(async (req, res) => {
  //Get colleciton name
  const { name } = req.body;

  //validate data
  if (!name) {
    throw new customerror("Please provide a message of collection name.", 400);
  }

  const duplicate = await collection_schema.find({
    name: { $regex: new RegExp("^" + name + "$", "i") },
  });

  if (duplicate.length > 0) {
    throw new customerror("Category already exists with the same name.", 400);
  }

  //add to database
  const collection = await collection_schema.create({
    name: name,
  });

  //send this response to user
  res.status(200).json({
    success: true,
    messae: "Collection created successfully.",
    collection,
  });
});

/******************************************************
 * @Update_collection   PUT request
 * @route http://localhost:4000/api/collection
 * @description update a collection
 * @parameters name
 * @returns User Object
 ********************************************************/

const updateCollection = asyncHandler(async (req, res) => {
  //Get colleciton name
  const { name } = req.body;
  const { id: collectionid } = req.params;

  //validate data
  if (!name) {
    throw new customerror("Please provide a message of collection name.", 400);
  }

  const duplicate = await collection_schema.find({
    name: { $regex: new RegExp("^" + name + "$", "i") },
  });

  if (duplicate.length > 0) {
    throw new customerror("Category already exists with the same name.", 400);
  }

  //find by id update
  const updated_collection = await collection_schema.findByIdAndUpdate(
    collectionid,
    {
      name,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  //validate data
  if (!updated_collection) {
    throw new customerror("No such record found", 400);
  }

  //send this response to user
  res.status(200).json({
    success: true,
    messae: "Collection updated successfully.",
    updated_collection,
  });
});

/******************************************************
 * @delete_collection   Delete request
 * @route http://localhost:4000/api/collection
 * @description delete a collection
 * @parameters ID
 * @returns User Object
 ********************************************************/

const deleteCollection = asyncHandler(async (req, res) => {
  //Get colleciton id
  const { id: collectionid } = req.params;

  const linkedproduct = await product_schema.findOne({
    collectionId: collectionid,
  });

  if (linkedproduct) {
    throw new customerror(
      "Product is added under this category. It can not be deleted.",
      400
    );
  }

  //find by id update
  const deleted_collection = await collection_schema.findByIdAndDelete(
    collectionid
  );

  //validate data
  if (!deleted_collection) {
    throw new customerror("No such collection found to delete.", 400);
  }

  //send this response to user
  res.status(200).json({
    success: true,
    messae: "Collection deleted successfully.",
  });
});

/******************************************************
 * @get_collection   Get request
 * @route http://localhost:4000/api/collection
 * @description list of all collection
 * @parameters NA
 * @returns User Object
 ********************************************************/

const getCollection = asyncHandler(async (req, res) => {
  //get all the collection
  const allCollections = await collection_schema.find();

  //validate
  if (!allCollections) {
    throw new customerror("No Collections Found.", 400);
  }

  //send a response.
  res.status(200).json({
    success: true,
    allCollections,
  });
});

module.exports = {
  createCollection,
  deleteCollection,
  updateCollection,
  getCollection,
};
