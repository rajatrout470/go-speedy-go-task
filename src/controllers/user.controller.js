const userModel = require("../models/user.model");
const validator = require("validator");
const { check, validationResult } = require("express-validator");

// Create User
const createUser = async function (req, res) {
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .send({ status: false, message: "No data entered to create user" });
    }

    const { name, userImage, age, salary } = req.body;

    if (!name || !userImage || !age || !salary) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Kindly fill all the required details",
        });
    }

    let saveData = await userModel.create(req.body);
    res.status(201).send({ status: true, data: saveData });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

// Get All Users
const getAllUsers = async function (req, res) {
  try {
    let getAllData = await userModel.find({ isDeleted: false });

    return getAllData.length === 0
      ? res.status(404).send({ status: true, message: "Data not found" })
      : res.status(200).send({ status: true, data: getAllData });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

// Get User by Id
const getUserById = async function (req, res) {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res
        .status(400)
        .send({ status: false, message: "User Id Is Needed" });
    }

    if (!validator.isMongoId(userId)) {
      return res.status(400).send({ status: false, message: "Invalid userId" });
    }

    const userData = await userModel
      .findOne({ _id: userId, isDeleted: false })
      .lean();

    if (!userData) {
      return res
        .status(404)
        .send({ status: false, message: "No User Found With Given User Id" });
    }

    return res
      .status(200)
      .send({ status: true, message: "Success", data: userData });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

// Update User by Id
const updateUserById = async function (req, res) {
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .send({ status: false, message: "No data entered to update user" });
    }

    const { name, userImage, age, salary } = req.body;

    // Validate input data
    await Promise.all([
      check("name")
        .optional()
        .isString()
        .withMessage("Name must be a string")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters long"),
      check("userImage")
        .optional()
        .isURL()
        .withMessage("User Image must be a valid URL"),
      check("age")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Age must be a positive integer"),
      check("salary")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Salary must be a positive number"),
    ]).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: false, errors: errors.array() });
    }

    // Update user
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.params.userId, isDeleted: false },
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ status: false, message: "User not found" });
    }

    res
      .status(200)
      .send({
        status: true,
        message: "User updated successfully",
        data: updatedUser,
      });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

// Delete User by Id
const deleteUserById = async function (req, res) {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res
        .status(400)
        .send({ status: false, message: "User Id Is Needed" });
    }

    if (!validator.isMongoId(userId)) {
      return res.status(400).send({ status: false, message: "Invalid userId" });
    }

    const userData = await userModel
      .findOne({ _id: userId, isDeleted: false })
      .lean();

    if (!userData) {
      return res
        .status(404)
        .send({ status: false, message: "No User Found With Given User Id" });
    }

    await userModel.findOneAndUpdate(
      { _id: userId },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    return res
      .status(200)
      .send({ status: true, message: "User successfully deleted" });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.createUser = createUser;
module.exports.getAllUsers = getAllUsers;
module.exports.getUserById = getUserById;
module.exports.updateUserById = updateUserById;
module.exports.deleteUserById = deleteUserById;
