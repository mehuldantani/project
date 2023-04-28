import {Router} from "express"
import auth_route from "./auth_route"
import collection_route from "./collection_route"
import coupon_route from "./coupon_route"
import order_route from "./order_route"
import product_route from "./product_route"

const router = Router()


router.use("/auth",auth_route)
router.use("/collection",collection_route)
router.use("/coupon",coupon_route)
router.use("/order",order_route)
router.use("/product",product_route)

export default router;