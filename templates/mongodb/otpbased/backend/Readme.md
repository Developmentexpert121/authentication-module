# 🔐 OTP-Based Authentication – MongoDB Backend (Node.js + Express + Mongoose)
This is the backend for an OTP-based authentication system using a MongoDB database powered by Node.js, Express, and Mongoose.

# 🚀 Features
- ✅ OTP-based login via email
- ✅ Mongoose ODM for MongoDB
- ✅ JWT authentication
- ✅ bcrypt OTP hashing
- ✅ Environment-based configuration
- ✅ MongoDB indexes for better performance


---
## 🧠 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt
- dotenv

---

## 📁 Folder Structure

backend/
├── config/        # MongoDB connection config
├── controllers/   # Logic for sending/verifying OTP
├── models/        # Mongoose models (User, Otp)
├── routes/        # API route definitions
├── .env           # Environment variables
├── index.js       # Server entry point
└── package.json

## ⚙️ Setup Guide

### 1️⃣ Navigate to Project
```bash
cd templates/mongodb/otpbased/backend

```
### 2️⃣ Install Dependencies
``` bash 
npm install
```
### 3️⃣ Configure Environment

- Create a .env file with the following variables:
```bash 
MONGO_URI=mongodb://localhost:27017/your_database_name
PORT=5000
JWT_SECRET=your_jwt_secret

```
### 4️⃣ Start the Server
``` bash 
nodemon index.js
# or
node index.js
```

### 📝 License

- Developed by Sonam
- Licensed under the MIT License