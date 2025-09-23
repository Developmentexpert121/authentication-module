

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser, forgotPassword } from "../redux/authSilces";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {forgetbutton} from "./ForgetForm";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

interface LoginFormData {
  email: string;
  password: string;
}

// ✅ Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailSentMessage, setEmailSentMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const resultAction: any = await dispatch(loginUser(data));
      console.log("result",resultAction)
      if (loginUser.fulfilled.match(resultAction)) {
        toast.dismiss();

        toast.success("Login successful!");
        navigate("/admin/dashboard"); 
      } else {
        console.log("11111111111",resultAction.payload)
        toast.dismiss();

        toast.error(resultAction.payload || "Login failed.");
      }
    } catch (error) {
      toast.error("Something went wrong during login.");
    }
  };

  const handleForgotPassword = async () => {
   navigate("/forgetbutton")
  };

  return (
   

<div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
  {/* Floating background blobs */}
  <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-30 blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-400 to-pink-500 opacity-30 blur-3xl animate-bounce-slow"></div>

  {/* Card */}
  <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/90 p-10 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-[1.03] hover:shadow-3xl">
    <h2 className="mb-6 text-center text-3xl font-extrabold text-indigo-700 drop-shadow-sm">
      Sign In
    </h2>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/*FIELDS_PLACEHOLDER_SIGNIN*/}

      {/* Forgot Password */}
      <button
        type="button"
        onClick={handleForgotPassword}
        className="text-sm font-medium text-indigo-600 hover:underline"
      >
        Forgot Password?
      </button>

      {emailSentMessage && (
        <p className="mt-2 text-sm text-green-600">{emailSentMessage}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 text-white font-semibold shadow-md transition duration-300 hover:opacity-90 hover:shadow-lg"
      >
        Sign In
      </button>

      {/* Switch */}
      <div className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link to="/signup" className="font-medium text-indigo-600 hover:underline">
          Sign Up
        </Link>
      </div>
    </form>
  </div>
</div>


  );
};

export default SignIn;
