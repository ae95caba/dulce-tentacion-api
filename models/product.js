const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  flavours: { type: Number, required: false },
  outOfStock: { type: Boolean, required: false },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  apiRoute: { type: String, required: false },
  type: {
    type: String,
    enum: ["frozen-treat", "ice-cream", "add-on"],
    required: true,
  },
});

// Export model
module.exports = mongoose.model("Product", ProductSchema);
