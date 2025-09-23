

// components/SignUp.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/authSilces";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Yup Validation Schema
const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(signupUser(data));

      if (signupUser.fulfilled.match(resultAction)) {
        toast.success("Signup successful! Please sign in.");
        navigate("/signin");
      } else {
        toast.error(resultAction.payload || "Signup failed. Try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Signup error:", err);
    }
  };

  return (
<div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
  {/* Floating blobs */}
  <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-30 blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-400 to-pink-500 opacity-30 blur-3xl animate-bounce-slow"></div>
  <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-300 to-pink-400 opacity-20 blur-2xl animate-spin-slow"></div>

  {/* Card */}
  <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/90 p-10 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-[1.03] hover:shadow-3xl">
    ...
    <h2 className="mb-6 text-center text-4xl font-extrabold text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text drop-shadow-md animate-fade-in">
      Sign Up
    </h2>

    {/* <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Username */}
      <div className="animate-slide-up">
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          {...register("username")}
          className={`mt-1 w-full rounded-lg border px-4 py-2 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your username"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="animate-slide-up">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email")}
          className={`mt-1 w-full rounded-lg border px-4 py-2 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="animate-slide-up">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`mt-1 w-full rounded-lg border px-4 py-2 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-indigo-600 transition"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="animate-slide-up">
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <div className="relative">
          <input
            type={confirmShowPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className={`mt-1 w-full rounded-lg border px-4 py-2 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirm your password"
          />
          <span
            onClick={() => setConfirmShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-indigo-600 transition"
          >
            {confirmShowPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-lg"
      >
        Sign Up
      </button>
    {/* </form> */} 
    <form onSubmit={handleSubmit(onSubmit)}>
  
      <div>
        <label>username</label>
        <input
          type="text"
          {...register("username")}
          placeholder="Enter username"
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
  
      <div>
        <label>email</label>
        <input
          type="text"
          {...register("email")}
          placeholder="Enter email"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
  
      <div>
        <label>password</label>
        <input
          type="text"
          {...register("password")}
          placeholder="Enter password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
  <button type="submit">Sign Up</button>
</form>

  </div>
</div>
  );
};

export default SignUp;
