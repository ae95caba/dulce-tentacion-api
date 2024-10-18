const getModel = require("../utils/getModel");

function validateModelType(req, res, next) {
  try {
    // Try to get the model, will throw an error if invalid
    const model = getModel(req.params.type);
    req.model = model; // Attach the model to the request object so that the controller can use it
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = validateModelType;
