## Setup Express web server
```
module.exports = (app) => {
	app.enable('trust proxy');
	app.disable('etag').disable('x-powered-by');

	// PREVENT ATTACKS TO EXPRESS
	app.use(cors());
	// CORS MIDDLEWARE
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(hpp());

   // LOAD API ROUTES
   app.use(routes());
   
	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err['status'] = 404;
		next(err);
	});

	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json({ error: err.message });
	});
};

```
### Define Mongoose
```
module.exports = async () => {
  const { username, password, host, port, database } = config.mongoDB;
  try {
    // mongoose.set("debug", true);
    await mongoose.connect(`mongodb://${username}:${password}@${host}:${port}`, {
      dbName: database,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (e) {
    throw e;
  }
};
```
### Setup Logger
```
const winston = require('winston');
const config = require('../config');

const transports = [];
   transports.push(
      new winston.transports.Console({
         format: winston.format.combine(winston.format.cli(), winston.format.splat())
      })
   );


const LoggerInstance = winston.createLogger({
   level: config.logs.level,
   levels: winston.config.npm.levels,
   format: winston.format.combine(
      winston.format.timestamp({
         format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
   ),
   transports
});

module.exports = LoggerInstance;
```
### Define the Mongoose Model
inside mongo_models folder
```
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema(
  {
    transaction_id: {
      type: String,
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_code: {
      type: String,
      required: true,
    },
    transaction_amount: {
      type: String,
      required: true,
    },
    transaction_discount: {
      type: String,
      required: true,
    },
    transaction_additional_field: {
      type: String,
      required: false,
    },
    transaction_payment_type: {
      type: String,
      required: true,
    },
    transaction_state: {
      type: String,
      required: true,
    },
    transaction_code: {
      type: String,
      required: true,
    },
    transaction_order: {
      type: Number,
      required: true,
    },
    location_id: {
      type: String,
      required: true,
    },
    organization_id: {
      type: Number,
      required: true,
    },
    created_at: {
      type: String,
      required: true,
    },
    updated_at: {
      type: String,
      required: true,
    },
    transaction_payment_type_name: {
      type: String,
      required: true,
    },
    transaction_cash_amount: {
      type: Number,
      required: true,
    },
    transaction_cash_change: {
      type: Number,
      required: true,
    },
    customer_attribute: {
      type: Object,
      required: false,
    },
    connote: {
      type: Object
    },
    connote_id:{
      type: String,
    },
    origin_data: {
      type: Object,
      required: true,
    },
    destination_data: {
      type: Object,
      required: true,
    },
    koli_data: {
      type: Object,
      required: false,
    },
    custom_field: {
      type: Object,
      required: false,
    },
    currentLocation: {
      type: Object,
      required: false,
    },
  },
  { collection: "package" }
);

packageSchema.index(
  {"_id": 1},
  {"transaction_id": 1},
);

const packageMongo = mongoose.model("package", packageSchema);

module.exports = {
  packageMongo,
};
```
### Controller
use express-validator to valide request from client
```
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
```
### Post
```
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
```
### Put
```
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
```
### Patch
```
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
```
### Delete
```
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
```
### Get All
```
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
```
### Get One
```
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
  ```
  ## Routes
  ```
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

};
```
# Test the APIs
1. Create a new Package using POST /package Api

<p align="center">
  <img src="https://github.com/rafidahrafalaia/package/blob/main/result/post.JPG" width="650" alt="accessibility text">
</p>
2. Update a Package using PUT /package/:id Api

<p align="center">
  <img src="https://github.com/rafidahrafalaia/package/blob/main/result/put.JPG" width="650" alt="accessibility text">
  <img src="https://github.com/rafidahrafalaia/package/blob/main/result/put2.JPG" width="650" alt="accessibility text">
</p>
3. Patch a Package using PATCH /package/:id Api

<p align="center">
  <img src="https://github.com/rafidahrafalaia/package/blob/main/result/patch.JPG" width="650" alt="accessibility text">
  <img src="https://github.com/rafidahrafalaia/package/blob/main/result/put2.JPG" width="650" alt="accessibility text">
</p>
4. Delete a Package using DELETE /package/:id Api

<p align="center">
  <img src="https://github.com/rafidahrafalaia/package/blob/main/result/delete.JPG" width="650" alt="accessibility text">
</p>
5. Get a Package using GET /package/:id Api

<p align="center">
  <img src="https://github.com/rafidahrafalaia/package/blob/main/result/getOne.JPG" width="650" alt="accessibility text">
</p>
6. Get a Package using GET /package Api

<p align="center">
  <img src="https://github.com/rafidahrafalaia/package/blob/main/result/getAll.JPG" width="650" alt="accessibility text">
</p>

## Testing Result
<p align="center">
  <img src="https://github.com/rafidahrafalaia/package/blob/main/result/test.JPG" width="450" alt="accessibility text">
</p>

