// components/SignUp.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/authslices";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showpassword, setShowPassoword] = useState(false);
  const [confirmshowpassword, setconfirmShowPassoword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(signupUser(data));

      if (signupUser.fulfilled.match(resultAction)) {
        console.log("✅ Signup successful:", resultAction.payload);
        navigate("/signin"); // ✅ Redirect to sign-in
      } else {
        console.error("❌ Signup failed:", resultAction.payload);
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input
          type="text"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <p className="error-message">{errors.username.message}</p>
        )}

        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}

        <label>Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={showpassword ? "password" : "text"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <span
            onClick={() => setShowPassoword((prev) => !prev)}
            className="eyebutton"
          >
            {showpassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <label>Confirm Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={confirmshowpassword ? "password" : "text"}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          <span
            onClick={() => setconfirmShowPassoword((prev) => !prev)}
            className="eyebutton"
          >
            {confirmshowpassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" className="auth-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
