const express = require("express");

const { sendOtp, verifyOtp, registerForm } = require("../controlers/authOtpVerification");

const router = express.Router();



router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register-form", registerForm);
module.exports = router;
