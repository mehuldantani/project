import {Router} from "express"
import {createCoupon,deleteCoupon,deactiveCoupon,getAllCoupons,updateCoupon} from "../controllers/coupon_controller"
import {islogedin,authorize} from "../middlewares/auth_middleware"
import {AuthRoles} from "../utils/authroles"

//create router instance
const router = Router()

//create a coupon
router.post("/",islogedin,authorize(AuthRoles.ADMIN),createCoupon)

//update a coupon
router.put("/:id",islogedin,authorize(AuthRoles.ADMIN),updateCoupon)

//delete a coupon
router.delete("/:id",islogedin,authorize(AuthRoles.ADMIN),deleteCoupon)

//get all coupons
router.get("/",islogedin,authorize(AuthRoles.ADMIN,AuthRoles.MODERATOR),getAllCoupons)

export default router;