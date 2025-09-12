
require('dotenv').config(); // Load env variables
const Otp = require('../models/OTPmodel');
const userModel = require('../models/Signup'); 
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  }
});

const sendOtp = async (req, res) => {
  const { email } = req.body;
  console.log("email")
  try {
    console.log("---------------")
    const recentOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
    console.log("recentOtp",recentOtp)
    if (recentOtp) {
      const now = new Date();
      const diff = (now - recentOtp.createdAt) / 1000; 
      if (diff < 60) {
        return res.status(429).json({ error: "OTP already sent recently. Please wait a minute." });
      }
    }
    console.log("......")
    const rawOtp = Math.floor(100000 + Math.random() * 900000).toString(); 
    const hashedOtp = await bcrypt.hash(rawOtp, 10);

    await Otp.create({ email, otp: hashedOtp });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${rawOtp}`
    });
    console.log('Sending OTP:', rawOtp);
console.log('Hashed OTP saved:', hashedOtp);


    res.status(200).json({ message: "OTP sent successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Verify OTP
const jwt = require('jsonwebtoken');

const verifyOtp = async (req, res) => {
  console.log(req.body);
  const { email, otp } = req.body;

  try {
    // Find the most recent OTP for this email
    const validOtpEntry = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!validOtpEntry) {
      return res.status(400).json({ error: "OTP not found or expired" });
    }

    // Compare OTPs
    const isMatch = await bcrypt.compare(otp, validOtpEntry.otp);
    console.log('OTP received from user:', otp);
    console.log('Hashed OTP from DB:', validOtpEntry.otp);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // OTP matched, delete OTP record now
    await Otp.deleteOne({ _id: validOtpEntry._id });

    // Check if user exists
    const emailExist = await userModel.findOne({ email });

    // Generate JWT token
    const token = jwt.sign(
      { email }, 
      process.env.JWT_SECRET_KEY, 
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    // Set JWT token in httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // only send cookie over HTTPS in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
      sameSite: 'lax'
    });

    if (emailExist) {
      return res.status(200).json({
        message: "Email verified successfully. User exists. Redirect to dashboard."
      });
    } else {
      return res.status(200).json({
        message: "Email verified successfully. User does not exist. Redirect to data entry form."
      });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const registerForm = async (req, res) => {
  const { email, username } = req.body;
  console.log(req.body)
  try {
    await userModel.create({
      Username: username,
      email: email,
    });
    return res.status(200).json({ message: "user created successfully" });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "internal server error" });
  }
};


module.exports = {
  sendOtp,
  verifyOtp,
  registerForm
};
