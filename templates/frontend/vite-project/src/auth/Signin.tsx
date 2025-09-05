import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser, forgotPassword } from "../redux/authslices";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const [emailSentMessage, setEmailSentMessage] = useState("");

  const [showpassword, setShowPassoword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    dispatch(loginUser(data));
    console.log("User signed in:", data);
  };

  const handleForgotPassword = async () => {
    const email = getValues("email"); 
    if (!email) {
      alert("Please enter your email before resetting your password.");
      return;
    }

    try {
      // Dispatch the thunk, not the raw fetch/axios
      const resultAction: any = await dispatch(forgotPassword({ email }));

      if (forgotPassword.fulfilled.match(resultAction)) {
        console.log("Reset email sent:", resultAction.payload);
  setEmailSentMessage("A reset email has been sent to your Gmail address.");
      } else {
        console.error("Reset failed:", resultAction.payload);
        alert(resultAction.payload); // or show UI error
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign In</h2>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
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
        <button
          type="button"
          onClick={handleForgotPassword}
          className="forgot-link"
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
          }}
        >
          Forgot Password?
        </button>
         {emailSentMessage && (
        <div className="success-message">{emailSentMessage}</div>
      )}

        <button type="submit" className="auth-button">
          Sign In
        </button>

        <div className="switch-auth">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
