const { Router } = require("express");
const {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductbyCollectionId,
} = require("../controllers/product_controller");
const { islogedin, authorize } = require("../middlewares/auth_middleware");
const { AuthRoles } = require("../utils/authroles");

const router = Router();

//add product
router.post(
  "/",
  islogedin,
  authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR),
  addProduct
);
//get collection wise product
router.post(
  "/filter-products",
  islogedin,
  authorize(AuthRoles.ADMIN, AuthRoles.USER),
  getProductbyCollectionId
);
//delete the product
router.delete(
  "/:id",
  islogedin,
  authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR),
  deleteProduct
);
//check all products
router.get(
  "/",
  islogedin,
  authorize(AuthRoles.ADMIN, AuthRoles.USER),
  getAllProducts
);
//product by id
router.get(
  "/:id",
  islogedin,
  authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR, AuthRoles.USER),
  getProductById
);

module.exports = router;
