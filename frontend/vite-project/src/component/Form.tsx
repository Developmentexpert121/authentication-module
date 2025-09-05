import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [dbType, setDbType] = useState('mongodb');
  const [fields, setFields] = useState({
    username: false,
    password: false,
    email: false,
  });

  const handleFieldChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/generate', {
        dbType,
        fields,
      }, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generated-project.zip');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
        console.log(err)
      alert('Error generating project');
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>Project Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Database: </label>
          <select value={dbType} onChange={(e) => setDbType(e.target.value)}>
            <option value="mongodb">MongoDB</option>
            <option value="sql">SQL</option>
          </select>
        </div>

        <div style={{ marginTop: '20px' }}>
          <label>Select Fields:</label>
          <div>
            <label>
              <input type="checkbox" name="username" checked={fields.username} onChange={handleFieldChange} />
              Username
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" name="password" checked={fields.password} onChange={handleFieldChange} />
              Password
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" name="email" checked={fields.email} onChange={handleFieldChange} />
              Email
            </label>
          </div>
        </div>

        <button type="submit" style={{ marginTop: '20px' }}>Generate Project</button>
      </form>
    </div>
  );
}

export default Form;
