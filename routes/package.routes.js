module.exports = (app) => {
  const packages = require("../controllers/package.controller.js");

  var router = require("express").Router();

  app.use("/package", router);

  router.post("/", packages.create);

  router.get("/", packages.findAll);

  router.get("/:id", packages.findOne);

  router.put("/:id", packages.update);

  router.patch("/:id", packages.patch);

  router.delete("/:id", packages.delete);

  // router.delete("/", packages.deleteAll);

};
