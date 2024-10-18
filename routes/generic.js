var express = require("express");
var router = express.Router();
const controller = require("../controllers/genericController");
const validateModelType = require("../middleware/validateModelType");

/* GET users listing. */
router.get("/:type/", validateModelType, controller.list);

router.get("/:type/schema", validateModelType, controller.schema);

router.post("/:type/", validateModelType, controller.create);

router.delete("/:type/:id", validateModelType, controller.delete);

router.put("/:type/:id", validateModelType, controller.update);

module.exports = router;
