const config = require("../config");
const { packageMongo } = require('../mongo_models/package.model.');
const logger = require("../loaders/logger");
const { query, body, validationResult, param } = require("express-validator");

const customValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return {
      param: error.param,
      value: error.value,
      location: error.location,
      message: error.msg,
    };
  },
});

 // Create and Save a new Package
exports.postPackage = async (req, res) => {
  await body().not().isEmpty().withMessage("Content can not be empty!").run(req);

  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.body.transaction_id;
  try{
    packageMongo.findOne({transaction_id  : id})
    .then(data => {
      if (data)
        res.status(403).send({ message: "Package with transaction id= " + id + " already exist"});
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Package with transaction id=" + id });
    });
    // Create a Package
    const newPackage = new packageMongo(req.body);
    // Save Package in the database
    newPackage
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Package."
        });
      });
  }catch (err) {
    logger.error("🔥 error: %o", err);
    throw new Error(err);
  }
};

// Update a Package by the id in the request
exports.putPackage = async (req, res) => {
  await body().not().isEmpty().withMessage("Content can not be empty!").run(req);
  await param("id").not().isEmpty().withMessage("Must provide an id").isUUID().withMessage("Must provide an UUID V1 format").run(req);

  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.params.id;
  try{
    packageMongo.updateOne({transaction_id : id}, req.body)
      .then(data => {
        if (!data.nModified) {
          res.status(404).send({
            message: `Cannot update Package with id=${id}. Maybe Package was not found!`
          });
        } else res.status(200).send({ message: "Package was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Package with id=" + id
        });
      });
  }catch (err) {
    logger.error("🔥 error: %o", err);
    throw new Error(err);
  }
};

// Patch a Package by the id in the request
exports.patchPackage = async (req, res) => {
  await body().not().isEmpty().withMessage("Content can not be empty!").run(req);
  await param("id").not().isEmpty().withMessage("Must provide an id").isUUID().withMessage("Must provide an UUID V1 format").run(req);
  
  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.params.id;
  try{
    packageMongo.updateOne({transaction_id  : id}, {$set: req.body})
      .then(data => {
        if (!datan.Modified) {
          res.status(404).send({
            message: `Cannot patch Package with id=${id}. Maybe Package was not found!`
          });
        } else res.send({ message: "Package was patched successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error patching Package with id=" + id
        });
      });
  }catch (err) {
    logger.error("🔥 error: %o", err);
    throw new Error(err);
  }
};

// Delete a Package with the specified id in the request
exports.deletePackage = async (req, res) => {
  await param("id").not().isEmpty().withMessage("Must provide an id").isString().withMessage("Must provide a string Id").run(req);

  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.params.id;
  try{
    packageMongo.deleteOne({transaction_id  : id}, { useFindAndModify: false })
      .then(data => {
        if (!data.deletedCount) {
          res.status(404).send({
            message: `Cannot delete Package with id=${id}. Maybe Package was not found!`
          });
        } else {
          res.status(200).send({
            message: "Package was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Package with id=" + id
        });
      });
  }catch (err) {
    logger.error("🔥 error: %o", err);
    throw new Error(err);
  }
}

// // Retrieve all Package from the database.
exports.getAllPackage = async (req, res) => {
  await query("page")
    .optional()
    .not()
    .matches(/[!@#\$%\^\&*\)\(+=]+/, "g")
    .withMessage("Must not contain special character")
    .run(req);
  
  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const limits = config.display.limits;
  try{
    const page = req.params.page ? req.params.page-1 : 0;
      packageMongo.find({})
      .limit(limits)
      .skip(limits * page)
      .sort({
        created_at: 'asc'
      }).exec(function (err, doc) {
        if(err) { res.status(500).json(err); return; };
        res.status(200).json(doc);
      });
    }catch (err) {
      logger.error("🔥 error: %o", err);
      throw new Error(err);
  }
}

// // Find a single Package with an id
exports.getOnePackage = async (req, res) => {
  await param("id").not().isEmpty().withMessage("Must provide an id").isString().withMessage("Must provide a string Id").run(req);
  
  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id=req.params.id;
  try{
    packageMongo.find({transaction_id  : id})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Package with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Package with id=" + id });
      });
  }catch (err) {
    logger.error("🔥 error: %o", err.stack);
    throw new Error(err);
  }
};