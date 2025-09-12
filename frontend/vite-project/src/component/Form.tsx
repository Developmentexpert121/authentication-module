import React, { useState } from 'react';

function Form() {
  const [dbType, setDbType] = useState('mongodb');
  const [authType, setAuthType] = useState('password');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // You can extend the payload here as needed
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbType, authType }),
      });

      if (!response.ok) throw new Error('Error generating project');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generated-project.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert((error as Error).message || 'Error generating project');
    }
  };

  return (
    <div
      style={{
        maxWidth: '420px',
        margin: '50px auto',
        padding: '30px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#fff',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>
        Project Generator
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Database Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="dbType"
            style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
          >
            Select Backend Database
          </label>
          <select
            id="dbType"
            value={dbType}
            onChange={(e) => setDbType(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            <option value="mongodb">MongoDB</option>
            <option value="sql">SQL</option>
          </select>
        </div>

        {/* Authentication Type */}
        <div style={{ marginBottom: '30px' }}>
          <label
            style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
          >
            Authentication Type
          </label>

          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginRight: '24px',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <input
              type="radio"
              name="authType"
              value="password"
              checked={authType === 'password'}
              onChange={() => setAuthType('password')}
              style={{ marginRight: '8px' }}
            />
            Password-based Login
          </label>

          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <input
              type="radio"
              name="authType"
              value="otp"
              checked={authType === 'otp'}
              onChange={() => setAuthType('otp')}
              style={{ marginRight: '8px' }}
            />
            OTP-based Login
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#007bff',
            color: '#fff',
            fontWeight: '600',
            fontSize: '16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          Generate Project
        </button>
      </form>
    </div>
  );
}

export default Form;
