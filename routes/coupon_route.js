const { Router } = require("express");
const {
  createCoupon,
  deleteCoupon,
  deactiveCoupon,
  getAllCoupons,
  updateCoupon,
  getCouponbycode,
} = require("../controllers/coupon_controller");
const { islogedin, authorize } = require("../middlewares/auth_middleware");
const { AuthRoles } = require("../utils/authroles");

//create router instance
const router = Router();

//create a coupon
router.post("/", islogedin, authorize(AuthRoles.ADMIN), createCoupon);

//update a coupon
router.put("/:id", islogedin, authorize(AuthRoles.ADMIN), updateCoupon);

//get coupon details
router.post(
  "/getcoupondetails",
  islogedin,
  authorize(AuthRoles.ADMIN),
  getCouponbycode
);

//delete a coupon
router.delete("/:id", islogedin, authorize(AuthRoles.ADMIN), deleteCoupon);

//get all coupons
router.get(
  "/",
  islogedin,
  authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR),
  getAllCoupons
);

module.exports = router;
