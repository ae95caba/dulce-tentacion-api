// Generic function to get the model based on the type (either Flavour or Sauce)
function getModel(type) {
  const models = {
    flavour: require("../models/flavour"),
    sauce: require("../models/sauce"),
  };

  // Check if the type exists in the models object
  if (!models[type]) {
    throw new Error(`Invalid model type: ${type}`);
  }

  return models[type];
}

module.exports = getModel; // Use CommonJS export
