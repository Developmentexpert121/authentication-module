# 💻 React Frontend – Password-Based Auth (MongoDB)

This is the frontend for the **password-based authentication** system built with **React (Vite)**. It connects with a backend built using Node.js, Express, and MongoDB.

---

## 🚀 Tech Stack

- **React** (with Vite) – Frontend library
- **Axios** – For API requests
- **React Router DOM** – For routing between pages
- **JWT** – Stored in `localStorage` for authentication
- **Tailwind CSS / CSS Modules / Basic CSS** – For styling (depends on your setup)

---

## 📁 Folder Structure

frontend/
└── vite-project/
├── src/
│ ├── components/ # Reusable components
│ ├── pages/ # Pages like Login, Register, Dashboard
│ ├── App.jsx # App component with routes
│ ├── main.jsx # Entry point
├── public/
├── package.json
└── vite.config.js

### 1️⃣ Navigate to the frontend directory

```bash
cd templates/mongodb/passwordbased/frontend/vite-project
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