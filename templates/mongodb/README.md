# MongoDB Templates

This directory contains project templates that use **MongoDB** as the backend database with a **Node.js + Express backend** and a **React frontend**.

Each template includes a full-stack setup, with a frontend and backend folder, and supports one of two authentication methods.

## 🔐 Available Templates

- [`otpbased/`](./otpbased) – OTP-based authentication using email or mobile  
- [`passwordbased/`](./passwordbased) – Traditional email/password login

Each variant includes:

- A Vite-based React frontend  
- An Express + MongoDB backend (using Mongoose)  
- JWT-based session authentication  
- RESTful APIs

---

## 📦 How to Use

1. Choose a variant:

    ```bash
        cd templates/mongodb/otpbased
        # or
        cd templates/mongodb/passwordbased

2. Install dependencies & run the backend:

    cd backend

    npm install

    nodemon index.js
3. Create a .env file in the backend/ folder:
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
4. Install dependencies & run the frontend:

    cd ../frontend/vite-project

    npm install

    npm run dev
## 📁 Folder Structure
    mongodb/
    ├── otpbased/
    │   ├── backend/
    │   └── frontend/
    └── passwordbased/
        ├── backend/
        └── frontend/

## 📄 License

Developed by Sonam

This project is licensed under the [MIT License](./LICENSE).
