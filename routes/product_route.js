import {Router} from "express"
import {addProduct,deleteProduct,getAllProducts,getProductById,getProductbyCollectionId} from "../controllers/product_controller"
import {islogedin,authorize} from "../middlewares/auth_middleware"
import {AuthRoles} from "../utils/authroles"

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



export default router;