import {Router} from "express"
import {createCollection,deleteCollection,getCollection,updateCollection} from "../controllers/collection_controller"
import {islogedin,authorize} from "../middlewares/auth_middleware"
import {AuthRoles} from "../utils/authroles"

//create router instance
const router = Router()

//only Admins can create/update a collection
router.post("/",islogedin,authorize(AuthRoles.ADMIN),createCollection)
router.post("/:id",islogedin,authorize(AuthRoles.ADMIN),updateCollection)

//delete a collection
router.delete("/:id",islogedin,authorize(AuthRoles.ADMIN),deleteCollection)

//show all collection
router.get("/",getCollection)

export default router;