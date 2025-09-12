# 🔐 Password-Based Authentication – SQL Backend (Node.js + Express + Sequelize)

This is the **backend** for a password-based user authentication system using a **SQL database** (MySQL/PostgreSQL/SQLite) with **Node.js**, **Express**, and **Sequelize** ORM.

---

## 🚀 Features

- ✅ Email & Password registration and login
- ✅ Sequelize ORM (MySQL / PostgreSQL / SQLite support)
- ✅ JWT-based session authentication
- ✅ bcrypt password hashing
- ✅ Sequelize migrations support
- ✅ Environment-based configuration

---

## 🧠 Tech Stack

- Node.js + Express
- Sequelize ORM
- MySQL / PostgreSQL / SQLite
- JWT (jsonwebtoken)
- bcrypt
- dotenv

---

## 📁 Folder Structure

backend/
├── config/ # Sequelize config
├── controllers/ # Login/Register logic
├── migrations/ # Sequelize migration files
├── models/ # Sequelize models (User)
├── routes/ # API route definitions
├── .env # Environment variables
├── index.js # Server entry point
└── package.json

---

## ⚙️ Setup Guide

### 1️⃣ Navigate to Project

```bash
cd templates/sql/passwordbased/backend
```

### 2️⃣ Install Dependencies
npm install
### 3️⃣ Create .env File

Create a .env file inside the backend/ directory:

DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
DB_HOST=localhost
DB_DIALECT=mysql          # or postgres / sqlite
PORT=5000
JWT_SECRET=your_jwt_secret

### Run Migrations

Make sure your database exists. Then run:

 npx sequelize-cli db:migrate


This sets up all the tables in your database.
### 5️⃣ Start the Server
nodemon index.js
# or
node index.js

🛠 Sequelize CLI Commands

Make sure you're inside the backend/ directory:

✔️ Initialize Sequelize (Already Done)
npx sequelize-cli init

🧱 Create a Model & Migration
npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string

🚀 Run Migrations
npx sequelize-cli db:migrate

↩️ Undo Last Migration
npx sequelize-cli db:migrate:undo

🔄 Undo All Migrations
npx sequelize-cli db:migrate:undo:all

🆕 Create Empty Migration File
npx sequelize-cli migration:generate --name add-role-to-user

🌱 (Optional) Seed Demo Data
npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli db:seed:all


### 📝 License

Developed by Sonam
Licensed under the MIT License