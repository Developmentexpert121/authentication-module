# 🔐 MongoDB Password-Based Authentication (Backend)

This is the backend for a full-stack password-based authentication system using **Node.js**, **Express**, and **MongoDB**. Users register with email and password, and authenticate via secure login.

---

## 🚀 Tech Stack

- **Node.js** & **Express.js** – Backend server
- **MongoDB** + **Mongoose** – NoSQL database
- **JWT** – For secure authentication
- **bcrypt** – For password hashing

---

## 📁 Folder Structure

├── controllers/ # Handles login and registration logic
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── .env # Environment variables
├── index.js # App entry point
├── package.json


---

## ⚙️ Setup Instructions

### 1️⃣ Navigate to the backend folder

```bash
cd templates/mongodb/passwordbased/backend
```
### 2️⃣ Install dependencies
npm install

### 3️⃣ Create a .env file

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

Replace MONGO_URI with your MongoDB connection string (from MongoDB Atlas or local instance).

### 4️⃣ Start the backend server
nodemon index.js
# OR
node index.js

### ✅ Dependencies Used
| Package      | Description                        |
| ------------ | ---------------------------------- |
| express      | Node.js framework                  |
| mongoose     | MongoDB ODM                        |
| bcrypt       | Hash and compare passwords         |
| jsonwebtoken | Handle JWT tokens                  |
| dotenv       | Manage environment variables       |
| cors         | Enable CORS                        |
| nodemon      | (Dev) Auto-restart on file changes |


### Troubleshooting

MongoDB connection fails?

Check your .env file and make sure MONGO_URI is correct.

If using MongoDB Atlas, make sure your IP is whitelisted.


### 📄 License

Developed by Sonam
Licensed under the MIT License