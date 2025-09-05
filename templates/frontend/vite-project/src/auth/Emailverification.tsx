
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store'; 
import { sendOtp, verifyOtp, resetState } from '../redux/EmailverificationSilce';
import { useNavigate } from 'react-router-dom';

const EmailVerification: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const { loading, error, message, verified } = useAppSelector(state => state.emailVerification);

  const handleSendOtp = () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }
    dispatch(sendOtp(email));
  };

  const handleVerifyOtp = () => {
    if (!email || !otp) {
      alert('Please enter email and OTP');
      return;
    }
    dispatch(verifyOtp({ email, otp }));
  };

  const handleReset = () => {
    dispatch(resetState());
    setEmail('');
    setOtp('');
  };

  // Effect to handle redirect after verification
  useEffect(() => {
    if (verified && message) {
      if (message.includes('User exists')) {
        // Redirect to dashboard
        setTimeout(() => navigate('/dashboard'), 2000);
      } else if (message.includes('User does not exist')) {
        // Redirect to data entry form
        setTimeout(() => navigate('/data-entry'), 2000);
      }
    }
  }, [verified, message, navigate]);

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Email Verification</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={loading || verified}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      {!verified && (
        <>
          <button
            onClick={handleSendOtp}
            disabled={loading || !email}
            style={{ width: '100%', padding: 10, marginBottom: 10 }}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            disabled={loading}
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />

          <button
            onClick={handleVerifyOtp}
            disabled={loading || !otp || !email}
            style={{ width: '100%', padding: 10, marginBottom: 10 }}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </>
      )}

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {verified && (
        <>
          <p style={{ color: 'green' }}>Email verified successfully!</p>
          <p>
            {message.includes('User exists')
              ? 'Redirecting to dashboard...'
              : 'Redirecting to user info form...'}
          </p>
          <button onClick={handleReset} style={{ padding: 10, width: '100%' }}>
            Reset
          </button>
        </>
      )}
    </div>
  );
};

export default EmailVerification;
