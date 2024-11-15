const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AlfamioSchema = new Schema({
  name: { type: String, required: true },
  outOfStock: {
    type: Boolean,
    required: false,
  },
});

// Export model
module.exports = mongoose.model("Alfamio", AlfamioSchema);
