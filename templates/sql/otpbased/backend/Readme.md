# 🔐 OTP-Based Authentication – SQL Backend (Node.js + Express + Sequelize)

This is the **backend** for an OTP-based authentication system using a **SQL database** (MySQL/PostgreSQL/SQLite) powered by **Node.js**, **Express**, and **Sequelize**.

---

## 🚀 Features

- ✅ OTP-based login via email
- ✅ Sequelize ORM (MySQL / PostgreSQL / SQLite support)
- ✅ JWT authentication
- ✅ bcrypt OTP hashing
- ✅ Environment-based configuration
- ✅ Sequelize CLI migrations

---

## 🧠 Tech Stack

- Node.js + Express
- Sequelize ORM
- MySQL 
- JWT (jsonwebtoken)
- bcrypt
- dotenv

---

## 📁 Folder Structure

backend/
├── config/ # Sequelize DB config
├── controllers/ # Logic for sending/verifying OTP
├── migrations/ # Sequelize migration files
├── models/ # Sequelize models (User, Otp)
├── routes/ # API route definitions
├── .env # Environment variables
├── index.js # Server entry point
└── package.json

---

## ⚙️ Setup Guide

### 1️⃣ Navigate to Project

```bash
cd templates/sql/otpbased/backend
```
### 2️⃣ Install Dependencies
npm install
### 3️⃣ Configure Environment
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
DB_HOST=localhost
DB_DIALECT=mysql         
PORT=5000
JWT_SECRET=your_jwt_secret

### 4️⃣ Run Migrations
npx sequelize-cli db:migrate

This will execute all migrations in the migrations/ folder and create tables in your SQL database.

### 5️⃣ Start the Server
nodemon index.js
# or
node index.js

### 🛠 Sequelize CLI Cheat Sheet
All commands must be run inside the backend/ directory:

✔️ Initialize Sequelize (done already)

npx sequelize-cli init

🧱 Generate a Model & Migration

npx sequelize-cli model:generate --name User --attributes username:string,email:string

npx sequelize-cli model:generate --name Otp --attributes email:string,otp:string

### 🚀 Run Migrations
npx sequelize-cli db:migrate

### ↩️ Undo Last Migration
npx sequelize-cli db:migrate:undo

### 🔄 Undo All Migrations
npx sequelize-cli db:migrate:undo:all
### 🆕 Create Empty Migration File
npx sequelize-cli migration:generate --name create-user

### 🌱 (Optional) Seed Sample Data
npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli db:seed:all

### 📝 License

Developed by Sonam
Licensed under the MIT License