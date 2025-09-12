
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { registerUser } from '../redux/EmailverificationSilce';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Yup Schema
const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
});

type FormValues = {
  username: string;
  email: string;
};

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, message, error } = useAppSelector(state => state.emailVerification);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    dispatch(registerUser(data));
    
    reset(); // reset form after submission
  };

  // ✅ Toast notifications for success/error
  useEffect(() => {
    if (message) {
      toast.success(message, { position: 'top-right', autoClose: 3000 });
    }
    if (error) {
      toast.error(error, { position: 'top-right', autoClose: 3000 });
    }
  }, [message, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-6">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Complete Registration</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block mb-2 text-gray-300 font-medium">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-5 py-3 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Username Field */}
          <div>
            <label className="block mb-2 text-gray-300 font-medium">Username</label>
            <input
              type="text"
              {...register('username')}
              className="w-full px-5 py-3 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
            />
            {errors.username && (
              <p className="mt-2 text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-5 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 active:scale-95 transition-all duration-200 disabled:bg-gray-500"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
