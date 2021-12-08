const { Router } = require("express");

// ROUTES
const package = require("./package.routes");

module.exports = () => {
  const app = Router();

  package(app);

  return app;
};
