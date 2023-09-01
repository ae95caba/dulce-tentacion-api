const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FlavourSchema = new Schema({
  name: { type: String, required: true },
  outOfStock: {
    type: Boolean,
    required: true,
  },
});

// Export model
module.exports = mongoose.model("Flavour", FlavourSchema);
