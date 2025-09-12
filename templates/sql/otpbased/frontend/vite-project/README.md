# 🔐 React Frontend – OTP-Based Auth (MongoDB)

This is the **frontend** for an OTP-based authentication system built with **React (Vite)**. It communicates with a **sql + Node.js + Express** backend and allows users to log in using a One-Time Password (OTP) sent to their email.

---

## 🚀 Tech Stack

- **React (Vite)** – Frontend framework
- **React Router DOM** – Routing
- **JWT** – For session-based access
- **Tailwind CSS** / **CSS Modules** (optional) – Styling

---

## 📁 Project Structure

frontend/
└── vite-project/
├── src/
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ └── main.jsx
├── public/
├── package.json
└── vite.config.js

---

## ⚙️ Setup Instructions

### 1️⃣ Navigate to the frontend directory

```bash
cd templates/mongodb/otpbased/frontend/vite-project
```
### 2️⃣ Install dependencies
npm install
### 3️⃣ Start the development server
npm run dev
This will start the app on:

👉 http://localhost:5173
### 🌐 .env (Optional)
If you need to use environment variables for API base URL:
Create a .env file in the root of vite-project/:

VITE_API_BASE_URL=http://localhost:5000

✅ Dependencies Used
| Package          | Description                  | 
| ---------------- | ---------------------------- |
| react            | Frontend library             |
| react-router-dom | Routing                      |
| vite             | Fast build tool              |
| tailwindcss      | (Optional) Styling framework |

### 🛠 Common Issues

CORS Error?
Make sure your backend has:

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

### 📄 License

Developed by Sonam
Licensed under the MIT License