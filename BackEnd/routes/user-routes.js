const express = require("express");
const router = express.Router();
const users = require("../model/Users")
const { body, validationResult } = require("express-validator"); // Import express-validator
const usersController =  require("../controllers/users-controller")


const addUserValidation = [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("isAdmin").isBoolean(),
  ];
  

router.post("/register", addUserValidation, usersController.addUser);
router.post("/login", usersController.login)
router.post("/google", usersController.googleLogin)
router.get("/:id", usersController.getUserId);
router.get("/", usersController.getallUsers);
router.put("/:id", usersController.addPastOrder);

module.exports = router;