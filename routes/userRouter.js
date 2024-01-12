const router = require("express").Router();
//Lodash is a popular javascript based library which provides 200+ functions to facilitate web development.
const _ = require("lodash");
const chalk = require("chalk");

// this will connect to the database
const connect = require("../database/database");
const mongoose = require("mongoose");
//user schema
const { userModel } = require("../models/userModel"); //user validate Registration schema

//Middlewares
const validateRegistration = require("../middlewares/usersValidations/registration");
const validateUpdateUser = require("../middlewares/usersValidations/updatedUser");
const auth = require("../middlewares/authorization");
const adminAuth = require("../middlewares/adminAuthorization");
const validateSignin = require("../middlewares/usersValidations/signIn");
const { comparePassword, generateHashPassword } = require("../services/bcrypt");
const { generateAuthToken } = require("../services/token");

// allow to using the server upload files/images
const multer = require("multer");
// const upload = multer({dest: __dirname + "/uploads"})
const {storage,upload} = require('../multer/multer');
const { date } = require("joi");

//============ Register ===========//

router.post("/register", async (req, res) => {
  //multer
  const { error } = validateRegistration(req.body);
  if (error) {
    console.log(chalk.redBright(error.details[0].message));
    return res.status(400).send(error.details[0].message);
  }

  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
    console.log(chalk.redBright("Registration Error: User already registered"));
    return res.status(400).send("כתובת האימייל שהזנת כבר במערכת.");
  }

  //The _.has function in Lodash is used to check if an object has a given property
  if (!_.has(req.body, "imgUrl")) {
    req.body.imgUrl =
      "http://localhost:5000/assets/images/user-profile-default.png";
  }

  user = new userModel(
    _.pick(req.body, ["name", "email", "password", "imgUrl"])
  );

  user.password = generateHashPassword(user.password);
  await user.save();
  res.json({
    token: generateAuthToken(user),
  });
});

//============ Login ===========//

router.post("/login", async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) {
    console.log(chalk.redBright(error.details[0].message));
    return res.status(400).send(error.details[0].message);
  }

  let user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    console.log(chalk.redBright("Invalid email"));
    return res.status(400).send("Invalid email or password.");
  }

  const validPassword = comparePassword(req.body.password, user.password);
  if (!validPassword) {
    console.log(chalk.redBright("Invalid password"));
    return res.status(400).send("Invalid email or password.");
  }

  console.log(chalk.greenBright(`User '${user.name}' logged in successfully`));
  console.log(chalk.greenBright(user));

  res.json({
    token: generateAuthToken(user),
  });
});

//============ GET all users as admin ===========//
router.get("/", adminAuth, async function (req, res) {
  // Check if the user is an admin
  if (!req.isAdmin) {
    console.log(chalk.redBright("Unauthorized: User is not an admin"));
    return res.status(401).send("Unauthorized: User is not an admin");
  }
  try {
    const users = await userModel.find().populate("roles", "name color"); // Populate the 'roles' field with the 'name' and 'color' fields

    console.log(chalk.redBright("Users list has been sent successfully"));
    return res.status(200).json({ found: users });
  } catch (err) {
    console.log(chalk.redBright(err));
    return res.status(500).send(err);
  }
});

//============ Add new user as admin ===========//

router.post("/", adminAuth, async function (req, res) {
  // Check if the user is an admin
  if (!req.isAdmin) {
    console.log(chalk.redBright("Unauthorized: User is not an admin"));
    return res.status(401).send("Unauthorized: User is not an admin");
  }

  // Validate request body
  const { error } = validateRegistration(req.body);
  if (error) {
    console.log(chalk.redBright(error.details[0].message));
    return res.status(400).send(error.details[0].message);
  }
  // Check if user already exists
  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
    console.log(chalk.redBright("Registration Error: User already registered"));
    return res.status(400).send("User already registered.");
  }

  //The _.has function in Lodash is used to check if an object has a given property
  if (!_.has(req.body, "imgUrl")) {
    req.body.imgUrl =
      "http://localhost:5000/assets/images/user-profile-default.png";
  }

  // Create new user with details from request body
  user = new userModel(
    _.pick(req.body, ["name", "email", "password", "imgUrl"])
  );

  user.password = generateHashPassword(user.password);
  await user.save().then(() => {
    console.log("+ New user added successfully");
    res.status(200).json({
      message: "successfully added",
      inserted: user,
    });
  });
});

//============ Update some user's values ===========//

router.patch(
  "/:id",
  auth,
  upload.single("imgUrl"),
  async function (req, res) {
    const id = req.params.id;
    const data = req.body;
console.log(req.body);
    // Check if the requester is an admin or if the user ID in the request parameter matches the ID of the authenticated user
    if (!req.user && (!req.user.isAdmin || req.user._id !== id)) {
      console.log(
        chalk.redBright("Unauthorized: User is not allowed to update this user")
      );
      return res
        .status(401)
        .send("Unauthorized: User is not allowed to update this user");
    }

    let { error } = validateUpdateUser(data);
    if (error) {
      console.log(chalk.redBright(error.details[0].message));
      return res.status(400).send(error.details[0].message);
    }

    // Check if the email exists and belongs to a different user
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser && existingUser._id.toString() !== id) {
      console.log(chalk.redBright("Email already exists in the system"));
      return res.status(400).send("כתובת האימייל שהזנת כבר במערכת.");
    }

    data.password = generateHashPassword(data.password);

    // Set default value for imgUrl field if it is not present in the request body
    if (req.file) {
      const fileName = req.file.path.replace("\\", "/");
      data.imgUrl = `http://localhost:5000/${fileName}`;
    } else {
      data.imgUrl = "http://localhost:5000/assets/images/user-profile-default.png";
    }

    userModel.findByIdAndUpdate(id, data, { new: true }, (err, doc) => {
      // Check if there was an error
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      }
      if (!doc) {
        console.log(`- Couldn't find item with id '${id}'`);
        return res
          .status(404)
          .json({ error: `Couldn't find item with id '${id}'` });
      }
      //TODO: i need to send a new token that will update the userData variable on the front.
      console.log("User successfully updated", doc);
      // Respond with the updated user outside the callback
      return res.status(200).json({
        message: "Successfully updated",
        updated: doc,
      });
    });
  }
);

//============ GET a (single) user by id ===========//

router.get("/:id", auth, async function (req, res) {
  // Check if the requester is an admin or if the user ID in the request parameter matches the ID of the authenticated user
  if (!req.isAdmin && req.userId !== id) {
    console.log(
      chalk.redBright("Unauthorized: User is not allowed to update this user")
    );
    return res
      .status(401)
      .send("Unauthorized: User is not allowed to update this user");
  }
  const id = req.params.id;
  userModel.findById(id, (err, doc) => {
    // Check if there was an error
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }

    if (!doc) {
      console.log(`- Couldn't find item with id '${id}'`);
      return res
        .status(404)
        .json({ error: `Couldn't find item with id '${id}'` });
    }
    console.log("User's details been sent successfully:", doc);

    return res.status(200).json({ found: doc });
  });
});

//============ Delete a user by id ===========//

router.delete("/:id", adminAuth, async function (req, res) {
  const id = req.params.id;
  // Check if the user is an admin
  if (!req.isAdmin) {
    console.log(chalk.redBright("Unauthorized: User is not an admin"));
    return res.status(401).send("Unauthorized: User is not an admin");
  }
  userModel.findByIdAndDelete(id, (err, doc) => {
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

    console.log("User has been deleted successfully:", doc);
    return res.status(200).json({
      message: "Successfully deleted",
      deleted: doc,
    });
  });
});

router.get("/userInfo", auth, (req, res) => {
  let user = req.user;

  userModel
    .findById(user._id)
    .select(["-password", "-createdAt", "-__v"])
    .then((user) => res.send(user))
    .catch((errorsFromMongoose) => res.status(500).send(errorsFromMongoose));
});

module.exports = router;
