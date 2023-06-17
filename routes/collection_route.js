const { Router } = require("express");
const {
  createCollection,
  deleteCollection,
  getCollection,
  updateCollection,
} = require("../controllers/collection_controller");
const { islogedin, authorize } = require("../middlewares/auth_middleware");
const { AuthRoles } = require("../utils/authroles");

//create router instance
const router = Router();

//only Admins can create/update a collection
router.post("/", islogedin, authorize(AuthRoles.ADMIN), createCollection);
router.post("/:id", islogedin, authorize(AuthRoles.ADMIN), updateCollection);

//delete a collection
router.delete("/:id", islogedin, authorize(AuthRoles.ADMIN), deleteCollection);

//show all collection
router.get("/", getCollection);

module.exports = router;
