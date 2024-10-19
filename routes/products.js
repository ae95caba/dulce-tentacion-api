var express = require("express");
var router = express.Router();
const getBearerHeaderToSetTokenStringOnReq = require("../middleware/getBearerHeaderToSetTokenStringOnReq");
const product_controller = require("../controllers/productController");

/* GET users listing. */
router.get("/", product_controller.product_list);

router.get("/schema", product_controller.product_schema);

router.post(
  "/",
  getBearerHeaderToSetTokenStringOnReq,
  product_controller.product_create
);

router.delete(
  "/:id",
  getBearerHeaderToSetTokenStringOnReq,
  product_controller.product_delete
);

router.put(
  "/:id",
  getBearerHeaderToSetTokenStringOnReq,
  product_controller.product_update
);

module.exports = router;
