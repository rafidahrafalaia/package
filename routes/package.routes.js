module.exports = (app) => {
  const packages = require("../controllers/package.controller.js");

  var router = require("express").Router();

  app.use("/package", router);

  router.post("/", packages.postPackage);

  router.get("/", packages.getAllPackage);

  router.get("/:id", packages.getOnePackage);

  router.put("/:id", packages.putPackage);

  router.patch("/:id", packages.patchPackage);

  router.delete("/:id", packages.deletePackage);

  // router.delete("/", packages.deleteAll);

};
