
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/authSilces";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface ForgotPasswordFormData {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgetForm: React.FC = () => {
  const dispatch = useDispatch();
  const [emailSentMessage, setEmailSentMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const resultAction: any = await dispatch(forgotPassword(data));

      if (forgotPassword.fulfilled.match(resultAction)) {
        setEmailSentMessage("A reset email has been sent to your email address.");
        toast.success("Password reset email sent!");
      } else {
        toast.error(resultAction.payload || "Failed to send reset email.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
      {/* Floating background blobs */}
      <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-400 to-pink-500 opacity-30 blur-3xl animate-bounce-slow"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/90 p-10 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-[1.03] hover:shadow-3xl">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-indigo-700 drop-shadow-sm">
          Forgot Password
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 text-white font-semibold shadow-md transition duration-300 hover:opacity-90 hover:shadow-lg"
          >
            Forget password
          </button>

          {/* Email Sent Message */}
          {emailSentMessage && (
            <p className="mt-2 text-sm text-green-600">{emailSentMessage}</p>
          )}

          {/* Back to Login */}
          <div className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/signin" className="font-medium text-indigo-600 hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetForm;
