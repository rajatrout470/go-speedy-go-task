const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

//Create user
router.post("/user", userController.createUser);

//Fetch All Users
router.get("/user", userController.getAllUsers);

//Fetch Users by UserId
router.get("/user/:userId/", userController.getUserById);

//Update User by UserId
router.put("/user/:userId", userController.updateUserById);

//Delete User by UserId
router.delete("/user/:userId", userController.deleteUserById);

module.exports = router;
