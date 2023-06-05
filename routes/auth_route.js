const Router = require("express")
const {forgotPassword,getProfile,deleteUser,login,logout,resetPassword,signUp,getAllusers} = require("../controllers/auth_controller")
const {islogedin,authorize} = require("../middlewares/auth_middleware")
const {AuthRoles} = require("../utils/authroles")

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
router.get("/allusers",islogedin, getAllusers)

//protected route
router.get("/user-auth",islogedin,(req,res)=>{
    res.status(200).send({ok:true});
})

//protected route
router.post("/admin-auth",islogedin,authorize(AuthRoles.ADMIN),(req,res)=>{
    res.status(200).send({ok:true});
})


router.delete("/:id",islogedin,authorize(AuthRoles.ADMIN),deleteUser)

module.exports = router