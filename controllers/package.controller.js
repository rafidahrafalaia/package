const { packageMongo } = require('../mongo_models/package.model.');
const config = require("../config");

// Create and Save a new Package
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  try{
    // Create a Package
    const package = new packageMongo({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    });

    // Save Package in the database
    packageMongo
      .save(package)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  }catch (err) {
    logger.error("🔥 error: %o", err);
    throw new Error(err);
  }
};

// Retrieve all Package from the database.
exports.findAll = (req, res) => {
  const page = req.params.page ? req.params.page-1 : 0;
  const limits = config.display.limits;
  try{
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
};

// Find a single Package with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  try{
    packageMongo.findById({transaction_id:id})
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

// Update a Package by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  try{
    packageMongo.findByIdAndUpdate({transaction_id:id}, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update packageMongo with id=${id}. Maybe Tutorial was not found!`
          });
        } else res.send({ message: "Package was updated successfully." });
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

// Delete a Package with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  try{
    packageMongo.findByIdAndRemove({transaction_id:id}, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Package with id=${id}. Maybe Package was not found!`
          });
        } else {
          res.send({
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
};

// Delete all Package from the database.
exports.deleteAll = (req, res) => {
  packageMongo.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Package were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Package."
      });
    });
};

