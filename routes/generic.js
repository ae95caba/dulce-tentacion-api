var express = require("express");
var router = express.Router();
const controller = require("../controllers/genericController");
const validateModelType = require("../middleware/validateModelType");
const getBearerHeaderToSetTokenStringOnReq = require("../middleware/getBearerHeaderToSetTokenStringOnReq");

/* GET users listing. */
router.get("/:type/", validateModelType, controller.list);

router.get("/:type/schema", validateModelType, controller.schema);

router.post(
  "/:type/",
  validateModelType,
  getBearerHeaderToSetTokenStringOnReq,
  controller.create
);

router.delete(
  "/:type/:id",
  validateModelType,
  getBearerHeaderToSetTokenStringOnReq,
  controller.delete
);

router.put(
  "/:type/:id",
  validateModelType,
  getBearerHeaderToSetTokenStringOnReq,
  controller.update
);

module.exports = router;
