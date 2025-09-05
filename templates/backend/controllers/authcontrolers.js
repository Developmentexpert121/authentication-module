
const userModel =require("../Models/Signup");
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SignUpModel = require("../Models/Signup");
const saltRounds = 10;
const dotenv=require("dotenv");
const nodemailer=require("nodemailer");
dotenv.config(); 
const jwt_key = process.env.JWT_SECRET_KEY;
 const signup = async (req, res) => {
    console.log(req.body)
   
    try {
        const { username, email, password, confirmPassword } = req.body;
            console.log(req.body)

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const emailExist = await SignUpModel.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ error: "Email already exists. Please choose another email." });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new SignUpModel({
            Username: username,
            email: email,
            password: hashedPassword,
            confirmPassword:confirmPassword
        });

        await newUser.save();

        return res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        return res.status(500).json({ error: "Server error", details: err.message });
    }
}
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ error: "Password did not match" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.Username, 
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, 
    });

    return res.status(200).json({
      message: "Sign in successfully",
      user: {
        id: user._id,
        username: user.Username,
        email: user.email,
      },
      token, 
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
};

 const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate a reset token (valid for 15 minutes)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });

        // Reset link
        const resetLink = `http://localhost:5173/reset-password/${token}`;

        // Send email (simple local test)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password reset email sent." });

    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
};

 const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    try {
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.id;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await userModel.findByIdAndUpdate(userId, { password: hashedPassword });

        res.status(200).json({ message: "Password reset successful." });

    } catch (err) {
        res.status(400).json({ error: "Invalid or expired token.", details: err.message });
    }
};
module.exports = {
  signup,
  signIn,resetPassword,forgotPassword
  
};