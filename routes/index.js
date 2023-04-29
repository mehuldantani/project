const Router = require("express")
const auth_route = require("./auth_route")
const collection_route = require("./collection_route")
const coupon_route = require("./coupon_route")
const order_route = require("./order_route")
const product_route = require("./product_route")

const router = Router()

router.use("/auth",auth_route)
router.use("/collection",collection_route)
router.use("/coupon",coupon_route)
router.use("/order",order_route)
router.use("/product",product_route)

module.exports = router