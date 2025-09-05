const express=require("express")
const { signup, signIn, forgotPassword, resetPassword } =require( "../controllers/authcontrolers");
const {sendOtp,verifyOtp,registerForm}=require("../controllers/authEmailVerification")
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/registerForm",registerForm);
module.exports = router;

