var express = require("express");
var router = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const { body, validationResult } = require("express-validator");

const product_controller = require("../controllers/productController");

/* GET users listing. */
router.get("/", product_controller.product_list);

router.post("/", product_controller.product_create);

router.delete("/:id", product_controller.product_delete);

router.put("/:id", product_controller.product_update);

module.exports = router;
