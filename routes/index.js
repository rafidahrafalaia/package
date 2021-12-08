const { Router } = require("express");

// ROUTES
const packageRoute = require("./package.routes");

module.exports = () => {
  const app = Router();

  packageRoute(app);

  return app;
};
