const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  flavours: { type: Number, required: false },
  outOfStock: { type: Boolean, required: true },
  price: { type: Number, required: true },
});

// Export model
module.exports = mongoose.model("Product", ProductSchema);
