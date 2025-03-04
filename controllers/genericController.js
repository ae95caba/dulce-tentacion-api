const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const he = require("he");
const getModel = require("../utils/getModel");

const validation = [
  body("name", "name must be specified").trim().isLength({ min: 1 }).escape(),
  body("outOfStock", "outOfStock must be specified")
    .trim()
    .escape()
    .isBoolean(),
];

exports.schema = asyncHandler(async (req, res, next) => {
  const Model = getModel(req.params.type);
  const schema = Model.schema.paths;
  const schemaDetails = Object.keys(schema)
    .filter((key) => !key.startsWith("_")) // Filter out keys starting with '_'
    .map((key) => {
      return {
        key: key,
        type: schema[key].instance,
        required: schema[key].isRequired ? true : false,
      };
    });

  res.json(schemaDetails);
});

exports.create = [
  ...validation,

  async (req, res, next) => {
    const errors = validationResult(req);
    const Model = getModel(req.params.type);

    const item = new Model({
      name: he.decode(req.body.name),
      outOfStock: req.body.outOfStock,
    });

    if (!errors.isEmpty()) {
      res.status(422).json({ error: "Validation failed" });
    } else {
      try {
        jwt.verify(req.token, "secretkey");
        await item.save();
        res.status(200).json({ item });
      } catch (err) {
        console.log(err);
      }
    }
  },
];

exports.list = asyncHandler(async (req, res, next) => {
  const Model = getModel(req.params.type);
  const items = await Model.find().sort({ name: 1 }).exec();

  res.json(items);
});

exports.update = [
  ...validation,

  async (req, res, next) => {
    console.log(req.body);
    const Model = getModel(req.params.type);
    const updatedItem = new Model({
      name: he.decode(req.body.name),
      outOfStock: req.body.outOfStock,
      _id: req.params.id,
      imgUrl: !req.body.imgUrl ? null : req.body.imgUrl,
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ error: "Validation failed" });
    } else {
      try {
        jwt.verify(req.token, "secretkey");
        await Model.findByIdAndUpdate(req.params.id, updatedItem, {});
        res.status(200).json({});
      } catch (error) {
        console.log("Error occurred:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
];

exports.delete = [
  async (req, res, next) => {
    try {
      const Model = getModel(req.params.type);
      jwt.verify(req.token, "secretkey");
      await Model.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: `${req.params.type} deleted` });
    } catch (error) {
      console.log(`error : ${error}`);
      next(error);
    }
  },
];
