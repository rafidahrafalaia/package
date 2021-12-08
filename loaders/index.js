const expressLoader = require("./express");
const logger = require("./logger");
// const models = require("../models");
const mongoose = require("./mongoose");

module.exports = async (app) => {
  // LOAD ROUTES
  logger.info("✌️ Express loaded");
  await expressLoader(app);

  // LOAD MONGOOSE
  await mongoose();
};
