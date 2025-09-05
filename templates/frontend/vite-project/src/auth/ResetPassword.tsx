// src/pages/ResetPassword.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../redux/authslices';
import { useNavigate, useParams } from 'react-router-dom';

interface ResetFormData {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetFormData>();

  const onSubmit = async (data: ResetFormData) => {
    if (!token) return alert('Invalid or missing token');

    if (data.newPassword !== data.confirmPassword) {
      return alert("Passwords don't match");
    }

    const result = await dispatch(
      resetPassword({ token, newPassword: data.newPassword,confirmPassword:data.confirmPassword })
    );

    if (resetPassword.fulfilled.match(result)) {
      alert('Password reset successfully. Please sign in.');
      navigate('/signin');
    } else {
      alert(result.payload || 'Failed to reset password.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <label>New Password</label>
        <input
          type="password"
          {...register('newPassword', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' },
          })}
        />
        {errors.newPassword && <p className="error-message">{errors.newPassword.message}</p>}

        <label>Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Confirm password is required',
            validate: (value) =>
              value === watch('newPassword') || 'Passwords do not match',
          })}
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword.message}</p>
        )}

        <button type="submit" className="auth-button">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
