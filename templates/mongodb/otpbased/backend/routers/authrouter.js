const express=require("express")
const {sendOtp,verifyOtp,registerForm}=require("../controllers/Emailverificaton")
const router = express.Router();


router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/registerForm",registerForm);
module.exports = router;
