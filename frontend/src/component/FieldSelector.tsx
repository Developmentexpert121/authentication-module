
import  { useState } from 'react';

const FIELD_OPTIONS: Record<'signup' | 'signin' | 'register', string[]> = {
  signup: [
    'username',
    'email',
    'password',
    'confirmPassword',
    'phone',
    'firstName',
    'lastName',
    'dob',         
    'gender',
  ],
  signin: [
    'email',
    'password',
    'username',
    'phone',          
  ],
  register: [
    'username',
    'email',
    'phone',
    'firstName',
    'lastName',
    'address',
    'city',
    'country',
    'postalCode',
    'role',           
    'organization',
  ],
};
export default function FieldSelector() {
  const [signupFields, setSignupFields] = useState<string[]>(['email', 'password']);
  const [signinFields, setSigninFields] = useState<string[]>(['email', 'password']);
  const [registerFields, setRegisterFields] = useState<string[]>([]);
  const [dbChoice, setDbChoice] = useState('mongodb');
  const [authType, setAuthType] = useState('password');

  const toggleField = (type: 'signup' | 'signin' | 'register', field: string) => {
    if (authType === 'password' && (field === 'email' || field === 'password')) return;

    if (type === 'signup') {
      setSignupFields((prev) =>
        prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
      );
    }
    if (type === 'signin') {
      setSigninFields((prev) =>
        prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
      );
    }
    if (type === 'register') {
      setRegisterFields((prev) =>
        prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
      );
    }
  };

  const generateCode = async () => {
    if (
      authType === 'password' &&
      signupFields.includes('confirmPassword') &&
      !signupFields.includes('password')
    ) {
      alert('Please select password if you want to use confirm password');
      return;
    }

    const mergedBackend =
      authType === 'password'
        ? Array.from(new Set([...signupFields, ...signinFields].filter((f) => f !== 'confirmPassword')))
        : Array.from(new Set(registerFields.filter((f) => f !== 'confirmPassword')));

    const allFields = {
      signup: authType === 'password' ? signupFields : [],
      signin: authType === 'password' ? signinFields : [],
      register: authType === 'otp' ? registerFields : [],
      backend: mergedBackend,
    };

    const response = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ db: dbChoice, auth: authType, fields: allFields }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error:', error);
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-project.zip';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const renderFieldSection = (
    title: string,
    type: 'signup' | 'signin' | 'register',
    selectedFields: string[]
  ) => {
    const fields = FIELD_OPTIONS[type];
    return (
      <div className="mb-6 border rounded-xl shadow-sm p-4 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-between">
          {title}
          {selectedFields.length > 0 && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">
              {selectedFields.length} selected
            </span>
          )}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {fields.map((field) => (
            <label
              key={`${type}-${field}`}
              className={`flex items-center space-x-2 p-2 border rounded-lg cursor-pointer transition-all ${
                selectedFields.includes(field)
                  ? 'bg-blue-50 border-blue-400'
                  : 'hover:bg-gray-100'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFields.includes(field)}
                onChange={() => toggleField(type, field)}
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700 capitalize">{field}</span>
            </label>
          ))}
        </div>
        {selectedFields.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedFields.map((f) => (
              <span
                key={f}
                className="px-2 py-1 text-xs rounded-full bg-blue-600 text-white"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          🚀 Project Generator
        </h2>

        {/* Database */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Database</h3>
          <select
            value={dbChoice}
            onChange={(e) => setDbChoice(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="mongodb">MongoDB</option>
            <option value="sql">SQL</option>
          </select>
        </div>

        {/* Auth Type */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Auth Type</h3>
          <select
            value={authType}
            onChange={(e) => setAuthType(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="password">Password</option>
            <option value="otp">OTP</option>
          </select>
        </div>

        {/* Field Sections */}
        {authType === 'password' ? (
          <>
            {renderFieldSection('Signup Fields', 'signup', signupFields)}
            {renderFieldSection('Signin Fields', 'signin', signinFields)}
          </>
        ) : (
          renderFieldSection('Register Fields', 'register', registerFields)
        )}

        {/* Backend fields preview */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Backend Fields (Auto)</h3>
          <div className="p-3 border rounded-lg bg-gray-100 text-sm text-gray-800">
            {(authType === 'password'
              ? [...new Set([...signupFields, ...signinFields])]
              : registerFields
            )
              .filter((f) => f !== 'confirmPassword')
              .join(', ') || 'No fields selected'}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={generateCode}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-md"
        >
          Generate Code
        </button>
      </div>
    </div>
  );
}
