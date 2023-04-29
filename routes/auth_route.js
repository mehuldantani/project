const Router = require("express")
const {forgotPassword,getProfile,login,logout,resetPassword,signUp} = require("../controllers/auth_controller")
const {islogedin} = require("../middlewares/auth_middleware")

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

module.exports = router