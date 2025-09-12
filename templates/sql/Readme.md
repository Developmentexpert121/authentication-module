# 🗃️ SQL Project Generator

This is a full-stack **project generator** that scaffolds complete web applications using:

- ✅ **Node.js + Express backend**
- ✅ **React (Vite) frontend**
- ✅ **SQL Database** (MySQL / PostgreSQL / SQLite)
- ✅ **Sequelize ORM**

## ✨ Features

- Choose your **SQL backend**: MySQL / PostgreSQL / SQLite
- Select authentication method:
  - 🔑 OTP-based login
  - 🔐 Password-based login
- Auto-generates complete frontend + backend code
- Zips the project for download and extraction
- Fully working REST APIs, DB setup, and frontend

---

## 📦 How to Use

1. Run the Project Generator app (from this repo).
2. Choose:
   - **Database**: SQL (MySQL / Postgres / SQLite)
   - **Authentication**: OTP-based or Password-based
3. Click **Download**
4. Extract the `.zip` file locally

---

## 🛠 What You Get

- ⚛️ Vite-powered React frontend (`frontend/`)
- 🧪 Express backend with Sequelize ORM (`backend/`)
- 📚 Clean project structure
- 🔐 JWT authentication (OTP or password)
- 🔁 REST API endpoints
- 🗄️ SQL database integration
- ⚙️ Sequelize migrations + models
- 🌱 `.env` environment config support

---

## 📁 Example Generated Project Structure

    ```bash
    project-generator/
    ├── backend/
    ├── frontend/
    │   └── vite-project/
    │
    ├── templates/
    │   ├── sql/
    │   │   ├── otpbased/
    │   │   │   ├── frontend/
    │   │   │   └── backend/
    │   │   └── passwordbased/
    │   │       ├── frontend/
    │   │       └── backend/
    │
    ├── LICENSE
    └── README.md ← this file


## 📄 License

Developed by Sonam

This project is licensed under the [MIT License](./LICENSE).
