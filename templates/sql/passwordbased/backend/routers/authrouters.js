const express = require("express");
const {
  signup,
  signIn,
  forgotPassword,
  resetPassword,
} = require("../controlers/authcontrollers");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
