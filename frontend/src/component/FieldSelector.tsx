// import React, { useState } from 'react';

// const AVAILABLE_FIELDS = [
//   'username',
//   'email',
//   'password',
//   'confirmPassword',
//   'phone',
// ];

// export default function FieldSelector() {
//   const [signupFields, setSignupFields] = useState([]);
//   const [signinFields, setSigninFields] = useState([]);
//   const [backendFields, setBackendFields] = useState([]);
//   const [dbChoice, setDbChoice] = useState('mongodb');
//   const [authType, setAuthType] = useState('password');

//   const toggleField = (type:any, field:any) => {
//     if (type === 'signup') {
//       setSignupFields((prev:any) =>
//         prev.includes(field)
//           ? prev.filter((f:any) => f !== field)
//           : [...prev, field]
//       );
//     }
//     if (type === 'signin') {
//       setSigninFields((prev:any) =>
//         prev.includes(field)
//           ? prev.filter((f:any) => f !== field)
//           : [...prev, field]
//       );
//     }
//     if (type === 'backend') {
//       setBackendFields((prev:any) =>
//         prev.includes(field)
//           ? prev.filter((f:any) => f !== field)
//           : [...prev, field]
//       );
//     }
//   };

//   const generateCode = async () => {
//     const allFields = {
//       signup: signupFields,
//       signin: signinFields,
//       backend: backendFields,
//     };

//     const response = await fetch('http://localhost:5000/generate', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         db: dbChoice,
//         auth: authType,
//         fields: allFields,
//       }),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       console.error('Error:', error);
//       return;
//     }

//     // Convert to blob
//     const blob = await response.blob();

//     // Create temporary link to download
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'generated-project.zip';
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     window.URL.revokeObjectURL(url);
//   };

//   // helper for rendering each section
//   const renderFieldSection = (title:any, type:any, selectedFields:any) => (
//     <div className="mb-5">
//       <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
//       <div className="grid grid-cols-2 gap-3">
//         {AVAILABLE_FIELDS.map((field) => (
//           <label
//             key={`${type}-${field}`}
//             className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-100"
//           >
//             <input
//               type="checkbox"
//               checked={selectedFields.includes(field)}
//               onChange={() => toggleField(type, field)}
//               className="h-4 w-4 text-blue-600"
//             />
//             <span className="text-gray-700 capitalize">{field}</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );

//   const hasAnyFields =
//     signupFields.length > 0 ||
//     signinFields.length > 0 ||
//     backendFields.length > 0;

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           🚀 Generate Signup Project
//         </h2>

//         {/* Database */}
//         <div className="mb-5">
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">Database</h3>
//           <select
//             value={dbChoice}
//             onChange={(e) => setDbChoice(e.target.value)}
//             className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="mongodb">MongoDB</option>
//             <option value="sql">SQL</option>
//           </select>
//         </div>

//         {/* Auth Type */}
//         <div className="mb-5">
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">
//             Auth Type
//           </h3>
//           <select
//             value={authType}
//             onChange={(e) => setAuthType(e.target.value)}
//             className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="password">Password</option>
//             <option value="otp">OTP</option>
//           </select>
//         </div>

//         {/* Field Sections */}
//         {renderFieldSection('Signup Fields', 'signup', signupFields)}
//         {renderFieldSection('Signin Fields', 'signin', signinFields)}
//         {renderFieldSection('Backend Fields', 'backend', backendFields)}

//         {/* Button */}
//         <button
//           onClick={generateCode}
//           disabled={!hasAnyFields}
//           className={`w-full py-3 rounded-xl font-semibold transition ${
//             !hasAnyFields
//               ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
//               : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
//           }`}
//         >
//           Generate Code
//         </button>
//       </div>
//     </div>
//   );
// }
// -----------

// import React, { useEffect,useState } from 'react';

// const AVAILABLE_FIELDS = [
//   'username',
//   'email',
//   'password',
//   'confirmPassword',
//   'phone',
// ];

// export default function FieldSelector() {
//   const [signupFields, setSignupFields] = useState<string[]>([
//     'email',
//     'password',
//   ]);
//   const [signinFields, setSigninFields] = useState<string[]>([
//     'email',
//     'password',
//   ]);
//   const [dbChoice, setDbChoice] = useState('mongodb');
//   const [authType, setAuthType] = useState('password');

//   const toggleField = (type: 'signup' | 'signin', field: string) => {
//     if (field === 'email' || field === 'password') return;

//     if (type === 'signup') {
//       setSignupFields((prev) =>
//         prev.includes(field)
//           ? prev.filter((f) => f !== field)
//           : [...prev, field]
//       );
//     }
//     if (type === 'signin') {
//       setSigninFields((prev) =>
//         prev.includes(field)
//           ? prev.filter((f) => f !== field)
//           : [...prev, field]
//       );
//     }
//   };

//   const generateCode = async () => {
//     if (
//       signupFields.includes('confirmPassword') &&
//       !signupFields.includes('password')
//     ) {
//       alert('Please select password if you want to use confirm password');
//       return;
//     }

//     const mergedBackend = Array.from(
//       new Set(
//         [...signupFields, ...signinFields].filter(
//           (f) => f !== 'confirmPassword'
//         )
//       )
//     );

//     const allFields = {
//       signup: signupFields,
//       signin: signinFields,
//       backend: mergedBackend,
//     };

//     const response = await fetch('http://localhost:5000/generate', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         db: dbChoice,
//         auth: authType,
//         fields: allFields,
//       }),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       console.error('Error:', error);
//       return;
//     }

//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'generated-project.zip';
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     window.URL.revokeObjectURL(url);
//   };

//   const renderFieldSection = (
//     title: string,
//     type: 'signup' | 'signin',
//     selectedFields: string[]
//   ) => (
//     <div className="mb-5">
//       <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
//       <div className="grid grid-cols-2 gap-3">
//         {AVAILABLE_FIELDS.map((field) => (
//           <label
//             key={`${type}-${field}`}
//             className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-100"
//           >
//             <input
//               type="checkbox"
//               checked={
//                 selectedFields.includes(field) ||
//                 field == 'email' ||
//                 field == 'password'
//               }
//               onChange={() => toggleField(type, field)}
//               className={`h-4 w-4 text-blue-600 ${field === 'email' || field === 'password' ? 'cursor-not-allowed' : ''}`}
//               readOnly={field === 'email' || field === 'password'}
//             />
//             <span className="text-gray-700 capitalize">{field}</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           🚀 Generate Signup Project
//         </h2>

//         {/* Database */}
//         <div className="mb-5">
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">Database</h3>
//           <select
//             value={dbChoice}
//             onChange={(e) => setDbChoice(e.target.value)}
//             className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="mongodb">MongoDB</option>
//             <option value="sql">SQL</option>
//           </select>
//         </div>

//         {/* Auth Type */}
//         <div className="mb-5">
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">
//             Auth Type
//           </h3>
//           <select
//             value={authType}
//             onChange={(e) => setAuthType(e.target.value)}
//             className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="password">Password</option>
//             <option value="otp">OTP</option>
//           </select>
//         </div>

//         {/* Field Sections */}
//         {renderFieldSection('Signup Fields', 'signup', signupFields)}
//         {renderFieldSection('Signin Fields', 'signin', signinFields)}

//         {/* Backend fields preview (auto-generated) */}
//         <div className="mb-5">
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">
//             Backend Fields (Auto)
//           </h3>
//           <div className="p-3 border rounded-lg bg-gray-100 text-sm text-gray-800">
//             {Array.from(
//               new Set(
//                 [...signupFields, ...signinFields].filter(
//                   (f) => f !== 'confirmPassword'
//                 )
//               )
//             ).join(', ')}
//           </div>
//         </div>

//         {/* Button */}
//         <button
//           onClick={generateCode}
//           className="w-full py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md"
//         >
//           Generate Code
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';

const AVAILABLE_FIELDS = [
  'username',
  'email',
  'password',
  'confirmPassword',
  'phone',
];

export default function FieldSelector() {
  const [signupFields, setSignupFields] = useState<string[]>([
    'email',
    'password',
  ]);
  const [signinFields, setSigninFields] = useState<string[]>([
    'email',
    'password',
  ]);
  const [registerFields, setRegisterFields] = useState<string[]>([]);
  const [dbChoice, setDbChoice] = useState('mongodb');
  const [authType, setAuthType] = useState('password');

  const toggleField = (
    type: 'signup' | 'signin' | 'register',
    field: string
  ) => {
    if (authType === 'password' && (field === 'email' || field === 'password'))
      return;

    if (type === 'signup') {
      setSignupFields((prev) =>
        prev.includes(field)
          ? prev.filter((f) => f !== field)
          : [...prev, field]
      );
    }
    if (type === 'signin') {
      setSigninFields((prev) =>
        prev.includes(field)
          ? prev.filter((f) => f !== field)
          : [...prev, field]
      );
    }
    if (type === 'register') {
      setRegisterFields((prev) =>
        prev.includes(field)
          ? prev.filter((f) => f !== field)
          : [...prev, field]
      );
    }
  };

  const generateCode = async () => {
    // password-based validation
    if (
      authType === 'password' &&
      signupFields.includes('confirmPassword') &&
      !signupFields.includes('password')
    ) {
      alert('Please select password if you want to use confirm password');
      return;
    }

    // backend fields depend on auth type
    const mergedBackend =
      authType === 'password'
        ? Array.from(
            new Set(
              [...signupFields, ...signinFields].filter(
                (f) => f !== 'confirmPassword'
              )
            )
          )
        : Array.from(
            new Set(registerFields.filter((f) => f !== 'confirmPassword'))
          );

    const allFields = {
      signup: authType === 'password' ? signupFields : [],
      signin: authType === 'password' ? signinFields : [],
      register: authType === 'otp' ? registerFields : [],
      backend: mergedBackend,
    };

    const response = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        db: dbChoice,
        auth: authType,
        fields: allFields,
      }),
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
  ) => (
    <div className="mb-5">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {AVAILABLE_FIELDS.map((field) => (
          <label
            key={`${type}-${field}`}
            className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-100"
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
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🚀 Generate Signup Project
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
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Auth Type
          </h3>
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
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Backend Fields (Auto)
          </h3>
          <div className="p-3 border rounded-lg bg-gray-100 text-sm text-gray-800">
            {(authType === 'password'
              ? [...signupFields, ...signinFields]
              : registerFields
            )
              .filter((f) => f !== 'confirmPassword')
              .join(', ')}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={generateCode}
          className="w-full py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md"
        >
          Generate Code
        </button>
      </div>
    </div>
  );
}
