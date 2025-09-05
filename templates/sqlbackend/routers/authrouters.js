const express = require("express");
const {
  signup,
  signIn,
  forgotPassword,
  resetPassword,
} = require("../controlers/authcontrollers");
const { sendOtp, verifyOtp, registerForm } = require("../controlers/authOtpVerification");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register-form", registerForm);
module.exports = router;
