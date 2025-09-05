const { User, Otp } = require("../models");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Send OTP
const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const recentOtp = await Otp.findOne({
      where: { email },
      order: [['createdAt', 'DESC']],
    });

    if (recentOtp) {
      const now = new Date();
      const diff = (now - recentOtp.createdAt) / 1000; // seconds
      if (diff < 60) {
        return res.status(429).json({ error: "OTP already sent. Please wait a minute." });
      }
    }

    const rawOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(rawOtp, 10);

    await Otp.create({ email, otp: hashedOtp });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${rawOtp}`,
    });

    console.log("Sending OTP:", rawOtp);
    console.log("Hashed OTP saved:", hashedOtp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const validOtpEntry = await Otp.findOne({
      where: { email },
      order: [['createdAt', 'DESC']],
    });

    if (!validOtpEntry) {
      return res.status(400).json({ error: "OTP not found or expired" });
    }

    const isMatch = await bcrypt.compare(otp, validOtpEntry.otp);

    console.log("OTP received from user:", otp);
    console.log("Hashed OTP from DB:", validOtpEntry.otp);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

  

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(200).json({
        message: "Email verified. User exists. Redirect to dashboard.",
      });
    } else {
      return res.status(200).json({
        message: "Email verified. User does not exist. Redirect to data entry form.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const registerForm = async (req, res) => {
  const { email, username } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });

    if (existing) {
      return res.status(400).json({ error: "User already exists." });
    }

    await User.create({ email, username });

    return res.status(200).json({ message: "User created successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  registerForm,
};
