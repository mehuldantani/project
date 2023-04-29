const {Router} = require("express")
const {addProduct,deleteProduct,getAllProducts,getProductById,getProductbyCollectionId} = require("../controllers/product_controller")
const {islogedin,authorize} = require("../middlewares/auth_middleware")
const {AuthRoles} = require("../utils/authroles")

const router = Router()

//add product
router.post("/",islogedin,authorize(AuthRoles.ADMIN,AuthRoles.MODERATOR),addProduct)
//delete the product
router.delete("/",islogedin,authorize(AuthRoles.ADMIN,AuthRoles.MODERATOR),deleteProduct)
//check all products
router.get("/",islogedin,authorize(AuthRoles.ADMIN),getAllProducts)
//product by id
router.get("/:id",islogedin,authorize(AuthRoles.ADMIN,AuthRoles.MODERATOR),getProductById)
//get collection wise product
router.get("/collection/:id",islogedin,authorize(AuthRoles.ADMIN,AuthRoles.MODERATOR),getProductbyCollectionId)

module.exports = router