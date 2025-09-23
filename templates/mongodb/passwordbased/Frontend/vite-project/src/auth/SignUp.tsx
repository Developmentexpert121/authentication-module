// components/SignUp.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/authSilces';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Yup Validation Schema
const schema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
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
        toast.success('Signup successful! Please sign in.');
        navigate('/signin');
      } else {
        toast.error(resultAction.payload || 'Signup failed. Try again.');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error('Signup error:', err);
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
      Sign In
    </h2>

<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  /*FIELDS_PLACEHOLDER_SIGNUP*/

  <button
    type="submit"
    className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-lg"
  >
    Sign Up
  </button>
</form>

 </div>
</div>



  );
};

export default SignUp;
