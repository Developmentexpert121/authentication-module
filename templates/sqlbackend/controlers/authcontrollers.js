// controllers/authController.js
const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const User = db.User;
const saltRounds = 10;
const jwt_key = process.env.JWT_SECRET_KEY;

// ✅ SIGNUP
const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// ✅ SIGNIN
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Password did not match" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      jwt_key,
      { expiresIn: "15m" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      message: "Sign in successful",
      user: { id: user.id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// ✅ FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ id: user.id }, jwt_key, { expiresIn: "15m" });
    const resetLink = `http://localhost:8080/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent." });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// ✅ RESET PASSWORD
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const decoded = jwt.verify(token, jwt_key);
    const userId = decoded.id;

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await User.update(
      { password: hashedPassword },
      { where: { id: userId } }
    );

    res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token", details: err.message });
  }
};

module.exports = {
  signup,
  signIn,
  forgotPassword,
  resetPassword,
};
