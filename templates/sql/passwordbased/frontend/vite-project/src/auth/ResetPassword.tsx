

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/authSilces";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ResetFormData {
  newPassword: string;
  confirmPassword: string;
}

// ✅ Yup Validation Schema
const schema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ResetFormData) => {
    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }

    const result = await dispatch(
      resetPassword({
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      })
    );

    if (resetPassword.fulfilled.match(result)) {
      toast.success("Password reset successfully. Please sign in.");
      navigate("/signin");
    } else {
      toast.error(result.payload || "Failed to reset password.");
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
          Reset Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword")}
                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter new password"
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-indigo-600 transition"
              >
                {showNewPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm new password"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-indigo-600 transition"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 text-white font-semibold shadow-md transition duration-300 hover:opacity-90 hover:shadow-lg"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
