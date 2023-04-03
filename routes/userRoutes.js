const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const validateRequest = require("../middleware/validateRequest");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateRequest, currentUser);

module.exports = router;
