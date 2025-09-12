


import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { sendOtp, verifyOtp, resetState } from '../redux/EmailverificationSilce';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormValues = {
  email: string;
  otp?: string;
};

// ✅ Schema for just email
const emailSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
});

// ✅ Schema for email + otp
const otpSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  otp: yup.string().required('OTP is required').length(6, 'OTP must be 6 digits'),
});

const EmailVerification: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, message, verified } = useAppSelector(
    state => state.emailVerification
  );

  const {
    register,
    getValues,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(emailSchema),
  });

  // ✅ Send OTP (validate only email)
  const handleSendOtp = async () => {
    const values = getValues();
    try {
      await emailSchema.validate(values, { abortEarly: false });
      dispatch(sendOtp(values.email));
    } catch (validationError: any) {
      validationError.inner.forEach((err: any) => toast.error(err.message));
    }
  };

  // ✅ Verify OTP (validate email + otp)
  const handleVerifyOtp = async () => {
    const values = getValues();
    try {
      await otpSchema.validate(values, { abortEarly: false });
      dispatch(verifyOtp({ email: values.email, otp: values.otp! }));
    } catch (validationError: any) {
      validationError.inner.forEach((err: any) => toast.error(err.message));
    }
  };

  // ✅ Reset state
  const handleReset = () => {
    dispatch(resetState());
    reset();
  };

  // ✅ Toasts for API responses
  useEffect(() => {
    if (message) toast.success(message, { autoClose: 2500 });
    if (error) toast.error(error, { autoClose: 2500 });
  }, [message, error]);

  // ✅ Redirect after verification
  useEffect(() => {
    if (verified && message) {
      if (message.includes('User exists')) {
        setTimeout(() => navigate('/dashboard'), 2000);
      } else if (message.includes('User does not exist')) {
        setTimeout(() => navigate('/data-entry'), 2000);
      }
    }
  }, [verified, message, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-6">
      <ToastContainer /> {/* ✅ Toastify container */}
      <div className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Email Verification
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter email"
          {...register('email')}
          disabled={loading || verified}
          className="w-full px-5 py-3 mb-4 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-inner"
        />

        {!verified && (
          <>
            {/* Send OTP Button */}
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full px-5 py-3 mb-5 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 active:scale-95 transition-all duration-200 disabled:bg-gray-500"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>

            {/* OTP Input */}
            <input
              type="text"
              placeholder="Enter OTP"
              {...register('otp')}
              disabled={loading}
              className="w-full px-5 py-3 mb-4 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-inner"
            />

            {/* Verify Button */}
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full px-5 py-3 mb-5 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 active:scale-95 transition-all duration-200 disabled:bg-gray-500"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        )}

        {/* Verified State */}
        {verified && (
          <>
            <p className="text-green-400 mt-4 text-center font-medium">
              Email verified successfully!
            </p>
            <p className="mb-6 text-center text-gray-300">
              {message?.includes('User exists')
                ? 'Redirecting to dashboard...'
                : 'Redirecting to user info form...'}
            </p>
            <button
              onClick={handleReset}
              className="w-full px-5 py-3 bg-gray-600 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-700 active:scale-95 transition-all duration-200"
            >
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
