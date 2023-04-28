import {Router} from "express"
import {forgotPassword,getProfile,login,logout,resetPassword,signUp} from "../controllers/auth_controller"
import {islogedin} from "../middlewares/auth_middleware"

//create router instance
const router = Router()

//set post routers
router.post("/signup",signUp)
router.post("/login",login)
router.post("/password/forgot/",forgotPassword)
router.post("/password/reset/:token",resetPassword)

//set get routers
router.get("/logout",logout)
router.get("/profile",islogedin, getProfile)

export default router;