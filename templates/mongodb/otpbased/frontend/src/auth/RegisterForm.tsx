
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { registerUser } from '../redux/EmailverificationSilce';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    
    reset(); 
  };

  useEffect(() => {
    if (message) {
      toast.success(message, { position: 'top-right', autoClose: 3000 });
    }
    if (error) {
      toast.error(error, { position: 'top-right', autoClose: 3000 });
    }
  }, [message, error]);

  return (
  
<div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
  {/* Floating background blobs */}
  <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-30 blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-400 to-pink-500 opacity-30 blur-3xl animate-bounce-slow"></div>

  {/* Card */}
  <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/90 p-10 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-[1.03] hover:shadow-3xl">
    <h2 className="mb-6 text-center text-3xl font-extrabold text-indigo-700 drop-shadow-sm">
      Register form
    </h2> 

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  /*FIELDS_PLACEHOLDER_SIGNIN*/

  <button
    type="submit"
    className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-lg"
  >
    register 
  </button>
</form>
</div>
</div>

  );
};

export default RegisterForm;
