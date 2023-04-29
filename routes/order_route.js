const {Router} = require("express")
const {generateOrder,generateRazorpayID,getAllOrders,getMyOrders,updateOrderStatus} = require("../controllers/order_controller")
const {islogedin,authorize} = require("../middlewares/auth_middleware")
const {AuthRoles} = require("../utils/authroles")

const router = Router()

//generate  order in razorpay
router.post("/razorpay",islogedin,authorize(AuthRoles.ADMIN,AuthRoles.MODERATOR,AuthRoles.USER),generateRazorpayID)
router.post("/",islogedin,authorize(AuthRoles.ADMIN,AuthRoles.MODERATOR,AuthRoles.USER),generateOrder)

//only admins can see all orders
router.get("/",islogedin,authorize(AuthRoles.ADMIN),getAllOrders)

//my orders route
router.get("/:id",islogedin,authorize(AuthRoles.ADMIN,AuthRoles.MODERATOR,AuthRoles.USER),getMyOrders)

//update order status
router.put("/:id",islogedin,authorize(AuthRoles.ADMIN,AuthRoles.MODERATOR),updateOrderStatus)

module.exports = router;