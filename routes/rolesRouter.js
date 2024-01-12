const router = require("express").Router();
//Lodash is a popular javascript based library which provides 200+ functions to facilitate web development.
const _ = require("lodash");
const chalk = require("chalk");

// this will connect to the database
const connect = require("../database/database");
const mongoose = require("mongoose");
//Role schema
const { roleModel } = require("../models/roles"); //role validate Registration schema
//Middlewares
const validateRoleRegistration = require("../middlewares/roleValidation/roleRegisteration");
const validateUpdateRole = require('../middlewares/roleValidation/updatedRole')
const auth = require("../middlewares/authorization");
const adminAuth = require("../middlewares/adminAuthorization");

//============ GET all roles as admin ===========//
router.get("/", adminAuth, async function (req, res) {
  // Check if the user is an admin
  if (!req.isAdmin) {
    console.log(chalk.redBright("לא מורשה: המשתמש אינו מנהל"));
    return res.status(401).send("לא מורשה: המשתמש אינו מנהל");
  }
  roleModel.find({}, function (err, doc) {
    if (err) {
      console.log(chalk.redBright(err));
      return res.status(500).send(err);
    }
    console.log(doc);
    console.log(chalk.redBright("roles list has been sent successfully"));
    return res.status(200).json({ found: doc });
  });
});

//============ Add new role as admin ===========//

router.post("/", adminAuth, async function (req, res) {
  // Check if the user is an admin
  if (!req.isAdmin) {
    console.log(chalk.redBright("לא מורשה: המשתמש אינו מנהל"));
    return res.status(401).send("לא מורשה: המשתמש אינו מנהל");
  }

  // Validate request body
  const { error } = validateRoleRegistration(req.body);
  if (error) {
    console.log(chalk.redBright(error.details[0].message));
    return res.status(400).send(error.details[0].message);
  }
  // Check if role already exists
  let role = await roleModel.findOne({ name: req.body.name });
  if (role) {
    console.log(chalk.redBright("Registration Error: role already registered"));
    return res.status(400).send("role already registered.");
  }

  // Create new role with details from request body
  role = new roleModel(_.pick(req.body, ["name", "color"]));

  await role.save().then(() => {
    console.log("+ New role added successfully");
    res.status(200).json({
      message: "successfully added",
      inserted: role
    });
  });

});

//============ Update some role's values ===========//

router.patch("/:id", adminAuth, async function (req, res) {
  const id = req.params.id;
  const data = req.body;
 // Check if the user is an admin
 if (!req.isAdmin) {
    console.log(chalk.redBright("לא מורשה: המשתמש אינו מנהל"));
    return res.status(401).send("לא מורשה: המשתמש אינו מנהל");
  }

  let { error } = validateUpdateRole(data);
  if (error) {
    console.log(chalk.redBright(error.details[0].message));
    return res.status(400).send(error.details[0].message);
  }
  // Check if the name exists and belongs to a different role
 // Check if the name exists and belongs to a different role
const existingRole = await roleModel.findOne({ name: req.body.name });
if (existingRole && existingRole._id.toString() !== id) {
  console.log(chalk.redBright("Role already exists in the system"));
  return res.status(400).send("התפקיד שהזנת כבר קיים במערכת.");
}



  roleModel.findByIdAndUpdate(id, data, { new: true }, (err, doc) => {
    // Check if there was an error
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Role successfully updated", doc);
    return res.status(200).json({
      message: "Successfully updated",
      updated: doc
    });
  });
});

//============ GET a (single) role by id ===========//

router.get("/:id", adminAuth, async function (req, res) {
 // Check if the user is an admin
 if (!req.isAdmin) {
    console.log(chalk.redBright("לא מורשה: המשתמש אינו מנהל"));
    return res.status(401).send("לא מורשה: המשתמש אינו מנהל");
  }
  const id = req.params.id;
  roleModel.findById(id, (err, doc) => {
    // Check if there was an error
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }

    if (!doc) {
      console.log(`- Couldn't find role with id '${id}'`);
      return res
        .status(404)
        .json({ error: `Couldn't find role with id '${id}'` });
    }
    console.log("role's details been sent successfully:", doc);

    return res.status(200).json({ found: doc });
  });
});

//============ Delete a role by id ===========//

router.delete("/:id", adminAuth, async function (req, res) {
  const id = req.params.id;
  // Check if the user is an admin
  if (!req.isAdmin) {
    console.log(chalk.redBright("לא מורשה: המשתמש אינו מנהל"));
    return res.status(401).send("לא מורשה: המשתמש אינו מנהל");
  }
  roleModel.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }

    if (!doc) {
      console.log(`- Error deleting, couldn't find id '${id}'`);
      return res
        .status(404)
        .json({ error: `Error deleting- id '${id}' not found` });
    }

    console.log("Role has been deleted successfully:", doc);
    return res.status(200).json({
      message: "Successfully deleted",
      deleted: doc,
    });
  });
});


module.exports = router;
