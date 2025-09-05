const Otp = require('../Models/OtpModel');
const userModel = require('../Models/Signup'); 
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

  try {
    // Check for recent OTP within 10 mins
    const recentOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (recentOtp) {
      const now = new Date();
      const diff = (now - recentOtp.createdAt) / 1000; // in seconds
      if (diff < 60) {
        return res.status(429).json({ error: "OTP already sent recently. Please wait a minute." });
      }
    }

    const rawOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
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
const verifyOtp = async (req, res) => {
  console.log(req.body);
  const { email, otp } = req.body;

  try {
    const validOtpEntry = await Otp.findOne({ email }).sort({ createdAt: -1 });
    
    if (!validOtpEntry) {
      return res.status(400).json({ error: "OTP not found or expired" });
    }

    const isMatch = await bcrypt.compare(otp, validOtpEntry.otp);
console.log('OTP received from user:', otp);
console.log('Hashed OTP from DB:', validOtpEntry.otp);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Clean up used OTP
    await Otp.create({
        email:email,
        otp:otp
      })

    const emailExist = await userModel.findOne({ email });

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
      username: username,
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
