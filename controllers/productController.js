const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const he = require("he");
function getBearerHeaderToSetTokenStringOnReq(req, res, next) {
  const bearerHeader = req.headers?.authorization;
  if (typeof bearerHeader !== "undefined") {
    //bearer header format : Bearer <token>

    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();
  } else {
    next();
  }
}

exports.product_create = [
  getBearerHeaderToSetTokenStringOnReq,
  // Validate body and sanitize fields.
  body("name", "name must be specified").trim().isLength({ min: 1 }).escape(),

  body("price", "price must be specified").trim().escape().isNumeric(),

  body("imgUrl", "imgUrl must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("outOfStock", "outOfStock must be specified")
    .trim()
    .escape()
    .isBoolean(),
  body("flavours")
    .optional() // Allows the field to be absent
    .trim()
    .escape()
    .isNumeric()
    .withMessage("Flavours must be a valid number"),

  // Process request after validation and sanitization.

  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    console.log(`body content is:${JSON.stringify(req.body)}`);

    const product = new Product({
      name: he.decode(req.body.name),
      price: req.body.price,
      imgUrl: he.decode(req.body.imgUrl),
      outOfStock: req.body.outOfStock,
      flavours: req.body.flavours,
    });

    if (!errors.isEmpty()) {
      // There are errors.

      res.status(422).json({ error: "Validation failed" });
      return;
    } else {
      try {
        // Data from form is valid
        jwt.verify(req.token, "secretkey");
        await product.save();
        res.status(200).json({ product });
      } catch (err) {
        console.log(err);
      }
    }
  },
];

exports.product_list = asyncHandler(async (req, res, next) => {
  const products = await Product.find().exec();
  console.log(`the products are ${products}`);
  res.json(products);
});

exports.product_update = [
  getBearerHeaderToSetTokenStringOnReq,
  // Validate body and sanitize fields.
  body("name", "name must be specified").trim().isLength({ min: 1 }).escape(),

  body("price", "price must be specified").trim().escape().isNumeric(),

  body("imgUrl", "imgUrl must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("outOfStock", "outOfStock must be specified")
    .trim()
    .escape()
    .isBoolean(),
  body("flavours")
    .optional() // Allows the field to be absent
    .trim()
    .escape()
    .isNumeric()
    .withMessage("Flavours must be a valid number"),

  async (req, res, next) => {
    const updatedProduct = new Product({
      name: he.decode(req.body.name),
      price: req.body.price,
      imgUrl: he.decode(req.body.imgUrl),
      outOfStock: req.body.outOfStock,
      flavours: req.body.flavours,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ error: "Validation failed" });
    } else {
      try {
        jwt.verify(req.token, "secretkey");
        await Product.findByIdAndUpdate(req.params.id, updatedProduct, {});
        res.status(200).json({});
      } catch (error) {
        console.log("Error occurred bro:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
];

exports.product_delete = [
  getBearerHeaderToSetTokenStringOnReq,
  async (req, res, next) => {
    try {
      //if v erification vails , an error will be thrown
      jwt.verify(req.token, "secretkey");
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "product deleted" });
    } catch (error) {
      console.log(`error : ${error}`);
      next(error);
    }
  },
];
