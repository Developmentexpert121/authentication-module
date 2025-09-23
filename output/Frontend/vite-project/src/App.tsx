

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SignUp from "./auth/Signup";
import SignIn from "./auth/Signin";
import ResetPassword from "./auth/ResetPassword";
import "./App.css";
import { verifyToken } from "./redux/authSilces";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ForgetForm from "./auth/ForgetForm";
import  Dashboard  from "./Dasboard/Dashboard";
function App() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const publicRoutes = [
        "/signup",
        "/signin",
        "/reset-password",
        "/emailverification",
        "/forgetbutton",
      ];

      const currentPath = location.pathname.toLowerCase();
      const isPublicRoute = publicRoutes.some((route) =>
        currentPath.startsWith(route)
      );

      console.log("Current path:", currentPath);
      console.log("Is public route?", isPublicRoute);

      try {
        const result = await dispatch(verifyToken()).unwrap();
        const role = result.user?.role || "subadmin";

        console.log("User authenticated:", result);

        // Redirect authenticated users to dashboard
        if (currentPath === "/" || currentPath === "/signin") {
          navigate(
            role === "admin" ? "/admin/dashboard" : "/subadmin/dashboard",
            { replace: true }
          );
        }
      } catch (error) {
        console.log("Token verification failed:", error);

        // If not authenticated and not on a public route → redirect
        if (!isPublicRoute && currentPath !== "/signin") {
          navigate("/signin", { replace: true });
        } else {
          console.log("On public route, no redirect.");
        }
      }
    };

    checkAuth();
  }, [dispatch, navigate, location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/forgetbutton" element={<ForgetForm />} />
        <Route path="/subadmin/dashboard" element={<div>Subadmin Dashboard</div>} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000}  />
    </>
  );
}

export default App;
