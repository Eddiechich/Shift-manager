const router = require("express").Router();
//Lodash is a popular javascript based library which provides 200+ functions to facilitate web development.
const _ = require("lodash");
const chalk = require("chalk");

// this will connect to the database
const connect = require("../database/database");
const mongoose = require("mongoose");


//Contact Messages schema
const { contactMessagesModel } = require("../models/contactMessages"); //message validate Registration schema

//Middlewares
const validateContactMessage = require("../middlewares/contactMessagesValidations/contactMessagesValidations");
const auth = require("../middlewares/authorization");
const adminAuth = require("../middlewares/adminAuthorization");

//============ GET all messages as admin ===========//
router.get("/", adminAuth, async function (req, res) {
  // Check if the user is an admin
  if (!req.isAdmin) {
    console.log(chalk.redBright("לא מורשה: המשתמש אינו מנהל"));
    return res.status(401).send("לא מורשה: המשתמש אינו מנהל");
  }
  contactMessagesModel.find({}, function (err, doc) {
    if (err) {
      console.log(chalk.redBright(err));
      return res.status(500).send(err);
    }
    console.log(doc);
    console.log(chalk.redBright("messages list has been sent successfully"));
    return res.status(200).json({ found: doc });
  });
});

//============ Add new message as admin ===========//

router.post("/", async function (req, res) {

  // Validate request body
  const { error } = validateContactMessage(req.body);
  if (error) {
    console.log(chalk.redBright(error.details[0].message));
    return res.status(400).send(error.details[0].message);
  }
 
  // Create new message with details from request body
  message = new contactMessagesModel(_.pick(req.body, ["name", "email","phone","message"]));

  await message.save().then(() => {
    console.log("+ New message added successfully");
    res.status(200).json({
      message: "successfully added",
      inserted: message,
    });
  });
});

//!============ Don't need edit or Update message's values ===========//

//============ GET a (single) message by id ===========//

router.get("/:id", adminAuth, async function (req, res) {
  // Check if the user is an admin
  if (!req.isAdmin) {
    console.log(chalk.redBright("לא מורשה: המשתמש אינו מנהל"));
    return res.status(401).send("לא מורשה: המשתמש אינו מנהל");
  }
  const id = req.params.id;
  contactMessagesModel.findById(id, (err, doc) => {
    // Check if there was an error
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }

    if (!doc) {
      console.log(`- Couldn't find message with id '${id}'`);
      return res
        .status(404)
        .json({ error: `Couldn't find message with id '${id}'` });
    }
    console.log("message's details been sent successfully:", doc);

    return res.status(200).json({ found: doc });
  });
});

//============ Delete a message by id ===========//

router.delete("/:id", adminAuth, async function (req, res) {
  const id = req.params.id;
  // Check if the user is an admin
  if (!req.isAdmin) {
    console.log(chalk.redBright("לא מורשה: המשתמש אינו מנהל"));
    return res.status(401).send("לא מורשה: המשתמש אינו מנהל");
  }
  contactMessagesModel.findByIdAndDelete(id, (err, doc) => {
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

    console.log("message has been deleted successfully:", doc);
    return res.status(200).json({
      message: "Successfully deleted",
      deleted: doc,
    });
  });
});

module.exports = router;
