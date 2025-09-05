import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { registerUser } from '../redux/EmailverificationSilce';

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
    reset
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    dispatch(registerUser(data));
    reset(); // reset form after submission
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Complete Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            style={{ width: '100%', padding: 8 }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Username</label>
          <input
            type="text"
            {...register('username', { required: 'Username is required' })}
            style={{ width: '100%', padding: 8 }}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: 10, width: '100%' }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {message && <p style={{ color: 'green', marginTop: 10 }}>{message}</p>}
        {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
